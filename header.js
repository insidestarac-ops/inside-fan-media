const headerContent = `
<style>
  :root {
    --h-violet: #7C4DFF;
    --h-dark: #0B071A;
    --h-glass-dark: rgba(11, 7, 26, 0.85); 
  }

  @keyframes logoPulse {
    0%   { filter: drop-shadow(0 4px 10px rgba(124,77,255,0.15)); transform: scale(1); }
    50%  { filter: drop-shadow(0 10px 20px rgba(124,77,255,0.3)); transform: scale(1.02); }
    100% { filter: drop-shadow(0 4px 10px rgba(124,77,255,0.15)); transform: scale(1); }
  }

  /* --- DESKTOP --- */
  @media (min-width: 1025px) {
    .site-header { position: sticky; top: 20px; z-index: 9999; height: 90px; display: flex; align-items: center; padding: 0 40px; width: 100%; transition: all 0.3s ease; }
    .header-inner { max-width: 1450px; width: 100%; margin: 0 auto; display: flex; align-items: center; gap: 25px; justify-content: space-between;}
    
    .brand { display: flex; align-items: center; gap: 15px; text-decoration: none; flex-shrink: 0; }
    .brand img { height: 60px; border-radius: 14px; animation: logoPulse 5s infinite ease-in-out; border: 1px solid rgba(255,255,255,0.2); }
    .brand span { font-weight: 900; font-size: 24px; text-transform: uppercase; letter-spacing: -1px; background: linear-gradient(90deg, var(--h-dark) 20%, var(--h-violet) 80%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

    .pc-nav-container { display: flex; align-items: center; flex-grow: 1; position: relative; height: 64px; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); border-radius: 100px; box-shadow: 0 20px 40px rgba(124,77,255,0.06); border: 1px solid rgba(124,77,255,0.08); margin: 0 30px;}
    .pc-nav { width: 100%; height: 100%; }
    .pc-nav ul { list-style: none; display: flex; justify-content: space-evenly; align-items: center; margin: 0; padding: 0 20px; height: 100%; }
    .pc-nav a { text-decoration: none; color: var(--h-dark); font-weight: 800; font-size: 14px; text-transform: uppercase; padding: 0 20px; height: 100%; display: flex; align-items: center; transition: 0.3s ease; position: relative; }
    
    .has-dropdown { position: relative; height: 100%; display: flex; align-items: center; }
    .has-dropdown > a::after { content: ""; position: absolute; bottom: 18px; right: 8px; width: 0; height: 0; border-left: 4px solid transparent; border-bottom: 4px solid var(--h-violet); transition: transform 0.3s ease; }
    .has-dropdown:hover > a::after { transform: rotate(180deg) translateY(-2px); }
    .pc-nav a:hover { color: var(--h-violet); transform: translateY(-1px); }

    .dropdown { position: absolute; top: calc(100% + 12px); left: 0; background: var(--h-glass-dark); backdrop-filter: blur(25px); min-width: 230px; padding: 12px; opacity: 0; visibility: hidden; transform: translateY(15px) scale(0.95); transition: all 0.4s cubic-bezier(0.16,1,0.3,1); border-radius: 24px; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 30px 60px rgba(0,0,0,0.4); transform-origin: top left; }
    
    .has-dropdown:hover .dropdown,
    .dropdown.force-open {
      opacity: 1; visibility: visible; transform: translateY(0) scale(1);
    }

    .dropdown a { color: rgba(255,255,255,0.9) !important; padding: 14px 20px; font-size: 14px; font-weight: 700; border-radius: 16px; display: flex; justify-content: space-between; align-items: center; text-transform: none; height: auto; width: 100%; transition: all 0.3s ease; }
    .dropdown a::after { content: ""; width: 6px; height: 6px; border-right: 2px solid rgba(255,255,255,0.4); border-top: 2px solid rgba(255,255,255,0.4); transform: rotate(45deg); transition: 0.3s; }
    .dropdown a:hover { background: rgba(124,77,255,0.2) !important; color: #fff !important; padding-left: 25px; }
    .dropdown a:hover::after { border-color: #fff; transform: rotate(45deg) scale(1.2); }

    .btn-contact { background: linear-gradient(135deg, var(--h-dark), #1A103C); color: #ffffff; height: 64px; padding: 0 35px; display: flex; align-items: center; font-weight: 900; text-transform: uppercase; font-size: 14px; text-decoration: none; border-radius: 100px; transition: all 0.3s cubic-bezier(0.16,1,0.3,1); box-shadow: 0 10px 25px rgba(0,0,0,0.15); flex-shrink: 0; position: relative; overflow: hidden;}
    .btn-contact:hover { background: var(--h-violet); transform: translateY(-3px); box-shadow: 0 20px 40px rgba(124,77,255,0.3); }

    #burger, #mob-overlay, .mobile-nav-panel { display: none !important; }
  }

  /* --- MOBILE : LE TIROIR FACON APP (BOTTOM SHEET) --- */
  @media (max-width: 1024px) {
    .pc-nav-container, .btn-contact { display: none !important; }
    
    .site-header { position: fixed; top: 0; left: 0; right: 0; height: 75px; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(15px); z-index: 1000; display: flex; align-items: center; padding: 0 20px; border-bottom: 1px solid rgba(124,77,255,0.08); width: 100%; transition: background 0.3s;}
    .header-inner { width: 100%; display: flex; align-items: center; justify-content: space-between; }
    .brand { display: flex; align-items: center; gap: 12px; text-decoration: none; z-index: 1002;}
    .brand img { height: 40px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.05); }
    .brand span { font-weight: 900; font-size: 15px; text-transform: uppercase; background: linear-gradient(90deg, var(--h-dark) 20%, var(--h-violet) 80%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

    #burger { background: #F7F6FF; border: none; width: 46px; height: 46px; border-radius: 14px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; cursor: pointer; z-index: 1002; transition: 0.3s; }
    #burger span { display: block; width: 22px; height: 2px; background: var(--h-dark); border-radius: 2px; transition: all 0.3s ease; }
    #burger.open { background: rgba(255,255,255,0.1); }
    #burger.open span { background: #fff; }
    #burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    #burger.open span:nth-child(2) { opacity: 0; }
    #burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

    #mob-overlay { position: fixed; inset: 0; background: rgba(11, 7, 26, 0.6); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); z-index: 1000; opacity: 0; visibility: hidden; transition: all 0.4s ease; }
    #mob-overlay.active { opacity: 1; visibility: visible; }

    .mobile-nav-panel { 
      position: fixed; 
      bottom: 0; 
      left: 0; 
      width: 100%; 
      height: 85vh; 
      background: #0B071A; 
      z-index: 1001; 
      box-shadow: 0 -15px 40px rgba(0,0,0,0.5); 
      display: flex; 
      flex-direction: column; 
      padding: 30px 30px 40px; 
      border-top-left-radius: 36px; 
      border-top-right-radius: 36px; 
      transform: translateY(100%); 
      transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1); 
      overflow-y: auto; 
    }
    .mobile-nav-panel.active { transform: translateY(0); }

    .mob-nav-content { display: flex; flex-direction: column; gap: 5px; }
    .mob-link-main { font-size: 28px; font-weight: 900; color: #fff; text-decoration: none; padding: 15px 0; letter-spacing: -1px; border-bottom: 1px solid rgba(255,255,255,0.05); }
    
    .mob-accordion { border-bottom: 1px solid rgba(255,255,255,0.05); }
    .mob-acc-trigger { width: 100%; background: none; border: none; text-align: left; font-size: 28px; font-weight: 900; color: #fff; padding: 15px 0; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; letter-spacing: -1px; }
    .mob-acc-trigger::after { content: "+"; font-size: 32px; font-weight: 400; color: var(--h-violet); transition: transform 0.3s ease; }
    .mob-accordion.open .mob-acc-trigger::after { transform: rotate(45deg); }
    .mob-accordion.open .mob-acc-trigger { color: var(--h-violet); }
    
    .mob-acc-content { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; }
    .mob-accordion.open .mob-acc-content { max-height: 250px; padding: 0 0 20px 15px; }
    .mob-acc-content a { display: block; font-size: 18px; font-weight: 600; color: rgba(255,255,255,0.7); text-decoration: none; padding: 12px 0; }

    .mob-nav-footer { margin-top: auto; padding-top: 30px; }
    .btn-mob-contact { display: block; width: 100%; background: #fff; color: #13082B; text-align: center; padding: 20px; border-radius: 20px; font-size: 18px; font-weight: 900; text-decoration: none; text-transform: uppercase;}
  }

  body.menu-open { overflow: hidden; touch-action: none; }
</style>

<div id="mob-overlay"></div>

<header class="site-header" id="mainHeader">
  <div class="header-inner">
    <a href="index.html" class="brand">
      <img src="assets/logo-inside-fan-media.png" alt="INSIDE">
      <span id="brand-text">INSIDE FAN MEDIA</span>
    </a>

    <div class="pc-nav-container">
      <nav class="pc-nav">
        <ul>
          <li><a href="index.html">Accueil</a></li>
          <li><a href="Live.html">Le QG Live</a></li>
          <li class="has-dropdown">
            <a href="Inside-star-ac.html">Inside Star Ac</a>
            <div class="dropdown">
              <a href="Nommes.html">Les Nommés</a>
              <a href="Academie.html">L'Académie</a>
            </div>
          </li>
          <li class="has-dropdown">
            <a href="Inside-dals.html">Inside DALS</a>
            <div class="dropdown">
              <a href="Casting.html">Le Casting</a>
              <a href="Classement.html">Classement</a>
            </div>
          </li>
          <li><a href="a-propos.html">À propos</a></li>
        </ul>
      </nav>
    </div>
    
    <a href="Contact.html" class="btn-contact">Contact</a>

    <button id="burger" aria-label="Ouvrir le menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<nav class="mobile-nav-panel">
  <div class="mob-nav-content">
    <a href="index.html" class="mob-link-main">Accueil</a>
    <a href="Live.html" class="mob-link-main" style="color: #00A6FF;">Le QG Live</a>
    
    <div class="mob-accordion">
      <button class="mob-acc-trigger" type="button">Inside Star Ac</button>
      <div class="mob-acc-content">
        <a href="Inside-star-ac.html">Le Hub</a>
        <a href="Nommes.html">Les Nommés</a>
        <a href="Academie.html">L'Académie</a>
      </div>
    </div>

    <div class="mob-accordion">
      <button class="mob-acc-trigger" type="button">Inside DALS</button>
      <div class="mob-acc-content">
        <a href="Inside-dals.html">Le Hub</a>
        <a href="Casting.html">Le Casting</a>
        <a href="Classement.html">Classement</a>
      </div>
    </div>

    <a href="a-propos.html" class="mob-link-main">À propos de nous</a>
  </div>
  
  <div class="mob-nav-footer">
    <a href="Contact.html" class="btn-mob-contact">Nous contacter</a>
  </div>
</nav>
`;
document.getElementById('header-placeholder').innerHTML = headerContent;