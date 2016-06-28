/**
 * 
 * @author Kevin Dantas Shih
 */
class Sidenav {

	/**
	 * 
	 * c
	 */
	constructor () {
		this.toggleButton = document.querySelector('.toggle-menu');
		this.sidenavEl = document.querySelector('.navbar .main-menu');
		this.sidenavUl = document.querySelector('.navbar .main-menu ul');


		this.startX = 0;
		this.currentX = 0;


		/**
		 * Use .bind(this) to enable the functions to access the class object instead of the element 
		 * used on the .addEventListener method
		 */
		this.showSidenav = this.showSidenav.bind(this);
		this.hideSidenav = this.hideSidenav.bind(this);
		this.onTransitionEnd = this.onTransitionEnd.bind(this);
		this.onTouchStart = this.onTouchStart.bind(this);
		this.onTouchMove = this.onTouchMove.bind(this);
		this.onTouchEnd = this.onTouchEnd.bind(this);
		this.update = this.update.bind(this);



		this.addEventListeners();
	}


	/**
	 * 
	 * 
	 */
	addEventListeners () {
		this.toggleButton.addEventListener('click', this.showSidenav);
		// this.sidenavEl.addEventListener('click', this.hideSidenav);


		this.sidenavEl.addEventListener('touchstart', this.onTouchStart);
		this.sidenavEl.addEventListener('touchmove', this.onTouchMove);
		this.sidenavEl.addEventListener('touchend', this.onTouchEnd);

	}


	/**
	 * 
	 * 
	 */
	update () {
		if(!this.touchingSidenav) return;

		requestAnimationFrame(this.update);


		// Use Math.min to assure that the translate will never be negative
		const translateX = Math.min(0, this.currentX - this.startX);


		// @see {@link https://developers.google.com/web/updates/2015/01/ES6-Template-Strings}
		this.sidenavUl.style.transform = `translateX(${translateX}px)`;
	}




	/**
	 * 
	 * 
	 */
	onTouchStart (e) {

		// If the sidenavEl is hidden
		if(!this.sidenavEl.classList.contains('-active'))
			return;


		// e.touches can be an array with multiple touch points 
		// and since we don't have a multiple touch interetion, 
		// we only get the first touch point 
		this.startX = e.touches[0].pageX;


		this.currentX = this.startX;
		this.touchingSidenav = true;

		requestAnimationFrame(this.update);
	}


	/**
	 * If visible, move the sidenav according the user's touch
	 * @param {Object} e - The fired event 
	 */
	onTouchMove (e) {
		if(!this.touchingSidenav) return;

		this.currentX = e.touches[0].pageX;
	    const translateX = Math.min(0, this.currentX - this.startX);

	    if(translateX < 0)
	    	e.preventDefault();
	}


	/**
	 * If the sidenav if 
	 * @param {Object} e - Fired event
	 */
	onTouchEnd (e) {
		if(!this.touchingSidenav) 
			return;

		this.touchingSidenav = false;

	    const translateX = Math.min(0, this.currentX - this.startX);


	    this.sidenavUl.addEventListener('transitionend', this.onTransitionEnd);
	    
	    if(this.currentX < window.outerWidth * 0.75) 
	    	this.hideSidenav();
	    else 
	    	this.showSidenav();
	}



	/**
	 * 
	 * 
	 */
	onTransitionEnd () {
		this.sidenavUl.classList.remove('-animated');
		this.sidenavEl.style.transform = '';
		this.sidenavUl.style.transform = '';
		this.sidenavEl.removeEventListener('transitionend', this.onTransitionEnd);
	}


	/**
	 * 
	 * 
	 */
	showSidenav (e) {
		
		this.sidenavUl.classList.add('-animated');
		console.log(this)
		this.sidenavUl.style.transform = '';
		this.sidenavEl.classList.add('-active');
		this.sidenavUl.addEventListener('transitionend', this.onTransitionEnd);
	}


	/**
	 * 
	 *  Hide the sidenav 
	 */
	hideSidenav () {
		if (!this.sidenavEl.classList.contains('-active')) return;
		this.sidenavUl.classList.add('-animated');
		this.sidenavEl.classList.remove('-active');
		this.sidenavUl.style.transform = '';
		this.sidenavUl.addEventListener('transitionend', this.onTransitionEnd);
	}
}


var sn = new Sidenav();