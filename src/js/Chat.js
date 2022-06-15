export default class Chat {
  constructor() {
    this.chatAnimate = null;
    this.openButtonAnimate = null;
  }

  /**
   * Получаем контейнер
   * @param {*} container - html элемент контейнер
   */
  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  /**
   * Инициализируем чат, добавляем разметку
   */
  init() {
    this.container.innerHTML = `
      <div class="chat">
        <div class="chat__window">
          <div class="chat__content">
            <h3 class="chat__title">Напишите нам</h3>      
            <textarea name="text" id="text" rows="5"></textarea>
            <button class="chat__btn-send">Оправить</button>
          </div>
          <button class="chat__btn chat__btn-close"></button>
        </div>
        <button class="chat__btn chat__btn-open"></button>
      </div>
    `;

    this.openButton = this.container.querySelector('.chat__btn-open');
    this.closeButton = this.container.querySelector('.chat__btn-close');

    this.registerEvents();
    this.animateState();
  }

  /**
   * Добавляет события на элементы
   */
  registerEvents() {
    this.openButton.addEventListener('click', this.openChat.bind(this));
    this.closeButton.addEventListener('click', this.closeChat.bind(this));
  }

  /**
   * Анимации элементов
   */
  animateState() {
    const chatWindow = this.container.querySelector('.chat__window');
    // Анимация чата
    this.chatAnimate = chatWindow.animate(
      [
        { width: '0', height: '0' },
        { width: '190px', height: '220px' },
      ], {
        duration: 200,
        fill: 'forwards',
        easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
      },
    );

    // Анимация кнопки
    this.openButtonAnimate = this.openButton.animate(
      [
        { opacity: '1' },
        {
          opacity: '0',
          width: '0',
          height: '0',
          right: '0',
          bottom: '0',
        },
      ],
      {
        duration: 200,
        fill: 'forwards',
      },
    );

    this.chatAnimate.pause(); // Ставим чат на паузу
    this.openButtonAnimate.pause(); // Ставим кнопку на паузу
  }

  /**
   * Открытие чата
   */
  openChat() {
    this.chatAnimate.playbackRate = 1;
    this.openButtonAnimate.playbackRate = 1;
    this.chatAnimate.play();
    this.openButtonAnimate.play();
  }

  /**
   * Закрытие чата
   */
  closeChat() {
    this.chatAnimate.reverse();
    this.openButtonAnimate.reverse();
  }
}
