
package ejercicio;


public class vendedor {

    private String documento;
    private int tipoVendedor;
    private double valorVenta;

    public vendedor(String documento, int tipoVendedor, double valorVenta) {
        this.documento = documento;
        this.tipoVendedor = tipoVendedor;
        this.valorVenta = valorVenta;
    }

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public int getTipoVendedor() {
        return tipoVendedor;
    }

    public void setTipoVendedor(int tipoVendedor) {
        this.tipoVendedor = tipoVendedor;
    }

    public double getValorVenta() {
        return valorVenta;
    }

    public void setValorVenta(double valorVenta) {
        this.valorVenta = valorVenta;
    }

    public double calcularComision() {

        return switch (tipoVendedor) {
            case 1 ->
                valorVenta * 0.25;
            case 2 ->
                valorVenta * 0.20;
            default ->
                0;
        };

    }
}
