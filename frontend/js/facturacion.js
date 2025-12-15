const API_VENTAS = "http://localhost:8080/api/ventas";

let facturasCache = [];
let facturaSeleccionada = null; 


document.addEventListener("DOMContentLoaded", () => {
    cargarFacturas();

    const btnPdf = document.getElementById("btn-pdf");
    if (btnPdf) {
        btnPdf.addEventListener("click", descargarFacturaPDF);
    }
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
            <td class="solo-admin">
                <button class="btn btn-sm btn-primary" onclick="verFactura(${f.id})">Ver</button>
                <button class="btn btn-sm btn-danger ms-1 solo-admin" onclick="eliminarFactura(${f.id})">
                    Eliminar
                </button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

function verFactura(id) {
    const factura = facturasCache.find(f => f.id === id);
    const detalleDiv = document.getElementById("detalle-factura");

    if (!factura || !detalleDiv) return;

    // guardar selección + habilitar botón PDF
    facturaSeleccionada = factura;
    const btnPdf = document.getElementById("btn-pdf");
    if (btnPdf) btnPdf.disabled = false;

    let html = `
        <div class="invoice-card">
            <div class="invoice-header">
                <div class="invoice-brand">
                    <img src="img/logo.png" alt="Amorela" class="invoice-logo">
                    <div>
                        <p class="mb-0 fw-semibold">Amorela Papelería & Regalos</p>
                        <small class="text-muted">Sistema de facturación</small>
                    </div>
                </div>
                <div class="invoice-meta">
                    <div><strong>Factura N°</strong> ${factura.id}</div>
                    <div><strong>Fecha:</strong> ${factura.fecha || "-"}</div>
                </div>
            </div>

            <hr class="mb-3">

            <div class="invoice-client">
                <p class="invoice-section-title">Datos del cliente</p>
                <p class="mb-1"><strong>Nombre:</strong> ${factura.cliente || "Mostrador"}</p>
                <p class="mb-0"><strong>Método de pago:</strong> ${factura.metodoPago || "N/A"}</p>
            </div>
    `;

    if (factura.detalles && factura.detalles.length > 0) {
        html += `
            <div class="mb-3">
                <p class="invoice-section-title">Detalle de productos</p>
                <div class="table-responsive">
                    <table class="table table-sm invoice-products-table mb-2">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th class="text-center">Cantidad</th>
                                <th class="text-end">Precio unitario</th>
                                <th class="text-end">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
        `;

        factura.detalles.forEach(d => {
            html += `
                <tr>
                    <td>${d.nombreProducto || ""}</td>
                    <td class="text-center">${d.cantidad || 0}</td>
                    <td class="text-end">$${d.precioUnitario != null ? d.precioUnitario.toLocaleString("es-CO") : "0"}</td>
                    <td class="text-end">$${d.subtotal != null ? d.subtotal.toLocaleString("es-CO") : "0"}</td>
                </tr>
            `;
        });

        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    } else {
        html += `
            <p class="invoice-note mb-3">
                Esta factura no tiene detalle de productos registrado (solo total).
            </p>
        `;
    }

    html += `
            <div class="invoice-summary">
                <div class="invoice-summary-row">
                    <span class="invoice-summary-label">Total:</span>
                    <span class="invoice-total">$${factura.total != null ? factura.total.toLocaleString("es-CO") : "0"}</span>
                </div>
            </div>

            <p class="invoice-note mb-0">
                Gracias por tu compra. Este documento es generado por el sistema de gestión Amorela.
            </p>
        </div>
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

async function descargarFacturaPDF() {
    if (!facturaSeleccionada) {
        alert("Primero selecciona una factura.");
        return;
    }

    const detalleDiv = document.getElementById("detalle-factura");
    if (!detalleDiv) return;

    const { jsPDF } = window.jspdf;

    html2canvas(detalleDiv, {
        scale: 2,        
        useCORS: true
    }).then(canvas => {
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const margin = 5; // 👈 margen pequeñito
        let imgWidth = pageWidth - margin * 2;
        let imgHeight = canvas.height * imgWidth / canvas.width;

        // Si la imagen es más alta que la página, la ajustamos al alto
        if (imgHeight > pageHeight - margin * 2) {
            imgHeight = pageHeight - margin * 2;
            imgWidth = canvas.width * imgHeight / canvas.height;
        }

        // Centrar horizontalmente
        const x = (pageWidth - imgWidth) / 2;
        const y = margin;

        pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
        pdf.save(`factura_${facturaSeleccionada.id}.pdf`);
    }).catch(err => {
        console.error("Error al generar PDF", err);
        alert("Ocurrió un error al generar el PDF.");
    });
}

