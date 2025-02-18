<?php
require_once __DIR__ . '/../config/config.php';

class Token
{
    public static function generate($payload)
    {
        $config = include(__DIR__ . '/../config/config.php');
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);

        $payload['exp'] = time() + 3600; // 3600 secondes = 1 heure
        $payload = json_encode($payload);

        $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
        $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));

        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $config['jwt_secret'], true);
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    public static function verify($token)
    {
        $config = include(__DIR__ . '/../config/config.php');
        $parts = explode('.', $token);

        if (count($parts) !== 3) {
            return false; 
        }

        $signatureProvided = $parts[2];
        $headerAndPayload = $parts[0] . '.' . $parts[1];
        $signature = hash_hmac('sha256', $headerAndPayload, $config['jwt_secret'], true);
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

        if ($base64UrlSignature !== $signatureProvided) {
            return false;  
        }

        $payload = json_decode(base64_decode($parts[1]), true);

        if (isset($payload['exp']) && $payload['exp'] < time()) {
            return false;  
        }

        return $payload;  
    }

    public static function verifyAdmin($token)
    {
        $config = include(__DIR__ . '/../config/config.php');
        $parts = explode('.', $token);


        $headerAndPayload = $parts[0] . '.' . $parts[1];

        $payload = json_decode(base64_decode($parts[1]), true);

        if (isset($payload['exp']) && $payload['exp'] < time()) {
            return false;  
        }

        if (!isset($payload['isAdmin'])) {
            return false;  
        }

        return $payload;  
    }
}
