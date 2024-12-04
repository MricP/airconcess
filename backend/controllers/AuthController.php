<?php
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../utils/Token.php';
require_once __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class AuthController
{
    /**
     * Fonction pour le login
     * @param array $data Les données de connexion (email et mot de passe)
     */
    public static function login($data)
    {
        $user = User::findByEmail($data['email']);

        if (!$user || !password_verify($data['password'], $user['password'])) {
            http_response_code(401);
            echo json_encode(["message" => "Email ou mot de passe incorrect"]);
            exit();
        }

        if ($user['isVerified'] == 0) {
            http_response_code(403);
            echo json_encode(["message" => "Veuillez vérifier votre adresse email avant de vous connecter."]);
            exit();
        }

        $payload = [
            'idUser' => $user['idUser'],
            'email' => $user['email'],
            'iat' => time(),
            'exp' => time() + 3600
        ];

        $token = Token::generate($payload);
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

        $userId = User::create($data['email'], $hashedPassword, $data['first_name'], $data['last_name']);

        if ($userId) {
            $payload = [
                'idUser' => $userId,
                'email' => $data['email'],
                'iat' => time(),
                'exp' => time() + 3600
            ];

            $verificationToken = Token::generate($payload);
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
        $body = "Cliquez sur le lien suivant pour vérifier votre adresse email : ";
        $body .= "<a href='" . $verificationLink . "'>Vérifier mon email</a>";

        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'airconcess.contact@gmail.com';
            $mail->Password = 'qtbriwetjarfsgry';
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;

            $mail->setFrom('airconcess.contact@gmail.com', 'AirConcess');
            $mail->addAddress($email, 'Utilisateur');

            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body    = $body;
            $mail->AltBody = strip_tags($body);

            if ($mail->send()) {
                echo 'Email de vérification envoyé avec succès à ' . $email;
            } else {
                echo 'Erreur lors de l\'envoi de l\'email de vérification. Mailer Error: ' . $mail->ErrorInfo;
            }
        } catch (Exception $e) {
            echo "Échec de l'envoi de l'email de vérification. Mailer Error: {$mail->ErrorInfo}";
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

        if ($payload && isset($payload['idUser'])) {  // Note: Utiliser $payload['idUser'] pour être cohérent
            $userId = $payload['idUser'];
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
     * @param array $data Les données contenant le token et le nouveau mot de passe
     */
    public static function resetPassword($data)
    {
        $token = $data['token'];
        $payload = Token::verify($token);

        if ($payload && isset($payload['email'])) {
            $user = User::findByEmail($payload['email']);

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
        } else {
            http_response_code(401);
            echo json_encode(["message" => "Token invalide ou expiré"]);
        }
    }

    public static function getUser($payload)
    {
        error_log(print_r($payload, true));
        $user = User::findById($payload['idUser']);
        if ($user) {
            echo json_encode($user);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Utilisateur introuvable."]);
        }
    }

    public static function sendTokenForReset($data)
    {
        if (is_array($data['email'])) {
            $email = $data['email']['email'];
        } else {
            $email = $data['email'];
        }

        $payload = [
            'email' => $email,
            'iat' => time(),
            'exp' => time() + 3600
        ];

        $resetToken = Token::generate($payload);
        $resetLink = "http://localhost:3000/reset-password?token=" . urlencode($resetToken);

        $subject = "Réinitialisez votre mot de passe";
        $body = "Cliquez sur le lien suivant pour réinitialiser votre mot de passe : ";
        $body .= "<a href='" . $resetLink . "'>Réinitialiser mon mot de passe</a>";

        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'airconcess.contact@gmail.com';
            $mail->Password = 'qtbriwetjarfsgry';
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;

            $mail->setFrom('airconcess.contact@gmail.com', 'AirConcess');
            $mail->addAddress($email, 'Utilisateur');

            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body    = $body;
            $mail->AltBody = strip_tags($body);

            if ($mail->send()) {
                echo 'Email de réinitialisation envoyé avec succès à ' . $email;
            } else {
                echo 'Erreur lors de l\'envoi de l\'email de réinitialisation. Mailer Error: ' . $mail->ErrorInfo;
            }
        } catch (Exception $e) {
            echo "Échec de l'envoi de l'email de réinitialisation. Mailer Error: {$mail->ErrorInfo}";
        }
    }
}
