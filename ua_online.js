(function() {
    'use strict';
    
    const NAME = 'UA+ Online 🔍';
    const SOURCES = [
        {title: 'UAKino', url: 'https://uakino.best/?s='},
        {title: 'UASerials', url: 'https://uaserials.com/?s='},
        {title: 'HDrezka', url: 'https://hdrezka.ag/search/?do=search&subaction=search&q='}
    ];

    Lampa.Noty.show(`${NAME} шукає...`);

    // НЕЗНИЩИМий сканер — пробує ВСІ можливі способи
    function tryAddButton() {
        // 1. Витягуємо назву АГРЕСИВНО
        const possibleTitles = [];
        $('*').each(function() {
            const text = $(this).text().trim();
            if (text.length > 3 && text.length < 100 && 
                !$(this).hasClass('button') && !$(this).hasClass('menu')) {
                possibleTitles.push(text);
            }
        });
        
        const title = possibleTitles.find(t => t.length > 5) || '';
        
        if (!title || $('.ua-online').length) return;
        
        Lampa.Noty.show(`UA+ назва: "${title.substring(0,20)}"`);
        
        // 2. Шукаємо БУДЬ-ЯКИЙ контейнер з кнопками
        const buttonParents = [];
        $('.button, [class*="button"]').each(function() {
            buttonParents.push($(this).parent()[0]);
        });
        
        const container = $(buttonParents[0]);
        
        if (container.length && !container.find('.ua-online').length) {
            // 3. Створюємо кнопку
            const btn = $(`
                <div class="button selector ua-online" style="background: #ff4757; color: white; margin: 0 5px; padding: 8px 12px; border-radius: 4px;">
                    <div style="font-size: 20px;">🔍</div>
                    <div style="font-size: 12px;">${NAME}</div>
                </div>
            `);
            
            btn.on('hover:enter', () => {
                Lampa.Select.show({
                    title: `Пошук "${title}"`,
                    items: SOURCES.map(s => ({
                        title: s.title,
                        onSelect: () => Lampa.Activity.push({
                            component: 'browser',
                            title: `${s.title}: ${title}`,
                            url: s.url + encodeURIComponent(title)
                        })
                    }))
                });
            });
            
            container.append(btn);
            Lampa.Noty.show('🔥 UA+ КНОПКА ДОДАНА!');
        }
    }

    // 🔥 Скан кожні 1с + подіями
    setInterval(tryAddButton, 1000);
    
    // При кліку/навігації
    $(document).on('click hoverenter', tryAddButton);
    
    Lampa.Noty.show(`${NAME} сканування ACTIVE!`);
})();
