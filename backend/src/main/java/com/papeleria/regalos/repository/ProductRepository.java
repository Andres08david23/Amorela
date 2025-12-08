package com.papeleria.regalos.repository;

import com.papeleria.regalos.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
