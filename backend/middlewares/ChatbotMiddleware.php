<?php
class ChatbotMiddleware
{

    public static function validateChatbotQuestion($data)
    {
        if (!isset($data['question']) || empty($data['question'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid question.']);
            exit();
        }
    }
}
