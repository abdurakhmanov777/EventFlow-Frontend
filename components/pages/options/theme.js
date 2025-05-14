import { icon_checkmark } from '../../../img/icons.js';
import { loadTheme } from '../../../utils/theme.js';

export function renderTheme() {
    let theme = localStorage.getItem('theme') || 'system';
    const lang = localStorage.getItem('language') || 'ru';
    const data = JSON.parse(sessionStorage.getItem(`lang_${lang}`));

    document.querySelector('#root').innerHTML = '';
    document.querySelector('#root').insertAdjacentHTML('afterbegin', `
        <div id='themeSection' class='full-page'>
            <h2>${data.settings.theme.name}</h2>
            <div class='settings-list'>
                <label class='settings-option'>
                    <input type='radio' name='theme' value='system'>
                    <div class='text'>
                        <span id='textThemeSystem'>${data.settings.theme.system}</span>
                    </div>
                    <i class='checkmark'>
                        ${icon_checkmark}
                    </i>
                </label>
                <label class='settings-option'>
                    <input type='radio' name='theme' value='dark'>
                    <div class='text'>
                        <span id='textThemeDark'>${data.settings.theme.dark}</span>
                    </div>
                    <i class='checkmark'>
                        ${icon_checkmark}
                    </i>
                </label>
                <label class='settings-option'>
                    <input type='radio' name='theme' value='light'>
                    <div class='text'>
                        <span id='textThemeLight'>${data.settings.theme.light}</span>
                    </div>
                    <i class='checkmark'>
                        ${icon_checkmark}
                    </i>
                </label>
            </div>
        </div>
    `);
    updateThemeSelection(theme);

    function filterOptionsByName(name) {
        const options = document.querySelectorAll('.settings-option');
        return Array.from(options).filter(option => {
            const input = option.querySelector("input[type='radio']");
            return input && input.name === name;
        });
    }
    const themeOptions = filterOptionsByName('theme');

    themeOptions.forEach(option =>
        option.addEventListener('change', e => {
            loadTheme(e.target.value);
            updateThemeSelection(e.target.value);
        })
    );
    async function updateThemeSelection(theme) {
        const radioButtons = document.querySelectorAll("input[name='theme']");
        radioButtons.forEach(radio => {
            const label = radio.closest('.settings-option');
            const checkmark = label.querySelector('.checkmark');
            checkmark.style.display = 'none';
        });

        const selectedRadio = document.querySelector(`input[name='theme'][value='${theme}']`);
        if (selectedRadio) {
            const selectedLabel = selectedRadio.closest('.settings-option');
            const checkmark = selectedLabel.querySelector('.checkmark');
            checkmark.style.display = 'inline';
        }
    }
}
