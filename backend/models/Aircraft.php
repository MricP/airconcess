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
        $stmt = $pdo->prepare("SELECT * FROM aircraft A JOIN model M ON A.model_id = M.model_id");
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
        $stmt = $pdo->prepare("SELECT M.range_type, M.manufacturer, M.passenger_capacity, M.crew_size, M.length, M.wingspan, M.height, M.max_takeoff_weight,
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
    
}
