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

if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
const db = firebase.database();


/* =========================================================
   NOUVEAU : AUTO-CHARGEUR DE MOTEURS SOCIAUX
========================================================= */
// Force le navigateur à charger les moteurs de Twitter et TikTok
function injecterMoteursSociaux() {
  if (!document.getElementById("twitter-wjs")) {
    const scriptTw = document.createElement("script");
    scriptTw.id = "twitter-wjs";
    scriptTw.src = "https://platform.twitter.com/widgets.js";
    scriptTw.async = true;
    document.body.appendChild(scriptTw);
  }
}
injecterMoteursSociaux();


/* =========================================================
   2. LE MODE "RÉGIE" (Envoi de l'information)
========================================================= */
function publierMessage() {
  const titre = document.getElementById("titleInput").value;
  const message = document.getElementById("messageInput").value;
  const media = document.getElementById("mediaInput").value;
  const lien = document.getElementById("linkInput").value;
  
  if (message.trim() === "" && titre.trim() === "") { 
    alert("Impossible d'envoyer un message vide !"); return; 
  }

  const dateObj = new Date();
  const heures = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const jour = String(dateObj.getDate()).padStart(2, '0');
  const mois = String(dateObj.getMonth() + 1).padStart(2, '0');

  db.ref("direct/").push({
    heure: `${heures}:${minutes}`,
    date: `${jour}/${mois}`,
    titre: titre,
    texte: message,
    media: media,
    lien: lien,
    timestamp: firebase.database.ServerValue.TIMESTAMP
  });

  document.getElementById("titleInput").value = "";
  document.getElementById("messageInput").value = "";
  document.getElementById("mediaInput").value = "";
  document.getElementById("linkInput").value = "";
  alert("✅ Flash info envoyé avec succès !");
}


/* =========================================================
   3. OUTILS : DÉTECTEURS
========================================================= */
function extractYouTubeID(url) {
  const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
  return (match && match[2].length === 11) ? match[2] : null;
}
function extractTikTokID(url) {
  const match = url.match(/video\/(\d+)/);
  return match ? match[1] : null;
}
function extractInstaID(url) {
  const match = url.match(/(p|reel)\/([a-zA-Z0-9_-]+)/);
  return match ? match[2] : null;
}


/* =========================================================
   4. LE MODE "PUBLIC" (Affichage sur actu.html)
========================================================= */
const liveFeed = document.getElementById("live-feed");
const emptyState = document.getElementById("empty-state");
const dateElement = document.getElementById("date-du-jour");

if (dateElement) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateElement.innerText = new Date().toLocaleDateString('fr-FR', options);
}

if (liveFeed) {
  db.ref("direct/").orderByChild("timestamp").on("child_added", function(snapshot) {
    const data = snapshot.val();
    if (emptyState) emptyState.style.display = "none";

    const article = document.createElement("div");
    article.className = "actu-card"; 
    
    const dateAffichage = data.date ? `<span style="font-size: 11px; color: #888; display: block; margin-bottom: 2px;">${data.date}</span>` : '';

    let htmlContent = `
      <div class="timeline-dot"></div>
      <div class="actu-time">${dateAffichage}${data.heure}</div>
      <div class="actu-content">
    `;

    if (data.titre && data.titre.trim() !== "") htmlContent += `<h3 class="actu-post-title">${data.titre}</h3>`;
    if (data.texte && data.texte.trim() !== "") htmlContent += `<p>${data.texte.replace(/\n/g, '<br>')}</p>`;

    // --- GESTION DES MÉDIAS ---
    if (data.media && data.media.trim() !== "") {
      const url = data.media.trim();
      const lowerUrl = url.toLowerCase();

      if (lowerUrl.includes("youtu")) {
        const ytID = extractYouTubeID(url);
        if (ytID) htmlContent += `<div class="actu-video-container"><iframe src="https://www.youtube.com/embed/${ytID}" frameborder="0" allowfullscreen></iframe></div>`;
      } 
      else if (lowerUrl.includes("x.com/") || lowerUrl.includes("twitter.com/")) {
        // LE CORRECTIF EST ICI : On force "twitter.com" et on coupe "/video/1" ou "/photo/1"
        let cleanUrl = url.replace("x.com", "twitter.com").split('/video')[0].split('/photo')[0];
        
        htmlContent += `
          <div style="margin-top: 15px; width: 100%; overflow: hidden; border-radius: 12px;">
            <blockquote class="twitter-tweet" data-dnt="true" data-theme="light">
              <a href="${cleanUrl}"></a>
            </blockquote>
          </div>`;
      } 
      else if (lowerUrl.includes("tiktok.com/")) {
        const tkId = extractTikTokID(url);
        if (tkId) htmlContent += `<div style="margin-top: 15px;"><iframe src="https://www.tiktok.com/embed/v2/${tkId}" style="width: 100%; height: 600px; border: none; border-radius: 12px;" allowfullscreen></iframe></div>`;
      }
      else if (lowerUrl.includes("instagram.com/")) {
        const igId = extractInstaID(url);
        if (igId) htmlContent += `<div style="margin-top: 15px;"><iframe src="https://www.instagram.com/p/${igId}/embed" width="100%" height="450" frameborder="0" scrolling="no" style="border-radius: 12px;"></iframe></div>`;
      }
      else if (lowerUrl.includes("tf1.fr") || lowerUrl.includes("tf1+")) {
        htmlContent += `<div style="margin-top: 15px; background: linear-gradient(135deg, #0036FF, #001B80); border-radius: 12px; padding: 25px 20px; text-align: center;"><a href="${url}" target="_blank" style="color: white; text-decoration: none; font-weight: 900; font-size: 16px;">▶️ Voir la vidéo exclusive sur TF1+</a></div>`;
      }
      else if (lowerUrl.endsWith(".mp4")) {
        htmlContent += `<video controls class="actu-media-video" src="${url}"></video>`;
      } 
      else {
        htmlContent += `<img src="${url}" alt="Illustration" class="actu-image">`;
      }
    }

    if (data.lien && data.lien.trim() !== "") {
      htmlContent += `<a href="${data.lien}" target="_blank" class="actu-btn-link">🔗 Découvrir</a>`;
    }

    htmlContent += `</div>`;
    article.innerHTML = htmlContent;
    
    liveFeed.prepend(article);

    // On force Twitter à analyser la carte qu'on vient d'ajouter
    setTimeout(() => {
      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load(article);
      }
    }, 500);
  });
}
