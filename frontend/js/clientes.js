const API_CLIENTES = "http://localhost:8080/api/clientes";

let clientesCache = [];

document.addEventListener("DOMContentLoaded", () => {
    cargarClientes();

    const form = document.getElementById("form-cliente");
    form.addEventListener("submit", onSubmitCliente);
});

// Cargar clientes desde el backend
async function cargarClientes() {
    try {
        const res = await fetch(API_CLIENTES);
        if (!res.ok) {
            console.error("Error al cargar clientes");
            return;
        }

        const data = await res.json();
        clientesCache = data;
        renderTablaClientes();
    } catch (err) {
        console.error("Error de conexión al cargar clientes", err);
    }
}

// Pintar tabla
function renderTablaClientes() {
    const tbody = document.querySelector("#tabla-clientes tbody");
    tbody.innerHTML = "";

    clientesCache.forEach(c => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${c.id}</td>
            <td>${c.nombre}</td>
            <td>${c.telefono || ""}</td>
            <td>${c.email || ""}</td>
            <td>${c.tipo || ""}</td>
            <td>
                <button class="btn btn-sm btn-secondary" onclick="editarCliente(${c.id})">Editar</button>
                <button class="btn btn-sm btn-danger ms-1" onclick="eliminarCliente(${c.id})">Eliminar</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

// Submit del formulario (crear / actualizar)
async function onSubmitCliente(e) {
    e.preventDefault();

    const id = document.getElementById("cliente-id").value;
    const nombre = document.getElementById("cliente-nombre").value.trim();
    const telefono = document.getElementById("cliente-telefono").value.trim();
    const email = document.getElementById("cliente-email").value.trim();
    const direccion = document.getElementById("cliente-direccion").value.trim();
    const tipo = document.getElementById("cliente-tipo").value.trim();

    if (!nombre) {
        alert("El nombre del cliente es obligatorio.");
        return;
    }

    const payload = { nombre, telefono, email, direccion, tipo };

    try {
        let url = API_CLIENTES;
        let method = "POST";

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
            alert("Error al guardar el cliente.");
            return;
        }

        // limpiar form
        document.getElementById("form-cliente").reset();
        document.getElementById("cliente-id").value = "";

        await cargarClientes();
    } catch (err) {
        console.error("Error al guardar cliente", err);
        alert("Error de conexión con el servidor.");
    }
}

// Cargar datos de un cliente en el form para editar
function editarCliente(id) {
    const cliente = clientesCache.find(c => c.id === id);
    if (!cliente) return;

    document.getElementById("cliente-id").value = cliente.id;
    document.getElementById("cliente-nombre").value = cliente.nombre || "";
    document.getElementById("cliente-telefono").value = cliente.telefono || "";
    document.getElementById("cliente-email").value = cliente.email || "";
    document.getElementById("cliente-direccion").value = cliente.direccion || "";
    document.getElementById("cliente-tipo").value = cliente.tipo || "";
}

// Eliminar cliente
async function eliminarCliente(id) {
    if (!confirm("¿Seguro que deseas eliminar este cliente?")) return;

    try {
        const res = await fetch(`${API_CLIENTES}/${id}`, {
            method: "DELETE"
        });

        if (!res.ok) {
            alert("Error al eliminar el cliente.");
            return;
        }

        await cargarClientes();
    } catch (err) {
        console.error("Error al eliminar cliente", err);
        alert("Error de conexión con el servidor.");
    }
}
