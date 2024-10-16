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
        // Rechercher l'utilisateur par email
        $user = User::findByEmail($data['email']);

        // Si l'utilisateur n'existe pas ou si le mot de passe est incorrect
        if (!$user || !password_verify($data['password'], $user['password'])) {
            http_response_code(401);
            echo json_encode(["message" => "Email ou mot de passe incorrect"]);
            exit();
        }

        // Vérifier si l'utilisateur a vérifié son adresse email
        if ($user['isVerified'] == 0) {
            http_response_code(403);
            echo json_encode(["message" => "Veuillez vérifier votre adresse email avant de vous connecter, allez voir vos emails"]);
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
        $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);

        // Création de l'utilisateur
        $userId = User::create($data['email'], $hashedPassword, $data['firstName'], $data['lastName']);

        if ($userId) {
            // Génération d'un token de vérification
            $verificationToken = Token::generate(['idUser' => $userId, 'email' => $data['email']]);

            // Envoi de l'email de vérification
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
     * @param string $email L'email de l'utilisateur
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
        if (mail($email, $subject, $message, $headers)) {
            echo "Email de vérification envoyé avec succès à " . $email;
        } else {
            echo "Échec de l'envoi de l'email de vérification à " . $email;
        }
    }

    /**
     * Fonction pour vérifier l'email
     * @param array $data Les données contenant le token de vérification
     */
    public static function verifyEmail($data)
    {
        $token = $data['token'];
        $payload = Token::verify($token);

        if ($payload) {
            $userId = $payload->idUser;
            User::verifyEmail($userId);
            echo json_encode(["message" => "Email vérifié"]);
        } else {
            http_response_code(401);
            echo json_encode(["message" => "Token invalide ou expiré"]);
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
                echo json_encode(["message" => "Nouveau mot de passe manquant"]);
            }
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Email introuvable"]);
        }
    }
}

