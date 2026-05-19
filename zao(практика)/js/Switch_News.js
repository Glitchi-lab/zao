document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.card-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filterValue = button.getAttribute('data-filter');

      // 1. Управляем стилями переключателя (Segmented Control)
      filterButtons.forEach(btn => {
        // Сбрасываем все кнопки в неактивное состояние
        btn.classList.remove('bg-white', 'shadow-sm', 'text-text');
        btn.classList.add('text-text-light', 'hover:text-text');
      });
      // Активируем текущую нажатую кнопку
      button.classList.remove('text-text-light', 'hover:text-text');
      button.classList.add('bg-white', 'shadow-sm', 'text-text');

      // 2. Фильтрация карточек
      cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || filterValue === cardCategory) {
          // Плавно показываем карточку
          card.style.display = 'block';
          setTimeout(() => card.classList.add('active'), 50);
        } else {
          // Скрываем карточку
          card.style.display = 'none';
          card.classList.remove('active');
        }
      });
    });
  });
});