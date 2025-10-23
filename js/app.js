import { FXMLHttpRequest } from "../js/fajax.js"

let currentUser = null;

function loadUserData(userObject) {
    const user = new FXMLHttpRequest();
    user.open("POST", "users/get-user-data");
    user.onload = () => {
        console.log("STATUS", user.status)
        if (user.status === 401) {
            console.log("Couldn't Login");
        }
        if (user.responseText !== "" && user.status === 200) { // got a user
            const userObj = JSON.parse(user.responseText);
            currentUser = userObj;
            switchScreen(2);
            loadGreeting(currentUser.username);
            loadList(currentUser.shoppingList);
        }
        setBtnState(true);
    }
    user.send(userObject);
}

function login() {
    const inputs = document.getElementsByTagName("input");
    const username = inputs[0].value;
    const password = inputs[1].value;

    if (username === "" || password === "") {
        console.log("Please enter username and password")
        return;
    }

    const userObject = {
        username: username,
        password: password
    }

    setBtnState(false);
    loadUserData(userObject);
}

function logout() {
    switchScreen(0);
}

function signup() {
    const inputs = document.getElementsByTagName("input");
    const username = inputs[0].value;
    const password = inputs[1].value;
    const password2 = inputs[2].value;

    const userObject = {
        username: username,
        password: password,
        shoppingList: []
    }

    if (password !== password2 || username === "" || password === "") {
        console.log("Please enter valid info")
        return;
    }

    setBtnState(false)

    const createUserFajax = new FXMLHttpRequest();
    createUserFajax.open("POST", "users");
    createUserFajax.onload = () => {
        console.log("STATUS", createUserFajax.status);
        if (createUserFajax.status === 409) {
            setBtnState(true);
            console.log("account already exists");
            return;
        }
        loadUserData(userObject);
    }

    createUserFajax.send(userObject);
}

function loadGreeting(username) {
    const greeting = document.getElementById("greeting");
    greeting.innerHTML = "Hello: " + username;
}

function loadList(list) {
    const shoppingList = document.getElementById("list");
    if (shoppingList === null) return;
    for (let i = 0; i < list.length; i++) {
        const li = document.createElement("li");
        li.innerHTML = list[i];
        shoppingList.appendChild(li);
    }
}

function addItem() {
    const listInput = document.getElementById("listInput");
    const item = listInput.value;
    if (item !== "" && currentUser !== null) {
        setBtnState(false);

        const newList = [...currentUser.shoppingList];
        newList.push(item);
        currentUser.shoppingList = newList;

        const user = new FXMLHttpRequest();
        user.open("PUT", `users/?name=${currentUser.username}`);
        user.onload = () => {
            loadUserData(currentUser);
        }
        user.send(currentUser);
    }
}

function deleteItem(index) {
    setBtnState(false);
    currentUser.shoppingList.splice(index, 1);
    const deleteRequest = new FXMLHttpRequest();
    deleteRequest.open("PUT", `users/?name=${currentUser.username}`);
    deleteRequest.onload = () => {
        loadUserData(currentUser);
    }
    deleteRequest.send(currentUser);
}

function setBtnState(state) {
    const btns = document.getElementsByTagName("button");
    for (let i = 0; i < btns.length; i++) {
        btns[i].disabled = !state;
    }
}

function intializeButtons(buttonAction) {
    const btn = document.getElementById("btn");
    if (btn !== null) {
        btn.addEventListener("click", buttonAction);
    }
    const addBtn = document.getElementById("addBtn");
    if (addBtn !== null) {
        addBtn.addEventListener("click", addItem);
    }
    const signupBtn = document.getElementById("signupBtn");
    if (signupBtn !== null) {
        signupBtn.addEventListener("click", () => {
            switchScreen(1)
        });
    }
    const haveAccountBtn = document.getElementById("haveAccountBtn");
    if (haveAccountBtn !== null) {
        haveAccountBtn.addEventListener("click", () => {
            switchScreen(0)
        });
    }
    const delBtn = document.getElementById("delBtn");
    if (delBtn !== null) {
        delBtn.addEventListener("click", () => {
            deleteItem(0);
        });
    }
}

function switchScreen(index) {
    const actions = [login, signup, logout]

    const templates = document.getElementsByTagName("template");
    const container = document.getElementById("container");
    container.innerHTML = "";

    const clone = templates[index].content.cloneNode(true);

    container.appendChild(clone);

    intializeButtons(actions[index]);
}

function deleteUser(index) {
    const request = new FXMLHttpRequest();
    request.open("DELETE", `users/${index}`);
    request.onload = () => {
        console.log("DELETE STATUS", request.status)
        if (request.status === 200) {
            console.log("Deleted at index " + index);
        }
    }
    request.send();
}

switchScreen(0);

//deleteUser(1);