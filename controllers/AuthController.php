<?php
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../utils/Token.php';

class AuthController
{
    /**
     * Fonction pour le login
     * @param array $data Les données de connexion (email et mot de passe)
     */
    public static function login($data)
    {
        $user = User::findByEmail($data['email']);

        // Vérification de l'utilisateur et du mot de passe
        if (!$user || !password_verify($data['password'], $user['password'])) {
            http_response_code(401);
            echo json_encode(["message" => "Email ou mot de passe incorrect"]);
            exit();
        }

        // Vérifier si l'utilisateur a vérifié son adresse email
        if ($user['isVerified'] == 0) {
            http_response_code(403);
            echo json_encode(["message" => "Veuillez vérifier votre adresse email avant de vous connecter."]);
            exit();
        }

        // Génération du token JWT
        $token = Token::generate(['idUser' => $user['idUser'], 'email' => $user['email']]);
        echo json_encode(["token" => $token]);
    }

    /**
     * Fonction pour l'inscription
     * @param array $data Les données d'inscription (email, mot de passe, prénom, nom)
     */
    public static function register($data)
    {
        $password = $data['password'];
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    
        // Créer l'utilisateur
        $userId = User::create($data['email'], $hashedPassword, $data['first_name'], $data['last_name']);
    
        if ($userId) {
            // Générer un token de vérification
            $verificationToken = Token::generate(['idUser' => $userId, 'email' => $data['email']]);
    
            // Envoyer l'email de vérification
            self::sendVerificationEmail($data['email'], $verificationToken);
    
            http_response_code(201);
            echo json_encode(["message" => "Utilisateur créé. Veuillez vérifier votre adresse email."]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Erreur lors de la création de l'utilisateur"]);
        }
    }

    /**
     * Fonction pour envoyer l'email de vérification
     * @param string $email L'adresse email de l'utilisateur
     * @param string $token Le token de vérification
     */
    private static function sendVerificationEmail($email, $token)
    {
        $verificationLink = "http://localhost:3000/verify-email?token=" . urlencode($token);
        $subject = "Vérifiez votre adresse email";
        $message = "Cliquez sur le lien suivant pour vérifier votre adresse email : <a href=\"" . $verificationLink . "\">Vérifier mon email</a>";
        $headers = "From: no-reply@yourdomain.com\r\n";
        $headers .= "Reply-To: no-reply@yourdomain.com\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

        // Envoyer l'email et vérifier le résultat
        if (!mail($email, $subject, $message, $headers)) {
            error_log("Échec de l'envoi de l'email de vérification à $email"); // Journaliser l'erreur
        }
    }

    /**
     * Fonction pour vérifier l'email
     * @param array $data Les données contenant le token de vérification
     */
    public static function verifyEmail($data)
    {
        $token = $data['token'];
        $payload = Token::verify($token); // Suppose que cette méthode valide et décode le JWT

        if ($payload) {
            $userId = $payload->idUser;
            if (User::verifyEmail($userId)) {
                echo json_encode(["message" => "Email vérifié avec succès."]);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Erreur lors de la vérification de l'email."]);
            }
        } else {
            http_response_code(401);
            echo json_encode(["message" => "Token invalide ou expiré."]);
        }
    }

    /**
     * Fonction pour réinitialiser le mot de passe
     * @param array $data Les données contenant l'email et le nouveau mot de passe
     */
    public static function resetPassword($data)
    {
        $user = User::findByEmail($data['email']);

        if ($user) {
            // Vérifiez que 'new_password' est présent dans les données
            if (isset($data['new_password'])) {
                $newPassword = password_hash($data['new_password'], PASSWORD_BCRYPT);
                User::updatePassword($user['idUser'], $newPassword);
                echo json_encode(["message" => "Mot de passe réinitialisé"]);
            } else {
                http_response_code(400);
                echo json_encode(["message" => "Nouveau mot de passe non fourni"]);
            }
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Email introuvable"]);
        }
    }
}
