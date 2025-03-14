// const BASE_URL = "https://4g7zqplm-8000.euw.devtunnels.ms";
const BASE_URL = "http://127.0.0.1:8000";

export async function validateAndSubmitForm() {
    const name = document.getElementById('botNameInput').value.trim();
    const api = document.getElementById('botApiInput').value.trim();
    // Telegram.WebApp.showAlert(`${name} ${api}`);
    const userId = Telegram.WebApp?.initDataUnsafe?.user?.id || 'unknown';

    const lang = localStorage.getItem('language') || 'ru';
    const data = JSON.parse(sessionStorage.getItem(`lang_${lang}`));

    // const [errorTextApi, errorTextName, errorIncorrect, successfull, unsuccessfull] =

    if (name.length < 5) errors.push(data.botForm.error.name);
    if (api.length < 5) errors.push(data.botForm.error.api);

    document.getElementById('botNameInput').classList.toggle("error", name.length < 5);
    document.getElementById('botApiInput').classList.toggle("error", api.length < 5);

    if (errors.length) {
        return Telegram.WebApp.showAlert(`${data.botForm.error.incorrect}: ${errors.join(", ")}`);
    }

    try {
        await fetch(`${BASE_URL}/bot/submit_bot_name`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId, name, api })
        });
        Telegram.WebApp.showAlert(data.botForm.successfull);
    } catch (error) {
        Telegram.WebApp.showAlert(data.botForm.unsuccessfull);
        console.error('Ошибка при отправке данных:', error);
    }
}

export async function fetchBotList(userId) {
    if (!userId) return;

    try {
        const response = await fetch(`${BASE_URL}/bot/get_bot_list`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId })
        });
        const data = await response.json();
        updateBotList(data);
    } catch (error) {
        console.error('Ошибка при загрузке списка ботов:', error);
        document.getElementById("noBotsMessage").style.display = "block";
        document.getElementById("botListItems").style.display = "none";
    }
}

function updateBotList(data) {
    const botListItems = document.getElementById("botListItems")
    const noBotsMessage = document.getElementById("noBotsMessage")

    if (data.bots?.length) {
        botListItems.innerHTML = data.bots.map(bot => `<button class="bot-button">${bot.name}</button>`).join('');
        botListItems.style.display = "block";
        noBotsMessage.style.display = "none";
    } else {
        botListItems.style.display = "none";
        noBotsMessage.style.display = "block";
    }
}
