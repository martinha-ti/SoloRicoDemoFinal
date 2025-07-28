<?php
require_once '../models/ContactMessage.php';

class ContactController {
    private $db;
    private $contact_message;

    public function __construct($database) {
        $this->db = $database;
        $this->contact_message = new ContactMessage($this->db);
    }

    // POST /api/contact
    public function store() {
        $data = json_decode(file_get_contents("php://input"), true);

        // Validar campos obrigatórios
        $required = ['name', 'email', 'message'];
        $errors = validateRequired($data, $required);
        
        if (!empty($errors)) {
            jsonResponse(["error" => "Dados inválidos", "details" => $errors], 400);
        }

        // Validar email
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            jsonResponse(["error" => "Email inválido"], 400);
        }

        // Definir propriedades
        $this->contact_message->name = $data['name'];
        $this->contact_message->email = $data['email'];
        $this->contact_message->phone = $data['phone'] ?? null;
        $this->contact_message->subject = $data['subject'] ?? null;
        $this->contact_message->message = $data['message'];
        $this->contact_message->product_id = $data['productId'] ?? null;

        if ($this->contact_message->create()) {
            // Aqui você pode adicionar o envio de email
            $this->sendContactEmail();
            
            jsonResponse(["message" => "Mensagem enviada com sucesso"], 201);
        } else {
            jsonResponse(["error" => "Erro ao enviar mensagem"], 500);
        }
    }

    // GET /api/contact (para admin)
    public function index() {
        $stmt = $this->contact_message->read();
        $messages = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $message_item = [
                "id" => $row['id'],
                "name" => $row['name'],
                "email" => $row['email'],
                "phone" => $row['phone'],
                "subject" => $row['subject'],
                "message" => $row['message'],
                "productId" => $row['product_id'],
                "createdAt" => $row['created_at']
            ];
            array_push($messages, $message_item);
        }

        jsonResponse($messages);
    }

    private function sendContactEmail() {
        // Implementar envio de email aqui
        // Pode usar PHPMailer ou mail() nativo do PHP
        
        $to = "contato@solorico.com.br";
        $subject = "Nova mensagem de contato - " . ($this->contact_message->subject ?? 'Contato geral');
        $message = "
        Nova mensagem de contato recebida:
        
        Nome: {$this->contact_message->name}
        Email: {$this->contact_message->email}
        Telefone: {$this->contact_message->phone}
        Assunto: {$this->contact_message->subject}
        
        Mensagem:
        {$this->contact_message->message}
        
        Enviado em: " . date('d/m/Y H:i:s');
        
        $headers = "From: noreply@solorico.com.br\r\n";
        $headers .= "Reply-To: {$this->contact_message->email}\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        
        // Enviar email (descomente para ativar)
        // mail($to, $subject, $message, $headers);
    }
}
?>