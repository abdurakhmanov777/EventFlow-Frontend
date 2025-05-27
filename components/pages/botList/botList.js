import { fetchBotList } from "../../../requests/requests.js";
import { icon_arrow } from "../../../img/icons.js";
import { activation_check } from "../../../utils/bot.js";
import { getCurrentView, switchView } from "../../init.js";

export async function renderBotList() {
    const root = document.querySelector('#root');

    // Устанавливаем текущий экран в root (для проверки актуальности)
    root.dataset.view = 'botList';
    const lang = localStorage.getItem('language') || 'ru';
    const data = JSON.parse(sessionStorage.getItem(`lang_${lang}`));
    const { botList } = data;

    const result = await fetchBotList();

    // Проверяем, остался ли пользователь на этой же странице
    if (getCurrentView() !== 'botList') return;

    const hasBots = result?.length > 0;
    let botItemsHtml = '';

    if (hasBots) {
        botItemsHtml = result.map(({ name, api, link, status }) => {
            const updatedStatus = activation_check(data, status);
            return `
                <button class="settings-item" id="${name}" value='${JSON.stringify({ api, link, status })}'>
                    <div class="icon">${updatedStatus.icon}</div>
                    <div class="content">
                        <span class="title">${name}</span>
                        <span class="value">${botList.edit}${icon_arrow}</span>
                    </div>
                </button>
            `;
        }).join('');
    }

    root.innerHTML = `
        <div id="botList" class="full-page">
            <h2 id="botListHeader" style="display: ${hasBots ? 'block' : 'none'}">${botList.header}</h2>
            <div id="botListContainer" class="settings-list" style="display: ${hasBots ? 'block' : 'none'}">
                ${botItemsHtml}
            </div>
            <p id="noBotsMessage" class="no-bots-message" style="display: ${hasBots ? 'none' : 'block'}">${botList.noBots}</p>
        </div>
    `;

    if (hasBots) {
        root.querySelectorAll('.settings-item').forEach(button => {
            button.addEventListener('click', () => {
                const { api, link, status } = JSON.parse(button.value);
                switchView('settingsBot', {
                    name: button.id,
                    link,
                    api,
                    status,
                });
            });
        });
    }
}
