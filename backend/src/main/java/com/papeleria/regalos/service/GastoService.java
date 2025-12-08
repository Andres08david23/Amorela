package com.papeleria.regalos.service;

import com.papeleria.regalos.model.Gasto;
import com.papeleria.regalos.repository.GastoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GastoService {

    private final GastoRepository gastoRepository;

    public GastoService(GastoRepository gastoRepository) {
        this.gastoRepository = gastoRepository;
    }

    // Obtener todos los gastos
    public List<Gasto> getAll() {
        return gastoRepository.findAll();
    }

    // Obtener uno por id
    public Gasto getById(Long id) {
        return gastoRepository.findById(id).orElse(null);
    }

    // Crear gasto
    public Gasto add(Gasto g) {
        g.setId(null); // que la BD genere id
        return gastoRepository.save(g);
    }

    // Actualizar gasto
    public Gasto update(Long id, Gasto g) {
        return gastoRepository.findById(id)
                .map(existente -> {
                    existente.setFecha(g.getFecha());
                    existente.setCategoria(g.getCategoria());
                    existente.setDescripcion(g.getDescripcion());
                    existente.setValor(g.getValor());
                    return gastoRepository.save(existente);
                })
                .orElse(null);
    }

    // Eliminar gasto
    public void delete(Long id) {
        gastoRepository.deleteById(id);
    }
}
