package com.examly.springapp;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataLoader(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        if (userRepository.findByEmail("admin@example.com") == null) {
            User defaultUser = new User();
            defaultUser.setEmail("admin@example.com");
            defaultUser.setPassword("admin123");

            userRepository.save(defaultUser);
            System.out.println("Default admin user created.");
        } else {
            System.out.println("Default admin user already exists.");
        }
    }
}
