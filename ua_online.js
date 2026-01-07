(function () {
    'use strict';
    if (!window.Lampa) return;

    // чекаємо, поки завантажиться Online Mod
    function waitOnlineMod(cb) {
        let t = setInterval(() => {
            if (Lampa.Extensions && Lampa.Extensions.get('online_mod')) {
                clearInterval(t);
                cb();
            }
        }, 300);
    }

    waitOnlineMod(function () {

        console.log('[UA Helper] loaded');

        // перехоплюємо результати джерел
        Lampa.Listener.follow('online_sources', function (e) {
            if (!e || !e.sources) return;

            // залишаємо тільки робочі та зрозумілі джерела
            e.sources = e.sources.filter(src => {
                if (!src.title) return false;

                const name = src.title.toLowerCase();

                // залишаємо HDrezka і UA
                if (name.includes('rezka')) return true;
                if (name.includes('ua')) return true;

                return false;
            });

        });

        // підсвічуємо UA
        Lampa.Listener.follow('online_choice', function (e) {
            if (!e || !e.source) return;

            const t = (e.source.title || '').toLowerCase();
            if (t.includes('ua')) {
                e.source.quality = 'UA';
            }
        });

    });

})();
