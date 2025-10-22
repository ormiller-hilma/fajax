import { sendFromFajaxToNetwork } from "./network.js";

let id = 0;
const fajaxArray = [];

window.addEventListener("message", (event) => {
    if (event.data.target === "fajax") {
        const id = event.data.payloud.id;
        for (let i = 0; i < fajaxArray.length; i++) {
            if (fajaxArray[i].id === id) {
                fajaxArray[i].reciveFromServer(event.data.payloud);
                fajaxArray.slice(i, 1);
                return;
            }
        }
        // const lastFajax = fajaxArray.shift();
        // lastFajax.reciveFromServer(event.data.payloud);
    }
});

export function FXMLHttpRequest() {
    this.responseText = "";
    this.status = 0;

    this.id = id;
    id++;

    this.onload = () => { };

    this._method = "";
    this._url = "";
    this.open = (method, url) => {
        this._method = method;
        this._url = url;
    }
    this.send = (data) => {
        sendFromFajaxToNetwork(this._method, this._url, data, this.id);
    }

    // server sent a response
    this.reciveFromServer = (fetchedData) => {
        //console.log("DATA FETCHED:", fetchedData);
        this.responseText = fetchedData.responseText;
        this.status = fetchedData.status;
        this.onload();
    }


    fajaxArray.push(this);
}