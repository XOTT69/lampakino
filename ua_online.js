(function() {
    'use strict';
    
    console.log('UA+ Plugin START');
    
    const NAME = 'UA+ Online 🔍';
    
    function init() {
        console.log('UA+ init called, Lampa:', !!Lampa);
        
        if (!Lampa?.Listener?.follow) {
            console.log('No Lampa.Listener, retry...');
            setTimeout(init, 1000);
            return;
        }

        console.log('Lampa.Listener OK');

        Lampa.Template.add('ua_online_btn', 
            `<div class="button selector ua-online">
                <div class="button__icon">🔍</div>
                <div class="button__text">${NAME}</div>
            </div>`
        );

        // 🔥 ДІАГНОСТИКА: слухаємо ВСІ події
        Lampa.Listener.follow('full', e => {
            console.log('FULL event:', e);
            console.log('e.buttons:', e?.buttons);
            console.log('title:', e?.movie?.title || e?.title);
            
            const title = e?.movie?.title || e?.object?.title || e?.title || '';
            if (!title) {
                console.log('No title, skip');
                return;
            }
            
            if (e.buttons.find('.ua-online').length) {
                console.log('Button already exists');
                return;
            }

            console.log('Creating button...');
            const btn = Lampa.Template.get('ua_online_btn');
            
            // Спроба 1: стандартний append
            if (e.buttons) {
                e.buttons.append(btn);
                console.log('Button appended');
                Lampa.Noty.show('UA+ Button created!');
            } else {
                console.log('No e.buttons!');
            }
        });

        Lampa.Noty.show('UA+ Listener ready!');
        console.log('UA+ Listener set');
    }

    if (window.Lampa) init();
    else {
        console.log('Waiting Lampa...');
        const check = () => window.Lampa ? init() : setTimeout(check, 500);
        check();
    }
})();
