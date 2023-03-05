package com.example.demo.service;

import com.example.demo.exception.UserNotFoundException;
import com.example.demo.model.Address;
import com.example.demo.model.User;
import com.example.demo.model.UserDTO;
import com.example.demo.repository.AddressRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import com.example.demo.repository.UserRepository;

import javax.validation.Valid;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {



    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private ModelMapper modelMapper;

    private UserDTO convertEntityToDTO(User user){
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD);
        UserDTO userDTO=new UserDTO();
        userDTO= modelMapper.map(user, UserDTO.class);
        return userDTO;
    }

    private User convertDTOToEntity(UserDTO userDTO){
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD);
        User user = new User();
        user = modelMapper.map(userDTO, User.class);
        return user;
    }

    private void setAddressIfExistsOrSave(Address address, User user,String addressType) {
        Address existingAddress = addressRepository.findByCityAndStreetAndZipcode(
                address.getCity(),
                address.getStreet(),
                address.getZipcode()
        );

        if (existingAddress != null) {
            if (addressType.equals("home")) {
                user.setHomeAddress(existingAddress);
            } else if (addressType.equals("work")) {
                user.setWorkAddress(existingAddress);
            }
        } else {
            addressRepository.save(address);
            if (addressType.equals("home")) {
                user.setHomeAddress(address);
            } else if (addressType.equals("work")) {
                user.setWorkAddress(address);
            }
        }
    }


    @Override
    public UserDTO getUserById(Integer id)
    {
        User user= userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
        return convertEntityToDTO(user);
    }
    @Override
    public User registerNewUser(@Valid UserDTO userDTO)
    {
        User user=convertDTOToEntity(userDTO);
        if (user.getHomeAddress()!=null) {


            setAddressIfExistsOrSave(user.getHomeAddress(), user, "home");
                }
        if (user.getWorkAddress()!=null) {
            setAddressIfExistsOrSave(user.getWorkAddress(), user, "work");
               }
        return userRepository.save(user);
    }
    @Override
    public UserDTO updateUser(Integer id, @Valid UserDTO userDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        
        user.setName(userDTO.getName());
        user.setSurname(userDTO.getSurname());
        user.setGender(userDTO.getGender());
        user.setBirthdate(userDTO.getBirthdate());

        if (userDTO.getHomeaddress()!=null) {


            setAddressIfExistsOrSave(userDTO.getHomeaddress(), user, "home");
        }

        else
        {
         user.setHomeAddress(null);
        }
        if (userDTO.getWorkaddress()!=null) {
            setAddressIfExistsOrSave(userDTO.getWorkaddress(), user, "work");
        }

        else
        {
            user.setWorkAddress(null);
        }



        User updatedUser = userRepository.save(user);

        return convertEntityToDTO(updatedUser);
    }

    @Override
    public void deleteUserById(Integer id)
    {

        try {
            userRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new UserNotFoundException(id);
        }
    }
   @Override
    public Iterable<UserDTO> getAllUsers(){
        return userRepository.findAll()
                .stream()
                .map(this::convertEntityToDTO)
                .collect(Collectors.toList());

    }


}