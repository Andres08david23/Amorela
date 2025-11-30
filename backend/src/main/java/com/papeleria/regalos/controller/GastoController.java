package com.papeleria.regalos.controller;

import com.papeleria.regalos.model.Gasto;
import com.papeleria.regalos.service.GastoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {
        "http://127.0.0.1:5500",
        "http://localhost:5500"
})
@RestController
@RequestMapping("/api/gastos")
public class GastoController {

    private final GastoService service;

    public GastoController(GastoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Gasto> listar() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Gasto obtenerUno(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public Gasto crear(@RequestBody Gasto g) {
        return service.add(g);
    }

    @PutMapping("/{id}")
    public Gasto actualizar(@PathVariable Long id, @RequestBody Gasto g) {
        return service.update(id, g);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.delete(id);
    }
}
