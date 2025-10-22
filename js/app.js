import { FXMLHttpRequest } from "../js/fajax.js"

const user1 = {
    username: "Blompo",
    password: "123",
    shoppingList: []
}

let currentUser = null;

// const test = new FXMLHttpRequest();
// test.onload = () => {
//     console.log("Loaded YAYYAYAYAY")
//     console.log(test.responseText)
//     console.log(test.status)
// }

// test.open("POST", "users/get-user-data");
// test.send(user);

// test.open("GET", "people1")
// test.send();

// test.open("PUT", "people/0");
// test.send("person");

// test.open("DELETE", "people/0");
// test.send();




// test.open("PUT", "people/?name=Blompo");
// test.send("person");



function login() {
    //const button = document.getElementsByTagName
    const inputs = document.getElementsByTagName("input");
    const username = inputs[0].value;
    const password = inputs[1].value;
    //console.log(username)

    const userObject = {
        username: username,
        password: password
    }

    const user = new FXMLHttpRequest();
    user.open("POST", "users/get-user-data");
    user.onload = () => {
        console.log(user.responseText)
        console.log(user.status)
        if (user.responseText !== "") { // got a user
            const userObj = JSON.parse(user.responseText);
            currentUser = userObj;
            switchScreen(2);
            loadGreeting(currentUser.username);
            loadList(currentUser.shoppingList);
        }

    }
    user.send(userObject);
}

function logout() {
    switchScreen(0);
}

function signup() {

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
        const newList = [...currentUser.shoppingList];
        newList.push(item);
        currentUser.shoppingList = newList;

        const user = new FXMLHttpRequest();
        user.open("PUT", "people/?name=Blompo");
        user.send(currentUser);

        // test.open("PUT", "people/?name=Blompo");
        // test.send("person");
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

// switchScreen(0)


switchScreen(2);
loadList(["a", "b", "c"]);