function initMenu() {
    const burger = document.getElementById('burger');
    const panel = document.querySelector('.mobile-nav-panel');
    const overlay = document.getElementById('mob-overlay');

    if (!burger || !panel || !overlay) {
        setTimeout(initMenu, 100);
        return;
    }

    function toggleMenu() {
        const isOpen = panel.classList.toggle('active');
        burger.classList.toggle('open');
        overlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    burger.onclick = (e) => {
        e.preventDefault();
        toggleMenu();
    };

    overlay.onclick = () => {
        if (panel.classList.contains('active')) toggleMenu();
    };

    // Fermeture automatique sur n'importe quel lien cliqué
    const allLinks = document.querySelectorAll('.mobile-nav-panel a');
    allLinks.forEach(link => {
        link.onclick = () => {
            if (panel.classList.contains('active')) toggleMenu();
        };
    });
}
initMenu();
