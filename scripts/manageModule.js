// Événement appelé après que le contenu du DOM a été complètement chargé.
document.addEventListener('DOMContentLoaded', function() {
    fetchCourses(); // Appelle la fonction pour charger la liste des cours disponibles.
});

// Ajoute un écouteur d'événement sur la liste déroulante des cours pour charger les parties correspondantes lors d'un changement de sélection.
document.getElementById('cours').addEventListener('change', function() {
    fetchParts(this.value); // Appelle la fonction pour charger les parties du cours sélectionné.
});

// Fonction pour récupérer les cours disponibles et les afficher dans une liste déroulante.
function fetchCourses() {
    const select = document.getElementById('cours'); // Récupère l'élément de sélection des cours.
    select.innerHTML += `<option value="" disabled selected>Cours</option>`; // Ajoute une option par défaut à la liste.
    fetch('../../controllers/fetchAllCourses.php') // Envoie une requête pour récupérer les cours.
        .then(response => response.json()) // Convertit la réponse en JSON.
        .then(data => {
            // Génère les options de sélection pour chaque cours reçu.
            select.innerHTML += data.map(course => `<option value="${course.id}">${course.nom}</option>`).join('');
        });
}

// Fonction pour charger et afficher les parties d'un cours spécifique.
function fetchParts(courseId) {
    fetch(`../../controllers/fetchParts.php?courseId=${courseId}`) // Envoie une requête pour récupérer les parties du cours.
    .then(response => response.json())
    .then(parts => {
        const container = document.getElementById('parts'); // Récupère le conteneur pour les parties du cours.
        let html = ""; // Initialise le HTML à générer.
        parts.forEach(part => {
            // Construit le HTML pour chaque partie du cours.
            html += `<div class="part-item">
                        <span class="remove-part" data-part-id="${part.id_part}" title="Remove part">×</span>
                        <a href="/proj${part.path_part}" target="_blank">
                            <button class="buttonAdd"><h4>${part.title_part}</h4></button>
                        </a>
                        <label><input type="checkbox" class="view-flag" data-part-id="${part.id_part}" ${part.view_flag ? 'checked' : ''}> Valable</label>
                    </div>`;
        });
        container.innerHTML = html; // Met à jour le HTML du conteneur avec les parties du cours.

        // Ajoute des écouteurs pour les actions sur les parties du cours.
        addPartRemovalListeners(courseId); // Ajoute des écouteurs pour supprimer les parties.
        addViewFlagListeners(); // Ajoute des écouteurs pour les drapeaux de visualisation.
    });
}

// Fonction pour ajouter des écouteurs d'événements pour la suppression de parties.
function addPartRemovalListeners(courseId) {
    document.querySelectorAll('.remove-part').forEach(item => {
        item.addEventListener('click', function() {
            const partId = this.getAttribute('data-part-id');
            console.log("Trying to remove part ID:", partId);
            removePart(partId, courseId);
        });
    });
}

// Fonction pour ajouter des écouteurs d'événements pour les drapeaux de visualisation.
function addViewFlagListeners() {
    document.querySelectorAll('.view-flag').forEach(item => {
        item.addEventListener('change', function() {
            toggleViewFlag(this.getAttribute('data-part-id'), this.checked);
        });
    });
}

// Fonction pour basculer le drapeau de visualisation d'une partie du cours.
function toggleViewFlag(partId, isViewable) {
    fetch('../../controllers/toggleViewFlag.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ partId: partId, viewFlag: isViewable }) // Envoie les données de la partie et son nouvel état.
    })
    .then(response => response.text())
    .then(result => {
        console.log('View flag updated:', result); // Log le résultat de l'opération.
    })
    .catch(error => console.error('Error:', error));
}

// Écouteur d'événements pour la soumission du formulaire d'ajout de partie.
document.getElementById('addPartForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la soumission standard du formulaire.
    const courseId = document.getElementById('cours').value; // Récupère l'ID du cours sélectionné.
    const formData = new FormData(this); // Crée un objet FormData avec les données du formulaire.
    formData.append('courseId', courseId); // Ajoute l'ID du cours au FormData.

    fetch('../../controllers/addPartController.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        console.log(result); // Affiche la réponse du serveur.
        fetchParts(courseId); // Rafraîchit la liste des parties après l'ajout.
    })
    .catch(error => console.error('Error:', error));
});

// Fonction pour supprimer une partie du cours.
function removePart(partId, courseId) {
    if (!confirm('Are you sure you want to remove this part?')) {
        return; // Annule l'opération si l'utilisateur ne confirme pas.
    }

    fetch('../../controllers/removePartController.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ partId: partId }) // Envoie l'ID de la partie à supprimer.
    })
    .then(response => response.text())
    .then(result => {
        console.log(result);
        fetchParts(courseId); // Rafraîchit la liste des parties après la suppression.
    })
    .catch(error => console.error('Error:', error));
}

// Ajout de gestionnaires d'événements pour les boutons de suppression de partie dans la fonction fetchParts.
document.querySelectorAll('.remove-part').forEach(item => {
    item.addEventListener('click', function() {
        const partId = this.getAttribute('data-part-id');
        console.log("trying to remove part");
        removePart(partId, courseId);
    });
});

