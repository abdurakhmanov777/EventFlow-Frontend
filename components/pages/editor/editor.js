import { switchView } from '../../init.js';

export function renderEditor(param) {
    // const pageSettings = JSON.parse(param);
    // let pageSettings = sessionStorage.getItem('pageSettings');

    // if (!pageSettings) {
    //     pageSettings = 'Default Title'; // Значение по умолчанию
    // }

    // Telegram.WebApp.showAlert(JSON.stringify(pageSettings));
    // Telegram.WebApp.showAlert(param.api);
    const lang = localStorage.getItem('language') || 'ru';
    const data = JSON.parse(sessionStorage.getItem(`lang_${lang}`));

    document.querySelector('#root').innerHTML = '';
    document.querySelector('#root').insertAdjacentHTML('afterbegin', `
        <div id='editorSection' class='full-page'>
            <h2>${param?.api}</h2>
        </div>
    `);
    // sessionStorage.setItem('pageSettings', param);
}
