<?php
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../utils/Token.php';

class PasswordController {

    public static function requestReset($data) {
        $user = User::findByEmail($data['email']);
        if($user) {
            $resetToken = Token::generate(['id' => $user['id']]);

             // Envoi d’un email de réinitialisation (simplifié)
             mail($user['email'], "Reset mot de passe", "pour reset votre mot de passe : /reset-password?token=$resetToken");
             echo json_encode(['message' => 'Reset email sent']);
            } else {
                http_response_code(404);
                echo json_encode(['message' => 'User non trouvé']);
            }
        }
    
        public static function resetPassword($data) {
            $payload = Token::validate($data['token']);
            if ($payload) {
                $newPassword = password_hash($data['new_password'], PASSWORD_BCRYPT);
                User::updatePassword($payload['id'], $newPassword);
                echo json_encode(['message' => 'Mot de passe réinitialisé']);
            } else {
                http_response_code(401);
                echo json_encode(['message' => 'Token invalide']);
            }
        }
    }
?>