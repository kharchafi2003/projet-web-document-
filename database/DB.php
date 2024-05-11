<?php
class DB{
    // Méthode statique pour établir une connexion à la base de données
    static public function connect(){
        // Création d'une nouvelle instance de PDO pour se connecter à la base de données MySQL
        $pdo = new PDO('mysql:host=localhost;dbname=plateforme_scolaire', 'root', '');
        // Définition du jeu de caractères à UTF-8 pour prendre en charge les caractères spéciaux
        $pdo->exec("set names utf8");
        // Configuration du mode d'erreur pour afficher les exceptions en cas d'erreur SQL
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        // Retourne l'objet PDO pour permettre l'exécution de requêtes SQL
        return $pdo;
    }
}
?>
