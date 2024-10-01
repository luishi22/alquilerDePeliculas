import { Movie } from "../models/movie.js";

class MovieManager {
  constructor() {
    this.movies = [];
    this.cargarArray();
  }

  cargarArray() {
    const array = JSON.parse(localStorage.getItem("listMovies"));
    if (array === null || array.length <= 0) {
      this.movies = []; // Inicializa this.movies si no hay datos previos
    } else {
      this.movies = array; // Asigna el array correctamente a this.movies
    }
  }

  actualizarMovie(movieActualizado) {
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
      this.movies = moviesSave; // Actualizar el arreglo en la instancia actual
    } else {
      console.log("pelicula no encontrado");
    }
  }

  addMovies(movie) {
    this.movies.push(movie);
    localStorage.setItem("listMovies", JSON.stringify(this.movies));
  }

  getAllMovies() {
    return JSON.parse(localStorage.getItem("listMovies"));
  }

  getCanMovies() {
    const array = JSON.parse(localStorage.getItem("listMovies"));
    if (array === null || array.length <= 0) {
      return false;
    }
    return true;
  }

  filterMovieByAnho(anho) {
    return this.movies.filter((movie) => movie.anho === anho);
  }

  filterMovieByGenero(genero) {
    return this.movies.filter((movie) => movie.genero === genero);
  }

  findByTitulo(titulo) {
    const pelicula = this.movies.find((movie) => movie.titulo === titulo);
    if (pelicula === undefined) {
      return false;
    } else {
      return pelicula;
    }
  }

  alquilarMovie(titulo) {
    const movie = this.findByTitulo(titulo);
    movie.copias--;
    this.actualizarMovie(movie);
  }

  rentMovie(titulo, membresia) {
    const movie = this.findByTitulo(titulo);
    console.log(movie);
    movie.reservacion.push(membresia);
    this.actualizarMovie(movie);
  }

  returnMovie(titulo) {
    const movie = this.findMovieByTitle(titulo);
    movie.copias++;
    this.actualizarMovie(movie);
  }

  setRating(movie, rating) {
    movie.updatePuntuacion(rating);
  }

  getTopRatedMovies() {
    // Devuelve las 5 películas mejor calificadas
    return this.movies
      .sort((a, b) => b.puntuacion - a.puntuacion) // Ordenar por calificación de mayor a menor, b - a para mayor a menor y a - b para menor a mayor
      .slice(0, 5); // Toma el indice 0,1,2,3,4
  }
}

export { MovieManager };
