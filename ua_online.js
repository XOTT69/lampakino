(function () {
    'use strict';

    if (!window.Lampa) return;

    const pluginName = 'UA+ Online';

    function openSite(base, title) {
        const query = encodeURIComponent(title);
        const url = base + query;
        Lampa.Activity.push({
            url: url,
            title: pluginName,
            component: 'browser'
        });
    }

    function showMenu(title) {
        Lampa.Select.show({
            title: 'UA+ Online',
            items: [
                {
                    title: 'UASerials',
                    onSelect: () => openSite('https://uaserials.com/?s=', title)
                },
                {
                    title: 'UAKino',
                    onSelect: () => openSite('https://uakino.best/?s=', title)
                },
                {
                    title: 'HDrezka',
                    onSelect: () => openSite('https://hdrezka.ag/search/?do=search&subaction=search&q=', title)
                }
            ]
        });
    }

    Lampa.Listener.follow('full', function (e) {
        if (!e || !e.title) return;

        Lampa.Template.add('ua_online_button',
            `<div class="button selector ua-online">
                <div class="button__icon">▶</div>
                <div class="button__text">UA+ Online</div>
            </div>`
        );

        const btn = Lampa.Template.get('ua_online_button');
        btn.on('hover:enter', () => showMenu(e.title));

        e.buttons.append(btn);
    });

})();
