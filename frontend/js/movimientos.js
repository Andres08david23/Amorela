const API_VENTAS = "http://localhost:8080/api/ventas";
const API_GASTOS = "http://localhost:8080/api/gastos";
const API_PRODUCTOS = "http://localhost:8080/api/productos";

let ventasCache = [];
let gastosCache = [];
let productosCache = [];

document.addEventListener("DOMContentLoaded", () => {
    cargarVentas();
    cargarGastos();
    cargarProductosParaVentas();

    const formVenta = document.getElementById("form-venta");
    const formGasto = document.getElementById("form-gasto");

    if (formVenta) formVenta.addEventListener("submit", onSubmitVenta);
    if (formGasto) formGasto.addEventListener("submit", onSubmitGasto);

    const hoy = new Date().toISOString().substring(0, 10);
    const ventaFecha = document.getElementById("venta-fecha");
    const gastoFecha = document.getElementById("gasto-fecha");
    if (ventaFecha) ventaFecha.value = hoy;
    if (gastoFecha) gastoFecha.value = hoy;
});

/* ===================== PRODUCTOS PARA VENTAS ===================== */

async function cargarProductosParaVentas() {
    try {
        const res = await fetch(API_PRODUCTOS);
        if (!res.ok) {
            console.error("Error al cargar productos para ventas");
            return;
        }

        productosCache = await res.json();
        const select = document.getElementById("venta-producto");
        if (!select) return;

        // Limpiar y volver a llenar
        select.innerHTML = `<option value="">Seleccione un producto</option>`;

        productosCache.forEach(p => {
            const opt = document.createElement("option");
            opt.value = p.id;
            opt.textContent = `${p.nombre} - $${p.precio.toLocaleString("es-CO")}`;
            select.appendChild(opt);
        });
    } catch (err) {
        console.error("Error de conexión al cargar productos", err);
    }
}

/* ===================== VENTAS (INGRESOS) ===================== */

async function cargarVentas() {
    try {
        const res = await fetch(API_VENTAS);
        if (!res.ok) {
            console.error("Error al cargar ventas");
            return;
        }
        ventasCache = await res.json();
        renderTablaVentas();
    } catch (err) {
        console.error("Error de conexión al cargar ventas", err);
    }
}

function renderTablaVentas() {
    const tbody = document.querySelector("#tabla-ingresos tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    ventasCache.forEach(v => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${v.fecha || ""}</td>
            <td>${v.cliente || ""}</td>
            <td>$${v.total != null ? v.total.toLocaleString("es-CO") : "0"}</td>
            <td>${v.metodoPago || "-"}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="eliminarVenta(${v.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function onSubmitVenta(e) {
    e.preventDefault();

    const cliente = document.getElementById("venta-cliente").value.trim() || "Mostrador";
    const fecha = document.getElementById("venta-fecha").value;
    const metodoPago = document.getElementById("venta-metodo").value.trim() || "N/A";

    const productoIdStr = document.getElementById("venta-producto").value;
    const cantidadStr = document.getElementById("venta-cantidad").value;

    if (!productoIdStr) {
        alert("Debes seleccionar un producto.");
        return;
    }

    const cantidad = parseInt(cantidadStr);
    if (isNaN(cantidad) || cantidad <= 0) {
        alert("La cantidad debe ser mayor que cero.");
        return;
    }

    const productoId = parseInt(productoIdStr);
    const producto = productosCache.find(p => p.id === productoId);

    if (!producto) {
        alert("Producto no encontrado.");
        return;
    }

    const precioUnitario = producto.precio;
    const subtotal = precioUnitario * cantidad;

    // mini DetalleVenta (solo un producto por venta, por ahora)
    const detalle = {
        productoId: producto.id,
        nombreProducto: producto.nombre,
        cantidad: cantidad,
        precioUnitario: precioUnitario,
        subtotal: subtotal
    };

    const payload = {
        cliente,
        fecha,
        metodoPago,
        // total será recalculado en el backend, pero lo enviamos igual
        total: subtotal,
        detalles: [detalle]
    };

    try {
        const res = await fetch(API_VENTAS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            alert("Error al guardar la venta.");
            return;
        }

        document.getElementById("form-venta").reset();
        const hoy = new Date().toISOString().substring(0, 10);
        document.getElementById("venta-fecha").value = hoy;

        await cargarVentas();
    } catch (err) {
        console.error("Error al guardar venta", err);
        alert("Error de conexión con el servidor.");
    }
}

async function eliminarVenta(id) {
    if (!confirm("¿Seguro que deseas eliminar esta venta?")) return;

    try {
        const res = await fetch(`${API_VENTAS}/${id}`, {
            method: "DELETE"
        });

        if (!res.ok) {
            alert("Error al eliminar la venta.");
            return;
        }

        await cargarVentas();
    } catch (err) {
        console.error("Error al eliminar venta", err);
        alert("Error de conexión con el servidor.");
    }
}

/* ===================== GASTOS ===================== */

async function cargarGastos() {
    try {
        const res = await fetch(API_GASTOS);
        if (!res.ok) {
            console.error("Error al cargar gastos");
            return;
        }
        gastosCache = await res.json();
        renderTablaGastos();
    } catch (err) {
        console.error("Error de conexión al cargar gastos", err);
    }
}

function renderTablaGastos() {
    const tbody = document.querySelector("#tabla-gastos tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    gastosCache.forEach(g => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${g.fecha || ""}</td>
            <td>${g.categoria || ""}</td>
            <td>${g.descripcion || ""}</td>
            <td>$${g.valor != null ? g.valor.toLocaleString("es-CO") : "0"}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="eliminarGasto(${g.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function onSubmitGasto(e) {
    e.preventDefault();

    const fecha = document.getElementById("gasto-fecha").value;
    const categoria = document.getElementById("gasto-categoria").value.trim();
    const descripcion = document.getElementById("gasto-descripcion").value.trim();
    const valorNum = document.getElementById("gasto-valor").value;
    const valor = parseFloat(valorNum);

    if (!categoria || isNaN(valor)) {
        alert("Debes ingresar al menos categoría y valor.");
        return;
    }

    const payload = { fecha, categoria, descripcion, valor };

    try {
        const res = await fetch(API_GASTOS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            alert("Error al guardar el gasto.");
            return;
        }

        document.getElementById("form-gasto").reset();
        const hoy = new Date().toISOString().substring(0, 10);
        document.getElementById("gasto-fecha").value = hoy;

        await cargarGastos();
    } catch (err) {
        console.error("Error al guardar gasto", err);
        alert("Error de conexión con el servidor.");
    }
}

async function eliminarGasto(id) {
    if (!confirm("¿Seguro que deseas eliminar este gasto?")) return;

    try {
        const res = await fetch(`${API_GASTOS}/${id}`, {
            method: "DELETE"
        });

        if (!res.ok) {
            alert("Error al eliminar el gasto.");
            return;
        }

        await cargarGastos();
    } catch (err) {
        console.error("Error al eliminar gasto", err);
        alert("Error de conexión con el servidor.");
    }
}
