<?php
session_start();  // Démarre la session pour accéder aux variables de session

// Vérifie si l'utilisateur est déjà connecté
if (isset($_SESSION['logged']) && $_SESSION['logged'] === true) {
    // Vérifie le rôle de l'utilisateur et redirige en conséquence
    switch ($_SESSION['role']) {
        case 'admin':
            header('Location: ./admin/dashboardAdmin.php');  // Redirige vers le tableau de bord de l'administrateur
            break;
        case 'prof':
            header('Location: ./prof/dashboardProf.php');  // Redirige vers le tableau de bord du professeur
            break;
        case 'etudiant':
            header('Location: ./etudiant/dashboardEtudiant.php');  // Redirige vers le tableau de bord de l'étudiant
            break;
        default:
            session_destroy();  // Détruit toutes les variables de session
            header('Location: login.php');  // Redirige vers la page de connexion si le rôle n'est pas défini
            break;
    }
    exit;
}
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="./style.css" />
    <link rel="icon" href="./assets/favicon.ico" type="image/x-icon">
    <title>Plateforme Scolarité</title>
</head>
<body>
    <div class="wrapper">
        <section class="login-container">
            <form id="loginForm" class="login-form" novalidate>
                <fieldset class="login-fieldset">
                    <legend class="form-title">Login</legend>

                    <!-- Zone d'affichage des messages d'erreur -->
                    <div id="failed" class="error-alert" hidden></div>

                    <!-- Sélection du type d'utilisateur -->
                    <div class="form-group">
                        <label for="userType">Type de compte:</label>
                        <select id="userType" name="userType" class="form-input">
                            <option value="admin">Admin</option>
                            <option value="prof">Prof</option>
                            <option value="etudiant">Etudiant</option>
                        </select>
                    </div>

                    <!-- Champ de saisie de l'identifiant -->
                    <div class="form-group">
                        <label for="identifiant">Identifiant:</label>
                        <input id="identifiant" type="text" name="identifiant" class="form-input" value="" required>
                        <small id="loginError" class="error-message" hidden></small>
                    </div>

                    <!-- Champ de saisie du mot de passe -->
                    <div class="form-group">
                        <label for="mdp">Mot de Passe:</label>
                        <input id="mdp" type="password" name="mdp" class="form-input" required>
                        <small id="mdpError" class="error-message" hidden></small>
                    </div>

                    <!-- Bouton de soumission -->
                    <div class="form-group">
                        <button type="submit" class="submit-btn">Se Connecter</button>
                    </div>
                    <!-- Lien d'inscription -->
                    <div class="form-group">
                        <label>Pas de compte?</label>
                        <a href="./register.php">Creer un compte</a> 
                    </div>
                </fieldset>
            </form>
        </section>
    </div>
    <!-- Fichier JavaScript pour la validation du formulaire -->
    <script src="../scripts/login.js" type="module"></script>
</body>
</html>
