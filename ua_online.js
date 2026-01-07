(function () {
    'use strict';

    const NAME = 'UA+ Online';

    function waitLampa(cb) {
        if (window.Lampa) cb();
        else setTimeout(() => waitLampa(cb), 500);
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
                {
                    title: 'UAKino (UA)',
                    onSelect: () => open('https://uakino.best/?s=', title)
                },
                {
                    title: 'UASerials (UA)',
                    onSelect: () => open('https://uaserials.com/?s=', title)
                },
                {
                    title: 'HDrezka (UA/RU)',
                    onSelect: () => open(
                        'https://hdrezka.ag/search/?do=search&subaction=search&q=',
                        title
                    )
                }
            ]
        });
    }

    function init() {
        if (!window.Lampa || !Lampa.Listener || !Lampa.Template) return;

        // Регіструємо шаблон один раз
        Lampa.Template.add('ua_online_btn',
            '<div class="button selector ua-online">' +
                '<div class="button__icon">▶</div>' +
                '<div class="button__text">' + NAME + '</div>' +
            '</div>'
        );

        Lampa.Listener.follow('full', function (e) {
            if (!e || !e.title || !e.buttons) return;

            // Захист від дубляжу
            if (e.buttons.find('.ua-online').length) return;

            const btn = Lampa.Template.get('ua_online_btn');

            btn.on('hover:enter', function () {
                menu(e.title);
            });

            e.buttons.append(btn);
        });
    }

    waitLampa(init);
})();

