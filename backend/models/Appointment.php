<?php
    require_once __DIR__ . '/../utils/Database.php';

    class Appointment {
        private static function getDB() {
            return Database::getConnection();
        }

        public static function create($data) {
            $pdo = self::getDB();

            // Vérifier si le créneau est déjà pris
            $stmt = $pdo->prepare("SELECT COUNT(*) FROM appointment WHERE appt_timestamp = ? AND appt_agency_id = ?");
            $stmt->execute([$data['timestamp'],$data['agency_id']]);
            $exists = $stmt->fetchColumn();

            if ($exists > 0) {
                return [
                    'success' => false,
                    'message' => "Ce créneau est déjà réservé, merci d'en choisir un autre."
                ];
            }
        
            $stmt = $pdo->prepare(
                'INSERT INTO appointment 
                (userConcerned_id, aircraftConcerned_id, customer_firstName, customer_lastName, customer_phone,
                 customer_email, customer_country, customer_city, customer_address, customer_postalCode, 
                 customer_idCard_url, customer_incomeProof_url, appt_reason, appt_timestamp, appt_agency_id)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
            );

            try {
                $stmt->execute([
                    $data['user_id'], $data['aircraft_id'], $data['firstName'], $data['lastName'],
                    $data['phone'], $data['email'], $data['country'], $data['city'],
                    $data['address'], $data['postalCode'], $data['idCard'],
                    $data['incomeProof'], $data['reason'], $data['timestamp'], $data['agency_id']
                ]);

                return [
                    'success' => true,
                    'message' => "Rendez-vous enregistré avec succès."
                ];
            } catch (PDOException $e) {
                return [
                    'success' => false,
                    'message' => "Erreur lors de l'enregistrement : " . $e->getMessage()
                ];
            }
        }

        public static function deleteAppointment($apptId) {
            $pdo = self::getDB();
            $stmt = $pdo->prepare("DELETE FROM appointment WHERE appt_id = ?");
            return $stmt->execute([$apptId]);
        }
        
        public static function getTimestampsFromDB($agency_id) {
            $pdo = self::getDB();
            $stmt = $pdo->prepare('SELECT appt_timestamp FROM appointment WHERE appt_agency_id = ?');
            $stmt->execute([$agency_id]);
            return $stmt->fetchAll(PDO::FETCH_COLUMN);
        }

        public static function getAppointmentByUser($id){
            $pdo = self::getDB();
            $stmt = $pdo->prepare("SELECT appt_reason, appt_timestamp, appt_agency FROM appointment WHERE userConcerned_id = ?");            
            $stmt->execute([$id]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC); 
            return $result;
        }

        public static function getAppointmentByUserWithAgency($id){
            $pdo = self::getDB();
            $stmt = $pdo->prepare("SELECT M.model_name,Ac.serial_number,appt_id,appt_reason,appt_timestamp,agency_name,agency_address,agency_city,agency_country 
                FROM appointment A INNER JOIN agency Ag ON A.appt_agency_id = Ag.agency_id  
                INNER JOIN aircraft Ac ON A.aircraftConcerned_id = Ac.aircraft_id
                INNER JOIN model M ON Ac.model_id = M.model_id
                WHERE userConcerned_id = ?");            
            $stmt->execute([$id]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC); 
            return $result;
        }
    }

?>