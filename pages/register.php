<?php
// Démarre la session pour accéder aux variables de session.
session_start();

// Vérifie si l'utilisateur est déjà connecté.
if (isset($_SESSION['logged']) && $_SESSION['logged'] === true) {
    // Vérifie le rôle de l'utilisateur et redirige en fonction de ce rôle.
    switch ($_SESSION['role']) {
        case 'admin':
            // Redirige vers le tableau de bord de l'administrateur.
            header('Location: ./admin/dashboardAdmin.php');
            break;
        case 'prof':
            // Redirige vers le tableau de bord du professeur.
            header('Location: ./prof/dashboardProf.php');
            break;
        case 'etudiant':
            // Redirige vers le tableau de bord de l'étudiant.
            header('Location: ./etudiant/dashboardEtudiant.php');
            break;
        default:
            // Détruit la session si aucun rôle n'est défini et redirige vers la page de connexion.
            session_destroy();
            header('Location: login.php');
            break;
    }
    exit; // Termine l'exécution du script pour éviter le chargement de la suite du code.
}
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <link rel="icon" href="./assets/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="./style.css" />
    <title>Plateforme Scolarité</title>
</head>
<body>
    <div class="wrapper">
        <!-- Section contenant le formulaire d'inscription -->
        <section class="login-container">
            <form id="registerForm" class="login-form" novalidate>
                <fieldset class="login-fieldset">
                    <legend class="form-title">Register</legend>

                    <!-- Message d'erreur qui sera affiché si nécessaire -->
                    <div id="failed" class="error-alert" hidden></div>

                    <!-- Champ caché pour le rôle de l'utilisateur (inutilisé dans ce contexte) -->
                    <input type="hidden" id="userRole" value="">

                    <!-- Sélection du type de compte -->
                    <div class="form-group">
                        <label for="userType">Type de compte:</label>
                        <select id="userType" name="userType" class="form-input">
                            <option value="prof">Prof</option>
                            <option value="etudiant">Etudiant</option>
                        </select>
                    </div>

                    <!-- Champ pour l'adresse e-mail -->
                    <div class="form-group">
                        <label for="identifiant">Email:</label>
                        <input id="identifiant" type="email" name="identifiant" class="form-input" placeholder="Email" required>
                        <small id="loginError" class="error-message" hidden></small>
                    </div>

                    <!-- Champ pour le mot de passe -->
                    <div class="form-group">
                        <label for="mdp">Mot de Passe:</label>
                        <input id="mdp" type="password" name="mdp" class="form-input" required>
                        <small id="mdpError" class="error-message" hidden></small>
                    </div>

                    <!-- Champ pour le nom -->
                    <div class="form-group">
                        <label for="name">Nom:</label>
                        <input id="name" type="text" name="name" class="form-input" required>
                        <small id="NameFieldError" class="error-message" hidden></small>
                    </div>

                    <!-- Champ pour le prénom -->
                    <div class="form-group">
                        <label for="surname">Prenom:</label>
                        <input id="surname" type="text" name="surname" class="form-input" required>
                        <small id="surnameError" class="error-message" hidden></small>
                    </div>

                    <!-- Champ pour l'adresse -->
                    <div class="form-group">
                        <label for="address">Adresse:</label>
                        <input id="address" type="text" name="address" class="form-input" required>
                        <small id="addressError" class="error-message" hidden></small>
                    </div>

                    <!-- Bouton pour soumettre le formulaire -->
                    <div class="form-group">
                        <button type="submit" class="submit-btn">Creer un compte</button>
                    </div>
                    <!-- Lien pour les utilisateurs ayant déjà un compte -->
                    <div class="form-group">
                        <label>Vous avez deja un compte?</label>
                        <a href="./login.php">Se connecter</a> 
                    </div>
                </fieldset>
            </form>
        </section>
    </div>
    <!-- Script pour gérer les interactions du formulaire -->
    <script src="../scripts/register.js" type="module"></script>
</body>
</html>
