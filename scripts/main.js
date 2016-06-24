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
        console.log(subscription.endpoint);
    	deviceId = subscription.endpoint.replace(replaceUrl, '');
    	var usuario = JSON.parse(localStorage.usuario);

    	if(usuario) {
    		usuario.deviceId = deviceId;
    		localStorage.usuario = JSON.stringify(usuario);
    	}
    }).catch(function (err) {
    	console.log('Erro ', err);
    })


  }).catch(function (err) {
    console.log('Service Worker deu pau :(', err);
  });
}