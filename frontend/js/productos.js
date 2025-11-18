const API_URL = "http://localhost:8080/api/productos";

async function cargarProductos() {
    const respuesta = await fetch(API_URL);
    const productos = await respuesta.json();

    const contenedor = document.getElementById("lista-productos");
    contenedor.innerHTML = "";

    productos.forEach(p => {
        const item = document.createElement("div");
        item.classList.add("producto");

        item.innerHTML = `
            <h3>${p.nombre}</h3>
            <p>Precio: $${p.precio}</p>
        `;

        contenedor.appendChild(item);
    });
}

document.addEventListener("DOMContentLoaded", cargarProductos);
