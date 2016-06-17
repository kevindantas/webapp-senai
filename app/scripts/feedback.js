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
    this.container.classList.remove('active')
    clearTimeout(this.hideTimeout);

  }
}
