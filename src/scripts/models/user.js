class Usuario {
  constructor(nombre, membresia, correo) {
    this.nombre = nombre;
    this.membresia = membresia;
    this.correo = correo;
    this.historial = [];
    this.peliculas = [];
  }
}

export { Usuario };
