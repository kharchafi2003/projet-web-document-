// Événement déclenché une fois que le contenu de la page est entièrement chargé
document.addEventListener('DOMContentLoaded', function() {
    fetchMyCourses();  // Charge les cours auxquels l'utilisateur est inscrit
    fetchRequests();  // Charge les demandes d'inscription en attente
    fetchAllCourses();  // Charge tous les cours disponibles
});

// Initialisation des tableaux pour stocker les identifiants des cours
let enrolledCourseIds = [];
let requestedCourseIds = [];

// Fonction pour récupérer les cours auxquels l'utilisateur est inscrit
function fetchMyCourses() {
    fetch('../../controllers/fetchMycours.php')
    .then(response => response.text())
    .then(text => {
        try {
            const cours = JSON.parse(text);
            const container = document.getElementById('cours');
            let html = `<table>`;
            html += `<tr><th>ID</th><th>Cours</th><th>Description</th></tr>`;
            cours.forEach(course => {
                html += `<tr>
                            <td>${course.id}</td>
                            <td>${course.nom}</td>
                            <td>${course.description}</td>
                         </tr>`;
                enrolledCourseIds.push(course.id);
            });
            html += `</table>`;
            container.innerHTML = html;
        } catch (error) {
            console.error('Error parsing JSON:', error, 'Received text:', text);
        }
    })
    .catch(error => {
        console.error('Error fetching the courses:', error);
    });
}

// Fonction pour charger tous les cours disponibles
function fetchAllCourses() {
    fetch('../../controllers/fetchAllExistantCours.php')
        .then(response => response.text())
        .then(text => {
            try {
                const allCourses = JSON.parse(text);
                const container = document.getElementById('coursAll');
                let html = `<table><tr><th>ID</th><th>Cours</th><th>Description</th><th>Action</th></tr>`;
                allCourses.forEach(course => {
                    let buttonLabel = 'S\'inscrire';
                    let buttonClass = 'enroll-btn';
                    if (!enrolledCourseIds.includes(course.id) && !requestedCourseIds.includes(course.id)) {
                        html += `<tr><td>${course.id}</td><td>${course.nom}</td>
                                <td>${course.description}</td>
                                <td><button class="${buttonClass}" 
                                    data-courseid="${course.id}"
                                    data-profid="${course.prof_id}"
                                    >${buttonLabel}</button></td>
                                </tr>`;
                    }
                });
                html += `</table>`;
                container.innerHTML = html;
                attachEnrollEventListeners();  // Attache des écouteurs d'événements aux boutons
            } catch (error) {
                console.error('Error parsing JSON:', error, 'Received text:', text);
            }
        })
        .catch(error => {
            console.error('Error fetching all courses:', error);
    });
}

// Fonction pour attacher des écouteurs d'événements aux boutons d'inscription et d'annulation
function attachEnrollEventListeners() {
    const container = document.getElementById('coursAll');
    container.addEventListener('click', function(event) {
        if (event.target.classList.contains('enroll-btn')) {
            const courseId = event.target.getAttribute('data-courseid');
            const profId = event.target.getAttribute('data-profid');
            enrollInCourse(courseId, profId);
        } else if (event.target.classList.contains('delete-btn')) {
            const courseId = event.target.getAttribute('data-courseid');
            cancelCourseRequest(courseId);
        }
    });
}

// Fonction pour annuler une demande d'inscription
function cancelCourseRequest(courseId) {
    fetch('../../controllers/cancelRequest.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `courseId=${courseId}`
    })
    .then(response => response.text())
    .then(result => {
        alert(result);
        const index = requestedCourseIds.indexOf(courseId);
        if (index > -1) {
            requestedCourseIds.splice(index, 1);
        }
        updateCourseButtons();
    })
    .catch(error => {
        console.error('Error cancelling request', error);
        alert('Erreur lors de l\'annulation de la demande.');
    });
}

// Fonction pour s'inscrire à un cours
function enrollInCourse(courseId, profId) {
    fetch('../../controllers/requestEnroll.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `courseId=${courseId}&profId=${profId}`
    })
    .then(response => response.text())
    .then(result => {
        alert(result);
        requestedCourseIds.push(courseId);
        updateCourseButtons();
    })
    .catch(error => {
        console.error('Error sending request', error);
        alert('Erreur lors de l\'envoi de la demande.');
    });
}

// Fonction pour récupérer les demandes d'inscription en attente
function fetchRequests() {
    fetch('../../controllers/fetchRequests.php')
        .then(response => response.json())
        .then(data => {
            requestedCourseIds = data.map(request => request.cours_id);
            updateCourseButtons();
        })
        .catch(error => {
            console.error('Error fetching requests:', error);
        });
}

// Fonction pour mettre à jour les boutons en fonction de l'état d'inscription
function updateCourseButtons() {
    const buttons = document.querySelectorAll('button[data-courseid]');
    buttons.forEach(button => {
        const courseId = button.getAttribute('data-courseid');
        if (requestedCourseIds.includes(courseId)) {
            button.textContent = 'Annuler';
            button.classList.remove('enroll-btn');
            button.classList.add('delete-btn');
        } else {
            button.textContent = 'S\'inscrire';
            button.classList.remove('delete-btn');
            button.classList.add('enroll-btn');
        }
    });
}
