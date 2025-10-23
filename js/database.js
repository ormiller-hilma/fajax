export function saveData(key, data) {
    createArray(key); // creates array in local storage if one doesn't exist

    const item = localStorage.getItem(key);
    let itemArray = JSON.parse(item)

    for (let i = 0; i < itemArray.length; i++) {
        if (itemArray[i].username === data.username)
            return 409; // user already exists
    }

    itemArray.push(data);
    itemArray = removeNull(itemArray);

    const stringItemArray = JSON.stringify(itemArray);
    localStorage.setItem(key, stringItemArray);
    return 200;
}


export function deleteData(url, index) {
    if (Number.isNaN(index) === false) {
        const urlArray = url.split("/");
        urlArray.pop();
        const key = urlArray.join("/");

        let dataArray = JSON.parse(localStorage.getItem(key));
        dataArray.splice(index, 1);

        localStorage.setItem(key, JSON.stringify(dataArray));
        return 200;
    }
    return 400;
}

export function modifyData(url, data) {

    const urlArray = url.split("/");
    const key = urlArray[0];
    const endOfUrl = urlArray[urlArray.length - 1];

    // check if string is number
    if (isFinite(endOfUrl) && endOfUrl !== "") {
        const index = Number(endOfUrl);
        console.log(index, "index")
        const dataArray = JSON.parse(localStorage.getItem(key));
        dataArray[index] = data;

        localStorage.setItem(key, JSON.stringify(dataArray));
        return 200;
    }
    if (endOfUrl.startsWith("?name=")) {
        const username = endOfUrl.slice(6); // removes "?name="
        const userData = getUser(username);
        if (userData !== null) {
            const index = userData.index;

            const dataArray = JSON.parse(localStorage.getItem(key));
            dataArray[index] = data;

            localStorage.setItem(key, JSON.stringify(dataArray));
            return 200;
        }
        return 400; // didnt find user
    }
    return 400; // error
}

export function getData(url, index) {
    if (Number.isNaN(index) === false) {
        const urlArray = url.split("/");
        urlArray.pop();
        const key = urlArray.join("/");

        return JSON.parse(localStorage.getItem(key))[index];
    }
    return JSON.parse(localStorage.getItem(url));
}

export function getUser(username) {
    const usersKey = "users";
    const userArr = JSON.parse(localStorage.getItem(usersKey));
    for (let i = 0; i < userArr.length; i++) {
        if (username === userArr[i].username) {
            return { user: userArr[i], index: i };
        }
    }
    return null;
}

export function getUserData(data) {
    const dataObject = {
        responseText: "",
        status: 200
    }

    const userData = getUser(data.username);
    if (userData === null) {
        dataObject.status = 401; // didn't find user
        return dataObject;
    }
    const user = userData.user;
    if (user.username === data.username && user.password === data.password) {
        dataObject.responseText = JSON.stringify(user);
    }
    else {
        dataObject.status = 401; // incorrect user or password
    }
    return dataObject;
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