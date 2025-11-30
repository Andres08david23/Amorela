package com.papeleria.regalos.model;

public class Gasto {

    private Long id;
    private String fecha;
    private String categoria;
    private String descripcion;
    private double valor;

    public Gasto() {
    }

    public Gasto(Long id, String fecha, String categoria, String descripcion, double valor) {
        this.id = id;
        this.fecha = fecha;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.valor = valor;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFecha() { return fecha; }
    public void setFecha(String fecha) { this.fecha = fecha; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public double getValor() { return valor; }
    public void setValor(double valor) { this.valor = valor; }
}
