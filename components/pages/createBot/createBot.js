// import { mocksRender } from './chat/mocks.js';
import { sendBotData } from '../../../api/api.js';
import { addAnimation } from '../../../utils/animations.js';
import { switchView } from '../../init.js';

export function renderCreateBot() {
    const lang = localStorage.getItem('language') || 'ru';
    const data = JSON.parse(sessionStorage.getItem(`lang_${lang}`));
    const clearError = (event) => event.target.classList.remove('error');

    document.querySelector('#root').innerHTML = '';
    document.querySelector('#root').insertAdjacentHTML('afterbegin', `
        <form id='createBot' class='full-page'>
            <input type='text' placeholder='${data.createBot.placeholder.name}' id='botNameInput'>
            <div id='botNameError' class='error-message'></div>

            <input type='text' placeholder='${data.createBot.placeholder.api}' id='botApiInput'>
            <div id='botApiError' class='error-message'></div>

            <div class='buttonContainer'>
                <button id='backButton' class='button'>${data.createBot.button.back}</button>
                <button id='nextButton' type='button' class='button'>${data.createBot.button.next}</button>
            </div>
        </form>
    `);


    document.getElementById('backButton').addEventListener('click', () => {
        switchView('main');
        addAnimation('.page', 'short_animation_down');
    });
    document.getElementById('nextButton').addEventListener('click', () => {
        submitForm(data);
        // Telegram.WebApp?.showAlert(data.createBot.successfull);
    });

    // document.getElementById('botNameInput').addEventListener('input', clearError);
    // document.getElementById('botApiInput').addEventListener('input', clearError);
    document.getElementById('botNameInput').addEventListener('focus', clearError);
    document.getElementById('botApiInput').addEventListener('focus', clearError);
}


async function submitForm(data) {
    const botNameInput = document.getElementById('botNameInput');
    const botApiInput = document.getElementById('botApiInput');

    const name = botNameInput.value.trim();
    const api = botApiInput.value.trim();

    const apiRegex = /\d{10}:[\w-]{35}/g;

    const errors = [];
    if (name.length < 2) errors.push(data.createBot.error.name);
    if (!api.match(apiRegex)) errors.push(data.createBot.error.api);

    botNameInput.classList.toggle('error', name.length < 5);
    botApiInput.classList.toggle('error', api.length < 5);

    if (errors.length) {
        return Telegram.WebApp.showAlert(`${data.createBot.error.incorrect}: ${errors.join(', ')}`);
    }

    const result = await sendBotData(name, api);
    if (result) {
        // Telegram.WebApp.showAlert(result.link);
        if (result.status === true) {
            switchView('settingsBot', {
                name: name,
                api: api,
                link: result.link,
            });
            // Telegram.WebApp.showAlert(data.createBot.success.true);
        } else if (!result.api && !result.name) {
            Telegram.WebApp.showAlert(data.createBot.error.invalid);
        } else {
            const messageArr = [];
            if (result.name) messageArr.push(data.createBot.error.name);
            if (result.api) messageArr.push(data.createBot.error.api);
            Telegram.WebApp.showAlert(`${data.createBot.success.false}${messageArr.join(', ')}`);
        }
    } else {
        Telegram.WebApp.showAlert(data.createBot.unsuccess);
    }
}
