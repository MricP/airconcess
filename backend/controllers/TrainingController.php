<?php
    require_once __DIR__ . '/../models/Training.php';

    class TrainingController {

        public static function createTraining($data) {
            $creditCard = [
                "holder" => $data["cardHolder"],
                "number" => $data["cardNumber"]
            ];

            // Retourne l'id de la credit_card inserée
            $insertedCreditCardId = Training::insertCreditCard($creditCard);

            $training = [
                "user_id" => 35,
                "customer_firstName" => $data["firstName"],
                "customer_lastName" => $data["lastName"],
                "customer_country" => $data["country"]["value"],
                "customer_city" => $data["city"]["value"],
                "customer_postalCode" => $data["postalCode"],
                "customer_addr" => $data["address"],
                "customer_phone" => $data["phone"],
                "customer_email" => $data["email"],
                "customer_idCard_url" => $data["idCard"]["name"],
                "start_date_pref" => $data["dateStart"],
                "end_date_pref" => $data["dateEnd"],
                "frequency_pref" => $data["prefFrequency"],
                "cardUsed_id" => $insertedCreditCardId
            ];

            $insertedTrainingId = Training::createTraining($training);

            foreach($data["prefSlots"] as $pref) {
                $slot = [
                    "trainingConcerned_id" => $insertedTrainingId,
                    "start_time" => $pref["hourStart"],
                    "end_time" => $pref["hourEnd"]
                ];
                Training::insertTrainingPreferedSlot($slot);
            }

            $insertTrainingPreferences = "";
        }
    }
?>

