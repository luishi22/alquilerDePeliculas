class Movie {
  constructor(titulo, director, genero, anho, copias) {
    this.titulo = titulo;
    this.director = director;
    this.genero = genero;
    this.anho = anho;
    this.copias = copias;
    this.rentadas = 0;
    this.puntuacion = 0;
    this.puntuaciones = [];
  }

  updatePuntuacion(newRating) {
    this.puntuaciones.push(newRating); // Añade la nueva calificación
    this.puntuacion =
      this.puntuaciones.reduce((sum, rating) => sum + rating, 0) /
      this.puntuaciones.length; // Calcula el promedio
  }
}

export { Movie };
