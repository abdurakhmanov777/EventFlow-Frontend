import { fetchBotList } from "../../../api/api.js";
import { icon_arrow } from "../../../img/icons.js";
import { activation_check } from "../../../utils/bot.js";
import { switchView } from "../../init.js";

export async function renderBotList() {
    const lang = localStorage.getItem('language') || 'ru';
    const data = JSON.parse(sessionStorage.getItem(`lang_${lang}`));
    const result = await fetchBotList();

    const botItems = result?.length ? result.map(({ name, api, link, status }) => {
        const updatedStatus = activation_check(data, status);
        return `
            <button class='settings-item' id='${name}' value='${JSON.stringify({ api, link, status })}'>
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
    }).join('') : '';

    document.querySelector('#root').innerHTML = `
        <div id='botList' class='full-page'>
            <h2 id="botListHeader" style="${result?.length ? '' : 'display: none;'}">${data.botList.header}</h2>
            <div id='botListContainer' class='settings-list' style="${result?.length ? '' : 'display: none;'}">
                ${botItems}
            </div>
            <p id='noBotsMessage' class='no-bots-message' style='${result?.length ? 'display: none;' : ''}'>${data.botList.noBots}</p>
        </div>
    `;

    document.querySelectorAll('.settings-item').forEach(button => {
        button.addEventListener('click', () => {
            const { api, link, status } = JSON.parse(button.value);
            switchView('settingsBot', {
                name: button.id,
                link: link,
                api: api,
                status: status,
            });
        });
    });
}
