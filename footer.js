const footerContent = `
<style>
  .site-footer { background: linear-gradient(180deg, #FFFFFF 0%, #F7F6FF 100%); padding: 60px 0 40px; border-top: 1px solid rgba(124, 77, 255, 0.08); margin-top: 50px; font-family: 'Inter', sans-serif; position: relative; overflow: hidden;}
  /* J'ai élargi le max-width à 1100px pour laisser respirer les 4 colonnes */
  .footer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; max-width: 1100px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 2;}
  
  .footer-col h4 { color: #13082B; font-size: 13px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 25px; display: flex; align-items: center; gap: 12px;}
  .footer-col h4 img { height: 28px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);}
  .footer-col a, .footer-col p { display: block; text-decoration: none; color: #6E6E90; font-size: 15px; font-weight: 500; margin-bottom: 14px; transition: all 0.3s cubic-bezier(0.16,1,0.3,1); width: fit-content; line-height: 1.5; margin-top: 0;}
  .footer-col p { max-width: 220px; }
  .footer-col a:hover { color: #7C4DFF; transform: translateX(6px); }
  
  .social-group { display: flex; gap: 12px; margin-top: 5px;}
  .social-icon { width: 46px !important; height: 46px !important; background: #FFFFFF; border-radius: 16px; display: flex !important; align-items: center; justify-content: center; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); flex-shrink: 0; text-decoration: none; padding: 0 !important; box-shadow: 0 8px 20px rgba(124, 77, 255, 0.08); border: 1px solid rgba(124, 77, 255, 0.05);}
  .social-icon svg { width: 20px; height: 20px; fill: #6E6E90; transition: fill 0.3s ease; display: block;}
  .social-icon:hover { transform: translateY(-5px) scale(1.05); background: linear-gradient(135deg, #7C4DFF, #5E35FF); box-shadow: 0 15px 30px rgba(124, 77, 255, 0.3); border-color: transparent;}
  .social-icon:hover svg { fill: #FFFFFF !important; }

  /* Le logo du partenaire officiel */
  .partner-logo { height: 35px; margin-top: 5px; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.05)); }

  .footer-bottom { text-align: center; margin-top: 60px; padding: 35px 24px 0; border-top: 1px solid rgba(124, 77, 255, 0.1); position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 12px;}
  .copyright-badge { display: inline-flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 900; color: #13082B; background: #ffffff; padding: 8px 18px; border-radius: 50px; box-shadow: 0 5px 15px rgba(124,77,255,0.08); border: 1px solid rgba(124,77,255,0.1);}
  
  .footer-bg-logo { position: absolute; bottom: -20px; right: 40px; width: 250px; opacity: 0.03; pointer-events: none; filter: grayscale(1); z-index: 1; border-radius: 40px;}
  
  @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
  
  @media (max-width: 768px) { 
    .site-footer { padding: 40px 0 20px !important; margin-top: 30px !important; } 
    .footer-grid { display: flex; flex-direction: column; align-items: center; gap: 35px !important; text-align: center; } 
    .footer-col { display: flex; flex-direction: column; align-items: center; width: 100%; }
    .footer-col h4 { justify-content: center; font-size: 12px !important; margin-bottom: 12px !important; }
    .footer-col h4 img { height: 20px !important; }
    .footer-col a, .footer-col p { margin-left: auto; margin-right: auto; text-align: center; font-size: 13px !important; margin-bottom: 8px !important; }
    .partner-logo { height: 30px; }
    .social-group { justify-content: center; width: 100%; gap: 12px !important;}
    .social-icon { width: 38px !important; height: 38px !important; border-radius: 12px !important; }
    .social-icon svg { width: 16px !important; height: 16px !important; }
    .footer-bottom { margin-top: 40px !important; padding-top: 20px !important; gap: 8px !important; }
    .copyright-badge { font-size: 11px !important; padding: 6px 12px !important; }
    .footer-bg-logo { display: none; }
  }

  /* Style du bandeau Cookies */
  #ifm-cookie-banner { display: none; position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); width: 90%; max-width: 450px; background: rgba(11, 7, 26, 0.95); backdrop-filter: blur(20px); color: #fff; padding: 25px; border-radius: 24px; z-index: 10000; box-shadow: 0 20px 40px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); font-family: 'Inter', sans-serif; }
</style>

<footer class="site-footer">
  <img src="assets/logo-inside-fan-media.png" class="footer-bg-logo" alt="Inside Fan Media Background">

  <div class="footer-grid">
    <div class="footer-col">
      <h4><img src="assets/logo-inside-fan-media.png" alt="Logo">Inside Fan Media</h4>
      <a href="a-propos.html">À propos</a>
      <a href="Contact.html">Contact & Support</a>
      <a href="mentions-legales.html">Mentions Légales</a>
      <a href="conditions-generales.html">Conditions Générales</a>
      <a href="politique-confidentialite.html">Confidentialité</a>
    </div>

    <div class="footer-col">
      <h4>Nos Univers</h4>
      <a href="Inside-star-ac.html">Star Academy</a>
      <a href="Inside-dals.html">Danse avec les stars</a>
    </div>

    <!-- Nouvelle Colonne Partenaire Officiel -->
    <div class="footer-col">
      <h4>Partenaire Officiel</h4>
      <!-- Le logo de Viewer+ (avec lien vers leur site si besoin) -->
      <img src="assets/viewer.png" alt="Viewer+" class="partner-logo">
    </div>

    <div class="footer-col">
      <h4>Nos réseaux</h4>
      <div class="social-group">
        <a href="https://instagram.com/insidefanmedia" target="_blank" rel="noopener noreferrer" class="social-icon" title="Instagram">
          <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        </a>
        <a href="https://www.facebook.com/share/1ay7NzguLa/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" class="social-icon" title="Facebook">
          <svg viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>
        </a>
        <a href="https://x.com/insidefanmedia" target="_blank" rel="noopener noreferrer" class="social-icon" title="X (Twitter)">
          <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a href="https://www.tiktok.com/@insidefanmedia" target="_blank" rel="noopener noreferrer" class="social-icon" title="TikTok">
          <svg viewBox="0 0 448 512"><path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25V349.38A162.55 162.55 0 1 1 185 188.31V278.2a74.62 74.62 0 1 0 52.23 71.18V0l88 0a121.18 121.18 0 0 0 1.86 22.17h0A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14Z"/></svg>
        </a>
      </div>
    </div>
  </div>

  <div class="footer-bottom">
    <div class="copyright-badge">
      © 2026 INSIDE FAN MEDIA
    </div>
  </div>
</footer>

<div id="ifm-cookie-banner">
  <h4 style="margin: 0 0 10px; font-size: 16px; font-weight: 900;">🍪 Utilisation des cookies</h4>
  <p style="margin: 0 0 20px; font-size: 13px; color: rgba(255,255,255,0.7); line-height: 1.5;">
    Nous utilisons des services tiers (tchat et sondages Viewer+, formulaire de contact) qui nécessitent des cookies fonctionnels. Vous pouvez les refuser, mais certaines fonctionnalités (comme le tchat en direct) resteront alors désactivées. <a href="politique-confidentialite.html" style="color: #7C4DFF; font-weight: 700;">En savoir plus</a>.
  </p>
  <div style="display: flex; gap: 10px;">
    <button id="btn-refuse-cookies" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2); background: transparent; color: #fff; font-weight: 800; cursor: pointer;">Refuser</button>
    <button id="btn-accept-cookies" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: #7C4DFF; color: #fff; font-weight: 800; cursor: pointer;">Accepter</button>
  </div>
</div>
`;

document.getElementById('footer-placeholder').innerHTML = footerContent;

// Gestion du bandeau Cookies
setTimeout(() => {
  const banner = document.getElementById('ifm-cookie-banner');
  const consent = localStorage.getItem('ifm_cookie_consent');
  if (!consent) {
    banner.style.display = 'block';
  }
  document.getElementById('btn-accept-cookies').onclick = () => {
    localStorage.setItem('ifm_cookie_consent', 'accepted');
    banner.style.display = 'none';
    document.dispatchEvent(new Event('ifm-consent-updated'));
  };
  document.getElementById('btn-refuse-cookies').onclick = () => {
    localStorage.setItem('ifm_cookie_consent', 'refused');
    banner.style.display = 'none';
    document.dispatchEvent(new Event('ifm-consent-updated'));
  };
}, 100);

// Petite fonction utilitaire réutilisable sur n'importe quelle page
window.ifmHasConsent = function() {
  return localStorage.getItem('ifm_cookie_consent') === 'accepted';
};