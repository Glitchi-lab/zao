document.addEventListener('DOMContentLoaded', () => {
  const scrollTopBtn = document.getElementById('scroll-to-top');
  const anchorTop = document.getElementsByClassName('anchor-top')[0];

  if (!scrollTopBtn || !anchorTop) return;

  // Плавный скролл наверх
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Отслеживание положения якоря
  window.addEventListener('scroll', () => {
    const toolbarRect = anchorTop.getBoundingClientRect();

    // Если верхняя граница якоря скрылась за нижним краем экрана
    if (toolbarRect.top < 0) {
      // Плавно увеличиваем и показываем кнопку
      scrollTopBtn.classList.remove('scale-0', 'opacity-0');
      scrollTopBtn.classList.add('scale-100', 'opacity-100');
    } else {
      // Плавно уменьшаем и скрываем кнопку
      scrollTopBtn.classList.remove('scale-100', 'opacity-100');
      scrollTopBtn.classList.add('scale-0', 'opacity-0');
    }
  });
});
