// auth.js: control básico de sesión y roles

document.addEventListener("DOMContentLoaded", () => {
    const usuario = localStorage.getItem("usuario");
    const rol = localStorage.getItem("rol");   // "ADMIN" o "EMPLEADO"

    // Si no hay sesión -> al login
    if (!usuario || !rol) {
        if (!window.location.pathname.endsWith("login.html")) {
            window.location.href = "login.html";
        }
        return;
    }

    // Mostrar nombre y rol en el header si existen
    const spanNombre = document.getElementById("nombre-usuario");
    const spanRol = document.getElementById("rol-usuario");

    if (spanNombre) spanNombre.textContent = usuario;
    if (spanRol) {
        spanRol.textContent = (rol === "ADMIN") ? "Administradora" : "Empleada";
    }

    // Si es EMPLEADO, ocultar todo lo que sea solo-admin
    if (rol === "EMPLEADO") {
        const soloAdminEls = document.querySelectorAll(".solo-admin");
        soloAdminEls.forEach(el => {
            el.style.display = "none";
        });
    }
});
/* ======================== MENÚ DE USUARIO ======================== */

document.addEventListener("DOMContentLoaded", () => {
    const avatar = document.querySelector(".user-avatar");
    const menu = document.getElementById("menu-usuario");
    const logoutBtn = document.getElementById("btn-logout");

    if (!avatar || !menu) return;

    // Mostrar / ocultar el menú
    avatar.addEventListener("click", () => {
        menu.classList.toggle("d-none");
    });

    // Cerrar sesión
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.clear();
            window.location.href = "login.html";
        });
    }

    // Cerrar menú si se hace clic fuera
    document.addEventListener("click", (e) => {
        if (!menu.contains(e.target) && !avatar.contains(e.target)) {
            menu.classList.add("d-none");
        }
    });
});
