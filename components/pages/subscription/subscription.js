// import { switchView } from '../index.js';

import { sidebar_passive } from "../../sidebar/sidebar.js";

export function renderSubscription() {
    sidebar_passive();

    document.querySelector('#root').innerHTML = '';
    document.querySelector('#root').insertAdjacentHTML('afterbegin', `
        <div id='subscriptionSection' class='page'>
            Страница подписки
        </div>
    `);
}
