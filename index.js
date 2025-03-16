import { initializeApp } from "./components/init.js";
import { initTheme } from "./components/pages/options/theme.js";

const tg = Telegram?.WebApp;
tg.expand();
tg.disableVerticalSwipes();
initializeApp();
// document.addEventListener('DOMContentLoaded', () => {
//     // if (!tg.initDataUnsafe?.user?.id) {
//     //     document.body.innerHTML = '<div class="center-message">The site is unavailable outside of Telegram</div>';
//     //     return;
//     // }
//     // tg.enableClosingConfirmation();
//     initializeApp();
// });
