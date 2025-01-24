<?php
    require_once __DIR__ . '/../utils/Database.php';

    class Appointment {
        private static function getDB() {
            return Database::getConnection();
        }

        public static function create($data) {
            $pdo = self::getDB();
            // TODO : gerer l'id du currentUser et l'id de l'appareil concerné
            $stmt = $pdo->prepare('INSERT INTO appointment (aircraftConcerned_id,customer_firstName, customer_lastName,customer_phone,
                                                            customer_email,customer_country,customer_city,
                                                            customer_address,customer_postalCode,customer_idCard_url,
                                                            customer_incomeProof_url,appt_reason,appt_timestamp,appt_agency)
                                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
            
            if ($stmt->execute([$data['aircraftConcerned_id'],$data['firstName'],$data['lastName'],$data['phone'],
                                $data['email'],$data['country'],$data['city'],
                                $data['address'],$data['postalCode'],$data['idCard'],
                                $data['incomeProof'],$data['reason'],$data['timestamp'],$data['agency']])) {
                return true;
            }
            return false;
        }

        public static function getTimestampsFromDB() {
            $pdo = self::getDB();
            $stmt = $pdo->prepare('SELECT appt_timestamp FROM appointment');
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_COLUMN);
        }

        public static function getAppointmentByUser($id){
            $pdo = self::getDB();
            $stmt = $pdo->prepare("SELECT appt_reason, appt_timestamp, appt_agency FROM appointment WHERE userConcerned_id = ?");            
            $stmt->execute([$id]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC); 
            return $result;
        }
    }

?>