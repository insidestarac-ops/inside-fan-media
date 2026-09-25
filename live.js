/* =========================================================
   1. CONNEXION FIREBASE
========================================================= */
const firebaseConfig = {
  apiKey: "AIzaSyAgmhwesxB9uDwXc-JrsyAXFsggkirpczY",
  authDomain: "inside-fan-media.firebaseapp.com",
  databaseURL: "https://inside-fan-media-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "inside-fan-media",
  storageBucket: "inside-fan-media.firebasestorage.app",
  messagingSenderId: "15803351716",
  appId: "1:15803351716:web:dcbdc58b7969d5a3889c31"
};

if (!firebase.apps.length) { 
  firebase.initializeApp(firebaseConfig); 
}
const db = firebase.database();


/* =========================================================
   2. LE MODE "RÉGIE" (Envoi de l'information)
========================================================= */
function publierMessage() {
  const titre = document.getElementById("titleInput").value;
  const message = document.getElementById("messageInput").value;
  const media = document.getElementById("mediaInput").value;
  const lien = document.getElementById("linkInput").value;
  
  if (message.trim() === "" && titre.trim() === "") { 
    alert("Impossible d'envoyer un message vide ! Remplissez au moins le titre ou le message."); 
    return; 
  }

  const date = new Date();
  const heures = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  db.ref("direct/").push({
    heure: `${heures}:${minutes}`,
    titre: titre,
    texte: message,
    media: media,
    lien: lien,
    timestamp: firebase.database.ServerValue.TIMESTAMP
  });

  // Vider les champs après l'envoi
  document.getElementById("titleInput").value = "";
  document.getElementById("messageInput").value = "";
  document.getElementById("mediaInput").value = "";
  document.getElementById("linkInput").value = "";
  alert("✅ Flash info envoyé avec succès !");
}


/* =========================================================
   3. OUTIL : DETECTER LES LIENS YOUTUBE
========================================================= */
function extractYouTubeID(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}


/* =========================================================
   4. LE MODE "PUBLIC" (Affichage sur actu.html)
========================================================= */
const liveFeed = document.getElementById("live-feed");
const emptyState = document.getElementById("empty-state");
const dateElement = document.getElementById("date-du-jour");

// 4.1. Affichage automatique de la date
if (dateElement) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateElement.innerText = new Date().toLocaleDateString('fr-FR', options);
}

// 4.2. Écoute et affichage des messages
if (liveFeed) {
  db.ref("direct/").orderByChild("timestamp").on("child_added", function(snapshot) {
    const data = snapshot.val();
    
    if (emptyState) emptyState.style.display = "none";

    const article = document.createElement("div");
    article.className = "actu-card"; 
    
    // Structure de base
    let htmlContent = `
      <div class="timeline-dot"></div>
      <div class="actu-time">${data.heure}</div>
      <div class="actu-content">
    `;

    // Si on a mis un Titre (Nouveau)
    if (data.titre && data.titre.trim() !== "") {
      htmlContent += `<h3 class="actu-post-title">${data.titre}</h3>`;
    }
    

    // Le message
    if (data.texte && data.texte.trim() !== "") {
    const texteFormate = data.texte.replace(/\n/g, '<br>');
    htmlContent += `<p>${texteFormate}</p>`;
    }

    // Gestion du Média
    if (data.media && data.media.trim() !== "") {
      const ytID = extractYouTubeID(data.media);
      if (ytID) {
        htmlContent += `
          <div class="actu-video-container">
            <iframe src="https://www.youtube.com/embed/${ytID}" frameborder="0" allowfullscreen></iframe>
          </div>`;
      } else if (data.media.toLowerCase().endsWith(".mp4")) {
        htmlContent += `<video controls class="actu-media-video" src="${data.media}"></video>`;
      } else {
        htmlContent += `<img src="${data.media}" alt="Illustration" class="actu-image">`;
      }
    }

    // Gestion du Bouton Lien
    if (data.lien && data.lien.trim() !== "") {
      htmlContent += `<a href="${data.lien}" target="_blank" class="actu-btn-link">🔗 Découvrir</a>`;
    }

    htmlContent += `</div>`;
    article.innerHTML = htmlContent;
    
    liveFeed.prepend(article);
  });
}