<?php

require_once __DIR__ . '/../models/User.php';
ini_set('log_errors', 1); // Activer la journalisation des erreurs
ini_set('error_log', __DIR__ . '/error_log.txt'); // Définir le fichier de log
error_reporting(E_ALL); // Activer tous les niveaux d'erreurs
ini_set('display_errors', 1);

class UserController {
    public static function createWithCRUD($email, $password, $firstName, $lastName, $isAdmin, $isTrainer){
        if ($email !== "" && $password !== "" && $firstName !== "" && $lastName !== ""){
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            // User::createWithCRUD($email, $hashedPassword, $firstName, $lastName, $isAdmin, $isTrainer);
        }
    }
}