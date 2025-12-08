package com.papeleria.regalos.repository;

import com.papeleria.regalos.model.Gasto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GastoRepository extends JpaRepository<Gasto, Long> {
}
