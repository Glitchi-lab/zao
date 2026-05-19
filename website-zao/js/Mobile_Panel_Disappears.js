const mobilePanel = document.getElementById('mobile-panel');
const footer = document.getElementById('footer');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Если футер виден — скрываем мобильную панель
      mobilePanel.style.opacity = '0';
      mobilePanel.style.pointerEvents = 'none';
      mobilePanel.style.transform = 'translateY(20px)';
    } else {
      // Если футер скрыт — показываем мобильную панель
      mobilePanel.style.opacity = '1';
      mobilePanel.style.pointerEvents = 'auto';
      mobilePanel.style.transform = 'translateY(0)';
    }
  });
}, {
  rootMargin: '0px 0px 50px 0px' // Мобильная панель начнет исчезать за 50px до футера
});

if (footer && mobilePanel) {
  observer.observe(footer);
}
