<?php

class Testimonial
{
    private static function getDB()
    {
        return Database::getConnection();
    }

    public static function getAllTestimonials()
    {
        $pdo = self::getDB();
        $stmt = $pdo->prepare('SELECT * FROM testimonial');
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getNumberTestimonials()
    {
        $pdo = self::getDB();
        $stmt = $pdo->prepare('SELECT COUNT(*) FROM testimonial');
        $stmt->execute();
        return $stmt->fetchColumn();
    }


    public static function getUserInfos($id_user)
    {
        $pdo = self::getDB();
        $stmt = $pdo->prepare('SELECT profilePictureURL, firstName, lastName FROM User WHERE idUser = ?');
        $stmt->execute([$id_user]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function createTestimonial($id_user, $content)
    {
        $pdo = self::getDB();
        $stmt = $pdo->prepare('INSERT INTO Testimonial (id_user	, content) VALUES (?, ?)');
        $stmt->execute([$id_user, $content]);
        return $pdo->lastInsertId();
    }
}
