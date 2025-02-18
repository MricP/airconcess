<?php
require_once __DIR__ . '/../utils/Token.php';
ini_set('log_errors', 1); // Activer la journalisation des erreurs
ini_set('error_log', __DIR__ . '/error_log.txt'); // Définir le fichier de log
error_reporting(E_ALL); // Activer tous les niveaux d'erreurs
ini_set('display_errors', 1);

class AuthMiddleware
{
    public static function handle($request, $next)
    {
        // Get the Authorization header
        $headers = getallheaders();
        if (!isset($headers['Authorization'])) {
            http_response_code(401);
            echo json_encode(["message" => "Authorization header missing"]);
            exit();
        }

        // Extract the token from the header
        $token = str_replace('Bearer ', '', $headers['Authorization']);

        // Verify the token
        $payload = Token::verify($token);
        if (!$payload) {
            http_response_code(401);
            echo json_encode(["message" => "Invalid or expired token"]);
            exit();
        }

        // Add the user data to the request
        $request['user'] = $payload;

        // Call the next middleware/controller
        return $next($request);
    }

    public static function verifyAdminAccess($headers)
    {
        error_log("Headers: " . print_r($headers['Authorization'], true));

        if (!isset($headers['Authorization'])) {
            http_response_code(401);
            echo json_encode(["message" => "Authorization header missing"]);
            exit();
        }

        $token = str_replace('Bearer ', '', $headers['Authorization']);
        error_log("TOKEN:" . print_r($token, true));
        $payload = Token::verifyAdmin($token);
        error_log("payload:" . print_r($payload, true));

        if (!$payload || !isset($payload['isAdmin'])) {
            http_response_code(403);
            echo json_encode(["message" => "Access forbidden. Admin role required."]);
            exit();
        }


        if ($payload['isAdmin'] !== 1) {
            http_response_code(403);
            echo json_encode(["message" => "Access forbidden. Admin role required."]);
            exit();
        }

        return $payload;
    }
}
