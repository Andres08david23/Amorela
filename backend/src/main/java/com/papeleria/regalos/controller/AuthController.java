package com.papeleria.regalos.controller;

import com.papeleria.regalos.model.LoginRequest;
import com.papeleria.regalos.model.LoginResponse;
import com.papeleria.regalos.service.AuthService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {
        "http://127.0.0.1:5500",
        "http://localhost:5500"
})
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        System.out.println(">>> Petición de login de: " + request.getUsername());
        return authService.login(request);
    }
}
