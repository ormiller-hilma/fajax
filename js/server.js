import { SaveData, DeleteData, ModifyData, GetData, GetUser } from "./database.js";

export function SendToServer(method, url, data, obj) {
    switch (method) {
        case "GET":
            Get(url, obj);
            break;
        case "PUT":
            Put(url, data, obj);
            break;
        case "POST":
            Post(url, data, obj);
            break;
        case "DELETE":
            Delete(url, obj);
            break;
        default:
            console.error("A valid method was not provided for FXMLHttpRequest")
            break;
    }
}

function Get(url, obj) {
    const index = getUrlIndex(url);
    const data = GetData(url, index);

    obj.responseText = data;
    if (data === null) {
        obj.status = 400; // error
    }
    obj.reciveFromServer();
}

function Put(url, data, obj) {
    // upadate
    const index = getUrlIndex(url);
    obj.status = ModifyData(url, index, data);

    obj.reciveFromServer();
}

function Delete(url, obj) {
    const index = getUrlIndex(url);
    obj.status = DeleteData(url, index)

    obj.reciveFromServer();
}

function Post(url, data, obj) {
    switch (url) {
        case "users/get-user-data":
            const user = GetUser(data.username);
            if (user === null) break;
            if (user.username === data.username && user.password === data.password) {
                obj.responseText = JSON.stringify(user);
            }
            break;
        case "users":
            obj.status = SaveData(url, data);
            break;

        default:
            break;
    }
    obj.reciveFromServer();
}

function getUrlIndex(url) { // returns NaN if no index
    const urlArray = url.split("/");
    const urlIndex = Number.parseInt(urlArray[urlArray.length - 1]);
    return urlIndex;
} 