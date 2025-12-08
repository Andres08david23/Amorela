package com.papeleria.regalos.controller;

import com.papeleria.regalos.model.Product;
import com.papeleria.regalos.service.ProductService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = {
        "http://127.0.0.1:5500",
        "http://localhost:5500"
})
@RestController
@RequestMapping("/api/productos")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    // READ - listar todos
    @GetMapping
    public List<Product> listar() {
        return service.getAll();
    }

    // READ - obtener uno por id
    @GetMapping("/{id}")
    public Product obtenerUno(@PathVariable Long id) {
        return service.getById(id);
    }

    // CREATE - crear nuevo producto
    @PostMapping
    public Product crear(@RequestBody Product p) {
        return service.add(p);
    }

    // UPDATE - actualizar producto existente
    @PutMapping("/{id}")
    public Product actualizar(@PathVariable Long id, @RequestBody Product p) {
        return service.update(id, p);
    }

    // DELETE - eliminar producto
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.delete(id);
    }
}
