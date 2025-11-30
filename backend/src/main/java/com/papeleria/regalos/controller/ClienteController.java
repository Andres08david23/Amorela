package com.papeleria.regalos.controller;

import com.papeleria.regalos.model.Cliente;
import com.papeleria.regalos.service.ClienteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {
        "http://127.0.0.1:5500",
        "http://localhost:5500"
})
@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteService service;

    public ClienteController(ClienteService service) {
        this.service = service;
    }

    // READ - listar todos
    @GetMapping
    public List<Cliente> listar() {
        return service.getAll();
    }

    // READ - obtener uno por id
    @GetMapping("/{id}")
    public Cliente obtenerUno(@PathVariable Long id) {
        return service.getById(id);
    }

    // CREATE - crear nuevo cliente
    @PostMapping
    public Cliente crear(@RequestBody Cliente c) {
        return service.add(c);
    }

    // UPDATE - actualizar cliente existente
    @PutMapping("/{id}")
    public Cliente actualizar(@PathVariable Long id, @RequestBody Cliente c) {
        return service.update(id, c);
    }

    // DELETE - eliminar cliente
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.delete(id);
    }
}
