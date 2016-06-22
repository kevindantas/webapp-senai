/**
 * @author Kevin Dantas
 * @description
 * App created as initial example for Progressive Web App
 */



// Initialize Firebase
var config = {
    apiKey: "AIzaSyDQ2eXga8rJS7Z0cLahthJ5ngUUjBaIxtI",
    authDomain: "teste-firebase-db82c.firebaseapp.com",
    databaseURL: "https://teste-firebase-db82c.firebaseio.com",
    storageBucket: "teste-firebase-db82c.appspot.com",
};

var app = firebase.initializeApp(config);
var database = app.database();

var chatRef = database.ref().child('chat');


var transitionContent = document.querySelector('#transition-content'),
    fab = document.querySelector('#sendChat'),
    loading = document.querySelector('.loading'),
    content = document.getElementById('content'),
    chatMessagesElement = content.querySelector('.chat-messages');

var isNewChild = false;


/**
 * Create a new chat
 */
fab.addEventListener('click', function (e) {
  e.preventDefault();

    var mensagemField = document.querySelector('#mensagem');

    if(localStorage.usuario) {
      var usuario = JSON.parse(localStorage.usuario);
    }

    var chat = {
      usuario: usuario ? usuario.email : null,
      deviceId: (usuario && usuario.deviceId) ? usuario.deviceId : null,
      mensagem: mensagemField.value,
      createdAt: new Date().toISOString(),
    };

    this.classList.toggle('animate-out');
    this.classList.add('animate-in');

    mensagemField.value = '';

    isNewChild = true;
    return chatRef.push().set(chat);
  
  
  document.querySelector('.overlay').onclick = function () {
    modal.hide();
  }
});





/**
 * Show search bar
 */
document.querySelector('.search-btn').addEventListener('click', function (e) {
  var element = this;
  element.parentNode.querySelector('.search-bar').classList.add('-active');

  var input = element.parentNode.querySelector('.search-bar input');

  input.value = '';
  input.focus();

  e.preventDefault();
});

/**
 * Hide search bar
 */
document.querySelector('.toolbar .back-btn').addEventListener('click', function (e) {
  var element = this;
  element.parentNode.parentNode.classList.remove('-active');
  e.preventDefault();
});



/**************************************
 * * * * * * *  Login * * * * * * * * 
 **************************************/

document.querySelector(".login-form").addEventListener('submit', function (e) {
  e.preventDefault();

 


  var email = document.querySelector('#email');


  if (email.value.indexOf('@') > 1) {
    var nome = email.value.split('@')[0];
  } else {
    email.classList.remove('animate-shake');
    setTimeout(function () {
      email.classList.add('animate-shake');
      email.classList.add('error');
    }, 10)
    
    return false;
  }


  document.querySelector('#login').classList.add('animate-out');

  var usuario = {
    nome: nome,
    email: email.value,
    deviceId: deviceId
  };

  localStorage.usuario = JSON.stringify(usuario);

});


if (localStorage.usuario) {
  document.querySelector('#login').classList.add('animate-out');
}








/**************************************
 * * * * *  Firebase Events * * * * * *
 **************************************/


/**
 * Called only once, check if there's chats on database
 */
chatRef.once('value').then(function (snapshot) {
  let chats = snapshot.val(),
      count = 0;
  
  for (let id in chats) count++;

  if(count == 0)
    chatMessagesElement.innerHTML = '<h3 class="empty-placeholder">Nenhum post criado</h3>'
});


/**
 * Listener for each child existing in the database
 */
chatRef.on('child_added', function (snapshot) {
  var chat = snapshot.val();
  loading.classList.add('hide');

  sendNotification(chat);

  addCard(chat);
});



function sendNotification (chat) {
  var usuario = localStorage.usuario ? JSON.parse(localStorage.usuario) : null;


  if(chat.deviceId && usuario.deviceId && usuario.deviceId != chat.deviceId){
    
    fetch('https://android.googleapis.com/gcm/send/'+usuario.deviceId, {
      method: 'post',
      Authorization: 'key=AIzaSyC7r9Fmkmo7pcVd9YwPUJDDNukfs5M2oA4',
      TTL: 60,
      'content-type': 'application/json'
    })
  }


}



/**
 * create a new card with the chat information
 *
 * @param {object} chat chat information
 */
function addCard(chat) {
  var emptyPlaceholder = document.querySelector('.empty-placeholder');

  if(emptyPlaceholder) emptyPlaceholder.remove();


  let cardWrapper = document.createElement('div');
  cardWrapper.setAttribute('class', 'card chat-message');
  if(isNewChild) cardWrapper.classList.add('-highlight');
  cardWrapper.innerHTML = '' +
    '<p class="message">'+chat.mensagem+'</p>'+
    '<div class="card-options">' +
    '<span class="time">'+moment(chat.createdAt).fromNow()+'</span>' +
    '<span class="comments"></span>' +
    '</div>';

  chatMessagesElement.appendChild(cardWrapper);
  // chatMessagesElement.insertBefore(cardWrapper, chatMessagesElement.firstChild);
}
