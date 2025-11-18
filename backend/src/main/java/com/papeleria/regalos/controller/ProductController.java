package com.papeleria.regalos.controller;

import com.papeleria.regalos.model.Product;
import com.papeleria.regalos.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5500") // o el puerto donde sirvas el frontend
@RestController
@RequestMapping("/api/productos")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    public List<Product> listar() {
        return service.getAll();
    }

    @PostMapping
    public Product crear(@RequestBody Product p) {
        return service.add(p);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.delete(id);
    }
}
