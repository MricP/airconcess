<?php
require_once __DIR__ . '/../models/User.php';


class ProfileController
{

    public static function getUser($payload)
    {
        error_log(print_r($payload, true)); // Debugging

        // Recherche de l'utilisateur par ID
        $user = User::findById($payload['idUser']);
        
        if ($user) {
            return $user; // Retourne l'utilisateur
        } else {
            return null; // Retourne null si l'utilisateur est introuvable
        }
    }

    /**
     * Fonction pour modifier l'user grâce à un formulaire
     */
    public static function updateProfileData($payload)
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $user = self::getUser($payload);


        $newFirstName = $data['firstName'] ?? null;
        $newLastName = $data['lastName'] ?? null;
        $newLocation = $data['location'] ?? null;

        if (!$newFirstName || !$newLastName || !$newLocation) {
            http_response_code(400); 
            echo json_encode(["error" => "Données invalides"]);
            return;
        }

        $result = User::updateUser($user['idUser'], $newFirstName, $newLastName, $newLocation);

        if ($result) {
            echo json_encode(["message" => "Profil modifié"]);
        } else {
            http_response_code(500); 
            echo json_encode(["error" => "Erreur lors de la mise à jour"]);
        }
    }

}
