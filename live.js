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
      htmlContent += `<img src="${url}" alt="Illustration" class="actu-image" style="width: auto; max-width: 100%; height: auto; max-height: 65vh; display: block; margin: 15px auto 0; border-radius: 12px; object-fit: contain;">`;
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

/* =========================================================
   5. UPLOAD DIRECT DES MÉDIAS (IMGBB - 100% GRATUIT)
========================================================= */
const IMGBB_API_KEY = "c0dc37036ae1706a4820e4f9e9d271f4"; // <-- COLLE TA CLÉ ICI

const fileUpload = document.getElementById('fileUpload');
const uploadPreviewContainer = document.getElementById('uploadPreviewContainer');
const uploadImgPreview = document.getElementById('uploadImgPreview');
const uploadVidPreview = document.getElementById('uploadVidPreview');
const uploadProgress = document.getElementById('uploadProgress');
const mediaInput = document.getElementById('mediaInput');

if (fileUpload) {
  fileUpload.addEventListener('change', async function(e) {
    const selectedMediaFile = e.target.files[0];
    if (!selectedMediaFile) return;

    // 1. Prévisualisation immédiate locale
    const fileUrl = URL.createObjectURL(selectedMediaFile);
    if (uploadPreviewContainer) uploadPreviewContainer.style.display = 'block';

    if (selectedMediaFile.type.startsWith('image/')) {
      if(uploadImgPreview) { uploadImgPreview.src = fileUrl; uploadImgPreview.style.display = 'block'; }
      if(uploadVidPreview) uploadVidPreview.style.display = 'none';
    } else {
      alert("⚠️ L'hébergement automatique est réservé aux images. Pour une vidéo, colle directement un lien YouTube, X ou TikTok dans la case.");
      return;
    }

    // 2. Préparation de l'envoi
    if (uploadProgress) {
        uploadProgress.textContent = "⏳ Hébergement en cours...";
        uploadProgress.style.color = "#fff";
    }
    
    // On bloque temporairement le bouton Publier
    const btnPublish = document.querySelector('.btn-publish');
    if(btnPublish) btnPublish.disabled = true;

    // 3. Envoi silencieux à ImgBB
    const formData = new FormData();
    formData.append("image", selectedMediaFile);

    try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();

        if (data.success) {
            // Succès : on insère le lien officiel public
            if (mediaInput) mediaInput.value = data.data.url;
            if (uploadProgress) {
                uploadProgress.textContent = "✅ Image chargée et prête !";
                uploadProgress.style.color = "#25D366";
            }
        } else {
            throw new Error("Erreur ImgBB");
        }
    } catch (error) {
        console.error("Erreur d'upload:", error);
        if (uploadProgress) {
            uploadProgress.textContent = "❌ Échec de l'envoi. Vérifie ta connexion.";
            uploadProgress.style.color = "#FF4757";
        }
    } finally {
        if (btnPublish) btnPublish.disabled = false;
    }
  });
}

/* =========================================================
   6. GESTION DE LA BANDE DÉFILANTE (SANS LIMITE + SCROLL INFINI)
========================================================= */
const tickerCurrentDisplay = document.getElementById("tickerCurrentDisplay");
const tickerInput = document.getElementById("tickerInput");

// A. ÉCOUTER CE QUI EST EN LIGNE
db.ref("settings/ticker").on("value", function(snapshot) {
    const data = snapshot.val();
    
    // 1. RÉGIE
    if (tickerCurrentDisplay) {
        if (data && data.messages && data.messages.trim() !== "") {
            tickerCurrentDisplay.innerHTML = data.messages.replace(/\n/g, " <br> ");
            tickerCurrentDisplay.style.color = "#25D366";
            
            if (document.activeElement !== tickerInput && tickerInput) {
                tickerInput.value = data.messages;
            }
        } else {
            tickerCurrentDisplay.textContent = "Aucun message en ligne (Bande masquée).";
            tickerCurrentDisplay.style.color = "#FF4757";
            if(tickerInput) tickerInput.value = "";
        }
    }

    // 2. ACCUEIL
    const tickerScroll = document.querySelector('.dakar-ticker-scroll');
    const tickerContainer = document.querySelector('.dakar-ticker');
    
    if (tickerScroll && tickerContainer) {
        if (data && data.messages && data.messages.trim() !== "") {
            // On sépare le texte ligne par ligne
            const lignes = data.messages.split('\n').filter(line => line.trim() !== "");
            let htmlContenu = "";
            
            lignes.forEach(ligne => {
                htmlContenu += `<span>${ligne}</span> <span class="ticker-separator" style="margin: 0 15px;">--</span> `;
            });

            // On injecte 2 fois le bloc exact pour que l'animation translateX(-50%) soit invisible à la fin
            const blocComplet = `<div class="dakar-ticker-text">${htmlContenu}</div>`;
            tickerScroll.innerHTML = blocComplet + blocComplet;
            tickerContainer.style.display = "block";

            // CALCUL DE VITESSE INTELLIGENT
            // Plus il y a de lettres, plus on donne de temps à l'animation (0.15s par caractère)
            const duree = Math.max(15, data.messages.length * 0.15); 
            tickerScroll.style.animation = `scrollInfini ${duree}s linear infinite`;

        } else {
            tickerContainer.style.display = "none";
        }
    }
});

// B. PUBLIER
function mettreAJourTicker() {
    if (!tickerInput) return;
    const msg = tickerInput.value;

    if (msg.trim() === "") {
        alert("❌ Impossible d'envoyer du vide. Cliquez sur 'Cacher' !");
        return;
    }

    db.ref("settings/ticker").set({
        messages: msg,
        timestamp: Date.now()
    }).then(() => {
        alert("✅ Bande défilante mise à jour !");
    });
}

// C. CACHER
function supprimerTicker() {
    if(confirm("Voulez-vous vraiment masquer la bande défilante de l'accueil ?")) {
        db.ref("settings/ticker").remove().then(() => {
            alert("🗑️ Bande défilante masquée !");
        });
    }
}

/* =========================================================
   7. GESTION DU PLANNING (RÉGIE -> FIREBASE)
========================================================= */

// Ajouter un cours sur la grille (Version Intégrale TV)
// Le vrai Cerveau (Clone TV)
// Génère le HTML intérieur d'une étiquette selon son type
function texteEtiquette(type, duree) {
    switch (type) {
        case "tag-expression":    return "<div class='tag-expression-wrapper'><div class='exp-top'>EXPRESSION</div><div class='exp-bot'>SCÉNIQUE</div></div>";
        case "tag-repetitions":   return "RÉPÉTITIONS";
        case "tag-evaluations": {
            const bloc = "<span class='ev-star'>✦</span><span>ÉVALUATIONS</span><span class='ev-star'>✦</span>";
            return ["h-3","h-3-5","h-4","h-4-5","h-journee"].includes(duree) ? bloc + bloc : bloc;
        }
        case "tag-debrief":       return "DÉBRIEF<br>DU<br>PRIME";
        case "tag-showtime":      return "<span class='st-star'>✦</span><span class='cursive'>show time</span><span class='st-star'>✦</span>";
        case "tag-masterclass":   return "MASTERCLASS<br>DU DIRECTEUR";
        case "tag-tonalite":      return "PRISE DE<br>TONALITÉ";
        case "tag-cp-chant":      return "COURS PARTICULIER<br>DE CHANT";
        case "tag-cp-danse":      return "COURS PARTICULIER<br>DE DANSE";
        case "tag-cp-expression": return "COURS PARTICULIER<br>D'EXPRESSION SCÉNIQUE";
        case "tag-theatre":       return "THÉÂTRE";
        case "tag-danse":         return "DANSE";
        case "tag-chant":         return "CHANT";
        case "tag-sport":         return "SPORT";
        case "tag-surprise":      return "SURPRISE !";
        case "tag-reveil":        return "réveil";
        case "tag-dejeuner":      return "déjeuner";
        case "tag-diner":         return "dîner";
        default:                  return type.replace("tag-", "").toUpperCase();
    }
}

function ajouterCoursPlanning() {
    const jour   = document.getElementById("planJour").value;
    const heure  = document.getElementById("planHeure").value;
    const depart = document.getElementById("planDepart").value;
    const duree  = document.getElementById("planDuree").value;
    const type   = document.getElementById("planType").value;

    db.ref("planning/semaine1/" + jour + "-" + heure).push({
        depart, duree, type, texte: texteEtiquette(type, duree)
    }).then(() => alert("✅ Étiquette ajoutée !"))
      .catch(err => alert("❌ Erreur : " + err));
}

// --- SEMAINE TYPE (relevée sur le vrai mur de l'Académie) ---
const SEMAINE_TYPE = [
    // Lundi
    ["lundi",7,"start-30","h-0-5","tag-reveil"], ["lundi",9,"start-00","h-2-5","tag-repetitions"],
    ["lundi",11,"start-30","h-0-5","tag-dejeuner"], ["lundi",13,"start-00","h-1-5","tag-chant"],
    ["lundi",15,"start-00","h-2","tag-danse"], ["lundi",18,"start-00","h-2-5","tag-repetitions"],
    ["lundi",21,"start-00","h-0-5","tag-diner"],
    // Mardi
    ["mardi",7,"start-30","h-0-5","tag-reveil"], ["mardi",8,"start-30","h-2-5","tag-evaluations"],
    ["mardi",11,"start-00","h-2-5","tag-evaluations"], ["mardi",14,"start-00","h-0-5","tag-dejeuner"],
    ["mardi",15,"start-00","h-0-5","tag-cp-chant"], ["mardi",16,"start-00","h-0-5","tag-cp-danse"],
    ["mardi",17,"start-00","h-0-5","tag-cp-expression"], ["mardi",18,"start-00","h-2-5","tag-tonalite"],
    ["mardi",21,"start-00","h-0-5","tag-diner"],
    // Mercredi
    ["mercredi",7,"start-30","h-0-5","tag-reveil"], ["mercredi",9,"start-30","h-1-5","tag-expression"],
    ["mercredi",12,"start-00","h-0-5","tag-sport"], ["mercredi",13,"start-00","h-0-5","tag-dejeuner"],
    ["mercredi",16,"start-00","h-4","tag-repetitions"], ["mercredi",21,"start-00","h-0-5","tag-diner"],
    ["mercredi",22,"start-00","h-0-5","tag-surprise"],
    // Jeudi
    ["jeudi",7,"start-30","h-0-5","tag-reveil"], ["jeudi",9,"start-00","h-1-5","tag-theatre"],
    ["jeudi",11,"start-00","h-0-5","tag-dejeuner"], ["jeudi",13,"start-00","h-0-5","tag-surprise"],
    ["jeudi",14,"start-30","h-1","tag-masterclass"], ["jeudi",16,"start-00","h-4","tag-repetitions"],
    ["jeudi",21,"start-00","h-0-5","tag-diner"],
    // Vendredi
    ["vendredi",7,"start-30","h-0-5","tag-reveil"], ["vendredi",9,"start-00","h-1","tag-sport"],
    ["vendredi",11,"start-30","h-0-5","tag-dejeuner"], ["vendredi",13,"start-30","h-1-5","tag-expression"],
    ["vendredi",21,"start-00","h-0-5","tag-diner"],
    // Samedi
    ["samedi",7,"start-00","h-journee","tag-showtime"],
    // Dimanche
    ["dimanche",7,"start-30","h-0-5","tag-reveil"], ["dimanche",13,"start-30","h-3","tag-debrief"]
];

function chargerSemaineType() {
    if (!confirm("Remplacer le planning en ligne par la semaine type (35 étiquettes) ?")) return;
    const data = {};
    SEMAINE_TYPE.forEach(([jour, heure, depart, duree, type]) => {
        const id = jour + "-" + heure;
        data[id] = data[id] || {};
        data[id][db.ref().push().key] = { depart, duree, type, texte: texteEtiquette(type, duree) };
    });
    db.ref("planning/semaine1").set(data)
      .then(() => alert("✅ Semaine type chargée ! Ajuste les exceptions et c'est publié."));
}

// Supprime UNE étiquette (pas toute la case)
function supprimerEtiquette(idCase, keyId) {
    if (!confirm("Supprimer cette étiquette ?")) return;
    db.ref("planning/semaine1/" + idCase + "/" + keyId).remove();
}


function viderPlanning() {
    if(confirm("⚠️ DANGER : Es-tu sûr de vouloir effacer TOUTES les étiquettes de la semaine ?")) {
        db.ref("planning/semaine1").remove().then(() => {
            alert("🗑️ Planning totalement vidé ! Il est prêt pour une nouvelle semaine.");
        });
    }
}

// Supprimer UNE SEULE case du planning
function supprimerCasePlanning() {
    const jour = document.getElementById("planJour").value;
    const heure = document.getElementById("planHeure").value;
    const idCase = jour + "-" + heure;

    if(confirm(`Voulez-vous vraiment effacer ce qu'il y a le ${jour} à la ligne ${heure}H ?`)) {
        db.ref("planning/semaine1/" + idCase).remove().then(() => {
            alert(`🗑️ Case ${jour} à ${heure}H vidée avec succès !`);
        }).catch((error) => {
            alert("❌ Erreur : " + error);
        });
    }
}

/* =========================================================
   8. INTERCONNEXION EN-TÊTE PLANNING (SEMAINE & DATES)
========================================================= */

// Rattaché au bouton "Enregistrer" de ta régie direct.html
function enregistrerMetaPlanning() {
  const numSemaine = document.getElementById("planNumero").value.trim();
  const datesSemaine = document.getElementById("planDates").value.trim();

  if (numSemaine === "" || datesSemaine === "") {
    alert("❌ Erreur : Le numéro de semaine et les dates ne peuvent pas être vides !");
    return;
  }

  // Envoi propre sur le nœud Firebase global du planning
  db.ref("planning/infosSemaine").set({
    numero: numSemaine,
    dates: datesSemaine
  }).then(() => {
    alert("✅ En-tête mis à jour ! Semaine " + numSemaine + " synchronisée.");
  }).catch((error) => {
    alert("❌ Erreur Firebase : " + error);
  });
}

// Synchronise automatiquement les champs de ta régie quand tu arrives sur la page
db.ref("planning/infosSemaine").on("value", function(snapshot) {
  const data = snapshot.val();
  if (data) {
    if (document.getElementById("planNumero")) document.getElementById("planNumero").value = data.numero;
    if (document.getElementById("planDates")) document.getElementById("planDates").value = data.dates;
  }
});
