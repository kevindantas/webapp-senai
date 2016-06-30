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