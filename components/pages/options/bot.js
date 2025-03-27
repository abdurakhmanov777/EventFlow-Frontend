import { icon_checkmark } from '../../../img/icons.js';
import { loadTheme } from '../../../utils/theme.js';

export function renderBotEnable(param) {
    let bot = sessionStorage.getItem('bot') || 'off';
    const lang = localStorage.getItem('language') || 'ru';
    const data = JSON.parse(sessionStorage.getItem(`lang_${lang}`));

    document.querySelector('#root').innerHTML = '';
    document.querySelector('#root').insertAdjacentHTML('afterbegin', `
        <div id='themeSection' class='full-page'>
            <h2>${data?.editor.status.name}</h2>
            <div class='settings-list'>
                <label class='settings-option'>
                    <input type='radio' name='bot' value='on'>
                    <div class='text'>
                        <span id='textThemeSystem'>${data?.editor.status.on}</span>
                    </div>
                    <i class='checkmark'>
                        ${icon_checkmark}
                    </i>
                </label>
                <label class='settings-option'>
                    <input type='radio' name='bot' value='off'>
                    <div class='text'>
                        <span id='textThemeDark'>${data?.editor.status.off}</span>
                    </div>
                    <i class='checkmark'>
                        ${icon_checkmark}
                    </i>
                </label>
            </div>
        </div>
    `);
    updateBotSelection(bot);

    function filterOptionsByName(name) {
        const options = document.querySelectorAll('.settings-option');
        return Array.from(options).filter(option => {
            const input = option.querySelector("input[type='radio']");
            return input && input.name === name;
        });
    }
    const botOptions = filterOptionsByName('bot');

    botOptions.forEach(option =>
        option.addEventListener('change', e => {
            // loadTheme(e.target.value);
            sessionStorage.setItem('bot', e.target.value);
            updateBotSelection(e.target.value);
        })
    );
    async function updateBotSelection(bot) {
        const radioButtons = document.querySelectorAll("input[name='bot']");
        radioButtons.forEach(radio => {
            const label = radio.closest('.settings-option');
            const checkmark = label.querySelector('.checkmark');
            checkmark.style.display = 'none'; // скрыть checkmark
        });

        const selectedRadio = document.querySelector(`input[name='bot'][value='${bot}']`);
        if (selectedRadio) {
            const selectedLabel = selectedRadio.closest('.settings-option');
            const checkmark = selectedLabel.querySelector('.checkmark');
            checkmark.style.display = 'inline';
        }
    }
}
