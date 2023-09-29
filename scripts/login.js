document.getElementById("Login").addEventListener("submit", function (event) {
    event.preventDefault();
    login_usuario();
});

function login_usuario() {
    const data = {
        user: document.getElementById("user").value,
        password: document.getElementById("password").value,
        
    };

    fetch("http://127.0.0.1:5000/users/login", {
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
                window.location.href = "index.html";
                
            });
        } else {
            return response.json().then(data => {
                document.getElementById("message").innerHTML = data.message;
            });
        }
    })
    .catch(error => {
        document.getElementById("message").innerHTML = "Error al iniciar sesion.";
    });
}