var smoothScroll = new SmoothScroll();

document.querySelector('.main-menu .html').addEventListener('click', function(e) {
	smoothScroll.scrollTo('#html')
});


document.querySelector('.main-menu .css').addEventListener('click', function(e) {
	smoothScroll.scrollTo('#css')
});


document.querySelector('.main-menu .js').addEventListener('click', function(e) {
	smoothScroll.scrollTo('#js')
});

document.querySelector('.main-menu .extras').addEventListener('click', function(e) {
	smoothScroll.scrollTo('#extras')
});