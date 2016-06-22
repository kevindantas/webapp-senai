/************************************************************
 *                                                          *
 *           COLOQUE SEU CÓDIGO AQUI EM BAIXO               *
 *                                                          *
 ************************************************************/
var deviceId;
if(navigator.serviceWorker) {

  navigator.serviceWorker.register('./sw.js').then(function (registration) {


    registration.pushManager.subscribe({
    	userVisibleOnly: true
    }).then(function (subscription) {
    	var replaceUrl = 'https://android.googleapis.com/gcm/send/';

    	deviceId = subscription.endpoint.replace(replaceUrl, '');
    }).catch(function (err) {
    	console.log('Erro ', err);
    })


  }).catch(function (err) {
    console.log('Service Worker deu pau :(', err);
  });
}