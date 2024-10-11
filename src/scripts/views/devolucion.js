const selectDevolucionPeliculas = document.getElementById(
  "selectDevolucionPelicula"
);
const selectDevolucionUsuario = document.getElementById(
  "selectDevolucionUsuario"
);

// Llama a verificarDevolucion al cargar la página
window.addEventListener("load", verificarDevolucion);

// Llama a verificarDevolucion cuando el hash cambie
window.addEventListener("hashchange", verificarDevolucion);

document
  .getElementById("formDevilucion")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    if (devolucion()) {
      this.reset();
    }
  });

function devolucion() {
  const membresia = selectDevolucionUsuario.value;
  const pelicula = selectDevolucionPeliculas.value;
  const movie = movies.find((movie) => movie.titulo === pelicula);
  const user = usuarios.find((usuario) => usuario.membresia === membresia);

  const indexUsuario = user.peliculas.findIndex((peli) => peli === pelicula);
  if (membresia !== "nulo") {
    selectDevolucionPeliculas.innerHTML = "";
    user.peliculas.splice(indexUsuario, 1);
    movie.prestamos--;
    actualizarUsuario(user);
    const modal = new bootstrap.Modal(
      document.getElementById("modalGestionDevolucion")
    );
    modal.show();

    // Verifica si hay reservas
    if (movie.reservacion.length > 0) {
      const reserva = movie.reservacion.shift(); // Obtiene la primera reserva y la elimina del array
      const toastElement = document.getElementById("notiReserva");
      const toast = new bootstrap.Toast(toastElement);
      const userReserva = usuarios.find(
        (usuario) => usuario.membresia === reserva
      );
      // Muestra un mensaje en el toast sobre la reserva
      toastElement.querySelector(
        ".toast-body"
      ).innerHTML = `La película ${pelicula} ha sido reservada por el usuario: <br><strong>${reserva} - ${userReserva.nombre}</strong><br>¡Está disponible para recogerla!`;

      // Muestra el toast automáticamente
      toast.show();
      actualizarMovies(movie);
      /*       // Cierra el toast después de 3 segundos
      setTimeout(function () {
        toast.hide();
      }, 4000); */
    }

    return true;
  }
}

// Función para verificar y cargar datos de la sección
function verificarDevolucion() {
  if (window.location.hash === "#seccionDevolucion") {
    console.log("Verificando la sección de devolución");

    loadSelectReservaUser(); // Cargar usuarios
  }
}

// Función para cargar los usuarios
function loadSelectReservaUser() {
  // Limpiar opciones existentes
  selectDevolucionUsuario.innerHTML = "";
  const op = document.createElement("option");
  op.textContent = `Selecciona el usuario`;
  op.value = `nulo`;
  selectDevolucionUsuario.appendChild(op);

  if (usuarios.length > 0) {
    usuarios.forEach((usuario) => {
      if (usuario.peliculas.length > 0) {
        const option = document.createElement("option");
        option.textContent = `Usuario: ${usuario.nombre} - Membresía: ${usuario.membresia}`;
        option.value = usuario.membresia;
        selectDevolucionUsuario.appendChild(option);
      }
    });
  }
}

// Escuchar cambios en el select de usuario
selectDevolucionUsuario.addEventListener("change", (event) => {
  const membresiaSeleccionada = event.target.value;
  loadSelectReservaPeli(membresiaSeleccionada);
});

// Función modificada para cargar las películas alquiladas por el usuario seleccionado
function loadSelectReservaPeli(membresiaUsuario) {
  // Limpiar opciones existentes
  selectDevolucionPeliculas.innerHTML = "";

  // Buscar el usuario seleccionado
  const usuarioSeleccionado = usuarios.find(
    (usuario) => usuario.membresia === membresiaUsuario
  );
  console.log(usuarioSeleccionado);

  // Si el usuario existe y tiene películas alquiladas
  if (usuarioSeleccionado && usuarioSeleccionado.peliculas.length > 0) {
    usuarioSeleccionado.peliculas.forEach((pelicula) => {
      console.log(pelicula);
      const option = document.createElement("option");
      option.textContent = pelicula;
      option.value = pelicula;
      selectDevolucionPeliculas.appendChild(option);
    });
  } else {
    // Si no hay películas alquiladas o usuario no encontrado, mostrar un mensaje
    const option = document.createElement("option");
    option.textContent = "No hay películas alquiladas";
    option.disabled = true;
    selectDevolucionPeliculas.appendChild(option);
  }
}
