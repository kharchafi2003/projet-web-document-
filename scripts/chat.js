// Charge les cours dès que le contenu DOM est complètement chargé
document.addEventListener("DOMContentLoaded", function () {
  fetchCourses();
});

// Variable globale pour garder l'ID du professeur sélectionné
var PROF_ID = undefined;

// Écouteur d'événement sur le changement de sélection dans le menu déroulant des cours
document.getElementById("cours").addEventListener("change", function () {
  const selectedOption = this.options[this.selectedIndex];
  const profId = selectedOption.getAttribute("data-prof-id");
  PROF_ID = profId;  // Stocke l'ID du professeur sélectionné
  fetchProfName(profId);  // Récupère le nom du professeur
  loadChat(profId);  // Charge la discussion correspondante
  try {
    clearInterval(chatPull);  // Efface l'intervalle de rafraîchissement du chat si existant
  } catch {}
});

// Écouteur pour le bouton d'envoi de message
document.querySelector(".buttonAdd").addEventListener("click", function () {
  const payload = { recipientId: undefined, message: undefined };
  const input = document.querySelector(`input[name="message"]`);
  if (!input.value || input.value.trim() == "") {
    alert("insert a message first");  // Alerte si le champ message est vide
  } else {
    payload.message = input.value;  // Stocke le message dans l'objet payload
  }
  payload.recipientId = PROF_ID;  // Associe l'ID du destinataire au payload
  console.log(payload);
  sendMessage(payload);  // Envoie le message
});

// Fonction pour récupérer la liste des cours depuis le serveur
function fetchCourses() {
  const select = document.getElementById("cours");
  select.innerHTML += `<option value="" disabled selected>Cours</option>`;  // Option par défaut
  fetch("../../controllers/fetchMyCours.php")  // Appel AJAX pour obtenir les cours
    .then((response) => response.json())
    .then((data) => {
      select.innerHTML += data  // Remplit le menu déroulant avec les cours obtenus
        .map(
          (course) =>
            `<option data-prof-id="${course.prof_id}" name="${course.prof_id}" value="${course.id}">${course.nom}</option>`
        )
        .join("");
    });
}

// Fonction pour récupérer le nom du professeur
function fetchProfName(profID) {
  const profName = document.getElementById("profName");
  const chatWith = document.getElementById("chatWith");
  fetch(`../../controllers/fetchProfName.php?profID=${profID}`)  // Requête pour obtenir le nom du prof
    .then((response) => response.json())
    .then((data) => {
      profName.innerHTML = `${data.nom} ${data.prenom}`;  // Affiche le nom du prof
      chatWith.innerHTML = `Chat avec: <span>${data.nom} ${data.prenom}</span>`;  // Indique avec qui le chat est établi
    });
}

// Fonction pour charger les messages du chat
function loadChat(secondParty) {
  fetch(
    `../../controllers/ChatController.php?method=get_chat_logs&secondParty=${secondParty}`
  )
    .then((response) => response.json())
    .then((res) => {
      const populateChat = ChatBuilder(secondParty);
      populateChat(res);  // Construit l'affichage du chat
    });
}

// Fonction de construction des messages du chat
function ChatBuilder(recipient_id) {
  return function PopulateChat(messagelogs) {
    const chatbox = document.querySelector(".chat-box");
    chatbox.innerHTML = ``;  // Nettoie le contenu du chat
    if (messagelogs.length === 0) {
      chatbox.innerHTML = `No Message Found`;  // Aucun message trouvé
      return;
    }

    messagelogs.toReversed().forEach((message) => {
      const messageBlock = document.createElement("div");
      messageBlock.classList.add("msg-block");

      const textBlob = document.createElement("div");
      textBlob.classList.add(
        recipient_id == message.sender_id ? "received-msg" : "sent-msg"
      );  // Style différent pour les messages envoyés et reçus
      textBlob.setAttribute("data-time-stamp", message.time_stamp);
      textBlob.innerText = message.msg;
      var timestamp = document.createElement("div");
      timestamp.classList.add("time_stamp");
      timestamp.innerText = message.time_stamp;  // Ajoute un timestamp au message
      textBlob.appendChild(timestamp);
      messageBlock.appendChild(textBlob);
      chatbox.appendChild(messageBlock);
    });
  };
}

// Fonction pour envoyer un message au serveur
function sendMessage(payload) {
  if (!payload.message && !payload.recipientId) {
    alert("select a course and input text first");  // Vérifie que les données nécessaires sont présentes
    return;
  }
  fetch(
    `../../controllers/ChatController.php?method=send_message&secondParty=${payload.recipientId}`,
    { method: "POST", body: JSON.stringify({ message: payload.message }) }  // Envoie le message via POST
  )
    .then((r) => {
      r.status;
    })
    .then((r) => {})
    .catch(console.log)
    .finally(() => {
      loadChat(payload.recipientId);  // Recharge le chat après l'envoi
    });
}

// Réglage d'un intervalle pour rafraîchir le chat toutes les secondes
document.addEventListener("DOMContentLoaded", function () {
  var chatPull = setInterval(() => {
    if (PROF_ID != undefined) {
      loadChat(PROF_ID);  // Rafraîchit le chat si un prof est sélectionné
    }
  }, 1000);
});
