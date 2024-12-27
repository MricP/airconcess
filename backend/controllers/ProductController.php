<?php
    require_once __DIR__ . '/../models/Aircraft.php';

    class ProductController{
        public static function getAircraftWith($idAircraft) {
            $aircraft = Aircraft::findById($idAircraft);
            if ($aircraft) {
                echo json_encode($aircraft);
            }
            echo json_encode(null);
        }

        public static function getIconOf($idAircraft){
            $icon = Aircraft::getIcon($idAircraft);
            $iconToReturn = null;

            if ($icon) {
                $iconToReturn = $icon;
            }

            echo json_encode($icon);
        }

        public static function getModelNameOf($idAircraft) {
            $name = Aircraft::getModelName($idAircraft);
            $nameToReturn = null;

            if($name) {
                $nameToReturn = $name;
            }

            echo json_encode($nameToReturn);
        }

        public static function getMainImgOf($idAircraft){
            $img = Aircraft::getMainImg($idAircraft);
            $imgToReturn = null;

            if($img) {
                // Change le format retourné par la requete par le formt attendu par le front
                $imgToReturn = [
                    "id" => $img['img_id'],
                    "url" => $img['img_URL']
                ];
            }

            echo json_encode($imgToReturn);
        }

        public static function getSliderImgsOf($idAircraft){
            $imgs = Aircraft::getSliderImgs($idAircraft);
            $imgsToReturn = null;

            //On parcourt les images et on les formate dans le format attendu par le front
            foreach ($imgs as $img) {
                $imgsToReturn[] = [
                    "id" => $img['img_id'],   // L'ID de l'image
                    "url" => $img['img_URL'] // Construction de l'URL, selon le format que tu souhaites
                ];
            }

            echo json_encode($imgsToReturn);
        }

        public static function getModelDescriptionOf($idAircraft) {
            $description = Aircraft::getModelDescription($idAircraft);
            $descriptionToReturn = null;

            if($description) {
                // Convertis la $description dans le format attendu par le front
                foreach($description as $key => $value) {
                    $descriptionToReturn[] = [
                        "varName" => $key,
                        "value" => $value
                    ];
                }
            }
            echo json_encode($descriptionToReturn);
        }

        public static function getAircraftDescriptionOf($idAircraft) {
            $description = Aircraft::getAircraftDescription($idAircraft);
            $descriptionToReturn = null;

            if($description) {
                // Convertis la $description dans le format attendu par le front
                foreach($description as $key => $value) {
                    $descriptionToReturn[] = [
                        "varName" => $key,
                        "value" => $value
                    ];
                }
            }
            echo json_encode($descriptionToReturn);
        }

        public static function getAllModel(){
            $model= Aircraft::getAllModel();
            echo json_encode($model);
        }

        public static function getModelByName($nameModel){
            $model= Aircraft::getModelByName($nameModel);
            echo json_encode($model);
        }
    }
?>