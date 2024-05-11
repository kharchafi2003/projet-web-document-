```php
<?php
// Inclusion du fichier de configuration de la base de données
require_once "../database/DB.php";

// Définition de la classe Chat
class Chat
{
    // Méthode statique pour récupérer les messages entre deux parties
    public static function getMsgs($secondParty, $firstParty)
    {
        // Connexion à la base de données
        $db = DB::connect();
        // Requête SQL pour récupérer les messages entre deux parties, triés par timestamp décroissant
        $sql = "SELECT * FROM chat_logs WHERE
        (recipient_id = :first AND sender_id = :second)
        OR (recipient_id = :second AND sender_id = :first) 
        OR recipient_id = -1
        ORDER BY time_stamp DESC";
        // Préparation de la requête
        $stmt = $db->prepare($sql);
        // Liaison des valeurs aux paramètres de la requête
        $stmt->bindParam(':first', $firstParty, PDO::PARAM_INT);
        $stmt->bindParam(':second', $secondParty, PDO::PARAM_INT);
        // Exécution de la requête
        $stmt->execute();
        // Récupération des résultats sous forme d'associations de tableaux
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Méthode statique pour envoyer un message
    public static function SendMessage($sender_id, $recipient_id, $message)
    {
        // Connexion à la base de données
        $db = DB::connect();
        // Préparation de la requête SQL pour insérer un nouveau message dans la table de chat
        $sql = "INSERT INTO chat_logs (sender_id, recipient_id, msg, time_stamp) 
                VALUES (:sender_id, :recipient_id, :message, NOW())"; // Supposant que time_stamp est la colonne pour le timestamp
        // Préparation de la requête
        $stmt = $db->prepare($sql);
        // Liaison des valeurs aux paramètres de la requête
        $stmt->bindParam(':sender_id', $sender_id, PDO::PARAM_INT);
        $stmt->bindParam(':recipient_id', $recipient_id, PDO::PARAM_INT);
        $stmt->bindParam(':message', $message, PDO::PARAM_STR);
        // Exécution de la requête
        $stmt->execute();
        // Vérification si l'exécution a réussi
        if ($stmt->rowCount() > 0) {
            return true; // Message envoyé avec succès
        } else {
            return false; // Échec de l'envoi du message
        }
    }
}
