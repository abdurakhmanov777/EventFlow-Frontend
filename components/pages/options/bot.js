import { toggleBot } from '../../../requests/requests.js';
import { icon_checkmark } from '../../../img/icons.js';
import { activation_check } from '../../../utils/bot.js';

export function renderBotEnable(param) {
    const lang = localStorage.getItem('language') || 'ru';
    const data = JSON.parse(sessionStorage.getItem(`lang_${lang}`));
    const status = activation_check(data, param.status).var;

    document.querySelector('#root').innerHTML = '';
    document.querySelector('#root').insertAdjacentHTML('afterbegin', `
        <div id='themeSection' class='full-page'>
            <h2>${data?.settingsBot.status.name}</h2>
            <div class='settings-list'>
                <label class='settings-option'>
                    <input type='radio' name='bot' value='on'>
                    <div class='text'>
                        <span id='textThemeSystem'>${data?.settingsBot.status.on}</span>
                    </div>
                    <i class='checkmark'>
                        ${icon_checkmark}
                    </i>
                </label>
                <label class='settings-option'>
                    <input type='radio' name='bot' value='off'>
                    <div class='text'>
                        <span id='textThemeDark'>${data?.settingsBot.status.off}</span>
                    </div>
                    <i class='checkmark'>
                        ${icon_checkmark}
                    </i>
                </label>
            </div>
        </div>
    `);
    updateBotSelection(status);

    function filterOptionsByName(name) {
        const options = document.querySelectorAll('.settings-option');
        return Array.from(options).filter(option => {
            const input = option.querySelector("input[type='radio']");
            return input && input.name === name;
        });
    }
    const botOptions = filterOptionsByName('bot');

    botOptions.forEach(option => {
        option.addEventListener('click', async e => {
            const input = option.querySelector("input[type='radio']");
            if (e.target !== input) return;

            const newValue = input.value;
            const currentValue = sessionStorage.getItem('bot');
            if (newValue === currentValue) {
                updateBotSelection(currentValue);
                input.blur();
                return;
            }

            const radios = document.querySelectorAll("input[name='bot']");
            radios.forEach(radio => radio.disabled = true);

            const result = await toggleBot(param.api, newValue);
            if (result) {
                updateBotSelection(newValue);
                sessionStorage.setItem('bot', newValue);
                sessionStorage.setItem('pageSettings', JSON.stringify(result));
            } else {
                updateBotSelection(currentValue);
                Telegram.WebApp.showAlert(data.settingsBot.status.error[currentValue]);
            }

            setTimeout(() => radios.forEach(radio => radio.disabled = false), 2000);
        });
    });




    async function updateBotSelection(status) {
        const radioButtons = document.querySelectorAll("input[name='bot']");
        radioButtons.forEach(radio => {
            const label = radio.closest('.settings-option');
            const checkmark = label.querySelector('.checkmark');
            checkmark.style.display = 'none';
        });

        const selectedRadio = document.querySelector(`input[name='bot'][value='${status}']`);
        if (selectedRadio) {
            const selectedLabel = selectedRadio.closest('.settings-option');
            const checkmark = selectedLabel.querySelector('.checkmark');
            checkmark.style.display = 'inline';
        };
    }
}
