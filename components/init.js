import { initLocalization } from '../utils/localization.js';
import { renderBotForm } from './pages/botForm/botForm.js';
import { renderBotList } from './pages/botList/botList.js';
import { renderMain } from './pages/main/main.js';
import { renderSubscription } from './pages/subscription/subscription.js';
import { renderSettings } from './pages/settings/settings.js';
import { renderLanguage } from './pages/options/language.js';
import { renderTheme } from './pages/options/theme.js';
import { updateActiveButton, renderSidebar } from './sidebar/sidebar.js';
import { renderAccount } from './pages/account/account.js';
import { addAnimation } from '../utils/animations.js';
import { initTheme } from '../utils/theme.js';

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
    tg.BackButton[currentView === 'main' ? 'hide' : 'show']();
    updateActiveButton(currentView);
}

function render() {
    (renderers[currentView] || renderMain)();
    const isMainView = ['main', 'subscription', 'settings'].includes(currentView);
    document.getElementById('topPanel').style.display = isMainView ? 'flex' : 'none';
}

export const initializeApp = async () => {
    await initTheme();
    document.addEventListener('DOMContentLoaded', async () => {
        await initLocalization();
        renderSidebar();
        switchView(currentView);
        tg.BackButton.onClick(() => {
            switchView(['account', 'language', 'theme'].includes(currentView) ? 'settings' : 'main');
            if (currentView === 'settings') addAnimation('.page');
        });
    });
};
