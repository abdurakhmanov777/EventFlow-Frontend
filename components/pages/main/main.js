import { addAnimation } from '../../../utils/animations.js';
import { switchView } from '../../init.js';
import { sidebar_passive } from '../../sidebar/sidebar.js';

export function renderMain() {
    sidebar_passive();
    const root = document.querySelector('#root');
    const lang = localStorage.getItem('language') || 'ru';
    const data = JSON.parse(sessionStorage.getItem(`lang_${lang}`));

    root.innerHTML = '';
    root.insertAdjacentHTML('afterbegin', `
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
        switchView('createBot');
        addAnimation('.full-page', 'short_animation_up');
    });
    document.getElementById('myBotsButton').addEventListener('click', () => {
        switchView('botList');
        addAnimation('.full-page', 'long_animation_up');
    });
}
