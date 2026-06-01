const CACHE_NAME = 'englishlab-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/ket_vocabulary.js',
  '/manifest.json',
  'https://cdn.tailwindcss.com'
];

// 安装事件
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// 激活事件
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 请求拦截
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 缓存中有则返回缓存
        if (response) {
          return response;
        }
        
        // 缓存中没有则请求网络
        return fetch(event.request).then(response => {
          // 检查是否为有效响应
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // 克隆响应
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        });
      })
      .catch(() => {
        // 网络和缓存都失败时，返回离线提示
        return new Response('离线状态，请检查网络连接', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      })
  );
});
