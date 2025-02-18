<?php
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../utils/Token.php';
require_once __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class AuthController
{
    private static $smtp_host;
    private static $smtp_username;
    private static $smtp_password;
    private static $smtp_port;
    private static $smtp_secure;
    private static $name;

    public static function init()
    {
        if (empty(self::$smtp_host) || empty(self::$smtp_username)) {
            $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
            $dotenv->load();

            self::$smtp_host = $_ENV['SMTP_HOST'];
            self::$smtp_username = $_ENV['SMTP_USERNAME'];
            self::$smtp_password = $_ENV['SMTP_PASSWORD'];
            self::$smtp_port = $_ENV['SMTP_PORT'];
            self::$smtp_secure = $_ENV['SMTP_SECURE'];
        }
    }
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
            'isAdmin' => $user['isAdmin'],  
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
                'isAdmin' => 0,
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
        self::init();

        $verificationLink = "http://localhost:3000/verify-email?token=" . urlencode($token);

        $subject = "Verifiez votre adresse email";
        $body = "Cliquez sur le lien suivant pour vérifier votre adresse email : ";
        $body = "
        <div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f7; border-radius: 10px;\">
            <h2 style=\"color: #333333; text-align: center;\">Vérifier mon adresse email</h2>
            <p style=\"font-size: 16px; color: black;\">
                Bonjour,
            </p>
            <p style=\"font-size: 16px; color: black;\">
                Merci de vous être inscrit sur notre site ! Pour finaliser votre inscription et commencer à utiliser tous nos services, veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous :
            </p>
            <div style=\"text-align: center; margin: 20px 0;\">
                <a href='" . $verificationLink . "'>Vérifier mon email</a>
            </div>
            <p style=\"font-size: 14px; color: black; text-align: center;\">
                Si vous n'avez pas créé de compte chez nous, vous pouvez ignorer cet email en toute sécurité.
            </p>
            <p style=\"font-size: 14px; color: black; text-align: center;\">
                Merci,<br />L'équipe de support
            </p>
            <div style=\"text-align: center; padding: 10px; font-size: 12px; color: black;\">
                <p>&copy; 2024 AirConcess. Tous droits réservés.</p>
            </div>
        </div>    
        ";
        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host = self::$smtp_host;
            $mail->SMTPAuth = true;
            $mail->Username = self::$smtp_username;
            $mail->Password = self::$smtp_password;
            $mail->SMTPSecure = self::$smtp_secure;
            $mail->Port = self::$smtp_port;

            $mail->setFrom(self::$smtp_username, 'AirConcess');
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

        if ($payload && isset($payload['idUser'])) {
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

        $subject = "Reinitialisez votre mot de passe";
        $body = "
            <div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f7; border-radius: 10px;\">
                <h2 style=\"color: #333333; text-align: center;\">Réinitialiser mon mot de passe</h2>
                <p style=\"font-size: 16px; color: black;\">
                    Bonjour,
                </p>
                <p style=\"font-size: 16px; color: black;\">
                    Vous avez fait une demande de réinitialisation de mot de passe, vous pouvez vous rendre sur le lien ci dessous.
                </p>
                <div style=\"text-align: center; margin: 20px 0;\">
                    <a href=\"" . $resetLink . "\" style=\"padding: 10px 20px; background-color: #333333; color: white; text-decoration: none; border-radius: 5px;\">Réinitialiser mon mot de passe</a>
                </div>
                <p style=\"font-size: 14px; color: black; text-align: center;\">
                    Si vous n'avez pas créé de compte chez nous, vous pouvez ignorer cet email en toute sécurité.
                </p>
                <p style=\"font-size: 14px; color: black; text-align: center;\">
                    Merci,<br />L'équipe de support
                </p>
                <div style=\"text-align: center; padding: 10px; font-size: 12px; color: black;\">
                    <p>&copy; 2024 AirConcess. Tous droits réservés.</p>
                </div>
            </div>
        ";

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
