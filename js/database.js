export function SaveData(key, data) {
    // TODO: return error if key is not in local storage
    createArray(key); // creates array in local storage if one doesn't exist

    const item = localStorage.getItem(key);
    let itemArray = JSON.parse(item)

    itemArray.push(data);
    itemArray = removeNull(itemArray);

    const stringItemArray = JSON.stringify(itemArray);
    localStorage.setItem(key, stringItemArray);
    return 200;
}


export function DeleteData(url, index) {
    if (Number.isNaN(index) === false) {
        const urlArray = url.split("/");
        urlArray.pop();
        const key = urlArray.join("/");

        let dataArray = JSON.parse(localStorage.getItem(key));
        dataArray[index] = null;
        dataArray = removeNull(dataArray);

        localStorage.setItem(key, JSON.stringify(dataArray));
        return 200;
    }
    return 400;
}

export function ModifyData(url, index, data) {
    if (Number.isNaN(index) === false) {
        const urlArray = url.split("/");
        urlArray.pop();
        const key = urlArray.join("/");

        const dataArray = JSON.parse(localStorage.getItem(key));
        dataArray[index] = data;

        localStorage.setItem(key, JSON.stringify(dataArray));
        return 200;
    }
    return 400; // error
}

export function GetData(url, index) {
    if (Number.isNaN(index) === false) {
        const urlArray = url.split("/");
        urlArray.pop();
        const key = urlArray.join("/");

        return JSON.parse(localStorage.getItem(key))[index];
    }
    return JSON.parse(localStorage.getItem(url));
}

export function GetUser(username) {
    const usersKey = "users";
    const userArr = JSON.parse(localStorage.getItem(usersKey));
    for (let i = 0; i < userArr.length; i++) {
        if (username === userArr[i].username) {
            return userArr[i];
        }
    }
    return null;
}

function createArray(key) {
    const item = localStorage.getItem(key);
    if (item === null || item === "") {
        localStorage.setItem(key, "[]")
    }
}

function removeNull(arr) {
    return arr.filter((item) => {
        return item !== null;
    });

}