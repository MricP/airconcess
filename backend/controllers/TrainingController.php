<?php
    require_once __DIR__ . '/../models/Training.php';
    require_once __DIR__ . '/../models/User.php';

    class TrainingController {

        public static function createTraining($data) {
            $creditCard = [
                "holder" => $data["cardHolder"],
                "number" => $data["cardNumber"]
            ];

            // Retourne l'id de la credit_card inserée
            $insertedCreditCardId = Training::insertCreditCard($creditCard);

            $training = [
                "user_id" =>  $data["userId"],
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
                "cardUsed_id" => $insertedCreditCardId,
                "trainerConcerned_id" =>$data["trainer"]["value"],
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

        public static function getAllTrainers() {
            $trainers = User::selectAllTrainers();
            $returnedData = [];

            if($trainers) {
                foreach($trainers as $trainer) {
                    $returnedData[] = [
                        "id" => $trainer['trainer_id'],
                        "country" => $trainer['country_assignment'],
                        "city" => $trainer['city_assignment'],
                        "address" => $trainer['address_assignment'],
                        "firstName" => $trainer['firstName'], 
                        "lastName" => $trainer['lastName']
                    ];
                }
            }

            echo json_encode($returnedData);
        }

        public static function getAllTrainings($idTrainer) {
            $trainings = Training::selectAllTrainings($idTrainer);
            $returnedData = [];
    
            if($trainings) {
                foreach($trainings as $training) {
                    $slots = Training::getTrainingPreferedSlots($training['training_id']);
                    $returnedSlots = null;
                    
                    if($slots) {
                        foreach($slots as $slot) {
                            $returnedSlots[] = [
                                "startTime" => $slot['start_time'],
                                "endTime" => $slot['end_time'],
                            ];
                        }
                    }
    
                    $responseFromTrainer = Training::getTrainingProposals($training['training_id']);
    
                    $returnedData[] = [
                        "trainerId" => $idTrainer,
                        "trainingId" => $training['training_id'],
                        "finalProposalId" => $training['final_proposal_id'],
                        "usrProfilePicture" => $training['profilePictureUrl'],
                        "usrFirstName" => $training['firstName'],
                        "usrLastName" => $training['lastName'],
                        "startDate" => $training['start_date_pref'],
                        "endDate" => $training['end_date_pref'],
                        "frequency" => $training['frequency_pref'],
                        "prefSlots" => $returnedSlots,
                        "hasResponseFromTrainer" => $responseFromTrainer ? true : false,
                    ];
                }
            }
    
            echo json_encode($returnedData);
        }
    }
?>

