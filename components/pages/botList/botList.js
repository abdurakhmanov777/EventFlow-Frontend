// import { switchView } from '../../init.js';

import { fetchBotList } from "../../../api/api.js";

export function renderBotList() {
    const lang = localStorage.getItem('language') || 'ru';
    const data = JSON.parse(sessionStorage.getItem(`lang_${lang}`));

    document.querySelector('#root').innerHTML = '';
    document.querySelector('#root').insertAdjacentHTML('afterbegin', `
        <div id='botList' class='full-page'>
            <h5>${data.botList.header}</h5>
            <div id='botListContainer' class='setting-list'>
                <ul id='botListItems' style='display: none;'></ul>
                <!-- Добавляем скрытое сообщение для отсутствующих ботов -->
                <p id='noBotsMessage' class='no-bots-message' style='display: none;'></p>
            </div>
        </div>
    `);
    fetchBotList();
}
