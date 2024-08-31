package com.usersapp.back.repositories;


import com.usersapp.back.entities.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
}
