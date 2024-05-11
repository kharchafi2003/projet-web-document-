// Importe la fonction getXhr depuis le fichier XHR.js pour gérer les requêtes XMLHttpRequest
import getXhr from "./XHR.js";

// Récupère le formulaire de changement de mot de passe par son ID
const form = document.getElementById("changePassForm");

// Récupère les éléments du formulaire concernant l'ancien mot de passe, le nouveau et la confirmation
const oldPassword = document.getElementById("oldpass");
const newPassword = document.getElementById("newpass");
const confirmPassword = document.getElementById("newpassConf");

// Récupère les éléments pour afficher les messages d'erreur spécifiques à chaque champ
const oldPasswordError = document.getElementById("oldpassError");
const newPasswordError = document.getElementById("newpassError");
const confirmPasswordError = document.getElementById("newpassConfError");

// Récupère les éléments pour afficher les messages d'erreur ou de succès général
const errorMsg = document.getElementById("failed");
const successMsg = document.getElementById("success");

// Ajoute un écouteur d'événement sur le formulaire pour gérer la soumission
form.addEventListener("submit", function(event) {
    event.preventDefault();  // Empêche la soumission standard du formulaire

    // Cache les messages d'erreur précédents
    hideError(oldPasswordError, "");
    hideError(newPasswordError, "");
    hideError(confirmPasswordError, "");
    hideError(errorMsg, "");

    // Vérifie la validité globale du formulaire
    let isValid = form.checkValidity();
    if (!isValid) {
        // Affiche des messages d'erreur si certains champs ne sont pas valides
        if (oldPassword.validity.valueMissing)
            displayError(oldPasswordError, "Ce champ est obligatoire");

        if (newPassword.validity.valueMissing) {
            displayError(newPasswordError, "Ce champ est obligatoire");
        }
        if (confirmPassword.validity.valueMissing) {
            displayError(confirmPasswordError, "Ce champ est obligatoire");
        }
        return;  // Sort de la fonction si invalidité
    }

    // Envoie la requête XMLHttpRequest pour traiter le changement de mot de passe
    sendXHR();
});

// Définit la fonction pour envoyer une requête XMLHttpRequest
function sendXHR() {
    const xhr = getXhr();  // Crée une nouvelle instance de XMLHttpRequest
    xhr.open("POST", "../../controllers/changePassController.php", true);  // Configure la requête comme POST

    // Définit ce qui se passe quand la requête change d'état
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const res = xhr.responseText;
            console.log(res);  // Affiche la réponse du serveur dans la console
            handleResponse(res);  // Traite la réponse reçue
        }
    };

    // Envoie la requête avec les données du formulaire
    xhr.send(new FormData(form));
}

// Gère la réponse du serveur après la tentative de changement de mot de passe
function handleResponse(response) {
    const cleanResponse = response;
    successMsg.hidden = true;  // Cache initialement le message de succès

    // Traite différents cas de réponse et affiche des messages appropriés
    if (cleanResponse === "wrongPass") {
        displayError(errorMsg, "Vous avez entrez un mot de passe invalide");
        console.log("wrong password");
    } else if (cleanResponse === "notSimilar") {
        displayError(errorMsg, "Les mots de passes ne sont pas conformes");
        console.log("diff new passwords");
    } else if (cleanResponse === "samePass") {
        displayError(errorMsg, "Veuillez choisir un mot de pass different de l'ancien");
        console.log("Same old password");
    } else if (cleanResponse === "success") {
        displayError(successMsg, "Mot de pass changee");
        console.log("Password changed successfully");
    } else {
        displayError(errorMsg, "Une erreur s'est produite");
        console.error("Failed to change password");
    }
}

// Affiche un message d'erreur
function displayError(error, message) {
    error.textContent = message;
    error.hidden = false;
}

// Cache un message d'erreur
function hideError(error, consoleMsg) {
    console.log(consoleMsg);
    error.textContent = "";
    error.hidden = true;
}
