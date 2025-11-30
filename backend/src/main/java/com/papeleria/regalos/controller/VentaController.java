package com.papeleria.regalos.controller;

import com.papeleria.regalos.model.Venta;
import com.papeleria.regalos.service.VentaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {
        "http://127.0.0.1:5500",
        "http://localhost:5500"
})
@RestController
@RequestMapping("/api/ventas")
public class VentaController {

    private final VentaService service;

    public VentaController(VentaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Venta> listar() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Venta obtenerUno(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public Venta crear(@RequestBody Venta v) {
        return service.add(v);
    }

    @PutMapping("/{id}")
    public Venta actualizar(@PathVariable Long id, @RequestBody Venta v) {
        return service.update(id, v);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.delete(id);
    }
}
