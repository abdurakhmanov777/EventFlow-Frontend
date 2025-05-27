import { sendBotData } from '../../../requests/requests.js';
import { addAnimation } from '../../../utils/animations.js';
import { switchView } from '../../init.js';

export function renderCreateBot() {
    const lang = localStorage.getItem('language') || 'ru';
    const data = JSON.parse(sessionStorage.getItem(`lang_${lang}`));
    const clearError = (event) => event.target.classList.remove('error');

    document.querySelector('#root').innerHTML = '';
    document.querySelector('#root').insertAdjacentHTML('afterbegin', `
        <div id="loaderOverlay">
            <div id="formLoader" class="loader"></div>
        </div>
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
    document.getElementById('nextButton').addEventListener('click', async () => {
        const button = document.getElementById('nextButton');
        const overlay = document.getElementById('loaderOverlay');

        button.disabled = true;
        overlay.style.display = 'flex';
        try {
            await submitForm(data);
        } finally {
            button.disabled = false;
            overlay.style.display = 'none';
        }
    });

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
        if (result.status === true) {
            switchView('settingsBot', {
                name: name,
                api: api,
                link: result.link,
            });
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
