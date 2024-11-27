package com.intissar.demo.restControllers;

import java.util.List;

import jakarta.jws.soap.SOAPBinding;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.intissar.demo.entities.User;
import com.intissar.demo.service.UserService;
import com.intissar.demo.service.register.RegistrationRequest;


@RestController
@CrossOrigin(origins = "*")
public class UserRestController {
	@Autowired
	UserService userService;

	@GetMapping("all")
	public List<User> getAllUsers() {
		return userService.findAllUsers();
	}

	@PostMapping("/register")
	public User registerUser(@RequestBody RegistrationRequest user) {
		return userService.registerUser(user);
	}
	@GetMapping("/verifyEmail/{token}")
	public User verifyEmail(@PathVariable("token") String token) {
		return userService.validateToken(token);
	}

//	@PutMapping("/edit/{id}")
//	public User editUser(@PathVariable("id") long id, @RequestBody User user) {
//		return userService.save(id, user);
//	}

}
