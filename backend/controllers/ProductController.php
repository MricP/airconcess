<?php
    require_once __DIR__ . '/../models/Aircraft.php';

    class ProductController{
        public static function getAircraftWith($idAircraft) {
            $aircraft = Aircraft::findById($idAircraft);
            if ($aircraft) {
                echo json_encode($aircraft);
            } else {
                echo json_encode(null);
            }
        }

        public static function getIconOf($idAircraft){
            $icon = Aircraft::getIcon($idAircraft);
            $iconToReturn = null;

            if ($icon) {
                $iconToReturn = $icon;
            }

            echo json_encode($icon);
        }

        public static function getModelNameOf($idAircraft) {
            $name = Aircraft::getModelName($idAircraft);
            $nameToReturn = null;

            if($name) {
                $nameToReturn = $name;
            }

            echo json_encode($nameToReturn);
        }

        public static function getMainImgOf($idAircraft){
            $img = Aircraft::getMainImg($idAircraft);
            $imgToReturn = null;

            if($img) {
                // Change le format retourné par la requete par le formt attendu par le front
                $imgToReturn = [
                    "id" => $img['img_id'],
                    "url" => $img['img_URL']
                ];
            }

            echo json_encode($imgToReturn);
        }

        public static function getSliderImgsOf($idAircraft){
            $imgs = Aircraft::getSliderImgs($idAircraft);
            $imgsToReturn = null;

            //On parcourt les images et on les formate dans le format attendu par le front
            foreach ($imgs as $img) {
                $imgsToReturn[] = [
                    "id" => $img['img_id'],   // L'ID de l'image
                    "url" => $img['img_URL'] // Construction de l'URL, selon le format que tu souhaites
                ];
            }

            echo json_encode($imgsToReturn);
        }

        public static function getModelDescriptionOf($idAircraft) {
            $description = Aircraft::getModelDescription($idAircraft);
            $descriptionToReturn = null;

            if($description) {
                // Convertis la $description dans le format attendu par le front
                foreach($description as $key => $value) {
                    $descriptionToReturn[] = [
                        "varName" => $key,
                        "value" => $value
                    ];
                }
            }
            echo json_encode($descriptionToReturn);
        }

        public static function getAircraftDescriptionOf($idAircraft) {
            $description = Aircraft::getAircraftDescription($idAircraft);
            $descriptionToReturn = null;

            if($description) {
                // Convertis la $description dans le format attendu par le front
                foreach($description as $key => $value) {
                    $descriptionToReturn[] = [
                        "varName" => $key,
                        "value" => $value
                    ];
                }
            }
            echo json_encode($descriptionToReturn);
        }

        public static function getAllModel(){
            $model= Aircraft::getAllModel();
            echo json_encode($model);
        }

        public static function getModelByName($nameModel){
            $model= Aircraft::getModelByName($nameModel);
            echo json_encode($model);
        }

        public static function uploadImage($file, $destinationDir, $aircraftId) {


            $allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
            $destinationDirBack  = __DIR__ . "/../../frontend/public/assets/product/" . $destinationDir. "/". $aircraftId. "/";
            // Vérifie si le fichier existe
            if (!isset($file) || $file['error'] !== UPLOAD_ERR_OK) {
                return ['success' => false, 'message' => 'Aucun fichier valide reçu.'];
            }
        
            // Vérifie le type de fichier
            if (!in_array($file['type'], $allowedTypes)) {
                return ['success' => false, 'message' => 'Type de fichier non valide.'];
            }
        
            // Vérifie ou crée le dossier de destination
            if (!is_dir($destinationDirBack )) {
                if (!mkdir($destinationDirBack , 0777, true)) {
                    return ['success' => false, 'message' => 'Impossible de créer le dossier de destination.'];
                }
            }
        
            // Génère un nom de fichier unique
            $fileName = basename($file['name']);
            $filePath = $destinationDirBack . $fileName;
        
            // Déplace le fichier téléchargé
            if (move_uploaded_file($file['tmp_name'], $filePath)) {
                return ['success' => true, 'filePath' => "/assets/product/".$destinationDir."/". $aircraftId. "/". $fileName];
            } else {
                return ['success' => false, 'message' => 'Erreur lors du déplacement du fichier.'];
            }
        }

        public static function getAircraftBySerialNumber($serialNumber){
            $aircraft= Aircraft::getAircraftBySerialNumber($serialNumber);
            echo json_encode($aircraft);
        }

        public static function insertAircraft($idModel, $serialNumber, $manufactureYear, $flightHours, $configuration, $recentMaintenance, $typicalRoutes, $owner, $costPerKm, $monthlyMaintenanceCost, $estimatedPrice, $isAvailable, $description) {
            if ($idModel != "" && $serialNumber != "" && $manufactureYear != "" && $flightHours != "" && $configuration != "" && $recentMaintenance != "" && $typicalRoutes != "" && $owner != "" && $costPerKm != "" && $monthlyMaintenanceCost != "" && $estimatedPrice != "" && $description != ""){
                Aircraft::insertAircraft($idModel, $serialNumber, $manufactureYear, $flightHours, $configuration, $recentMaintenance, $typicalRoutes, $owner, $costPerKm, $monthlyMaintenanceCost, $estimatedPrice, $isAvailable, $description);
                return ['success' => true];
            }
            return ['success' => false];
        }

        public static function insertImage($role, $aircraftId, $url) {
            if ($url != null){
                Aircraft::insertImage($role, $aircraftId, $url);
                return ['success' => true];
            }
            return ['success' => false];
        }

        public static function insertModel($modelName, $rangeType, $manufacturer, $passengerCapacity, $engines, $speedAvg, $maxRange, $maxAltitude, $crewSize, $length, $wingspan, $height, $maxTakeoffWeight) {
            if ($modelName != "" && $rangeType != "" && $manufacturer != "" && $passengerCapacity != "" && $engines != "" && $speedAvg != "" && $maxRange != "" && $maxAltitude != "" && $crewSize != "" && $length != "" && $wingspan != "" && $height != "" && $maxTakeoffWeight != ""){
                Aircraft::insertModel($modelName, $rangeType, $manufacturer, $passengerCapacity, $engines, $speedAvg, $maxRange, $maxAltitude, $crewSize, $length, $wingspan, $height, $maxTakeoffWeight);
                return ['success' => true];
            }
            return ['success' => false];
        }
    }
?>