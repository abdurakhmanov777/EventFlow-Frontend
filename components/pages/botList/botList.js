import { fetchBotList } from "../../../api/api.js";
import { icon_arrow, icon_bot } from "../../../img/icons.js";
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
        botListContainer.innerHTML = result.map(({ name, api }) => `
            <button class='settings-item' id='${name}' value='${api}'>
                <div class='iconNoBack'>
                    ${icon_bot}
                </div>
                <div class='content'>
                    <span id='textTheme' class='title'>
                        ${name}
                    </span>
                    <span class='value'>
                        ${icon_arrow}
                    </span>
                </div>
            </button>
        `).join('');

        // Обработчик нажатий всех кнопок
        document.querySelectorAll('.settings-item').forEach(button => {
            button.addEventListener('click', () => {
                switchView('editor', { name: button.id });
            });
        });

        [botListContainer, header].forEach(el => el.style.display = 'block');
        noBotsMessage.style.display = 'none';
    } else {
        [botListContainer, header].forEach(el => el.style.display = 'none');
        noBotsMessage.style.display = 'block';
    }
}
