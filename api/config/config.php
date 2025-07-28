<?php
// Configurações gerais da aplicação
define('API_VERSION', 'v1');
define('BASE_URL', '/api');

// Headers CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Responder a requisições OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Função para resposta JSON
function jsonResponse($data, $status_code = 200) {
    http_response_code($status_code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit();
}

// Função para validar dados
function validateRequired($data, $required_fields) {
    $errors = [];
    foreach ($required_fields as $field) {
        if (!isset($data[$field]) || empty(trim($data[$field]))) {
            $errors[] = "Campo '$field' é obrigatório";
        }
    }
    return $errors;
}

// Função para sanitizar dados
function sanitizeInput($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}
?>