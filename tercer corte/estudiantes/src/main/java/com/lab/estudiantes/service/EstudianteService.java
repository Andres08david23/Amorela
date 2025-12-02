package com.lab.estudiantes.service;

import com.lab.estudiantes.model.Estudiante;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EstudianteService {

    private List<Estudiante> estudiantes = new ArrayList<>();

    public EstudianteService() {
        estudiantes.add(new Estudiante(1, "Juan", 20));
        estudiantes.add(new Estudiante(2, "María", 22));
    }

    public List<Estudiante> listar() {
        return estudiantes;
    }

    public Estudiante buscarPorId(int id) {
        return estudiantes.stream()
                .filter(e -> e.getId() == id)
                .findFirst()
                .orElse(null);
    }

    public Estudiante crear(Estudiante e) {
        estudiantes.add(e);
        return e;
    }

    public Estudiante actualizar(int id, Estudiante datos) {
        Estudiante est = buscarPorId(id);
        if (est != null) {
            est.setNombre(datos.getNombre());
            est.setEdad(datos.getEdad());
        }
        return est;
    }

    public boolean eliminar(int id) {
        return estudiantes.removeIf(e -> e.getId() == id);
    }
}
