<?php
    require_once __DIR__ . '/../models/Appointment.php';
    require_once __DIR__ . '/../models/Aircraft.php';

    class AppointmentController {

        public static function createAppointment($data) {
            $apptData = [
                "aircraftConcerned_id" => $data["formData"]["serialNumber"]["value"],
                "firstName" => $data["formData"]["firstName"],
                "lastName" => $data["formData"]["lastName"],
                "phone" => $data["formData"]["phone"],
                "email" => $data["formData"]["email"],
                "country" => $data["formData"]["country"]["value"],
                "city" => $data["formData"]["city"]["value"],
                "address" => $data["formData"]["address"],
                "postalCode" => $data["formData"]["postalCode"],
                "idCard" => $data["formData"]["idCard"],
                "incomeProof" => $data["formData"]["incomeProof"][0]["name"],
                "reason" => $data["formData"]["reason"]["value"],
                "timestamp" => $data["formData"]["date"]." ".$data["formData"]["time"],
                "agency" => $data["formData"]["agency"]["value"],
            ];
            $isGood = Appointment::create($apptData);
        }

        public static function getTimestamps() {
            $timestamps = Appointment::getTimestampsFromDB();
            if ($timestamps) {
                echo json_encode($timestamps);
            }
        }

        public static function getAircraftsOfModel($model_id) {
            $aircrafts = Aircraft::getAircraftsOfModel($model_id);
            $finalList = null;

            if($aircrafts) {
                foreach ($aircrafts as $aircraft) {
                    $finalList[] = [
                        "value" => $aircraft['aircraft_id'],
                        "label" => $aircraft['serial_number']
                    ];
                }
            }

            echo json_encode($finalList);
        }

        public static function getModels() {
            $models = Aircraft::getAllModel();
            $finalList = null;

            if($models) {
                foreach ($models as $model) {
                    $finalList[] = [
                        "value" => $model['model_id'],
                        "label" => $model['model_name']
                    ];
                }
            }

            echo json_encode($finalList);
        }
    }



?>

