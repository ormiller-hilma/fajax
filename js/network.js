import { SendToServer } from "../js/server.js" // needed even if not used

// the odds that the data will get lost
const serverLosingChance = 0;
const fajaxLosingChance = 0;

function sleep(ms) {
    const end = Date.now() + ms;
    while (Date.now() < end) { }
}

export function sendFromFajaxToNetwork(method, url, data, id) {
    if (Math.random() < fajaxLosingChance) {
        return;
    }
    window.postMessage({ target: "server", payloud: { method, url, data, id } }, "*");
}

export function sendFromServerToNetwork(payload) {
    if (Math.random() < serverLosingChance) {
        return;
    }
    sleep(500 + Math.random() * 2000);
    window.postMessage({ target: "fajax", payloud: payload }, "*");
}