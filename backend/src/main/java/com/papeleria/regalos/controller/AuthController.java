package com.papeleria.regalos.controller;

import com.papeleria.regalos.model.LoginRequest;
import com.papeleria.regalos.model.LoginResponse;
import com.papeleria.regalos.service.AuthService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5500") // cambia el puerto según tu Live Server
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
