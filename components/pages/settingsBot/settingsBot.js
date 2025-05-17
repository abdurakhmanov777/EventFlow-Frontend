import { deleteBot } from '../../../api/api.js';
import { icon_arrow, icon_delete, icon_editor, icon_link } from '../../../img/icons.js';
import { activation_check } from '../../../utils/bot.js';
import { switchView } from '../../init.js';


export function renderSettingsBot(param) {
    const lang = localStorage.getItem('language') || 'ru';
    const data = JSON.parse(sessionStorage.getItem(`lang_${lang}`));

    const status = activation_check(data, param.status);

    document.querySelector('#root').innerHTML = '';
    document.querySelector('#root').insertAdjacentHTML('afterbegin', `
        <div id='settingsBotSection' class='full-page'>
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
                <button id='linkBot' class='settings-item'>
                    <div class='icon'>
                        ${icon_link}
                    </div>
                    <div class='content'>
                        <span id='textTheme' class='title'>
                            ${data?.settingsBot.link.name}
                        </span>
                        <span class='value'>
                            ${data?.settingsBot.link.open}
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

    document.getElementById('linkBot').addEventListener('click', function() {
        Telegram?.WebApp.openTelegramLink(`https://t.me/${param?.link}`);
    });

    document.getElementById('editorBot').addEventListener('click', function() {
        switchView('editor', param);
    });

    document.getElementById('toggleStatusBot').addEventListener('click', function() {
        switchView('botEnable', param);
    });


    document.getElementById('deleteBot').addEventListener('click', function() {
        Telegram.WebApp.showConfirm(data?.settingsBot.delete.confirm, async function(ok) {
            if (ok) {
                const button = document.getElementById('deleteBot');
                button.disabled = true;
                try {
                    const result = await deleteBot(param.name);
                    if (result) {
                        switchView('botList');
                    }
                } finally {
                    button.disabled = false;
                }
            }
        });
    });
}
