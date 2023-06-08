/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const tasksEndpoint = "http://localhost:3001/api/task";

function hideLoader() {
    document.getElementById("loading").style.display = "none";
}

function show(tasks) {
    let tab = `<thead>
            <th scope="col">#</th>
            <th scope="col">Description</th>
        </thead>`;

    for (let task of tasks) {
        tab += `
            <tr>
                <td scope="row">${task.id}</td>
                <td>${task.description}</td>
            </tr>
        `;
    }

    document.getElementById("tasks").innerHTML = tab;
}

async function getTasks() {
    let key = "Authorization";
    const response = await fetch(tasksEndpoint, {
        method: "GET",
        headers: new Headers({
            Authorization: localStorage.getItem(key),
        }),
    });

    var data = await response.json();
    console.log(data.tasks);
    if (response) hideLoader();
    show(data.tasks);
}

document.addEventListener("DOMContentLoaded", function (event) {
    if (!localStorage.getItem("Authorization"))
        window.location = "/view/login.html";
});

getTasks();
