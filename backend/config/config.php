<?php
return [
    'db_host' => 'localhost',
    'db_name' => 'nom_de_la_base_de_donnees',
    'db_user' => 'utilisateur',
    'db_pass' => 'mot_de_passe',
    'jwt_secret' => bin2hex(random_bytes(32)),
];
