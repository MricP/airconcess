<?php
require_once __DIR__ . '/../utils/Token.php';

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
}
