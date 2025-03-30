import { deleteBot } from '../../../api/api.js';
import { icon_arrow, icon_delete, icon_editor } from '../../../img/icons.js';
import { activation_check } from '../../../utils/bot.js';
import { switchView } from '../../init.js';


export function renderSettingsBot(param) {
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
                            ${data?.settingsBot.status.name}
                        </span>
                        <span class='value'>
                            ${status.value}
                            ${icon_arrow}
                        </span>
                    </div>
                </button>
                <button id='editorBot' class='settings-item' value='${param?.api}'>
                    <div class='icon'>
                        ${icon_editor}
                    </div>
                    <div class='content'>
                        <span id='textTheme' class='title'>
                            ${data?.settingsBot.editor.name}
                        </span>
                        <span class='value'>
                            ${data?.settingsBot.editor.edit}
                            ${icon_arrow}
                        </span>
                    </div>
                </button>
            </div>
            <div id='botListContainer' class='settings-list'">
                <button id='deleteBot' class='settings-item' value='${param?.api}'>
                    <div class='icon'>
                        ${icon_delete}
                    </div>
                    <div class='content'>
                        <span id='textTheme' class='title'>
                            ${data?.settingsBot.delete.name}
                        </span>
                        <span class='value'>
                            ${data?.settingsBot.delete.name}
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


    document.getElementById('deleteBot').addEventListener('click', function() {
        Telegram.WebApp.showConfirm(data?.settingsBot.delete.confirm, async function(ok) {
            if (ok) {
                const result = await deleteBot(param.name);
                if (result) {
                    // Telegram.WebApp.showAlert(data?.settingsBot.delete.success);
                    switchView('botList');
                }
            }
        });
    });
}
