package com.lab.estudiantes.controller;

import com.lab.estudiantes.model.Estudiante;
import com.lab.estudiantes.service.EstudianteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/estudiantes")
public class EstudianteController {

    private final EstudianteService service;

    public EstudianteController(EstudianteService service) {
        this.service = service;
    }

    // LISTAR TODOS
    @GetMapping
    public List<Estudiante> listar() {
        return service.listar();
    }

    // BUSCAR POR ID
    @GetMapping("/{id}")
    public Estudiante buscar(@PathVariable("id") int id) {
        return service.buscarPorId(id);
    }

    // CREAR
    @PostMapping
    public Estudiante crear(@RequestBody Estudiante e) {
        return service.crear(e);
    }

    // ACTUALIZAR
    @PutMapping("/{id}")
    public Estudiante actualizar(@PathVariable("id") int id,
                                 @RequestBody Estudiante e) {
        return service.actualizar(id, e);
    }

    // ELIMINAR
    @DeleteMapping("/{id}")
    public String eliminar(@PathVariable("id") int id) {
        boolean eliminado = service.eliminar(id);
        return eliminado ? "Eliminado" : "No encontrado";
    }
}
