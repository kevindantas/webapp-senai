/**
 * @author Kevin Dantas
 * @description
 * App created as initial example for Progressive Web App
 */



// Initialize Firebase
var config = {
  apiKey: "AIzaSyCTubMzanl4JtO4zKkJzqC9m2cdEwLS984",
  authDomain: "webapp-senai.firebaseapp.com",
  databaseURL: "https://webapp-senai.firebaseio.com",
  storageBucket: "webapp-senai.appspot.com"
};

var app = firebase.initializeApp(config);
var database = app.database();
var storage = app.storage();

var postsRef = database.ref().child('posts');

 postsRef.on('child_added', function (snapshot) {
 var chat = snapshot.val();

 });


var transitionContent = document.querySelector('#transition-content'),
    fab = document.querySelector('#createPost'),
    loading = document.querySelector('.loading');



function setSendPostHandler () {
  document.querySelector('#sendPost').addEventListener('submit', function (e) {
    e.preventDefault();

    var element = this;

    var titleField = element.querySelector('.title'),
        descriptionField = element.querySelector('.description');

    var post = {
      title: titleField.value,
      description: descriptionField.value,
      createdAt: new Date().toISOString(),
      comments: []
    };

    fab.classList.toggle('animate-out');
    fab.classList.add('animate-in');
    transitionContent.classList.toggle('-active');
    new Toast('Post criado com sucesso!', 3000);
    return postsRef.push().set(post);
  });
}


/**
 * Transition for create a new post page
 */
fab.addEventListener('click', function (e) {
  this.classList.add('animate-out');

  // history.pushState({}, 'Cadastrar Pergunta', 'cadastrar');
  new Modal({
    templateUrl: './views/createpost.html',
    callback: setSendPostHandler
  });
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


var content = document.getElementById('content'),
    postsElement = content.querySelector('.posts');

postsRef.once('value').then(function (snapshot) {
  let posts = snapshot.val();
  loading.classList.add('hide');
  var count = 0;
  
  for (let id in posts) {
    let post = posts[id];

    let cardWrapper = document.createElement('div');
    cardWrapper.classList.add('card');
    cardWrapper.classList.add('post-item');
    cardWrapper.innerHTML = '' +
      '<h1 class="title">'+post.title+'</h1>'+
      '<div class="card-options">' +
        '<span class="time">'+moment(post.createdAt).fromNow()+'</span>' +
        '<span class="comments"></span>' +
      '</div>';
    count++;
    postsElement.appendChild(cardWrapper);
  }

  if(count == 0) {
    postsElement.innerHTML = '<h3>Nenhum post criado</h3>'
  }
});
