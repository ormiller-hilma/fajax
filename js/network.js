import { SendToServer } from "../js/server.js"

// the odds that the data will get lost
const serverLosingChance = 0;
const fajaxLosingChance = 0;

function sleep(ms) {
    const end = Date.now() + ms;
    while (Date.now() < end) { }
}

export function sendFromFajaxToNetwork(method, url, data) {
    sleep(300);
    if (Math.random() < fajaxLosingChance) {
        return;
    }
    return SendToServer(method, url, data)
}