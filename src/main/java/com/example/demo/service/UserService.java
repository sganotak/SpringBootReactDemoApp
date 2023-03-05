package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.model.UserDTO;

public interface UserService {
     UserDTO getUserById(Integer id);
     UserDTO updateUser(Integer id, UserDTO userDTO);
     User registerNewUser(UserDTO userDTO);
     void deleteUserById(Integer id);

     Iterable<UserDTO> getAllUsers();


}
