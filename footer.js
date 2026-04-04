const footerContent = `
<style>
  .site-footer { 
    background: #ffffff; 
    padding: 100px 0 50px; 
    border-top: 1px solid #f0f0f5; 
    margin-top: 100px; 
    font-family: 'Inter', sans-serif; 
    position: relative;
    overflow: hidden;
  }

  .footer-grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
    gap: 50px; 
    max-width: 1300px; 
    margin: 0 auto; 
    padding: 0 24px; 
    position: relative;
    z-index: 2;
  }

  .footer-col h4 { 
    color: #7C4DFF; 
    font-size: 11px; 
    font-weight: 900; 
    text-transform: uppercase; 
    letter-spacing: 1.5px; 
    margin-bottom: 30px; 
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .footer-col h4::after {
    content: "";
    width: 20px;
    height: 2px;
    background: #EDE7FF;
  }

  .footer-col a { 
    display: block; 
    text-decoration: none; 
    color: #6E6E90; 
    font-size: 15px; 
    font-weight: 500;
    margin-bottom: 15px; 
    transition: all 0.3s ease; 
    width: fit-content;
  }

  .footer-col a:hover { 
    color: #7C4DFF; 
    transform: translateX(8px); 
  }

  .status-dot { 
    width: 8px; height: 8px; 
    background: #39E09B; 
    border-radius: 50%; 
    display: inline-block;
    margin-right: 10px;
    box-shadow: 0 0 10px rgba(57, 224, 155, 0.4);
  }

  .social-group { 
    display: flex; 
    gap: 12px; 
    margin-top: 5px;
  }

  .social-icon { 
    width: 44px !important; 
    height: 44px !important; 
    background: #F8F7FF; 
    border-radius: 12px; 
    display: flex !important; 
    align-items: center; 
    justify-content: center; 
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
    flex-shrink: 0;
    text-decoration: none;
    padding: 0 !important;
  }

  .social-icon svg { 
    width: 20px; 
    height: 20px; 
    fill: #6E6E90; 
    transition: fill 0.3s ease;
    display: block;
  }

  .social-icon:hover { 
    transform: translateY(-8px); 
    background: #ffffff;
    box-shadow: 0 12px 25px rgba(124, 77, 255, 0.15);
    border: 1px solid #EDE7FF;
  }

  .social-icon.linktree:hover svg { fill: #39E09B; }
  .social-icon.x-corp:hover svg { fill: #000000; }
  .social-icon.tiktok:hover svg { fill: #FE2C55; }

  .footer-bottom { 
    text-align: center; 
    margin-top: 90px; 
    padding: 35px 24px 0; 
    border-top: 1px solid #F5F4FF; 
    color: #A0A0C0; 
    font-size: 13px; 
    position: relative;
    z-index: 2;
  }

  .footer-bg-logo {
    position: absolute;
    bottom: -20px; 
    right: 30px; 
    width: 250px; 
    opacity: 0.03; 
    pointer-events: none; 
    filter: grayscale(1); 
    z-index: 1;
  }

  @media (max-width: 768px) {
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
    .footer-bg-logo { width: 150px; right: 10px; bottom: 0; }
  }
</style>

<footer class="site-footer">
  <img src="logo-inside-fan-media.png" class="footer-bg-logo" alt="">

  <div class="footer-grid">
    
    <div class="footer-col">
      <h4>Inside Fan Media</h4>
      <a href="A propos.html">À propos</a>
      <a href="Contact.html"><span class="status-dot"></span>Contact</a>
      <a href="Mentions Legales.html">Mentions Légales</a>
      <a href="Conditions générales.html">Conditions Générales</a>
      <a href="Politique de Confidentialité.html">Confidentialité</a>
    </div>

    <div class="footer-col">
      <h4>Nos Univers</h4>
      <a href="Inside-star-ac.html">Star Academy</a>
      <a href="Inside-dals.html">Danse avec les stars</a>
      <div class="social-group" style="margin-top: 20px;">
        <a href="https://linktr.ee/insidefanmedia" target="_blank" class="social-icon linktree" title="Linktree Global">
          <svg viewBox="0 0 24 24"><path d="m13.511 5.822 3.807-3.807L19.341 4l-3.807 3.807 3.807 3.807L17.318 13.6l-3.807-3.807V22H10.49V9.793l-3.807 3.807-2.023-2.023 3.807-3.807L4.66 3.963 6.683 1.94l3.807 3.807V2.023h2.021v3.8Z"/></svg>
        </a>
      </div>
    </div>

    <div class="footer-col">
      <h4>Inside Star Ac</h4>
      <div class="social-group">
        <a href="https://x.com/insidestarac" target="_blank" class="social-icon x-corp">
          <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a href="https://www.tiktok.com/@insidestarac" target="_blank" class="social-icon tiktok">
          <svg viewBox="0 0 448 512"><path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25V349.38A162.55 162.55 0 1 1 185 188.31V278.2a74.62 74.62 0 1 0 52.23 71.18V0l88 0a121.18 121.18 0 0 0 1.86 22.17h0A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14Z"/></svg>
        </a>
      </div>
    </div>

    <div class="footer-col">
      <h4>Inside DALS</h4>
      <div class="social-group">
        <a href="https://x.com/insidedals" target="_blank" class="social-icon x-corp">
          <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a href="https://www.tiktok.com/@insidedals" target="_blank" class="social-icon tiktok">
          <svg viewBox="0 0 448 512"><path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25V349.38A162.55 162.55 0 1 1 185 188.31V278.2a74.62 74.62 0 1 0 52.23 71.18V0l88 0a121.18 121.18 0 0 0 1.86 22.17h0A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14Z"/></svg>
        </a>
      </div>
    </div>
  </div>

  <div class="footer-bottom">
    © 2026 INSIDE FAN MEDIA — Le média fan nouvelle génération
  </div>
</footer>
`;

document.getElementById('footer-placeholder').innerHTML = footerContent;
