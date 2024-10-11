const selectPeliculas = document.getElementById("selectPeliculas");
const selectUsuario = document.getElementById("selectUsuarios");

// Llama a verrificarAlquiler al cargar la página
window.addEventListener("load", verrificarAlquiler);

// Llama a verrificarAlquiler cuando el hash cambie
window.addEventListener("hashchange", verrificarAlquiler);

// Función para verificar y cargar datos de la sección
function verrificarAlquiler() {
  if (window.location.hash === "#seccionAlquiler") {
    loadSelectMovies(); // Cargar películas
    loadSelectUsers(); // Cargar usuarios
    loadAlquileres();
    loadMembresia();
  }
}

// Función para cargar las películas
function loadSelectMovies() {
  // Limpiar opciones existentes
  selectPeliculas.innerHTML = "";

  if (movies.length > 0) {
    movies.forEach((movie) => {
      const option = document.createElement("option");
      option.textContent = movie.titulo;
      option.value = movie.titulo;
      selectPeliculas.appendChild(option);
    });
  }
}

// Función para cargar los usuarios
function loadSelectUsers() {
  // Limpiar opciones existentes
  selectUsuario.innerHTML = "";

  if (usuarios.length > 0) {
    usuarios.forEach((usuario) => {
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

  const user = usuarios.find((usuario) => usuario.membresia === membresia);
  const movie = movies.find((movie) => movie.titulo === pelicula.trim());

  const cantidad = movie.stock - movie.prestamos;
  const usuarioPelis = user.peliculas.length;
  console.log(user);
  if (usuarioPelis < 4) {
    if (cantidad > 0) {
      movie.prestamos++;
      user.peliculas.push(movie.titulo);
      user.historial.push(movie.titulo);
      actualizarMovies(movie);
      actualizarUsuario(user);
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
    return true;
  }
}

function loadAlquileres() {
  const tabla = document.getElementById("tablaAlquiler");
  let cantidad = 0;
  tabla.innerHTML = "";

  if (usuarios.length > 0) {
    usuarios.forEach((usuario) => {
      cantidad = usuario.peliculas.length;

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
  });

function reservar() {
  const pelicula = selectPeliculas.value;
  const membresia = selectUsuario.value;

  const usuario = usuarios.find((usuario) => usuario.membresia === membresia);
  const movie = movies.find((movie) => movie.titulo === pelicula.trim());
  console.log(usuario.peliculas.length);
  if (usuario.peliculas.length < 3) {
    if (movie.stock - movie.prestamos === 0) {
      movie.reservacion.push(usuario.membresia);
      actualizarMovies(movie);
      loadMembresia();
    }
  } else {
    alert("El usuario ya tiene alquiladas 3 peliculas");
  }
}

function loadMembresia() {
  const tabla = document.getElementById("tablaReserva");
  tabla.innerHTML = "";

  movies.forEach((movie) => {
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
