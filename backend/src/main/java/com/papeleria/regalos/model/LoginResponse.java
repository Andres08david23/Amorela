package com.papeleria.regalos.model;

public class LoginResponse {

    private boolean ok;
    private String role;      // "ADMIN" o "USER"
    private String message;

    public LoginResponse() {
    }

    public LoginResponse(boolean ok, String role, String message) {
        this.ok = ok;
        this.role = role;
        this.message = message;
    }

    public boolean isOk() { return ok; }
    public void setOk(boolean ok) { this.ok = ok; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
