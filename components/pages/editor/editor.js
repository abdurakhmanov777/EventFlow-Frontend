import { switchView } from '../../init.js';

export function renderEditor(param) {

    // const lang = localStorage.getItem('language') || 'ru';
    // const data = JSON.parse(sessionStorage.getItem(`lang_${lang}`));

    document.querySelector('#root').innerHTML = '';
    document.querySelector('#root').insertAdjacentHTML('afterbegin', `
        <div id='editorSection' class='full-page'>
            <h2>${param?.api}</h2>
        </div>
    `);
}
