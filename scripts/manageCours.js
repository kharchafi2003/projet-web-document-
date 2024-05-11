// Importe une fonction pour obtenir un objet XMLHttpRequest depuis un fichier externe
import getXhr from "./XHR.js";

// Récupère les éléments du formulaire et les champs d'erreur
const form = document.getElementById("coursForm");
const login = document.getElementById("title");
const mdp = document.getElementById("desc");
const loginError = document.getElementById("titleError");
const mdpError = document.getElementById("descError");
const errorField = document.getElementById("failed");
const successField = document.getElementById("success");

// Écouteur d'événement pour gérer la perte de focus sur le champ du titre
login.addEventListener("blur", () => {
  if (login.value === "") {
    loginError.textContent = "Ce champs est obligatoire"; // Affichage du message d'erreur
    loginError.hidden = false; // Rend le message d'erreur visible
    console.log("No title Error");
  }
});

// Écouteur d'événement pour gérer la perte de focus sur le champ de la description
mdp.addEventListener("blur", () => {
  if (mdp.value === "") {
    mdpError.textContent = "Ce champs est obligatoire"; // Affichage du message d'erreur
    mdpError.hidden = false; // Rend le message d'erreur visible
    console.log("No desc Error");
  }
});

// Écouteurs pour cacher les messages d'erreur lorsque l'utilisateur commence à taper dans les champs
login.addEventListener("input", () => {
  if (login.value !== "") {
    loginError.textContent = ""; // Efface le message d'erreur
    loginError.hidden = true; // Cache le message d'erreur
  }
});

mdp.addEventListener("input", () => {
  if (mdp.value !== "") {
    mdpError.textContent = ""; // Efface le message d'erreur
    mdpError.hidden = true; // Cache le message d'erreur
  }
});

// Écouteur d'événement pour la soumission du formulaire
form.addEventListener("submit", function(event) {
    event.preventDefault();  // Empêche la soumission standard du formulaire
    successField.hidden = true; // Cache les messages de succès initialement
    errorField.hidden = true; // Cache les messages d'erreur initialement

    let isValid = form.checkValidity();  // Vérifie la validité de tous les champs du formulaire
    if (!isValid) {
      console.log("Champs non remplis");
      errorField.textContent = "Veuillez remplir tout les champs"; // Affiche un message d'erreur général
      errorField.hidden = false;
    } else {
        sendXHR(); // Si le formulaire est valide, lance la requête XMLHttpRequest
    }
});

// Fonction pour envoyer une requête XMLHttpRequest
function sendXHR() {
  const xhr = getXhr();      
  xhr.open("POST", "../../controllers/addCours.php", true);

  xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const res = xhr.responseText;
            console.log(res);
            handleResponse(res); // Traite la réponse du serveur
        }
    };
    xhr.send(new FormData(form)); // Envoie les données du formulaire
}

// Fonction pour gérer la réponse du serveur
function handleResponse(response) {
    const cleanResponse = response.trim().toLowerCase(); // Nettoie et normalise la réponse

    if (cleanResponse === "ok") {
      successField.textContent = "Cours ajoute avec succees"; // Affiche un message de succès
      successField.hidden = false;
      errorField.hidden = true;
      fetchCourses(); // Rafraîchit la liste des cours
    } else if (cleanResponse === "already exist") {
      errorField.textContent = "Un cours avec le meme titre existe deja"; // Affiche un message d'erreur spécifique
      errorField.hidden = false;
    } else {
      errorField.textContent = "Erreur"; // Affiche un message d'erreur général
      errorField.hidden = false;
      successField.hidden = true;
    }
}
