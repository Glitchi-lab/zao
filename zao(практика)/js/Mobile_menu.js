document.addEventListener('DOMContentLoaded', () => {
  const burgerBtn = document.getElementById('burger-btn');
  const drawerClose = document.getElementById('drawer-close');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerContent = mobileDrawer?.querySelector('.absolute.right-0');

  // Функции открытия/закрытия шторки
  function openDrawer() {
    mobileDrawer.classList.remove('opacity-0', 'pointer-events-none');
    drawerContent.classList.remove('translate-x-full');
    document.body.classList.add('overflow-hidden'); // Запрещаем скролл сайта под меню
  }

  function closeDrawer() {
    mobileDrawer.classList.add('opacity-0', 'pointer-events-none');
    drawerContent.classList.add('translate-x-full');
    document.body.classList.remove('overflow-hidden');
  }

  // Навешиваем события на элементы управления шторкой
  if (burgerBtn && mobileDrawer) {
    burgerBtn.addEventListener('click', openDrawer);
    drawerClose.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);

    // Закрываем меню при клике на любую ссылку
    mobileDrawer.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  // Логика работы мобильных выпадающих списков (аккордеонов)
  const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
  mobileDropdowns.forEach(dropdown => {
    const btn = dropdown.querySelector('.mobile-dropdown-btn');
    const content = dropdown.querySelector('.mobile-dropdown-content');
    const icon = btn.querySelector('i');

    btn.addEventListener('click', () => {
      const isOpen = dropdown.classList.contains('is-open');

      if (!isOpen) {
        dropdown.classList.add('is-open');
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
        icon.classList.add('text-primary');
      } else {
        dropdown.classList.remove('is-open');
        content.style.maxHeight = '0';
        icon.style.transform = 'rotate(0deg)';
        icon.classList.remove('text-primary');
      }
    });
  });
});