<?php
require_once __DIR__ . '../../middlewares/CorsMiddleware.php';
// require_once __DIR__ . '../../middlewares/AuthMiddleware.php';
require_once __DIR__ . '../../middlewares/ValidationMiddleware.php';
require_once __DIR__ . '../../controllers/AuthController.php';

// Middleware CORS globalement
CorsMiddleware::handle();

// Route pour le message de test (GET)
if ($_SERVER['REQUEST_METHOD'] === 'GET' && strpos($_SERVER['REQUEST_URI'], '/api') !== false) {
    echo json_encode(["message" => "Message de test"]);
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

// Route pour réinitialiser le mot de passe (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/auth/reset-password') !== false) {
    $data = json_decode(file_get_contents("php://input"), true);
    ValidationMiddleware::validateResetPassword($data);
    AuthController::resetPassword($data);
}







?>
