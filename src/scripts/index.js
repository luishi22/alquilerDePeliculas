// index.js
import "./views/viewMovie.js";
import "./views/viewUser.js";
import "./views/viewAlquiler.js";

// Actualiza la navegación entre secciones
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function () {
    // Elimina la clase 'active' de todos los enlaces (link)
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
    });

    // Añade la clase 'active' al enlace clicado
    this.classList.add("active");

    const sections = document.querySelectorAll(".seccion");
    sections.forEach((seccion) => seccion.classList.remove("activo"));
    const targetSection = document.querySelector(this.getAttribute("href"));
    targetSection.classList.add("activo");
  });
});
