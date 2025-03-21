// import { mocksRender } from './chat/mocks.js';
import { sendBotData } from '../../../api/api.js';
import { addAnimation } from '../../../utils/animations.js';
import { switchView } from '../../init.js';

export function renderBotForm() {
    const lang = localStorage.getItem('language') || 'ru';
    const data = JSON.parse(sessionStorage.getItem(`lang_${lang}`));
    const clearError = (event) => event.target.classList.remove('error');

    document.querySelector('#root').innerHTML = '';
    document.querySelector('#root').insertAdjacentHTML('afterbegin', `
        <form id='botForm' class='full-page'>
            <input type='text' placeholder='${data.botForm.placeholder.name}' id='botNameInput'>
            <div id='botNameError' class='error-message'></div>

            <input type='text' placeholder='${data.botForm.placeholder.api}' id='botApiInput'>
            <div id='botApiError' class='error-message'></div>

            <div class='buttonContainer'>
                <button id='backButton' class='button'>${data.botForm.button.back}</button>
                <button id='nextButton' type='button' class='button'>${data.botForm.button.next}</button>
            </div>
        </form>
    `);


    document.getElementById('backButton').addEventListener('click', () => {
        switchView('main');
        addAnimation('.page');
    });
    document.getElementById('nextButton').addEventListener('click', () => {
        submitForm(data);
        // Telegram.WebApp?.showAlert(data.botForm.successfull);
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

    const apiRegex = /^.{5,}$/;

    const errors = [];
    if (name.length < 5) errors.push(data.botForm.error.name);
    if (!api.match(apiRegex)) errors.push(data.botForm.error.api);

    botNameInput.classList.toggle('error', name.length < 5);
    botApiInput.classList.toggle('error', api.length < 5);

    if (errors.length) {
        return Telegram.WebApp.showAlert(`${data.botForm.error.incorrect}: ${errors.join(', ')}`);
    }

    const result = await sendBotData(name, api);
    if (result) {
        if (result.status === true) {
            switchView('editor', { name: name });
            // Telegram.WebApp.showAlert(data.botForm.success.true);
        } else {
            const messageArr = [];
            if (result.name) messageArr.push(data.botForm.success.name);
            if (result.api) messageArr.push(data.botForm.success.api);
            Telegram.WebApp.showAlert(`${data.botForm.success.false}${messageArr.join(', ')}`);
        }
    } else {
        Telegram.WebApp.showAlert(data.botForm.unsuccess);
    }
}
