document.addEventListener("DOMContentLoaded", () => {
    const toggleBtns = document.querySelectorAll('.toggleBtn');

    // Собираем все анимируемые элементы в один объект для удобства проверки
    const ui = {
        arrow: document.getElementById('arrowSvg'),
        socialDropdown: document.getElementById('socialDropdown'),
        socialPanel: document.getElementById('socialPanel'),
        contactsDropdown: document.getElementById('contactsDropdown'),
        contactsDropdownMobile: document.getElementById('contactsDropdownMobile'),
        contactsPanel: document.getElementById('contactsPanel'),
        contactsText: document.getElementById('contactsText'),
        socialText: document.getElementById('socialText')
    };

    // Безопасная проверка: запускаем логику, только если абсолютно все элементы найдены в DOM
    const allElementsExist = Object.values(ui).every(el => el !== null) && toggleBtns.length > 0;

    if (allElementsExist) {
        toggleBtns.forEach(singleBtn => {
            singleBtn.addEventListener('click', () => {

                // 1. Анимация текстовых блоков
                ui.contactsText.classList.toggle('-translate-x-[250px]');
                ui.contactsText.classList.toggle('translate-y-[40px]');

                ui.socialText.classList.toggle('translate-x-[-140px]');
                ui.socialText.classList.toggle('translate-y-[50px]');

                // 2. Управление позицией самих переключателей (десктоп / мобилка)
                if (toggleBtns[0]) toggleBtns[0].classList.toggle('translate-x-[-154px]');
                if (toggleBtns[1]) {
                    toggleBtns[1].classList.toggle('translate-y-[-125px]');
                    toggleBtns[1].classList.toggle('translate-x-[-243px]');
                }

                // 3. Поворот стрелки
                ui.arrow.classList.toggle('rotate-y-180');

                // 4. Переключение панелей
                const panels = [
                    ui.socialDropdown,
                    ui.socialPanel,
                    ui.contactsDropdown,
                    ui.contactsPanel
                ];

                panels.forEach(panel => {
                    panel.classList.toggle('opacity-0');
                });

                // 5. Особая анимация для мобильного меню контактов
                ui.contactsDropdownMobile.classList.toggle('opacity-0');
                ui.contactsDropdownMobile.classList.toggle('translate-x-[60px]');
                ui.contactsDropdownMobile.classList.toggle('translate-y-[-60px]');

                // 6. Смена svg при нажатии
                if (singleBtn === toggleBtns[1]) {
                    const firstSvg = singleBtn.querySelector('.icon-active');
                    const secondSvg = singleBtn.querySelector('.icon-hidden');

                    if (firstSvg && secondSvg) {
                        firstSvg.classList.toggle('hidden');
                        secondSvg.classList.toggle('hidden');
                    }
                }
            });
        });
    }
});
