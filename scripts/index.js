window.addEventListener('load', function () {
    getUsuario();

});

let categoryBox = document.querySelector(".categoryBox");
let categoryBtn = document.querySelector(".addCategory");

document.getElementById("logout").addEventListener("click", logout);

const getTaskCount = async (categoryId) => {
    // Fetch tasks for the specific category and return the count
    const res = await fetch(`http://127.0.0.1:5000/servers`);
    const data = await res.json();
    return data.length;
};

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

let catchCategories = () => {
    fetch("http://127.0.0.1:5000/servers/")
    .then(res => res.json())
    .then(async data => {
        for (let servidor of data) {
            const taskCount = await getTaskCount(servidor.id_server);
            
            // Create category text element
            let taskText = document.createElement("b");
            taskText.classList.add("categoryText");
            taskText.setAttribute("href", `canal.html?id_server=${servidor.id_server}`);
            taskText.setAttribute("data-category-id", servidor.id_server);
            taskText.textContent = servidor.nombre;

            // Create due task span
            let dueTaskSpan = document.createElement("span");
            let categoryDescription = `Descripción: ${servidor.descripcion}`;
            dueTaskSpan.textContent = categoryDescription;
            dueTaskSpan.classList.add("dueTaskSpan");
            
            // Create task count circle
            let taskCountCircle = document.createElement("div");
            taskCountCircle.classList.add("taskCountCircle");
            taskCountCircle.textContent = taskCount;  // Here, taskCount is dynamically fetched
            
            // Append elements
            taskText.appendChild(document.createElement("br"));
            taskText.appendChild(dueTaskSpan);
            taskText.appendChild(taskCountCircle);  // Append the task count circle
            categoryBox.appendChild(taskText);
        }

        categoryBtn.addEventListener("click", () => addCategory());
    })
    .catch(err => console.log(err));
};

catchCategories();

let addCategory = () => {
    let categoryName = prompt("Ingrese el nombre de la categoría");
    let categoryDescription = prompt("Ingrese la descripción de la categoría");
    let category = {
        name: categoryName,
        description: categoryDescription
    };
    fetch("http://127.0.0.1:5000/categories/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
    })
    .then(res => res.json())
    .then(data => {
        location.reload();
    })
    .catch(err => console.log(err));
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