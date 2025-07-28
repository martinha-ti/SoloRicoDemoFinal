<?php
require_once '../models/Admin.php';

class AdminController {
    private $db;
    private $admin;

    public function __construct($database) {
        $this->db = $database;
        $this->admin = new Admin($this->db);
    }

    // POST /api/admin/login
    public function login() {
        $data = json_decode(file_get_contents("php://input"), true);

        // Validar campos obrigatórios
        $required = ['username', 'password'];
        $errors = validateRequired($data, $required);
        
        if (!empty($errors)) {
            jsonResponse(["error" => "Dados inválidos", "details" => $errors], 400);
        }

        $this->admin->username = $data['username'];
        $this->admin->password = $data['password'];

        if ($this->admin->login()) {
            // Em produção, usar JWT ou sessões seguras
            $response = [
                "success" => true,
                "admin" => [
                    "id" => $this->admin->id,
                    "name" => $this->admin->name,
                    "role" => $this->admin->role,
                    "username" => $this->admin->username
                ]
            ];
            jsonResponse($response);
        } else {
            jsonResponse(["error" => "Credenciais inválidas"], 401);
        }
    }

    // POST /api/admin/logout
    public function logout() {
        // Em produção, limpar sessão/JWT
        jsonResponse(["success" => true]);
    }

    // GET /api/admin/users
    public function index() {
        $stmt = $this->admin->read();
        $admins = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $admin_item = [
                "id" => $row['id'],
                "name" => $row['name'],
                "role" => $row['role'],
                "username" => $row['username'],
                "isActive" => (bool)$row['is_active'],
                "createdAt" => $row['created_at'],
                "updatedAt" => $row['updated_at']
            ];
            array_push($admins, $admin_item);
        }

        jsonResponse($admins);
    }

    // POST /api/admin/users
    public function store() {
        $data = json_decode(file_get_contents("php://input"), true);

        // Validar campos obrigatórios
        $required = ['name', 'username', 'password', 'role'];
        $errors = validateRequired($data, $required);
        
        if (!empty($errors)) {
            jsonResponse(["error" => "Dados inválidos", "details" => $errors], 400);
        }

        // Definir propriedades
        $this->admin->name = $data['name'];
        $this->admin->username = $data['username'];
        $this->admin->password = $data['password'];
        $this->admin->role = $data['role'];
        $this->admin->is_active = $data['isActive'] ?? true;

        if ($this->admin->create()) {
            jsonResponse(["message" => "Usuário criado com sucesso", "id" => $this->admin->id], 201);
        } else {
            jsonResponse(["error" => "Erro ao criar usuário"], 500);
        }
    }

    // PUT /api/admin/users/{id}
    public function update($id) {
        $data = json_decode(file_get_contents("php://input"), true);

        $this->admin->id = $id;
        $this->admin->name = $data['name'];
        $this->admin->username = $data['username'];
        $this->admin->role = $data['role'];
        $this->admin->is_active = $data['isActive'] ?? true;
        
        // Só atualizar senha se foi fornecida
        if (!empty($data['password'])) {
            $this->admin->password = $data['password'];
        }

        if ($this->admin->update()) {
            jsonResponse(["message" => "Usuário atualizado com sucesso"]);
        } else {
            jsonResponse(["error" => "Erro ao atualizar usuário"], 500);
        }
    }

    // DELETE /api/admin/users/{id}
    public function destroy($id) {
        $this->admin->id = $id;
        
        if ($this->admin->delete()) {
            jsonResponse(["message" => "Usuário deletado com sucesso"]);
        } else {
            jsonResponse(["error" => "Erro ao deletar usuário"], 500);
        }
    }
}
?>