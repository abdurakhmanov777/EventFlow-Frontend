import { switchView } from '../../init.js';
import { arrow } from '../../../img/icons.js';

const icons = {
    account: '/miniapp/img/icons/account.svg',
    star: '/miniapp/img/icons/star.svg',
    language: '/miniapp/img/icons/language.svg',
    theme: '/miniapp/img/icons/theme.svg',
    support: '/miniapp/img/icons/support.svg'
};

function preloadImages(icons) {
    return Promise.all(Object.values(icons).map(src => new Promise(resolve => {
        const img = new Image();
        img.src = src;
        img.onload = img.onerror = resolve;
    })));
}

export async function renderSettings() {
    await preloadImages(icons);

    const currentLanguage = localStorage.getItem('language') || 'ru';
    const currentTheme = localStorage.getItem('theme') || 'system';
    const localData = JSON.parse(sessionStorage.getItem(`lang_${currentLanguage}`));

    document.querySelector('#root').innerHTML = '';
    document.querySelector('#root').insertAdjacentHTML('afterbegin', `
        <div id='settingsSection' class='page'>
            <div class='settings-list'>
                <button id='accountBtn' class='settings-item'>
                    <div class='icon'>
                        <img src='${icons.account}'>
                    </div>
                    <div class='content'>
                        <span class='title'>
                            ${localData.settings.account.name}
                        </span>
                        <span class='value'>
                            ${localData.settings.account.settings}
                            ${arrow}
                        </span>
                    </div>
                </button>
                <div id='subscriptionInfo' class='settings-item'>
                    <div class='icon'>
                        <img src='${icons.star}'>
                    </div>
                    <div class='content'>
                        <span class='title'>
                            ${localData.settings.subscription.name}
                        </span>
                        <span class='value'>
                            ${localData.settings.subscription.value}
                        </span>
                    </div>
                </div>
                <button id='settingsSubscriptionBtn'>
                    ${localData.settings.subscription.buy}
                </button>
            </div>
            <div class='settings-list'>
                <button id='languageToggleButton' class='settings-item'>
                    <div class='icon'>
                        <img src='${icons.language}'>
                    </div>
                    <div class='content'>
                        <span id='textSystemLanguage' class='title'>
                            ${localData?.settings.language.name}
                        </span>
                        <span class='value'>
                            ${localData?.settings.language.value}
                            ${arrow}
                        </span>
                    </div>
                </button>
                <button id='themeToggleButton' class='settings-item'>
                    <div class='icon'>
                        <img src='${icons.theme}'>
                    </div>
                    <div class='content'>
                        <span id='textTheme' class='title'>
                            ${localData?.settings.theme.name}
                        </span>
                        <span class='value'>
                            ${localData.settings.theme?.[`${currentTheme}`]}
                            ${arrow}
                        </span>
                    </div>
                </button>
            </div>
            <div class='settings-list'>
                <button id='contact_admin' class='settings-item'>
                    <div class='icon'>
                        <img src='${icons.support}'>
                    </div>
                    <div class='content'>
                        <span id='textContactAdmin' class='title'>
                            ${localData?.settings.support.name}
                        </span>
                        <span class='value'>
                            ${localData?.settings.support.value}
                            ${arrow}
                        </span>
                    </div>
                </button>
            </div>
        </div>
    `);

    document.getElementById('languageToggleButton').addEventListener('click', () => {
        switchView('language');
    });
    document.getElementById('themeToggleButton').addEventListener('click', () => {
        switchView('theme');
    });
    document.getElementById('contact_admin').addEventListener('click', function() {
        window?.Telegram.WebApp.openTelegramLink('https://t.me/abdurakhmanov777');
    });
    document.getElementById('settingsSubscriptionBtn').addEventListener('click', () => {
        switchView('subscription');
    });
    document.getElementById('accountBtn').addEventListener('click', () => {
        switchView('account');
    });
}
