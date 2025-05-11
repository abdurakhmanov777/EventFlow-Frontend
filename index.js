import { initializeApp } from "./components/init.js";

const tg = Telegram?.WebApp;
tg.expand();
tg.disableVerticalSwipes();
initializeApp();
