package com.papeleria.regalos.service;

import com.papeleria.regalos.model.Cliente;
import com.papeleria.regalos.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    // Obtener todos los clientes
    public List<Cliente> getAll() {
        return clienteRepository.findAll();
    }

    // Obtener uno por id
    public Cliente getById(Long id) {
        return clienteRepository.findById(id).orElse(null);
    }

    // Crear cliente
    public Cliente add(Cliente c) {
        c.setId(null); // que la BD genere el id
        return clienteRepository.save(c);
    }

    // Actualizar cliente
    public Cliente update(Long id, Cliente c) {
        return clienteRepository.findById(id)
                .map(existente -> {
                    existente.setNombre(c.getNombre());
                    existente.setTelefono(c.getTelefono());
                    existente.setEmail(c.getEmail());
                    existente.setDireccion(c.getDireccion());
                    existente.setTipo(c.getTipo());
                    return clienteRepository.save(existente);
                })
                .orElse(null);
    }

    // Eliminar cliente
    public void delete(Long id) {
        clienteRepository.deleteById(id);
    }
}
