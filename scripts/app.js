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

var postsRef = database.ref().child('posts');


var transitionContent = document.querySelector('#transition-content'),
    fab = document.querySelector('#createPost'),
    loading = document.querySelector('.loading'),
    content = document.getElementById('content'),
    postsElement = content.querySelector('.posts');

var isNewChild = false;


/**
 * Create a new post
 */
fab.addEventListener('click', function (e) {

  var modal = new Modal({
    templateUrl: './views/createpost.html',
    fab: this
  });
  
  modal.promise.then(function (a) {
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
      modal.hide();
      isNewChild = true;
      new Toast('Post criado com sucesso!', 3000);
      return postsRef.push().set(post);
    });
  });
  
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
 * * * * *  Firebase Events * * * * * *
 **************************************/


/**
 * Called only once, check if there's posts on database
 */
postsRef.once('value').then(function (snapshot) {
  let posts = snapshot.val(),
      count = 0;
  
  for (let id in posts) count++;

  if(count == 0)
    postsElement.innerHTML = '<h3 class="empty-placeholder">Nenhum post criado</h3>'
});


/**
 * Listener for each child existing in the database
 */
postsRef.on('child_added', function (snapshot) {
  var post = snapshot.val();
  loading.classList.add('hide');
  addCard(post);
});



/**
 * create a new card with the post information
 *
 * @param {object} post Post information
 */
function addCard(post) {
  var emptyPlaceholder = document.querySelector('.empty-placeholder');

  if(emptyPlaceholder) emptyPlaceholder.remove();


  let cardWrapper = document.createElement('div');
  cardWrapper.setAttribute('class', 'card post-item');
  if(isNewChild) cardWrapper.classList.add('-highlight');
  cardWrapper.innerHTML = '' +
    '<h1 class="title">'+post.title+'</h1>'+
    '<div class="card-options">' +
    '<span class="time">'+moment(post.createdAt).fromNow()+'</span>' +
    '<span class="comments"></span>' +
    '</div>';

  postsElement.insertBefore(cardWrapper, postsElement.firstChild);
}
