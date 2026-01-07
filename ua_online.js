(function() {
    'use strict';
    
    const NAME = 'UA+ Online';
    const SOURCES = [
        {title: 'UAKino', url: 'https://uakino.best/?s='},
        {title: 'UASerials', url: 'https://uaserials.com/?s='},
        {title: 'HDrezka', url: 'https://hdrezka.ag/search/?do=search&subaction=search&q='}
    ];

    Lampa.Noty.show(`${NAME} v2.0 ✅`);

    function createPerfectButton(title) {
        const btn = $(`
            <div class="button selector ua-online" style="
                background: var(--button-active-bg, #333);
                color: var(--button-text, white);
                border-radius: 6px;
                margin-left: 4px;
                min-width: 80px;
            ">
                <div class="button__icon">🔍</div>
                <div class="button__text" style="font-size: 11px;">${NAME}</div>
            </div>
        `);
        
        btn.on('hover:enter', () => {
            Lampa.Select.show({
                title: `UA Пошук: "${title}"`,
                items: SOURCES.map(s => ({
                    title: s.title,
                    onSelect: () => {
                        const searchUrl = s.url + encodeURIComponent(title);
                        // 🔥 ВИПРАВЛЕННЯ: додаємо user-agent + реферер
                        Lampa.Activity.push({
                            component: 'browser',
                            title: `${s.title}: ${title}`,
                            url: searchUrl,
                            referer: 'https://google.com',
                            ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                        });
                    }
                }))
            });
        });
        
        return btn;
    }

    // 🔥 Універсальний сканер
    const scanner = setInterval(() => {
        // Знаходимо екран з довгим текстом (фільм)
        const longTexts = $('*').filter(function() {
            return $(this).text().trim().length > 10;
        }).map(function() {
            return $(this).text().trim();
        }).get();
        
        const title = longTexts.find(t => t.length > 8 && !t.includes('Серіал'));
        
        if (!title || $('.ua-online').length) return;
        
        // Знаходимо БІЛЯКУ кнопки і додаємо нашу
        const nearbyButtons = $('.button').parent();
        if (nearbyButtons.length) {
            nearbyButtons.first().append(createPerfectButton(title));
            clearInterval(scanner);
            Lampa.Noty.show(`🔥 ${NAME} готовий для "${title.substring(0,20)}"`);
        }
        
    }, 800);

})();
