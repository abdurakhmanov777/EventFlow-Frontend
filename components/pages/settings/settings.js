import { switchView } from '../../init.js';
import { icon_arrow, icon_account, icon_language, icon_theme, icon_support, icon_star } from '../../../img/icons.js';
import { addAnimation } from '../../../utils/animations.js';
import { sidebar_passive } from '../../sidebar/sidebar.js';

export function renderSettings() {
    sidebar_passive();

    const lang = localStorage.getItem('language') || 'ru';
    const theme = localStorage.getItem('theme') || 'system'
    const data = JSON.parse(sessionStorage.getItem(`lang_${lang}`));

    document.querySelector('#root').innerHTML = '';
    document.querySelector('#root').insertAdjacentHTML('afterbegin', `
        <div id='settingsSection' class='page'>
            <div class='settings-list'>
                <button id='accountBtn' class='settings-item'>
                    <div class='icon'>
                        ${icon_account}
                    </div>
                    <div class='content'>
                        <span class='title'>
                            ${data.settings.account.name}
                        </span>
                        <span class='value'>
                            ${data.settings.account.settings}
                            ${icon_arrow}
                        </span>
                    </div>
                </button>
                <div id='subscriptionInfo' class='settings-item'>
                    <div class='icon'>
                        ${icon_star}
                    </div>
                    <div class='content'>
                        <span class='title'>
                            ${data.settings.subscription.name}
                        </span>
                        <span class='value'>
                            ${data.settings.subscription.value}
                        </span>
                    </div>
                </div>
                <button id='settingsSubscriptionBtn'>
                    ${data.settings.subscription.buy}
                </button>
            </div>
            <div class='settings-list'>
                <button id='languageToggleButton' class='settings-item'>
                    <div class='icon'>
                        ${icon_language}
                    </div>
                    <div class='content'>
                        <span id='textSystemLanguage' class='title'>
                            ${data?.settings.language.name}
                        </span>
                        <span class='value'>
                            ${data?.settings.language.value}
                            ${icon_arrow}
                        </span>
                    </div>
                </button>
                <button id='themeToggleButton' class='settings-item'>
                    <div class='icon'>
                        ${icon_theme}
                    </div>
                    <div class='content'>
                        <span id='textTheme' class='title'>
                            ${data?.settings.theme.name}
                        </span>
                        <span class='value'>
                            ${data.settings.theme?.[`${theme}`]}
                            ${icon_arrow}
                        </span>
                    </div>
                </button>
            </div>
            <div class='settings-list'>
                <button id='contact_admin' class='settings-item'>
                    <div class='icon'>
                        ${icon_support}
                    </div>
                    <div class='content'>
                        <span id='textContactAdmin' class='title'>
                            ${data?.settings.support.name}
                        </span>
                        <span class='value'>
                            ${data?.settings.support.value}
                            ${icon_arrow}
                        </span>
                    </div>
                </button>
            </div>
        </div>
    `);
    document.getElementById('languageToggleButton').addEventListener('click', () => {
        switchView('language');
        addAnimation('.full-page');
    });
    document.getElementById('themeToggleButton').addEventListener('click', () => {
        switchView('theme');
        addAnimation('.full-page');
    });
    document.getElementById('contact_admin').addEventListener('click', function() {
        Telegram?.WebApp.openTelegramLink('https://t.me/abdurakhmanov777');
    });
    document.getElementById('settingsSubscriptionBtn').addEventListener('click', () => {
        switchView('subscription');
    });
    document.getElementById('accountBtn').addEventListener('click', () => {
        // addAnimation();
        switchView('account');
        addAnimation('.full-page');
    });
    // document.getElementById('userIdBtn').addEventListener('click', () => {
    //     const message = data?.settings.account.copyUserId;
    //     navigator.clipboard.writeText(userId)
    //         .then(() => window?.Telegram.WebApp.showAlert(message));
    // });

    // document.getElementById('myBotsButton').addEventListener('click', () => {
    //     switchView('botList');
    // });
}
