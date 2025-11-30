package com.papeleria.regalos.service;

import com.papeleria.regalos.model.Venta;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class VentaService {

    private final List<Venta> ventas = new ArrayList<>();
    private final AtomicLong sequence = new AtomicLong(1);

    public VentaService() {
        // Ventas de prueba
        ventas.add(new Venta(sequence.getAndIncrement(), "2025-11-29", "Mostrador", 50000, "Efectivo"));
        ventas.add(new Venta(sequence.getAndIncrement(), "2025-11-29", "María Pérez", 30000, "Nequi"));
    }

    public List<Venta> getAll() {
        return ventas;
    }

    public Venta getById(Long id) {
        Optional<Venta> opt = ventas.stream()
                .filter(v -> v.getId().equals(id))
                .findFirst();
        return opt.orElse(null);
    }

    public Venta add(Venta v) {
        v.setId(sequence.getAndIncrement());
        if (v.getMetodoPago() == null || v.getMetodoPago().isBlank()) {
            v.setMetodoPago("N/A");
        }
        ventas.add(v);
        return v;
    }

    public Venta update(Long id, Venta datos) {
        Venta existing = getById(id);
        if (existing == null) {
            return null;
        }

        if (datos.getFecha() != null) {
            existing.setFecha(datos.getFecha());
        }
        existing.setCliente(datos.getCliente());
        existing.setTotal(datos.getTotal());
        existing.setMetodoPago(datos.getMetodoPago());

        return existing;
    }

    public boolean delete(Long id) {
        return ventas.removeIf(v -> v.getId().equals(id));
    }
}
