const API_LOGIN = "http://localhost:8080/api/auth/login";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-login");   // <-- MISMO ID QUE EN EL HTML
    const msgError = document.getElementById("mensaje-error");

    if (!form) {
        console.error("No se encontró el formulario de login.");
        return;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // evita ?usuario=... en la URL

        if (msgError) msgError.textContent = "";

        const usuario = document.getElementById("usuario").value.trim();
        const contrasena = document.getElementById("contrasena").value.trim();

        if (!usuario || !contrasena) {
            if (msgError) msgError.textContent = "Debes ingresar usuario y contraseña.";
            return;
        }

        try {
            const res = await fetch(API_LOGIN, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario, contrasena })
            });

            if (!res.ok) {
                if (msgError) msgError.textContent = "No se pudo conectar con el servidor.";
                return;
            }

            const data = await res.json();
            console.log("Respuesta login:", data);

            if (!data.success) {
                if (msgError) msgError.textContent = data.message || "Credenciales inválidas.";
                return;
            }

            // Guardamos usuario y rol
            localStorage.setItem("usuario", data.username);
            localStorage.setItem("rol", data.role);

            // Redirigimos al dashboard
            window.location.href = "inicio.html";

        } catch (err) {
            console.error("Error en login", err);
            if (msgError) msgError.textContent = "Error de conexión con el servidor.";
        }
    });
});
