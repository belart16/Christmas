document.addEventListener('DOMContentLoaded', function() {
    // Блокируем скролл тела при открытом модальном окне
    const originalBodyOverflow = document.body.style.overflow;
    // ============================================
    // МОДАЛЬНОЕ ОКНО
    // ============================================
    
    const modalOverlay = document.getElementById('modalOverlay');
    const modalButtons = [
        document.getElementById('btn1'),
        document.getElementById('btn2'),
        document.getElementById('btn3'),
        document.getElementById('btn4')
    ];
    
    // Проверяем, было ли окно уже показано в этой сессии
    const modalShown = sessionStorage.getItem('modalShown');
    
    // Функция показа модального окна
    function showModal() {
        modalOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
    }
    
    // Функция скрытия модального окна
    function hideModal() {
        modalOverlay.style.display = 'none';
        document.body.style.overflow = ''; // Возвращаем скролл
        sessionStorage.setItem('modalShown', 'true'); // Запоминаем что показали
    }
    
    // Добавляем обработчики на все кнопки
    modalButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', hideModal);
            
            // Добавляем анимацию при наведении
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
            
            // Для мобильных устройств
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            button.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        }
    });
    
    // Показываем модальное окно при загрузке, если еще не показывали
    if (!modalShown) {
        // Небольшая задержка для плавного появления
        setTimeout(showModal, 500);
    }
    
    // Закрытие по клику на фон
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            hideModalWithFireworks();
        }
    });
    
    // Закрытие по клавише ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
            hideModalWithFireworks();
        }
    });

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
    
    // Функция создания эффекта салюта
    function createFireworks() {
        const container = document.getElementById('fireworksContainer');
        const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'gold', 'silver'];
        
        // Создаем несколько салютов в разных местах экрана
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createSingleFirework(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight,
                    colors[Math.floor(Math.random() * colors.length)]
                );
            }, i * 200);
        }
        
        // Создаем дополнительные искры
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                createSpark();
            }, 1000 + i * 50);
        }
    }

    modalButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', hideModalWithFireworks);
            // ... остальные обработчики
        }
    });

     modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            hideModalWithFireworks();
        }
    });

     document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
            hideModalWithFireworks();
        }
    });

        // Функция для воспроизведения звука (если нужно)
    function playFireworkSound() {
        try {
            // Создаем звуковой контекст
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Создаем несколько звуков взрывов
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    createExplosionSound(audioContext);
                }, i * 200);
            }
        } catch (e) {
            console.log("Аудио не поддерживается или заблокировано");
        }
    }
    
    function createExplosionSound(audioContext) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.5);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
    }
    
      // Обновленная функция скрытия модального окна с салютом
    function hideModalWithFireworks() {
        // Воспроизводим звук салюта
        playFireworkSound();
        
        // Запускаем салют
        createFireworks();
        
        // Затем закрываем окно с небольшой задержкой
        setTimeout(() => {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = '';
            sessionStorage.setItem('modalShown', 'true');
        }, 500); // Задержка перед закрытием окна
    }
    
    // Создание одного салюта
    function createSingleFirework(x, y, color) {
        const container = document.getElementById('fireworksContainer');
        const particleCount = 50 + Math.floor(Math.random() * 30);
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = `firework-particle firework-${color}`;
            
            // Случайное направление и скорость
            const angle = Math.random() * Math.PI * 2;
            const velocity = 1 + Math.random() * 3;
            const distance = 50 + Math.random() * 150;
            
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            // Устанавливаем начальную позицию
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            
            // CSS переменные для анимации
            particle.style.setProperty('--startX', '0px');
            particle.style.setProperty('--startY', '0px');
            particle.style.setProperty('--endX', `${endX}px`);
            particle.style.setProperty('--endY', `${endY}px`);
            
            // Размер частицы
            const size = 3 + Math.random() * 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Анимация
            particle.style.animation = `fireworkExplode ${0.5 + Math.random() * 0.5}s ease-out forwards`;
            
            container.appendChild(particle);
            
            // Удаляем частицу после анимации
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1000);
        }
    }
    
    // Функция воспроизведения звука салюта
    function playFireworkSound() {
        try {
            // Создаем аудио элемент
            const audio = new Audio('firework.mp3'); // Имя вашего файла
            
            // Настройки аудио
            audio.volume = 0.5; // Громкость от 0 до 1
            audio.preload = 'auto'; // Предзагрузка
            
            // Пытаемся воспроизвести
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Не удалось воспроизвести звук салюта:", error);
                    // Пробуем альтернативный вариант
                    playAlternativeSound();
                });
            }
            
            // Автоматически удаляем аудио после воспроизведения
            audio.onended = function() {
                audio.remove();
            };
            
        } catch (e) {
            console.log("Ошибка воспроизведения звука:", e);
            // Пробуем альтернативный вариант
            playAlternativeSound();
        }
    }
    
    // Альтернативный звук (на случай если основной файл не загрузился)
    function playAlternativeSound() {
        try {
            // Создаем простой звук через Web Audio API
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Создаем несколько звуков взрывов
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    createExplosionSound(audioContext);
                }, i * 200);
            }
        } catch (e) {
            console.log("Альтернативный звук также не сработал");
        }
    }
    
    // Создание звука взрыва через Web Audio API
    function createExplosionSound(audioContext) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Настройки звука взрыва
        oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.5);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
    }


    // Создание искр
    function createSpark() {
        const container = document.getElementById('fireworksContainer');
        const spark = document.createElement('div');
        spark.className = 'firework-particle firework-gold';
        
        // Начальная позиция вверху экрана
        const startX = Math.random() * window.innerWidth;
        
        spark.style.left = `${startX}px`;
        spark.style.top = '0px';
        
        // Размер
        const size = 2 + Math.random() * 3;
        spark.style.width = `${size}px`;
        spark.style.height = `${size}px`;
        
        // Случайное смещение по X
        const sparkX = (Math.random() - 0.5) * 100;
        
        // CSS переменные для анимации искры
        spark.style.setProperty('--sparkX', `${sparkX}px`);
        spark.style.setProperty('--sparkY', `${window.innerHeight}px`);
        
        // Анимация падения
        const duration = 2 + Math.random() * 2;
        spark.style.animation = `fallSlow ${duration}s linear forwards`;
        
        container.appendChild(spark);
        
        // Удаляем искру после анимации
        setTimeout(() => {
            if (spark.parentNode) {
                spark.parentNode.removeChild(spark);
            }
        }, duration * 1000);
    }
    
    // Обновленная функция скрытия модального окна с салютом
    function hideModalWithFireworks() {
        // Сначала запускаем салют
        createFireworks();
        
        // Затем закрываем окно с небольшой задержкой
        setTimeout(() => {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = '';
            sessionStorage.setItem('modalShown', 'true');
        }, 500); // Задержка перед закрытием окна
    }

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
        }
        
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