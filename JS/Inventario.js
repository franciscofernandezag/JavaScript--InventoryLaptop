//Funcion de botones para desplegar ventana de agregar activos
document.querySelector("#Mostrar").addEventListener("click", mostrarVentanaEmergente);
function mostrarVentanaEmergente() {
  const ventana = document.getElementById("miVentanaEmergente");
  ventana.style.display = "block";
}
//Funcion de botones para ocultar ventana de agregar activos
document.querySelector("#Ocultar").addEventListener("click", OcultarAddLaptop);
function OcultarAddLaptop() {
  const ventana = document.getElementById("miVentanaEmergente");
  ventana.style.display = "none";
}
//Codigo que permiten visualizar instrucciones para modificar Activos
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
//Creacion de funcion constructora
function LaptopInv(
  CódigoEquipo,
  Estado,
  Usuario,
  Ubicación,
  MarcaModelo,
  NumeroSerie,
  Caracteristicas,
  Categoría,
  Condicion
) {
  this.CódigoEquipo = CódigoEquipo;
  this.Estado = Estado;
  this.Usuario = Usuario;
  this.Ubicación = Ubicación;
  this.MarcaModelo = MarcaModelo;
  this.NumeroSerie = NumeroSerie;
  this.Caracteristicas = Caracteristicas;
  this.Categoría = Categoría;
  this.Condicion = Condicion;
}
let data = JSON.parse(localStorage.getItem("laptopData"));
if (data === null) {
  // Si los datos no están disponibles en LocalStorage, hacer una llamada a fetch
  fetch("laptop.json")
    .then((resp) => resp.json())
    .then((data) => {
      localStorage.setItem("laptopData", JSON.stringify(data));
      data.forEach((item) => {
        const row = `
        <td>${item.CódigoEquipo}</td>
        <td>${item.Estado}</td>
        <td>${item.Usuario}</td>
        <td>${item.Ubicación}</td>
        <td>${item.MarcaModelo}</td>
        <td>${item.NdeSerie}</td>
        <td>${item.Caracteristicas}</td>
        <td>${item.Categoría}</td>
        <td>${item.Condicion}</td>
        </tr>
        `;
        // Agregar la fila a la tabla
        document.getElementById("laptop-table").innerHTML += row;
      });
    })
    .catch(function (error) {
      console.log("Fetch Error :-S", error);
    });
} else {
  data.forEach((item) => {
    const row = `
          <td>${item.CódigoEquipo}</td>
          <td>${item.Estado}</td>
          <td>${item.Usuario}</td>
          <td>${item.Ubicación}</td>
          <td>${item.MarcaModelo}</td>
          <td>${item.NdeSerie}</td>
          <td>${item.Caracteristicas}</td>
          <td>${item.Categoría}</td>
          <td>${item.Condicion}</td>
          </tr>`;
    // Agregar la fila a la tabla
    document.getElementById("laptop-table").innerHTML += row;
  });
}
//Llamar a la funcion para extraer datos del archivo laptop.json , grabarlos en localstorage y cargarlos al dom
document.querySelector("#Guardar").addEventListener("click", GuardarLaptop);

function GuardarLaptop() {
  let laptop = [];
    (CódigoEquipo = document.getElementById("CodInternoInput").value),
    (Estado = document.getElementById("EstadoInput").value),
    (Usuario = document.getElementById("Usuarioinput").value),
    (Ubicación = document.getElementById("UbicacionInput").value),
    (MarcaModelo = document.getElementById("MarcaInput").value),
    (NumeroSerie = document.getElementById("NserieInput").value),
    (Caracteristicas = document.getElementById("CaracteristicasInput").value),
    (Categoría = document.getElementById("CategoriaInput").value),
    (Condicion = document.getElementById("CondicionInput").value);
  laptop.push(
    new LaptopInv(
      CódigoEquipo,
      Estado,
      Usuario,
      Ubicación,
      MarcaModelo,
      NumeroSerie,
      Caracteristicas,
      Categoría,
      Condicion
    )
  );
  // Obtener datos del el arreglo existente
  let laptops = JSON.parse(localStorage.getItem("laptopData")) || [];
  // Verificar si el código de equipo ya existe en el arreglo. Este es un codigo unico que no se puede repetir
  for (let i = 0; i < laptops.length; i++) {
    if (laptops[i].CódigoEquipo === CódigoEquipo) {
      // Mostrar una alerta de sweetalert indicando que el código ya existe
      Swal.fire({
        title: "Error",
        text: "Ya existe un activo con el código " + CódigoEquipo,
        icon: "error",
        timer: null,
      });
      return;
    }
  }
  // Concatene el nuevo arreglo con el arreglo existente
  let laptopsConcat = [...laptops, ...laptop];
  // Almacene el arreglo concatenado en el almacenamiento local
  localStorage.setItem("laptopData", JSON.stringify(laptopsConcat));
  // Obtener el último elemento del arreglo
  const ultimoElemento = laptopsConcat[laptopsConcat.length - 1];
  const row = `
      <td>${ultimoElemento.CódigoEquipo}</td>
      <td>${ultimoElemento.Estado}</td>
      <td>${ultimoElemento.Usuario}</td>
      <td>${ultimoElemento.Ubicación}</td>
      <td>${ultimoElemento.MarcaModelo}</td>
      <td>${ultimoElemento.NdeSerie}</td>
      <td>${ultimoElemento.Caracteristicas}</td>
      <td>${ultimoElemento.Categoría}</td>
      <td>${ultimoElemento.Condicion}</td>
      </tr>`;
  // Agregar la fila a la tabla
  document.getElementById("laptop-table").innerHTML += row;
  // Mostrar una alerta de sweetalert para confirmar que se ha guardado el arreglo
  Swal.fire({
    title: "Guardado",
    text:
      "Se a guardado el activo con codigo interno : " +
      ultimoElemento.CódigoEquipo,
    icon: "success",
    timer: null,
  });
}
//Funcion Para eliminar Activo
document.querySelector("#Eliminar").addEventListener("click", EliminarLaptop);
function EliminarLaptop() {
  let laptops = JSON.parse(localStorage.getItem("laptopData")) || [];
  let EliminarEquipo = document.getElementById("Eliminarinput").value;
  console.log(EliminarEquipo);
  console.log(laptops);
  let LaptopFiltro = laptops.filter(function (item) {
    return item["CódigoEquipo"] !== EliminarEquipo;
  });
  if (LaptopFiltro.length === laptops.length) {
    Swal.fire({
      title: "No Existe",
      text:
        "No se ha encontrado el activo con codigo interno : " + EliminarEquipo,
      icon: "error",
      timer: null,
    });
  } else {
    laptops = LaptopFiltro;
    localStorage.setItem("laptopData", JSON.stringify(laptops));
    Swal.fire({
      title: "Eliminado",
      text: "Se a eliminado el activo con codigo interno : " + EliminarEquipo,
      icon: "success",
      timer: null,
    }).then(() => {
      location.reload();
    });
  }
}
// Funcion para Modificar Activo
document.querySelector("#ModificarActivo").addEventListener("click", ModLaptop);
function ModLaptop() {
  let LaptopMod = JSON.parse(localStorage.getItem("laptopData"));
  let CodEquipoMod = document.getElementById("CodEquipoMod").value;
  let ItemModificar = document.getElementById("ItemModificar").value;
  console.log(CodEquipoMod);
  console.log(ItemModificar);
  // Variable para no romper el ciclo for en caso de que no ecuentre coincidencia
  let encontrado = false;
  for (let i = 0; i < LaptopMod.length; i++) {
    if (LaptopMod[i]["CódigoEquipo"] === CodEquipoMod) {
      encontrado = true;
      switch (ItemModificar) {
        case "Estado":
          LaptopMod[i]["Estado"] = prompt("Ingrese nuevo Estado de Activo ");
          Swal.fire({
            title: "Modificado",
            text:
              "Se a modificado el activo con codigo interno : " +
              CodEquipoMod +
              " con Estado :  " +
              LaptopMod[i]["Estado"],
            icon: "success",
            timer: null,
          }).then(() => {
            location.reload();
          });
          break;
        case "Usuario":
          LaptopMod[i]["Usuario"] = prompt(
            "Ingrese nuevo Usuario Propietario de Activo "
          );
          Swal.fire({
            title: "Modificado",
            text:
              "Se a modificado el activo con codigo interno : " +
              CodEquipoMod +
              " con Usuario :  " +
              LaptopMod[i]["Usuario"] ,
            icon: "success",
            timer: null,
          }).then(() => {
            location.reload();
          });
          break;
        case "Ubicación":
          LaptopMod[i]["Ubicación"] = prompt(
            "Ingrese nueva Ubicación de Activo "
          );
          Swal.fire({
            title: "Modificado",
            text:
              "Se a modificado el activo con codigo interno : " +
              CodEquipoMod +
              " con Ubicación :  " +
              LaptopMod[i]["Ubicación"] ,
            icon: "success",
            timer: null,
          }).then(() => {
            location.reload();
          });
          break;
        case "Caracteristicas":
          LaptopMod[i]["Caracteristicas"] = prompt(
            "Ingrese nueva Caracteristicas de Activo "
          );
          Swal.fire({
            title: "Modificado",
            text:
              "Se a modificado el activo con codigo interno : " +
              CodEquipoMod +
              " con Caracteristica :  " +
              LaptopMod[i]["Caracteristicas"] ,
            icon: "success",
            timer: null,
          }).then(() => {
            location.reload();
          });
          break;
        case "Categoria":
          LaptopMod[i]["Categoria"] = prompt(
            "Ingrese nueva Categoria de Activo "
          );
          Swal.fire({
            title: "Modificado",
            text:
              "Se a modificado el activo con codigo interno : " +
              CodEquipoMod +
              " con Categoria :  " +
              LaptopMod[i]["Categoria"] ,
            icon: "success",
            timer: null,
          }).then(() => {
            location.reload();
          });
          break;
        case "Condicion":
          LaptopMod[i]["Condicion"] = prompt(
            "Ingrese nueva Condicion de Activo "
          );
          Swal.fire({
            title: "Modificado",
            text:
              "Se a modificado el activo con codigo interno : " +
              CodEquipoMod +
              " con Condicion :  " +
              LaptopMod[i]["Condicion"] ,
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
              ItemModificar +
              " Los Items validos a modificar son:  Estado, Usuario, Ubicación, Caracteristicas, Categoria y Condicion  ",
            icon: "error",
            timer: null,
          });
      }
    }
    localStorage.setItem("laptopData", JSON.stringify(LaptopMod));
  }
  // If de notificacion para indicar que no se a encontrado codigo de equipo a modificar
  if (!encontrado) {
    Swal.fire({
      title: "No Existe",
      text: "El Codigo de Equipo no existe en inventario : " + CodEquipoMod,
      icon: "error",
      timer: null,
    });
  }
}
