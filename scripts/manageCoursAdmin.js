// Événement déclenché après le chargement complet du contenu de la page
document.addEventListener('DOMContentLoaded', function() {
    fetchAllCourses();  // Appel de la fonction pour charger tous les cours disponibles
});

// Fonction pour récupérer et afficher tous les cours existants
function fetchAllCourses() {
    fetch('../../controllers/fetchAllExistantCours.php')  // Effectue une requête au serveur
    .then(response => response.text())  // Obtient la réponse en format texte
    .then(text => {
        const cours = JSON.parse(text);  // Convertit le texte en objet JSON
        const container = document.getElementById('cours');  // Récupère le conteneur pour les cours
        let html = `<table>`;  // Démarre la construction du tableau HTML
        html += `<tr><th>ID</th><th>Cours</th><th>Description</th><th>Prof ID</th><th>Action</th></tr>`;  // Ajoute les en-têtes de colonnes
        cours.forEach(course => {
            // Pour chaque cours, ajoute une ligne au tableau
            html += `<tr>
                        <td>${course.id}</td>
                        <td>${course.nom}</td>
                        <td>${course.description}</td>
                        <td>${course.prof_id}</td>
                        <td><button class='delete-btn' onclick='confirmDeleteCours(${course.id})'>Supprimer</button></td>
                     </tr>`;
        });
        html += `</table>`;  // Ferme le tableau
        container.innerHTML = html;  // Injecte le HTML dans le conteneur
    });
}

// Fonction pour confirmer la suppression d'un cours
function confirmDeleteCours(crsId) {
    if (confirm('Confirmer la supression du cours.')) {  // Affiche une boîte de dialogue de confirmation
        removeCours(crsId);  // Si confirmé, appelle la fonction de suppression
    }
}

// Fonction pour supprimer un cours via une requête au serveur
function removeCours(crsId) {
    fetch('../../controllers/removeCours.php', {
        method: 'POST',  // Méthode POST pour la suppression
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `crsId=${crsId}`  // Envoie l'identifiant du cours à supprimer
    })
    .then(response => response.json())  // Traite la réponse en JSON
    .then(data => {
        if (data.success) {
            fetchAllCourses();  // Si la suppression réussit, rafraîchit la liste des cours
        } else {
            alert('Failed to delete course.');  // Si échec, affiche un message d'erreur
        }
    });
}
