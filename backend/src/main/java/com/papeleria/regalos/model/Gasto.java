package com.papeleria.regalos.model;

import jakarta.persistence.*;

@Entity
@Table(name = "gastos")
public class Gasto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fecha;       // por simplicidad String (YYYY-MM-DD)
    private String categoria;
    private String descripcion;
    private Double valor;

    public Gasto() {
    }

    public Gasto(String fecha, String categoria, String descripcion, Double valor) {
        this.fecha = fecha;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.valor = valor;
    }

    // GETTERS y SETTERS

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }
}
