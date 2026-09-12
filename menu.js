function initMenu() {
    const burger = document.getElementById('burger');
    const panel = document.querySelector('.mobile-nav-panel');
    const overlay = document.getElementById('mob-overlay');
    const header = document.getElementById('mainHeader');
    const brandText = document.getElementById('brand-text');

    if (!burger || !panel || !overlay) {
        setTimeout(initMenu, 100);
        return;
    }

    function toggleMenu() {
        const isOpen = panel.classList.toggle('active');
        burger.classList.toggle('open', isOpen);
        overlay.classList.toggle('active', isOpen);
        document.body.classList.toggle('menu-open', isOpen);

        if(isOpen) {
            header.style.background = 'transparent';
            header.style.borderBottom = 'none';
            if(brandText) brandText.style.background = 'none';
            if(brandText) brandText.style.color = '#fff';
            if(brandText) brandText.style.webkitTextFillColor = '#fff';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.borderBottom = '1px solid rgba(124,77,255,0.08)';
            if(brandText) brandText.style.background = 'linear-gradient(90deg, var(--h-dark) 20%, var(--h-violet) 80%)';
            if(brandText) brandText.style.webkitTextFillColor = 'transparent';
        }
    }

    burger.onclick = (e) => {
        e.preventDefault();
        toggleMenu();
    };

    overlay.onclick = () => {
        if (panel.classList.contains('active')) toggleMenu();
    };

    const accordions = document.querySelectorAll('.mob-accordion');
    accordions.forEach(acc => {
        const trigger = acc.querySelector('.mob-acc-trigger');
        trigger.onclick = () => {
            accordions.forEach(otherAcc => {
                if(otherAcc !== acc) otherAcc.classList.remove('open');
            });
            acc.classList.toggle('open');
        };
    });

    const allLinks = document.querySelectorAll('.mobile-nav-panel .mob-acc-content a, .mobile-nav-panel > .mob-nav-content > a, .btn-mob-contact');
    allLinks.forEach(link => {
        link.onclick = () => {
            if (panel.classList.contains('active')) toggleMenu();
        };
    });
}

// Support tactile pour les dropdowns desktop (tablettes en paysage)
function initTabletDropdowns() {
  if (window.matchMedia('(hover: none)').matches) {
    document.querySelectorAll('.has-dropdown > a').forEach(link => {
      link.addEventListener('click', function(e) {
        const dropdown = this.nextElementSibling;
        if (dropdown && !dropdown.classList.contains('force-open')) {
          e.preventDefault();
          document.querySelectorAll('.dropdown.force-open').forEach(d => d.classList.remove('force-open'));
          dropdown.classList.add('force-open');
        }
      });
    });
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.has-dropdown')) {
        document.querySelectorAll('.dropdown.force-open').forEach(d => d.classList.remove('force-open'));
      }
    });
  }
}

initMenu();
initTabletDropdowns();