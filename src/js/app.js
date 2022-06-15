import Chat from './Chat';

const container = document.querySelector('.chat-container');
const chat = new Chat();

chat.bindToDOM(container);
chat.init();
