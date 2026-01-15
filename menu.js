// ===== MENU BURGER SIMPLE & FIABLE =====
const burger = document.getElementById('burger');
const nav = document.querySelector('.main-nav');

if (burger && nav) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
  });
}

// Ferme le menu quand on clique sur un lien
document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    nav.classList.remove('active');
  });
});
