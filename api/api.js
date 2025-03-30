// const BASE_URL = 'https://4g7zqplm-8000.euw.devtunnels.ms';
// const BASE_URL = 'http://127.0.0.1:8000';
const BASE_URL = 'https://a33193-3357.t.d-f.pw';
const userId = Telegram.WebApp.initDataUnsafe.user?.id || 'unknown';

async function apiRequest(endpoint, data = {}) {
    if (!userId) throw new Error('The ID is indefinite');
    try {
        const response = await fetch(`${BASE_URL}/bot/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId, ...data })
        });
        if (!response.ok) throw new Error(`Failed to ${endpoint}`);
        // Telegram.WebApp.showAlert(JSON.stringify(response))
        return response.json();
    } catch {
        return;
    }
}

export const sendBotData = (name, api) => apiRequest('create_new_bot', { name, api });
export const deleteBot = (name) => apiRequest('delete_bot', { name });
export const toggleBot = (api, value) => apiRequest('toggle_bot', { api, value });
export const addbot = (api) => apiRequest('addbot', { api });
export const toggleLang = (value) => apiRequest('toggle_lang', { value });
export const fetchBotList = () => apiRequest('get_bot_list');
