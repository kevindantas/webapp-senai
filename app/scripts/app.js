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
 console.log(snapshot);
 var chat = snapshot.val();

 });




function setSendPostHandler () {
  document.querySelector('#sendPost').addEventListener('submit', function (e) {
    e.preventDefault();

    var element = this;

    var titleField = element.querySelector('.title'),
        descriptionField = element.querySelector('.description');

    var post = {
      title: titleField.value,
      description: descriptionField.value
    };
    
    new Toast('Post criado com sucesso!', 3000, {
      // className
    });
    // return postsRef.push().set(post);
  });
}




/**
 * Transition for create a new post page
 */
document.querySelector('#createPost').addEventListener('click', function (e) {
  this.classList.add('animate-out');

  // history.pushState({}, 'Cadastrar Pergunta', 'cadastrar');
  fetch('./views/create-post.html').then(function (data) {
    return data.text();
  }).then(function (html) {
    transitionContent = document.querySelector('#transition-content');
    transitionContent.innerHTML = html;
    transitionContent.classList.add('-active');
  }).then(function () {
    setSendPostHandler();
  })
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


