// import { switchView } from '../index.js';

export function renderSubscription() {
    document.querySelector('#root').innerHTML = '';
    document.querySelector('#root').insertAdjacentHTML('afterbegin', `
        <div id='subscription' class='page'>
            Страница подписки
        </div>
    `);
}
