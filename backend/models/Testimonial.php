<?php

class Testimonial
{
    private static function getDB()
    {
        $database = new Database();
        return $database->getConnection();
    }

    public static function getAllTestimonials()
    {
        $pdo = self::getDB();
        $stmt = $pdo->prepare('SELECT * FROM Testimonial');
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getNumberTestimonials()
    {
        $pdo = self::getDB();
        $stmt = $pdo->prepare('SELECT COUNT(*) FROM Testimonial');
        $stmt->execute();
        return $stmt->fetchColumn();
    }

    public static function getTestimonialsUser($id_user)
    {
        $pdo = self::getDB();
        $stmt = $pdo->prepare('SELECT * FROM Testimonial WHERE id_user	 = :id_user	');
        $stmt->bindParam(':id_user	', $id_user	, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchColumn();
    }

    public static function createTestimonial($id_user, $content)
    {
        $pdo = self::getDB();
        $stmt = $pdo->prepare('INSERT INTO Testimonial (id_user	, content) VALUES (?, ?)');
        $stmt->execute([$id_user, $content]);
        return $pdo->lastInsertId();
    }
}
?>