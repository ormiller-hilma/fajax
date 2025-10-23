import { sendToServer } from "../js/server.js"

// the odds that the data will get lost
const dataLoseChance = 0;

function sleep(ms) {
    const end = Date.now() + ms;
    while (Date.now() < end) { }
}

export function sendFromFajaxToNetwork(method, url, data) {
    sleep(300);
    if (Math.random() < dataLoseChance) {
        sleep(3000);
        return;
    }

    return sendToServer(method, url, data)
}