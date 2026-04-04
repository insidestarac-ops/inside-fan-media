// On utilise une fonction pour s'assurer que le header est bien là
function initMenu() {
    const burger = document.getElementById('burger');
    const nav = document.querySelector('.main-nav');

    if (burger && nav) {
        // Événement clic sur le burger
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            nav.classList.toggle('active');
            // Active le flou du fond (défini dans ton CSS mobile)
            document.body.classList.toggle('menu-open');
        });

        // Ferme le menu quand on clique sur un lien
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    } else {
        // Si le header n'est pas encore là, on réessaie dans 100ms
        setTimeout(initMenu, 100);
    }
}

// Lancement de la détection
initMenu();
