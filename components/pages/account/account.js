// import { switchView } from '../../init.js';
import { icon_copy, icon_id } from '../../../utils/icons.js';

export function renderAccount() {
    const lang = localStorage.getItem('language') || 'ru';
    const data = JSON.parse(sessionStorage.getItem(`lang_${lang}`));
    const userId = window?.Telegram?.WebApp?.initDataUnsafe?.user?.id || 'unknown';

    document.querySelector('#root').innerHTML = '';
    document.querySelector('#root').insertAdjacentHTML('afterbegin', `
        <div id='accountSection' class='full-page'>
            <h2>${data.settings.account.name}</h2>
            <div class='settings-list'>
                <button id='userIdBtn' class='settings-item'>
                    <div class='icon'>
                        ${icon_id}
                    </div>
                    <div class='content'>
                        <span class='title'>
                            User ID
                        </span>
                        <span class='value'>
                            ${userId}
                            ${icon_copy}
                        </span>
                    </div>
                </button>
            </div>
        </div>
    `);

    document.getElementById('userIdBtn').addEventListener('click', () => {
        const message = data?.settings.account.copyUserId;
        navigator.clipboard.writeText(userId)
            .then(() => Telegram?.WebApp.showAlert(message));
    });
}
