package com.papeleria.regalos.service;

import com.papeleria.regalos.model.Product;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class ProductService {

    private final List<Product> productos = new ArrayList<>();
    private final AtomicLong sequence = new AtomicLong(1);

    public ProductService() {
        // Datos de ejemplo en memoria
        productos.add(new Product(sequence.getAndIncrement(), "Cuaderno grande", 8000));
        productos.add(new Product(sequence.getAndIncrement(), "Lapicero azul", 1500));
        productos.add(new Product(sequence.getAndIncrement(), "Peluche oso", 25000));
    }

    public List<Product> getAll() {
        return productos;
    }

    public Product add(Product p) {
        p.setId(sequence.getAndIncrement());
        productos.add(p);
        return p;
    }

    public void delete(Long id) {
        productos.removeIf(p -> p.getId().equals(id));
    }
}
