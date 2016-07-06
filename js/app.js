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
		this.bodyEl = document.querySelector('body');

		this.isTransiting = false;


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
		this.onBodyTouchStart = this.onBodyTouchStart.bind(this);
		this.onBodyTouchEnd = this.onBodyTouchEnd.bind(this);


		this.addEventListeners();
	}


	/**
	 * 
	 * Attach the event listeners
	 */
	addEventListeners () {
		this.toggleButton.addEventListener('click', this.showSidenav);
		// this.sidenavEl.addEventListener('click', this.hideSidenav);


		this.sidenavEl.addEventListener('touchstart', this.onTouchStart);
		this.sidenavEl.addEventListener('touchmove', this.onTouchMove);
		this.sidenavEl.addEventListener('touchend', this.onTouchEnd);
		// User can grad the sidenav (app like)
		this.bodyEl.addEventListener('touchstart', this.onBodyTouchStart);
		this.bodyEl.addEventListener('touchend', this.onBodyTouchEnd);
	}

	


	/**
	 * Move the sidenav according the user's touch
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
	    
     	if(translateX < this.sidenavUl.offsetWidth * 1.25)
	    	this.hideSidenav();
	    else 
	    	this.showSidenav();
	}




	/**
	 * Handle the initial user's touch 
	 * 
	 * @param {Object} e - The fired event 
	 */
	onBodyTouchStart (e) {
		// If the sidenavEl is visible
		if(this.sidenavEl.classList.contains('-active') || this.isTransiting)
			return;


		this.bodyStartX = e.touches[0].pageX;
		this.bodyStartY = e.touches[0].pageY;
	}


	/**
	 * Show the sidenav if dragged by the user
	 *
	 * @param {Object} e - The fired event 
	 */
	onBodyTouchEnd (e) {
		// If the sidenavEl is visible
		if(this.sidenavEl.classList.contains('-active') || this.isTransiting)
			return;
		let bodyEndX = e.changedTouches[0].pageX;

		if(this.bodyStartX < 100 && bodyEndX > this.bodyStartX)
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
		this.isTransiting = false;
		this.sidenavEl.removeEventListener('transitionend', this.onTransitionEnd);
	}


	/**
	 *  Show the sidenav 
	 */
	showSidenav (e) {
		this.sidenavUl.classList.add('-animated');
		this.sidenavUl.style.transform = '';
		this.sidenavEl.classList.add('-active');
		this.sidenavUl.addEventListener('transitionend', this.onTransitionEnd);
	}


	/**
	 *  Hide the sidenav 
	 */
	hideSidenav () {
		if (!this.sidenavEl.classList.contains('-active')) return;

		this.isTransiting = true;
		this.sidenavUl.classList.add('-animated');
		this.sidenavEl.classList.remove('-active');
		this.sidenavUl.style.transform = '';
		this.sidenavUl.addEventListener('transitionend', this.onTransitionEnd);
	}
}


var sn = new Sidenav();
/**
 * @class SmoothScroll
 *
 * @author Kevin Dantas Shih
 *
 * @description 
 * Make a smooth scroll to the selected height or element	
 */
class SmoothScroll {

	/**
	 * @return {}
	 */
	constructor () {
		this.ease = 0.1;
		this.isEasing = false;

		this.targetX = 0;
		this.targetY = 0;

		this.update = this.update.bind(this);
	}


	/**
	 * @name diffY
	 * @description 
	 * Difference between the current vertical page position and the target to be scrolled
	 * 
	 * @type {float}
	 */
	get diffY () {
		return (this.targetY - this.scrollY) * 0.07;
	}


	/**
	 * @name diffX
	 * @description 
	 * Difference between the current horizontal page position and the target to be scrolled
	 * 
	 * @type {float}
	 */
	get diffX () {
		return (this.targetX - this.scrollX) * 0.07;
	}




	/**
	 * @name shouldScroll
	 * @description 
	 * Getter for the validations defining when the page should scroll or not
	 * 
	 * @return {bool}
	 */
	get shouldScroll () {
		var isValid = {
			scrollX: true,
			scrollY: true
		};


		// If the target is below the current scrollY
		if (this.diffY > 0) {
			isValid.diffY = this.diffY > 1;

			isValid.scrollY = this.scrollY < this.targetY;

		} else if (this.diffY < 0) {
			isValid.diffY = this.diffY < -1;

			isValid.scrollY = this.scrollY > this.targetY;
		}


		return (isValid.diffY && isValid.scrollY);
	}


	update () {

		if(!this.isEasing)
			return;


		if(!this.shouldScroll){
			this.isEasing = false;
		}

		this.scrollX += this.diffX;
		this.scrollY += this.diffY;

		window.scroll(this.scrollX, this.scrollY);
		requestAnimationFrame(this.update);
	}



	scroll () {		

		this.isEasing = true;
	
		this.scrollX = window.scrollX;
		this.scrollY = window.scrollY;
		
		this.update();
	}





	/**
	 * @method scrollTo
	 * @description 
	 * Scroll to selected element
	 * 
	 * @param {String|Object|Number} element - Class, ID or tag name of the element or the node itself
	 * @param {String=} direction - (horizontal|vertical) || (x|y)
	 */
	scrollTo (target, direction) {


		switch (typeof target)	 {
			case 'string':
				target = document.querySelector(target);
				break;
			case 'number':
				break;
			case 'object':
				break;
			default:
				throw new Error('Invalid target');
		}


		if(!direction || direction == 'vertical' || direction == 'y'){
			this.targetY = (target.offsetTop || target)
		}
		else if(direction == 'horizontal' || direction == 'x'){
			this.targetX = (target.offsetLeft || target)
		}
		else{
			throw new Error('Invalid direction value');
		}


		this.scroll();
	}
}
/**
 * Toast
 */
class Toast {

  /**
   *
   *
   * @param {string} message - Message that will be showed
   * @param {int} duration - Duration of the toast
   * @param {object} options - Toast options
   */
  constructor (message, duration, options) {
    if(!options) options = {};

    this.hideTimeout;

    this.container =  document.createElement('div');
    this.container.className = 'toast';
    this.container.innerHTML = '<div class="toast-wrapper"><div class="toast-content"></div></div>';
    this.container.classList.add('success');

    this.content = this.container.querySelector('.toast-content');
    this.content.innerText = message;
    this.container.className = options.toastClass || 'toast';



    // Create the close button
    this.button = document.createElement('button');
    this.button.className = 'button' || options.buttonClass;
    this.button.textContent = 'Fechar' || options.buttonText;


    // Add event listener
    this.button.addEventListener('click', e => {
      this.hide();
    });

    this.container.querySelector('.toast-wrapper').appendChild(this.button);


    if(duration && duration !== 0)
      this.hideTimeout = setTimeout( _ => this.hide(), duration);


    this.show();
  }


  /**
   * Show the toast created on construct method
   */
  show () {
    document.querySelector('body').appendChild(this.container);
    setTimeout(() => {
      this.container.classList.add('active');
    }, 10)
  }



  /**
   * Hide the toast
   */
  hide () {
    this.container.classList.remove('active');
    clearTimeout(this.hideTimeout);

  }
}



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