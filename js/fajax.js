import { SendToServer } from "../js/server.js"

export function FXMLHttpRequest() {
    this.responseText = "";
    this.status = 0;

    this.onload = () => { };

    this._method = "";
    this._url = "";
    this.open = (method, url) => {
        this._method = method;
        this._url = url;
    }
    this.send = (data) => {
        SendToServer(this._method, this._url, data, this);
    }

    // server sent a response
    this.reciveFromServer = () => {
        this.onload();
    }
}

