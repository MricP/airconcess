<?php
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../models/Appointment.php';


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
    public static function updateProfileData($payload){
        $data = json_decode(file_get_contents("php://input"), true);
        $user = self::getUser($payload);


        $newFirstName = $data['firstName'] ?? null;
        $newLastName = $data['lastName'] ?? null;
        $newLocation = $data['location'] ?? null;

        if (!$newFirstName || !$newLastName) {
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

    public static function deleteProfilUser($payload){
        $user = self::getUser($payload);
        $delete = User::deleteUser($user['idUser']);

        if ($delete) {
            echo json_encode(["message" => "Profil supprimé"]);
        } else {
            http_response_code(500); 
            echo json_encode(["error" => "Erreur lors de la suppression"]);
        }
    }

    public static function changeProfilePicture($file,$payload) {
        if (!isset($file['name'], $file['tmp_name'], $file['size'], $file['error'])) {
            echo json_encode(['error' => 'Données de fichier invalides']);
            return;
        }
    
        $fileName = $file['name'];
        $fileTmpName = $file['tmp_name'];
        $fileSize = $file['size'];
        $fileError = $file['error'];
    
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    
        if (in_array($fileExtension, $allowedExtensions)) {
            if ($fileError === 0) {
                $uploadDir = $_SERVER['DOCUMENT_ROOT'] . '46.101.169.59/AirConcess/frontend/public/assets/profile/';
                $destination = $uploadDir . $fileName;
    
                if (move_uploaded_file($fileTmpName, $destination)) {
                    echo json_encode(['success' => 'Image téléchargée avec succès', 'path' => $destination]);
                } else {
                    echo json_encode(['error' => 'Échec du téléchargement de l\'image']);
                }
            } else {
                echo json_encode(['error' => 'Erreur lors du téléchargement']);
            }
        } else {
            echo json_encode(['error' => 'Extension de fichier non autorisée']);
        }
        $fileUrl = "/assets/profile/" . $fileName;
        $user = self::getUser($payload);
        $update = User::updateURLPicture($fileUrl, $user['idUser']);

        if ($update) {
            echo json_encode(['success' => 'Photo de profil modifiée', 'path' => $fileUrl]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Erreur lors de la mise à jour de la base de données']);
        }
    }

    public static function getAppointment($payload){
        $user = self::getUser($payload);

        if (!$user) {
            error_log("Utilisateur non trouvé pour ce token.");
            http_response_code(403);
            echo json_encode(["message" => "Vous n'avez pas l'autorisation d'accéder à cette ressource."]);
            exit();
        }
        $appointments = Appointment::getAppointmentByUserWithAgency($user['idUser']);
        // $appointments = Appointment::getAppointmentByUser($user['idUser']);
        echo json_encode($appointments);
    }

    
}
