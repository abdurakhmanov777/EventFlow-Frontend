export async function loadTheme(theme) {
    const tg = Telegram.WebApp;
    const selectedTheme = theme === 'system' ? tg.colorScheme : theme;

    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', selectedTheme);

    const headerColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-color').trim();

    tg.setHeaderColor(headerColor);
    tg.setBottomBarColor(headerColor);
    tg.setBackgroundColor(headerColor);
}


// tg.showAlert(Telegram.WebApp.version)
// Telegram.WebApp.setColorScheme("dark");
// tg.showAlert(Telegram.WebApp.colorScheme);
// Telegram.WebApp.colorScheme = "dark";

export async function initTheme() {
    const theme = localStorage.getItem('theme') || 'system';
    loadTheme(theme);

    Telegram.WebApp.onEvent('themeChanged', () => {
        const updatedTheme = localStorage.getItem('theme') || 'system';
        loadTheme(updatedTheme);
    });
}
