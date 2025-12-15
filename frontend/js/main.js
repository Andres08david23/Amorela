const API_VENTAS = "http://localhost:8080/api/ventas";
const API_CLIENTES = "http://localhost:8080/api/clientes";
const API_PRODUCTOS = "http://localhost:8080/api/productos";

document.addEventListener("DOMContentLoaded", () => {
    const ventasHoyEl = document.getElementById("ventas-hoy");
    const ventasMesEl = document.getElementById("ventas-mes");
    const clientesActivosEl = document.getElementById("clientes-activos");
    const productosTotalEl = document.getElementById("productos-total");

    // si estamos en inicio.html, estos elementos existen
    if (ventasHoyEl && ventasMesEl && clientesActivosEl && productosTotalEl) {
        cargarDashboard();
    }
});

async function cargarDashboard() {
    try {
        const [resVentas, resClientes, resProductos] = await Promise.all([
            fetch(API_VENTAS),
            fetch(API_CLIENTES),
            fetch(API_PRODUCTOS)
        ]);

        if (!resVentas.ok || !resClientes.ok || !resProductos.ok) {
            console.error("Error al cargar datos para el dashboard");
            return;
        }

        const ventas = await resVentas.json();
        const clientes = await resClientes.json();
        const productos = await resProductos.json();

        actualizarCardsPrincipales(ventas, clientes, productos);
        actualizarUltimasVentas(ventas);
        actualizarResumenRapido(ventas);
    } catch (err) {
        console.error("Error de conexión en dashboard", err);
    }
}

/* ===================== CARDS PRINCIPALES ===================== */

function actualizarCardsPrincipales(ventas, clientes, productos) {
    const hoy = new Date();
    const hoyStr = hoy.toISOString().substring(0, 10); // "YYYY-MM-DD"
    const mesStr = hoyStr.substring(0, 7);             // "YYYY-MM"

    let totalHoy = 0;
    let totalMes = 0;

    ventas.forEach(v => {
        if (!v.fecha || v.total == null) return;

        const fecha = v.fecha.substring(0, 10);

        if (fecha === hoyStr) {
            totalHoy += v.total;
        }
        if (fecha.startsWith(mesStr)) {
            totalMes += v.total;
        }
    });

    const ventasHoyEl = document.getElementById("ventas-hoy");
    const ventasMesEl = document.getElementById("ventas-mes");
    const clientesActivosEl = document.getElementById("clientes-activos");
    const productosTotalEl = document.getElementById("productos-total");

    if (ventasHoyEl) ventasHoyEl.textContent = formatearPesos(totalHoy);
    if (ventasMesEl) ventasMesEl.textContent = formatearPesos(totalMes);
    if (clientesActivosEl) clientesActivosEl.textContent = clientes.length.toString();
    if (productosTotalEl) productosTotalEl.textContent = productos.length.toString();
}

/* ===================== ÚLTIMAS VENTAS ===================== */

function actualizarUltimasVentas(ventas) {
    const tbody = document.getElementById("tabla-ultimas-ventas");
    if (!tbody) return;

    tbody.innerHTML = "";

    if (!ventas || ventas.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center text-muted">No hay ventas registradas todavía.</td>
            </tr>
        `;
        return;
    }

    // ordenamos por fecha (y por id) descendente
    const ordenadas = [...ventas].sort((a, b) => {
        const fa = (a.fecha || "").localeCompare(b.fecha || "");
        if (fa === 0) {
            return (b.id || 0) - (a.id || 0);
        }
        return fa * -1;
    });

    const ultimas = ordenadas.slice(0, 3);

    ultimas.forEach(v => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${v.cliente || "Mostrador"}</td>
            <td>${v.fecha || ""}</td>
            <td>${v.metodoPago || "N/A"}</td>
            <td class="text-end">$${v.total != null ? v.total.toLocaleString("es-CO") : "0"}</td>
        `;
        tbody.appendChild(tr);
    });
}

/* ===================== RESUMEN RÁPIDO ===================== */

/* ===================== RESUMEN RÁPIDO ===================== */

function actualizarResumenRapido(ventas) {
    const statPromedio = document.getElementById("stat-promedio");
    const statClienteFrecuente = document.getElementById("stat-cliente-frecuente");
    const statProductoMasVendido = document.getElementById("stat-producto-mas-vendido");
    const statPedidosTotales = document.getElementById("stat-pedidos-totales");

    if (!ventas || ventas.length === 0) {
        if (statPromedio) statPromedio.textContent = "$0";
        if (statClienteFrecuente) statClienteFrecuente.textContent = "—";
        if (statProductoMasVendido) statProductoMasVendido.textContent = "—";
        if (statPedidosTotales) statPedidosTotales.textContent = "0";
        return;
    }

    // 1. Promedio por venta
    let totalIngresos = 0;
    ventas.forEach(v => {
        if (v.total != null) {
            totalIngresos += v.total;
        }
    });
    const promedio = totalIngresos / ventas.length;
    if (statPromedio) statPromedio.textContent = formatearPesos(promedio);

    // 2. Producto más vendido (usando DetalleVenta)
    const mapaProductos = {};
    ventas.forEach(v => {
        if (!v.detalles || v.detalles.length === 0) return;
        v.detalles.forEach(d => {
            if (!d.nombreProducto || d.cantidad == null) return;
            if (!mapaProductos[d.nombreProducto]) {
                mapaProductos[d.nombreProducto] = 0;
            }
            mapaProductos[d.nombreProducto] += d.cantidad;
        });
    });

    let productoMasVendido = "—";
    let maxCantidadProd = 0;
    Object.entries(mapaProductos).forEach(([nombre, cant]) => {
        if (cant > maxCantidadProd) {
            maxCantidadProd = cant;
            productoMasVendido = nombre;
        }
    });
    if (statProductoMasVendido) statProductoMasVendido.textContent = productoMasVendido;

    // 3. Cliente más frecuente (por cantidad de ventas)
    const mapaClientes = {};
    ventas.forEach(v => {
        const nombre = v.cliente || "Mostrador";
        if (!mapaClientes[nombre]) {
            mapaClientes[nombre] = 0;
        }
        mapaClientes[nombre] += 1;
    });

    let clienteFrecuente = "—";
    let maxVentasCliente = 0;
    Object.entries(mapaClientes).forEach(([nombre, cant]) => {
        if (cant > maxVentasCliente) {
            maxVentasCliente = cant;
            clienteFrecuente = nombre;
        }
    });
    if (statClienteFrecuente) statClienteFrecuente.textContent = clienteFrecuente;

    // 4. Pedidos realizados en total (número de ventas)
    if (statPedidosTotales) {
        statPedidosTotales.textContent = ventas.length.toString();
    }
}
/* ===================== UTIL ===================== */

function formatearPesos(valor) {
    if (isNaN(valor)) return "$0";
    return "$" + valor.toLocaleString("es-CO", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}
