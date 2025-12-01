package com.papeleria.regalos.model;

import java.util.List;

public class Venta {

    private Long id;
    private String fecha;
    private String cliente;
    private double total;
    private String metodoPago;

    // NUEVO: lista de detalles
    private List<DetalleVenta> detalles;

    public Venta() {
    }

    public Venta(Long id, String fecha, String cliente, double total, String metodoPago) {
        this.id = id;
        this.fecha = fecha;
        this.cliente = cliente;
        this.total = total;
        this.metodoPago = metodoPago;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFecha() { return fecha; }
    public void setFecha(String fecha) { this.fecha = fecha; }

    public String getCliente() { return cliente; }
    public void setCliente(String cliente) { this.cliente = cliente; }

    public double getTotal() { return total; }
    public void setTotal(double total) { this.total = total; }

    public String getMetodoPago() { return metodoPago; }
    public void setMetodoPago(String metodoPago) { this.metodoPago = metodoPago; }

    public List<DetalleVenta> getDetalles() { return detalles; }
    public void setDetalles(List<DetalleVenta> detalles) { this.detalles = detalles; }
}
