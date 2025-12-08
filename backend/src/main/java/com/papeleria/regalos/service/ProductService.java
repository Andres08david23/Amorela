package com.papeleria.regalos.service;

import com.papeleria.regalos.model.Product;
import com.papeleria.regalos.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    // Inyección por constructor
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // READ - todos
    public List<Product> getAll() {
        return productRepository.findAll();
    }

    // READ - uno
    public Product getById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    // CREATE
    public Product add(Product p) {
        // por si viene con id desde el front, lo ignoramos y dejamos que la BD genere uno
        p.setId(null);
        if (p.getStock() == null) {
            p.setStock(0);
        }
        return productRepository.save(p);
    }

    // UPDATE
    public Product update(Long id, Product p) {
        return productRepository.findById(id)
                .map(existente -> {
                    existente.setNombre(p.getNombre());
                    existente.setPrecio(p.getPrecio());
                    existente.setStock(p.getStock());
                    return productRepository.save(existente);
                })
                .orElse(null);
    }

    // DELETE
    public void delete(Long id) {
        productRepository.deleteById(id);
    }
}
