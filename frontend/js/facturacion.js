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

    let html = `
        <h4>Factura N° ${factura.id}</h4>
        <p><strong>Fecha:</strong> ${factura.fecha || "-"}</p>
        <p><strong>Cliente:</strong> ${factura.cliente || "Mostrador"}</p>
        <p><strong>Método de pago:</strong> ${factura.metodoPago || "N/A"}</p>
        <hr>
    `;

    if (factura.detalles && factura.detalles.length > 0) {
        html += `
            <h5>Detalle de productos</h5>
            <div class="table-responsive">
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio unitario</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        factura.detalles.forEach(d => {
            html += `
                <tr>
                    <td>${d.nombreProducto || ""}</td>
                    <td>${d.cantidad || 0}</td>
                    <td>$${d.precioUnitario != null ? d.precioUnitario.toLocaleString("es-CO") : "0"}</td>
                    <td>$${d.subtotal != null ? d.subtotal.toLocaleString("es-CO") : "0"}</td>
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
            </div>
        `;
    } else {
        html += `
            <p class="text-muted">Esta factura no tiene detalle de productos registrado (solo total).</p>
        `;
    }

    html += `
        <p class="mt-2"><strong>Total:</strong> $${factura.total != null ? factura.total.toLocaleString("es-CO") : "0"}</p>
    `;

    detalleDiv.innerHTML = html;
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
