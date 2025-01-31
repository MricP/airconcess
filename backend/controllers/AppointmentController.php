<?php
    require_once __DIR__ . '/../models/Appointment.php';
    require_once __DIR__ . '/../models/Aircraft.php';
    require_once __DIR__ . '/../models/Agency.php';

    class AppointmentController {

        public static function createAppointment($data) {
            $apptData = [
                "user_id" => 35,
                "aircraft_id" => $data["formData"]["serialNumber"]["value"],
                "firstName" => $data["formData"]["firstName"],
                "lastName" => $data["formData"]["lastName"],
                "phone" => $data["formData"]["phone"],
                "email" => $data["formData"]["email"],
                "country" => $data["formData"]["country"]["value"],
                "city" => $data["formData"]["city"]["value"],
                "address" => $data["formData"]["address"],
                "postalCode" => $data["formData"]["postalCode"],
                "idCard" => null,//$data["formData"]["idCard"],
                "incomeProof" => null,//$data["formData"]["incomeProof"],
                "reason" => $data["formData"]["reason"]["value"],
                "timestamp" => $data["formData"]["date"]." ".$data["formData"]["time"],
                "agency_id" => $data["formData"]["agency"]["value"],
            ];
            $res = Appointment::create($apptData);

            echo json_encode($res);
            exit();
        }

        public static function getTimestamps($agency_id) {
            $timestamps = Appointment::getTimestampsFromDB($agency_id);
            if ($timestamps) {
                echo json_encode($timestamps);
            } else {
                echo json_encode(null);
            }      
        }

        public static function getAircraftsOfModel($model_id) {
            $aircrafts = Aircraft::getAircraftsOfModel($model_id);
            $finalList = [];

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
            $finalList = [];

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

        public static function getAircraft($airc_id) {
            $airc = Aircraft::findById($airc_id);
            $res = null;

            if($airc) {
                $res = $airc;
            }

            echo json_encode($res);
        }

        public static function getAgencies() {
            $agencies = Agency::getAllAgencies();
            $finalList = [];

            if($agencies) {
                foreach ($agencies as $agency) {
                    $finalList[] = [
                        "value" => $agency['agency_id'],
                        "label" => $agency['agency_name'].", ".$agency['agency_country']
                    ];
                }
            }
            echo json_encode($finalList);
        }

        public static function getAgencyLocation($agency_id) {
            $agency = Agency::getAgency($agency_id);
            $location = null;

            if($agency) {
                $location = $agency['agency_address'].", ".$agency['agency_city'].", ".$agency['agency_country'];
            }

            echo json_encode($location);
        }
    }



?>

