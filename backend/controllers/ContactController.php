<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class ContactController
{
    public static function contact($data)
    {
        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'airconcess.contact@gmail.com';
            $mail->Password = 'qtbriwetjarfsgry';
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;

            $mail->setFrom('airconcess.contact@gmail.com', 'AirConcess');
            $mail->addAddress('airconcess.contact@gmail.com', 'AirConcess');

            $mail->isHTML(true);
            $mail->Subject = 'Contact from ' . $data['name'];
            $mail->Body    = '<p>' . htmlspecialchars($data['message'], ENT_QUOTES, 'UTF-8') . '</p> <p>' . htmlspecialchars($data['email'], ENT_QUOTES, 'UTF-8') . '</p>';
            $mail->AltBody = strip_tags($data['message']);

            $mail->send();
            echo 'Le message a bien été envoyé';
        } catch (Exception $e) {
            echo 'Le message n\'a pas pu être envoyé. Erreur Mailer: ' . $mail->ErrorInfo;
        }
    }
}
