// Actualiza la navegación entre secciones
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function () {
    // Elimina la clase 'active' de todos los enlaces (link)
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
    });

    // Añade la clase 'active' al enlace clicado
    this.classList.add("active");

    const sections = document.querySelectorAll(".seccion");
    sections.forEach((seccion) => seccion.classList.remove("activo"));
    const targetSection = document.querySelector(this.getAttribute("href"));
    targetSection.classList.add("activo");
  });
});

class Usuario {
  constructor(nombre, membresia, correo) {
    this.nombre = nombre;
    this.membresia = membresia;
    this.correo = correo;
    this.historial = [];
    this.peliculas = [];
  }
}

class Movie {
  constructor(titulo, director, genero, anho, stock) {
    this.titulo = titulo;
    this.director = director;
    this.genero = genero;
    this.anho = anho;
    this.stock = stock;
    this.prestamos = 0;
    this.puntuacion = 0;
    this.puntuaciones = [];
    this.reservacion = [];
  }

  updatePuntuacion(newRating) {
    this.puntuaciones.push(newRating); // Añade la nueva calificación
    this.puntuacion =
      this.puntuaciones.reduce((sum, rating) => sum + rating, 0) /
      this.puntuaciones.length; // Calcula el promedio
  }
}

const movies = [];
const usuarios = [];

// Llama a verificarSeccion al cargar la página
window.addEventListener("load", cargarArrays);

// Llama a verificarSeccion cuando el hash cambie
/* window.addEventListener("hashchange", verificarSeccion); */

// Función para verificar y cargar datos de la sección
function cargarArrays() {
  if (window.location.hash === "#seccionGestionLibro") {
    cargarMovies();
    cargarUsuarios();
  }
}

/* Array de peliculas */
function cargarMovies() {
  const array = JSON.parse(localStorage.getItem("listMovies")) || [];
  if (array.length > 0) {
    movies = array; // Asigna el array correctamente a this.movies
  }
}

function actualizarMovies(movieActualizado) {
  // Obtener el arreglo de pelis del localStorage
  const moviesSave = JSON.parse(localStorage.getItem("listMovies")) || [];

  // Encontrar el índice de la peli a actualizar
  const indice = moviesSave.findIndex(
    (movie) => movie.titulo === movieActualizado.titulo
  );

  if (indice !== -1) {
    moviesSave[indice] = movieActualizado;

    // Guardar el arreglo actualizado en el localStorage
    localStorage.setItem("listMovies", JSON.stringify(moviesSave));
    movies = moviesSave; // Actualizar el arreglo en la instancia actual
  } else {
    console.log("pelicula no encontrado");
  }
}

function addMovies(movie) {
  movies.push(movie);
  localStorage.setItem("listMovies", JSON.stringify(movies));
}

/* Array de usuarios */
function cargarUsuarios() {
  const array = JSON.parse(localStorage.getItem("usuarios")) || [];
  if (array.length > 0) {
    usuarios = array;
  }
}

function addUser(usuario) {
  usuarios.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function actualizarUsuario(usuarioActualizado) {
  // Obtener el arreglo de usuarios del localStorage
  const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Encontrar el índice del usuario a actualizar
  const indice = usuariosGuardados.findIndex(
    (usuario) => usuario.membresia === usuarioActualizado.membresia
  );

  // Si se encuentra el usuario, actualizarlo
  if (indice !== -1) {
    usuariosGuardados[indice] = usuarioActualizado;

    // Guardar el arreglo actualizado en el localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
    usuarios = usuariosGuardados; // Actualizar el arreglo en la instancia actual
  } else {
    console.log("Usuario no encontrado");
  }
}
