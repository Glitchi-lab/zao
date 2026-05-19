document.addEventListener('DOMContentLoaded', () => {
    // --- ЭЛЕМЕНТЫ МОДАЛЬНЫХ ОКНОН ---
    const overlay = document.getElementById('global-modal-overlay');
    const openButtons = document.querySelectorAll('[data-modal-target]');
    const closeButtons = document.querySelectorAll('.close-modal-btn');
    let activeModal = null;

    // --- ЭЛЕМЕНТЫ ФОРМЫ ОБРАТНОЙ СВЯЗИ ---
    const feedbackForm = document.getElementById('feedback-form');
    const topicSelect = document.getElementById('feedback-topic');
    const cafeteriaBlock = document.getElementById('dynamic-field-cafeteria');
    const foodToggle = document.getElementById('food-review-toggle');
    const foodInput = document.getElementById('food-name-input');
    const techBlock = document.getElementById('dynamic-field-tech');

    // --- ЭЛЕМЕНТЫ ПАНЕЛИ ДОСТУПНОСТИ И КОНСТРУКТОРА ---
    const fontSizeButtons = document.querySelectorAll('#font-size-group button');
    const spacingButtons = document.querySelectorAll('#spacing-group button');
    const themeButtons = document.querySelectorAll('#theme-group button');
    const imagesButtons = document.querySelectorAll('#images-group button');
    
    const siteThemeButtons = document.querySelectorAll('#site-theme-group button');
    const siteFontButtons = document.querySelectorAll('#site-font-group button');
    const resetAppearanceBtn = document.getElementById('reset-appearance-btn');
    
    const htmlElement = document.documentElement;

    // --- УПРАВЛЕНИЕ МОДАЛЬНЫМИ ОКНАМИ ---
    function openModal(modalId) {
        const targetModal = document.getElementById(modalId);
        if (!targetModal || !overlay) return;

        activeModal = targetModal;
        overlay.classList.remove('opacity-0', 'invisible');
        targetModal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');

        setTimeout(() => {
            targetModal.classList.remove('scale-95', 'opacity-0');
            targetModal.classList.add('scale-100', 'opacity-100');
        }, 10);
    }

    function closeModal() {
        if (!activeModal || !overlay) return;

        activeModal.classList.remove('scale-100', 'opacity-100');
        activeModal.classList.add('scale-95', 'opacity-0');

        setTimeout(() => {
            overlay.classList.add('opacity-0', 'invisible');
            activeModal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
            activeModal = null;
        }, 300);
    }

    openButtons.forEach(btn => {
        btn.addEventListener('click', () => openModal(btn.getAttribute('data-modal-target')));
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    if (overlay) {
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
    }

    window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && activeModal) closeModal(); });


    // --- ИНТЕРАКТИВНАЯ ЛОГИКА И ОТПРАВКА ФОРМЫ СВЯЗИ ---
    if (topicSelect) {
        topicSelect.addEventListener('change', () => {
            const val = topicSelect.value;
            if (val === 'cafeteria') {
                cafeteriaBlock?.classList.remove('hidden');
                techBlock?.classList.add('hidden');
            } else if (val === 'tech') {
                techBlock?.classList.remove('hidden');
                cafeteriaBlock?.classList.add('hidden');
            } else {
                cafeteriaBlock?.classList.add('hidden');
                techBlock?.classList.add('hidden');
            }
        });
    }

    if (foodToggle && foodInput) {
        foodToggle.addEventListener('change', () => {
            if (foodToggle.checked) {
                foodInput.classList.remove('hidden');
                foodInput.required = true;
            } else {
                foodInput.classList.add('hidden');
                foodInput.required = false;
                foodInput.value = '';
            }
        });
    }

    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const successState = document.getElementById('feedback-success-state');
            const ticketLabel = document.getElementById('ticket-number');

            if (successState && ticketLabel) {
                const randomTicket = Math.floor(1000 + Math.random() * 9000);
                ticketLabel.textContent = `#${randomTicket}`;

                feedbackForm.classList.add('hidden');
                successState.classList.remove('hidden');
                
                setTimeout(() => {
                    successState.classList.remove('scale-95', 'opacity-0');
                    successState.classList.add('scale-100', 'opacity-100');
                }, 10);

                setTimeout(() => {
                    closeModal();

                    setTimeout(() => {
                        feedbackForm.reset();
                        feedbackForm.classList.remove('hidden');
                        successState.classList.add('hidden', 'scale-95', 'opacity-0');
                        successState.classList.remove('scale-100', 'opacity-100');
                        cafeteriaBlock?.classList.add('hidden');
                        techBlock?.classList.add('hidden');
                        foodInput?.classList.add('hidden');
                    }, 300);
                }, 4000);
            }
        });
    }


    // --- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ КНОПОК ПАНЕЛЕЙ ---
    function toggleActiveBtn(buttons, clickedBtn) {
        buttons.forEach(btn => {
            btn.classList.remove('bg-gray-900', 'text-white', 'border-gray-900', 'ring-2', 'ring-offset-2', 'ring-black');
            btn.classList.add('bg-gray-50', 'border-gray-200', 'text-gray-700');
            if (btn.getAttribute('data-theme') === 'contrast') {
                btn.className = "px-2 py-2 bg-white border border-black text-black rounded-xl text-xs font-bold cursor-pointer transition-all";
            }
            if (btn.getAttribute('data-theme') === 'inverted') {
                btn.className = "px-2 py-2 bg-black border border-yellow-400 text-yellow-400 rounded-xl text-xs font-bold cursor-pointer transition-all";
            }
        });
        const themeAttr = clickedBtn.getAttribute('data-theme');
        if (themeAttr === 'inverted' || themeAttr === 'contrast') {
            clickedBtn.classList.add('ring-2', 'ring-offset-2', 'ring-black');
        } else {
            clickedBtn.classList.remove('bg-gray-50', 'border-gray-200', 'text-gray-700');
            clickedBtn.classList.add('bg-gray-900', 'text-white', 'border-gray-900');
        }
    }

    function toggleThemePanelBtn(buttons, clickedBtn) {
        buttons.forEach(btn => {
            btn.className = "px-3 py-2 bg-gray-50 border border-gray-200 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-100 cursor-pointer transition-all";
        });
        clickedBtn.className = "px-3 py-2 bg-gray-900 text-white rounded-xl text-xs font-semibold cursor-pointer transition-all";
    }


    // --- ПАНЕЛЬ ДОСТУПНОСТИ СЛАБОВИДЯЩИХ (С СОХРАНЕНИЕМ) ---
    if (fontSizeButtons.length > 0) {
        fontSizeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                toggleActiveBtn(fontSizeButtons, btn);
                const size = btn.getAttribute('data-size');
                localStorage.setItem('acc-font-size', size);
                applyFontSize(size);
            });
        });
    }

    function applyFontSize(size) {
        htmlElement.classList.remove('font-size-md', 'font-size-lg');
        if (size !== 'sm') htmlElement.classList.add(`font-size-${size}`);
    }

    if (spacingButtons.length > 0) {
        spacingButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                toggleActiveBtn(spacingButtons, btn);
                const spacing = btn.getAttribute('data-spacing');
                localStorage.setItem('acc-spacing', spacing);
                applySpacing(spacing);
            });
        });
    }

    function applySpacing(spacing) {
        if (spacing === 'lg') document.body.classList.add('spacing-lg');
        else document.body.classList.remove('spacing-lg');
    }

    if (themeButtons.length > 0) {
        themeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                toggleActiveBtn(themeButtons, btn);
                const theme = btn.getAttribute('data-theme');
                localStorage.setItem('acc-theme', theme);
                applyAccTheme(theme);
            });
        });
    }

    function applyAccTheme(theme) {
        document.body.classList.remove('theme-contrast', 'theme-inverted');
        if (theme !== 'default') document.body.classList.add(`theme-${theme}`);
    }

    if (imagesButtons.length > 0) {
        imagesButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                toggleActiveBtn(imagesButtons, btn);
                const images = btn.getAttribute('data-images');
                localStorage.setItem('acc-images', images);
                applyImages(images);
            });
        });
    }

    function applyImages(images) {
        if (images === 'hide') document.body.classList.add('hide-images');
        else document.body.classList.remove('hide-images');
    }


    // --- CONSTRUCTOR ВНЕШНЕГО ВИДА (С СОХРАНЕНИЕМ) ---
    if (siteThemeButtons.length > 0) {
        siteThemeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                toggleThemePanelBtn(siteThemeButtons, btn);
                const themeValue = btn.getAttribute('data-site-theme');
                localStorage.setItem('site-theme', themeValue);
                applySiteTheme(themeValue);
            });
        });
    }

    function applySiteTheme(theme) {
        htmlElement.classList.remove('site-theme-dark', 'site-theme-sepia');
        if (theme !== 'light') htmlElement.classList.add(`site-theme-${theme}`);
    }

    if (siteFontButtons.length > 0) {
        siteFontButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                toggleThemePanelBtn(siteFontButtons, btn);
                const fontValue = btn.getAttribute('data-site-font');
                localStorage.setItem('site-font', fontValue);
                applySiteFont(fontValue);
            });
        });
    }

    function applySiteFont(font) {
        if (font === 'serif') htmlElement.classList.add('site-font-serif');
        else htmlElement.classList.remove('site-font-serif');
    }

    if (resetAppearanceBtn) {
        resetAppearanceBtn.addEventListener('click', () => {
            localStorage.removeItem('site-theme');
            localStorage.removeItem('site-font');
            htmlElement.classList.remove('site-theme-dark', 'site-theme-sepia', 'site-font-serif');
            
            const defaultThemeBtn = document.querySelector('[data-site-theme="light"]');
            const defaultFontBtn = document.querySelector('[data-site-font="sans"]');
            if (defaultThemeBtn) toggleThemePanelBtn(siteThemeButtons, defaultThemeBtn);
            if (defaultFontBtn) toggleThemePanelBtn(siteFontButtons, defaultFontBtn);
        });
    }


    // --- СИНХРОНИЗАЦИЯ НАСТРОЕК ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ---
    function loadSavedSettings() {
        const savedFontSize = localStorage.getItem('acc-font-size') || 'sm';
        const savedSpacing = localStorage.getItem('acc-spacing') || 'normal';
        const savedAccTheme = localStorage.getItem('acc-theme') || 'default';
        const savedImages = localStorage.getItem('acc-images') || 'show';
        
        const savedSiteTheme = localStorage.getItem('site-theme') || 'light';
        const savedSiteFont = localStorage.getItem('site-font') || 'sans';

        applyFontSize(savedFontSize);
        applySpacing(savedSpacing);
        applyAccTheme(savedAccTheme);
        applyImages(savedImages);
        applySiteTheme(savedSiteTheme);
        applySiteFont(savedSiteFont);

        const activeFontSizeBtn = document.querySelector(`[data-size="${savedFontSize}"]`);
        const activeSpacingBtn = document.querySelector(`[data-spacing="${savedSpacing}"]`);
        const activeAccThemeBtn = document.querySelector(`[data-theme="${savedAccTheme}"]`);
        const activeImagesBtn = document.querySelector(`[data-images="${savedImages}"]`);
        
        if (activeFontSizeBtn) toggleActiveBtn(fontSizeButtons, activeFontSizeBtn);
        if (activeSpacingBtn) toggleActiveBtn(spacingButtons, activeSpacingBtn);
        if (activeAccThemeBtn) toggleActiveBtn(themeButtons, activeAccThemeBtn);
        if (activeImagesBtn) toggleActiveBtn(imagesButtons, activeImagesBtn);

        const activeSiteThemeBtn = document.querySelector(`[data-site-theme="${savedSiteTheme}"]`);
        const activeSiteFontBtn = document.querySelector(`[data-site-font="${savedSiteFont}"]`);
        
        if (activeSiteThemeBtn) toggleThemePanelBtn(siteThemeButtons, activeSiteThemeBtn);
        if (activeSiteFontBtn) toggleThemePanelBtn(siteFontButtons, activeSiteFontBtn);
    }

    loadSavedSettings();
});
