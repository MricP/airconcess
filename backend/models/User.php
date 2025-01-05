<?php
require_once __DIR__ . '/../utils/Database.php';

class User
{
    private static function getDB()
    {
        $database = new Database();
        return $database->getConnection();
    }

    public static function findByEmail($email)
    {
        $pdo = self::getDB();
        $stmt = $pdo->prepare('SELECT * FROM User WHERE email = ?');
        $stmt->execute([$email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function create($email, $hashedPassword, $firstName, $lastName)
    {
        $pdo = self::getDB();
        $stmt = $pdo->prepare('INSERT INTO User (email, password, firstName, lastName, isVerified, isTrainer, isAdmin, inscriptionDate) 
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?)');

        if ($stmt->execute([$email, $hashedPassword, $firstName, $lastName, 0, 0, 0, date('Y-m-d H:i:s')])) {
            return $pdo->lastInsertId();
        }
        return false;
    }

    public static function verifyEmail($userId)
    {
        $pdo = self::getDB();
        $stmt = $pdo->prepare('UPDATE User SET isVerified = 1 WHERE idUser = ?');
        return $stmt->execute([$userId]);
    }
    


    public static function updatePassword($userId, $newPassword)
    {
        $pdo = self::getDB();
        $stmt = $pdo->prepare('UPDATE User SET password = ? WHERE idUser = ?');
        return $stmt->execute([$newPassword, $userId]);
    }

    public static function updateUser($userId, $firstName,$lastName,$location)
    {
        $pdo = self::getDB();
        $stmt = $pdo->prepare('UPDATE User SET firstName = ?, lastName = ?, location = ? WHERE idUser = ?');
        return $stmt->execute([$firstName,$lastName,$location, $userId]);
    }

    
    public static function findById($id) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("SELECT * FROM User WHERE idUser = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function deleteUser($id){
        $pdo = self::getDB();
        $stmt = $pdo->prepare("DELETE FROM User WHERE idUser = ?");
        return $stmt->execute([$id]);
    }
    
}
