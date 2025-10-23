import { saveData, deleteData, modifyData, getData, getUser, getUserData } from "./database.js";

export function sendToServer(method, url, data) {
    switch (method) {
        case "GET":
            return get(url);
        case "PUT":
            return put(url, data);
        case "POST":
            return post(url, data);
        case "DELETE":
            return del(url);
        default:
            console.error("A valid method was not provided for FXMLHttpRequest")
            break;
    }
}

function get(url) {
    const index = getUrlIndex(url);
    const data = getData(url, index);

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

function put(url, data) {
    const dataObject = {
        responseText: JSON.stringify(data),
        status: 200
    }

    dataObject.status = modifyData(url, data);

    return dataObject;
}

function del(url) {
    const dataObject = {
        responseText: "",
        status: 200
    }

    const index = getUrlIndex(url);
    dataObject.status = deleteData(url, index);

    return dataObject;
}

function post(url, data) {
    const dataObject = {
        responseText: data,
        status: 200
    }

    switch (url) {
        case "users/get-user-data":
            console.log(data);
            const userData = getUserData(data);
            dataObject.responseText = userData.responseText;
            dataObject.status = userData.status;
            break;
        case "users":
            dataObject.status = saveData(url, data);
            break;
        default:
            dataObject.status.status = 404; // invalid url
            break;
    }

    return dataObject;
}

function getUrlIndex(url) { // returns NaN if no index
    const urlArray = url.split("/");
    const urlIndex = Number.parseInt(urlArray[urlArray.length - 1]);
    return urlIndex;
}