import { Usuario } from "../models/user.js";

class UserManager {
  constructor() {
    this.usuarios = [];
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    const array = JSON.parse(localStorage.getItem("usuarios"));
    if (array === null || array.length <= 0) {
      this.usuarios = [];
    } else {
      this.usuarios = array;
    }
  }

  addUser(usuario) {
    this.usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(this.usuarios));
  }

  actualizarUsuario(usuarioActualizado) {
    // Obtener el arreglo de usuarios del localStorage
    const usuariosGuardados =
      JSON.parse(localStorage.getItem("usuarios")) || [];

    // Encontrar el índice del usuario a actualizar
    const indice = usuariosGuardados.findIndex(
      (usuario) => usuario.membresia === usuarioActualizado.membresia
    );

    // Si se encuentra el usuario, actualizarlo
    if (indice !== -1) {
      usuariosGuardados[indice] = usuarioActualizado;

      // Guardar el arreglo actualizado en el localStorage
      localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
      this.usuarios = usuariosGuardados; // Actualizar el arreglo en la instancia actual
    } else {
      console.log("Usuario no encontrado");
    }
  }

  getAllUser() {
    return JSON.parse(localStorage.getItem("usuarios"));
  }

  getCantUser() {
    const array = JSON.parse(localStorage.getItem("usuarios"));
    if (array === null || array.length <= 0) {
      return false;
    }
    return true;
  }

  findUsuarioByMembresia(membresia) {
    const usuario = this.usuarios.find(
      (usuario) => usuario.membresia === membresia
    );
    return usuario;
  }

  addAlquiler(usuario, pelicula) {
    usuario.historial.push(pelicula);
    usuario.peliculas.push(pelicula);
    this.actualizarUsuario(usuario);
  }

  getAlquileres(usuario) {
    return usuario.peliculas;
  }

  getCantidadAlquileres(usuario) {
    const cantidad = usuario.peliculas.length;
    return cantidad;
  }

  addReserva(usuario, reserva) {
    usuario.push(reserva);
  }
}

export { UserManager };
