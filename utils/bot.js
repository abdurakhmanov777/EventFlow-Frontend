import { icon_off, icon_on } from "../img/icons.js";

export function activation_check(data, flag) {
    // Telegram.WebApp.showAlert(flag)
    if (flag) {
        // sessionStorage.setItem('bot', 'on');
        return { icon: icon_on, value: data?.editor.status.on, var: 'on' };
    } else {
        // sessionStorage.setItem('bot', 'off');
        return { icon: icon_off, value: data?.editor.status.off, var: 'off' };
    }
    // return true
}
