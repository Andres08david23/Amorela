/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package tiposCuentas;

/**
 *
 * @author USUARIO
 */
// la calse cliente
class Cliente {
    private long documentoIdentidad;   //los datos que pide la guia 
    private String nombre;
    private String correoElectronico;
    private int numeroCelular;
    private String direccion;

    //el constructor de la clase cliente 
    public Cliente(long documentoIdentidad, String nombre, String correoElectronico, int numeroCelular, String direccion) { 
        this.documentoIdentidad = documentoIdentidad;
        this.nombre = nombre;
        this.correoElectronico = correoElectronico;
        this.numeroCelular = numeroCelular;
        this.direccion = direccion;
    }

    // Getters obtener valores 
    public long getDocumentoIdentidad() {
        return documentoIdentidad;
    }

    public String getNombre() {
        return nombre;
    }

    public String getCorreoElectronico() {
        return correoElectronico;
    }

    public int getNumeroCelular() {
        return numeroCelular;
    }

    public String getDireccion() {
        return direccion;
    }
}

