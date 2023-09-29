document.getElementById("Actualizar_pass").addEventListener("submit", function (event) {
    event.preventDefault();
    actualizar_pass();
});

function actualizar_pass() {
    const data = {
        user: document.getElementById("user").value,
        password: document.getElementById("password").value,
        
    };

    fetch("http://127.0.0.1:5000/users/actualizar_pass", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            // Redirect to profile page if login is successful
            return response.json().then(data => {
                document.getElementById("message").innerHTML = data.message;
                window.location.href = "login.html";
            });
        } else {
            return response.json().then(data => {
                document.getElementById("message").innerHTML = data.message;
            });
        }
    })
    .catch(error => {
        document.getElementById("message").innerHTML = "Grave Error.";
    });
}