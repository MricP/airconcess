<?php
    require_once __DIR__ . '/../models/Aircraft.php';

    //A
    class CatalogControlleur{
        public static function getAircrafts(){
            try {
                $aircrafts = Aircraft::getAllAircrafts();
                $nbAircraft = Aircraft::getNumberAircrafts();
                $model = Aircraft::getAllModel();

                echo json_encode([
                    'status' => 'success',
                    'data' => $aircrafts,
                    'model' => $model,
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