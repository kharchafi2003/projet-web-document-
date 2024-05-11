<?php
// Inclusion du fichier de configuration de la base de données
require_once "../database/DB.php";

class Cours
{
    // Méthode pour vérifier si un cours existe déjà pour un professeur donné
    public static function check($login, $prfid)
    {
        // Connexion à la base de données
        $conn = DB::connect();
        // Préparation de la requête SQL pour vérifier l'existence d'un cours
        $stmt = $conn->prepare('SELECT * FROM modules WHERE nom = :nom AND prof_id = :id');
        // Liaison des paramètres
        $stmt->bindParam(':nom', $login);
        $stmt->bindParam(':id', $prfid);
        // Exécution de la requête
        $stmt->execute();
        // Récupération du nombre de lignes résultantes
        $count = $stmt->rowCount();
        // Libération de la ressource statement
        $stmt = null;
        // Retourne vrai si le cours existe déjà, faux sinon
        return $count > 0;
    }

    // Méthode pour ajouter un nouveau cours
    public static function ajouterCours($data)
    {
        // Connexion à la base de données
        $conn = DB::connect();
        // Préparation de la requête SQL pour ajouter un nouveau cours
        $stmt = $conn->prepare('INSERT INTO modules (nom, description, prof_id) VALUES (:nom, :description, :id)');
        // Liaison des paramètres
        $stmt->bindParam(':nom', $data['nom']);
        $stmt->bindParam(':description', $data['description']);
        $stmt->bindParam(':id', $data['prfid']);
        // Exécution de la requête
        if ($stmt->execute()) {
            return 'ok'; // Retourne 'ok' si l'ajout est réussi
        } else {
            return 'error'; // Retourne 'error' en cas d'échec de l'ajout
        }
    }

    // Méthode pour récupérer tous les cours d'un professeur
    static public function getAllCourses($prfid)
    {
        $stmt = DB::connect()->prepare('SELECT * FROM modules WHERE prof_id = ?');
        $stmt->execute([$prfid]);
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }

    // Méthode pour supprimer un cours
    static public function removeCours($crsId)
    {
        $stmt = DB::connect()->prepare('DELETE FROM modules WHERE id = :id');
        $stmt->bindParam(':id', $crsId);
        return $stmt->execute();
    }

    // Méthode pour récupérer les parties d'un cours par son ID
    public static function getPartsByCourseId($courseId)
    {
        $stmt = DB::connect()->prepare('SELECT * FROM parties WHERE id_cours = :courseId');
        $stmt->bindParam(':courseId', $courseId, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Méthode pour récupérer les parties vues par un étudiant pour un cours donné
    public static function getMyPartsByCourseId($courseId)
    {
        $stmt = DB::connect()->prepare('SELECT * FROM parties WHERE id_cours = :courseId AND view_flag = 1');
        $stmt->bindParam(':courseId', $courseId, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Méthode pour basculer le drapeau de vue d'une partie
    public static function toggleViewFlag($partId, $viewFlag)
    {
        $stmt = DB::connect()->prepare('UPDATE parties SET view_flag = :viewFlag WHERE id_part = :partId');
        $stmt->bindParam(':viewFlag', $viewFlag, PDO::PARAM_BOOL);
        $stmt->bindParam(':partId', $partId, PDO::PARAM_INT);
        return $stmt->execute();
    }

    // Méthode pour ajouter une nouvelle partie à un cours
    public static function addPart($courseId, $title, $filePath, $viewFlag)
    {
        $stmt = DB::connect()->prepare('INSERT INTO parties (id_cours, title_part, path_part, view_flag) VALUES (:courseId, :title, :filePath, :viewFlag)');
        $stmt->bindParam(':courseId', $courseId);
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':filePath', $filePath);
        $stmt->bindParam(':viewFlag', $viewFlag);
        return $stmt->execute();
    }

    // Méthode pour supprimer une partie d'un cours
    public static function removePart($partId)
    {
        $stmt = DB::connect()->prepare('DELETE FROM parties WHERE id_part = :partId');
        $stmt->bindParam(':partId', $partId, PDO::PARAM_INT);
        return $stmt->execute();
    }

    // Méthode pour récupérer tous les cours existants
    static public function getAllExistantCourses()
    {
        $stmt = DB::connect()->prepare('SELECT * FROM modules');
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }
}
