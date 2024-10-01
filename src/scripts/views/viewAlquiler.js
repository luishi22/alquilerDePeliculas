//clase para manejo de vistas
import { MovieManager } from "../controller/movieManager.js";
import { UserManager } from "../controller/userManager.js";
import { Movie } from "../models/movie.js";
import { Usuario } from "../models/user.js";

/* window.onload = function () {
  loadAlquileres();
}; */
const movies = new MovieManager();
const usuarios = new UserManager();
const selectPeliculas = document.getElementById("selectPeliculas");
const selectUsuario = document.getElementById("selectUsuarios");
/* 
const seccionAlquiler = document.getElementById("seccionAlquiler"); */

// Llama a verificarSeccion al cargar la página
window.addEventListener("load", verificarSeccion);

// Llama a verificarSeccion cuando el hash cambie
window.addEventListener("hashchange", verificarSeccion);

// Función para verificar y cargar datos de la sección
function verificarSeccion() {
  if (window.location.hash === "#seccionAlquiler") {
    loadMovies(); // Cargar películas
    loadUsuarios(); // Cargar usuarios
    loadAlquileres();
  }
}

// Función para cargar las películas
function loadMovies() {
  // Limpiar opciones existentes
  selectPeliculas.innerHTML = "";

  if (movies.getCanMovies()) {
    movies.getAllMovies().forEach((movie) => {
      const option = document.createElement("option");
      option.textContent = movie.titulo;
      option.value = movie.titulo;
      selectPeliculas.appendChild(option);
    });
  }
}

// Función para cargar los usuarios
function loadUsuarios() {
  // Limpiar opciones existentes
  selectUsuario.innerHTML = "";

  if (usuarios.getCantUser()) {
    usuarios.getAllUser().forEach((usuario) => {
      const option = document.createElement("option");
      option.textContent = `Usuario: ${usuario.nombre} - Membresía: ${usuario.membresia}`;
      option.value = usuario.membresia;
      selectUsuario.appendChild(option);
    });
  }
}

function saveAlquiler() {
  const pelicula = selectPeliculas.value;
  const membresia = selectUsuario.value;

  const user = usuarios.findUsuarioByMembresia(membresia);
  const movie = movies.findByTitulo(pelicula);

  if (user.peliculas.length < 3) {
    if (movie.copias > 0) {
      movies.alquilarMovie(pelicula);
      usuarios.addAlquiler(user, pelicula);
      loadAlquileres();
      const modal = new bootstrap.Modal(
        document.getElementById("modalAlquiler")
      );
      modal.show();
    } else {
      const modal = new bootstrap.Modal(
        document.getElementById("modalReserva")
      );
      modal.show();
    }
  }
}

function loadAlquileres() {
  const tabla = document.getElementById("tablaAlquiler");
  let cantidad = 0;
  tabla.innerHTML = "";

  if (usuarios.getCantUser()) {
    usuarios.getAllUser().forEach((usuario) => {
      cantidad = usuarios.getCantidadAlquileres(usuario);
      if (cantidad > 0) {
        for (let i = 0; i < cantidad; i++) {
          const row = document.createElement("tr");
          row.classList.add("table-active");

          // Crear las celdas de la fila
          row.innerHTML = `
        <th scope="row">${i + 1}</th>
        <td>${usuario.peliculas[i]}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.membresia}</td>
        `;
          // Agregar la fila al tbody
          tabla.appendChild(row);
        }
      }
    });
  }
}

document
  .getElementById("formAlquiler")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    saveAlquiler();
    this.reset();
  });

document.getElementById("confirmar").addEventListener("click", function (e) {
  rentar();
});

function rentar() {
  const pelicula = selectPeliculas.value;
  const membresia = selectUsuario.value;

  const usuario = usuarios.findUsuarioByMembresia(membresia);
  const movie = movies.findByTitulo(pelicula);

  if (usuarios.getCantidadAlquileres(usuario) < 3) {
    if (movie.copias === 0) {
      movies.rentMovie(pelicula, membresia);
      loadMembresia();
    }
  }
}

function loadMembresia() {
  const tabla = document.getElementById("tablaReserva");
  let cantidad = 0;
  tabla.innerHTML = "";

  if (movies.getCanMovies()) {
    movies.getAllMovies().forEach((movie) => {
      if (movie.reservacion.length > 0) {
        movie.reservacion.forEach((reservacion, Index) => {
          const row = document.createElement("tr");
          row.classList.add("table-active");

          // Crear las celdas de la fila
          row.innerHTML = `
          <th scope="row">${Index + 1}</th>
          <td>${movie.titulo}</td>
          <td>${reservacion}</td>
          `;
          // Agregar la fila al tbody
          tabla.appendChild(row);
        });
      }
    });
  }
}
