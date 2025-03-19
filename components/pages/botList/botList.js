// import { switchView } from '../../init.js';

import { fetchBotList } from "../../../api/api.js";

export async function renderBotList() {
    const lang = localStorage.getItem('language') || 'ru';
    const data = JSON.parse(sessionStorage.getItem(`lang_${lang}`));

    document.querySelector('#root').innerHTML = '';
    document.querySelector('#root').insertAdjacentHTML('afterbegin', `
        <div id='botList' class='full-page'>
            <h5 id="botListHeader" style="display: none;">${data.botList.header}</h5>
            <div id='botListContainer' class='setting-list' style="display: none;">
                <ul id='botListItems'></ul>
                <!-- Добавляем скрытое сообщение для отсутствующих ботов -->
            </div>
            <p id='noBotsMessage' class='no-bots-message' style='display: none;'>
                ${data.botList.noBots}
            </p>
        </div>
    `);
    const data_bot = await fetchBotList();
    data_bot?.bots.forEach(({ name }) => {
        document.getElementById(name)?.addEventListener('click', () =>
            Telegram.WebApp.showAlert(`Бот ${name} был выбран!`)
        );
    });
}
