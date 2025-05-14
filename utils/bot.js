import { icon_off, icon_on } from "../img/icons.js";

export function activation_check(data, flag) {
    if (flag) {
        return { icon: icon_on, value: data?.settingsBot.status.on, var: 'on' };
    } else {
        return { icon: icon_off, value: data?.settingsBot.status.off, var: 'off' };
    }
}
