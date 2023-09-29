window.addEventListener('load', function () {
    getUsuario();
    getServer();
});

document.getElementById("logout").addEventListener("click", logout);

function getUsuario() {
    const url = "http://127.0.0.1:5000/users/profile";
    
    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {

                document.getElementById("user").innerText = data.user;
                document.getElementById("email").innerText = data.email;
                document.getElementById("nombre").innerText = data.nombre;
                document.getElementById("apellido").innerText = data.apellido;
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

function getServer() {
    const url = "http://127.0.0.1:5000/servers/";
    
    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                for (let servidor of data) {
                

                    document.getElementById("nombre").innerText = data.nombre;
                    document.getElementById("descripcion").innerText = data.descripcion;
                    document.getElementById("f_creacion").innerText = data.f_creacion;
                    document.getElementById("activo").innerText = data.activo;
                }
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


function logout() {
    const url = "http://127.0.0.1:5000/users/logout";
    
    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                window.location.href = "login.html";
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