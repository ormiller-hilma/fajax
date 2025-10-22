import { SaveData, DeleteData, ModifyData, GetData, GetUser } from "./database.js";
import { sendFromServerToNetwork } from "./network.js";

window.addEventListener("message", (event) => {
    if (event.data.target === "server") {
        const payload = event.data.payloud;
        console.log(payload)
        const dataObject = SendToServer(payload.method, payload.url, payload.data);
        dataObject.id = payload.id;
        sendFromServerToNetwork(dataObject);
    }
});

export function SendToServer(method, url, data) {
    switch (method) {
        case "GET":
            return Get(url);
        case "PUT":
            return Put(url, data);
        case "POST":
            return Post(url, data);
        case "DELETE":
            return Delete(url);
        default:
            console.error("A valid method was not provided for FXMLHttpRequest")
            break;
    }
}

function Get(url) {
    const index = getUrlIndex(url);
    const data = GetData(url, index);

    const dataObject = {
        responseText: data,
        status: 200
    }
    if (data === null) {
        dataObject.status = 400; // error
        dataObject.responseText = "";
    }

    return dataObject;
}

function Put(url, data) {
    // upadate
    const dataObject = {
        responseText: JSON.stringify(data),
        status: 200
    }

    dataObject.status = ModifyData(url, data);

    return dataObject;
}

function Delete(url) {
    const dataObject = {
        responseText: data,
        status: 200
    }

    const index = getUrlIndex(url);
    dataObject.status = DeleteData(url, index)

    return dataObject;
}

function Post(url, data, obj) {
    const dataObject = {
        responseText: data,
        status: 200
    }

    switch (url) {
        case "users/get-user-data":
            const userData = GetUser(data.username);
            if (userData === null) {
                dataObject.status = 401; // didn't find user
                break
            };
            const user = userData.user;
            if (user.username === data.username && user.password === data.password) {
                dataObject.responseText = JSON.stringify(user);
            }
            else {
                dataObject.status = 401; // incorrect user or password
            }
            break;
        case "users":
            dataObject.status = SaveData(url, data);
            break;

        default:
            break;
    }

    return dataObject;
}

function getUrlIndex(url) { // returns NaN if no index
    const urlArray = url.split("/");
    const urlIndex = Number.parseInt(urlArray[urlArray.length - 1]);
    return urlIndex;
}