/**
 * Este arquivo é destinado somente para o código do seu Service Worker
 * Como já foi dito em aula, o Service Worker não tem acesso aos elementos que sua página HTML tem
 * então nele você só vai cuidar do que acontece com a sua rede
 */

/************************************************************
 *                                                          *
 *           COLOQUE SEU CÓDIGO AQUI EM BAIXO               *
 *                                                          *
 ************************************************************/
self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open('my-cache-v2').then(function (cache) {
			cache.addAll([
				'/',
				'styles/app.css',
				'scripts/app.js',
				'scripts/main.js',
				'scripts/feedback.js',
				'scripts/moment.js'
				]);
		})
	)
});


self.addEventListener('fetch', function(event) {
	caches.match(event.request).then(function (response) {
		if (response)return response;

		return fetch(event.request);
	})
});


self.addEventListener('push', function (event) {

	event.waitUntil(
		self.registration.showNotification('Nome do invividuo', {
			body: 'A mensagem do individuo',
			icon: 'images/webchat.png'
		})
	)
})