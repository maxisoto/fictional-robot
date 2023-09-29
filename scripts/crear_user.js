document.getElementById("CrearUsuario").addEventListener("submit", function (event) {
    event.preventDefault();
    crear_usuario();
});

function crear_usuario() {
    const data = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        email: document.getElementById("email").value,
        user: document.getElementById("user").value,
        password: document.getElementById("password").value,
        f_nac: document.getElementById("f_nac").value,
        preg_secret: document.getElementById("preg_secret").value,
        respuesta: document.getElementById("respuesta").value,
    };

    fetch("http://127.0.0.1:5000/users/", {
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
                // window.location.href = "profile.html";
                document.getElementById("message").innerHTML = data.message;
            });
        } else {
            return response.json().then(data => {
                document.getElementById("message").innerHTML = data.message;
            });
        }
    })
    .catch(error => {
        document.getElementById("message").innerHTML = "An error occurred.";
    });
}