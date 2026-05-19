document.addEventListener("DOMContentLoaded", () => {
    const mainToggleBtn = document.getElementById('mainToggleBtn');
    const arrowSvg = document.getElementById('arrowSvg');

    const socialDropdown = document.getElementById('socialDropdown');
    const socialPanel = document.getElementById('socialPanel');

    const contactsDropdown = document.getElementById('contactsDropdown');
    const contactsPanel = document.getElementById('contactsPanel');

    const contactsText = document.getElementById('contactsText');
    const socialText = document.getElementById('socialText');

    if (mainToggleBtn && arrowSvg && socialDropdown && contactsDropdown) {
        mainToggleBtn.addEventListener('click', () => {
            // Сдвигаем текст
            contactsText.classList.toggle('-translate-x-[250px]');
            contactsText.classList.toggle('translate-y-[40px]');

            socialText.classList.toggle('translate-x-[-140px]');
            socialText.classList.toggle('translate-y-[50px]');


            // Сдвигаем кнопку
            mainToggleBtn.classList.toggle('translate-x-[-154px]');

            // Переключаем разворот стрелки
            arrowSvg.classList.toggle('rotate-y-180');

            // Переключаем видимость панели соцсетей
            socialDropdown.classList.toggle('opacity-0');
            socialPanel.classList.toggle('opacity-0');

            // Переключаем видимость панели контактов
            contactsDropdown.classList.toggle('opacity-0');
            contactsPanel.classList.toggle('opacity-0');
        });
    }
});
