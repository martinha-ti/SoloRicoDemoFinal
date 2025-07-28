<?php
class JobApplication {
    private $conn;
    private $table_name = "job_applications";

    public $id;
    public $name;
    public $email;
    public $area_of_interest;
    public $resume_url;
    public $message;
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Criar candidatura
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                  SET name=:name, email=:email, area_of_interest=:area_of_interest,
                      resume_url=:resume_url, message=:message, created_at=NOW()";

        $stmt = $this->conn->prepare($query);

        // Sanitizar dados
        $this->name = sanitizeInput($this->name);
        $this->email = sanitizeInput($this->email);
        $this->area_of_interest = sanitizeInput($this->area_of_interest);
        $this->message = sanitizeInput($this->message);

        // Bind dos parâmetros
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":area_of_interest", $this->area_of_interest);
        $stmt->bindParam(":resume_url", $this->resume_url);
        $stmt->bindParam(":message", $this->message);

        if ($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }
        return false;
    }

    // Buscar todas as candidaturas
    public function read() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>