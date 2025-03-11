// import { switchView } from '../index.js';

export function renderTheme() {
    let currentTheme = localStorage.getItem('theme') || 'system';

    const currentLanguage = localStorage.getItem('language') || 'ru';
    const localData = JSON.parse(sessionStorage.getItem(`lang_${currentLanguage}`));

    document.querySelector('#root').innerHTML = '';
    document.querySelector('#root').insertAdjacentHTML('afterbegin', `
        <div id='themeSection' class='full-page'>
            <h4>${localData.settings.theme.name}</h4>
            <div class='settings-list'>
                <label class='settings-option'>
                    <input type='radio' name='theme' value='system'>
                    <div class='text'>
                        <span id='textThemeSystem'>${localData.settings.theme.system}</span>
                    </div>
                    <i class='checkmark'>
                        <img src='/miniapp/img/icons/chekmark.svg'>
                    </i>
                </label>
                <label class='settings-option'>
                    <input type='radio' name='theme' value='dark'>
                    <div class='text'>
                        <span id='textThemeDark'>${localData.settings.theme.dark}</span>
                    </div>
                    <i class='checkmark'>
                        <img src='/miniapp/img/icons/chekmark.svg'>
                    </i>
                </label>
                <label class='settings-option'>
                    <input type='radio' name='theme' value='light'>
                    <div class='text'>
                        <span id='textThemeLight'>${localData.settings.theme.light}</span>
                    </div>
                    <i class='checkmark'>
                        <img src='/miniapp/img/icons/chekmark.svg'>
                    </i>
                </label>
            </div>
        </div>
    `);
    updateThemeSelection(currentTheme);

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
            checkmark.style.display = 'none'; // скрыть checkmark
        });

        const selectedRadio = document.querySelector(`input[name='theme'][value='${theme}']`);
        if (selectedRadio) {
            const selectedLabel = selectedRadio.closest('.settings-option');
            const checkmark = selectedLabel.querySelector('.checkmark');
            checkmark.style.display = 'inline';
        }
    }

}


async function loadTheme(theme) {
    try {
        localStorage.setItem('theme', theme);
        // document.body.className = `theme-${theme}`;
    } catch (error) {
        console.error('Ошибка загрузки темы:', error);
    }
}
