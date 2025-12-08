package com.papeleria.regalos.repository;

import com.papeleria.regalos.model.Venta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VentaRepository extends JpaRepository<Venta, Long> {
}
