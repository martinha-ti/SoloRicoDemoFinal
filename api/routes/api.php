<?php
require_once '../config/config.php';
require_once '../config/database.php';
require_once '../controllers/ProductController.php';
require_once '../controllers/BlogController.php';
require_once '../controllers/ContactController.php';
require_once '../controllers/JobApplicationController.php';
require_once '../controllers/AdminController.php';

// Inicializar banco de dados
$database = new Database();
$db = $database->getConnection();

// Inicializar controllers
$productController = new ProductController($db);
$blogController = new BlogController($db);
$contactController = new ContactController($db);
$jobApplicationController = new JobApplicationController($db);
$adminController = new AdminController($db);

// Obter método HTTP e URI
$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = str_replace('/api', '', $uri);
$uri_segments = explode('/', trim($uri, '/'));

// Roteamento
try {
    switch ($uri_segments[0]) {
        case 'products':
            switch ($method) {
                case 'GET':
                    if (isset($uri_segments[1])) {
                        if ($uri_segments[1] === 'main-lines') {
                            $productController->mainLines();
                        } elseif ($uri_segments[1] === 'category' && isset($uri_segments[2])) {
                            $productController->byCategory($uri_segments[2]);
                        } else {
                            $productController->show($uri_segments[1]);
                        }
                    } else {
                        $productController->index();
                    }
                    break;
                case 'POST':
                    $productController->store();
                    break;
                case 'PUT':
                    if (isset($uri_segments[1])) {
                        $productController->update($uri_segments[1]);
                    }
                    break;
                case 'DELETE':
                    if (isset($uri_segments[1])) {
                        $productController->destroy($uri_segments[1]);
                    }
                    break;
            }
            break;

        case 'blog':
            switch ($method) {
                case 'GET':
                    if (isset($uri_segments[1])) {
                        if ($uri_segments[1] === 'category' && isset($uri_segments[2])) {
                            $blogController->byCategory($uri_segments[2]);
                        } else {
                            $blogController->show($uri_segments[1]);
                        }
                    } else {
                        $blogController->index();
                    }
                    break;
                case 'POST':
                    $blogController->store();
                    break;
                case 'PUT':
                    if (isset($uri_segments[1])) {
                        $blogController->update($uri_segments[1]);
                    }
                    break;
                case 'DELETE':
                    if (isset($uri_segments[1])) {
                        $blogController->destroy($uri_segments[1]);
                    }
                    break;
            }
            break;

        case 'contact':
            switch ($method) {
                case 'POST':
                    $contactController->store();
                    break;
                case 'GET':
                    $contactController->index();
                    break;
            }
            break;

        case 'job-application':
            switch ($method) {
                case 'POST':
                    $jobApplicationController->store();
                    break;
                case 'GET':
                    $jobApplicationController->index();
                    break;
            }
            break;

        case 'admin':
            if (isset($uri_segments[1])) {
                switch ($uri_segments[1]) {
                    case 'login':
                        if ($method === 'POST') {
                            $adminController->login();
                        }
                        break;
                    case 'logout':
                        if ($method === 'POST') {
                            $adminController->logout();
                        }
                        break;
                    case 'users':
                        switch ($method) {
                            case 'GET':
                                $adminController->index();
                                break;
                            case 'POST':
                                $adminController->store();
                                break;
                            case 'PUT':
                                if (isset($uri_segments[2])) {
                                    $adminController->update($uri_segments[2]);
                                }
                                break;
                            case 'DELETE':
                                if (isset($uri_segments[2])) {
                                    $adminController->destroy($uri_segments[2]);
                                }
                                break;
                        }
                        break;
                }
            }
            break;

        default:
            jsonResponse(["error" => "Endpoint não encontrado"], 404);
            break;
    }
} catch (Exception $e) {
    jsonResponse(["error" => "Erro interno do servidor", "message" => $e->getMessage()], 500);
}
?>