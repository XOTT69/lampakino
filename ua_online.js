(function() {
    'use strict';
    
    const NAME = 'UA+ Online';
    const INTERVAL = 1500; // скан кожні 1.5с
    
    const SOURCES = [
        {title: 'UAKino', url: 'https://uakino.best/?s='},
        {title: 'UASerials', url: 'https://uaserials.com/?s='},
        {title: 'HDrezka', url: 'https://hdrezka.ag/search/?do=search&subaction=search&q='}
    ];

    Lampa.Noty.show(`${NAME} активний!`);

    // Функція створення кнопки
    function createUAOnlineButton(title) {
        const btnHTML = `
            <div class="button selector ua-online" style="background: #ff4757; color: white; margin-left: 8px; border-radius: 6px;">
                <div class="button__icon">🔍</div>
                <div class="button__text">${NAME}</div>
            </div>
        `;
        
        const $btn = $(btnHTML);
        
        $btn.on('hover:enter', function() {
            const menuItems = SOURCES.map(source => ({
                title: source.title,
                onSelect: () => {
                    const searchUrl = source.url + encodeURIComponent(title);
                    Lampa.Activity.push({
                        component: 'browser',
                        title: `${source.title}: "${title}"`,
                        url: searchUrl
                    });
                }
            }));
            
            Lampa.Select.show({
                title: `${NAME}: Пошук "${title}"`,
                items: menuItems
            });
        });
        
        return $btn;
    }

    // Сканування DOM кожні INTERVAL ms
    setInterval(() => {
        // Шукаємо ЕКРАН ФІЛЬМУ
        const isMovieScreen = $('.view--movie, .full, .item-view, [class*="full"], [class*="movie-detail"]').length > 0;
        
        if (!isMovieScreen) return;
        
        // Витягуємо НАЗВУ
        let title = '';
        const titleSelectors = [
            '.info__title', '.full__title', '.movie__title', 
            '.item__name', 'h1', '.title', '[class*="title"]'
        ];
        
        for (let selector of titleSelectors) {
            const $titleEl = $(selector).first();
            if ($titleEl.length && $titleEl.text().trim()) {
                title = $titleEl.text().trim();
                break;
            }
        }
        
        if (!title || $('.ua-online').length) return;
        
        Lampa.Noty.show(`UA+ знайшов "${title}"`);
        
        // Шукаємо КНОПОЧКИ і додаємо нашу
        const buttonContainers = $('.buttons, .button-list, .actions, .view--buttons');
        
        if (buttonContainers.length) {
            const $container = buttonContainers.first();
            $container.append(createUAOnlineButton(title));
            Lampa.Noty.show('🔍 UA+ кнопка додана!');
        }
        
    }, INTERVAL);

    console.log(`${NAME} сканування запущено`);
})();
