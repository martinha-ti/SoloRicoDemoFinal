<?php
class Product {
    private $conn;
    private $table_name = "products";

    public $id;
    public $name;
    public $slug;
    public $category;
    public $description;
    public $features;
    public $benefits;
    public $usage;
    public $composition;
    public $technical_specs;
    public $image_url;
    public $gallery;
    public $active;
    public $parent_id;
    public $is_product_line;
    public $line_order;
    public $created_at;
    public $updated_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Buscar todos os produtos
    public function read() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE active = 1 ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Buscar produto por ID
    public function readOne() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = ? AND active = 1 LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row) {
            $this->name = $row['name'];
            $this->slug = $row['slug'];
            $this->category = $row['category'];
            $this->description = $row['description'];
            $this->features = $row['features'];
            $this->benefits = json_decode($row['benefits'], true);
            $this->usage = $row['usage'];
            $this->composition = $row['composition'];
            $this->technical_specs = $row['technical_specs'];
            $this->image_url = $row['image_url'];
            $this->gallery = json_decode($row['gallery'], true);
            $this->active = $row['active'];
            $this->parent_id = $row['parent_id'];
            $this->is_product_line = $row['is_product_line'];
            $this->line_order = $row['line_order'];
            $this->created_at = $row['created_at'];
            $this->updated_at = $row['updated_at'];
            return true;
        }
        return false;
    }

    // Buscar produto por slug
    public function readBySlug() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE slug = ? AND active = 1 LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->slug);
        $stmt->execute();
        return $stmt;
    }

    // Buscar produtos por categoria
    public function readByCategory() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE category = ? AND active = 1 ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->category);
        $stmt->execute();
        return $stmt;
    }

    // Buscar linhas principais de produtos
    public function readMainLines() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE is_product_line = 1 AND active = 1 ORDER BY line_order ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Buscar sub-produtos de uma linha
    public function readSubProducts() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE parent_id = ? AND active = 1 ORDER BY line_order ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->parent_id);
        $stmt->execute();
        return $stmt;
    }

    // Criar produto
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                  SET name=:name, slug=:slug, category=:category, description=:description, 
                      features=:features, benefits=:benefits, usage=:usage, composition=:composition,
                      technical_specs=:technical_specs, image_url=:image_url, gallery=:gallery,
                      active=:active, parent_id=:parent_id, is_product_line=:is_product_line,
                      line_order=:line_order, created_at=NOW(), updated_at=NOW()";

        $stmt = $this->conn->prepare($query);

        // Sanitizar dados
        $this->name = sanitizeInput($this->name);
        $this->slug = sanitizeInput($this->slug);
        $this->category = sanitizeInput($this->category);
        $this->description = sanitizeInput($this->description);

        // Bind dos parâmetros
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":slug", $this->slug);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":features", $this->features);
        $stmt->bindParam(":benefits", json_encode($this->benefits));
        $stmt->bindParam(":usage", $this->usage);
        $stmt->bindParam(":composition", $this->composition);
        $stmt->bindParam(":technical_specs", $this->technical_specs);
        $stmt->bindParam(":image_url", $this->image_url);
        $stmt->bindParam(":gallery", json_encode($this->gallery));
        $stmt->bindParam(":active", $this->active);
        $stmt->bindParam(":parent_id", $this->parent_id);
        $stmt->bindParam(":is_product_line", $this->is_product_line);
        $stmt->bindParam(":line_order", $this->line_order);

        if ($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }
        return false;
    }

    // Atualizar produto
    public function update() {
        $query = "UPDATE " . $this->table_name . " 
                  SET name=:name, slug=:slug, category=:category, description=:description,
                      features=:features, benefits=:benefits, usage=:usage, composition=:composition,
                      technical_specs=:technical_specs, image_url=:image_url, gallery=:gallery,
                      active=:active, parent_id=:parent_id, is_product_line=:is_product_line,
                      line_order=:line_order, updated_at=NOW()
                  WHERE id=:id";

        $stmt = $this->conn->prepare($query);

        // Sanitizar dados
        $this->name = sanitizeInput($this->name);
        $this->slug = sanitizeInput($this->slug);
        $this->category = sanitizeInput($this->category);
        $this->description = sanitizeInput($this->description);

        // Bind dos parâmetros
        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":slug", $this->slug);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":features", $this->features);
        $stmt->bindParam(":benefits", json_encode($this->benefits));
        $stmt->bindParam(":usage", $this->usage);
        $stmt->bindParam(":composition", $this->composition);
        $stmt->bindParam(":technical_specs", $this->technical_specs);
        $stmt->bindParam(":image_url", $this->image_url);
        $stmt->bindParam(":gallery", json_encode($this->gallery));
        $stmt->bindParam(":active", $this->active);
        $stmt->bindParam(":parent_id", $this->parent_id);
        $stmt->bindParam(":is_product_line", $this->is_product_line);
        $stmt->bindParam(":line_order", $this->line_order);

        return $stmt->execute();
    }

    // Deletar produto
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        return $stmt->execute();
    }
}
?>