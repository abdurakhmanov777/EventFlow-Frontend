import { initializeApp } from "./components/init.js";

document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram?.WebApp;
    tg.expand();
    tg.disableVerticalSwipes();
    initializeApp();
});
