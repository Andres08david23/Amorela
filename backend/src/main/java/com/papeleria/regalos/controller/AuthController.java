package com.papeleria.regalos.controller;

import com.papeleria.regalos.model.LoginRequest;
import com.papeleria.regalos.model.LoginResponse;
import com.papeleria.regalos.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = { "http://127.0.0.1:5500", "http://localhost:5500" })
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
