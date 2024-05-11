// Événement exécuté après le chargement complet du contenu de la page
document.addEventListener('DOMContentLoaded', function() {
    fetchProfs();  // Appel de la fonction pour récupérer la liste des professeurs
    fetchStudents();  // Appel de la fonction pour récupérer la liste des étudiants
});

// Fonction pour récupérer la liste des professeurs depuis le serveur
function fetchProfs() {
    fetch('../../controllers/fetchProfs.php')  // Requête HTTP GET vers le serveur
    .then(response => response.json())  // Conversion de la réponse en JSON
    .then(profs => {
        const container = document.getElementById('profs');  // Récupération du conteneur pour les professeurs
        let html = `<table>`;  // Début de la construction du tableau HTML
        html += `<tr><th>ID</th><th>Nom</th><th>Prénom</th><th>Email</th><th>Adresse</th><th>Action</th></tr>`;  // Entêtes du tableau
        profs.forEach(prof => {
            if (prof.request) {
                html += `<tr>
                    <td>${prof.id} <span>!<span/></td>
                `;  // Affichage d'un signe d'alerte si le professeur a une demande spéciale
                const notif = document.getElementById('notif');
                notif.hidden = false;
                const errorMsg = document.getElementById('failed');
                errorMsg.textContent = "Certains utilisateurs ont demandes une suppression de compte";
                errorMsg.hidden = false;  // Affichage du message d'erreur/notification
            } else {
                html += `<tr>
                    <td>${prof.id}</td>
                    `;
            }
            // Ajout des données du professeur dans le tableau
            html += `<td>${prof.nom}</td>
                        <td>${prof.prenom}</td>
                        <td>${prof.email}</td>
                        <td>${prof.adresse}</td>
                        <td><button class='delete-btn' onclick='confirmDeleteProf(${prof.id})'>Supprimer</button></td>
                        </tr>`;
        });
        html += `</table>`;  // Fermeture du tableau
        container.innerHTML = html;  // Mise à jour du HTML dans le conteneur
    });
}

// Fonction similaire à fetchProfs, mais pour les étudiants
function fetchStudents() {
    if (window.location.href.includes('manage')) {
        const errorMsg = document.getElementById('failed');
        errorMsg.hidden = true;
    }

    const notif = document.getElementById('notif');
    notif.hidden = true;

    fetch('../../controllers/fetchStudents.php')
    .then(response => response.json())
    .then(students => {
        const container = document.getElementById('students');
        let html = `<table>`;
        html += `<tr><th>ID</th><th>Nom</th><th>Prénom</th><th>Email</th><th>Adresse</th><th>Action</th></tr>`;
        students.forEach(student => {
            if (student.request) {
                html += `<tr>
                    <td>${student.id} <span>!<span/></td>
                `;
                const notif = document.getElementById('notif');
                notif.hidden = false;
                const errorMsg = document.getElementById('failed');
                errorMsg.textContent = "Certains utilisateurs ont demandes une suppression de compte";
                errorMsg.hidden = false;
            } else {
                html += `<tr>
                    <td>${student.id}</td>
                `;
            }

            html += `<td>${student.nom}</td>
                        <td>${student.prenom}</td>
                        <td>${student.email}</td>
                        <td>${student.adresse}</td>
                        <td><button class='delete-btn' onclick='confirmDeleteStudent(${student.id})'>Supprimer</button></td>
                        </tr>`;
        });
        html += `</table>`;
        container.innerHTML = html;  
    });
}

// Fonctions pour confirmer et effectuer la suppression des professeurs et étudiants
function confirmDeleteProf(profId) {
    if (confirm('Confirmer la supression du professeur.')) {
        removeProf(profId);  // Appel à la fonction de suppression si confirmé
    }
}

function confirmDeleteStudent(stdId) {
    if (confirm('Confirmer la supression d\'etudiant.')) {
        removeStudent(stdId);  // Appel à la fonction de suppression si confirmé
    }
}

// Fonctions pour envoyer une requête de suppression au serveur et rafraîchir la liste
function removeProf(profId) {
    fetch('../../controllers/removeProf.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `profId=${profId}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            fetchProfs();  // Rafraîchit la liste des professeurs après suppression
        } else {
            alert('Failed to delete professor.');  // Affichage d'une alerte en cas d'échec
        }
    });
}

function removeStudent(stdId) {
    fetch('../../controllers/removeStudent.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `stdId=${stdId}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            fetchStudents();  // Rafraîchit la liste des étudiants après suppression
        } else {
            alert('Failed to delete student.');  // Affichage d'une alerte en cas d'échec
        }
    });
}
