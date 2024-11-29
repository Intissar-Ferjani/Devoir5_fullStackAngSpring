package com.intissar.demo.service;

import java.util.List;


import com.intissar.demo.entities.Role;
import com.intissar.demo.entities.User;
import com.intissar.demo.register.RegistrationRequest;

public interface UserService {
	User saveUser(User user);
	User findUserByUsername (String username);
	Role addRole(Role role);
	User addRoleToUser(String username, String rolename);
	List<User> findAllUsers();
	User registerUser(RegistrationRequest request);
	public void sendEmailUser(User u, String code);
	public User validateToken(String code);

}
