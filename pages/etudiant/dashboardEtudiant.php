<?php


session_start();

if (!isset($_SESSION['logged']) || $_SESSION['role'] !== 'etudiant') {
    // Redirect them to login page or show an error
    header('Location: ../login.php');
    exit;
}



?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="icon" href="../assets/favicon.ico" type="image/x-icon">
    <title>Student Dashboard</title>
    <link rel="stylesheet" href="dashboardEtudiant.css">
</head>
<body>
    <div class="dash-title">
        <h1>Student's Dashboard</h1>
        <button class="disconnectBtn" onclick="location.href='../logout.php'">Se deconnecter</button>
    </div>
    <!-- Side Navigation Menu -->
    <div class="side-nav">
        <img src="../pfp.png">
        <h2><?php echo $_SESSION['nom_complet']; ?></h2>
        <h3><?php echo $_SESSION['email']; ?></h3>
        <h4><?php echo $_SESSION['role']; ?></h4>
        <a href="dashboardEtudiant.php" id="dashboard-link">Dashboard</a>
        <a href="mesCours.php" id="mesCours-link">Mes Cours</a>
        <a href="chat.php" id="chat-link">Chat</a>
        <a href="profile.php" id="profile-link">Profile</a>
        <a href="../logout.php">Logout</a>
    </div>
    <div class="tables-cont">
        <div class="contn">
        <h2>List de mes cours</h2>
        <div id="cours" class="table-wrapper"></div>
        </div>
    </div>
        

    <div class="tables-two-cont">
        <div class="contn">
        <h2>List des autres cours</h2>
        <div id="coursAll" class="table-wrapper"></div>
        </div>
    </div>

    <script src="../../scripts/dashboardEtudiant.js"></script>
</body>
<footer class="footer">
    Copyright © 2024 ENSA Tetouan.
</footer>
</html>
<script type="text/javascript">
    // Get the current page URL
    const currentPageUrl = window.location.href;

    // Get the sidebar links
    const sidebarLinks = document.querySelectorAll('.side-nav a');

    // Loop through the sidebar links
    sidebarLinks.forEach(link => {
        // Check if the link href matches the current page URL
        if (link.href === currentPageUrl) {
            // Add a class to highlight the selected link
            link.classList.add('selected');
        }
    });
</script>