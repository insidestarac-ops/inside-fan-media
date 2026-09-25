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

  const dateObj = new Date();
  const heures = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const jour = String(dateObj.getDate()).padStart(2, '0');
  const mois = String(dateObj.getMonth() + 1).padStart(2, '0');
  const dateCourante = `${jour}/${mois}`;

  db.ref("direct/").push({
    heure: `${heures}:${minutes}`,
    date: dateCourante,
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
   3. OUTILS : DÉTECTEURS DE RÉSEAUX SOCIAUX
========================================================= */
function extractYouTubeID(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
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

// 4.1. Affichage automatique de la date complète en haut de la page
if (dateElement) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateElement.innerText = new Date().toLocaleDateString('fr-FR', options);
}

// 4.2. Écoute et affichage des messages en temps réel
if (liveFeed) {
  db.ref("direct/").orderByChild("timestamp").on("child_added", function(snapshot) {
    const data = snapshot.val();
    
    if (emptyState) emptyState.style.display = "none";

    const article = document.createElement("div");
    article.className = "actu-card"; 
    
    const dateAffichage = data.date ? `<span style="font-size: 11px; color: #888; display: block; margin-bottom: 2px;">${data.date}</span>` : '';

    let htmlContent = `
      <div class="timeline-dot"></div>
      <div class="actu-time">
        ${dateAffichage}
        ${data.heure}
      </div>
      <div class="actu-content">
    `;

    // Titre
    if (data.titre && data.titre.trim() !== "") {
      htmlContent += `<h3 class="actu-post-title">${data.titre}</h3>`;
    }

    // Message
    if (data.texte && data.texte.trim() !== "") {
      const texteFormate = data.texte.replace(/\n/g, '<br>');
      htmlContent += `<p>${texteFormate}</p>`;
    }

    // ==========================================
    // 4.3. GESTION UNIVERSELLE DES MÉDIAS
    // ==========================================
    if (data.media && data.media.trim() !== "") {
      const url = data.media.trim();
      const lowerUrl = url.toLowerCase();

      if (lowerUrl.includes("youtu")) {
        // --- YOUTUBE ---
        const ytID = extractYouTubeID(url);
        if (ytID) {
          htmlContent += `<div class="actu-video-container"><iframe src="https://www.youtube.com/embed/${ytID}" frameborder="0" allowfullscreen></iframe></div>`;
        }
      } 
      else if (lowerUrl.includes("x.com/") || lowerUrl.includes("twitter.com/")) {
        // --- TWITTER / X ---
        const tweetUrl = url.replace("x.com", "twitter.com");
        htmlContent += `
          <div style="margin-top: 15px; display: flex; justify-content: center;">
            <blockquote class="twitter-tweet" data-dnt="true" data-theme="light">
              <a href="${tweetUrl}"></a>
            </blockquote>
          </div>`;
      } 
      else if (lowerUrl.includes("tiktok.com/")) {
        // --- TIKTOK ---
        const tkId = extractTikTokID(url);
        if (tkId) {
          htmlContent += `<div style="margin-top: 15px;"><iframe src="https://www.tiktok.com/embed/v2/${tkId}" style="width: 100%; height: 600px; border: none; border-radius: 12px;" allowfullscreen></iframe></div>`;
        }
      }
      else if (lowerUrl.includes("instagram.com/")) {
        // --- INSTAGRAM ---
        const igId = extractInstaID(url);
        if (igId) {
          htmlContent += `<div style="margin-top: 15px;"><iframe src="https://www.instagram.com/p/${igId}/embed" width="100%" height="450" frameborder="0" scrolling="no" style="border-radius: 12px; border: 1px solid rgba(124, 77, 255, 0.1);"></iframe></div>`;
        }
      }
      else if (lowerUrl.includes("tf1.fr") || lowerUrl.includes("tf1+")) {
        // --- TF1+ ---
        htmlContent += `
          <div style="margin-top: 15px; background: linear-gradient(135deg, #0036FF, #001B80); border-radius: 12px; padding: 25px 20px; text-align: center; box-shadow: 0 4px 15px rgba(0, 54, 255, 0.2);">
            <a href="${url}" target="_blank" style="color: white; text-decoration: none; font-weight: 900; font-size: 16px; display: flex; align-items: center; justify-content: center; gap: 10px;">
              ▶️ Voir la vidéo sur TF1+
            </a>
          </div>`;
      }
      else if (lowerUrl.endsWith(".mp4")) {
        // --- VIDÉO MP4 ---
        htmlContent += `<video controls class="actu-media-video" src="${url}"></video>`;
      } 
      else {
        // --- IMAGE ---
        htmlContent += `<img src="${url}" alt="Illustration" class="actu-image">`;
      }
    }

    // Bouton Lien Externe
    if (data.lien && data.lien.trim() !== "") {
      htmlContent += `<a href="${data.lien}" target="_blank" class="actu-btn-link">🔗 Découvrir</a>`;
    }

    htmlContent += `</div>`;
    article.innerHTML = htmlContent;
    
    liveFeed.prepend(article);

    // Initialisation du widget Twitter au moment de l'injection
    if (window.twttr) {
      setTimeout(() => { window.twttr.widgets.load(); }, 100);
    }
  });
}
