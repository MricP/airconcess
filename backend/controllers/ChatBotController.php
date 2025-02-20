<?php
require_once __DIR__ . '/../vendor/autoload.php';

class ChatbotController
{
    private static $openai_api_key;
    private static $apiUrl;

    public static function init()
    {
        if (empty(self::$openai_api_key) || empty(self::$apiUrl)) {
            $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
            $dotenv->load();

            self::$openai_api_key = $_ENV['OPENAI_API_KEY'] ?? null;
            self::$apiUrl = $_ENV['API_URL'] ?? null;
        }
    }

    private static $liste_questions_toute_faites_en_lien_avec_le_site = [
        "Quels types de services propose AirConcess ?" => "Vente, location d'avion et formation pour apprendre à piloter.",
        "Comment puis-je contacter AirConcess pour obtenir un devis ou des informations supplémentaires ?" => "Vous pouvez vous rendre sur la page Contact ou un mail sur airconcess.contact@gmail.com",
        "AirConcess opère-t-elle dans ma région ou mon aéroport local ?" => "Paris, Los Angeles, Toronto, London et Berlin.",
        "Quels sont les avantages de choisir AirConcess par rapport à d'autres concessionnaires aéroportuaires ?" => "Notre large choix d'aéronefs en fonction de 3 critères (international, national, local), nos vendeurs réactifs à vos demandes de rdv et notre formation en lien avec l'achat de votre avion",
        "Comment AirConcess sélectionne-t-elle ses partenaires de marque pour les concessions aéroportuaires ?" => "Nous sélectionnons nos partenaires en fonction de la qualité des aéronefs qu'ils nous fournissent, leurs RSE, etc...",
        "Quels sont les aéroports où AirConcess est actuellement présente ?" => "Paris, Los Angeles, Toronto, London et Berlin.",
        "Quels sont les engagements d'AirConcess en matière de durabilité et d'environnement ?" => "AirConcess s'engage activement en matière de durabilité et d'environnement en intégrant des pratiques responsables dans ses opérations.",
        "Comment AirConcess gère-t-elle les retours ou les plaintes des clients ?" => "Nous répondons directement au client au téléphone (+33 1 23 45 67 89), si besoin nous organisons une rencontre pour régler ceci.",
        "Quels sont les prérequis pour s'inscrire à la formation PPL proposée par AirConcess ?" => "Avoir fait un test optique clinique, avoir au moins 17 ans, et la confirmation parentale force à vous !",
        "Quelle est la durée totale de la formation PPL ?" => "Minimum 45h de vol.",
        "Quel est le coût de la formation PPL ?" => "Sous-total HT 7050 € et TVA 1410 €.",
        "Quels types d'aéronefs sont utilisés pour la formation en vol ?" => "Des Cessna 172.",
        "Les instructeurs d'AirConcess sont-ils certifiés et expérimentés ?" => "Ils ont leurs PPL et une formation académique dans l'aviation en général des ingénieurs.",
        "Y a-t-il des opportunités de vol en solo pendant la formation ?" => "Une fois les heures de vol complétées, vous passerez un test en vol avec un examinateur agréé.",
        "Y a-t-il des possibilités de formation sur simulateur ?" => "Oui avant la pratique réelle et lorsque les conditions météo ne sont pas réunies.",
        "Quels sont les taux de réussite des étudiants d'AirConcess aux examens du PPL ?" => "Les taux de réussite varient mais cette année il est de 70 à 80%.",
        "Quels sont les moyens de paiement acceptés par AirConcess pour régler une formation ou un service ?" => "Carte bancaire, paiement en plusieurs fois, virement bancaire, PayPal, chèques (sous conditions), Stripe.",
        "Où sont les agences d'AirConcess ?" => "Paris, Los Angeles, Toronto, London et Berlin.",
        "Qui sont les fondateurs d'AirConcess ?" => "Matheo Flores, Filloux Florian, Emric Pierrera, Sacha Roux",
        "Quelles sont les étapes d'aquisition ?" => "1. Trouver votre avion Découvrez notre vaste sélection d'avions, qu'il s'agisse d'un achat ou d'une location. Explorez notre catalogue, classé par autonomie, nombre de sièges et année de fabrication. Trouvez l'aéronef qui correspond parfaitement à vos besoins. 2. Prendre rendez-vous avec un vendeur, Une fois que vous avez sélectionné l'avion de vos rêves, il est temps de concrétiser votre projet ! Prenez rendez-vous avec l'un de nos experts qui vous accompagnera dans le processus d'achat ou de location. Vous pouvez également choisir vos pilotes pour une expérience sur mesure. 3. Conclure par un serrage de main ! Après avoir finalisé tous les détails, il est temps de célébrer cette nouvelle étape ! Un dernier échange, un serrage de main, et votre aventure aérienne commence. Faites confiance à Air Concess pour vous guider tout au long de votre parcours.",
        "Quelles sont les offres d'avions d'AirConcess ?" => "Offres d'avion ayant la capacité de rayonnement international et national, regionales et locales",
    ];

    public static function responseForTheQuestion($data)
    {
        if (!isset($data['question']) || !is_array($data['question']) || empty($data['question'])) {
            http_response_code(400);
            return ['error' => 'La question est vide ou invalide.'];
        }

        $user_question = reset($data['question']);
        if (!is_string($user_question) || empty(trim($user_question))) {
            http_response_code(400);
            return ['error' => 'La question est vide ou invalide.'];
        }

        $user_question = trim($user_question);

        $context = "";
        foreach (self::$liste_questions_toute_faites_en_lien_avec_le_site as $question => $response) {
            $context .= "Question : " . $question . "\nRéponse : " . $response . "\n\n";
        }

        $payload = [
            "model" => "gpt-4o",
            "messages" => [
                ["role" => "system", "content" => "Tu es l'assistant Air-concess (pas chatgpt si on te demande, tu dois répondre uniquement en fonction des questions fournies, si on te pose une question sur un autre sujet que les avions d'AirConcess ne repond rien, fait des belles phrases en 20 mots max, repond 'toi même' si on t'insulte)."],
                ["role" => "system", "content" => "Voici la base de connaissances :\n" . $context],
                ["role" => "user", "content" => $user_question]
            ],
            "max_tokens" => 50,
            "temperature" => 0.7
        ];

        $options = [
            "http" => [
                "header" => [
                    "Content-Type: application/json",
                    "Authorization: Bearer " . self::$openai_api_key
                ],
                "method" => "POST",
                "content" => json_encode($payload),
                "ignore_errors" => true
            ]
        ];

        $context = stream_context_create($options);
        $response = file_get_contents(self::$apiUrl, false, $context);

        if ($response === false) {
            http_response_code(500);
            return ['error' => "Erreur lors de l'appel à l'API OpenAI."];
        }

        $decoded_response = json_decode($response, true);
        if (!isset($decoded_response['choices'][0]['message']['content'])) {
            http_response_code(500);
            return ['error' => "Réponse inattendue de l'API OpenAI.", 'details' => $decoded_response];
        }

        return ['answer' => $decoded_response['choices'][0]['message']['content']];
    }
}
