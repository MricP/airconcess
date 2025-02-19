<?php
class Database
{
    private static $host = 'localhost';
    private static $dbname = 'air_concess';
    private static $username = 'root';
    private static $password = '';
    private static $conn = null;

    private function __construct() {
        //Constructeur en privé, pattern Singleton
    }

    public static function getConnection() {
        if(self::$conn == null) {
            try {
                self::$conn = new PDO(
                    "mysql:host=" . self::$host . ";dbname=" . self::$dbname . ";charset=utf8",
                    self::$username,
                    self::$password
                );
                self::$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e) {
                echo 'Connection failed: ' . $e->getMessage();
                exit();
            }
        }

        return self::$conn;
    }
}





/*
CREATE TABLE User (
    idUser INT AUTO_INCREMENT PRIMARY KEY,
    password TEXT NOT NULL,
    firstName TEXT,
    lastName TEXT,
    email VARCHAR(255) UNIQUE NOT NULL,
    location TEXT,
    profilePictureURL TEXT,
    isVerified BOOLEAN,
    isTrainer BOOLEAN,
    isAdmin BOOLEAN,
    inscriptionDate DATE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Aircraft (
    idAircraft INT AUTO_INCREMENT PRIMARY KEY,
    model TEXT,
    price DECIMAL(10, 2),
    year INT,
    capacity INT,
    autonomy INT,
    aircraftType TEXT,
    description TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Pilot (
    idPilot INT AUTO_INCREMENT PRIMARY KEY,
    lastName TEXT,
    firstName TEXT,
    salary BOOLEAN,
    isAvailable BOOLEAN,
    profilePictureURL TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Training (
    idTraining INT AUTO_INCREMENT PRIMARY KEY,
    price DECIMAL(10, 2),
    trainingType TEXT,
    cardIdentity TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Image (
    idImage INT AUTO_INCREMENT PRIMARY KEY,
    id_Aircraft INT,
    role TEXT,
    imageURL TEXT,
    FOREIGN KEY (id_Aircraft) REFERENCES Aircraft(idAircraft) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE TechnicalSheet (
    idTechnicalSheet INT AUTO_INCREMENT PRIMARY KEY,
    sheetURL TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Appointment (
    idAppointment INT AUTO_INCREMENT PRIMARY KEY,
    pattern TEXT,
    identityCardURL TEXT,
    phoneNumber TEXT,
    dateAppointment DATE,
    incomeProof TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Estimate (
    idEstimate INT AUTO_INCREMENT PRIMARY KEY,
    idClient INT,
    id_Aircraft INT,
    PaymentStatus BOOLEAN,
    FOREIGN KEY (id_Aircraft) REFERENCES Aircraft(idAircraft) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
*/
