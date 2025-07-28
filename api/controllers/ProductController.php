<?php
require_once '../models/Product.php';

class ProductController {
    private $db;
    private $product;

    public function __construct($database) {
        $this->db = $database;
        $this->product = new Product($this->db);
    }

    // GET /api/products
    public function index() {
        $stmt = $this->product->read();
        $products = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $product_item = [
                "id" => $row['id'],
                "name" => $row['name'],
                "slug" => $row['slug'],
                "category" => $row['category'],
                "description" => $row['description'],
                "features" => $row['features'],
                "benefits" => json_decode($row['benefits'], true),
                "usage" => $row['usage'],
                "composition" => $row['composition'],
                "technicalSpecs" => $row['technical_specs'],
                "imageUrl" => $row['image_url'],
                "gallery" => json_decode($row['gallery'], true),
                "active" => (bool)$row['active'],
                "parentId" => $row['parent_id'],
                "isProductLine" => (bool)$row['is_product_line'],
                "lineOrder" => $row['line_order'],
                "createdAt" => $row['created_at'],
                "updatedAt" => $row['updated_at']
            ];
            array_push($products, $product_item);
        }

        jsonResponse($products);
    }

    // GET /api/products/main-lines
    public function mainLines() {
        $stmt = $this->product->readMainLines();
        $products = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $product_item = [
                "id" => $row['id'],
                "name" => $row['name'],
                "slug" => $row['slug'],
                "category" => $row['category'],
                "description" => $row['description'],
                "imageUrl" => $row['image_url'],
                "isProductLine" => (bool)$row['is_product_line'],
                "lineOrder" => $row['line_order']
            ];
            array_push($products, $product_item);
        }

        jsonResponse($products);
    }

    // GET /api/products/{slug}
    public function show($slug) {
        $this->product->slug = $slug;
        $stmt = $this->product->readBySlug();
        
        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $product_item = [
                "id" => $row['id'],
                "name" => $row['name'],
                "slug" => $row['slug'],
                "category" => $row['category'],
                "description" => $row['description'],
                "features" => $row['features'],
                "benefits" => json_decode($row['benefits'], true),
                "usage" => $row['usage'],
                "composition" => $row['composition'],
                "technicalSpecs" => $row['technical_specs'],
                "imageUrl" => $row['image_url'],
                "gallery" => json_decode($row['gallery'], true),
                "active" => (bool)$row['active'],
                "parentId" => $row['parent_id'],
                "isProductLine" => (bool)$row['is_product_line'],
                "lineOrder" => $row['line_order'],
                "createdAt" => $row['created_at'],
                "updatedAt" => $row['updated_at']
            ];

            // Se for uma linha de produto, buscar sub-produtos
            if ($row['is_product_line']) {
                $this->product->parent_id = $row['id'];
                $sub_stmt = $this->product->readSubProducts();
                $sub_products = [];

                while ($sub_row = $sub_stmt->fetch(PDO::FETCH_ASSOC)) {
                    $sub_product = [
                        "id" => $sub_row['id'],
                        "name" => $sub_row['name'],
                        "slug" => $sub_row['slug'],
                        "category" => $sub_row['category'],
                        "description" => $sub_row['description'],
                        "imageUrl" => $sub_row['image_url'],
                        "lineOrder" => $sub_row['line_order']
                    ];
                    array_push($sub_products, $sub_product);
                }
                $product_item['subProducts'] = $sub_products;
            }

            jsonResponse($product_item);
        } else {
            jsonResponse(["error" => "Produto não encontrado"], 404);
        }
    }

    // GET /api/products/category/{category}
    public function byCategory($category) {
        $this->product->category = $category;
        $stmt = $this->product->readByCategory();
        $products = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $product_item = [
                "id" => $row['id'],
                "name" => $row['name'],
                "slug" => $row['slug'],
                "category" => $row['category'],
                "description" => $row['description'],
                "features" => $row['features'],
                "benefits" => json_decode($row['benefits'], true),
                "imageUrl" => $row['image_url'],
                "active" => (bool)$row['active']
            ];
            array_push($products, $product_item);
        }

        jsonResponse($products);
    }

    // POST /api/products
    public function store() {
        $data = json_decode(file_get_contents("php://input"), true);

        // Validar campos obrigatórios
        $required = ['name', 'slug', 'category', 'description'];
        $errors = validateRequired($data, $required);
        
        if (!empty($errors)) {
            jsonResponse(["error" => "Dados inválidos", "details" => $errors], 400);
        }

        // Definir propriedades
        $this->product->name = $data['name'];
        $this->product->slug = $data['slug'];
        $this->product->category = $data['category'];
        $this->product->description = $data['description'];
        $this->product->features = $data['features'] ?? null;
        $this->product->benefits = $data['benefits'] ?? [];
        $this->product->usage = $data['usage'] ?? null;
        $this->product->composition = $data['composition'] ?? null;
        $this->product->technical_specs = $data['technicalSpecs'] ?? null;
        $this->product->image_url = $data['imageUrl'] ?? null;
        $this->product->gallery = $data['gallery'] ?? [];
        $this->product->active = $data['active'] ?? true;
        $this->product->parent_id = $data['parentId'] ?? null;
        $this->product->is_product_line = $data['isProductLine'] ?? false;
        $this->product->line_order = $data['lineOrder'] ?? 0;

        if ($this->product->create()) {
            jsonResponse(["message" => "Produto criado com sucesso", "id" => $this->product->id], 201);
        } else {
            jsonResponse(["error" => "Erro ao criar produto"], 500);
        }
    }

    // PUT /api/products/{id}
    public function update($id) {
        $data = json_decode(file_get_contents("php://input"), true);

        $this->product->id = $id;
        
        // Verificar se produto existe
        if (!$this->product->readOne()) {
            jsonResponse(["error" => "Produto não encontrado"], 404);
        }

        // Atualizar propriedades
        $this->product->name = $data['name'] ?? $this->product->name;
        $this->product->slug = $data['slug'] ?? $this->product->slug;
        $this->product->category = $data['category'] ?? $this->product->category;
        $this->product->description = $data['description'] ?? $this->product->description;
        $this->product->features = $data['features'] ?? $this->product->features;
        $this->product->benefits = $data['benefits'] ?? $this->product->benefits;
        $this->product->usage = $data['usage'] ?? $this->product->usage;
        $this->product->composition = $data['composition'] ?? $this->product->composition;
        $this->product->technical_specs = $data['technicalSpecs'] ?? $this->product->technical_specs;
        $this->product->image_url = $data['imageUrl'] ?? $this->product->image_url;
        $this->product->gallery = $data['gallery'] ?? $this->product->gallery;
        $this->product->active = $data['active'] ?? $this->product->active;
        $this->product->parent_id = $data['parentId'] ?? $this->product->parent_id;
        $this->product->is_product_line = $data['isProductLine'] ?? $this->product->is_product_line;
        $this->product->line_order = $data['lineOrder'] ?? $this->product->line_order;

        if ($this->product->update()) {
            jsonResponse(["message" => "Produto atualizado com sucesso"]);
        } else {
            jsonResponse(["error" => "Erro ao atualizar produto"], 500);
        }
    }

    // DELETE /api/products/{id}
    public function destroy($id) {
        $this->product->id = $id;
        
        if ($this->product->delete()) {
            jsonResponse(["message" => "Produto deletado com sucesso"]);
        } else {
            jsonResponse(["error" => "Erro ao deletar produto"], 500);
        }
    }
}
?>