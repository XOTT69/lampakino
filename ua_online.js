(function () {
    'use strict';

    const NAME = 'UA+ Online';

    // Чекаємо повну готовність Lampa
    function initPlugin() {
        if (!window.Lampa?.Listener || !Lampa.Template || !Lampa.Select || !Lampa.Activity) {
            setTimeout(initPlugin, 1000);
            return;
        }

        function open(url, title) {
            Lampa.Activity.push({
                component: 'browser',
                title: NAME,
                url: url + encodeURIComponent(title || '')
            });
        }

        function menu(title) {
            Lampa.Select.show({
                title: NAME,
                items: [
                    { title: 'UAKino (UA)', onSelect: () => open('https://uakino.best/?s=', title) },
                    { title: 'UASerials (UA)', onSelect: () => open('https://uaserials.com/?s=', title) },
                    { title: 'HDrezka (UA/RU)', onSelect: () => open('https://hdrezka.ag/search/?do=search&subaction=search&q=', title) }
                ]
            });
        }

        // Шаблон кнопки
        Lampa.Template.add('ua_online', `<div class="button selector ua-online">
            <div class="button__icon">🔍</div>
            <div class="button__text">${NAME}</div>
        </div>`);

        // Слухаємо екран деталей фільму/серіалу
        Lampa.Listener.follow('full', (e) => {
            if (!e?.object?.title && !e?.movie?.title) return;
            const title = e.object?.title || e.movie?.title || e.title || '';
            if (!title || e.buttons?.find('.ua-online').length) return;

            const btn = Lampa.Template.get('ua_online');
            btn.on('hover:enter', () => menu(title));
            e.buttons.append(btn);
        });

        console.log('UA+ Online plugin loaded'); // Для перевірки в консолі
    }

    // Запуск
    if (window.Lampa) initPlugin();
    else {
        const observer = new MutationObserver(() => {
            if (window.Lampa) {
                observer.disconnect();
                initPlugin();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
})();
