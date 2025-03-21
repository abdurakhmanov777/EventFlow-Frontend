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
import { renderEditor } from './pages/editor/editor.js';

// const animation_list = ['botList', 'botForm', 'account', 'language', 'theme']
const tg = Telegram?.WebApp;
let currentView = sessionStorage.getItem('page') || 'main';
// let pageSettings = sessionStorage.getItem('pageSettings') || {};
// let previousView = sessionStorage.getItem('previousPage') || null;

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

export function switchView(view, param = null) {
    currentView = view;

    if (view === 'editor') {
        const settings = param || JSON.parse(sessionStorage.getItem('pageSettings') || '{}');
        renderEditor(settings);
        sessionStorage.setItem('pageSettings', JSON.stringify(settings));
    } else {
        (renderers[view] || renderMain)();
    }

    toggleTopPanel(view);
    toggleBackButton();
    updateActiveButton(view);

    sessionStorage.setItem('page', view);
}

function toggleTopPanel(view) {
    const displayStyle = ['main', 'subscription', 'settings'].includes(view) ? 'flex' : 'none';
    document.getElementById('topPanel').style.display = displayStyle;
}


function toggleBackButton() {
    const action = currentView === 'main' ? 'hide' : 'show';
    tg.BackButton[action]();
}

export const initializeApp = async () => {
    await initTheme();
    document.addEventListener('DOMContentLoaded', async () => {
        await initLocalization();
        renderSidebar();
        // Telegram.WebApp.showAlert(sessionStorage.getItem('page'));
        switchView(currentView);
        tg.BackButton.onClick(() => {
            const views = {
                'account': 'settings',
                'language': 'settings',
                'theme': 'settings',
                'editor': 'botList'
            };
            switchView(views[currentView] || 'main');
            addAnimation('.page');
        });
    });
};
