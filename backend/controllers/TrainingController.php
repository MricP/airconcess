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

        public static function deleteTraining($trainingId) {
            echo json_encode(Training::deleteTraining($trainingId));    
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

        public static function getTrainingsOfTrainer($idTrainer) {
            $trainings = Training::selectTrainingsOfTrainer($idTrainer);
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

                    $proposals = Training::getTrainingProposals($training['training_id']);
                    $returnedProposals = null;

                    if($proposals) {
                        foreach($proposals as $proposal) {
                            $returnedProposals[] = [
                                "proposalId" => $proposal['proposal_id'],
                                "dateStart" => $proposal['start_date'],
                                "dateEnd" => $proposal['end_date'],
                                "hourMonday" => $proposal['time_monday'],
                                "hourTuesday" => $proposal['time_tuesday'],    
                                "hourWednesday" =>$proposal['time_wednesday'], 
                                "hourThursday" => $proposal['time_thursday'], 
                                "hourFriday" => $proposal['time_friday'], 
                            ];
                        }
                    }

                    $finalProposal = null;
                    if($training['final_proposal_id']) {
                        $proposal = Training::getTrainingProposal($training['final_proposal_id']);
                        $finalProposal = [
                            "proposalId" => $proposal['proposal_id'],
                            "dateStart" => $proposal['start_date'],
                            "dateEnd" => $proposal['end_date'],
                            "hourMonday" => $proposal['time_monday'],
                            "hourTuesday" => $proposal['time_tuesday'],    
                            "hourWednesday" =>$proposal['time_wednesday'], 
                            "hourThursday" => $proposal['time_thursday'], 
                            "hourFriday" => $proposal['time_friday'],
                        ];
                    }
    
                    $returnedData[] = [
                        "trainerId" => $idTrainer,
                        "trainingId" => $training['training_id'],
                        "finalProposal" => $finalProposal,
                        "usrProfilePicture" => $training['profilePictureUrl'],
                        "usrFirstName" => $training['firstName'],
                        "usrLastName" => $training['lastName'],
                        "startDate" => $training['start_date_pref'],
                        "endDate" => $training['end_date_pref'],
                        "frequency" => $training['frequency_pref'],
                        "prefSlots" => $returnedSlots,
                        "proposals" => $returnedProposals,
                    ];
                }
            }
    
            echo json_encode($returnedData);
        }

        public static function getTrainingsOfUser($idUser) {
            $trainings = Training::selectTrainingsOfUser($idUser);
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
    
                    $proposals = Training::getTrainingProposals($training['training_id']);
                    $returnedProposals = null;

                    if($proposals) {
                        foreach($proposals as $proposal) {
                            $returnedProposals[] = [
                                "proposalId" => $proposal['proposal_id'],
                                "dateStart" => $proposal['start_date'],
                                "dateEnd" => $proposal['end_date'],
                                "hourMonday" => $proposal['time_monday'],
                                "hourTuesday" => $proposal['time_tuesday'],    
                                "hourWednesday" =>$proposal['time_wednesday'], 
                                "hourThursday" => $proposal['time_thursday'], 
                                "hourFriday" => $proposal['time_friday'], 
                            ];
                        }
                    }

                    $finalProposal = null;
                    if($training['final_proposal_id']) {
                        $proposal = Training::getTrainingProposal($training['final_proposal_id']);
                        $finalProposal = [
                            "proposalId" => $proposal['proposal_id'],
                            "dateStart" => $proposal['start_date'],
                            "dateEnd" => $proposal['end_date'],
                            "hourMonday" => $proposal['time_monday'],
                            "hourTuesday" => $proposal['time_tuesday'],    
                            "hourWednesday" =>$proposal['time_wednesday'], 
                            "hourThursday" => $proposal['time_thursday'], 
                            "hourFriday" => $proposal['time_friday'],
                        ];
                    }
    
                    $returnedData[] = [
                        "trainerId" => $training['trainerConcerned_id'],
                        "trainingId" => $training['training_id'],
                        "finalProposal" => $finalProposal,
                        "usrProfilePicture" => $training['profilePictureUrl'],
                        "usrFirstName" => $training['firstName'],
                        "usrLastName" => $training['lastName'],
                        "startDate" => $training['start_date_pref'],
                        "endDate" => $training['end_date_pref'],
                        "frequency" => $training['frequency_pref'],
                        "prefSlots" => $returnedSlots,
                        "proposals" => $returnedProposals,
                    ];
                }
            }
    
            echo json_encode($returnedData);
        }

        public static function insertProposals($trainerId,$trainingId,$proposals) {
            foreach($proposals as $proposal) {
                $prop = [
                    "trainerConcerned_id" => $trainerId,
                    "trainingConcerned_id" => $trainingId,
                    "start_date" => $proposal['dateStart'],
                    "end_date" => $proposal['dateEnd'],
                    "time_monday" => (isset($proposal['hourMonday']) ? $proposal['hourMonday'] : NULL),
                    "time_tuesday" => (isset($proposal['hourTuesday']) ? $proposal['hourTuesday'] : NULL),    
                    "time_wednesday" => (isset($proposal['hourWednesday']) ? $proposal['hourWednesday'] : NULL), 
                    "time_thursday" => (isset($proposal['hourThursday']) ? $proposal['hourThursday'] : NULL), 
                    "time_friday" => (isset($proposal['hourFriday']) ? $proposal['hourFriday'] : NULL), 
                ];
                $resp=Training::insertProposal($prop);
                echo json_encode($resp);
            }

        }

        public static function deleteProposals($trainingId) {
            echo json_encode(Training::deleteProposals($trainingId));    
        }

        public static function deleteProposal($proposalId) {
            echo json_encode(Training::deleteProposal($proposalId));    
        }

        public static function getProposals($trainingId) {
            $proposals = Training::getTrainingProposals($trainingId);
            $returnedData = null;

            if($proposals) {
                foreach($proposals as $proposal) {
                    $returnedData[] = [
                        "proposalId" => $proposal['proposal_id'],
                        "dateStart" => $proposal['start_date'],
                        "dateEnd" => $proposal['end_date'],
                        "hourMonday" => $proposal['time_monday'],
                        "hourTuesday" => $proposal['time_tuesday'],    
                        "hourWednesday" =>$proposal['time_wednesday'], 
                        "hourThursday" => $proposal['time_thursday'], 
                        "hourFriday" => $proposal['time_friday'], 
                    ];
                }
            }

            echo json_encode($returnedData);
        }

        public static function acceptProposal($trainingId,$proposalId) {
            echo json_encode(Training::acceptProposal($trainingId,$proposalId));
        }
    }
?>

