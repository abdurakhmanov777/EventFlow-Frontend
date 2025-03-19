import { fetchBotList } from "../../../api/api.js";

export function renderBotList() {
    const lang = localStorage.getItem('language') || 'ru';
    const data = JSON.parse(sessionStorage.getItem(`lang_${lang}`));

    document.querySelector('#root').innerHTML = `
        <div id='botList' class='full-page'>
            <h5 id="botListHeader" style="display: none;">${data.botList.header}</h5>
            <div id='botListContainer' class='setting-list' style="display: none;">
                <ul id='botListItems'></ul>
            </div>
            <p id='noBotsMessage' class='no-bots-message' style='display: none;'>${data.botList.noBots}</p>
        </div>
    `;

    loadBots();
}

async function loadBots() {
    const { bots } = await fetchBotList();
    const botListContainer = document.getElementById('botListContainer');
    const botListItems = document.getElementById('botListItems');
    const header = document.getElementById('botListHeader');
    const noBotsMessage = document.getElementById('noBotsMessage');

    if (bots?.length) {
        botListItems.innerHTML = bots.map(({ name }) => `
            <button class='bot-button' id='${name}'>${name}</button>
        `).join('');

        // Обработчик нажатий всех кнопок
        document.querySelectorAll('.bot-button').forEach(button => {
            button.addEventListener('click', () => {
                Telegram.WebApp.showAlert(`Бот ${button.id} был выбран!`);
            });
        });

        [botListContainer, header].forEach(el => el.style.display = 'block');
        noBotsMessage.style.display = 'none';
    } else {
        [botListContainer, header].forEach(el => el.style.display = 'none');
        noBotsMessage.style.display = 'block';
    }
}
