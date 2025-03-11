export let currentLanguage = localStorage.getItem('language') || 'ru';

export async function initLocalization() {
    const data = await loadLocalization(currentLanguage);
    await updateLocalization(data);
}

export async function editLocalization(language) {
    const data = await loadLocalization(language);
    await updateHeader(data);
    await updateLocalization(data);
}

async function loadLocalization(language) {
    const cacheKey = `lang_${language}`;
    const cachedData = localStorage.getItem(cacheKey);
    localStorage.setItem('language', language);
    try {
        const data = cachedData ? JSON.parse(cachedData) : await fetchLocalization(language);
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
        return data
    } catch (error) {
        console.error('Ошибка загрузки локализации:', error);
    }
}

async function updateLocalization(data) {
    document.getElementById('mainBtn').textContent = data.sidebar.main
    document.getElementById('subscriptionBtn').textContent = data.sidebar.subscription
    document.getElementById('settingsBtn').textContent = data.sidebar.settings
}

async function updateHeader(data) {
    document.querySelector('h3').textContent = data.settings.language.name;
}


async function fetchLocalization(language) {
    const response = await fetch(`./lang/${language}.json`);
    if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
    return response.json();
}
