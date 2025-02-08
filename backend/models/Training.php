<?php
class Training
{
    private static function getDB() {
        return Database::getConnection();
    }

    public static function createTraining(){
        // $pdo = self::getDB();
        // $stmt = $pdo->prepare("SELECT * FROM agency WHERE agency_id = ?");
        // $stmt->execute([$agency_id]);
        // return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
