import { icon_arrow, icon_off, icon_on } from '../../../img/icons.js';
import { activation_check } from '../../../utils/bot.js';
import { switchView } from '../../init.js';


export function renderEditor(param) {
    const lang = localStorage.getItem('language') || 'ru';
    const data = JSON.parse(sessionStorage.getItem(`lang_${lang}`));

    const status = activation_check(data, param.status);

    document.querySelector('#root').innerHTML = '';
    document.querySelector('#root').insertAdjacentHTML('afterbegin', `
        <div id='editorSection' class='full-page'>
            <h2>${param?.name}</h2>
            <div id='botListContainer' class='settings-list'">
                <button id='toggleStatusBot' class='settings-item' value='${param?.api}'>
                    <div class='icon'>
                        ${status.icon}
                    </div>
                    <div class='content'>
                        <span id='textTheme' class='title'>
                            ${data?.editor.status.name}
                        </span>
                        <span class='value'>
                            ${status.value}
                            ${icon_arrow}
                        </span>
                    </div>
                </button>
            </div>
        </div>
    `);

    document.getElementById('toggleStatusBot').addEventListener('click', function() {
        // Telegram.WebApp.showAlert(this.value);

        switchView('botEnable', param);
    });

}
