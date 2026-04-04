const headerContent = `
<style>
  /* CONFIGURATION INSIDE SIGNATURE 2026 - AVEC INDICATEUR DROPDOWN */
  :root {
    --h-violet: #7C4DFF;
    --h-violet-light: #9E7AFF;
    --h-dark: #1A1A1A;
    --h-glass-dark: rgba(18, 10, 42, 0.96); 
  }

  @keyframes logoPulse {
    0% { filter: drop-shadow(0 0 5px rgba(124, 77, 255, 0.2)); transform: scale(1); }
    50% { filter: drop-shadow(0 0 15px rgba(124, 77, 255, 0.5)); transform: scale(1.02); }
    100% { filter: drop-shadow(0 0 5px rgba(124, 77, 255, 0.2)); transform: scale(1); }
  }

  @keyframes gradientFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .site-header {
    position: sticky;
    top: 15px; 
    z-index: 9999; 
    height: 90px;
    display: flex;
    align-items: center;
    padding: 0 40px;
  }

  .header-inner {
    max-width: 1450px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 25px;
  }

  /* --- BRANDING --- */
  .brand {
    display: flex;
    align-items: center;
    gap: 15px;
    text-decoration: none;
    flex-shrink: 0;
  }

  .brand img { 
    height: 60px; 
    animation: logoPulse 4s infinite ease-in-out;
  }
  
  .brand span {
    font-weight: 900;
    font-size: 24px;
    text-transform: uppercase;
    letter-spacing: -1px;
    background: linear-gradient(90deg, var(--h-dark) 20%, var(--h-violet) 80%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* --- NAV CONTAINER (BARRE PILL) --- */
  .nav-container {
    display: flex;
    align-items: center;
    flex-grow: 1;
    position: relative;
    height: 64px;
    background: #ffffff;
    border-radius: 100px;
    box-shadow: 0 15px 45px rgba(124, 77, 255, 0.12);
    border: 1px solid rgba(124, 77, 255, 0.08);
  }

  .main-nav { width: 100%; height: 100%; }

  .main-nav ul {
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 0;
    padding: 0 20px;
    height: 100%;
  }

  .has-dropdown { 
    position: relative; 
    height: 100%;
    display: flex;
    align-items: center;
  }

  .main-nav a {
    text-decoration: none;
    color: var(--h-dark);
    font-weight: 800;
    font-size: 13.5px;
    text-transform: uppercase;
    padding: 0 15px;
    height: 100%;
    display: flex;
    align-items: center;
    transition: 0.3s ease;
    position: relative;
  }

  /* --- MINI ENCOCHE VIOLETTE (Indicateur de sous-menu) --- */
  .has-dropdown > a::after {
    content: "";
    position: absolute;
    bottom: 22px; /* Ajusté pour être pile au coin du mot */
    right: 5px;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-bottom: 4px solid var(--h-violet);
    transition: transform 0.3s ease;
  }

  .has-dropdown:hover > a::after {
    transform: rotate(180deg) translateY(-2px);
  }

  .main-nav a:hover {
    background: linear-gradient(90deg, var(--h-dark) 0%, var(--h-violet) 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientFlow 2s ease infinite;
  }

  /* --- DROPDOWN ALIGNÉ --- */
  .dropdown {
    position: absolute;
    top: calc(100% - 5px);
    left: 0;
    background: var(--h-glass-dark);
    backdrop-filter: blur(12px);
    min-width: 220px;
    padding: 10px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(15px);
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    border-radius: 20px;
    border: 1px solid rgba(124, 77, 255, 0.15);
    box-shadow: 0 25px 60px rgba(0,0,0,0.4);
  }

  .has-dropdown:hover .dropdown {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .dropdown a {
    color: rgba(255, 255, 255, 0.85) !important;
    padding: 14px 20px;
    font-size: 13px;
    font-weight: 700;
    border-radius: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-transform: none;
    background: transparent !important;
    -webkit-text-fill-color: initial !important;
    height: auto;
    width: 100%;
  }

  /* Flèche dans le menu noir */
  .dropdown a::after { 
    content: ""; 
    width: 6px;
    height: 6px;
    border-right: 2px solid rgba(255,255,255,0.4);
    border-top: 2px solid rgba(255,255,255,0.4);
    transform: rotate(45deg);
    transition: 0.3s; 
  }

  .dropdown a:hover {
    background: rgba(124, 77, 255, 0.12) !important;
    color: var(--h-violet-light) !important;
    padding-left: 25px;
  }
  .dropdown a:hover::after { border-color: var(--h-violet); opacity: 1; }

  /* --- BOUTON CONTACT --- */
  .btn-contact {
    background: var(--h-dark);
    color: #ffffff;
    height: 64px;
    padding: 0 35px;
    display: flex;
    align-items: center;
    font-weight: 900;
    text-transform: uppercase;
    font-size: 13px;
    text-decoration: none;
    border-radius: 100px;
    transition: all 0.3s ease;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }

  .btn-contact:hover {
    background: var(--h-violet);
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(124, 77, 255, 0.3);
  }

  /* BURGER MOBILE */
  #burger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; }
  #burger span { display: block; width: 25px; height: 3px; background: var(--h-dark); border-radius: 3px; }

  @media (max-width: 1200px) {
      /* AU LIEU DE CACHER LE CONTAINER, ON CACHE SON APPARENCE PC */
      .nav-container { 
        background: none !important; 
        box-shadow: none !important; 
        border: none !important;
        flex-grow: 0 !important; /* On l'empêche de prendre de la place */
        display: block !important; /* ON LE LAISSE EXISTER POUR QUE LE MENU DEDANS SOIT VISIBLE */
      }

      .btn-contact { display: none !important; }

      .site-header { 
        top: 0; 
        background: #fff; 
        padding: 0 20px; 
        height: 80px; 
        border-bottom: 1px solid #eee; 
      }

      #burger { display: flex !important; }
      .brand span { font-size: 18px; }

      /* On s'assure que le menu desktop ne s'affiche pas en plein milieu horizontalement */
      .main-nav:not(.active) {
        display: none; 
      }
    }
</style>

<header class="site-header">
  <div class="header-inner">
    
    <a href="index.html" class="brand">
      <img src="logo-inside-fan-media.png" alt="INSIDE">
      <span>INSIDE FAN MEDIA</span>
    </a>

    <div class="nav-container">
      <nav class="main-nav">
        <ul>
          <li><a href="index.html">Accueil</a></li>
          
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

          <li><a href="A propos.html">À propos</a></li>
        </ul>
      </nav>
    </div>

    <a href="Contact.html" class="btn-contact">Contact</a>

    <button id="burger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
`;

document.getElementById('header-placeholder').innerHTML = headerContent;
