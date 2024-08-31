package com.usersapp.back.Services.ServicesImpl;

import com.usersapp.back.Services.UserService;
import com.usersapp.back.entities.User;
import com.usersapp.back.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public List<User> findAll() {
        return (List<User>) userRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Usuario con el id: " + id + " no existe"));
    }

    @Override
    public User update(User nuevo, User viejo) {

        viejo.setUsername(nuevo.getUsername());
        viejo.setUsername(nuevo.getUsername());
        viejo.setUsername(nuevo.getUsername());

        return viejo;
    }

    @Override
    @Transactional
    public User save(User user) {
        try {

            return userRepository.save(user);
        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException("Email o Nombre de usuario ya registrados en el sistema.");
        } catch (Exception e) {
            System.out.println("Error inesperado: " + e.getMessage());
            throw e;
        }
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }
}
