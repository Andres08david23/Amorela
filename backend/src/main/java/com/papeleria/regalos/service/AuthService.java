package com.papeleria.regalos.service;

import com.papeleria.regalos.model.LoginRequest;
import com.papeleria.regalos.model.LoginResponse;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    // usuarios en memoria: usuario -> contraseña
    private final Map<String, String> users = new HashMap<>();

    // roles en memoria: usuario -> rol
    private final Map<String, String> roles = new HashMap<>();

    public AuthService() {
        // usuarios de prueba
        users.put("admin", "1234");
        roles.put("admin", "ADMIN");

        users.put("cliente", "1234");
        roles.put("cliente", "USER");
    }

    public LoginResponse login(LoginRequest req) {
        String storedPassword = users.get(req.getUsername());

        if (storedPassword == null) {
            return new LoginResponse(false, null, "Usuario no existe");
        }

        if (!storedPassword.equals(req.getPassword())) {
            return new LoginResponse(false, null, "Contraseña incorrecta");
        }

        String role = roles.get(req.getUsername());
        return new LoginResponse(true, role, "Inicio de sesión correcto");
    }
}
