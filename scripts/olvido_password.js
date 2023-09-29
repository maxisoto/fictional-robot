document.getElementById("Olvido_pass").addEventListener("submit", function (event) {
    event.preventDefault();
    verificar_respuesta();
});

function verificar_respuesta() {
    const data = {
        user: document.getElementById("user").value,
        respuesta: document.getElementById("respuesta").value,
        
    };

    fetch("http://127.0.0.1:5000/users/verificar", {
        method: 'POST',
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
                window.location.href = "actualizar_password.html";
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