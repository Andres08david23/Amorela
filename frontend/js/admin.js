document.addEventListener("DOMContentLoaded", () => {
    const rol = localStorage.getItem("rol");

    if (rol !== "ADMIN") {
        alert("No tienes permiso para acceder al panel de admin.");
        window.location.href = "login.html";
    }
});
