document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // НАСТРОЙКИ - ИЗМЕНИТЕ ЗДЕСЬ
    // ============================================
    
    // 1. URL фоновой картинки
    const backgroundImageUrl = 'c7282763286b46051cc59d22a4e5c8f2.jpg';
    
    // 2. Количество снежинок (меньше для мобильных)
    const snowflakeCount = window.innerWidth < 768 ? 40 : 80;
    
    // 3. Скорость снега
    const snowSpeed = 5;
    
    // ============================================
    
    // Элементы страницы
    const video = document.getElementById('newYearVideo');
    const backgroundImage = document.getElementById('backgroundImage');
    const snowflakesContainer = document.getElementById('snowflakes');
    
    // Переменные для управления снегом
    let snowflakes = [];
    let animationId = null;
    
    // Установка фонового изображения
    backgroundImage.style.backgroundImage = `url(${backgroundImageUrl})`;
    
    // Настройка видео для мобильных устройств
    function setupMobileVideo() {
        // Включаем инлайновое воспроизведение для iOS
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        
        // Предотвращаем полноэкранный режим по умолчанию на iOS
        video.setAttribute('x5-playsinline', '');
        video.setAttribute('x5-video-player-type', 'h5-page');
        
        // Автопауза при скрытии вкладки
        document.addEventListener('visibilitychange', function() {
            if (document.hidden && !video.paused) {
                video.pause();
            }
        });
    }
    
    // Автозапуск видео после взаимодействия (для мобильных)
    function setupVideoAutoplay() {
        let hasUserInteracted = false;
        
        const tryPlayVideo = () => {
            if (!hasUserInteracted) return;
            
            const playPromise = video.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Автовоспроизведение не удалось:", error);
                });
            }
        };
        
        // Отслеживаем любое взаимодействие пользователя
        document.addEventListener('touchstart', () => {
            hasUserInteracted = true;
            tryPlayVideo();
        }, { once: true });
        
        document.addEventListener('click', () => {
            hasUserInteracted = true;
            tryPlayVideo();
        }, { once: true });
    }
    
    // Создание снежинок (оптимизированная версия)
    function createSnowflakes() {
        snowflakesContainer.innerHTML = '';
        snowflakes = [];
        
        for (let i = 0; i < snowflakeCount; i++) {
            createSnowflake();
        }
    }
    
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        
        const size = Math.random() * 5 + 2; // Меньше для мобильных
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.top = `-10px`;
        snowflake.style.opacity = Math.random() * 0.6 + 0.3;
        
        // Для производительности на мобильных
        snowflake.style.willChange = 'transform, opacity';
        
        snowflakesContainer.appendChild(snowflake);
        
        snowflakes.push({
            element: snowflake,
            x: parseFloat(snowflake.style.left),
            y: -10,
            speed: Math.random() * 1.5 + 0.5,
            swing: Math.random() * 3 - 1.5,
            swingSpeed: Math.random() * 0.03 + 0.02
        });
    }
    
    // Оптимизированная анимация снега
    function animateSnow(timestamp) {
        const now = timestamp / 1000;
        
        for (let i = 0; i < snowflakes.length; i++) {
            const flake = snowflakes[i];
            
            flake.y += flake.speed * (snowSpeed / 5);
            flake.x += Math.sin(now * flake.swingSpeed) * flake.swing * 0.1;
            
            // Перемещаем снежинку наверх, если она упала
            if (flake.y > window.innerHeight + 10) {
                flake.y = -10;
                flake.x = Math.random() * 100;
            }
            
            // Обновляем позицию
            flake.element.style.transform = `translate(${flake.x}%, ${flake.y}px)`;
        }
        
        animationId = requestAnimationFrame(animateSnow);
    }
    
    // Остановка анимации при скрытии вкладки
    function setupVisibilityHandling() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (animationId) {
                    cancelAnimationFrame(animationId);
                    animationId = null;
                }
            } else if (!animationId) {
                animationId = requestAnimationFrame(animateSnow);
            }
        });
    }
    
    // Адаптация к изменению размера экрана
    function setupResizeHandling() {
        let resizeTimeout;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                createSnowflakes();
            }, 250);
        });
        
        // Обработка изменения ориентации
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                createSnowflakes();
                // Перезапускаем анимацию
                if (animationId) {
                    cancelAnimationFrame(animationId);
                }
                animationId = requestAnimationFrame(animateSnow);
            }, 300);
        });
    }
    
    // Инициализация
    function init() {
        console.log("Инициализация новогоднего сайта...");
        
        // Проверяем мобильное устройство
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            console.log("Мобильное устройство обнаружено");
            setupMobileVideo();
        }
        
        setupVideoAutoplay();
        createSnowflakes();
        animationId = requestAnimationFrame(animateSnow);
        setupVisibilityHandling();
        setupResizeHandling();
        
        // Информация для отладки
        console.log("Размер окна:", window.innerWidth, "x", window.innerHeight);
        console.log("Соотношение сторон экрана:", window.innerWidth / window.innerHeight);
        console.log("Пользовательский агент:", navigator.userAgent);
    }
    
    // Запуск
    init();
});