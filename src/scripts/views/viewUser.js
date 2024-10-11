// Llama a verificarUsuarios al cargar la página
window.addEventListener("load", verificarUsuarios);

// Llama a verificarUsuarios cuando el hash cambie
window.addEventListener("hashchange", verificarUsuarios);

// Función para verificar y cargar datos de la sección
function verificarUsuarios() {
  if (window.location.hash === "#seccionGestionUsuario") {
    loadUsuarios();
  }
}

const inputMembresia = document.getElementById("inputMembresia");

inputMembresia.addEventListener("input", function () {
  let originalValue = inputMembresia.value;
  let value = originalValue.replace(/\D/g, ""); // Eliminar todo lo que no sea dígito

  // Formatear el valor con guiones
  if (value.length >= 3) {
    value = value.slice(0, 2) + "-" + value.slice(2);
  }
  if (value.length >= 6) {
    value = value.slice(0, 5) + "-" + value.slice(5);
  }

  inputMembresia.value = value.slice(0, 7); // Limitar a 7 caracteres
});

inputMembresia.addEventListener("keydown", function (event) {
  const key = event.key;

  // Validar si la tecla presionada no es un número ni un guion
  if (
    !/[\d-]/.test(key) &&
    key !== "Backspace" &&
    key !== "ArrowLeft" &&
    key !== "ArrowRight"
  ) {
    event.preventDefault(); // Evitar que el carácter no válido sea ingresado
    document.getElementById("error-membresia").textContent =
      "Solo se permiten números o guiones";
    document.getElementById("error-membresia").style.display = "block";
  } else {
    // Ocultar el mensaje de error si la tecla es válida
    document.getElementById("error-membresia").style.display = "none";
  }
});

function saveUser() {
  const inputUsuario = document.getElementById("inputNombre").value;
  const inputMembresia = document.getElementById("inputMembresia").value;
  const inputCorreo = document.getElementById("inputCorreo").value;
  const inputError = document.getElementById("error-membresia");
  const usuario = new Usuario(inputUsuario, inputMembresia, inputCorreo);

  if (usuarios.some((user) => user.membresia === inputMembresia.trim())) {
    inputError.textContent = "Esta membresia ya existe";
    inputError.style.display = "block";
  } else {
    // Ocultar el mensaje de error si la tecla es válida
    inputError.style.display = "none";
    addUser(usuario);
    loadUsuarios();
    const modal = new bootstrap.Modal(
      document.getElementById("modalGestionUsuario")
    );
    modal.show();
    return true;
  }
}

function loadUsuarios() {
  if (usuarios.length > 0) {
    const table = document.getElementById("tablaUsuario");
    table.innerHTML = "";
    usuarios.forEach((usuario, index) => {
      const row = document.createElement("tr");

      row.classList.add("table-active");

      // Crear las celdas de la fila
      row.innerHTML = `
        <th scope="row">${index + 1}</th>
        <td>${usuario.nombre}</td>
        <td>${usuario.membresia}</td>
        <td>${usuario.correo}</td>
      `;
      // Agregar la fila al tbody
      table.appendChild(row);
    });
  }
}

document
  .getElementById("formGestionUsuario")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    if (saveUser()) {
      this.reset();
    }
  });
