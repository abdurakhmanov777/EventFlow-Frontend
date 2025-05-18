import { initLocalization } from '../utils/localization.js';
import { renderCreateBot } from './pages/createBot/createBot.js';
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
import { renderSettingsBot } from './pages/settingsBot/settingsBot.js';
import { renderBotEnable } from './pages/options/bot.js';
import { editorBot } from './pages/editor/editor.js';

const tg = Telegram?.WebApp;
let currentView = sessionStorage.getItem('page') || 'main';

export function getCurrentView() {
    return currentView;
}

const renderers = {
    main: renderMain,
    createBot: renderCreateBot,
    botList: renderBotList,
    settingsBot: renderSettingsBot,
    botEnable: renderBotEnable,
    subscription: renderSubscription,
    settings: renderSettings,
    language: renderLanguage,
    theme: renderTheme,
    account: renderAccount,
    editor: editorBot
};

const viewsWithSettings = new Set(['settingsBot', 'botEnable', 'editor']);
const viewsWithTopPanel = new Set(['main', 'subscription', 'settings']);
const backRoutes = {
    account: 'settings',
    language: 'settings',
    theme: 'settings',
    settingsBot: 'botList',
    botEnable: 'settingsBot',
    editor: 'settingsBot'
};

export function switchView(view, param = null) {
    currentView = view;
    const render = renderers[view] || renderMain;

    if (viewsWithSettings.has(view)) {
        const settings = param || JSON.parse(sessionStorage.getItem('pageSettings') || '{}');
        render(settings);
        sessionStorage.setItem('pageSettings', JSON.stringify(settings));
    } else {
        render();
    }

    document.getElementById('topPanel').style.display = viewsWithTopPanel.has(view) ? 'flex' : 'none';
    tg.BackButton[currentView === 'main' ? 'hide' : 'show']?.();
    updateActiveButton(view);
    sessionStorage.setItem('page', view);
}

export const initializeApp = async () => {
    await initTheme();

    const start = async () => {
        await initLocalization();
        renderSidebar();
        switchView(currentView);

        tg?.BackButton?.onClick?.(() => {
        switchView(backRoutes[currentView] || 'main');
        addAnimation('.page', 'short_animation_down');
        });
    };

    document.readyState === 'loading'
        ? document.addEventListener('DOMContentLoaded', start)
        : await start();
};
