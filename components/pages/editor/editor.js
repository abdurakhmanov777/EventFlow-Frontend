import { switchView } from '../../init.js';

export function renderEditor() {
    const lang = localStorage.getItem('language') || 'ru';
    const data = JSON.parse(sessionStorage.getItem(`lang_${lang}`));

    document.querySelector('#root').innerHTML = '';
    document.querySelector('#root').insertAdjacentHTML('afterbegin', `
        <div id='editorSection' class='page'>
            Визуальный редактор
        </div>
    `);
}
