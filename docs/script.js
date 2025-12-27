document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // НАСТРОЙКИ - ИЗМЕНИТЕ ЗДЕСЬ
    // ============================================
    
    // 1. URL фоновой картинки (можно использовать локальный файл или ссылку из интернета)
    const backgroundImageUrl = 'c7282763286b46051cc59d22a4e5c8f2.jpg';
    
    // 2. Количество снежинок (от 20 до 150)
    const snowflakeCount = 80;
    
    // 3. Скорость снега (от 1 до 10)
    const snowSpeed = 5;
    
    // ============================================
    // НЕ МЕНЯЙТЕ КОД НИЖЕ ЭТОЙ СТРОКИ
    // ============================================
    
    // Элементы страницы
    const video = document.getElementById('newYearVideo');
    const playBtn = document.getElementById('playBtn');
    const muteBtn = document.getElementById('muteBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const backgroundImage = document.getElementById('backgroundImage');
    const snowflakesContainer = document.getElementById('snowflakes');
    
    // Переменные для управления снегом
    let snowflakes = [];
    
    // Установка фонового изображения из настроек
    backgroundImage.style.backgroundImage = `url(${backgroundImageUrl})`;
    
    // Управление видео
    playBtn.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
    
    muteBtn.addEventListener('click', function() {
        if (video.muted) {
            video.muted = false;
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            video.muted = true;
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });
    
    fullscreenBtn.addEventListener('click', function() {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    });
    
    video.addEventListener('ended', function() {
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    });
    
    // Создание снежинок
    function createSnowflakes() {
        // Очищаем контейнер
        snowflakesContainer.innerHTML = '';
        snowflakes = [];
        
        // Создаем новые снежинки
        for (let i = 0; i < snowflakeCount; i++) {
            createSnowflake();
        }
    }
    
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        
        // Случайный размер от 3 до 10 пикселей
        const size = Math.random() * 7 + 3;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        
        // Случайная начальная позиция
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.top = `-10px`;
        
        // Случайная прозрачность
        snowflake.style.opacity = Math.random() * 0.7 + 0.3;
        
        // Добавляем снежинку в контейнер
        snowflakesContainer.appendChild(snowflake);
        
        // Сохраняем ссылку на снежинку и ее свойства
        const snowflakeObj = {
            element: snowflake,
            x: parseFloat(snowflake.style.left),
            y: -10,
            speed: Math.random() * 2 + 1,
            swing: Math.random() * 4 - 2, // Случайное боковое движение
            swingSpeed: Math.random() * 0.05 + 0.02,
            swingOffset: Math.random() * Math.PI * 2,
            size: size
        };
        
        snowflakes.push(snowflakeObj);
    }
    
    // Анимация снега
    function animateSnow() {
        const now = Date.now() / 1000;
        
        for (let i = 0; i < snowflakes.length; i++) {
            const snowflake = snowflakes[i];
            
            // Увеличиваем скорость падения в зависимости от настройки
            snowflake.y += snowflake.speed * (snowSpeed / 5);
            
            // Боковое движение (маятник)
            snowflake.x += Math.sin(now * snowflake.swingSpeed + snowflake.swingOffset) * snowflake.swing * 0.1;
            
            // Если снежинка упала за пределы экрана, перемещаем ее наверх
            if (snowflake.y > window.innerHeight + 10) {
                snowflake.y = -10;
                snowflake.x = Math.random() * 100;
            }
            
            // Если снежинка вышла за боковые границы, возвращаем ее
            if (snowflake.x < -5) snowflake.x = 101;
            if (snowflake.x > 101) snowflake.x = -5;
            
            // Применяем новые координаты
            snowflake.element.style.left = `${snowflake.x}%`;
            snowflake.element.style.top = `${snowflake.y}px`;
        }
        
        requestAnimationFrame(animateSnow);
    }
    
    // Инициализация снега
    createSnowflakes();
    animateSnow();
    
    // Обработка изменения размера окна
    window.addEventListener('resize', function() {
        // При изменении размера окна пересоздаем снежинки
        // чтобы они соответствовали новому размеру экрана
        createSnowflakes();
    });
    
    // Инструкция для пользователя в консоли
    console.log("=== НОВОГОДНИЙ САЙТ - ИНСТРУКЦИЯ ===");
    console.log("1. Чтобы заменить видео, поместите ваш видеофайл в ту же папку");
    console.log("   и переименуйте его в 'new-year-video.mp4'");
    console.log("");
    console.log("2. Чтобы изменить фон, откройте файл script.js и измените");
    console.log("   значение переменной backgroundImageUrl на строке 8");
    console.log("");
    console.log("3. Чтобы настроить снежинки, измените значения переменных:");
    console.log("   - snowflakeCount: количество снежинок (от 20 до 150)");
    console.log("   - snowSpeed: скорость падения снега (от 1 до 10)");
    console.log("");
    console.log("4. Для локального фонового изображения:");
    console.log("   - Поместите картинку в папку с сайтом");
    console.log("   - Укажите путь: 'backgroundImageUrl = 'ваш_файл.jpg''");
    console.log("================================");

        // ============================================
    // ОПТИМИЗАЦИЯ ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ
    // ============================================
    
    // Определяем мобильное устройство
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        console.log("Мобильное устройство обнаружено, применяем оптимизации...");
        
        // Автозапуск видео на мобильных (требуется взаимодействие пользователя)
        document.addEventListener('touchstart', function initVideo() {
            // На мобильных устройствах видео требует жеста пользователя для воспроизведения
            // Мы просто показываем пользователю, что нужно нажать на видео
            video.style.border = '3px solid #ff4081';
            
            // Удаляем обработчик после первого касания
            document.removeEventListener('touchstart', initVideo);
        }, { once: true });
        
        // Улучшенная обработка касаний для элементов управления
        const controlButtons = document.querySelectorAll('.control-btn');
        controlButtons.forEach(button => {
            button.addEventListener('touchstart', function(e) {
                e.preventDefault();
                this.style.transform = 'scale(0.95)';
                this.style.backgroundColor = 'rgba(255, 64, 129, 1)';
            });
            
            button.addEventListener('touchend', function(e) {
                e.preventDefault();
                this.style.transform = '';
                this.style.backgroundColor = '';
                
                // Симулируем клик после касания
                setTimeout(() => {
                    this.click();
                }, 50);
            });
        });
        
        // Предотвращение масштабирования при двойном касании на видео
        let lastTouchEnd = 0;
        video.addEventListener('touchend', function(event) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
        
        // Автоматическое отображение элементов управления на мобильных
        document.querySelector('.video-controls').style.opacity = '1';
        
        // Адаптивное количество снежинок для мобильных
        if (window.innerWidth < 768) {
            console.log("Уменьшаем количество снежинок для мобильных устройств...");
            // Можно динамически изменить snowflakeCount здесь, если нужно
        }
    }
    
    // Обработка изменения ориентации экрана
    window.addEventListener('orientationchange', function() {
        // Даем время на изменение ориентации
        setTimeout(function() {
            console.log("Ориентация изменена, пересоздаем снежинки...");
            createSnowflakes();
        }, 300);
    });
    
    // Оптимизация для медленных устройств
    let snowAnimationId;
    let lastFrameTime = 0;
    const frameInterval = 1000 / 30; // 30 FPS для мобильных
    
    function optimizedAnimateSnow(timestamp) {
        if (!lastFrameTime) lastFrameTime = timestamp;
        
        const elapsed = timestamp - lastFrameTime;
        
        if (elapsed > frameInterval) {
            const now = Date.now() / 1000;
            
            for (let i = 0; i < snowflakes.length; i++) {
                const snowflake = snowflakes[i];
                
                // Увеличиваем скорость падения
                snowflake.y += snowflake.speed * (snowSpeed / 5);
                
                // Боковое движение
                snowflake.x += Math.sin(now * snowflake.swingSpeed + snowflake.swingOffset) * snowflake.swing * 0.1;
                
                // Если снежинка упала за пределы экрана
                if (snowflake.y > window.innerHeight + 10) {
                    snowflake.y = -10;
                    snowflake.x = Math.random() * 100;
                }
                
                // Если снежинка вышла за боковые границы
                if (snowflake.x < -5) snowflake.x = 101;
                if (snowflake.x > 101) snowflake.x = -5;
                
                // Применяем новые координаты
                snowflake.element.style.left = `${snowflake.x}%`;
                snowflake.element.style.top = `${snowflake.y}px`;
            }
            
            lastFrameTime = timestamp - (elapsed % frameInterval);
        }
        
        snowAnimationId = requestAnimationFrame(optimizedAnimateSnow);
    }
    
    // Запускаем оптимизированную анимацию для мобильных
    if (isMobile) {
        snowAnimationId = requestAnimationFrame(optimizedAnimateSnow);
    } else {
        // Для десктопов используем стандартную анимацию
        function animateSnow() {
            const now = Date.now() / 1000;
            
            for (let i = 0; i < snowflakes.length; i++) {
                const snowflake = snowflakes[i];
                snowflake.y += snowflake.speed * (snowSpeed / 5);
                snowflake.x += Math.sin(now * snowflake.swingSpeed + snowflake.swingOffset) * snowflake.swing * 0.1;
                
                if (snowflake.y > window.innerHeight + 10) {
                    snowflake.y = -10;
                    snowflake.x = Math.random() * 100;
                }
                
                if (snowflake.x < -5) snowflake.x = 101;
                if (snowflake.x > 101) snowflake.x = -5;
                
                snowflake.element.style.left = `${snowflake.x}%`;
                snowflake.element.style.top = `${snowflake.y}px`;
            }
            
            requestAnimationFrame(animateSnow);
        }
        
        animateSnow();
    }
    
    // Остановка анимации при скрытии вкладки для экономии батареи
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            if (snowAnimationId) {
                cancelAnimationFrame(snowAnimationId);
                snowAnimationId = null;
            }
        } else {
            if (isMobile && !snowAnimationId) {
                snowAnimationId = requestAnimationFrame(optimizedAnimateSnow);
            }
        }
    });

});