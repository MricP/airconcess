<?php
/*backend/public/index.php*/

// envoie un reponse json
function sendJsonResponse($data) {
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}        
