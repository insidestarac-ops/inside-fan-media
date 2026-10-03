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
   AUTO-CHARGEUR DE MOTEURS SOCIAUX
========================================================= */
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
   2. LE MODE "RÉGIE" (Envoi de l'information avec Programmation)
========================================================= */
function publierMessage() {
  const titre = document.getElementById("titleInput").value;
  const message = document.getElementById("messageInput").value;
  const media = document.getElementById("mediaInput").value;
  const lien = document.getElementById("linkInput").value;
  
  // Récupération des nouveautés de la régie
  const tagEl = document.getElementById("tagInput");
  const dateEl = document.getElementById("dateInput");
  const tag = tagEl ? tagEl.value : "";
  const dateProg = dateEl ? dateEl.value : "";
  
  if (message.trim() === "" && titre.trim() === "") { 
    alert("Impossible d'envoyer un message vide !"); return; 
  }

  let postTimestamp;
  let heureAffichee;
  let dateAffichee;

  // Si on a programmé une date dans le futur
  if (dateProg) {
    const parsedDate = new Date(dateProg);
    postTimestamp = parsedDate.getTime();
    heureAffichee = String(parsedDate.getHours()).padStart(2, '0') + ":" + String(parsedDate.getMinutes()).padStart(2, '0');
    dateAffichee = String(parsedDate.getDate()).padStart(2, '0') + "/" + String(parsedDate.getMonth() + 1).padStart(2, '0');
  } else {
    // Sinon, on publie maintenant
    const dateObj = new Date();
    postTimestamp = dateObj.getTime();
    heureAffichee = String(dateObj.getHours()).padStart(2, '0') + ":" + String(dateObj.getMinutes()).padStart(2, '0');
    dateAffichee = String(dateObj.getDate()).padStart(2, '0') + "/" + String(dateObj.getMonth() + 1).padStart(2, '0');
  }

  db.ref("direct/").push({
    heure: heureAffichee,
    date: dateAffichee,
    titre: titre,
    texte: message,
    media: media,
    lien: lien,
    tag: tag, // On enregistre le tag
    timestamp: postTimestamp // On utilise notre propre calcul de temps pour la programmation
  });

  // On vide les champs après l'envoi
  document.getElementById("titleInput").value = "";
  document.getElementById("messageInput").value = "";
  document.getElementById("mediaInput").value = "";
  document.getElementById("linkInput").value = "";
  if(dateEl) dateEl.value = "";
  if(tagEl) tagEl.value = "";
  
  if (dateProg) {
    alert(`⏳ Flash info programmé avec succès pour le ${dateAffichee} à ${heureAffichee} !`);
  } else {
    alert("✅ Flash info envoyé en direct !");
  }
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
   4. LE MODE "PUBLIC" (Affichage Dynamique et Programmation)
========================================================= */
const liveFeed = document.getElementById("live-feed");
const emptyState = document.getElementById("empty-state");
const dateElement = document.getElementById("date-du-jour");

if (dateElement) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateElement.innerText = new Date().toLocaleDateString('fr-FR', options);
}

// Fonction séparée pour créer la carte HTML (plus propre)
function afficherArticleHTML(data) {
  if (emptyState) emptyState.style.display = "none";

  const article = document.createElement("div");
  article.className = "actu-card"; 
  
  const dateAffichage = data.date ? `<span style="font-size: 11px; color: #888; display: block; margin-bottom: 2px;">${data.date}</span>` : '';
  
  // Couleurs des tags
  let tagHtml = "";
  if (data.tag) {
    let bgColor = "#7C4DFF"; // Par défaut (ex: Eval)
    if (data.tag === "Alerte") bgColor = "#FF4757"; // Rouge
    if (data.tag === "Gossip") bgColor = "#25D366"; // Vert
    if (data.tag === "Prime") bgColor = "#EF7F00"; // Orange
    tagHtml = `<span style="background: ${bgColor}; color: #fff; font-size: 10px; font-weight: 900; text-transform: uppercase; padding: 4px 10px; border-radius: 6px; margin-bottom: 10px; display: inline-block; letter-spacing: 0.5px;">${data.tag}</span><br>`;
  }

  let htmlContent = `
    <div class="timeline-dot"></div>
    <div class="actu-time">${dateAffichage}${data.heure}</div>
    <div class="actu-content">
      ${tagHtml}
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
      let cleanUrl = url.replace("x.com", "twitter.com").split('/video')[0].split('/photo')[0];
      htmlContent += `
        <div style="margin-top: 15px; width: 100%; overflow: hidden; border-radius: 12px;">
          <blockquote class="twitter-tweet" data-dnt="true" data-theme="light"><a href="${cleanUrl}"></a></blockquote>
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
  
  // On place l'article tout en haut
  liveFeed.prepend(article);

  // Recharge Twitter si besoin
  setTimeout(() => {
    if (window.twttr && window.twttr.widgets) { window.twttr.widgets.load(article); }
  }, 500);
}


if (liveFeed) {
  db.ref("direct/").orderByChild("timestamp").on("child_added", function(snapshot) {
    const data = snapshot.val();
    const now = Date.now();
    const postTime = data.timestamp || now;
    
    const delai = postTime - now;

    // MAGIE DE LA PROGRAMMATION : 
    // Si l'heure du post est dans le futur, on met un retardateur !
    if (delai > 0) {
      setTimeout(() => {
        afficherArticleHTML(data);
      }, delai);
    } else {
      // Sinon, on l'affiche tout de suite
      afficherArticleHTML(data);
    }
  });
}
