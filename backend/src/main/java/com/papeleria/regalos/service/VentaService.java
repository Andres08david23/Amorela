package com.papeleria.regalos.service;

import com.papeleria.regalos.model.DetalleVenta;
import com.papeleria.regalos.model.Venta;
import com.papeleria.regalos.repository.VentaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VentaService {

    private final VentaRepository ventaRepository;

    public VentaService(VentaRepository ventaRepository) {
        this.ventaRepository = ventaRepository;
    }

    // Obtener todas las ventas
    public List<Venta> getAll() {
        return ventaRepository.findAll();
    }

    // Obtener una venta por id
    public Venta getById(Long id) {
        return ventaRepository.findById(id).orElse(null);
    }

    // Crear venta (con detalles)
    public Venta add(Venta v) {
        // recalcular total por si el front no lo hace bien
        double total = 0.0;

        if (v.getDetalles() != null) {
            for (DetalleVenta d : v.getDetalles()) {
                d.setVenta(v); // vincular detalle -> venta

                Double precio = d.getPrecioUnitario() != null ? d.getPrecioUnitario() : 0.0;
                Integer cant = d.getCantidad() != null ? d.getCantidad() : 0;
                Double subtotal = d.getSubtotal();

                if (subtotal == null) {
                    subtotal = precio * cant;
                    d.setSubtotal(subtotal);
                }
                total += subtotal;
            }
        }

        v.setTotal(total);
        return ventaRepository.save(v);
    }

    // Actualizar venta (rara vez lo usarás, pero lo dejamos)
    public Venta update(Long id, Venta v) {
        return ventaRepository.findById(id)
                .map(existente -> {
                    existente.setFecha(v.getFecha());
                    existente.setCliente(v.getCliente());
                    existente.setMetodoPago(v.getMetodoPago());

                    // resetear detalles
                    existente.getDetalles().clear();

                    double total = 0.0;
                    if (v.getDetalles() != null) {
                        for (DetalleVenta d : v.getDetalles()) {
                            d.setVenta(existente);
                            Double precio = d.getPrecioUnitario() != null ? d.getPrecioUnitario() : 0.0;
                            Integer cant = d.getCantidad() != null ? d.getCantidad() : 0;
                            Double subtotal = d.getSubtotal();

                            if (subtotal == null) {
                                subtotal = precio * cant;
                                d.setSubtotal(subtotal);
                            }
                            total += subtotal;
                            existente.getDetalles().add(d);
                        }
                    }

                    existente.setTotal(total);
                    return ventaRepository.save(existente);
                })
                .orElse(null);
    }

    // Eliminar venta
    public void delete(Long id) {
        ventaRepository.deleteById(id);
    }
}
