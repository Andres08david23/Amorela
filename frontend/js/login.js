const API_LOGIN = "http://localhost:8080/api/auth/login";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-login");
    const mensaje = document.getElementById("mensaje-error");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("usuario").value.trim();
        const password = document.getElementById("contrasena").value.trim();

        mensaje.textContent = "";

        try {
            const res = await fetch(API_LOGIN, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            if (!res.ok) {
                mensaje.textContent = "Error de servidor";
                return;
            }

            const data = await res.json();

            if (!data.ok) {
                mensaje.textContent = data.message || "Usuario o contraseña inválidos";
                return;
            }

            // guardar info en localStorage
            localStorage.setItem("usuario", username);
            localStorage.setItem("rol", data.role);

            // redirigir según rol
            if (data.role === "ADMIN") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "productos.html";
            }

        } catch (error) {
            console.error(error);
            mensaje.textContent = "No se pudo conectar con el servidor";
        }
    });
});
