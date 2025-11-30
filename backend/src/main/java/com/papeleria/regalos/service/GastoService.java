package com.papeleria.regalos.service;

import com.papeleria.regalos.model.Gasto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class GastoService {

    private final List<Gasto> gastos = new ArrayList<>();
    private final AtomicLong sequence = new AtomicLong(1);

    public GastoService() {
        // Gastos de prueba
        gastos.add(new Gasto(sequence.getAndIncrement(), "2025-11-29", "Servicios", "Recibo de luz", 120000));
        gastos.add(new Gasto(sequence.getAndIncrement(), "2025-11-29", "Insumos", "Compra de papel y tinta", 80000));
    }

    public List<Gasto> getAll() {
        return gastos;
    }

    public Gasto getById(Long id) {
        Optional<Gasto> opt = gastos.stream()
                .filter(g -> g.getId().equals(id))
                .findFirst();
        return opt.orElse(null);
    }

    public Gasto add(Gasto g) {
        g.setId(sequence.getAndIncrement());
        gastos.add(g);
        return g;
    }

    public Gasto update(Long id, Gasto datos) {
        Gasto existing = getById(id);
        if (existing == null) {
            return null;
        }

        if (datos.getFecha() != null) {
            existing.setFecha(datos.getFecha());
        }
        existing.setCategoria(datos.getCategoria());
        existing.setDescripcion(datos.getDescripcion());
        existing.setValor(datos.getValor());

        return existing;
    }

    public boolean delete(Long id) {
        return gastos.removeIf(g -> g.getId().equals(id));
    }
}
