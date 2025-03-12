// import { switchView } from '../../init.js';
import { copy } from '../../../img/icons.js';

export function renderAccount() {
    const lang = localStorage.getItem('language') || 'ru';
    const localData = JSON.parse(sessionStorage.getItem(`lang_${lang}`));
    const userId = window?.Telegram?.WebApp?.initDataUnsafe?.user?.id || 'unknown';
    // const iconPath = '/miniapp/img/icons/';
    const iconPath = '../../../img/icons/';

    document.querySelector('#root').innerHTML = '';
    document.querySelector('#root').insertAdjacentHTML('afterbegin', `
        <div id='accountSection' class='full-page'>
            <h2>${localData.settings.account.name}</h2>
            <div class='settings-list'>
                <button id='userIdBtn' class='settings-item'>
                    <div class='icon'>
                        <img src='${iconPath}id.svg'>
                    </div>
                    <div class='content'>
                        <span class='title'>
                            User ID
                        </span>
                        <span class='value'>
                            ${userId}
                            ${copy}
                        </span>
                    </div>
                </button>
            </div>
        </div>
    `);

    document.getElementById('userIdBtn').addEventListener('click', () => {
        const message = localData?.settings.account.copyUserId;
        navigator.clipboard.writeText(userId)
            .then(() => window?.Telegram.WebApp.showAlert(message));
    });
}


// <div class='icon'>
//     <img src='${iconPath}user_id.svg'>
// </div>
