const API_VENTAS = "http://localhost:8080/api/ventas";
const API_CLIENTES = "http://localhost:8080/api/clientes";
// Si luego quieres usar gastos:
// const API_GASTOS = "http://localhost:8080/api/gastos";

document.addEventListener("DOMContentLoaded", () => {
    // Solo ejecutamos lógica de dashboard si estamos en inicio.html
    const ventasHoyEl = document.getElementById("ventas-hoy");
    const ventasMesEl = document.getElementById("ventas-mes");
    const clientesActivosEl = document.getElementById("clientes-activos");

    if (ventasHoyEl && ventasMesEl && clientesActivosEl) {
        cargarDashboard(ventasHoyEl, ventasMesEl, clientesActivosEl);
    }
});

async function cargarDashboard(ventasHoyEl, ventasMesEl, clientesActivosEl) {
    try {
        // Traer ventas y clientes al mismo tiempo
        const [resVentas, resClientes] = await Promise.all([
            fetch(API_VENTAS),
            fetch(API_CLIENTES)
        ]);

        if (!resVentas.ok || !resClientes.ok) {
            console.error("Error al cargar datos para el dashboard");
            return;
        }

        const ventas = await resVentas.json();
        const clientes = await resClientes.json();

        // Fecha de hoy y prefijo de mes actual (YYYY-MM)
        const hoy = new Date();
        const hoyStr = hoy.toISOString().substring(0, 10);      // "2025-11-30"
        const mesStr = hoyStr.substring(0, 7);                   // "2025-11"

        let totalHoy = 0;
        let totalMes = 0;

        ventas.forEach(v => {
            if (!v.fecha || v.total == null) return;

            // Asegurarnos que la fecha venga tipo "YYYY-MM-DD"
            const fecha = v.fecha.substring(0, 10);

            if (fecha === hoyStr) {
                totalHoy += v.total;
            }

            if (fecha.startsWith(mesStr)) {
                totalMes += v.total;
            }
        });

        // Clientes activos = total clientes registrados (por ahora)
        const clientesActivos = clientes.length;

        // Mostrar en pantalla
        ventasHoyEl.textContent = formatearPesos(totalHoy);
        ventasMesEl.textContent = formatearPesos(totalMes);
        clientesActivosEl.textContent = clientesActivos.toString();

    } catch (err) {
        console.error("Error al cargar dashboard", err);
    }
}

function formatearPesos(valor) {
    return "$" + valor.toLocaleString("es-CO", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}
