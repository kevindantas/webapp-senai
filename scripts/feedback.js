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
    })
  }



  /**
   * Hide the toast
   */
  hide () {
    this.container.classList.remove('active');
    clearTimeout(this.hideTimeout);

  }
}

/**
 * @class Modal
 * Create a modal from the parameters
 */
class Modal {


  /**
   * @param {object} options
   * 
   */
  constructor (options) {
    this.options = options;

    // Show the overlay
    this.overlay = document.querySelector('.overlay');
    this.overlay.classList.add('active');


    // Create the box and append to body
    this.modal = document.createElement('div');
    this.modal.setAttribute('class', 'modal');
    document.querySelector('body').appendChild(this.modal);

    // Centralize the modal
    this.modal.style.marginLeft = -(this.modal.offsetWidth / 2)+'px';


    if (options.fab)
      options.fab.classList.add('animate-out');



    if(options.templateUrl) {
      this.promise = fetch(options.templateUrl).then(function (data) {
        if(options.response)
          return data[options.response]();
        return data.text();
      }).then(html => {
        this.modal.innerHTML = html;
        this.modal.classList.add('-active');
      })
      .catch(function (err) {
        console.error('Fetch failed: '+err)
      });
    }

  }
  
  
  
  
  /**
   * Hide and remove the modal
   */
  hide() {
    this.overlay.classList.remove('active');
    this.modal.classList.remove('-active');
    this.modal.classList.remove('-active');
    if (this.options.fab)
      this.options.fab.classList.remove('animate-out');
      this.options.fab.classList.add('animate-in');

    // Remove modal after CSS transition
    this.modal.addEventListener("transitionend", function () {
      this.remove();
    }, true);

  }
  
}