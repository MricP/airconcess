<?php
require_once __DIR__ . '../../middlewares/CorsMiddleware.php';
// require_once __DIR__ . '../../middlewares/AuthMiddleware.php';
require_once __DIR__ . '../../middlewares/ValidationMiddleware.php';
require_once __DIR__ . '../../controllers/AuthController.php';
require_once __DIR__ . '../../controllers/ContactController.php';
require_once __DIR__ . '../../controllers/ProductController.php';
require_once __DIR__ . '../../controllers/TestimonialController.php';
require_once __DIR__ . '../../models/Aircraft.php';
require_once __DIR__ . '../../controllers/AppointmentController.php';
require_once __DIR__ . '../../controllers/CatalogController.php';
require_once __DIR__ . '../../controllers/ProfileController.php';
require_once __DIR__ . '../../controllers/TrainingController.php';

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

if ($_SERVER['REQUEST_METHOD'] === 'GET' && strpos($_SERVER['REQUEST_URI'], 'testimonial/id-user') !== false) {
    $id_user = $_GET['id_user'] ?? null;
    TestimonialController::getTestimonialsByUser($id_user);
}


if ($_SERVER['REQUEST_METHOD'] === 'GET' && strpos($_SERVER['REQUEST_URI'], '/testimonials') !== false) {
    TestimonialController::getAllTestimonials();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/auth/create-testimonial') !== false) {
    $data = json_decode(file_get_contents("php://input"), true);
    TestimonialController::createTestimonial($data);
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
    AppointmentController::createAppointment($data);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/appointment-loadTimestamps') !== false) {
    $agency_id = json_decode(file_get_contents("php://input"), true);
    AppointmentController::getTimestamps($agency_id);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/appointment-loadAircraftWithId') !== false) {
    $airc_id = json_decode(file_get_contents("php://input"), true);
    AppointmentController::getAircraft($airc_id);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/appointment-loadAgencies') !== false) {
    AppointmentController::getAgencies();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/appointment-loadAgencyLocation') !== false) {
    $agency_id = json_decode(file_get_contents("php://input"), true);
    AppointmentController::getAgencyLocation($agency_id);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/appointment-loadModels') !== false) {
    AppointmentController::getModels();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/appointment-loadAircrafts') !== false) {
    $model_id = json_decode(file_get_contents("php://input"), true);
    AppointmentController::getAircraftsOfModel($model_id);
}

// Partie page catalog 

// Route pour récupérer les données des aéronefs (GET)
if ($_SERVER['REQUEST_METHOD'] === 'GET' && strpos($_SERVER['REQUEST_URI'], '/catalog') !== false) {
    CatalogControlleur::getAircrafts();
}


if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/product/get-icon') !== false) {
    $input = json_decode(file_get_contents("php://input"), true);
    ProductController::getIconOf($input['id']);
}

// Partie page product

if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/product/get-aircraftWithId') !== false) {
    $id = json_decode(file_get_contents("php://input"), true);
    ProductController::getAircraftWith($id);
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
    $result = ProductController::insertAircraft(
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
        $args["isAvailable"],
        $args["description"]
    );
    echo json_encode($result);
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
    $result =ProductController::insertModel(
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
        $args["maxTakeoffWeight"]
    );

    echo json_encode($result);
}
// Partie Profile

if ($_SERVER['REQUEST_METHOD'] === 'PUT' && strpos($_SERVER['REQUEST_URI'], '/my-profile') !== false) {
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(["message" => "Bonjour, vous devez vous connecter pour accéder à cette ressource"]);
        exit();
    }
    $token = str_replace('Bearer ', '', $headers['Authorization']);
    $payload = Token::verify($token);

    ProfileController::updateProfileData($payload);
}

if($_SERVER['REQUEST_METHOD'] === 'DELETE' && strpos($_SERVER['REQUEST_URI'], '/my-profile/delete') !== false){
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(["message" => "Bonjour, vous devez vous connecter pour accéder à cette ressource"]);
        exit();
    }
    $token = str_replace('Bearer ', '', $headers['Authorization']);
    $payload = Token::verify($token);

    ProfileController::deleteProfilUser($payload);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/my-profile/change-picture') !== false) {
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(["message" => "Bonjour, vous devez vous connecter pour accéder à cette ressource"]);
        exit();
    }
    $token = str_replace('Bearer ', '', $headers['Authorization']);
    $payload = Token::verify($token);

    if (isset($_FILES['image'])) { 
        $file = $_FILES['image'];
        ProfileController::changeProfilePicture($file,$payload);
    } else {
        echo json_encode(['error' => 'Aucun fichier reçu']);
        http_response_code(400); 
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && strpos($_SERVER['REQUEST_URI'], '/profile/get-appointment-user') !== false) {
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(["message" => "Bonjour, vous devez vous connecter pour accéder au donnée de temps"]);
        exit();
    }
    $token = str_replace('Bearer ', '', $headers['Authorization']);
    $payload = Token::verify($token);
    ProfileController::getAppointment($payload);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/admin/post-uploadImage') !== false) {
    $aircraftId = $_POST['aircraftId'] ?? null;
    $destinationDir = $_POST['destinationDir'] ?? null; // Récupérer le dossier
    $file = $_FILES['file'] ?? null; // Récupérer le fichier

    if (!$file || !$destinationDir) {
        echo json_encode(['success' => false, 'message' => 'Fichier ou dossier manquant.']);
        exit;
    }

    $result = ProductController::uploadImage($file, $destinationDir, $aircraftId);
    echo json_encode($result);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/admin/insert-Image') !== false) {
    $args = json_decode(file_get_contents("php://input"), true);
    $result = ProductController::insertImage(
        $args["role"],
        $args["aircraftId"],
        $args["url"]);
    echo json_encode($result);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/admin/get-AircraftBySerialNumber') !== false) {
    $args = json_decode(file_get_contents("php://input"), true);
    ProductController::getAircraftBySerialNumber($args["serialNumber"]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/admin/delete-Aircraft') !== false) {
    $args = json_decode(file_get_contents("php://input"), true);
    $result = Aircraft::deleteAircraft($args['id'], $args['nameModel']);
    echo json_encode($result);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/admin/delete-Model') !== false) {
    $args = json_decode(file_get_contents("php://input"), true);
    $result = Aircraft::deleteModel($args['id'], $args['nameModel']);
    echo json_encode($result);
}

// Partie page sub-training

if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/subTraining/submit') !== false) {
    $data = json_decode(file_get_contents("php://input"), true);
    TrainingController::createTraining($data);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && strpos($_SERVER['REQUEST_URI'], '/subTraining/get-trainers') !== false) {
    TrainingController::getAllTrainers();
}