import { fetchBotList } from "../../../api/api.js";
import { icon_arrow, icon_bot } from "../../../img/icons.js";
import { activation_check } from "../../../utils/bot.js";
import { switchView } from "../../init.js";

export function renderBotList() {
    const lang = localStorage.getItem('language') || 'ru';
    const data = JSON.parse(sessionStorage.getItem(`lang_${lang}`));

    document.querySelector('#root').innerHTML = `
        <div id='botList' class='full-page'>
            <h2 id="botListHeader" style="display: none;">${data.botList.header}</h2>
            <div id='botListContainer' class='setting-list' style="display: none;">
            </div>
            <p id='noBotsMessage' class='no-bots-message' style='display: none;'>${data.botList.noBots}</p>
        </div>
    `;

    loadBots();
}

async function loadBots() {
    const result = await fetchBotList();
    const botListContainer = document.getElementById('botListContainer');
    const header = document.getElementById('botListHeader');
    const noBotsMessage = document.getElementById('noBotsMessage');

    const lang = localStorage.getItem('language') || 'ru';
    const data = JSON.parse(sessionStorage.getItem(`lang_${lang}`));

    if (result?.length) {
        // Telegram.WebApp.showAlert(JSON.stringify(data));
        botListContainer.innerHTML = result.map(({ name, api, status }) => {
            // Telegram.WebApp.showAlert(status)
            const updatedStatus = activation_check(data, status);
            return `
            <button class='settings-item' id='${name}' value='${JSON.stringify({ api, status })}'>
                <div class='icon'>
                    ${updatedStatus.icon}
                </div>
                <div class='content'>
                    <span id='textTheme' class='title'>
                        ${name}
                    </span>
                    <span class='value'>
                        ${data.botList.edit}
                        ${icon_arrow}
                    </span>
                </div>
            </button>
            `;
        }).join('');

        // Обработчик нажатий всех кнопок
        document.querySelectorAll('.settings-item').forEach(button => {
            button.addEventListener('click', () => {
                const { api, status } = JSON.parse(button.value);
                switchView('editor', {
                    name: button.id,
                    api,
                    status,
                });
            });
        });


        [botListContainer, header].forEach(el => el.style.display = 'block');
        noBotsMessage.style.display = 'none';
    } else {
        [botListContainer, header].forEach(el => el.style.display = 'none');
        noBotsMessage.style.display = 'block';
    }
}
