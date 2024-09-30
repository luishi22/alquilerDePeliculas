import { Usuario } from "../models/user.js";

class UserManager {
  constructor() {
    this.usuarios = [];
  }

  addUser(usuario) {
    this.usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(this.usuarios));
  }

  getAllUser() {
    return JSON.parse(localStorage.getItem("usuarios"));
  }

  getAlquilerCantidad(nombre) {
    const usuario = findUsuario(nombre);
    if (usuario.peliculas.length < 3) {
      return true;
    } else {
      return false;
    }
  }

  findUsuario(nombre) {
    return this.usuarios.find((usuario) => usuario.nombre === nombre);
  }

  addAlquiler(nombre, pelicula) {
    const usuario = findUsuario(nombre);
    usuario.addAlquiler(pelicula);
  }

  addReserva(nombre, reserva) {
    const usuario = findUsuario(nombre);
    usuario.addReserva(reserva);
  }
}

export { UserManager };
