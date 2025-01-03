<?php
require_once __DIR__ . '/../utils/Database.php';

class Aircraft
{
    private static function getDB()
    {
        $database = new Database();
        return $database->getConnection();
    }


    public static function createAircraft($model,$isAvailable,$planeImg,$serialNumber, $price, $year,$hours,  $capacity,$autonomy,$description,  $aircraftType)
    {
        $pdo = self::getDB();
        $stmt = $pdo->prepare('INSERT INTO aircraft (model, serialNumber, price, year, hours, autonomy, aircraftType, description, isAvailable) 
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
        if ($stmt->execute([$model, $serialNumber, $price, $year, $hours, $autonomy, $aircraftType, $description, $isAvailable])) {
            return $pdo->lastInsertId();
        }
        return false;
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

    // Catalog Page

    public static function getIcon($id) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("SELECT img_id,img_URL FROM image WHERE aircraft_id = ? AND role = ?");
        $stmt->execute([$id,"icon"]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Product Page

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
                owner,cost_per_km,monthly_maintenance_cost,estimated_price FROM aircraft WHERE aircraft_id = ?");
        $stmt->execute([$idAircraft]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function insertAircraft($idModel, $serialNumber, $manufactureYear, $flightHours, $configuration, $recentMaintenance, $typicalRoutes, $owner, $costPerKm, $monthlyMaintenanceCost, $estimatedPrice, $isAvailable){
        try {
            $pdo = self::getDB();
            $stmt = $pdo->prepare(
            "
                Insert into aircraft
                    (model_id, serial_number, manufacture_year, flight_hours, configuration, recent_maintenance, typical_routes, owner, cost_per_km, monthly_maintenance_cost, estimated_price, isAvailable, description)
                values (?,?,?,?,?,?,?,?,?,?,?,?,'test')
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

    
}
