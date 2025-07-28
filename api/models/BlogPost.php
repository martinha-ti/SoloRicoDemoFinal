<?php
class BlogPost {
    private $conn;
    private $table_name = "blog_posts";

    public $id;
    public $title;
    public $slug;
    public $excerpt;
    public $content;
    public $category;
    public $image_url;
    public $published_at;
    public $is_active;
    public $created_at;
    public $updated_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Buscar todos os posts
    public function read() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE is_active = 1 ORDER BY published_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Buscar post por slug
    public function readBySlug() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE slug = ? AND is_active = 1 LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->slug);
        $stmt->execute();
        return $stmt;
    }

    // Buscar posts por categoria
    public function readByCategory() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE category = ? AND is_active = 1 ORDER BY published_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->category);
        $stmt->execute();
        return $stmt;
    }

    // Criar post
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                  SET title=:title, slug=:slug, excerpt=:excerpt, content=:content,
                      category=:category, image_url=:image_url, published_at=:published_at,
                      is_active=:is_active, created_at=NOW(), updated_at=NOW()";

        $stmt = $this->conn->prepare($query);

        // Sanitizar dados
        $this->title = sanitizeInput($this->title);
        $this->slug = sanitizeInput($this->slug);
        $this->excerpt = sanitizeInput($this->excerpt);
        $this->category = sanitizeInput($this->category);

        // Bind dos parâmetros
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":slug", $this->slug);
        $stmt->bindParam(":excerpt", $this->excerpt);
        $stmt->bindParam(":content", $this->content);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":image_url", $this->image_url);
        $stmt->bindParam(":published_at", $this->published_at);
        $stmt->bindParam(":is_active", $this->is_active);

        if ($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }
        return false;
    }

    // Atualizar post
    public function update() {
        $query = "UPDATE " . $this->table_name . " 
                  SET title=:title, slug=:slug, excerpt=:excerpt, content=:content,
                      category=:category, image_url=:image_url, published_at=:published_at,
                      is_active=:is_active, updated_at=NOW()
                  WHERE id=:id";

        $stmt = $this->conn->prepare($query);

        // Sanitizar dados
        $this->title = sanitizeInput($this->title);
        $this->slug = sanitizeInput($this->slug);
        $this->excerpt = sanitizeInput($this->excerpt);
        $this->category = sanitizeInput($this->category);

        // Bind dos parâmetros
        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":slug", $this->slug);
        $stmt->bindParam(":excerpt", $this->excerpt);
        $stmt->bindParam(":content", $this->content);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":image_url", $this->image_url);
        $stmt->bindParam(":published_at", $this->published_at);
        $stmt->bindParam(":is_active", $this->is_active);

        return $stmt->execute();
    }

    // Deletar post
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        return $stmt->execute();
    }
}
?>