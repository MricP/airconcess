<?php
class ValidationMiddleware
{

    public static function validateTest($data)
    {
        if (!isset($data['content'])) {
            http_response_code(400);
            echo json_encode(["message" => "Le contenu ne peut pas être vide"]);
            throw new Exception("Validation error");
        }
    }

    public static function validateLogin($data)
    {
        if (!isset($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(["message" => "Email invalide"]);
            exit();
        }

        if (!isset($data['password']) || strlen($data['password']) < 6) {
            http_response_code(400);
            echo json_encode(["message" => "Mot de passe doit contenir au moins 6 caractères"]);
            exit();
        }
    }

    public static function validateRegister($data)
    {
        if (!isset($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(["message" => "Email invalide"]);
            exit();
        }

        if (!isset($data['password']) || strlen($data['password']) < 6) {
            http_response_code(400);
            echo json_encode(["message" => "Mot de passe doit contenir au moins 6 caractères"]);
            exit();
        }

        if ($data['password'] !== $data['password_confirmation']) {
            http_response_code(400);
            echo json_encode(["message" => "Mot de passe et confirmation ne correspondent pas"]);
            exit();
        }
    }

    public static function validateVerifyEmail($data)
    {
        if (!isset($data['token'])) {
            http_response_code(400);
            echo json_encode(["message" => "Token manquant"]);
            exit();
        }
    }

    public static function validateResetPassword($data)
    {
        if (!isset($data['token'])) {
            http_response_code(400);
            echo json_encode(["message" => "Token manquant"]);
            exit();
        }
    }

    public static function validateResetPasswordRequest($data)
    {
        if (!isset($data['email'])) {
            http_response_code(400);
            echo json_encode(["message" => "Email invalide"]);
            exit();
        }
    }
}
