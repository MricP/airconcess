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
                                                        cardUsed_id, userConcerned_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
        $stmt->execute([$training["customer_firstName"],$training["customer_lastName"],$training["customer_country"],$training["customer_city"],
                        $training["customer_postalCode"],$training["customer_addr"],$training["customer_phone"],$training["customer_email"],
                        $training["customer_idCard_url"],$training["start_date_pref"],$training["end_date_pref"],$training["frequency_pref"],
                        $training["cardUsed_id"],$training["user_id"]]);
        return $pdo->lastInsertId();
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
}
