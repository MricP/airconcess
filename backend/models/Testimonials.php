<?php

class Testimonial {
    private static function getDB()
    {
        $database = new Database();
        return $database->getConnection();
    }
    
    public static function getAllTestimonials() {
        $pdo = self::getDB();
        $stmt = $pdo->prepare('SELECT * FROM Testimonial');
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getNumberTestimonials() {
        $pdo = self::getDB();
        $stmt = $pdo->prepare('SELECT COUNT(*) FROM Testimonial');
        $stmt->execute();
        return $stmt->fetchColumn();
    }

    public static function getTestimonialsUser($user_id){
        $pdo = self::getDB();
        $stmt = $pdo->prepare('SELECT * FROM Testimonial WHERE user_id = :user_id');
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchColumn();
    }
}
?>