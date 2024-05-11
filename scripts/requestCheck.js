// Écouteur d'événement qui se déclenche lorsque le contenu du DOM est complètement chargé.
document.addEventListener('DOMContentLoaded', function() {
    checkForRequests(); // Appelle la fonction checkForRequests une fois le DOM chargé.
});

// Fonction pour vérifier la présence de demandes spécifiques pour un professeur.
function checkForRequests() {
    // Envoie une requête HTTP pour obtenir les données depuis le serveur.
    fetch('../../controllers/fetchRequestsForProf.php')
        .then(response => response.json()) // Convertit la réponse du serveur en format JSON.
        .then(data => {
            // Vérifie si le tableau retourné contient des éléments.
            if (data.length > 0) {
                // Si des demandes sont présentes, rend visible l'élément 'notif'.
                document.getElementById('notif').hidden = false;
            }
        })
        .catch(error => {
            // En cas d'erreur lors de la requête, affiche l'erreur dans la console.
            console.error('Error fetching requests:', error);
        });
}
