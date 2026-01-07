(function () {
    'use strict';
    if (!window.Lampa) return;

    const SOURCE_NAME = 'UA+ Online';

    function openSite(base, title) {
        const url = base + encodeURIComponent(title);
        Lampa.Activity.push({
            component: 'browser',
            url: url,
            title: SOURCE_NAME
        });
    }

    // Реєструємо "джерело"
    Lampa.Source.add({
        name: SOURCE_NAME,
        type: 'online',
        search: function (object, callback) {
            callback([{
                title: SOURCE_NAME,
                quality: 'HD',
                info: 'UA / RU',
                url: 'ua_online'
            }]);
        },
        play: function (object) {
            const title = object.movie.title || object.movie.name || '';
            Lampa.Select.show({
                title: SOURCE_NAME,
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
    });

})();
