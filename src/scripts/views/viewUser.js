//clase para manejo de vistas
import { MovieManager } from "../controller/movieManager.js";
import { UserManager } from "../controller/userManager.js";
import { Movie } from "../models/movie.js";
import { Usuario } from "../models/user.js";

const usuarios = new UserManager();

/* loadSelect(); */
window.onload = function () {
  /* loadMovies(); */
  loadUsuarios();
};

document
  .getElementById("inputMembresia")
  .addEventListener("input", function () {});

function saveUser() {
  const inputUsuario = document.getElementById("inputNombre").value;
  const inputMembresia = document.getElementById("inputMembresia").value;
  const inputCorreo = document.getElementById("inputCorreo").value;
  const usuario = new Usuario(inputUsuario, inputMembresia, inputCorreo);
  usuarios.addUser(usuario);
  loadUsuarios();
}

function loadUsuarios() {
  const table = document.getElementById("tablaUsuario");
  table.innerHTML = "";

  usuarios.getAllUser().forEach((usuario, index) => {
    const row = document.createElement("tr");

    row.classList.add("table-active");

    // Crear las celdas de la fila
    row.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td>${usuario.nombre}</td>
      <td>${usuario.membresia}</td>
      <td>${usuario.correo}</td>
    `;
    // Agregar la fila al tbody
    table.appendChild(row);
  });
}

document
  .getElementById("formGestionUsuario")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    saveUser();
  });
