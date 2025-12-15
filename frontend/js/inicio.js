// js/inicio.js

// Usamos nombres distintos para evitar choque con main.js
const API_VENTAS_DASH = "http://localhost:8080/api/ventas";
const API_PRODUCTOS_DASH = "http://localhost:8080/api/productos";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        // ==== 1) Traer datos básicos de ventas (para tarjetas y tabla) ====
        const respVentas = await fetch(API_VENTAS_DASH);
        const ventas = await respVentas.json();

        // Ordenar por fecha descendente
        ventas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        // --- Ventas del día y del mes ---
        const hoy = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
        const mesActual = hoy.slice(0, 7); // YYYY-MM

        let sumaHoy = 0;
        let sumaMes = 0;
        ventas.forEach(v => {
            if (v.fecha === hoy) {
                sumaHoy += v.total || 0;
            }
            if (v.fecha.startsWith(mesActual)) {
                sumaMes += v.total || 0;
            }
        });

        const formato = (n) =>
            `$${n.toLocaleString("es-CO", { minimumFractionDigits: 0 })}`;

        document.getElementById("ventas-hoy").textContent = formato(sumaHoy);
        document.getElementById("ventas-mes").textContent = formato(sumaMes);

        // Promedio por venta (para resumen rápido)
        const promedio = ventas.length > 0 ? sumaMes / ventas.length : 0;
        const statProm = document.getElementById("stat-promedio");
        if (statProm) statProm.textContent = formato(Math.round(promedio));

        // Producto más vendido y mejor categoría los llenaremos más abajo

        // ==== 2) Gráfico de barras: ventas por mes (últimos 6) ====
        const ventasPorMes = {}; // { '2025-12': total }

        ventas.forEach(v => {
            const mes = v.fecha.slice(0, 7); // YYYY-MM
            if (!ventasPorMes[mes]) ventasPorMes[mes] = 0;
            ventasPorMes[mes] += v.total || 0;
        });

        let meses = Object.keys(ventasPorMes).sort(); // orden cronológico
        // Nos quedamos con los últimos 6
        meses = meses.slice(-6);

        const datosBarras = meses.map(m => ventasPorMes[m]);

        // Etiquetas bonitas tipo "Dic 2025"
        const nombreMes = (yyyyMm) => {
            const [y, m] = yyyyMm.split("-");
            const fecha = new Date(Number(y), Number(m) - 1, 1);
            return fecha.toLocaleDateString("es-CO", { month: "short", year: "numeric" });
        };
        const etiquetasMeses = meses.map(nombreMes);

        const ctxBar = document.getElementById("chart-ventas-mes").getContext("2d");
        new Chart(ctxBar, {
            type: "bar",
            data: {
                labels: etiquetasMeses,
                datasets: [{
                    label: "Ventas totales",
                    data: datosBarras,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => "$" + value.toLocaleString("es-CO")
                        }
                    }
                }
            }
        });

        // ==== 3) Gráfico de pastel: distribución por método de pago ====
        const ventasPorMetodo = {}; // { 'Efectivo': total, 'Nequi': total, ... }

        ventas.forEach(v => {
            const metodo = v.metodoPago || "Sin método";
            if (!ventasPorMetodo[metodo]) ventasPorMetodo[metodo] = 0;
            ventasPorMetodo[metodo] += v.total || 0;
        });

        const metodos = Object.keys(ventasPorMetodo);
        const totalesMet = metodos.map(m => ventasPorMetodo[m]);

        const canvasPie = document.getElementById("chart-ventas-categoria");
        if (canvasPie) {
            const ctxPie = canvasPie.getContext("2d");
            new Chart(ctxPie, {
                type: "pie",
                data: {
                    labels: metodos,
                    datasets: [{
                        data: totalesMet,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
        // Mejor categoría (la de mayor total)
        const statCat = document.getElementById("stat-mejor-categoria");
        if (statCat && categorias.length > 0) {
            let iMax = 0;
            for (let i = 1; i < categorias.length; i++) {
                if (totalesCat[i] > totalesCat[iMax]) iMax = i;
            }
            statCat.textContent = categorias[iMax];
        }

        // ==== 4) Últimas ventas (tabla) ====
        const tbody = document.getElementById("tabla-ultimas-ventas");
        if (tbody) {
            tbody.innerHTML = "";
            ventas.slice(0, 3).forEach(v => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${v.cliente}</td>
                    <td>${v.fecha}</td>
                    <td>${v.metodoPago}</td>
                    <td class="text-end">${formato(v.total || 0)}</td>
                `;
                tbody.appendChild(tr);
            });
        }

        // Producto más vendido (por cantidad, si tienes detalles)
        const statProd = document.getElementById("stat-producto-mas-vendido");
        if (statProd && ventas.length > 0) {
            const cantidadesPorProducto = {}; // { idProd: totalCantidad }

            ventas.forEach(v => {
                if (v.detalles && Array.isArray(v.detalles)) {
                    v.detalles.forEach(det => {
                        const idProd = det.productoId;
                        if (!cantidadesPorProducto[idProd]) cantidadesPorProducto[idProd] = 0;
                        cantidadesPorProducto[idProd] += det.cantidad || 0;
                    });
                }
            });

            const idsProd = Object.keys(cantidadesPorProducto);
            if (idsProd.length > 0) {
                let idMax = idsProd[0];
                idsProd.forEach(id => {
                    if (cantidadesPorProducto[id] > cantidadesPorProducto[idMax]) {
                        idMax = id;
                    }
                });
                const info = mapaProductos[idMax];
                statProd.textContent = info ? info.nombre : "—";
            }
        }

    } catch (err) {
        console.error("Error cargando dashboard:", err);
    }
});
