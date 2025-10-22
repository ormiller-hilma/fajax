function GetAllPeople(link) {
    const page1 = new XMLHttpRequest();
    page1.onload = () => {
        const arr = JSON.parse(page1.responseText)
        const arrResults = arr.results
        localStorage.setItem("people", JSON.stringify(arrResults))
        const amountOfPages = Math.ceil(arr.count / 10);
        for (let i = 2; i <= amountOfPages; i++) {
            const page = new XMLHttpRequest();
            page.onload = () => {
                const arr = JSON.parse(localStorage.getItem("people"))
                arr.push(...(JSON.parse(page.responseText)).results)
                localStorage.setItem("people", JSON.stringify(arr));
            }
            page.open("GET", "https://swapi.py4e.com/api/people/?page=" + i)
            page.send();
        }
    }
    page1.open("GET", "https://swapi.py4e.com/api/people/?page=1")
    page1.send();
}

function AddPerson(person) {
    const peopleKey = "people";
    const peopleArray = JSON.parse(localStorage.getItem(peopleKey));
    peopleArray.push(person);
    localStorage.setItem(peopleKey, JSON.stringify(peopleArray));
}

function SetPeopleID() {
    const peopleKey = "people";
    const peopleArray = JSON.parse(localStorage.getItem(peopleKey));
    for (let i = 0; i < peopleArray.length; i++) {
        peopleArray[i].id = `#${i}p`
        peopleArray[i]
    }
    localStorage.setItem(peopleKey, JSON.stringify(peopleArray));
}

function DeletePerson(id) {
    const peopleKey = "people";
    const peopleArray = JSON.parse(localStorage.getItem(peopleKey));
    for (let i = 0; i < peopleArray.length; i++) {
        if (peopleArray[i].id === id) {
            peopleArray.splice(i, 1);
            break;
        }
    }
    //peopleArray.splice(Number.parseInt(id), 1);
    localStorage.setItem(peopleKey, JSON.stringify(peopleArray));
}

function GetAllPeopleWithBlueEyes() {
    const peopleKey = "people";
    const peopleArray = JSON.parse(localStorage.getItem(peopleKey));
    const newArr = [];
    for (let i = 0; i < peopleArray.length; i++) {
        if (peopleArray[i].eye_color === "blue")
            newArr.push(peopleArray[i]);
    }
    return newArr;
}

function RemoveFilmFromPerson(person, link) {

    const peopleKey = "people";
    const peopleArray = JSON.parse(localStorage.getItem(peopleKey));
    for (let i = 0; i < peopleArray.length; i++) {
        if (peopleArray[i].name === person) {
            const films = peopleArray[i].films;
            for (let j = 0; j < films.length; j++) {
                if (films[j] === link) {
                    peopleArray[i].films.splice(j, 1);
                    localStorage.setItem(peopleKey, JSON.stringify(peopleArray));
                    return "succes"
                }
            }
            return "fail - no movie to remove"
        }
    }
    return "fail - didn't find person"
}


console.log(RemoveFilmFromPerson("C-3PO", "https://swapi.py4e.com/api/films/2/"))

// AddPerson({ name: "Blomp", height: 0.4 })

// GetAllPeople();
// SetPeopleID();

// DeletePerson("#2p");

// console.log(GetAllPeopleWithBlueEyes());