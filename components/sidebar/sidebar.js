import { switchView } from '../init.js';

export const sidebar_passive = () => sidebar?.classList.remove('active');
const sidebar_active = () => sidebar?.classList.toggle('active');

const initMenuButton = () => {
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.getElementById('menuBtn');

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

export function renderSidebar() {
    const lang = localStorage.getItem('language') || 'ru';
    const data = JSON.parse(sessionStorage.getItem(`lang_${lang}`));

    document.querySelector('#root-sidebar').innerHTML = '';
    document.querySelector('#root-sidebar').insertAdjacentHTML('afterbegin', `
        <div id="sidebar">
            <ul>
                <button id="mainBtn">
                    ${data.sidebar.main}
                </button>
                <button id="subscriptionBtn">
                    ${data.sidebar.subscription}
                </button>
                <button id="settingsBtn">
                    ${data.sidebar.settings}
                </button>
            </ul>
            <div id="sidebarFooter">ProjectByDalgat</div>
        </div>
        <div id="topPanel">
            <button class="menu-button" id="menuBtn">
                <div class="icon-menu">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 8.5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M3 15.5H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </div>
            </button>
        </div>
    `);

    initSidebar();
    initMenuButton();
    initSwipeGesture();

    document.getElementById('mainBtn').addEventListener('click', () => {
        switchView('main');
    });
    document.getElementById('subscriptionBtn').addEventListener('click', () => {
        switchView('subscription');
    });
    document.getElementById('settingsBtn').addEventListener('click', () => {
        switchView('settings');
    });
}
