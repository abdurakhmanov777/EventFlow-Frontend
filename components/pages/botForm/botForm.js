// import { mocksRender } from './chat/mocks.js';
import { validateAndSubmitForm } from '../../../api/api.js';
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
    });
    document.getElementById('nextButton').addEventListener('click', () => {
        validateAndSubmitForm();
        switchView('editor');
        // Telegram.WebApp?.showAlert(data.botForm.successfull);
    });

    // document.getElementById('botNameInput').addEventListener('input', clearError);
    // document.getElementById('botApiInput').addEventListener('input', clearError);
    document.getElementById('botNameInput').addEventListener('focus', clearError);
    document.getElementById('botApiInput').addEventListener('focus', clearError);
}
