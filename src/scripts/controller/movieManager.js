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

  setRating(movie, rating) {
    movie.updatePuntuacion(rating);
  }

  getTopRatedMovies() {
    // Devuelve las 5 películas mejor calificadas
    return this.movies
      .sort((a, b) => b.puntuacion - a.puntuacion) // Ordenar por calificación de mayor a menor, b - a para mayor a menor y a - b para menor a mayor
      .slice(0, 5); // Toma el indice 0,1,2,3,4
  }

  rentMovie(title) {
    const movie = this.findByTitulo(title);
    if (movie && movie.copias > movie.rentadas) {
      movie.rentadas++;
      return true; // Alquiler exitoso
    }
    return false; // Película ya está alquilada o no hay copias disponibles
  }

  returnMovie(title) {
    const movie = this.findMovieByTitle(title);
    if (movie && movie.rentadas > 0) {
      movie.isRented--; // Decrementa el contador de copias alquiladas
      return true; // Devolución exitosa
    }
    return false; // No hay copias alquiladas para devolver o no se encontró
  }
}

export { MovieManager };
