<?php
require_once __DIR__ . '/../utils/Database.php';
ini_set('log_errors', 1); // Activer la journalisation des erreurs
ini_set('error_log', __DIR__ . '/error_log.txt'); // Définir le fichier de log
error_reporting(E_ALL); // Activer tous les niveaux d'erreurs
ini_set('display_errors', 1);


class Aircraft
{
    private static function getDB() {
        return Database::getConnection();
    }

    public static function getAircraftsOfModel($model_id) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("SELECT * FROM aircraft WHERE model_id = ?");
        $stmt->execute([$model_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getAllAircrafts() {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("SELECT * FROM aircraft A JOIN model M ON A.model_id = M.model_id JOIN image I ON A.aircraft_id = I.aircraft_id WHERE I.role = 'icon'");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getAllModel(){
        $pdo = self::getDB();
        $stmt = $pdo->prepare("SELECT * FROM model");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getNumberAircrafts(){
        $pdo = self::getDB();
        $stmt = $pdo->prepare("SELECT COUNT(*) as total FROM aircraft");
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['total'] ?? 0;
    }

    public static function findById($id) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("SELECT * FROM aircraft WHERE aircraft_id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function getIcon($id) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("SELECT img_id,img_URL FROM image WHERE aircraft_id = ? AND role = ?");
        $stmt->execute([$id,"icon"]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function getModelName($idAircraft) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("SELECT M.model_name FROM model M INNER JOIN aircraft A ON A.model_id = M.model_id WHERE aircraft_id = ?");
        $stmt->execute([$idAircraft]);
        return $stmt->fetch(PDO::FETCH_NUM);
    }

    public static function getMainImg($id) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("SELECT img_id,img_URL FROM image WHERE aircraft_id = ? AND role = ?");
        $stmt->execute([$id,"main"]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function getSliderImgs($id) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("SELECT img_id,img_URL FROM image WHERE aircraft_id = ? AND role = ?");
        $stmt->execute([$id,"slider"]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getModelDescription($idAircraft) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("SELECT M.model_name, M.range_type, M.manufacturer, M.passenger_capacity, M.crew_size, M.length, M.wingspan, M.height, M.max_takeoff_weight,
                M.engines, M.speed_avg, M.max_range, M.max_altitude FROM model M INNER JOIN aircraft A ON A.model_id = M.model_id WHERE aircraft_id = ?");
        $stmt->execute([$idAircraft]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function getAircraftDescription($idAircraft) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("SELECT serial_number,manufacture_year,flight_hours,configuration,recent_maintenance,typical_routes,
                owner,cost_per_km,monthly_maintenance_cost,estimated_price, description FROM aircraft WHERE aircraft_id = ?");
        $stmt->execute([$idAircraft]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function insertAircraft($idModel, $serialNumber, $manufactureYear, $flightHours, $configuration, $recentMaintenance, $typicalRoutes, $owner, $costPerKm, $monthlyMaintenanceCost, $estimatedPrice, $isAvailable, $description){
        try {
            $pdo = self::getDB();
            $stmt = $pdo->prepare(
            "
                Insert into aircraft
                    (model_id, serial_number, manufacture_year, flight_hours, configuration, recent_maintenance, typical_routes, owner, cost_per_km, monthly_maintenance_cost, estimated_price, isAvailable, description)
                values (?,?,?,?,?,?,?,?,?,?,?,?,?)
            ");
            
    
            $stmt->bindValue(1, $idModel);
            $stmt->bindValue(2, $serialNumber);
            $stmt->bindValue(3, $manufactureYear);
            $stmt->bindValue(4, $flightHours);
            $stmt->bindValue(5, $configuration);
            $stmt->bindValue(6, $recentMaintenance);
            $stmt->bindValue(7, $typicalRoutes);
            $stmt->bindValue(8, $owner);
            $stmt->bindValue(9, $costPerKm);
            $stmt->bindValue(10, $monthlyMaintenanceCost);
            $stmt->bindValue(11, $estimatedPrice);
            $stmt->bindValue(12, $isAvailable);
            $stmt->bindValue(13, $description);
            
            $stmt->execute();
        } catch (Exception $e) {
            echo "Error: " . $e->getMessage(); // Display error message
        }
    }

    public static function getModelByName($nameModel){
        $pdo = self::getDB();
        $stmt = $pdo->prepare("SELECT * FROM model where model_name = ?");
        $stmt->execute([$nameModel]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function getAircraftBySerialNumber($serialNumber) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("SELECT * FROM aircraft WHERE serial_number = ?");
        $stmt->execute([$serialNumber]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function insertModel($modelName, $rangeType, $manufacturer, $passengerCapacity, $engines, $speedAvg, $maxRange, $maxAltitude, $crewSize, $length, $wingspan, $height, $maxTakeoffWeight){
        try {
            $pdo = self::getDB();
            $stmt = $pdo->prepare(
            "
                Insert into model
                    (model_name, range_type, manufacturer, passenger_capacity, engines, speed_avg, max_range, max_altitude, crew_size, length, wingspan, height, max_takeoff_weight)
                values (?,?,?,?,?,?,?,?,?,?,?,?,?)
            ");
            
    
            $stmt->bindValue(1, $modelName);
            $stmt->bindValue(2, $rangeType);
            $stmt->bindValue(3, $manufacturer);
            $stmt->bindValue(4, $passengerCapacity);
            $stmt->bindValue(5, $engines);
            $stmt->bindValue(6, $speedAvg);
            $stmt->bindValue(7, $maxRange);
            $stmt->bindValue(8, $maxAltitude);
            $stmt->bindValue(9, $crewSize);
            $stmt->bindValue(10, $length);
            $stmt->bindValue(11, $wingspan);
            $stmt->bindValue(12, $height);
            $stmt->bindValue(13, $maxTakeoffWeight);
            
            $stmt->execute();
        } catch (Exception $e) {
            echo "Error: " . $e->getMessage(); // Display error message
        }
    }

    public static function insertImage($role, $aircraftId, $url){
        try {
            $pdo = self::getDB();
            $stmt = $pdo->prepare(
            "
                Insert into image
                    (role, aircraft_id, img_URL)
                values (?,?,?)
            ");
            
    
            $stmt->bindValue(1, $role);
            $stmt->bindValue(2, $aircraftId);
            $stmt->bindValue(3, $url);
            
            $stmt->execute();
        } catch (Exception $e) {
            echo "Error: " . $e->getMessage(); // Display error message
        }
    }

    public static function deleteAircraft($id, $nameModel) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("DELETE FROM aircraft WHERE aircraft_id = ?");
        $folderPath = __DIR__ . "/../../frontend/public/assets/product/" . $nameModel . "/" . $id;
    
        // Fonction pour supprimer récursivement un dossier non vide
        function deleteFolder($folderPath) {
            if (!is_dir($folderPath)) {
                return false;
            }
    
            $files = array_diff(scandir($folderPath), ['.', '..']);
            foreach ($files as $file) {
                $filePath = $folderPath . DIRECTORY_SEPARATOR . $file;
                if (is_dir($filePath)) {
                    deleteFolder($filePath);
                } else {
                    unlink($filePath); // Supprime le fichier
                }
            }
    
            return rmdir($folderPath); // Supprime le dossier vide
        }
    
        // Vérifie et supprime le dossier
        if (file_exists($folderPath)) {
            if (deleteFolder($folderPath)) {
            } else {
                error_log("Échec de la suppression du dossier : " . $folderPath);
            }
        } else {
            error_log("Dossier introuvable : " . $folderPath);
        }
        $stmt->execute([$id]);
    }

    public static function deleteModel($id, $nameModel) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("DELETE FROM Model WHERE model_id = ?");
        $folderPath = __DIR__ . "/../../frontend/public/assets/product/" . $nameModel;
    
        // Fonction pour supprimer récursivement un dossier non vide
        function deleteFolder($folderPath) {
            if (!is_dir($folderPath)) {
                return false;
            }
    
            $files = array_diff(scandir($folderPath), ['.', '..']);
            foreach ($files as $file) {
                $filePath = $folderPath . DIRECTORY_SEPARATOR . $file;
                if (is_dir($filePath)) {
                    deleteFolder($filePath);
                } else {
                    unlink($filePath); // Supprime le fichier
                }
            }
    
            return rmdir($folderPath); // Supprime le dossier vide
        }
    
        // Vérifie et supprime le dossier
        if (file_exists($folderPath)) {
            if (deleteFolder($folderPath)) {
            } else {
                error_log("Échec de la suppression du dossier : " . $folderPath);
            }
        } else {
            error_log("Dossier introuvable : " . $folderPath);
        }
        $stmt->execute([$id]);
    }

    public static function updateAircraft($id, $serialNumber, $manufactureYear, $flightHours, $configuration, $recentMaintenance, $typicalRoutes, $owner, $costPerKm, $monthlyMaintenanceCost, $estimatedPrice, $description) {
            $pdo = self::getDB();

            $stmt = $pdo->prepare("Update Aircraft set serial_number = ?, manufacture_year = ?, flight_hours = ?, configuration = ?, recent_maintenance = ?, typical_routes = ?, owner = ?, cost_per_km = ?, monthly_maintenance_cost = ?, estimated_price = ?, description = ? where aircraft_id = ?");
            $stmt->bindValue(1, $serialNumber);
            $stmt->bindValue(2, $manufactureYear);
            $stmt->bindValue(3, $flightHours);
            $stmt->bindValue(4, $configuration);
            $stmt->bindValue(5, $recentMaintenance);
            $stmt->bindValue(6, $typicalRoutes);
            $stmt->bindValue(7, $owner);
            $stmt->bindValue(8, $costPerKm);
            $stmt->bindValue(9, $monthlyMaintenanceCost);
            $stmt->bindValue(10, $estimatedPrice);
            $stmt->bindValue(11, $description);
            $stmt->bindValue(12, $id);

            $result = $stmt->execute();

            return $result;
    }

    public static function deleteImageWithAircraftId($id, $role){
        $pdo = self::getDB();
        $stmt = $pdo->prepare("DELETE FROM Image WHERE aircraft_id = ? AND role = ?");
        return $stmt->execute([$id, $role]);
    }
    
    public static function updateMainImage($id, $file) {
        $image = Aircraft::getMainImg($id); 
        $modelName = Aircraft::getModelName($id);
        $modelName = $modelName[0];
        
        $oldURL = $image['img_URL'];
        $oldFilePath = "../../frontend/public{$oldURL}";
        if (file_exists($oldFilePath)) {
            unlink($oldFilePath);
        }
    
        $url = basename($file['name']);
        $newFilePath = "../../frontend/public/assets/product/{$modelName}/{$id}/{$url}";
    
        if (move_uploaded_file($file['tmp_name'], $newFilePath)) {
            Aircraft::deleteImageWithAircraftId($id, "main");
            Aircraft::insertImage("main", $id, "/assets/product/{$modelName}/{$id}/{$url}");
            return $oldFilePath;
        }
        
        return $newFilePath;
    }
    
    public static function updateSliderImages($id, $files) {
        $images = Aircraft::getSliderImgs($id);
        $modelName = Aircraft::getModelName($id);
        $modelName = $modelName[0];
        // Suppression des anciennes images
        foreach ($images as $image) {
            $oldURL = $image['img_URL'];
            $oldFilePath = "../../frontend/public{$oldURL}";
    
            if (file_exists($oldFilePath)) {
                unlink($oldFilePath);
            }
            
            
        }

        // Suppression de l'entrée dans la base de données
        Aircraft::deleteImageWithAircraftId($id, "slider");
    
        // Ajout des nouvelles images
        foreach ($files as $file) {
            $url = basename($file['name']);
            $newFilePath = "../../frontend/public/assets/product/{$modelName}/{$id}/{$url}";
    
            if (move_uploaded_file($file['tmp_name'], $newFilePath)) {
                Aircraft::insertImage("slider", $id, "/assets/product/{$modelName}/{$id}/{$url}");
            } else {
                return false;
            }
        }
    
        return true;
    }
    
}
