/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
async function signup() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    console.log(username, password);

    const response = await fetch("http://localhost:3001/api/user", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",
            Accept: "application/json",
        }),
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    });

    if (response.ok) {
        showToast("#okToast");
    } else {
        showToast("#errorToast");
    }
}

function showToast(id) {
    var toastElList = [].slice.call(document.querySelectorAll(id));
    var toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl);
    });
    toastList.forEach((toast) => toast.show());
}
