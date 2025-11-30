package com.papeleria.regalos.service;

import com.papeleria.regalos.model.Cliente;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class ClienteService {

    private final List<Cliente> clientes = new ArrayList<>();
    private final AtomicLong sequence = new AtomicLong(1);

    public ClienteService() {
        // Clientes de prueba
        clientes.add(new Cliente(sequence.getAndIncrement(), "María Pérez", "3001234567",
                "maria@example.com", "Cúcuta", "Frecuente"));
        clientes.add(new Cliente(sequence.getAndIncrement(), "Juan Gómez", "3019876543",
                "juan@example.com", "Villa del Rosario", "Ocasional"));
    }

    public List<Cliente> getAll() {
        return clientes;
    }

    public Cliente getById(Long id) {
        Optional<Cliente> opt = clientes.stream()
                .filter(c -> c.getId().equals(id))
                .findFirst();
        return opt.orElse(null);
    }

    public Cliente add(Cliente c) {
        c.setId(sequence.getAndIncrement());
        clientes.add(c);
        return c;
    }

    public Cliente update(Long id, Cliente datos) {
        Cliente existing = getById(id);
        if (existing == null) {
            return null;
        }

        if (datos.getNombre() != null) {
            existing.setNombre(datos.getNombre());
        }
        existing.setTelefono(datos.getTelefono());
        existing.setEmail(datos.getEmail());
        existing.setDireccion(datos.getDireccion());
        existing.setTipo(datos.getTipo());

        return existing;
    }

    public boolean delete(Long id) {
        return clientes.removeIf(c -> c.getId().equals(id));
    }
}
