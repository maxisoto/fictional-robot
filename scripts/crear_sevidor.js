document.getElementById("crear_server").addEventListener("submit", function (event) {
    event.preventDefault();
    crear_usuario();
});

function crear_servidor() {
    const data = {
        server : document.getElementById("Crear_servidor").value
        //id_user : document.getElementById("")
        
    };
    console.log(data)
    fetch("http://127.0.0.1:5000/", {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200){
            return response.json().then(data => {
                document.getElementById('message').innerHTML = "Se creo el server correctamente...";
                window.location.href = "index.html";
            });
        } else {
            return response.json().then(data => {
                document.getElementById('message').innerHTML = data.message;
            });
        }
    })
    .catch(error => {
        document.getElementById('message').innerHTML = 'An error occurrend.'
    });

}