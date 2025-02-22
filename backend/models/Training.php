<?php
class Training
{
    private static function getDB() {
        return Database::getConnection();
    }

    public static function createTraining($training){
        $pdo = self::getDB();
        $stmt = $pdo->prepare("INSERT INTO training (customer_firstName, customer_lastName, customer_country, customer_city,
                                                        customer_postalCode, customer_addr, customer_phone, customer_email,
                                                        customer_idCard_url, start_date_pref, end_date_pref, frequency_pref,
                                                        cardUsed_id, userConcerned_id, trainerConcerned_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
        $stmt->execute([$training["customer_firstName"],$training["customer_lastName"],$training["customer_country"],$training["customer_city"],
                        $training["customer_postalCode"],$training["customer_addr"],$training["customer_phone"],$training["customer_email"],
                        $training["customer_idCard_url"],$training["start_date_pref"],$training["end_date_pref"],$training["frequency_pref"],
                        $training["cardUsed_id"],$training["user_id"],$training["trainerConcerned_id"]]);
        return $pdo->lastInsertId();
    }

    public static function deleteTraining($trainingId) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("DELETE FROM training WHERE training_id = ?");
        return $stmt->execute([$trainingId]);
    }

    public static function insertCreditCard($creditCard) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("INSERT INTO credit_card (card_holder,card_number) VALUES (?,?)");
        $stmt->execute([$creditCard['holder'],$creditCard['number']]);
        return $pdo->lastInsertId();
    }

    public static function insertTrainingPreferedSlot($slot) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("INSERT INTO training_preferedSlot (trainingConcerned_id,start_time,end_time) VALUES (?,?,?)");
        $stmt->execute([$slot['trainingConcerned_id'],$slot['start_time'],$slot["end_time"]]);
        return $pdo->lastInsertId();
    }

    public static function getTrainingPreferedSlots($idTraining) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("SELECT * FROM training_preferedslot WHERE trainingConcerned_id = ?");
        $stmt->execute([$idTraining]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function selectTrainingsOfTrainer($idTrainer) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("SELECT t.training_id, t.final_proposal_id, u.firstName, u.lastName, u.profilePictureUrl, t.frequency_pref, t.start_date_pref, t.end_date_pref FROM training t INNER JOIN user u ON u.idUser = t.userConcerned_id WHERE t.trainerConcerned_id = ?");
        $stmt->execute([$idTrainer]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function selectTrainingsOfUser($idUser) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("SELECT t.trainerConcerned_id,t.training_id, t.final_proposal_id, u.firstName, u.lastName, u.profilePictureUrl, t.frequency_pref, t.start_date_pref, t.end_date_pref FROM training t INNER JOIN user u ON u.idUser = t.trainerConcerned_id WHERE t.userConcerned_id = ?");
        $stmt->execute([$idUser]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getTrainingProposals($idTraining) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("SELECT * FROM training_proposal WHERE trainingConcerned_id = ?");
        $stmt->execute([$idTraining]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getTrainingProposal($idProposal) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("SELECT * FROM training_proposal WHERE proposal_id = ?");
        $stmt->execute([$idProposal]);
        return $stmt->fetch();
    }

    public static function deleteProposals($trainingId) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("DELETE FROM training_proposal WHERE trainingConcerned_id = ?");
        return $stmt->execute([$trainingId]);
    }

    public static function deleteProposal($proposalId) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("DELETE FROM training_proposal WHERE proposal_id = ?");
        return $stmt->execute([$proposalId]);
    }
    
    public static function insertProposal($proposal) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("INSERT INTO training_proposal (trainingConcerned_id,trainerConcerned_id,start_date,end_date,time_monday,time_tuesday,time_wednesday,time_thursday,time_friday) VALUES (?,?,?,?,?,?,?,?,?)");
        $stmt->execute([$proposal['trainingConcerned_id'],$proposal['trainerConcerned_id'],$proposal['start_date'],$proposal["end_date"],$proposal['time_monday'],$proposal['time_tuesday'],$proposal['time_wednesday'],$proposal['time_thursday'],$proposal['time_friday']]);
        return $pdo->lastInsertId();
    }

    public static function acceptProposal($trainingId,$proposalId) {
        $pdo = self::getDB();
        $stmt = $pdo->prepare("UPDATE training SET final_proposal_id = ? WHERE training_id = ?");
        return $stmt->execute([$proposalId,$trainingId]);
    }
}
