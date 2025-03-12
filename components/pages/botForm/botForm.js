// import { mocksRender } from './chat/mocks.js';
import { switchView } from '../../init.js';

export function renderBotForm() {
    const lang = localStorage.getItem('language') || 'ru';
    const localData = JSON.parse(sessionStorage.getItem(`lang_${lang}`));

    document.querySelector('#root').innerHTML = '';
    document.querySelector('#root').insertAdjacentHTML('afterbegin', `
        <form id='botForm' class='full-page'>
            <input type='text' placeholder='${localData.botForm.placeholder.name}' id='botNameInput'>
            <div id='botNameError' class='error-message'></div>

            <input type='text' placeholder='${localData.botForm.placeholder.api}' id='botApiInput'>
            <div id='botApiError' class='error-message'></div>

            <div class='buttonContainer'>
                <button id='backButton' class='button'>${localData.botForm.button.back}</button>
                <button id='nextButton' class='button'>${localData.botForm.button.next}</button>
            </div>
        </form>
    `);


    document.getElementById('backButton')?.addEventListener('click', () => {
        switchView('main');
    });
}
