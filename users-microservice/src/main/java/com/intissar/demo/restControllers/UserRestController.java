package com.intissar.demo.restControllers;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.intissar.demo.entities.User;
import com.intissar.demo.register.RegistrationRequest;
import com.intissar.demo.service.UserService;

@RestController
@CrossOrigin(origins = "*")
public class UserRESTController {
    @Autowired
    UserService userService;

    @GetMapping("all")
    public List<User> getAllUsers() {
        return userService.findAllUsers();
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody RegistrationRequest request) {
        return userService.registerUser(request);
    }

    @GetMapping("/verifyEmail/{token}")
    public User verifyEmail(@PathVariable("token") String token) {
        return userService.validateToken(token);
    }
}
