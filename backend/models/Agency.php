<?php
require_once __DIR__ . '/../utils/Database.php';

class Agency
{
    private static function getDB() {
        return Database::getConnection();
    }

    public static function getAgency($agency_id){
        $pdo = self::getDB();
        $stmt = $pdo->prepare("SELECT * FROM agency WHERE agency_id = ?");
        $stmt->execute([$agency_id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function getAllAgencies(){
        $pdo = self::getDB();
        $stmt = $pdo->prepare("SELECT * FROM agency");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
