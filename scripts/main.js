/************************************************************
 *                                                          *
 *           COLOQUE SEU CÓDIGO AQUI EM BAIXO               *
 *                                                          *
 ************************************************************/
if(navigator.serviceWorker) {

  navigator.serviceWorker.register('./sw.js').then(function () {
    console.log('Service Worker registrado!!!');
  }).catch(function () {
    console.log('Service Worker deu pau :(');
  });
}