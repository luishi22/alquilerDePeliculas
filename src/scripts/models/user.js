class Usuario {
  constructor(nombre, membresia, correo) {
    this.nombre = nombre;
    this.membresia = membresia;
    this.correo = correo;
    this.historial = [];
    this.peliculas = [];
    this.reservas = [];
  }

  addAlquiler(pelicula) {
    this.historial.push(pelicula);
    this.peliculas.push(pelicula);
  }

  addReserva(reserva) {
    this.reservas.push(reserva);
  }
}

export { Usuario };
