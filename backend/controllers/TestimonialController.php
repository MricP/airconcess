<?php
require_once __DIR__ . '/../models/Testimonial.php';
class TestimonialController
{

    public static function getAllTestimonials()
    {
        try {
            $testimonials = Testimonial::getAllTestimonials();
            $nbTestimonials = Testimonial::getNumberTestimonials();

            echo json_encode([
                'status' => 'success',
                'data' => $testimonials,
                'nbTestimonials' => $nbTestimonials,
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'status' => 'error',
                'message' => 'Une erreur s\'est produite : ' . $e->getMessage(),
            ]);
        }
    }

    public static function CreateTestismonial($data)
    {
        try {
            $token = $data['token'];
            $payload = Token::verify($token);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'status' => 'error',
                'message' => 'Une erreur s\'est produite : ' . $e->getMessage(),
            ]);
        }
    }

    public static function GetTestimonialsByUser($data)
    {
        try {
            $token = $data['token'];
            $payload = Token::verify($token);
            $testimonials = Testimonial::GetTestimonialsUser($payload['idUser']);
            echo json_encode([
                'status' => 'success',
                'data' => $testimonials
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'status' => 'error',
                'message' => 'Une erreur s\'est produite : ' . $e->getMessage(),
            ]);
        }
    }

    public static function CreateTestimonial($data)
    {
        try {
            $token = $data['token'];
            $payload = Token::verify($token);
            $id_user = $payload['idUser'];
            $content = $data['testimonial'];
            $id = Testimonial::createTestimonial($id_user, $content);
            echo json_encode([
                'status' => 'success',
                'id' => $id
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'status' => 'error',
                'message' => 'Une erreur s\'est produite : ' . $e->getMessage(),
            ]);
        }
    }
}
