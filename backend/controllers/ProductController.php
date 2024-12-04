<?php
    require_once __DIR__ . '/../models/Aircraft.php';

    class ProductController{
        public static function getIconOf($idAircraft){
            $icon = Aircraft::getIcon($idAircraft);
            if ($icon) {
                echo json_encode($icon);
            }
        }

        public static function getMainImgOf($idAircraft){
            $img = Aircraft::getMainImg($idAircraft);
            if ($img) {
                // Change le format retourné par la requete par le formt attendu par le front
                $imgToReturn = [
                    "id" => $img['img_id'],
                    "url" => $img['img_URL']
                ];

                echo json_encode($imgToReturn);
            }
        }

        public static function getSliderImgsOf($idAircraft){
            $imgs = Aircraft::getSliderImgs($idAircraft);
            if ($imgs) {
                $imgsToReturn = []; // Tableau vide pour stocker les images formatées
        
                // On parcourt les images et on les formate dans le format attendu
                foreach ($imgs as $img) {
                    $imgsToReturn[] = [
                        "id" => $img['id'],   // L'ID de l'image
                        "url" => $img['url'] // Construction de l'URL, selon le format que tu souhaites
                    ];
                }
        
                // Convertir le tableau en JSON et l'envoyer
                echo json_encode($imgsToReturn);
            }
        }
    }
?>