//clase para manejo de vistas
import { MovieManager } from "../controller/movieManager.js";
import { Movie } from "../models/movie.js";

const movies = new MovieManager();

loadSelect();
window.onload = function () {
  loadMovies();
};

function loadSelect() {
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

function loadMovies() {
  const table = document.getElementById("tablaGestion");
  table.innerHTML = "";

  movies.getAllMovies().forEach((pelicula, index) => {
    const row = document.createElement("tr");

    row.classList.add("table-active");

    // Crear las celdas de la fila
    row.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td>${pelicula.titulo}</td>
      <td>${pelicula.director}</td>
      <td>${pelicula.genero}</td>
      <td>${pelicula.anho}</td>
      <td>${pelicula.copias}</td>
    `;
    // Agregar la fila al tbody
    table.appendChild(row);
  });
}

function filtrarMovies(filtro, tipo) {
  if (filtro === "anho") {
    const table = document.getElementById("tablaGestion");
    table.innerHTML = "";

    movies.filterMovieByAnho(tipo).forEach((pelicula, index) => {
      const row = document.createElement("tr");

      row.classList.add("table-active");

      // Crear las celdas de la fila
      row.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td>${pelicula.titulo}</td>
      <td>${pelicula.director}</td>
      <td>${pelicula.genero}</td>
      <td>${pelicula.anho}</td>
      <td>${pelicula.copias}</td>
    `;
      // Agregar la fila al tbody
      table.appendChild(row);
    });
  } else if (filtro === "genero") {
    const table = document.getElementById("tablaGestion");
    table.innerHTML = "";

    movies.filterMovieByGenero(tipo).forEach((pelicula, index) => {
      const row = document.createElement("tr");

      row.classList.add("table-active");

      // Crear las celdas de la fila
      row.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td>${pelicula.titulo}</td>
      <td>${pelicula.director}</td>
      <td>${pelicula.genero}</td>
      <td>${pelicula.anho}</td>
      <td>${pelicula.copias}</td>
    `;
      // Agregar la fila al tbody
      table.appendChild(row);
    });
  }
}

function loadSelectfilter(llenar) {
  if (llenar === "genero") {
    const selectGenero = document.getElementById("selectFiltro");
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
  } else {
    const selectAnho = document.getElementById("selectFiltro");
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
}

function checkControllerfilter() {
  const radioSelect = document.querySelector('input[name="options"]:checked');
  const selectFiltro = document.getElementById("DivSelectFiltro");
  const selectFiltroValue = document.getElementById("selectFiltro");

  // Verificamos si hay un radio button seleccionado
  if (radioSelect) {
    const selectedValue = radioSelect.value;

    if (selectedValue === "genero") {
      loadSelectfilter("genero");
      selectFiltro.classList.add("activo");

      // Espera a que el valor del select cambie antes de filtrar
      selectFiltroValue.addEventListener("change", () => {
        filtrarMovies("genero", selectFiltroValue.value);
      });
    } else if (selectedValue === "anho") {
      loadSelectfilter("anho");
      selectFiltro.classList.add("activo");

      // Espera a que el valor del select cambie antes de filtrar
      selectFiltroValue.addEventListener("change", () => {
        filtrarMovies("anho", selectFiltroValue.value);
      });
    } else if (selectedValue === "todas") {
      selectFiltro.classList.remove("activo");
      loadMovies();
    }
  }
}

// IDs de los radio buttons
const radios = ["filtrarTodas", "filtrarGenero", "filtrarAnho"];

// Agregar el evento change a todos los radio buttons
radios.forEach((id) => {
  document.getElementById(id).addEventListener("change", () => {
    checkControllerfilter();
  });
});

function saveMovie() {
  const inputTitulo = document.getElementById("inputTitulo").value;
  const inputDirector = document.getElementById("inputDirector").value;
  const selectAnho = document.getElementById("selectAnho").value;
  const selectGenero = document.getElementById("selectGenero").value;
  const inputCopias = parseInt(document.getElementById("inputCopias").value);

  // Limpiar mensajes de error previos
  document.getElementById("error-titulo").style.display = "none";
  document.getElementById("error-director").style.display = "none";
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
  }

  if (inputDirector.trim() === "") {
    document.getElementById("error-director").textContent =
      "El director es obligatorio.";
    document.getElementById("error-director").style.display = "block";
    hasError = true;
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
    movies.addMovies(movie);
    loadMovies();
    return true;
  }
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
