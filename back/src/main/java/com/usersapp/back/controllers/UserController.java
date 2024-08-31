package com.usersapp.back.controllers;

import com.usersapp.back.Services.UserService;
import com.usersapp.back.entities.User;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;


    private ResponseEntity<Map<String, String>> validar(BindingResult result) {
        Map<String, String> errores = result.getFieldErrors().stream()// Usamos el API de streams para recorrer los errores de validación y recolectarlos en un mapa.
                .collect(Collectors.toMap(// Collectors.toMap() se utiliza para construir el mapa, donde:

                        e -> e.getField(),  // Clave: nombre del campo
                        e -> e.getDefaultMessage() // Valor: mensaje de error
                ));
        result.getFieldErrors().forEach(e->{
            System.out.println(e);
        }); // Devolvemos una respuesta HTTP con un código 400 (Bad Request) y el mapa de errores en el cuerpo.
        return ResponseEntity.badRequest().body(errores);
    }

    @GetMapping
    public ResponseEntity<?> findAll(){
        try {
            List<User> usuarios = userService.findAll();// Intentamos obtener la lista de usuarios desde el servicio.
            return ResponseEntity.ok(usuarios);// Se devuelve un código 200 (OK) con la lista de usuarios.
        } catch (Exception e) {
            // En caso de una excepción, se retorna un código 500 (Internal Server Error) y un mensaje de error.
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al obtener la lista de usuarios: " + e.getMessage());
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<?>findById(@PathVariable Long id){
        // Se utiliza el método orElseThrow para manejar la presencia o ausencia del usuario.
        // Si el usuario no se encuentra, se lanza una excepción que será manejada automáticamente por Spring.
        User user = userService.findById(id);
        // Si el usuario se encuentra, se devuelve un código 200 (OK) con el usuario en el cuerpo de la respuesta.
        return ResponseEntity.ok(user);
    }


    @PostMapping
    public ResponseEntity<?>saveVendedor (@Valid @RequestBody User user, BindingResult result){
        if(result.hasErrors()){ // Si hay errores de validación, devolver un 400 Bad Request con los detalles.
            return  validar(result);
        } // Guardar el usuario y devolver un 201 Created con el usuario guardado.
        try {
            // Guardar el nuevo usuario y devolver la respuesta
            return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(user));
        } catch (IllegalArgumentException e) {
            // Manejar excepción de argumento ilegal
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<?>update(@Valid @RequestBody User usuario,BindingResult result,@PathVariable Long id){
        // Retorna errores de validación si los hay.
        if (result.hasErrors()) {
            return validar(result);
        }

        // Busca el usuario por ID; si no se encuentra, retorna 404 Not Found.
        User usuarioDb = userService.findById(id);

        // Actualiza el usuario con los nuevos datos.
        userService.update(usuario, usuarioDb);

        // Guarda el usuario actualizado y retorna 200 OK con el usuario actualizado.
        return ResponseEntity.ok(userService.save(usuarioDb));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?>delete(@PathVariable Long id) {
        try {
            // Si el usuario no existe, findById lanzará ResponseStatusException con 404.
            userService.findById(id);

            // Si findById no lanza una excepción, entonces procedemos a eliminar.
            userService.deleteById(id);

            return ResponseEntity.noContent().build();
        } catch (ResponseStatusException ex) {
            // Captura la excepción si el usuario no fue encontrado y retorna el estado adecuado.
            if (ex.getStatusCode() == HttpStatus.NOT_FOUND) {
                return ResponseEntity.notFound().build();
            }
            // Puedes manejar otras excepciones de respuesta aquí si es necesario.
            throw ex;
        }
    }


}
