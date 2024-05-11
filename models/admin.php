```php
<?php

// Inclusion du fichier de configuration de la base de données
require_once "../database/DB.php";

// Définition de la classe Admin
class Admin
{
    // Méthode statique pour connecter un administrateur
    static public function loginAdmin($login)
    {
        // Préparation de la requête SQL pour récupérer l'administrateur par son login
        $stmt = DB::connect()->prepare('SELECT * FROM admin WHERE login = ?');
        // Exécution de la requête avec le login en paramètre
        $stmt->execute([$login]);
        // Récupération de l'administrateur sous forme d'objet
        $user = $stmt->fetch(PDO::FETCH_OBJ);
        // Retourne l'objet de l'administrateur
        return $user;
        // Fermeture du statement pour libérer les ressources (ce code ne sera jamais exécuté)
        $stmt->close();
        $stmt = null;
    }

    // Méthode statique pour récupérer tous les professeurs
    static public function getAllProfs()
    {
        // Préparation de la requête SQL pour récupérer tous les professeurs
        $stmt = DB::connect()->prepare('SELECT * FROM professeurs ORDER BY request DESC');
        // Exécution de la requête
        $stmt->execute();
        // Récupération de tous les professeurs en tant qu'objets
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }

    // Méthode statique pour récupérer tous les étudiants
    static public function getAllEtudiants()
    {
        // Préparation de la requête SQL pour récupérer tous les étudiants
        $stmt = DB::connect()->prepare('SELECT * FROM etudiant ORDER BY request DESC');
        // Exécution de la requête
        $stmt->execute();
        // Récupération de tous les étudiants en tant qu'objets
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }

    // Méthode statique pour supprimer un professeur
    static public function removeProf($profId)
    {
        // Préparation de la requête SQL pour supprimer un professeur par son ID
        $stmt = DB::connect()->prepare('DELETE FROM professeurs WHERE id = :id');
        // Liaison de la valeur de l'ID aux paramètres de la requête
        $stmt->bindParam(':id', $profId);
        // Exécution de la requête
        return $stmt->execute();
    }

    // Méthode statique pour supprimer un étudiant
    static public function removeEtudiant($etudiantId)
    {
        // Préparation de la requête SQL pour supprimer un étudiant par son ID
        $stmt = DB::connect()->prepare('DELETE FROM etudiant WHERE id = :id');
        // Liaison de la valeur de l'ID aux paramètres de la requête
        $stmt->bindParam(':id', $etudiantId);
        // Exécution de la requête
        return $stmt->execute();
    }
}
