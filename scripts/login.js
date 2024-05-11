// Importe une fonction pour obtenir un objet XMLHttpRequest depuis un fichier externe
import getXhr from "./XHR.js";

// Récupère les éléments du formulaire et les champs d'erreur
const form = document.getElementById("loginForm");
const login = document.getElementById("identifiant");
const mdp = document.getElementById("mdp");
const userType = document.getElementById("userType");
const loginError = document.getElementById("loginError");
const mdpError = document.getElementById("mdpError");
const errorMsg = document.getElementById("failed");

// Écouteur d'événement qui déclenche une action dès que le contenu DOM est chargé
document.addEventListener("DOMContentLoaded", function() {
	userType.dispatchEvent(new Event('change')); // Force un événement 'change' pour initialiser l'état
});

// Gestion du changement de type d'utilisateur pour ajuster le placeholder du champ login
userType.addEventListener("change", () => {
	if (userType.value === "admin")
		login.placeholder = "Username"; // Placeholder pour admin
	else
		login.placeholder = "Email"; // Placeholder pour les autres types d'utilisateurs
});

// Validation du champ login lorsque l'utilisateur quitte le champ
login.addEventListener("blur", () => {
	if (login.value === "") {
		displayError(loginError, "Ce champs est obligatoire");
		console.log("No identifiant Error");
	}
});

// Validation du champ mot de passe lorsque l'utilisateur quitte le champ
mdp.addEventListener("blur", () => {
	if (mdp.value === "") {
		displayError(mdpError, "Ce champs est obligatoire");
		console.log("No mdp Error");
	}
});

// Ajoute des écouteurs pour cacher les messages d'erreur lorsque l'utilisateur commence à taper
login.addEventListener("input", () => {
	if (login.value !== "")
		hideError(loginError, '');
});

mdp.addEventListener("input", () => {
	if (mdp.value !== "")
		hideError(mdpError, '');
});

// Gestion de la soumission du formulaire
form.addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche la soumission standard du formulaire
    console.log("Handling form submission via JavaScript");

    let isValid = form.checkValidity(); // Vérifie la validité du formulaire
    if (isValid)
        sendXHR(); // Si valide, envoie une requête XMLHttpRequest
    else
        displayError(errorMsg, "Veuillez remplir tout les champs."); // Sinon, affiche un message d'erreur
});

// Fonction pour envoyer une requête XMLHttpRequest
function sendXHR() {
	const xhr = getXhr(); // Obtient une instance de XMLHttpRequest
	xhr.open("POST", "../controllers/LoginController.php", true);
	xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const res = xhr.responseText;
            console.log(res);
            handleResponse(res); // Gère la réponse obtenue
        }
    };
    xhr.send(new FormData(form)); // Envoie les données du formulaire
}

// Gère les différentes réponses du serveur
function handleResponse(response) {
	switch (response) {
		case 'okAdmin':
			hideError(errorMsg, "Admin found");
			window.location.href = "./admin/dashboardAdmin.php"; // Redirige vers le dashboard admin
			break;
		case 'okEtudiant':
			hideError(errorMsg, "Etudiant found");
			window.location.href = "./etudiant/dashboardEtudiant.php"; // Redirige vers le dashboard étudiant
			break;
		case 'okProf':
			hideError(errorMsg, "Prof found");
			window.location.href = './prof/dashboardProf.php'; // Redirige vers le dashboard prof
			break;
		case 'error':
			displayError(errorMsg, "identifiant ou mot de passe incorrect"); // Affiche une erreur de connexion
			break;
		default:
			console.log(response);
			break;
	}
}

// Fonction pour afficher les messages d'erreur
function displayError(error, message) {
    error.textContent = message;
    error.hidden = false;
}

// Fonction pour cacher les messages d'erreur
function hideError(error, consoleMsg) {
	console.log(consoleMsg);
	error.textContent = "";
	error.hidden = true;
}
