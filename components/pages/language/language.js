// import { switchView } from '../../index.js';
import { editLocalization } from '../../../utils/localization.js';

export function renderLanguage() {
    let currentLanguage = localStorage.getItem('language') || 'ru';
    let localData = JSON.parse(sessionStorage.getItem(`lang_${currentLanguage}`));

    document.querySelector('#root').innerHTML = '';
    document.querySelector('#root').insertAdjacentHTML('afterbegin', `
        <div id='languageSection' class='full-page'>
            <h2>${localData.settings.language.name}</h2>
            <div class='settings-list'>
                <label class='settings-option'>
                    <input type='radio' name='language' value='en'>
                    <div class='text'>
                        <span>English</span>
                        <small>English</small>
                    </div>
                    <i class='checkmark'>
                        <img src='/miniapp/img/icons/chekmark.svg'>
                    </i>
                </label>
                <label class='settings-option'>
                    <input type='radio' name='language' value='ru'>
                    <div class='text'>
                        <span>Russian</span>
                        <small>Русский</small>
                    </div>
                    <i class='checkmark'>
                        <img src='/miniapp/img/icons/chekmark.svg'>
                    </i>
                </label>
            </div>
        </div>
    `);
    updateLanguageSelection(currentLanguage);
    // document.getElementById('createBotButton').addEventListener('click', () => {
    //     switchView('botForm');
    // });
    // document.getElementById('myBotsButton').addEventListener('click', () => {
    //     switchView('botList');
    // });

    function filterOptionsByName(name) {
        const options = document.querySelectorAll('.settings-option');
        return Array.from(options).filter(option => {
            const input = option.querySelector("input[type='radio']");
            return input && input.name === name;
        });
    }
    const languageOptions = filterOptionsByName('language');

    languageOptions.forEach(option =>
        option.addEventListener('change', e => {
            editLocalization(e.target.value);
            updateLanguageSelection(e.target.value);
        })
    );
    async function updateLanguageSelection(language) {
        const radioButtons = document.querySelectorAll("input[name='language']");
        radioButtons.forEach(radio => {
            const label = radio.closest('.settings-option');
            const checkmark = label.querySelector('.checkmark');
            checkmark.style.display = 'none'; // скрыть checkmark
        });

        const selectedRadio = document.querySelector(`input[name='language'][value='${language}']`);
        if (selectedRadio) {
            const selectedLabel = selectedRadio.closest('.settings-option');
            const checkmark = selectedLabel.querySelector('.checkmark');
            checkmark.style.display = 'inline';
        }
    }
}
