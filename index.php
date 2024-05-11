<!DOCTYPE html>
<!-- Déclaration du type de document, HTML5 -->
<html lang="en">
<!-- Début du document HTML, avec l'attribut lang défini sur 'en' pour anglais -->

<head>
    <!-- Section head contenant les métadonnées et liens vers les ressources externes -->
    <meta charset="UTF-8">
    <!-- Définition du jeu de caractères pour supporter l'UTF-8 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Meta pour rendre la page web adaptative aux différents appareils et tailles d'écran -->
    <title>Plateforme Scolarité</title>
    <!-- Titre de la page, qui apparaîtra dans l'onglet du navigateur -->
    <link rel="stylesheet" href="./styles.css">
    <!-- Lien vers le fichier CSS externe pour styliser la page -->
</head>

<body>
    <!-- Corps du document HTML où tout le contenu visible est placé -->
    <div class="container">
        <!-- Div conteneur principal avec une classe pour stylisation et structure -->
        <h1>Bienvenu au Plateforme Scolarité</h1>
        <!-- Titre principal de la page, accueillant les utilisateurs -->
        <p>Veuillez vous inscrire ou vous connecter.</p>
        <!-- Paragraphe d'instruction pour les utilisateurs sur ce qu'ils doivent faire -->
        <div class="buttons">
            <!-- Div conteneur pour les boutons, avec une classe pour la stylisation spécifique -->
            <a href="pages/login.php" class="button">Se connecter</a>
            <!-- Lien/bouton pour la connexion, dirigé vers la page de connexion PHP -->
            <a href="pages/register.php" class="button">S'inscrire</a>
            <!-- Lien/bouton pour l'inscription, dirigé vers la page d'inscription PHP -->
        </div>
    </div>
</body>
</html>
