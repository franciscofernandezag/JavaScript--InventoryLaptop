

function addUser(username, password) {
  // Crear un objeto de usuario con el nombre de usuario y la contraseña proporcionados
  let user = {
    username: username,
    password: password
  };
  // Obtener la lista de usuarios almacenados en Local Storage
  let users = JSON.parse(localStorage.getItem("users"));
  // Si la lista de usuarios no existe, crear una nueva
  if (!users) {
    users = [];
  }
  // Agregar el nuevo usuario a la lista
  users.push(user);
  // Guardar la lista de usuarios actualizada en Local Storage
  localStorage.setItem("users", JSON.stringify(users));
}

addUser("francisco", "123");
addUser("user", "user");

function login() {
  // Obtener los valores del formulario de inicio de sesión
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  
  // Obtener los datos de usuario almacenados en Local Storage
  let users = JSON.parse(localStorage.getItem("users"));
  
  // Comprobar si el nombre de usuario y la contraseña son válidos
  let valid = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username == username && users[i].password == password) {
      valid = true;
      break;
    }
  }
  if (valid === true) {
    // Establecer una variable de sesión en Local Storage
    localStorage.setItem("session", "true");
    // Redirigir al usuario a la página principal
    window.location.href = "Inventario.html";
  } else {
    // Mostrar un mensaje de error al usuario

    Swal.fire({
      title: "Sin Acceso",
      text: "Nombre de usuario o contraseña inválidos",
      icon: "error",
      timer: null,
    });
  }
}

// funcion para chekear login de usuario. Se agrega en el body de las paginas.
function checkLogin(){
if (localStorage.getItem("session") !== "true") {
  window.location.replace("index.html");
}

}