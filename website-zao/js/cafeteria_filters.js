document.addEventListener('DOMContentLoaded', () => {
    // Конфигурация категорий меню
    const allCategories = [
        { id: 'breakfast', name: 'Завтрак' },
        { id: 'lunch', name: 'Обед' },
        { id: 'snacks', name: 'Закуски' },
        { id: 'drinks', name: 'Напитки' }
    ];

    let activeCategoryIds = ['all']; 
    let activeDay = getCurrentDayId(); // Автоопределение дня на ПК

    // DOM-элементы интерфейса
    const activeContainer = document.getElementById('active-categories');
    const modal = document.getElementById('categories-modal');
    const modalContent = modal.querySelector('.relative');
    const modalList = document.getElementById('modal-categories-list');
    const openBtn = document.getElementById('open-categories-modal');
    const closeBtn = document.getElementById('close-categories-modal');
    const overlay = document.getElementById('modal-overlay');
    
    const scrollTopBtn = document.getElementById('scroll-to-top');
    const mainContent = document.getElementById('main'); // Якорь для скролла наверх

    const searchInput = document.getElementById('search-input');
    const clearFiltersBtn = document.getElementById('clear-all-filters');
    const globalResetBtn = document.getElementById('global-reset-filters');
    const allergenCheckboxes = document.querySelectorAll('.allergen-checkbox');
    
    // Элементы управления ценой
    const sliderMin = document.getElementById('price-slider-min');
    const sliderMax = document.getElementById('price-slider-max');
    const inputMin = document.getElementById('price-input-min');
    const inputMax = document.getElementById('price-input-max');
    const labelMin = document.getElementById('current-min-label');
    const labelMax = document.getElementById('current-max-label');

    const dayButtons = document.querySelectorAll('.day-btn');

    if (openBtn && closeBtn && overlay) {
        openBtn.addEventListener('click', openModal);
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
    }

    function openModal() {
        renderModalCategories();
        modal.classList.remove('opacity-0', 'invisible');
        modalContent.classList.remove('translate-y-full');
    }

    function closeModal() {
        modal.classList.add('opacity-0', 'invisible');
        modalContent.classList.add('translate-y-full');
    }

    function renderModalCategories() {
        if (!modalList) return;
        modalList.innerHTML = '';
        const available = allCategories.filter(cat => !activeCategoryIds.includes(cat.id));

        if (available.length === 0) {
            modalList.innerHTML = '<p class="text-sm text-gray-400 py-2 w-full text-center">Все категории добавлены</p>';
            return;
        }

        available.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = "px-4 py-2 rounded-xl text-sm font-medium bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer flex items-center gap-1.5";
            btn.innerHTML = `
                <span>${cat.name}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-gray-400">
                    <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
            `;
            btn.addEventListener('click', () => {
                addCategory(cat.id);
                closeModal();
            });
            modalList.appendChild(btn);
        });
    }

    function updateMainPanel() {
        if (!activeContainer) return;
        activeContainer.innerHTML = '';

        const allBtn = document.createElement('button');
        const isAllActive = activeCategoryIds.includes('all');
        allBtn.className = `px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap cursor-pointer transition-all ${
            isAllActive ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
        }`;
        allBtn.textContent = 'Все товары';
        allBtn.addEventListener('click', () => selectCategory('all'));
        activeContainer.appendChild(allBtn);

        allCategories.forEach(cat => {
            if (activeCategoryIds.includes(cat.id)) {
                const isCatActive = activeCategoryIds.includes(cat.id) && !activeCategoryIds.includes('all');
                
                const chipWrapper = document.createElement('div');
                chipWrapper.className = `flex items-center rounded-xl border transition-all ${
                    isCatActive ? 'bg-gray-900 border-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`;
                
                const mainBtn = document.createElement('button');
                mainBtn.className = "pl-4 pr-2 py-2 text-sm font-medium whitespace-nowrap cursor-pointer rounded-l-xl";
                mainBtn.textContent = cat.name;
                mainBtn.addEventListener('click', () => selectCategory(cat.id));

                const removeBtn = document.createElement('button');
                removeBtn.className = `pr-3 pl-1 py-2 flex items-center justify-center cursor-pointer rounded-r-xl transition-colors ${
                    isCatActive ? 'text-white/70 hover:text-red-400' : 'text-gray-400 hover:text-red-500'
                }`;
                removeBtn.innerHTML = `
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                `;
                removeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    removeCategory(cat.id);
                });

                chipWrapper.appendChild(mainBtn);
                chipWrapper.appendChild(removeBtn);
                activeContainer.appendChild(chipWrapper);
            }
        });

        filterProducts();
    }

    function addCategory(id) {
        if (!activeCategoryIds.includes(id)) {
            if (activeCategoryIds.includes('all')) {
                activeCategoryIds = activeCategoryIds.filter(item => item !== 'all');
            }
            activeCategoryIds.push(id);
            updateMainPanel();
        }
    }

    function removeCategory(id) {
        activeCategoryIds = activeCategoryIds.filter(catId => catId !== id);
        if (activeCategoryIds.length === 0) {
            activeCategoryIds = ['all'];
        }
        updateMainPanel();
    }

    // Клик по категории на панели
    function selectCategory(id) {
        if (id === 'all') {
            activeCategoryIds = ['all'];
        } else {
            activeCategoryIds = [id];
        }
        updateMainPanel();
    }

    // Обработка кликов по дням недели
    dayButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            dayButtons.forEach(b => {
                b.className = "day-btn px-5 py-2.5 rounded-xl font-medium text-sm transition-colors text-text-light hover:bg-gray-50 whitespace-nowrap cursor-pointer";
            });
            btn.className = "day-btn px-5 py-2.5 rounded-xl font-medium text-sm transition-colors bg-primary text-white shadow-sm whitespace-nowrap cursor-pointer";
            activeDay = btn.getAttribute('data-day');
            filterProducts();
        });
    });

    // Синхронизация двойного слайдера цены
    function syncPriceFilters(src) {
        let minV = parseFloat(sliderMin.value);
        let maxV = parseFloat(sliderMax.value);

        if (src === 'input') {
            minV = parseFloat(inputMin.value) || 0;
            maxV = parseFloat(inputMax.value) || 15;
            if (minV > maxV) { let t = minV; minV = maxV; maxV = t; }
            sliderMin.value = minV;
            sliderMax.value = maxV;
        } else {
            if (minV > maxV) {
                if (src === 'min') sliderMax.value = minV;
                else sliderMin.value = maxV;
                minV = parseFloat(sliderMin.value);
                maxV = parseFloat(sliderMax.value);
            }
            inputMin.value = minV;
            inputMax.value = maxV;
        }

        labelMin.textContent = minV;
        labelMax.textContent = maxV;
        filterProducts();
    }

    if (sliderMin && sliderMax && inputMin && inputMax) {
        sliderMin.addEventListener('input', () => syncPriceFilters('min'));
        sliderMax.addEventListener('input', () => syncPriceFilters('max'));
        inputMin.addEventListener('change', () => syncPriceFilters('input'));
        inputMax.addEventListener('change', () => syncPriceFilters('input'));
    }

    if (searchInput) searchInput.addEventListener('input', filterProducts);
    allergenCheckboxes.forEach(checkbox => checkbox.addEventListener('change', filterProducts));

    // Главная функция комбинированной фильтрации каталога и запуска анимаций появления
    function filterProducts() {
        const cards = document.querySelectorAll('[data-category]');
        const noState = document.getElementById('no-products-state');
        
        const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const currentMinPrice = sliderMin ? parseFloat(sliderMin.value) : 0;
        const currentMaxPrice = sliderMax ? parseFloat(sliderMax.value) : Infinity;
        let visibleCount = 0;

        const activeAllergens = Array.from(allergenCheckboxes).filter(cb => cb.checked).map(cb => cb.value);

        cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardPrice = parseFloat(card.getAttribute('data-price') || '0');
            const cardAllergensStr = card.getAttribute('data-allergens') || '';
            const cardAllergens = cardAllergensStr.split(' ').filter(item => item !== '');
            const cardDaysStr = card.getAttribute('data-days') || '';
            const cardDays = cardDaysStr.split(' ').filter(item => item !== '');

            const titleElement = card.querySelector('h3');
            const cardTitle = titleElement ? titleElement.textContent.toLowerCase() : '';

            const matchesSearch = cardTitle.includes(searchQuery);
            const matchesCategory = activeCategoryIds.includes('all') || activeCategoryIds.includes(cardCategory);
            const matchesPrice = cardPrice >= currentMinPrice && cardPrice <= currentMaxPrice;
            const matchesDay = activeDay === 'all' || cardDays.includes(activeDay);

            let matchesAllergens = true;
            activeAllergens.forEach(allergen => {
                if (allergen === 'vegetarian') {
                    if (cardAllergens.includes('meat')) matchesAllergens = false;
                } else {
                    if (cardAllergens.includes(allergen)) matchesAllergens = false;
                }
            });

            // Триггер ваших CSS-анимаций (Гармонизация с reveal-item / reveal)
            if (matchesCategory && matchesSearch && matchesPrice && matchesAllergens && matchesDay) {
                // Показываем карточку: убираем скрытие и принудительно вешаем класс active
                card.classList.remove('is-hidden');
                
                // Микротаймаут гарантирует, что браузер успеет применить анимацию из точки смещения в 0
                setTimeout(() => {
                    card.classList.add('active');
                }, 10);
                
                visibleCount++;
            } else {
                // Скрываем карточку: вешаем is-hidden и гасим состояние active
                card.classList.remove('active');
                card.classList.add('is-hidden');
            }
        });

        if (noState) {
            if (visibleCount === 0) {
                noState.classList.remove('hidden');
                noState.classList.add('flex');
            } else {
                noState.classList.remove('flex');
                noState.classList.add('hidden');
            }
        }
    }

    function resetAllFilters() {
        activeCategoryIds = ['all'];
        activeDay = 'all';
        if (searchInput) searchInput.value = '';
        allergenCheckboxes.forEach(cb => cb.checked = false);
        
        dayButtons.forEach(b => b.className = "day-btn px-5 py-2.5 rounded-xl font-medium text-sm transition-colors text-text-light hover:bg-gray-50 whitespace-nowrap cursor-pointer");
        const defaultDayBtn = document.querySelector('[data-day="all"]');
        if (defaultDayBtn) defaultDayBtn.className = "day-btn px-5 py-2.5 rounded-xl font-medium text-sm transition-colors bg-primary text-white shadow-sm whitespace-nowrap cursor-pointer";

        if (sliderMin && sliderMax) {
            sliderMin.value = 0; sliderMax.value = 15;
            inputMin.value = 0; inputMax.value = 15;
            labelMin.textContent = 0; labelMax.textContent = 15;
        }
        
        updateMainPanel();
    }

    if (clearFiltersBtn) clearFiltersBtn.addEventListener('click', resetAllFilters);
    if (globalResetBtn) globalResetBtn.addEventListener('click', resetAllFilters);

    // Новая исправленная логика кнопки "Наверх" по ID вашего контейнера <main id="main">
    if (scrollTopBtn && mainContent) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', () => {
            const mainRect = mainContent.getBoundingClientRect();
            // Появляется сразу, как только верхняя граница main заходит за верхний край экрана (скрылся хедер)
            if (mainRect.top < 0) {
                scrollTopBtn.classList.remove('scale-0', 'opacity-0');
                scrollTopBtn.classList.add('scale-100', 'opacity-100');
            } else {
                scrollTopBtn.classList.remove('scale-100', 'opacity-100');
                scrollTopBtn.classList.add('scale-0', 'opacity-0');
            }
        });
    }

    // Логика автоопределения дня недели на ПК
    function getCurrentDayId() {
        const daysMap = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        const currentSystemDay = new Date().getDay(); 
        const systemDayId = daysMap[currentSystemDay];
        
        if (systemDayId === 'sat' || systemDayId === 'sun') return 'all';
        return systemDayId;
    }

    function initFilters() {
        const currentDayBtn = document.querySelector(`[data-day="${activeDay}"]`);
        const allDaysBtn = document.querySelector('[data-day="all"]');
        
        if (currentDayBtn && activeDay !== 'all') {
            if (allDaysBtn) {
                allDaysBtn.className = "day-btn px-5 py-2.5 rounded-xl font-medium text-sm transition-colors text-text-light hover:bg-gray-50 whitespace-nowrap cursor-pointer";
            }
            currentDayBtn.className = "day-btn px-5 py-2.5 rounded-xl font-medium text-sm transition-colors bg-primary text-white shadow-sm whitespace-nowrap cursor-pointer";
        } else {
            activeDay = 'all';
            if (allDaysBtn) {
                allDaysBtn.className = "day-btn px-5 py-2.5 rounded-xl font-medium text-sm transition-colors bg-primary text-white shadow-sm whitespace-nowrap cursor-pointer";
            }
        }
        
        updateMainPanel();
    }

    initFilters();
});
