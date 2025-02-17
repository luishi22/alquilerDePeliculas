// Llama a verificarSeccion al cargar la página
window.addEventListener("load", verificarPeliculas);

// Llama a verificarSeccion cuando el hash cambie
window.addEventListener("hashchange", verificarPeliculas);

// Función para verificar y cargar datos de la sección
function verificarPeliculas() {
  if (window.location.hash === "#seccionGestionPelicula") {
    loadSelectGenero();
    loadSelectAnho();
    if (movies.length > 0) {
      loadMovies(movies);
    }
  }
}

function loadSelectGenero() {
  const selectGenero = document.getElementById("selectGenero");
  selectGenero.innerHTML = `
    <option value="Géneros" selected>Géneros</option>
    <option value="Accion">Acción</option>
    <option value="Comedia">Comedia</option>
    <option value="Drama">Drama</option>
    <option value="Ciencia Ficcion">Ciencia Ficción</option>
    <option value="Terror">Terror</option>
    <option value="Romance">Romance</option>
    <option value="Aventura">Aventura</option>
    <option value="Animacion">Animación</option>
    <option value="Documental">Documental</option>
    <option value="Fantasia">Fantasía</option>
  `;
}

function loadSelectAnho() {
  const selectAnho = document.getElementById("selectAnho");
  selectAnho.innerHTML = `<option value="Selecciona el año" selected>Selecciona el año</option>`;

  const currentYear = new Date().getFullYear(); // Año actual

  for (let year = currentYear; year >= 1900; year--) {
    // Rango de años de 1900 al año actual
    let option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    selectAnho.appendChild(option);
  }
}

function filtrarPeliculas() {
  const filtro = document.getElementById("filtro").value.toLowerCase();

  // Obtener todas las películas y aplicar el filtro
  const peliculasFiltradas = movies.filter(
    (pelicula) =>
      pelicula.genero.toLowerCase().includes(filtro) ||
      pelicula.anho.toString().includes(filtro)
  );

  // Recargar la tabla con los proyectos filtrados
  loadMovies(peliculasFiltradas);
}

function saveMovie() {
  const inputTitulo = document.getElementById("inputTitulo").value;
  const inputDirector = document.getElementById("inputDirector").value;
  const selectAnho = document.getElementById("selectAnho").value;
  const selectGenero = document.getElementById("selectGenero").value;
  const inputCopias = parseInt(document.getElementById("inputCopias").value);
  let findPelicula = "";

  // Limpiar mensajes de error previos
  document.getElementById("error-titulo").style.display = "none";
  document.getElementById("error-anho").style.display = "none";
  document.getElementById("error-genero").style.display = "none";
  document.getElementById("error-copias").style.display = "none";

  let hasError = false; // Variable para rastrear errores

  // Validación de cada campo
  if (inputTitulo.trim() === "") {
    document.getElementById("error-titulo").textContent =
      "El título es obligatorio.";
    document.getElementById("error-titulo").style.display = "block";
    hasError = true; // Marca si hay error xd
  } else if (movies.some((movie) => movie.nombre == inputTitulo.trim())) {
    document.getElementById("error-titulo").textContent =
      "Esta pelicula ya fue registrada.";
    document.getElementById("error-titulo").style.display = "block";
    hasError = true; // Marca si hay error xd
  }

  if (selectAnho === "Selecciona el año") {
    document.getElementById("error-anho").textContent =
      "Debes seleccionar un año.";
    document.getElementById("error-anho").style.display = "block";
    hasError = true;
  }

  if (selectGenero === "Géneros") {
    document.getElementById("error-genero").textContent =
      "Debes seleccionar un género.";
    document.getElementById("error-genero").style.display = "block";
    hasError = true;
  }

  if (inputCopias <= 0) {
    document.getElementById("error-copias").textContent =
      "Debes Digitar un numero mayor a 0.";
    document.getElementById("error-copias").style.display = "block";
    hasError = true;
  }

  // Si no hay errores, proceder con la lógica de guardado
  if (!hasError) {
    const movie = new Movie(
      inputTitulo,
      inputDirector,
      selectGenero,
      selectAnho,
      inputCopias
    );
    const modal = new bootstrap.Modal(
      document.getElementById("modalGestionPelicula")
    );
    modal.show();
    addMovies(movie);
    if (movies.length > 0) {
      loadMovies(movies);
    }
    return true;
  }
}

function loadMovies(peliculas) {
  const table = document.getElementById("tablaGestion");
  table.innerHTML = "";

  peliculas.forEach((pelicula, index) => {
    const row = document.createElement("tr");

    row.classList.add("table-active");

    // Crear las celdas de la fila
    row.innerHTML = `
        <th scope="row">${index + 1}</th>
        <td>${pelicula.titulo}</td>
        <td>${pelicula.director}</td>
        <td>${pelicula.genero}</td>
        <td>${pelicula.anho}</td>
        <td>${pelicula.stock}</td>
        <td>${pelicula.prestamos}</td>
      `;
    // Agregar la fila al tbody
    table.appendChild(row);
  });
}

document
  .getElementById("formGestionPelicula")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const limpiar = saveMovie();
    if (limpiar) {
      this.reset();
    }
  });

document.getElementById("inputCopias").addEventListener("input", function () {
  const inputCopias = document.getElementById("inputCopias");
  const errorMessage = document.getElementById("error-copias");
  const value = inputCopias.value;

  // Limpia el mensaje de error
  errorMessage.style.display = "none";

  // Verifica si el valor no es un entero
  if (!Number.isInteger(Number(value)) || value < 0) {
    errorMessage.textContent = "Por favor, ingrese un número entero positivo.";
    errorMessage.style.display = "block";
  }
});

document.getElementById("filtro").addEventListener("input", filtrarPeliculas);
