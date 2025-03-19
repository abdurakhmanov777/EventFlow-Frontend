// const BASE_URL = 'https://4g7zqplm-8000.euw.devtunnels.ms';
const BASE_URL = 'http://127.0.0.1:8000';

export async function validateAndSubmitForm() {
    const lang = localStorage.getItem('language') || 'ru';
    const data = JSON.parse(sessionStorage.getItem(`lang_${lang}`));

    const botNameInput = document.getElementById('botNameInput');
    const botApiInput = document.getElementById('botApiInput');

    const name = botNameInput.value.trim();
    const api = botApiInput.value.trim();
    const userId = Telegram.WebApp.initDataUnsafe.user?.id || 'unknown';

    // const apiRegex = /\d{10}:[A-Za-z0-9_-]{35}/g;
    const apiRegex = /^.{5,}$/;

    const errors = [];
    if (name.length < 5) errors.push(data.botForm.error.name);
    if (!api.match(apiRegex)) errors.push(data.botForm.error.api);

    botNameInput.classList.toggle('error', name.length < 5);
    botApiInput.classList.toggle('error', api.length < 5);

    if (errors.length) {
        return Telegram.WebApp.showAlert(`${data.botForm.error.incorrect}: ${errors.join(', ')}`);
    }
    try {
        const response = await fetch(`${BASE_URL}/bot/submit_bot_name`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId, name, api })
        });

        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

        const result = await response.json();
        if (result.message === true) {
            Telegram.WebApp.showAlert(data.botForm.success.true);
        } else {
            const messageArr = [];
            if (!(result.message[0])) messageArr.push(data.botForm.success.name);
            if (!(result.message[1])) messageArr.push(data.botForm.success.api);
            Telegram.WebApp.showAlert(`${data.botForm.success.false}${messageArr.join(', ')}`);
        }
    } catch (error) {
        console.error('Ошибка при отправке данных:', error);
        Telegram.WebApp.showAlert(data.botForm.unsuccess);
    }
}

export async function fetchBotList() {
    const userId = Telegram.WebApp.initDataUnsafe.user?.id;
    if (!userId) return;

    try {
        const response = await fetch(`${BASE_URL}/bot/get_bot_list`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId })
        });
        const data = await response.json();
        updateBotList(data);
        return data
    } catch (error) {
        console.error('Ошибка при загрузке списка ботов:', error);
        // document.getElementById('botListItems').style.display = 'none';
    }
}


function updateBotList(data) {
    if (data.bots?.length) {
        const botList = document.getElementById('botListContainer');
        const botListItems = document.getElementById('botListItems');
        const header = document.querySelector('h5');
        botListItems.innerHTML = data.bots.map(bot =>
            `<button class='bot-button' id='${bot.name}'>${bot.name}</button>`
        ).join('');
        botList.style.display = 'block';
        header.style.display = 'block';
    } else {
        const noBotsMessage = document.getElementById('noBotsMessage');
        noBotsMessage.style.display = 'block';
    }
}
