import { fetchBotList } from "../../../requests/requests.js";
import { icon_arrow } from "../../../img/icons.js";
import { activation_check } from "../../../utils/bot.js";
import { getCurrentView, switchView } from "../../init.js";
import { addAnimation } from "../../../utils/animations.js";

export async function renderBotList() {
    const root = document.querySelector('#root');
    root.dataset.view = 'botList';

    const lang = localStorage.getItem('language') || 'ru';
    const data = JSON.parse(sessionStorage.getItem(`lang_${lang}`));
    const { botList } = data;

    // Скелет экрана до загрузки
    root.innerHTML = `
        <div id="botList" class="full-page">
            <h2 id="botListHeader" style="display: none;"></h2>
            <div id="botListContainer" class="settings-list" style="display: none;"></div>
            <p id="noBotsMessage" class="no-bots-message" style="display: none;"></p>
        </div>
    `;

    const result = await fetchBotList();
    if (getCurrentView() !== 'botList') return;

    const hasBots = result?.length > 0;

    const botListHeader = root.querySelector('#botListHeader');
    const botListContainer = root.querySelector('#botListContainer');
    const noBotsMessage = root.querySelector('#noBotsMessage');

    if (hasBots) {
        const fragment = document.createDocumentFragment();

        result.forEach(({ name, api, link, status }) => {
            const updatedStatus = activation_check(data, status);

            const button = document.createElement('button');
            button.className = 'settings-item';
            button.id = name;
            button.value = JSON.stringify({ api, link, status });
            button.innerHTML = `
                <div class="icon">${updatedStatus.icon}</div>
                <div class="content">
                    <span class="title">${name}</span>
                    <span class="value">${botList.edit}${icon_arrow}</span>
                </div>
            `;
            button.addEventListener('click', () => {
                switchView('settingsBot', { name, link, api, status });
                addAnimation('.full-page', 'animation_left');
            });

            fragment.appendChild(button);
        });

        botListHeader.style.display = 'block';
        botListContainer.style.display = 'block';
        botListContainer.appendChild(fragment);
    } else {
        noBotsMessage.style.display = 'block';
        noBotsMessage.textContent = botList.noBots;
    }

    botListHeader.textContent = botList.header;
}
