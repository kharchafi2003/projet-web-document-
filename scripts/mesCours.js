// Événement déclenché après le chargement complet du DOM.
document.addEventListener('DOMContentLoaded', function() {
    fetchCourses(); // Appel de la fonction pour charger les cours dès que le DOM est prêt.
});

// Ajout d'un écouteur d'événement sur la liste déroulante des cours.
// Ce gestionnaire est appelé à chaque fois que l'utilisateur change la sélection de cours.
document.getElementById('cours').addEventListener('change', function() {
    fetchParts(this.value); // Appelle la fonction pour charger les parties associées au cours sélectionné.
});

// Fonction pour charger la liste des cours disponibles et les afficher dans un élément select.
function fetchCourses() {
    const select = document.getElementById('cours'); // Récupère l'élément select pour les cours.
    select.innerHTML += `<option value="" disabled selected>Cours</option>`; // Ajoute une option par défaut non sélectionnable.
    fetch('../../controllers/fetchMyCours.php') // Effectue une requête pour récupérer les cours.
        .then(response => response.json()) // Convertit la réponse en JSON.
        .then(data => {
            // Construit les options du select pour chaque cours récupéré.
            select.innerHTML += data.map(course => 
                `<option name="${course.prof_id}" value="${course.id}">${course.nom}</option>`
            ).join(''); // Utilise map pour transformer les données en éléments HTML et join pour concaténer le tout en une seule chaîne.
        });
}

// Fonction pour charger et afficher les parties d'un cours spécifique.
function fetchParts(courseId) {
    fetch(`../../controllers/fetchParts.php?courseId=${courseId}`) // Effectue une requête pour récupérer les parties du cours sélectionné.
    .then(response => response.json()) // Convertit la réponse en JSON.
    .then(parts => {
        const container = document.getElementById('parts'); // Récupère le conteneur pour afficher les parties du cours.
        let html = ""; // Initialise la chaîne HTML qui sera construite.
        parts.forEach(part => {
            let filename = part.path_part.split('/').pop(); // Extrait le nom de fichier du chemin complet.
            html += `<div class="part-item">
                        <h4>${part.title_part}</h4> <!-- Affiche le titre de la partie -->
                        <a href="/${part.path_part}" target="_blank"> <!-- Crée un lien pour télécharger ou afficher la partie -->
                            <button class="buttonAdd">${filename}</button> <!-- Affiche le nom du fichier dans un bouton pour le téléchargement -->
                        </a>
                    </div>`;
        });
        container.innerHTML = html; // Met à jour le contenu HTML du conteneur avec les parties du cours.
    });
}
