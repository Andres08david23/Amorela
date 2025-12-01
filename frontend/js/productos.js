const API_PRODUCTOS = "http://localhost:8080/api/productos";

let productosCache = [];

// Cuando cargue la página
document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();

    const form = document.getElementById("form-producto");
    // por si en alguna vista no existe el form:
    if (form) {
        form.addEventListener("submit", onSubmitProducto);
    }
});

// Cargar productos desde el backend
async function cargarProductos() {
    try {
        const res = await fetch(API_PRODUCTOS);
        if (!res.ok) {
            console.error("Error al cargar productos");
            return;
        }

        const data = await res.json();
        productosCache = data;
        renderTablaProductos();
    } catch (err) {
        console.error("Error de conexión al cargar productos", err);
    }
}

// Pintar la tabla
function renderTablaProductos() {
    const tbody = document.querySelector("#tabla-productos tbody");
    tbody.innerHTML = "";

    productosCache.forEach(p => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${p.id}</td>
            <td>${p.nombre}</td>
            <td>$${p.precio.toFixed(2)}</td>
            <td>${p.stock != null ? p.stock : ""}</td>
            <td class="solo-admin">
                <button class="btn btn-sm btn-secondary solo-admin" onclick="editarProducto(${p.id})">
                    Editar
                </button>
                <button class="btn btn-sm btn-danger ms-1 solo-admin" onclick="eliminarProducto(${p.id})">
                    Eliminar
                </button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

// Manejar submit del formulario (crear o actualizar)
async function onSubmitProducto(e) {
    e.preventDefault();

    const id = document.getElementById("producto-id").value;
    const nombre = document.getElementById("producto-nombre").value.trim();
    const precio = parseFloat(document.getElementById("producto-precio").value);
    const stockValor = document.getElementById("producto-stock").value;
    const stock = stockValor === "" ? null : parseInt(stockValor);

    if (!nombre || isNaN(precio)) {
        alert("Por favor, completa al menos nombre y precio.");
        return;
    }

    const payload = { nombre, precio, stock };

    try {
        let url = API_PRODUCTOS;
        let method = "POST";

        // Si hay id, entonces es actualización
        if (id) {
            url += `/${id}`;
            method = "PUT";
        }

        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            alert("Error al guardar el producto.");
            return;
        }

        // Limpiar formulario
        document.getElementById("form-producto").reset();
        document.getElementById("producto-id").value = "";

        // Recargar productos
        await cargarProductos();
    } catch (err) {
        console.error("Error al guardar producto", err);
        alert("Error de conexión con el servidor.");
    }
}

// Cargar datos en el formulario para editar
function editarProducto(id) {
    const producto = productosCache.find(p => p.id === id);
    if (!producto) return;

    document.getElementById("producto-id").value = producto.id;
    document.getElementById("producto-nombre").value = producto.nombre;
    document.getElementById("producto-precio").value = producto.precio;
    document.getElementById("producto-stock").value = producto.stock != null ? producto.stock : "";
}

// Eliminar producto
async function eliminarProducto(id) {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) {
        return;
    }

    try {
        const res = await fetch(`${API_PRODUCTOS}/${id}`, {
            method: "DELETE"
        });

        if (!res.ok) {
            alert("Error al eliminar el producto.");
            return;
        }

        await cargarProductos();
    } catch (err) {
        console.error("Error al eliminar producto", err);
        alert("Error de conexión con el servidor.");
    }
}
