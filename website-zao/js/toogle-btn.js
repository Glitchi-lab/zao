document.addEventListener("DOMContentLoaded", () => {
    // Находим ВСЕ кнопки с классом .toggleBtn
    const toggleBtns = document.querySelectorAll('.toggleBtn');

    const arrowSvg = document.getElementById('arrowSvg');
    const socialDropdown = document.getElementById('socialDropdown');
    const socialPanel = document.getElementById('socialPanel');
    const contactsDropdown = document.getElementById('contactsDropdown');
    const contactsDropdownMobile = document.getElementById('contactsDropdownMobile');
    const contactsPanel = document.getElementById('contactsPanel');
    const contactsText = document.getElementById('contactsText');
    const socialText = document.getElementById('socialText');

    // Проверяем, что кнопки найдены и остальные важные элементы существуют
    if (toggleBtns.length > 0 && arrowSvg && socialDropdown && contactsDropdown) {

        // Перебираем каждую кнопку из найденных
        toggleBtns.forEach(singleBtn => {

            // Вешаем клик на ТЕКУЩУЮ кнопку в цикле
            singleBtn.addEventListener('click', () => {

                // 1. Сдвигаем текст
                contactsText.classList.toggle('-translate-x-[250px]');
                contactsText.classList.toggle('translate-y-[40px]');

                socialText.classList.toggle('translate-x-[-140px]');
                socialText.classList.toggle('translate-y-[50px]');

                // Проверяем и двигаем первую кнопку
                if (toggleBtns[0]) {
                    toggleBtns[0].classList.toggle('translate-x-[-154px]');
                }

                // Проверяем и двигаем вторую кнопку
                if (toggleBtns[1]) {
                    toggleBtns[1].classList.toggle('translate-y-[-230px]');
                }


                // 3. Переключаем разворот стрелки
                arrowSvg.classList.toggle('rotate-y-180');

                // 4. Переключаем видимость панели соцсетей
                socialDropdown.classList.toggle('opacity-0');
                socialPanel.classList.toggle('opacity-0');

                // 5. Переключаем видимость панели контактов
                contactsDropdown.classList.toggle('opacity-0');
                contactsDropdownMobile.classList.toggle('opacity-0');
                contactsDropdownMobile.classList.toggle('translate-x-[60px]');
                contactsDropdownMobile.classList.toggle('translate-y-[-60px]');
                contactsPanel.classList.toggle('opacity-0');
            });
        });
    }
});
