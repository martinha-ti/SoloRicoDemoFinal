<?php
require_once '../models/JobApplication.php';

class JobApplicationController {
    private $db;
    private $job_application;

    public function __construct($database) {
        $this->db = $database;
        $this->job_application = new JobApplication($this->db);
    }

    // POST /api/job-application
    public function store() {
        $data = json_decode(file_get_contents("php://input"), true);

        // Validar campos obrigatórios
        $required = ['name', 'email', 'areaOfInterest'];
        $errors = validateRequired($data, $required);
        
        if (!empty($errors)) {
            jsonResponse(["error" => "Dados inválidos", "details" => $errors], 400);
        }

        // Validar email
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            jsonResponse(["error" => "Email inválido"], 400);
        }

        // Definir propriedades
        $this->job_application->name = $data['name'];
        $this->job_application->email = $data['email'];
        $this->job_application->area_of_interest = $data['areaOfInterest'];
        $this->job_application->resume_url = $data['resumeUrl'] ?? null;
        $this->job_application->message = $data['message'] ?? null;

        if ($this->job_application->create()) {
            // Aqui você pode adicionar o envio de email
            $this->sendJobApplicationEmail();
            
            jsonResponse(["message" => "Candidatura enviada com sucesso"], 201);
        } else {
            jsonResponse(["error" => "Erro ao enviar candidatura"], 500);
        }
    }

    // GET /api/job-applications (para admin)
    public function index() {
        $stmt = $this->job_application->read();
        $applications = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $application_item = [
                "id" => $row['id'],
                "name" => $row['name'],
                "email" => $row['email'],
                "areaOfInterest" => $row['area_of_interest'],
                "resumeUrl" => $row['resume_url'],
                "message" => $row['message'],
                "createdAt" => $row['created_at']
            ];
            array_push($applications, $application_item);
        }

        jsonResponse($applications);
    }

    private function sendJobApplicationEmail() {
        // Implementar envio de email aqui
        $to = "rh@solorico.com.br";
        $subject = "Nova candidatura - " . $this->job_application->area_of_interest;
        $message = "
        Nova candidatura recebida:
        
        Nome: {$this->job_application->name}
        Email: {$this->job_application->email}
        Área de interesse: {$this->job_application->area_of_interest}
        
        Mensagem:
        {$this->job_application->message}
        
        Enviado em: " . date('d/m/Y H:i:s');
        
        $headers = "From: noreply@solorico.com.br\r\n";
        $headers .= "Reply-To: {$this->job_application->email}\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        
        // Enviar email (descomente para ativar)
        // mail($to, $subject, $message, $headers);
    }
}
?>