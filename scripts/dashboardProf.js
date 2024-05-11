// Événement déclenché après le chargement complet du contenu de la page
document.addEventListener('DOMContentLoaded', function() {
    // Vérifie si l'URL contient 'dashboard' ou 'manageEtud' pour charger les étudiants
    if (window.location.href.includes('dashboard') || window.location.href.includes('manageEtud'))
        fetchStudents();
    // Vérifie si l'URL contient 'dashboard' ou 'manageCours' pour charger les cours
    if (window.location.href.includes('dashboard') || window.location.href.includes('manageCours'))
        fetchCourses();
    checkForRequests;  // Appelle une fonction pour vérifier les demandes (Note: semble incomplet)
});

// Fonction pour récupérer les informations des étudiants depuis le serveur
function fetchStudents() {
    fetch('../../controllers/fetchStudents.php')  // Effectue une requête au serveur
    .then(response => response.json())  // Traite la réponse en JSON
    .then(students => {
        const container = document.getElementById('students');  // Récupère le conteneur pour les étudiants
        let html = `<table>`;  // Débute la construction du tableau HTML
        html += `<tr><th>ID</th><th>Nom</th><th>Prénom</th><th>Email</th><th>Adresse</th></tr>`;  // Ajoute les entêtes de colonne
        students.forEach(student => {
            // Pour chaque étudiant, ajoute une ligne au tableau
            html += `<tr>
                        <td>${student.id}</td>
                        <td>${student.nom}</td>
                        <td>${student.prenom}</td>
                        <td>${student.email}</td>
                        <td>${student.adresse}</td>
                     </tr>`;
        });
        html += `</table>`;  // Termine le tableau
        container.innerHTML = html;  // Injecte le HTML dans le conteneur
    });
}

// Fonction pour récupérer les informations des cours depuis le serveur
function fetchCourses() {
    fetch('../../controllers/fetchAllcourses.php')
    .then(response => response.text())  // Obtient la réponse en texte pour vérification
    .then(text => {
        try {
            const cours = JSON.parse(text);  // Tente de parser le texte en JSON
            const container = document.getElementById('cours');  // Récupère le conteneur pour les cours
            let html = `<table>`;
            html += `<tr><th>ID</th><th>Cours</th><th>Description</th><th>Action</th></tr>`;  // Ajoute les entêtes de colonne
            cours.forEach(course => {
                // Pour chaque cours, ajoute une ligne avec un bouton pour supprimer
                html += `<tr>
                            <td>${course.id}</td>
                            <td>${course.nom}</td>
                            <td>${course.description}</td>
                            <td><button class='delete-btn' onclick='confirmDeleteCours(${course.id})'>Delete</button></td>
                         </tr>`;
            });
            html += `</table>`;  // Termine le tableau
            container.innerHTML = html;  // Injecte le HTML dans le conteneur
        } catch (error) {
            console.error('Error parsing JSON:', error, 'Received text:', text);
        }
    })
    .catch(error => {
        console.error('Error fetching the courses:', error);
    });
}

// Fonction pour confirmer la suppression d'un cours
function confirmDeleteCours(crsId) {
    if (confirm('Are you sure you want to delete this Cours?')) {  // Demande une confirmation
        removeCours(crsId);  // Appelle la fonction de suppression si confirmé
    }
}

// Fonction pour supprimer un cours via une requête au serveur
function removeCours(crsId) {
    fetch('../../controllers/removeCours.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `crsId=${crsId}`  // Envoie l'identifiant du cours à supprimer
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            fetchCourses();  // Rafraîchit la liste des cours si la suppression est réussie
        } else {
            alert('Failed to delete course.');  // Affiche un message d'erreur si échec
        }
    });
}
