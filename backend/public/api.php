<?php
require_once __DIR__ . '../../middlewares/CorsMiddleware.php';
// require_once __DIR__ . '../../middlewares/AuthMiddleware.php';
require_once __DIR__ . '../../middlewares/ValidationMiddleware.php';
require_once __DIR__ . '../../controllers/AuthController.php';

// Middleware CORS globalement
CorsMiddleware::handle();

// Route pour le message de test (GET)
if ($_SERVER['REQUEST_METHOD'] === 'GET' && preg_match('/\/api\/?$/', $_SERVER['REQUEST_URI'])) {
    echo json_encode(["message" => "Message de test Bonjour"]);
}

// Route pour l'inscription (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/auth/sign-up') !== false) {
    $data = json_decode(file_get_contents("php://input"), true);
    ValidationMiddleware::validateRegister($data);
    AuthController::register($data);
}

// Route pour vérifier l'email (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/auth/verify-email') !== false) {
    $data = json_decode(file_get_contents("php://input"), true);
    ValidationMiddleware::validateVerifyEmail($data);
    AuthController::verifyEmail($data);
}

// Route pour le login (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/auth/sign-in') !== false) {
    $data = json_decode(file_get_contents("php://input"), true);
    ValidationMiddleware::validateLogin($data);
    AuthController::login($data);
}

// Route de demande de réinitialisation du mot de passe (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/auth/reset-password-request') !== false) {
    $data = json_decode(file_get_contents("php://input"), true);
    ValidationMiddleware::validateResetPasswordRequest($data);
    AuthController::sendTokenForReset($data);
}

// Route pour réinitialiser le mot de passe (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/auth/reset-password') !== false) {
    $data = json_decode(file_get_contents("php://input"), true);
    ValidationMiddleware::validateResetPassword($data);
    AuthController::resetPassword($data);
}

// Route pour récupérer ou modifier l'utilisateur (GET et PUT)
if ($_SERVER['REQUEST_METHOD'] === 'GET' && strpos($_SERVER['REQUEST_URI'], '/auth/user') !== false) {
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(["message" => "Bonjour, vous devez vous connecter pour accéder à cette ressource"]);
        exit();
    }
    $token = str_replace('Bearer ', '', $headers['Authorization']);
    $payload = Token::verify($token);
    if (!$payload) {
        http_response_code(401);
        echo json_encode(["message" => "Bonjour, vous devez vous connecter pour accéder à cette ressource"]);
        exit();
    }
    AuthController::getUser($payload);
}


if($_SERVER['REQUEST_METHOD'] === 'GET' && strpos($_SERVER['REQUEST_URI'], '/auth/user') !== false) {
    $headers = getallheaders();
    
}

?>
