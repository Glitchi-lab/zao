document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    const arrow = item.querySelector('.faq-arrow');

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('faq-open');

      // 1. Автоматически закрываем ВСЕ остальные открытые вкладки
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('faq-open')) {
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          const otherContent = otherItem.querySelector('.faq-content');
          const otherArrow = otherItem.querySelector('.faq-arrow');

          otherItem.classList.remove('faq-open');
          otherTrigger.setAttribute('aria-expanded', 'false');
          otherContent.style.maxHeight = '0';
          otherArrow.style.transform = 'rotate(0deg)';
        }
      });

      // 2. Переключаем состояние текущей вкладки
      if (!isOpen) {
        item.classList.add('faq-open');
        trigger.setAttribute('aria-expanded', 'true');
        // scrollHeight вычисляет точную высоту текста в пикселях динамически
        content.style.maxHeight = content.scrollHeight + 'px';
        arrow.style.transform = 'rotate(180deg)';
      } else {
        item.classList.remove('faq-open');
        trigger.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = '0';
        arrow.style.transform = 'rotate(0deg)';
      }
    });
  });
});