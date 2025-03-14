import { initializeApp } from "./components/init.js";

document.addEventListener('DOMContentLoaded', () => {
    const tg = Telegram?.WebApp;
    // if (!tg.initDataUnsafe?.user?.id) {
    //     document.body.innerHTML = '<div class="center-message">The site is unavailable outside of Telegram</div>';
    //     return;
    // }
    tg.expand();
    tg.disableVerticalSwipes();
    // tg.enableClosingConfirmation();
    initializeApp();
});
