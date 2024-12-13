<?php
    require_once __DIR__ . '/../models/Aircraft.php';

    class CatalogControlleur{

        public static function getAircrafts(){
            try {
                $aircrafts = Aircraft::getAllAircrafts();
                $nbAircraft = Aircraft::getNumberAircrafts();

                echo json_encode([
                    'status' => 'success',
                    'data' => $aircrafts,
                    'nbAircraft' => $nbAircraft,
                ]);
            } catch (Exception $e) {
                http_response_code(500); 
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Une erreur s\'est produite : ' . $e->getMessage(),
                ]);
            }
        }
    }
?>