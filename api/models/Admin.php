<?php
class Admin {
    private $conn;
    private $table_name = "admins";

    public $id;
    public $name;
    public $role;
    public $username;
    public $password;
    public $is_active;
    public $created_at;
    public $updated_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Verificar login
    public function login() {
        $query = "SELECT id, name, role, username, password FROM " . $this->table_name . " 
                  WHERE username = ? AND is_active = 1 LIMIT 0,1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->username);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($row && password_verify($this->password, $row['password'])) {
            $this->id = $row['id'];
            $this->name = $row['name'];
            $this->role = $row['role'];
            $this->username = $row['username'];
            return true;
        }
        return false;
    }

    // Buscar todos os admins
    public function read() {
        $query = "SELECT id, name, role, username, is_active, created_at, updated_at 
                  FROM " . $this->table_name . " WHERE is_active = 1 ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Criar admin
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                  SET name=:name, role=:role, username=:username, password=:password,
                      is_active=:is_active, created_at=NOW(), updated_at=NOW()";

        $stmt = $this->conn->prepare($query);

        // Hash da senha
        $this->password = password_hash($this->password, PASSWORD_DEFAULT);

        // Sanitizar dados
        $this->name = sanitizeInput($this->name);
        $this->username = sanitizeInput($this->username);
        $this->role = sanitizeInput($this->role);

        // Bind dos parâmetros
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":role", $this->role);
        $stmt->bindParam(":username", $this->username);
        $stmt->bindParam(":password", $this->password);
        $stmt->bindParam(":is_active", $this->is_active);

        if ($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }
        return false;
    }

    // Atualizar admin
    public function update() {
        $query = "UPDATE " . $this->table_name . " 
                  SET name=:name, role=:role, username=:username, is_active=:is_active, updated_at=NOW()";
        
        // Se senha foi fornecida, incluir no update
        if (!empty($this->password)) {
            $query .= ", password=:password";
        }
        
        $query .= " WHERE id=:id";

        $stmt = $this->conn->prepare($query);

        // Sanitizar dados
        $this->name = sanitizeInput($this->name);
        $this->username = sanitizeInput($this->username);
        $this->role = sanitizeInput($this->role);

        // Bind dos parâmetros
        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":role", $this->role);
        $stmt->bindParam(":username", $this->username);
        $stmt->bindParam(":is_active", $this->is_active);

        // Se senha foi fornecida, fazer hash e bind
        if (!empty($this->password)) {
            $hashed_password = password_hash($this->password, PASSWORD_DEFAULT);
            $stmt->bindParam(":password", $hashed_password);
        }

        return $stmt->execute();
    }

    // Deletar admin
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        return $stmt->execute();
    }
}
?>