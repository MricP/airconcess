<?php
    require_once __DIR__ . '/../models/Training.php';

    class TrainingController {

        public static function createTraining($data) {
            // $apptData = [
            //     "user_id" => 35,
            //     "aircraft_id" => $data["formData"]["serialNumber"]["value"],
            //     "firstName" => $data["formData"]["firstName"],
            //     "lastName" => $data["formData"]["lastName"],
            //     "phone" => $data["formData"]["phone"],
            //     "email" => $data["formData"]["email"],
            //     "country" => $data["formData"]["country"]["value"],
            //     "city" => $data["formData"]["city"]["value"],
            //     "address" => $data["formData"]["address"],
            //     "postalCode" => $data["formData"]["postalCode"],
            //     "idCard" => $data["formData"]["idCard"]["name"],
            //     "incomeProof" => $data["formData"]["incomeProof"]["name"],
            //     "reason" => $data["formData"]["reason"]["value"],
            //     "timestamp" => $data["formData"]["date"]." ".$data["formData"]["time"],
            //     "agency_id" => $data["formData"]["agency"]["value"],
            // ];

            //TODO : Gerer l'insertion des fichiers (idCard et incomeProof)

            // $res = Appointment::create($apptData);
        }
    }



?>

