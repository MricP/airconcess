<?php
require_once __DIR__ . '/../utils/Database.php';
ini_set('log_errors', 1); // Activer la journalisation des erreurs
ini_set('error_log', __DIR__ . '/error_log.txt'); // Définir le fichier de log
error_reporting(E_ALL); // Activer tous les niveaux d'erreurs
ini_set('display_errors', 1);
class User
{
    private static function getDB()
    {
        return Database::getConnection();
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
    

    public static function updateURLPicture($url,$id){
        $pdo = self::getDB();
        $stmt = $pdo->prepare("UPDATE User SET profilePictureURL = ? WHERE idUser = ?");
        return $stmt->execute([$url,$id]);
    }

    public static function createWithCRUD($email, $hashedPassword, $firstName, $lastName, $isAdmin, $isTrainer)
    {
        $pdo = self::getDB();
        $stmt = $pdo->prepare('INSERT INTO User (email, password, firstName, lastName, isVerified, isAdmin, inscriptionDate, isTrainer) 
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?)');

        if ($stmt->execute([$email, $hashedPassword, $firstName, $lastName, 1, $isAdmin, date('Y-m-d H:i:s'), $isTrainer])) {
            return $pdo->lastInsertId();
        }
        return false;
    }

    public static function getAllUsers() {
        $pdo = self::getDB();
        $stmt = $pdo->prepare('Select lastName, firstName, email, profilePictureURL, isVerified, isAdmin, inscriptionDate, idUser, isTrainer from User order by isVerified desc');
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function updateRole($id, $role, $boolean) {
        $pdo = self::getDB();
        if ($role == "isAdmin") $stmt = $pdo->prepare('Update User set isAdmin = ? where idUser = ?');
        elseif ($role == "isTrainer") $stmt = $pdo->prepare('Update User set isTrainer = ? where idUser = ?');
        $stmt->execute([$boolean, $id]);
    }

    public static function createTrainer($id) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare('INSERT INTO trainer (trainer_id) VALUES (?)');
        $stmt->execute([$id]);
    }

    public static function findTrainerById($id) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("SELECT * FROM Trainer WHERE trainer_id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function deleteTrainer($id) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("DELETE FROM Trainer WHERE trainer_id = ?");
        $stmt->execute([$id]);
    }

}
