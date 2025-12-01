package com.papeleria.regalos.service;

import com.papeleria.regalos.model.LoginRequest;
import com.papeleria.regalos.model.LoginResponse;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    // usuario -> contraseña
    private final Map<String, String> users = new HashMap<>();
    // usuario -> rol
    private final Map<String, String> roles = new HashMap<>();

    public AuthService() {
        // ADMIN
        users.put("admin", "1234");
        roles.put("admin", "ADMIN");

        // EMPLEADO
        users.put("empleado", "1234");
        roles.put("empleado", "EMPLEADO");
    }

    public LoginResponse login(LoginRequest request) {
        String username = request.getUsuario();
        String password = request.getContrasena();

        if (!users.containsKey(username)) {
            return new LoginResponse(false, "Usuario no encontrado", null, null);
        }

        String stored = users.get(username);
        if (!stored.equals(password)) {
            return new LoginResponse(false, "Contraseña incorrecta", null, null);
        }

        String role = roles.get(username);
        return new LoginResponse(true, "Login exitoso", username, role);
    }
}
