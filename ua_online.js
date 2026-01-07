(function() {
    'use strict';
    
    const NAME = 'UA+ Online 🔍';
    const SOURCES = [
        {name: 'UAKino', url: 'https://uakino.best/?s='},
        {name: 'UASerials', url: 'https://uaserials.com/?s='},
        {name: 'HDrezka', url: 'https://hdrezka.ag/search/?do=search&subaction=search&q='}
    ];

    function init() {
        if (!Lampa?.Listener?.follow) {
            setTimeout(init, 500);
            return;
        }

        Lampa.Template.add('ua_online_btn', 
            `<div class="button selector ua-online" style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4)">
                <div class="button__icon">🔍</div>
                <div class="button__text">${NAME}</div>
            </div>`
        );

        Lampa.Listener.follow('full', e => {
            const title = e?.movie?.title || e?.object?.title || e?.title || '';
            if (!title || e.buttons.find('.ua-online').length) return;

            const btn = Lampa.Template.get('ua_online_btn');
            btn.on('hover:enter', () => {
                Lampa.Select.show({
                    title: `${NAME}: "${title}"`,
                    items: SOURCES.map(s => ({
                        title: s.name,
                        url: s.url + encodeURIComponent(title),
                        onSelect: () => Lampa.Activity.push({
                            component: 'browser',
                            title: `${s.name}: ${title}`,
                            url: s.url + encodeURIComponent(title)
                        })
                    }))
                });
            });
            e.buttons.append(btn);
        });

        Lampa.Noty.show('UA+ Online ✅ Готовий!');
        console.log('UA+ Online loaded');
    }

    if (window.Lampa) init();
})();
