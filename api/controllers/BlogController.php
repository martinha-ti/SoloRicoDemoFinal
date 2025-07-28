<?php
require_once '../models/BlogPost.php';

class BlogController {
    private $db;
    private $blog_post;

    public function __construct($database) {
        $this->db = $database;
        $this->blog_post = new BlogPost($this->db);
    }

    // GET /api/blog
    public function index() {
        $stmt = $this->blog_post->read();
        $posts = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $post_item = [
                "id" => $row['id'],
                "title" => $row['title'],
                "slug" => $row['slug'],
                "excerpt" => $row['excerpt'],
                "content" => $row['content'],
                "category" => $row['category'],
                "imageUrl" => $row['image_url'],
                "publishedAt" => $row['published_at'],
                "isActive" => (bool)$row['is_active'],
                "createdAt" => $row['created_at'],
                "updatedAt" => $row['updated_at']
            ];
            array_push($posts, $post_item);
        }

        jsonResponse($posts);
    }

    // GET /api/blog/{slug}
    public function show($slug) {
        $this->blog_post->slug = $slug;
        $stmt = $this->blog_post->readBySlug();
        
        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $post_item = [
                "id" => $row['id'],
                "title" => $row['title'],
                "slug" => $row['slug'],
                "excerpt" => $row['excerpt'],
                "content" => $row['content'],
                "category" => $row['category'],
                "imageUrl" => $row['image_url'],
                "publishedAt" => $row['published_at'],
                "isActive" => (bool)$row['is_active'],
                "createdAt" => $row['created_at'],
                "updatedAt" => $row['updated_at']
            ];

            jsonResponse($post_item);
        } else {
            jsonResponse(["error" => "Post não encontrado"], 404);
        }
    }

    // GET /api/blog/category/{category}
    public function byCategory($category) {
        $this->blog_post->category = $category;
        $stmt = $this->blog_post->readByCategory();
        $posts = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $post_item = [
                "id" => $row['id'],
                "title" => $row['title'],
                "slug" => $row['slug'],
                "excerpt" => $row['excerpt'],
                "category" => $row['category'],
                "imageUrl" => $row['image_url'],
                "publishedAt" => $row['published_at'],
                "createdAt" => $row['created_at']
            ];
            array_push($posts, $post_item);
        }

        jsonResponse($posts);
    }

    // POST /api/blog
    public function store() {
        $data = json_decode(file_get_contents("php://input"), true);

        // Validar campos obrigatórios
        $required = ['title', 'slug', 'excerpt', 'content', 'category'];
        $errors = validateRequired($data, $required);
        
        if (!empty($errors)) {
            jsonResponse(["error" => "Dados inválidos", "details" => $errors], 400);
        }

        // Definir propriedades
        $this->blog_post->title = $data['title'];
        $this->blog_post->slug = $data['slug'];
        $this->blog_post->excerpt = $data['excerpt'];
        $this->blog_post->content = $data['content'];
        $this->blog_post->category = $data['category'];
        $this->blog_post->image_url = $data['imageUrl'] ?? null;
        $this->blog_post->published_at = $data['publishedAt'] ?? date('Y-m-d H:i:s');
        $this->blog_post->is_active = $data['isActive'] ?? true;

        if ($this->blog_post->create()) {
            jsonResponse(["message" => "Post criado com sucesso", "id" => $this->blog_post->id], 201);
        } else {
            jsonResponse(["error" => "Erro ao criar post"], 500);
        }
    }

    // PUT /api/blog/{id}
    public function update($id) {
        $data = json_decode(file_get_contents("php://input"), true);

        $this->blog_post->id = $id;
        
        // Atualizar propriedades
        $this->blog_post->title = $data['title'];
        $this->blog_post->slug = $data['slug'];
        $this->blog_post->excerpt = $data['excerpt'];
        $this->blog_post->content = $data['content'];
        $this->blog_post->category = $data['category'];
        $this->blog_post->image_url = $data['imageUrl'] ?? null;
        $this->blog_post->published_at = $data['publishedAt'] ?? date('Y-m-d H:i:s');
        $this->blog_post->is_active = $data['isActive'] ?? true;

        if ($this->blog_post->update()) {
            jsonResponse(["message" => "Post atualizado com sucesso"]);
        } else {
            jsonResponse(["error" => "Erro ao atualizar post"], 500);
        }
    }

    // DELETE /api/blog/{id}
    public function destroy($id) {
        $this->blog_post->id = $id;
        
        if ($this->blog_post->delete()) {
            jsonResponse(["message" => "Post deletado com sucesso"]);
        } else {
            jsonResponse(["error" => "Erro ao deletar post"], 500);
        }
    }
}
?>