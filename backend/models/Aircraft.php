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

    public static function getAllAircrafts($page = 1, $limit = 5) {
        $pdo = self::getDB();
        $offset = max(0, ($page - 1) * $limit); 
        $stmt = $pdo->prepare("SELECT * FROM aircraft LIMIT :limit OFFSET :offset");
        $stmt->bindValue(':limit', (int) $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', (int) $offset, PDO::PARAM_INT);
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

    public static function getAircraftByState($state){
        $pdo = self::getDB();
        $stmt = $pdo->prepare("SELECT * FROM aircraft WHERE isAvailable = ?");
        $stmt->bindValue(':isAvailable',$state);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function findById($id) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("SELECT * FROM aircraft WHERE idAircraft = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
}
