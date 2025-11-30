package com.papeleria.regalos.service;

import com.papeleria.regalos.model.Product;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class ProductService {

    private final List<Product> productos = new ArrayList<>();
    private final AtomicLong sequence = new AtomicLong(1);

    public ProductService() {
        // Productos de prueba en memoria
        productos.add(new Product(sequence.getAndIncrement(), "Cuaderno grande", 8000, 20));
        productos.add(new Product(sequence.getAndIncrement(), "Lapicero azul", 1500, 100));
        productos.add(new Product(sequence.getAndIncrement(), "Peluche oso", 25000, 10));
    }

    public List<Product> getAll() {
        return productos;
    }

    public Product getById(Long id) {
        Optional<Product> opt = productos.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst();
        return opt.orElse(null);
    }

    public Product add(Product p) {
        p.setId(sequence.getAndIncrement());
        if (p.getStock() == null) {
            p.setStock(0);
        }
        productos.add(p);
        return p;
    }

    public Product update(Long id, Product datos) {
        Product existing = getById(id);
        if (existing == null) {
            return null;
        }
        if (datos.getNombre() != null) {
            existing.setNombre(datos.getNombre());
        }
        existing.setPrecio(datos.getPrecio());
        existing.setStock(datos.getStock());
        return existing;
    }

    public boolean delete(Long id) {
        return productos.removeIf(p -> p.getId().equals(id));
    }
}
