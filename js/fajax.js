import { sendFromFajaxToNetwork } from "./network.js";

const fajaxArray = [];

function getNewId() {
    let id = 0;
    return () => {
        id++;
        return id;
    }
}

const idCounter = getNewId();

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
    }
});

export class FXMLHttpRequest {
    constructor(parameters) {
        this.responseText = "";
        this.status = 0;

        this.id = idCounter();

        this._method = "";
        this._url = "";

        this.onload = () => { };
        fajaxArray.push(this);
    }

    open = (method, url) => {
        this._method = method;
        this._url = url;
    }
    send = (data) => {
        sendFromFajaxToNetwork(this._method, this._url, data, this.id);
    }

    // server sent a response
    reciveFromServer = (fetchedData) => {
        //console.log("DATA FETCHED:", fetchedData);
        this.responseText = fetchedData.responseText;
        this.status = fetchedData.status;
        this.onload();
    }
}

// export function FXMLHttpRequest() {
//     this.responseText = "";
//     this.status = 0;

//     this.id = id;
//     id++;

//     this.onload = () => { };

//     this._method = "";
//     this._url = "";
//     this.open = (method, url) => {
//         this._method = method;
//         this._url = url;
//     }
//     this.send = (data) => {
//         sendFromFajaxToNetwork(this._method, this._url, data, this.id);
//     }

//     // server sent a response
//     this.reciveFromServer = (fetchedData) => {
//         //console.log("DATA FETCHED:", fetchedData);
//         this.responseText = fetchedData.responseText;
//         this.status = fetchedData.status;
//         this.onload();
//     }


//     fajaxArray.push(this);
// }