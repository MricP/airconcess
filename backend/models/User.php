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
        $stmt = $pdo->prepare('SELECT * FROM user WHERE email = ?');
        $stmt->execute([$email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function create($email, $hashedPassword, $firstName, $lastName)
    {
        $pdo = self::getDB();
        $stmt = $pdo->prepare('INSERT INTO user (email, password, firstName, lastName, isVerified, isTrainer, isAdmin, inscriptionDate) 
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?)');

        if ($stmt->execute([$email, $hashedPassword, $firstName, $lastName, 0, 0, 0, date('Y-m-d H:i:s')])) {
            return $pdo->lastInsertId();
        }
        return false;
    }

    public static function verifyEmail($userId)
    {
        $pdo = self::getDB();
        $stmt = $pdo->prepare('UPDATE user SET isVerified = 1 WHERE idUser = ?');
        return $stmt->execute([$userId]);
    }
    


    public static function updatePassword($userId, $newPassword)
    {
        $pdo = self::getDB();
        $stmt = $pdo->prepare('UPDATE user SET password = ? WHERE idUser = ?');
        return $stmt->execute([$newPassword, $userId]);
    }

    public static function updateUser($userId, $firstName,$lastName,$location)
    {
        $pdo = self::getDB();
        $stmt = $pdo->prepare('UPDATE user SET firstName = ?, lastName = ?, location = ? WHERE idUser = ?');
        return $stmt->execute([$firstName,$lastName,$location, $userId]);
    }

    public static function updateTrainer($userId,$data)
    {
        $pdo = self::getDB();
        $stmt = $pdo->prepare('UPDATE trainer SET country_assignment = ?, city_assignment = ?, address_assignment = ? WHERE trainer_id = ?');
        return $stmt->execute([$data['country_assignment'],$data['city_assignment'],$data['address_assignment'],$userId]);
    }
    
    public static function findById($id) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("SELECT * FROM user U LEFT JOIN trainer T ON U.idUser = T.trainer_id WHERE U.idUser = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function deleteUser($id){
        $pdo = self::getDB();
        $stmt = $pdo->prepare("DELETE FROM user WHERE idUser = ?");
        return $stmt->execute([$id]);
    }
    

    public static function updateURLPicture($url,$id){
        $pdo = self::getDB();
        $stmt = $pdo->prepare("UPDATE user SET profilePictureURL = ? WHERE idUser = ?");
        return $stmt->execute([$url,$id]);
    }

    public static function getAllUsers() {
        $pdo = self::getDB();
        $stmt = $pdo->prepare('Select lastName, firstName, email, profilePictureURL, isVerified, isAdmin, inscriptionDate, idUser, isTrainer FROM user order by isVerified desc');
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function updateRole($id, $role, $boolean) {
        $pdo = self::getDB();
        if ($role == "isAdmin") $stmt = $pdo->prepare('Update user set isAdmin = ? where idUser = ?');
        elseif ($role == "isTrainer") $stmt = $pdo->prepare('Update user set isTrainer = ? where idUser = ?');
        $stmt->execute([$boolean, $id]);
    }

    public static function createTrainer($id) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare('INSERT INTO trainer (trainer_id) VALUES (?)');
        $stmt->execute([$id]);
    }

    public static function findTrainerById($id) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("SELECT * FROM trainer WHERE trainer_id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function deleteTrainer($id) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("DELETE FROM trainer WHERE trainer_id = ?");
        $stmt->execute([$id]);
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

    public static function selectAllTrainers() {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("SELECT t.country_assignment,t.city_assignment,t.address_assignment,t.trainer_id,u.firstName,u.lastName FROM trainer t INNER JOIN user U on u.idUser = t.trainer_id");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function selectTrainer($id) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("SELECT t.country_assignment,t.city_assignment,t.address_assignment,t.trainer_id,u.firstName,u.lastName FROM trainer t INNER JOIN user U on u.idUser = t.trainer_id WHERE t.trainer_id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
