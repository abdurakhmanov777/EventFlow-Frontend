import { initLocalization } from '../utils/localization.js';
import { renderBotForm } from './pages/botForm/botForm.js';
import { renderBotList } from './pages/botList/botList.js';
import { renderMain } from './pages/main/main.js';
import { renderSubscription } from './pages/subscription/subscription.js';
import { renderSettings } from './pages/settings/settings.js';
import { renderLanguage } from './pages/language/language.js';
import { renderTheme } from './pages/theme/theme.js';
import { initMenu, updateActiveButton, sidebar_passive } from './sidebar/sidebar.js';
import { renderAccount } from './pages/account/account.js';
import { addAnimation } from '../utils/animations.js';

const tg = Telegram?.WebApp;
let currentView = sessionStorage.getItem('page') || 'main';

const renderers = {
    main: renderMain,
    botForm: renderBotForm,
    botList: renderBotList,
    subscription: renderSubscription,
    settings: renderSettings,
    language: renderLanguage,
    theme: renderTheme,
    account: renderAccount,
};

export function switchView(view) {
    currentView = view;
    sessionStorage.setItem('page', view);
    render();
    sidebar_passive();
    tg.BackButton[currentView === 'main' ? 'hide' : 'show']();
    updateActiveButton(currentView);
}

function render() {
    (renderers[currentView] || renderMain)();
    const isMainView = ['main', 'subscription', 'settings'].includes(currentView);
    document.getElementById('topPanel').style.display = isMainView ? 'flex' : 'none';
}

export async function initializeApp() {
    await initLocalization();
    switchView(currentView);
    initMenu();
    tg.BackButton.onClick(() => {
        if (['account', 'language', 'theme'].includes(currentView)) {
            switchView('settings');
            addAnimation('.page');
        } else {
            switchView('main');
        }
    });
}
