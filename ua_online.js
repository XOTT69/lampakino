(function() {
    'use strict';
    
    const NAME = 'UA+ Online 🔍';
    const SOURCES = [
        {name: 'UAKino', url: 'https://uakino.best/?s='},
        {name: 'UASerials', url: 'https://uaserials.com/?s='},
        {name: 'HDrezka', url: 'https://hdrezka.ag/search/?do=search&subaction=search&q='}
    ];

    function createButton(title) {
        const btn = $(`
            <div class="button selector ua-online" style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4); margin-left: 5px;">
                <div class="button__icon">🔍</div>
                <div class="button__text">${NAME}</div>
            </div>
        `);

        btn.on('hover:enter', () => {
            const items = SOURCES.map(s => ({
                title: s.name,
                onSelect: () => Lampa.Activity.push({
                    component: 'browser',
                    title: `${s.name}: ${title}`,
                    url: s.url + encodeURIComponent(title)
                })
            }));
            
            Lampa.Select.show({
                title: `${NAME}: "${title}"`,
                items: items
            });
        });

        return btn;
    }

    function addButton() {
        // Шукаємо екран фільму + кнопки
        const movieScreen = $('.view--movie, .full-start, [data-controller="full"]');
        if (movieScreen.length) {
            const title = $('.info__title, .full-info__title, h1').first().text().trim() || 
                         $('.movie--title, .item__name').first().text().trim();
            
            if (title && !$('.ua-online').length) {
                const buttonsContainer = $('.buttons, .view--buttons, .full-buttons, .button:eq(-1)').parent();
                if (buttonsContainer.length) {
                    buttonsContainer.append(createButton(title));
                    Lampa.Noty.show(`UA+ кнопка для "${title}" ✅`);
                }
            }
        }
    }

    // 🔥 Головний observer - реагує на ЗМІНИ DOM
    const observer = new MutationObserver(() => {
        addButton();
    });

    // Запуск
    function start() {
        if (!Lampa || !$ || !Lampa.Activity || !Lampa.Select) {
            setTimeout(start, 500);
            return;
        }

        observer.observe(document.body, { childList: true, subtree: true });
        Lampa.Noty.show('UA+ Online ACTIVE!');
        
        // Початковий скан
        setTimeout(addButton, 1000);
        setInterval(addButton, 2000); // Періодичний скан
    }

    if (window.Lampa) start();
})();
