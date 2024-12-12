<?php
    require_once __DIR__ . '/../models/Appointment.php';

    class AppointmentController {

        public static function createAppointment($data) {
            $apptData = [
                "firstName" => $data["formData"]["firstName"],
                "lastName" => $data["formData"]["lastName"],
                "phone" => $data["formData"]["phone"],
                "email" => $data["formData"]["email"],
                "country" => $data["formData"]["country"],
                "city" => $data["formData"]["city"],
                "address" => $data["formData"]["address"],
                "postalCode" => $data["formData"]["postalCode"],
                "idCard" => $data["formData"]["idCard"],
                "incomeProof" => $data["formData"]["incomeProof"],
                "reason" => $data["formData"]["reason"],
                "timestamp" => $data["formData"]["date"]." ".$data["formData"]["time"],
                "agency" => $data["formData"]["agency"],
            ];
            $isGood = Appointment::create($apptData);
        }

        public static function getTimestamps() {
            $timestamps = Appointment::getTimestampsFromDB();
            if ($timestamps) {
                echo json_encode($timestamps);
            }
        }
    }



?>

