<?php
require_once __DIR__ . '/../utils/Database.php';
ini_set('log_errors', 1); // Activer la journalisation des erreurs
ini_set('error_log', __DIR__ . '/error_log.txt'); // Définir le fichier de log
error_reporting(E_ALL); // Activer tous les niveaux d'erreurs
ini_set('display_errors', 1);

class Logs {

    private static function getDB()
    {
        return Database::getConnection();
    }

    public static function getLastLogs() {
        $pdo = self::getDB();
        $stmt = $pdo->prepare('Select log_content, date_logs from Logs order by date_log desc limit 10');
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function insertLog($content) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare('Insert into Logs(log_content, date_log) values (?, ?)');
        $stmt->execute([$content, date('Y-m-d H:i:s')]);
    }

}