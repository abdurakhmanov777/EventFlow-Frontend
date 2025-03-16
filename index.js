import { initializeApp } from "./components/init.js";

const tg = Telegram?.WebApp;
tg.expand();
tg.disableVerticalSwipes();
initializeApp();
// if (!tg.initDataUnsafe?.user?.id) {
//     document.body.innerHTML = '<div class="center-message">The site is unavailable outside of Telegram</div>';
//     return;
// }
