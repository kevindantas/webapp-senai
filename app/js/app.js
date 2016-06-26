
setTimeout(_ => {
  new Toast('Cache completo');
}, 2000);

document.querySelector('.toggle-menu').addEventListener('click', function (e) {
  e.preventDefault();

  var mainMenu = document.querySelector('.main-menu');
  var overlay = document.querySelector('.overlay');

  mainMenu.classList.add('-active');
  overlay.classList.add('-active');
});
