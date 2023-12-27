//Funcion de botones para desplegar ventana de agregar Usuarios
document
  .querySelector("#Mostrar")
  .addEventListener("click", mostrarVentanaEmergente);
function mostrarVentanaEmergente() {
  const ventana = document.getElementById("miVentanaEmergente");
  ventana.style.display = "block";
}
//Funcion de botones para ocultar ventana de agregar Usuarios
document.querySelector("#Ocultar").addEventListener("click", OcultarAddLaptop);
function OcultarAddLaptop() {
  const ventana = document.getElementById("miVentanaEmergente");
  ventana.style.display = "none";
}
//Codigo que permiten visualizar instrucciones para modificar Usuarios con boton info
let input = document.getElementById("infoMod");
let infoWindow = document.getElementById("infoWindow");
let isInfoWindowsOculto = false;
input.addEventListener("click", function () {
  if (isInfoWindowsOculto) {
    infoWindow.style.display = "none";
    isInfoWindowsOculto = false;
  } else {
    infoWindow.style.display = "block";
    isInfoWindowsOculto = true;
  }
});

let dataUser = JSON.parse(localStorage.getItem("UsuariosData"));

// Si los datos no están disponibles en LocalStorage, hacer una llamada a fetch
if (dataUser === null) {
  fetch("Usuarios.json")
    .then((resp) => resp.json())
    .then((dataUser) => {
      localStorage.setItem("UsuariosData", JSON.stringify(dataUser));
      dataUser.forEach((item) => {
        const row = `
      <td>${item.Usuario}</td>
      <td>${item.Cargo}</td>
      <td>${item.CorreoEmpresa}</td>
      <td>${item.UbicacionActual}</td>
      <td>${item.Estado}</td>
      <td>${item.RequiereLaptop}</td>
      <td>${item.RequiereCelular}</td>
      </tr>
    `;
        // Agregar la fila a la tabla
        document.getElementById("user-table").innerHTML += row;
      });
    })
    .catch(function (error) {
      console.log("Fetch Error :-S", error);
    });
} else {
  dataUser.forEach((item) => {
    const row = `
  <td>${item.Usuario}</td>
  <td>${item.Cargo}</td>
  <td>${item.CorreoEmpresa}</td>
  <td>${item.UbicacionActual}</td>
  <td>${item.Estado}</td>
  <td>${item.RequiereLaptop}</td>
  <td>${item.RequiereCelular}</td>
  </tr>`;
    // Agregar la fila a la tabla
    document.getElementById("user-table").innerHTML += row;
  });
}

//Funcion para agregar Usuarios
document.querySelector("#GuardarUser").addEventListener("click", GuardarUsuarios);
function GuardarUsuarios() {
  let User = [];
  (Usuario = document.getElementById("Usuaruioinput2").value),
    (Cargo = document.getElementById("CargoInput").value),
    (CorreoEmpresa = document.getElementById("CorreoEmpresInput").value),
    (UbicacionActual = document.getElementById("UbicacionInput2").value),
    (Estado = document.getElementById("EstadoInput2").value),
    (RequiereLaptop = document.getElementById("RequiereLaptopInput").value),
    (RequiereCelular = document.getElementById("RequiereCelularInput").value),
    User.push({
      Usuario,
      Cargo,
      CorreoEmpresa,
      UbicacionActual,
      Estado,
      RequiereLaptop,
      RequiereCelular,
    });

  // Obtener datos del el arreglo existente
  let Users = JSON.parse(localStorage.getItem("UsuariosData")) || [];
  // Concatene el nuevo arreglo con el arreglo existente
  let UserConcat = [...Users, ...User];
  // Almacene el arreglo concatenado en el almacenamiento local
  localStorage.setItem("UsuariosData", JSON.stringify(UserConcat));
  // Obtener el último elemento del arreglo
  const ultimoElemento = UserConcat[UserConcat.length - 1];
  const row = `
    
      <td>${ultimoElemento.Usuario}</td>
      <td>${ultimoElemento.Cargo}</td>
      <td>${ultimoElemento.CorreoEmpresa}</td>
      <td>${ultimoElemento.UbicacionActual}</td>
      <td>${ultimoElemento.Estado}</td>
      <td>${ultimoElemento.RequiereLaptop}</td>
      <td>${ultimoElemento.RequiereCelular}</td>
      </tr>
      `;
  // Agregar la fila a la tabla
  document.getElementById("user-table").innerHTML += row;
  // Mostrar una alerta de sweetalert para confirmar que se ha guardado el arreglo
  Swal.fire({
    title: "Guardado",
    text: "Se a guardado el Usuario : " + ultimoElemento.Usuario,
    icon: "success",
    timer: null,
  });
}

//Funcion par eliminar Usuarios
document.querySelector("#EliminarUser").addEventListener("click", EliminarUsuario);
function EliminarUsuario() {
  let Users = JSON.parse(localStorage.getItem("UsuariosData")) || [];
  let EliminarUser = document.getElementById("Eliminarinput2").value;
  console.log(EliminarUser);
  console.log(Users);
  let UserFiltro = Users.filter(function (item) {
    return item["Usuario"] !== EliminarUser;
  });
  if (UserFiltro.length === Users.length) {
    Swal.fire({
      title: "No Existe",
      text: "No se ha encontrado el Usuario : " + EliminarUser,
      icon: "error",
      timer: null,
    });
  } else {
    Users = UserFiltro;
    localStorage.setItem("UsuariosData", JSON.stringify(Users));
    Swal.fire({
      title: "Eliminado",
      text: "Se a eliminado el usuario : " + EliminarUser,
      icon: "success",
      timer: null,
    }).then(() => {
      location.reload();
    });
  }
}
// Funcion para Modificar Usuario
document.querySelector("#ModificarUsuario").addEventListener("click", ModUser);
function ModUser() {
  let UserMod = JSON.parse(localStorage.getItem("UsuariosData"));
  let UsuarioInput2 = document.getElementById("ModUserInput").value;
  let ModificaItemUser = document.getElementById("ModificaItemUsers").value;
  console.log(ModificaItemUser)
  // Variable para no romper el ciclo for en caso de que no ecuentre coincidencia
  let encontrado1 = false;
  for (let i = 0; i < UserMod.length; i++) {
    if (UserMod[i]["Usuario"] === UsuarioInput2) {
      encontrado1 = true;
      switch (ModificaItemUser) {
        case "Usuario":
          UserMod[i]["Usuario"] = prompt("Ingrese el nuevo nombre de usuario ");
          Swal.fire({
            title: "Modificado",
            text:
              "Se a modificado el usuario  : " +
              UsuarioInput2 +
              " a :  " +
              UserMod[i]["Usuario"] ,
            icon: "success",
            timer: null,
          }).then(() => {
            location.reload();
          });
          break;

        case "Cargo":
          UserMod[i]["Cargo"] = prompt("Ingrese nuevo cargo de usuario ");
          Swal.fire({
            title: "Modificado",
            text:
              "Se a modificado el cargo del usuario : " +
              UsuarioInput2 +
              " al cargo :  " +
              UserMod[i]["Cargo"],
            icon: "success",
            timer: null,
          }).then(() => {
            location.reload();
          });
          break;

        case "CorreoEmpresa":
          UserMod[i]["CorreoEmpresa"] = prompt(
            "Ingrese nuevo correo electronico "
          );
          Swal.fire({
            title: "Modificado",
            text:
              "Se a modificado el correo electronico del usuario : " +
              UsuarioInput2 +
              " a  :  " +
              UserMod[i]["CorreoEmpresa"],
            icon: "success",
            timer: null,
          }).then(() => {
            location.reload();
          });
          break;

        case "UbicacionActual":
          UserMod[i]["UbicacionActual"] = prompt(
            "Ingrese nueva Ubicacion de usuario "
          );
          Swal.fire({
            title: "Modificado",
            text:
              "Se a modificado la Ubicacion del usuario  : " +
              UsuarioInput2 +
              " a  :  " +
              UserMod[i]["UbicacionActual"],
            icon: "success",
            timer: null,
          }).then(() => {
            location.reload();
          });
          break;

          case "Estado":
            UserMod[i]["Estado"] = prompt(
              "Ingrese nueva Ubicacion de usuario "
            );
            Swal.fire({
              title: "Modificado",
              text:
                "Se a modificado es estado del usuario  : " +
                UsuarioInput2 +
                " a  :  " +
                UserMod[i]["Estado"] ,
              icon: "success",
              timer: null,
            }).then(() => {
              location.reload();
            });
            break;

        case "RequiereLaptop":
          UserMod[i]["RequiereLaptop"] = prompt(
            "Actualice informacion de requerimiento de Laptop"
          );
          Swal.fire({
            title: "Modificado",
            text:
              "Se a modificado el requerimiento de Laptop de usuario : " +
              UsuarioInput2 +
              " a   :  " +
              UserMod[i]["RequiereLaptop"],
            icon: "success",
            timer: null,
          }).then(() => {
            location.reload();
          });
          break;

        case "RequiereCelular":
          UserMod[i]["RequiereCelular"] = prompt(
            "Actualice informacion de requerimiento de Celular"
          );
          Swal.fire({
            title: "Modificado",
            text:
              "Se a modificado el requerimiento de Celular de usuario: " +
              UsuarioInput2 +
              " a   :  " +
              UserMod[i]["RequiereCelular"],
            icon: "success",
            timer: null,
          }).then(() => {
            location.reload();
          });
          break;

        default:
          Swal.fire({
            title: "No Existe",
            text:
              "No es un Items valido o no se ha encontrado el Item : " +
              ModificaItemUser +
              " Los Items validos a modificar son:  Usuario, Cargo, CorreoEmpresa, UbicacionActual, Estado, RequiereLaptop y RequiereCelular  ",
            icon: "error",
            timer: null,
          });
      }
    }
    localStorage.setItem("UsuariosData", JSON.stringify(UserMod));
  }
  // If de notificacion para indicar que no se a encontrado codigo de equipo a modificar
  if (!encontrado1) {
    Swal.fire({
      title: "No Existe",
      text: "El usuario ingresado no existe : " + UsuarioInput2,
      icon: "error",
      timer: null,
    });
  }
}
