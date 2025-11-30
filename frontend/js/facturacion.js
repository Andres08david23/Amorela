const API_VENTAS = "http://localhost:8080/api/ventas";

let facturasCache = [];

document.addEventListener("DOMContentLoaded", () => {
    cargarFacturas();
});

async function cargarFacturas() {
    try {
        const res = await fetch(API_VENTAS);
        if (!res.ok) {
            console.error("Error al cargar facturas (ventas)");
            return;
        }

        facturasCache = await res.json();
        renderTablaFacturas();
    } catch (err) {
        console.error("Error de conexión al cargar facturas", err);
    }
}

function renderTablaFacturas() {
    const tbody = document.querySelector("#tabla-facturas tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    facturasCache.forEach(f => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${f.id}</td>
            <td>${f.fecha || ""}</td>
            <td>${f.cliente || "Mostrador"}</td>
            <td>$${f.total != null ? f.total.toLocaleString("es-CO") : "0"}</td>
            <td>${f.metodoPago || "N/A"}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="verFactura(${f.id})">Ver</button>
                <button class="btn btn-sm btn-danger ms-1" onclick="eliminarFactura(${f.id})">Eliminar</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

function verFactura(id) {
    const factura = facturasCache.find(f => f.id === id);
    const detalleDiv = document.getElementById("detalle-factura");

    if (!factura || !detalleDiv) return;

    detalleDiv.innerHTML = `
        <h4>Factura N° ${factura.id}</h4>
        <p><strong>Fecha:</strong> ${factura.fecha || "-"}</p>
        <p><strong>Cliente:</strong> ${factura.cliente || "Mostrador"}</p>
        <p><strong>Método de pago:</strong> ${factura.metodoPago || "N/A"}</p>
        <hr>
        <p><strong>Total:</strong> $${factura.total != null ? factura.total.toLocaleString("es-CO") : "0"}</p>
        <p class="text-muted mb-0">
            Nota: en esta versión del sistema, la factura muestra el total de la venta registrada en Movimientos.
            Si el proyecto evoluciona, aquí podrías mostrar el detalle por producto (DetalleVenta).
        </p>
    `;
}

async function eliminarFactura(id) {
    if (!confirm("¿Seguro que deseas eliminar esta factura (venta)?")) return;

    try {
        const res = await fetch(`${API_VENTAS}/${id}`, {
            method: "DELETE"
        });

        if (!res.ok) {
            alert("Error al eliminar la factura.");
            return;
        }

        await cargarFacturas();
        const detalleDiv = document.getElementById("detalle-factura");
        if (detalleDiv) {
            detalleDiv.innerHTML = `
                <p class="text-muted mb-0">Selecciona una factura para ver el detalle.</p>
            `;
        }
    } catch (err) {
        console.error("Error al eliminar factura", err);
        alert("Error de conexión con el servidor.");
    }
}
