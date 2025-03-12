import { switchView } from '../../init.js';

export function renderMain() {
    const lang = localStorage.getItem('language') || 'ru';
    const localData = JSON.parse(sessionStorage.getItem(`lang_${lang}`));

    document.querySelector('#root').innerHTML = '';
    document.querySelector('#root').insertAdjacentHTML('afterbegin', `
        <div id='main' class='page'>
            <h1>${localData?.main.header}</h1>
            <div id='buttonContainer'>
                <button id='createBotButton' class='start-button'>
                    ${localData?.main.createBot}
                </button>
                <button id='myBotsButton' class='start-button'>
                    ${localData?.main.myBots}
                </button>
            </div>
        </div>
    `);

    document.getElementById('createBotButton').addEventListener('click', () => {
        switchView('botForm');
    });
    document.getElementById('myBotsButton').addEventListener('click', () => {
        switchView('botList');
    });
}
