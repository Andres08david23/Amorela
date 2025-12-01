const API_VENTAS = "http://localhost:8080/api/ventas";
const API_GASTOS = "http://localhost:8080/api/gastos";

document.addEventListener("DOMContentLoaded", () => {
    cargarReportes();
});

async function cargarReportes() {
    try {
        const [resVentas, resGastos] = await Promise.all([
            fetch(API_VENTAS),
            fetch(API_GASTOS)
        ]);

        if (!resVentas.ok || !resGastos.ok) {
            console.error("Error al cargar datos de reportes");
            return;
        }

        const ventas = await resVentas.json();
        const gastos = await resGastos.json();

        renderVentasPorMes(ventas);
        renderIngresosVsGastos(ventas, gastos);
        renderTopClientes(ventas);
        renderResumenGeneral(ventas, gastos);
    } catch (err) {
        console.error("Error de conexión en reportes", err);
    }
}

/* ========== UTILIDAD FORMATO PESOS ========== */

function formatearPesos(valor) {
    return "$" + valor.toLocaleString("es-CO", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

/* ========== REPORTE: VENTAS POR MES ========== */

function renderVentasPorMes(ventas) {
    const cont = document.getElementById("reporte-ventas-mes");
    if (!cont) return;

    // Agrupar por "YYYY-MM"
    const mapaMeses = {};

    ventas.forEach(v => {
        if (!v.fecha || v.total == null) return;
        const mes = v.fecha.substring(0, 7); // "2025-11"
        if (!mapaMeses[mes]) {
            mapaMeses[mes] = 0;
        }
        mapaMeses[mes] += v.total;
    });

    const claves = Object.keys(mapaMeses).sort();

    if (claves.length === 0) {
        cont.innerHTML = `<p class="text-muted mb-0">No hay ventas registradas todavía.</p>`;
        return;
    }

    let html = `
        <div class="table-responsive">
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th>Mes</th>
                        <th>Total vendido</th>
                    </tr>
                </thead>
                <tbody>
    `;

    claves.forEach(mes => {
        html += `
            <tr>
                <td>${mes}</td>
                <td>${formatearPesos(mapaMeses[mes])}</td>
            </tr>
        `;
    });

    html += `
                </tbody>
            </table>
        </div>
    `;

    cont.innerHTML = html;
}

/* ========== REPORTE: INGRESOS VS GASTOS (MES ACTUAL) ========== */

function renderIngresosVsGastos(ventas, gastos) {
    const cont = document.getElementById("reporte-ingresos-gastos");
    if (!cont) return;

    const hoy = new Date();
    const mesStr = hoy.toISOString().substring(0, 7); // "YYYY-MM"

    let ingresosMes = 0;
    let gastosMes = 0;

    ventas.forEach(v => {
        if (!v.fecha || v.total == null) return;
        const mes = v.fecha.substring(0, 7);
        if (mes === mesStr) {
            ingresosMes += v.total;
        }
    });

    gastos.forEach(g => {
        if (!g.fecha || g.valor == null) return;
        const mes = g.fecha.substring(0, 7);
        if (mes === mesStr) {
            gastosMes += g.valor;
        }
    });

    const utilidad = ingresosMes - gastosMes;

    cont.innerHTML = `
        <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between">
                <span>Ingresos del mes:</span>
                <strong>${formatearPesos(ingresosMes)}</strong>
            </li>
            <li class="list-group-item d-flex justify-content-between">
                <span>Gastos del mes:</span>
                <strong>${formatearPesos(gastosMes)}</strong>
            </li>
            <li class="list-group-item d-flex justify-content-between">
                <span>Utilidad del mes:</span>
                <strong class="${utilidad >= 0 ? 'text-success' : 'text-danger'}">
                    ${formatearPesos(utilidad)}
                </strong>
            </li>
        </ul>
        <p class="mt-2 text-muted mb-0">
            El cálculo se basa en las ventas y gastos registrados en el módulo Movimientos para el mes actual (${mesStr}).
        </p>
    `;
}

/* ========== REPORTE: TOP CLIENTES POR MONTO ========== */

function renderTopClientes(ventas) {
    const cont = document.getElementById("reporte-top-clientes");
    if (!cont) return;

    const mapaClientes = {};

    ventas.forEach(v => {
        if (!v.cliente || v.total == null) return;
        const nombre = v.cliente;
        if (!mapaClientes[nombre]) {
            mapaClientes[nombre] = 0;
        }
        mapaClientes[nombre] += v.total;
    });

    const lista = Object.entries(mapaClientes)
        .map(([cliente, total]) => ({ cliente, total }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 5); // top 5

    if (lista.length === 0) {
        cont.innerHTML = `<p class="text-muted mb-0">No hay ventas asociadas a clientes aún.</p>`;
        return;
    }

    let html = `
        <ol class="mb-0">
    `;
    lista.forEach(item => {
        html += `
            <li>
                ${item.cliente}: <strong>${formatearPesos(item.total)}</strong>
            </li>
        `;
    });
    html += `</ol>`;

    cont.innerHTML = html;
}

/* ========== REPORTE: RESUMEN GENERAL ========== */

function renderResumenGeneral(ventas, gastos) {
    const cont = document.getElementById("reporte-resumen-general");
    if (!cont) return;

    let totalIngresos = 0;
    let totalGastos = 0;

    ventas.forEach(v => {
        if (v.total != null) {
            totalIngresos += v.total;
        }
    });

    gastos.forEach(g => {
        if (g.valor != null) {
            totalGastos += g.valor;
        }
    });

    const utilidadTotal = totalIngresos - totalGastos;

    cont.innerHTML = `
        <div class="row">
            <div class="col-md-4">
                <p class="mb-1 text-muted">Total ingresos registrados</p>
                <p class="fs-5 fw-bold">${formatearPesos(totalIngresos)}</p>
            </div>
            <div class="col-md-4">
                <p class="mb-1 text-muted">Total gastos registrados</p>
                <p class="fs-5 fw-bold">${formatearPesos(totalGastos)}</p>
            </div>
            <div class="col-md-4">
                <p class="mb-1 text-muted">Utilidad acumulada</p>
                <p class="fs-5 fw-bold ${utilidadTotal >= 0 ? 'text-success' : 'text-danger'}">
                    ${formatearPesos(utilidadTotal)}
                </p>
            </div>
        </div>
        <p class="mt-2 text-muted mb-0">
            Este resumen se calcula con todas las ventas y gastos disponibles en el sistema.
        </p>
    `;
}
