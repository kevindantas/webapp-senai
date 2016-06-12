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
var storage = app.storage();

var postsRef = app.database().ref().child('posts');




/*document.querySelector('#send').addEventListener('click', function (e) {
  var post = {
    title: titleField.value,
    description: descriptionField.value
  };

  postsRef.push().set(post);
});*/


document.querySelector('#createPost').addEventListener('click', function (e) {
  this.classList.add('animate-out');
  fetch('./views/create-post.html').then(function (data) {
    return data.text();
  }).then(function (html) {
    document.querySelector('#content').innerHTML = html;
  })
});


/**
 * Show search bar
 */
document.querySelector('.search-btn').addEventListener('click', function (e) {
  var element = this;
  element.parentNode.querySelector('.search-bar').classList.add('-active');
  var input = element.parentNode.querySelector('.search-bar input')

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


postsRef.on('child_added', function (snapshot) {
  console.log(snapshot);
  var chat = snapshot.val();

});