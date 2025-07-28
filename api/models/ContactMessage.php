<?php
class ContactMessage {
    private $conn;
    private $table_name = "contact_messages";

    public $id;
    public $name;
    public $email;
    public $phone;
    public $subject;
    public $message;
    public $product_id;
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Criar mensagem de contato
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                  SET name=:name, email=:email, phone=:phone, subject=:subject,
                      message=:message, product_id=:product_id, created_at=NOW()";

        $stmt = $this->conn->prepare($query);

        // Sanitizar dados
        $this->name = sanitizeInput($this->name);
        $this->email = sanitizeInput($this->email);
        $this->phone = sanitizeInput($this->phone);
        $this->subject = sanitizeInput($this->subject);
        $this->message = sanitizeInput($this->message);

        // Bind dos parâmetros
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":phone", $this->phone);
        $stmt->bindParam(":subject", $this->subject);
        $stmt->bindParam(":message", $this->message);
        $stmt->bindParam(":product_id", $this->product_id);

        if ($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }
        return false;
    }

    // Buscar todas as mensagens
    public function read() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>