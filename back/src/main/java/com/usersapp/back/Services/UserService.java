package com.usersapp.back.Services;

import com.usersapp.back.entities.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<User> findAll();

    User findById(Long id);

    User update(User userNew, User userOld);

    User save(User user);

    void deleteById(Long id);
}
