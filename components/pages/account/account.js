// import { switchView } from '../../init.js';
import { copy } from '../../../img/icons.js';

export function renderAccount() {
    const currentLanguage = localStorage.getItem('language') || 'ru';
    const localData = JSON.parse(sessionStorage.getItem(`lang_${currentLanguage}`));
    const userId = window?.Telegram?.WebApp?.initDataUnsafe?.user?.id || 'unknown';

    document.querySelector('#root').innerHTML = '';
    document.querySelector('#root').insertAdjacentHTML('afterbegin', `
        <div id='accountSection' class='full-page'>
            <h2>${localData.settings.account.name}</h2>
            <div class='settings-list'>
                <button id='userIdBtn' class='settings-item'>
                    <div class='icon'>
                        <img src='/miniapp/img/icons/id.svg'>
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
//     <img src='/miniapp/img/icons/user_id.svg'>
// </div>
