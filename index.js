import { initializeApp } from "./components/init.js";

document.addEventListener('DOMContentLoaded', () => {
    const tg = Telegram?.WebApp;
    tg.expand();
    tg.disableVerticalSwipes();
    // tg.enableClosingConfirmation();
    initializeApp();
});
