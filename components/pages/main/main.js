import { addAnimation } from '../../../utils/animations.js';
import { switchView } from '../../init.js';
import { sidebar_passive } from '../../sidebar/sidebar.js';

export function renderMain() {
    sidebar_passive();

    const lang = localStorage.getItem('language') || 'ru';
    const data = JSON.parse(sessionStorage.getItem(`lang_${lang}`));

    document.querySelector('#root').innerHTML = '';
    document.querySelector('#root').insertAdjacentHTML('afterbegin', `
        <div id='main' class='page'>
            <h1>${data?.main.header}</h1>
            <div id='buttonContainer'>
                <button id='createBotButton' class='start-button'>
                    ${data?.main.createBot}
                </button>
                <button id='myBotsButton' class='start-button'>
                    ${data?.main.myBots}
                </button>
            </div>
        </div>
    `);

    document.getElementById('createBotButton').addEventListener('click', () => {
        switchView('botForm');
        addAnimation('.full-page', 'short_animation_up');
    });
    document.getElementById('myBotsButton').addEventListener('click', () => {
        switchView('botList');
        addAnimation('.full-page', 'short_animation_up');
        // Telegram.WebApp.showAlert('111');
    });
}
