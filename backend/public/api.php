<?php
require_once __DIR__ . '../../middlewares/CorsMiddleware.php';
// require_once __DIR__ . '../../middlewares/AuthMiddleware.php';
require_once __DIR__ . '../../middlewares/ValidationMiddleware.php';
require_once __DIR__ . '../../controllers/AuthController.php';
require_once __DIR__ . '../../controllers/ContactController.php';
require_once __DIR__ . '../../controllers/ProductController.php';
require_once __DIR__ . '../../models/Aircraft.php';
require_once __DIR__ . '../../controllers/AppointmentController.php';
require_once __DIR__ . '../../controllers/CatalogController.php';

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

// Route pour recevoir le formulaire de contact (POST)  
if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/contact-submit') !== false) {
    $data = json_decode(file_get_contents("php://input"), true);
    ValidationMiddleware::validateContact($data);
    ContactController::contact($data);
} 

// Partie page appointment 

if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/appointment-submit') !== false) {
    $data = json_decode(file_get_contents("php://input"), true);
    echo json_encode(["message" => $data['formData']['phone']]);
    var_dump($data); // Vérifie que les données sont correctement reçues
    AppointmentController::createAppointment($data);
} 

if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/appointment-loadTimestamps') !== false) {
    // echo json_encode(["message" => "Load timestamps"]);
    AppointmentController::getTimestamps();
} 

if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/appointment-loadAircrafts') !== false) {
    echo json_encode(["message" => "Load aircrafts"]);
    // AppointmentController::getAircrafts();
} 


// Partie page catalog (EMRIC TODO)

// Route pour récupérer les données des aéronefs (GET)
if($_SERVER['REQUEST_METHOD'] === 'GET' && strpos($_SERVER['REQUEST_URI'], '/catalog') !== false){
    CatalogControlleur::getAircrafts();
}


if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/product/get-icon') !== false) {
    $input = json_decode(file_get_contents("php://input"), true);
    ProductController::getIconOf($input['id']);
}

// Partie page product

if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/product/get-aircraftWithId') !== false) {
    $input = json_decode(file_get_contents("php://input"), true);
    ProductController::getAircraftWith($input['idAircraft']);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/product/get-modelName') !== false) {
    $input = json_decode(file_get_contents("php://input"), true);
    ProductController::getModelNameOf($input['idAircraft']);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/product/get-mainImg') !== false) {
    $input = json_decode(file_get_contents("php://input"), true);
    ProductController::getMainImgOf($input['idAircraft']);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/product/get-sliderImgs') !== false) {
    $input = json_decode(file_get_contents("php://input"), true);
    ProductController::getSliderImgsOf($input['idAircraft']);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/product/get-modelDescription') !== false) {
    $input = json_decode(file_get_contents("php://input"), true);
    ProductController::getModelDescriptionOf($input['idAircraft']);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/product/get-aircraftDescription') !== false) {
    $input = json_decode(file_get_contents("php://input"), true);
    ProductController::getAircraftDescriptionOf($input['idAircraft']);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/admin/insert-Aircraft') !== false) {
    $args = json_decode(file_get_contents("php://input"), true);
    Aircraft::insertAircraft(
        $args["idModel"],
        $args["serialNumber"],
        $args["manufactureYear"], 
        $args["flightHours"],
        $args["configuration"],
        $args["recentMaintenance"],
        $args["typicalRoutes"],
        $args["owner"],
        $args["costPerKm"],
        $args["monthlyMaintenanceCost"],
        $args["estimatedPrice"],
        $args["isAvailable"]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/admin/get-Model') !== false) {
    ProductController::getAllModel();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/admin/get-ByNameModel') !== false) {
    $args = json_decode(file_get_contents("php://input"), true);
    ProductController::getModelByName($args["nameModel"]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/admin/insert-Model') !== false) {
    $args = json_decode(file_get_contents("php://input"), true);
    Aircraft::insertModel(
        $args["modelName"],
        $args["rangeType"],
        $args["manufacturer"], 
        $args["passengerCapacity"],
        $args["engines"],
        $args["speedAvg"],
        $args["maxRange"],
        $args["maxAltitude"],
        $args["crewSize"],
        $args["length"],
        $args["wingspan"],
        $args["height"],
        $args["maxTakeoffWeight"]);
}
?>
