const CACHE_NAME = 'tfa-cache-v2';
const STATIC_CACHE = 'tfa-static-v2';
const DYNAMIC_CACHE = 'tfa-dynamic-v2';

// Cache essential files and all icons on install
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/style.css',
  '/assets/css/plugins.css',
  '/assets/js/script.js',
  '/assets/js/theme.js',
  '/assets/js/plugins.js',
  '/public/images/Logo TFA - Final-08.png',
  // Lineal Icons
  '/assets/img/icons/lineal/adjust.svg',
  '/assets/img/icons/lineal/agenda.svg',
  '/assets/img/icons/lineal/analytics.svg',
  '/assets/img/icons/lineal/award-2.svg',
  '/assets/img/icons/lineal/award.svg',
  '/assets/img/icons/lineal/badge.svg',
  '/assets/img/icons/lineal/balance.svg',
  '/assets/img/icons/lineal/bar-chart.svg',
  '/assets/img/icons/lineal/barcode.svg',
  '/assets/img/icons/lineal/bell.svg',
  '/assets/img/icons/lineal/box.svg',
  '/assets/img/icons/lineal/briefcase-2.svg',
  '/assets/img/icons/lineal/briefcase.svg',
  '/assets/img/icons/lineal/browser-2.svg',
  '/assets/img/icons/lineal/browser.svg',
  '/assets/img/icons/lineal/brush.svg',
  '/assets/img/icons/lineal/bucket.svg',
  '/assets/img/icons/lineal/cake.svg',
  '/assets/img/icons/lineal/calculator.svg',
  '/assets/img/icons/lineal/calendar.svg',
  '/assets/img/icons/lineal/certificate.svg',
  '/assets/img/icons/lineal/chat-2.svg',
  '/assets/img/icons/lineal/chat.svg',
  '/assets/img/icons/lineal/check-2.svg',
  '/assets/img/icons/lineal/check-list.svg',
  '/assets/img/icons/lineal/check.svg',
  '/assets/img/icons/lineal/clipboard.svg',
  '/assets/img/icons/lineal/clock-2.svg',
  '/assets/img/icons/lineal/clock-3.svg',
  '/assets/img/icons/lineal/clock.svg',
  '/assets/img/icons/lineal/cloud-computing-2.svg',
  '/assets/img/icons/lineal/cloud-computing-3.svg',
  '/assets/img/icons/lineal/cloud-computing.svg',
  '/assets/img/icons/lineal/coffee-cup.svg',
  '/assets/img/icons/lineal/coin.svg',
  '/assets/img/icons/lineal/compass.svg',
  '/assets/img/icons/lineal/computer.svg',
  '/assets/img/icons/lineal/controller-2.svg',
  '/assets/img/icons/lineal/controller.svg',
  '/assets/img/icons/lineal/crayons.svg',
  '/assets/img/icons/lineal/crop.svg',
  '/assets/img/icons/lineal/design.svg',
  '/assets/img/icons/lineal/directions.svg',
  '/assets/img/icons/lineal/discount-tag.svg',
  '/assets/img/icons/lineal/download.svg',
  '/assets/img/icons/lineal/earth.svg',
  '/assets/img/icons/lineal/edit-text.svg',
  '/assets/img/icons/lineal/email-2.svg',
  '/assets/img/icons/lineal/email-3.svg',
  '/assets/img/icons/lineal/email.svg',
  '/assets/img/icons/lineal/exchange.svg',
  '/assets/img/icons/lineal/expand.svg',
  '/assets/img/icons/lineal/fax.svg',
  '/assets/img/icons/lineal/files.svg',
  '/assets/img/icons/lineal/fullscreen.svg',
  '/assets/img/icons/lineal/geolocalization.svg',
  '/assets/img/icons/lineal/gift.svg',
  '/assets/img/icons/lineal/group-2.svg',
  '/assets/img/icons/lineal/group.svg',
  '/assets/img/icons/lineal/growth.svg',
  '/assets/img/icons/lineal/handshake.svg',
  '/assets/img/icons/lineal/headphone-2.svg',
  '/assets/img/icons/lineal/headphone.svg',
  '/assets/img/icons/lineal/heart.svg',
  '/assets/img/icons/lineal/home.svg',
  '/assets/img/icons/lineal/hourglass.svg',
  '/assets/img/icons/lineal/house.svg',
  '/assets/img/icons/lineal/id-card.svg',
  '/assets/img/icons/lineal/insurance.svg',
  '/assets/img/icons/lineal/invoice.svg',
  '/assets/img/icons/lineal/laptop.svg',
  '/assets/img/icons/lineal/levels.svg',
  '/assets/img/icons/lineal/light-bulb.svg',
  '/assets/img/icons/lineal/link.svg',
  '/assets/img/icons/lineal/list.svg',
  '/assets/img/icons/lineal/loading.svg',
  '/assets/img/icons/lineal/lock.svg',
  '/assets/img/icons/lineal/login.svg',
  '/assets/img/icons/lineal/logout.svg',
  '/assets/img/icons/lineal/loss.svg',
  '/assets/img/icons/lineal/loyalty.svg',
  '/assets/img/icons/lineal/map.svg',
  '/assets/img/icons/lineal/maximize.svg',
  '/assets/img/icons/lineal/medal.svg',
  '/assets/img/icons/lineal/meeting.svg',
  '/assets/img/icons/lineal/megaphone.svg',
  '/assets/img/icons/lineal/menu.svg',
  '/assets/img/icons/lineal/microphone.svg',
  '/assets/img/icons/lineal/minimize.svg',
  '/assets/img/icons/lineal/money.svg',
  '/assets/img/icons/lineal/music.svg',
  '/assets/img/icons/lineal/networking-2.svg',
  '/assets/img/icons/lineal/networking.svg',
  '/assets/img/icons/lineal/open.svg',
  '/assets/img/icons/lineal/padlock.svg',
  '/assets/img/icons/lineal/paint-roller.svg',
  '/assets/img/icons/lineal/paper-plane.svg',
  '/assets/img/icons/lineal/paper.svg',
  '/assets/img/icons/lineal/password.svg',
  '/assets/img/icons/lineal/photo-camera.svg',
  '/assets/img/icons/lineal/picture.svg',
  '/assets/img/icons/lineal/pictures.svg',
  '/assets/img/icons/lineal/pie-chart-2.svg',
  '/assets/img/icons/lineal/pie-chart.svg',
  '/assets/img/icons/lineal/pin-2.svg',
  '/assets/img/icons/lineal/pin.svg',
  '/assets/img/icons/lineal/plan.svg',
  '/assets/img/icons/lineal/price-tag.svg',
  '/assets/img/icons/lineal/printer.svg',
  '/assets/img/icons/lineal/profits.svg',
  '/assets/img/icons/lineal/puzzle-2.svg',
  '/assets/img/icons/lineal/puzzle.svg',
  '/assets/img/icons/lineal/ranking.svg',
  '/assets/img/icons/lineal/refresh.svg',
  '/assets/img/icons/lineal/rocket.svg',
  '/assets/img/icons/lineal/savings.svg',
  '/assets/img/icons/lineal/scale.svg',
  '/assets/img/icons/lineal/scroll-2.svg',
  '/assets/img/icons/lineal/scroll.svg',
  '/assets/img/icons/lineal/search-2.svg',
  '/assets/img/icons/lineal/search.svg',
  '/assets/img/icons/lineal/server.svg',
  '/assets/img/icons/lineal/settings-2.svg',
  '/assets/img/icons/lineal/settings-3.svg',
  '/assets/img/icons/lineal/settings.svg',
  '/assets/img/icons/lineal/shield-2.svg',
  '/assets/img/icons/lineal/shield.svg',
  '/assets/img/icons/lineal/shop-2.svg',
  '/assets/img/icons/lineal/shop.svg',
  '/assets/img/icons/lineal/shope-3.svg',
  '/assets/img/icons/lineal/shopping-basket.svg',
  '/assets/img/icons/lineal/shopping-cart.svg',
  '/assets/img/icons/lineal/show.svg',
  '/assets/img/icons/lineal/sitemap.svg',
  '/assets/img/icons/lineal/smartphone-2.svg',
  '/assets/img/icons/lineal/smartphone-3.svg',
  '/assets/img/icons/lineal/smartphone-4.svg',
  '/assets/img/icons/lineal/smartphone.svg',
  '/assets/img/icons/lineal/smartwatch.svg',
  '/assets/img/icons/lineal/speedometer.svg',
  '/assets/img/icons/lineal/square.svg',
  '/assets/img/icons/lineal/stars.svg',
  '/assets/img/icons/lineal/startup.svg',
  '/assets/img/icons/lineal/statistics.svg',
  '/assets/img/icons/lineal/sticker.svg',
  '/assets/img/icons/lineal/target-2.svg',
  '/assets/img/icons/lineal/target.svg',
  '/assets/img/icons/lineal/team.svg',
  '/assets/img/icons/lineal/telemarketer.svg',
  '/assets/img/icons/lineal/telephone-2.svg',
  '/assets/img/icons/lineal/telephone-3.svg',
  '/assets/img/icons/lineal/telephone.svg',
  '/assets/img/icons/lineal/television.svg',
  '/assets/img/icons/lineal/tie.svg',
  '/assets/img/icons/lineal/tools.svg',
  '/assets/img/icons/lineal/touch-screen.svg',
  '/assets/img/icons/lineal/truck.svg',
  '/assets/img/icons/lineal/upload.svg',
  '/assets/img/icons/lineal/user.svg',
  '/assets/img/icons/lineal/video-2.svg',
  '/assets/img/icons/lineal/video-camera.svg',
  '/assets/img/icons/lineal/video-editing.svg',
  '/assets/img/icons/lineal/video.svg',
  '/assets/img/icons/lineal/wallet.svg',
  '/assets/img/icons/lineal/watercolor.svg',
  '/assets/img/icons/lineal/web.svg',
  '/assets/img/icons/lineal/workflow.svg',
  // Solid Icons
  '/assets/img/icons/solid/3d.svg',
  '/assets/img/icons/solid/alarm.svg',
  '/assets/img/icons/solid/audience.svg',
  '/assets/img/icons/solid/badge.svg',
  '/assets/img/icons/solid/bar-chart-2.svg',
  '/assets/img/icons/solid/bar-chart.svg',
  '/assets/img/icons/solid/bell.svg',
  '/assets/img/icons/solid/briefcase.svg',
  '/assets/img/icons/solid/bucket.svg',
  '/assets/img/icons/solid/building.svg',
  '/assets/img/icons/solid/bulb.svg',
  '/assets/img/icons/solid/bullhorn.svg',
  '/assets/img/icons/solid/calendar.svg',
  '/assets/img/icons/solid/camera.svg',
  '/assets/img/icons/solid/chatting-2.svg',
  '/assets/img/icons/solid/chatting.svg',
  '/assets/img/icons/solid/checked.svg',
  '/assets/img/icons/solid/clipboard.svg',
  '/assets/img/icons/solid/cloud-download.svg',
  '/assets/img/icons/solid/cloud-group.svg',
  '/assets/img/icons/solid/cloud-network-2.svg',
  '/assets/img/icons/solid/cloud-network.svg',
  '/assets/img/icons/solid/cloud-transfer.svg',
  '/assets/img/icons/solid/code.svg',
  '/assets/img/icons/solid/coffee-cup.svg',
  '/assets/img/icons/solid/coin-decrease.svg',
  '/assets/img/icons/solid/coin-lock.svg',
  '/assets/img/icons/solid/coin-reload.svg',
  '/assets/img/icons/solid/coin-rise.svg',
  '/assets/img/icons/solid/coin.svg',
  '/assets/img/icons/solid/compare.svg',
  '/assets/img/icons/solid/computer.svg',
  '/assets/img/icons/solid/conference.svg',
  '/assets/img/icons/solid/content.svg',
  '/assets/img/icons/solid/controls-2.svg',
  '/assets/img/icons/solid/controls.svg',
  '/assets/img/icons/solid/crop.svg',
  '/assets/img/icons/solid/crosshair.svg',
  '/assets/img/icons/solid/currency.svg',
  '/assets/img/icons/solid/deal.svg',
  '/assets/img/icons/solid/delivery-box.svg',
  '/assets/img/icons/solid/devices.svg',
  '/assets/img/icons/solid/director.svg',
  '/assets/img/icons/solid/discussion.svg',
  '/assets/img/icons/solid/dot.svg',
  '/assets/img/icons/solid/double-click.svg',
  '/assets/img/icons/solid/e-commerce.svg',
  '/assets/img/icons/solid/edit-2.svg',
  '/assets/img/icons/solid/edit.svg',
  '/assets/img/icons/solid/email-2.svg',
  '/assets/img/icons/solid/emails.svg',
  '/assets/img/icons/solid/employees.svg',
  '/assets/img/icons/solid/feather.svg',
  '/assets/img/icons/solid/gamepad.svg',
  '/assets/img/icons/solid/gears.svg',
  '/assets/img/icons/solid/globe-2.svg',
  '/assets/img/icons/solid/graph.svg',
  '/assets/img/icons/solid/headphone.svg',
  '/assets/img/icons/solid/health-insurance.svg',
  '/assets/img/icons/solid/image.svg',
  '/assets/img/icons/solid/images.svg',
  '/assets/img/icons/solid/infographic.svg',
  '/assets/img/icons/solid/lamp.svg',
  '/assets/img/icons/solid/layers.svg',
  '/assets/img/icons/solid/layout-2.svg',
  '/assets/img/icons/solid/layout-3.svg',
  '/assets/img/icons/solid/layout.svg',
  '/assets/img/icons/solid/like.svg',
  '/assets/img/icons/solid/link.svg',
  '/assets/img/icons/solid/list.svg',
  '/assets/img/icons/solid/lock.svg',
  '/assets/img/icons/solid/love.svg',
  '/assets/img/icons/solid/marker.svg',
  '/assets/img/icons/solid/mask.svg',
  '/assets/img/icons/solid/medal.svg',
  '/assets/img/icons/solid/monitor.svg',
  '/assets/img/icons/solid/navigation.svg',
  '/assets/img/icons/solid/network.svg',
  '/assets/img/icons/solid/note.svg',
  '/assets/img/icons/solid/paint.svg',
  '/assets/img/icons/solid/paper-plane.svg',
  '/assets/img/icons/solid/partnership.svg',
  '/assets/img/icons/solid/pen-tool.svg',
  '/assets/img/icons/solid/pie-chart.svg',
  '/assets/img/icons/solid/pin.svg',
  '/assets/img/icons/solid/plane.svg',
  '/assets/img/icons/solid/price-tag.svg',
  '/assets/img/icons/solid/printer.svg',
  '/assets/img/icons/solid/push-cart.svg',
  '/assets/img/icons/solid/puzzle.svg',
  '/assets/img/icons/solid/rocket.svg',
  '/assets/img/icons/solid/roller.svg',
  '/assets/img/icons/solid/rotary.svg',
  '/assets/img/icons/solid/safe.svg',
  '/assets/img/icons/solid/script.svg',
  '/assets/img/icons/solid/search.svg',
  '/assets/img/icons/solid/secure.svg',
  '/assets/img/icons/solid/selected.svg',
  '/assets/img/icons/solid/seo-2.svg',
  '/assets/img/icons/solid/seo.svg',
  '/assets/img/icons/solid/server.svg',
  '/assets/img/icons/solid/setting.svg',
  '/assets/img/icons/solid/share.svg',
  '/assets/img/icons/solid/sharing.svg',
  '/assets/img/icons/solid/shipment.svg',
  '/assets/img/icons/solid/shopping-bag.svg',
  '/assets/img/icons/solid/shopping-basket.svg',
  '/assets/img/icons/solid/shopping-cart.svg',
  '/assets/img/icons/solid/smartphone.svg',
  '/assets/img/icons/solid/supermarket.svg',
  '/assets/img/icons/solid/synchronize.svg',
  '/assets/img/icons/solid/target.svg',
  '/assets/img/icons/solid/team.svg',
  '/assets/img/icons/solid/toggle.svg',
  '/assets/img/icons/solid/touchscreen.svg',
  '/assets/img/icons/solid/transfer.svg',
  '/assets/img/icons/solid/travel-insurance.svg',
  '/assets/img/icons/solid/tv-screen.svg',
  '/assets/img/icons/solid/verify.svg',
  '/assets/img/icons/solid/video-chat.svg',
  '/assets/img/icons/solid/video-player.svg',
  '/assets/img/icons/solid/videocall-2.svg',
  '/assets/img/icons/solid/videocall.svg',
  '/assets/img/icons/solid/wallet.svg',
  '/assets/img/icons/solid/web-browser.svg',
  '/assets/img/icons/solid/web-programming.svg'
];

// Install event – cache essential files
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[ServiceWorker] Caching essential files');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event – clean up old caches
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('[ServiceWorker] Removing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event – Cache strategy: Cache first, then network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(request).then(cachedResponse => {
      // Return cached version if available
      if (cachedResponse) {
        return cachedResponse;
      }

      // Otherwise fetch from network
      return fetch(request).then(networkResponse => {
        // Don't cache if not a success response
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'error') {
          return networkResponse;
        }

        // Cache images, fonts, CSS, and JS files dynamically
        if (
          request.url.match(/\.(jpg|jpeg|png|gif|svg|webp|woff|woff2|ttf|eot|css|js)$/i)
        ) {
          const responseToCache = networkResponse.clone();
          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request, responseToCache);
          });
        }

        return networkResponse;
      }).catch(error => {
        console.error('[ServiceWorker] Fetch failed:', error);
        // Return a custom offline page or message if you have one
        throw error;
      });
    })
  );
});