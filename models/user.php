<?php
// Inclusion du fichier de configuration de la base de données
require_once "../database/DB.php";

// Définition de la classe User
class User
{
    // Propriétés protégées de la classe User
    protected $nom;
    protected $prenom;
    protected $email;
    protected $adresse;
    protected $mot_de_passe;

    // Méthode statique pour connecter un utilisateur par email
    public static function loginUser($email)
    {
        // Préparation de la requête SQL pour récupérer l'utilisateur par son email
        $stmt = DB::connect()->prepare('SELECT * FROM ' . static::$tableName . ' WHERE email = ?');
        // Exécution de la requête avec l'email en paramètre
        $stmt->execute([$email]);
        // Récupération de l'utilisateur sous forme d'objet
        $user = $stmt->fetch(PDO::FETCH_OBJ);
        // Fermeture du statement pour libérer les ressources
        $stmt = null;
        // Retourne l'utilisateur trouvé
        return $user;
    }

    // Méthode statique pour vérifier si un email existe déjà dans la base de données
    public static function checkEmailExists($email)
    {
        // Préparation de la requête SQL pour compter le nombre d'occurrences de l'email dans la table
        $stmt = DB::connect()->prepare('SELECT COUNT(*) FROM ' . static::$tableName . ' WHERE email = ?');
        // Exécution de la requête avec l'email en paramètre
        $stmt->execute([$email]);
        // Récupération du nombre d'occurrences
        $count = $stmt->fetchColumn();
        // Fermeture du statement pour libérer les ressources
        $stmt = null;
        // Retourne vrai si l'email existe déjà, faux sinon
        return $count > 0;
    }

    // Méthode statique pour ajouter un nouvel utilisateur
    public static function addUser($data)
    {
        // Hachage du mot de passe avant de l'insérer dans la base de données
        $hashedPassword = password_hash($data['mot_de_passe'], PASSWORD_DEFAULT);

        // Préparation de la requête SQL pour ajouter un nouvel utilisateur
        $stmt = DB::connect()->prepare('INSERT INTO ' . static::$tableName . ' (nom, prenom, adresse, email, mot_de_passe, request) VALUES (:nom, :prenom, :adresse, :email, :mot_de_passe, 0)');
        // Liaison des valeurs aux paramètres de la requête
        $stmt->bindParam(':nom', $data['nom']);
        $stmt->bindParam(':prenom', $data['prenom']);
        $stmt->bindParam(':adresse', $data['adresse']);
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':mot_de_passe', $hashedPassword);

        // Exécution de la requête
        if ($stmt->execute()) {
            return 'ok'; // Retourne 'ok' si l'ajout est réussi
        } else {
            return 'error'; // Retourne 'error' en cas d'échec de l'ajout
        }
        // Fermeture du statement pour libérer les ressources
        $stmt = null;
    }

    // Méthode statique pour changer le mot de passe de l'utilisateur
    public static function changePassword($prfid, $newPass)
    {
        try {
            // Hachage du nouveau mot de passe
            $hashedNewPass = password_hash($newPass, PASSWORD_DEFAULT);

            // Préparation de la requête SQL pour mettre à jour le mot de passe de l'utilisateur
            $stmt = DB::connect()->prepare('UPDATE ' . static::$tableName . ' SET mot_de_passe = :password WHERE id = :id');
            // Liaison des valeurs aux paramètres de la requête
            $stmt->bindParam(':password', $hashedNewPass);
            $stmt->bindParam(':id', $prfid);
            // Exécution de la requête
            $stmt->execute();
            // Retourne vrai en cas de succès
            return true;
        } catch (PDOException $e) {
            // Retourne faux en cas d'erreur
            return false;
        }
    }

    // Méthode statique pour modifier les informations de l'utilisateur
    public static function modifyUser($prfid, $data)
    {
        try {
            // Préparation de la requête SQL pour mettre à jour les informations de l'utilisateur
            $stmt = DB::connect()->prepare('UPDATE ' . static::$tableName . ' SET nom = :nom, prenom = :prenom, adresse = :adresse, email = :email WHERE id = :id');
            // Liaison des valeurs aux paramètres de la requête
            $stmt->bindParam(':nom', $data['nom']);
            $stmt->bindParam(':prenom', $data['prenom']);
            $stmt->bindParam(':adresse', $data['adresse']);
            $stmt->bindParam(':email', $data['email']);
            $stmt->bindParam(':id', $prfid);
            // Exécution de la requête
            $stmt->execute();
            // Retourne vrai en cas de succès
            return true;
        } catch (PDOException $e) {
            // Retourne faux en cas d'erreur
            return false;
        }
    }

    // Méthode statique pour demander la suppression du compte utilisateur
    public static function requestDelete($prfid)
    {
        try {
            // Préparation de la requête SQL pour marquer la demande de suppression du compte
            $stmt = DB::connect()->prepare('UPDATE ' . static::$tableName . ' SET request = 1 WHERE id = :id');
            // Liaison des valeurs aux paramètres de la requête
            $stmt->bindParam(':id', $prfid);
            // Exécution de la requête
            $stmt->execute();
            // Fermeture du statement pour libérer les ressources
            $stmt = null;
            // Retourne 'ok' en cas de succès
            return 'ok';
        } catch (PDOException $e) {
            // Journalisation de l'erreur
            error_log('Failed to request deletion: ' . $e->getMessage());
            // Retourne 'error' en cas d'erreur
            return 'error';
        }
    }

    // Méthode statique pour récupérer le nom et prénom de l'utilisateur
    public static function getUserName($prfid)
    {
        try {
            // Préparation de la requête SQL pour récupérer le nom et prénom de l'utilisateur
            $stmt = DB::connect()->prepare('SELECT nom, prenom FROM ' . static::$tableName . ' WHERE id = :id');
            // Liaison des valeurs aux paramètres de la requête
            $stmt->bindParam(':id', $prfid);
            // Exécution de la requête
            $stmt->execute();
            // Récupération du nom et prénom sous forme d'objet
            $name = $stmt->fetch(PDO::FETCH_OBJ);
            // Fermeture du statement pour libérer les ressources
            $stmt = null;
            // Retourne le nom et prénom
            return $name;
        } catch (PDOException $e) {
            // Journalisation de l'erreur
            error_log('Failed to request deletion: ' . $e->getMessage());
            // Retourne 'error' en cas d'erreur
            return 'error';
        }
    }
}

// Définition de la classe Etudiant, sous-classe de User
class Etudiant extends User
{
    protected static $tableName = 'etudiant'; // Nom de la table pour les étudiants

    // Méthode statique pour récupérer tous les cours d'un étudiant donné
    static public function getMyCourses($stdid)
    {
        // Préparation de la requête SQL pour récupérer les cours d'un étudiant
        $stmt = DB::connect()->prepare('SELECT m.id, m.nom, m.description, m.prof_id FROM modules m
            JOIN enrollement e ON m.id = e.id_cours
            WHERE e.id_etd = ?');
        // Exécution de la requête avec l'ID de l'étudiant en paramètre
        $stmt->execute([$stdid]);
        // Récupération des résultats sous forme d'objets
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }

    // Méthode statique pour demander l'inscription à un cours
    static public function requestEnrollment($studentId, $courseId, $profId)
    {
        // Connexion à la base de données
        $db = DB::connect();
        // Requête SQL pour insérer une demande d'inscription à un cours
        $sql = "INSERT INTO enrollment_requests (student_id, cours_id, prof_id) VALUES (?, ?, ?)";
        // Préparation de la requête
        $stmt = $db->prepare($sql);
        // Exécution de la requête avec les paramètres fournis
        return $stmt->execute([$studentId, $courseId, $profId]);
    }

    // D'autres méthodes spécifiques à Etudiant peuvent être ajoutées ici
}

// Définition de la classe Prof, sous-classe de User
class Prof extends User
{
    protected static $tableName = 'professeurs'; // Nom de la table pour les professeurs

    // Méthode statique pour récupérer tous les étudiants
    public static function getAllEtudiants()
    {
        // Préparation de la requête SQL pour récupérer tous les étudiants
        $stmt = DB::connect()->prepare('SELECT * FROM etudiant');
        // Exécution de la requête
        $stmt->execute();
        // Récupération de tous les étudiants en tant qu'objets
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }

    // Méthode statique pour récupérer les cours d'un professeur
    public static function getCourses($profId)
    {
        // Préparation de la requête SQL pour récupérer les cours d'un professeur
        $stmt = DB::connect()->prepare('SELECT id, name FROM courses WHERE prof_id = ?');
        // Exécution de la requête avec l'ID du professeur en paramètre
        $stmt->execute([$profId]);
        // Récupération des résultats sous forme d'associations de tableaux
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Méthode statique pour inscrire des étudiants à des cours
    public static function enrollStudents($courseId, $studentIds)
    {
        // Préparation de la requête SQL pour inscrire les étudiants à un cours
        $stmt = DB::connect()->prepare('INSERT INTO enrollement (id_cours, id_etd) VALUES (?, ?)');
        // Boucle sur les IDs des étudiants
        foreach ($studentIds as $id) {
            // Exécution de la requête pour chaque ID d'étudiant
            $stmt->execute([$courseId, $id]);
        }
        // Retourne vrai une fois l'inscription terminée
        return true;
    }

    // Méthode statique pour récupérer les étudiants avec leur statut d'inscription à un cours
    public static function getStudentsWithEnrollmentStatus($courseId)
    {
        // Connexion à la base de données
        $db = DB::connect();
        // Requête SQL pour récupérer les étudiants avec leur statut d'inscription à un cours
        $sql = "SELECT etudiant.*, 
                CASE WHEN enrollement.id_cours IS NULL THEN 0 ELSE 1 END AS is_enrolled
                FROM etudiant
                LEFT JOIN enrollement ON etudiant.id = enrollement.id_etd AND enrollement.id_cours = :courseId";
        // Préparation de la requête
        $stmt = $db->prepare($sql);
        // Liaison des valeurs aux paramètres de la requête
        $stmt->bindParam(':courseId', $courseId, PDO::PARAM_INT);
        // Exécution de la requête
        $stmt->execute();
        // Récupération des résultats sous forme d'associations de tableaux
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Méthode statique pour retirer un étudiant d'un cours
    public static function removeStudentFromCourse($courseId, $studentId)
    {
        // Préparation de la requête SQL pour retirer un étudiant d'un cours
        $stmt = DB::connect()->prepare('DELETE FROM enrollement WHERE id_cours = :courseId AND id_etd = :studentId');
        // Liaison des valeurs aux paramètres de la requête
        $stmt->bindParam(':courseId', $courseId);
        $stmt->bindParam(':studentId', $studentId);
        // Exécution de la requête
        return $stmt->execute();
    }

    // D'autres méthodes spécifiques à Prof peuvent être ajoutées ici
}
