import { switchView } from '../init.js';

const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menuBtn');

export const initMenu = () => {
    initBtnSidebar();
    initSidebar();
    initMenuButton();
    initSwipeGesture();
};

export const sidebar_passive = () => sidebar?.classList.remove('active');
const sidebar_active = () => sidebar?.classList.toggle('active');

const initMenuButton = () => {
    if (!menuBtn || !sidebar) return;

    menuBtn.addEventListener('click', sidebar_active);
    document.addEventListener('click', ({ target }) => {
        if (!sidebar.contains(target) && !menuBtn.contains(target)) sidebar_passive();
    });
};

const initSwipeGesture = () => {
    if (!sidebar) return;
    let touchStartX = 0;

    sidebar.addEventListener('touchstart', (e) => touchStartX = e.touches[0].clientX);
    sidebar.addEventListener('touchend', (e) => {
        if (touchStartX - e.changedTouches[0].clientX > 100) sidebar_passive();
    });
};

const initBtnSidebar = () => {
    document.getElementById('mainBtn').addEventListener('click', () => {
        switchView('main')
    });
    document.getElementById('subscriptionBtn').addEventListener('click', () => {
        switchView('subscription')
    });
    document.getElementById('settingsBtn').addEventListener('click', () => {
        switchView('settings')
    });
}

const initSidebar = () => {
    const buttons = document.querySelectorAll('#sidebar button');
    const setActive = (button) => buttons.forEach(btn => btn.classList.toggle('active', btn === button));

    buttons.forEach(button => button.addEventListener('click', () => setActive(button)));

    const activeButton = [...buttons].find(button => button.querySelector('a')?.getAttribute('href') === window.location.hash);
    if (activeButton) setActive(activeButton);
};

export function updateActiveButton(page) {
    const pages = {
        main: 'mainBtn',
        botList: 'mainBtn',
        botForm: 'mainBtn',
        settings: 'settingsBtn',
        language: 'settingsBtn',
        theme: 'settingsBtn',
        subscription: 'subscriptionBtn',
    };

    ['mainBtn', 'settingsBtn', 'subscriptionBtn'].forEach(id => {
        document.getElementById(id)?.classList.toggle('active', id === pages[page]);
    });
}
