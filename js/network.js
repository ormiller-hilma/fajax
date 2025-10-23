import { sendToServer } from "../js/server.js"

// the odds that the data will get lost
const dataLoseChance = 0.1;

function sleep(ms) {
    const end = Date.now() + ms;
    while (Date.now() < end) { }
}

export function sendFromFajaxToNetwork(method, url, data) {
    sleep(Math.random() * 1000);

    if (Math.random() < dataLoseChance) {
        sleep(1500);
        return;
    }
    return sendToServer(method, url, data);
}