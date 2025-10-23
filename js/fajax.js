import { sendFromFajaxToNetwork } from "./network.js";

export class FXMLHttpRequest {
    constructor(parameters) {
        this.responseText = "";
        this.status = 0;

        this._method = "";
        this._url = "";

        this.onload = () => { };
    }

    open(method, url) {
        this._method = method;
        this._url = url;
    }
    send(data) {
        const fetchedData = sendFromFajaxToNetwork(this._method, this._url, data);
        try {
            this.reciveFromServer(fetchedData);
        } catch (error) {
            console.error("Timeout fajax didn't recive response in time")
        }

    }

    // server sent a response
    reciveFromServer(fetchedData) {
        //console.log("DATA FETCHED:", fetchedData);
        this.responseText = fetchedData.responseText;
        this.status = fetchedData.status;
        this.onload();
    }
}