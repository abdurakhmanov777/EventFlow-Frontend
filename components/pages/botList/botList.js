// import { switchView } from '../../init.js';

export function renderBotList() {
    document.querySelector('#root').innerHTML = '';
    document.querySelector('#root').insertAdjacentHTML('afterbegin', `
        <div id='botList' class='full-page'>
            <div id='botListContainer'>
                <ul id='botListItems' style='display: none;'></ul>
                <!-- Добавляем скрытое сообщение для отсутствующих ботов -->
                <p id='noBotsMessage' class='no-bots-message' style='display: none;'></p>
            </div>
        </div>
    `);
}
