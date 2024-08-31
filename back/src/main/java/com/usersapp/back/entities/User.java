package com.usersapp.back.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre de usuario es obligatorio")
    @Column(unique = true)
    private String username;

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 8, message = "Ingrese minimo 8 caracteres")
    private String password;

    @NotBlank(message = "El email es obligatorio")
    @Email(message = "Ingrese formato correcto, EJ: nombre@email.com")
    @Column(unique = true)
    private String email;

}
