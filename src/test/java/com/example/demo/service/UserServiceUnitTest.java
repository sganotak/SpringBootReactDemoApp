package com.example.demo.service;



import com.example.demo.model.Address;
import com.example.demo.model.User;
import com.example.demo.model.UserDTO;
import com.example.demo.repository.AddressRepository;
import com.example.demo.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.test.context.SpringBootTest;


import java.time.LocalDate;
import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class UserServiceUnitTest {

    @Mock
    private UserRepository userRepository;

    @Spy
    private AddressRepository addressRepository;

    @Spy
    private ModelMapper modelMapper;

    @InjectMocks
    private UserServiceImpl userService;

    private UserDTO userDTO;

    private User user;

    private Address address;


    @BeforeEach
    public void setup() {

        //GIVEN
        MockitoAnnotations.openMocks(this);
        userDTO = new UserDTO();
        userDTO.setId(1);
        userDTO.setName("John Doe");
        userDTO.setGender(User.Gender.M);
        userDTO.setBirthdate(LocalDate.of(1995, 4, 15));

        user = new User();
        user.setId(1);
        user.setName("John Doe");
        user.setGender(User.Gender.M);
        user.setBirthdate(LocalDate.of(1995, 4, 15));

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD);

        address = new Address();
        address.setId(1);
        address.setCity("New York");
        address.setStreet("Broadway");
        address.setZipcode("10001");
    }

    @Test
    public void testRegisterNewUserExistingAddress() {

        userDTO.setHomeaddress(address);

        //WHEN
        when(modelMapper.map(userDTO, User.class)).thenReturn(user);
        when(addressRepository.findByCityAndStreetAndZipcode("New York", "Broadway", "10001")).thenReturn(address);
        when(userRepository.save(user)).thenReturn(user);

        //THEN
        User result = userService.registerNewUser(userDTO);

        verify(userRepository, times(1)).save(user);
        verify(addressRepository, times(0)).save(address);
    }

    @Test
    public void testRegisterNewUserNewAddress() {


        userDTO.setHomeaddress(address);
        user.setHomeAddress(address);
        //WHEN
        when(modelMapper.map(userDTO, User.class)).thenReturn(user);
        when(addressRepository.findByCityAndStreetAndZipcode("New York", "Broadway", "10001")).thenReturn(null);
        when(userRepository.save(user)).thenReturn(user);
        when(addressRepository.save(address)).thenReturn(address);


        User result = userService.registerNewUser(userDTO);
        //THEN
        verify(addressRepository, times(1)).save(address);
        verify(userRepository, times(1)).save(user);

    }

    @Test
    public void testRegisterNewUserNoAddresses() {

        //WHEN
        when(modelMapper.map(userDTO, User.class)).thenReturn(user);
        when(userRepository.save(user)).thenReturn(user);
        //THEN
        User result = userService.registerNewUser(userDTO);

        verify(userRepository, times(1)).save(user);

    }

    @Test
    public void testGetAllUsers() {
        //WHEN
        when(userRepository.findAll()).thenReturn(Arrays.asList(user));
        when(modelMapper.map(user, UserDTO.class)).thenReturn(userDTO);
        //THEN
        Iterable<UserDTO> result = userService.getAllUsers();

        verify(userRepository, times(1)).findAll();
        verify(modelMapper, times(1)).map(user, UserDTO.class);


    }

    @Test
    public void testGetUserById() {
        //WHEN
        when(userRepository.findById(userDTO.getId())).thenReturn(Optional.of(user));
        when(modelMapper.map(user, UserDTO.class)).thenReturn(userDTO);

        UserDTO result = userService.getUserById(userDTO.getId());
        //THEN
        verify(userRepository, times(1)).findById(userDTO.getId());
        verify(modelMapper, times(1)).map(user, UserDTO.class);
    }

    @Test
    public void testDeleteUserById() {
        //WHEN
        doNothing().when(userRepository).deleteById(userDTO.getId());

        //THEN
        userService.deleteUserById(userDTO.getId());

        verify(userRepository, times(1)).deleteById(userDTO.getId());
    }

    @Test
    public void testUpdateUserNewAddress() {
        // GIVEN

        Address newAddress = new Address("New York","Central Park","10001");

        user.setHomeAddress(newAddress);

        UserDTO userDTO = new UserDTO();
        userDTO.setName("Mark");
        userDTO.setSurname("Doe");
        userDTO.setGender(User.Gender.M);
        userDTO.setBirthdate(LocalDate.of(1990, 1, 1));
        userDTO.setHomeaddress(newAddress);




        // WHEN
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(userRepository.save(user)).thenReturn(user);
        when(addressRepository.findByCityAndStreetAndZipcode("New York", "Central Park", "10001")).thenReturn(null);

        // THEN
        UserDTO updatedUserDTO = userService.updateUser(1, userDTO);


        assertEquals(userDTO.getName(), updatedUserDTO.getName());
        assertEquals(userDTO.getSurname(), updatedUserDTO.getSurname());
        assertEquals(userDTO.getGender(), updatedUserDTO.getGender());
        assertEquals(userDTO.getBirthdate(), updatedUserDTO.getBirthdate());
        assertEquals(userDTO.getHomeaddress(), updatedUserDTO.getHomeaddress());
        assertNull(updatedUserDTO.getWorkaddress());
        verify(userRepository, times(1)).findById(1);
        verify(userRepository, times(1)).save(user);
        verify(addressRepository, times(1)).save(newAddress);


    }

    @Test
    public void testUpdateUserExistingAddress() {
        // GIVEN
        Address newAddress = new Address("New York","Broadway","10001");
        user.setHomeAddress(address);

        UserDTO userDTO = new UserDTO();
        userDTO.setName("Mark");
        userDTO.setSurname("Doe");
        userDTO.setGender(User.Gender.M);
        userDTO.setBirthdate(LocalDate.of(1990, 1, 1));
        userDTO.setHomeaddress(newAddress);
        userDTO.setWorkaddress(newAddress);




        // WHEN
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(userRepository.save(user)).thenReturn(user);
        when(addressRepository.findByCityAndStreetAndZipcode("New York", "Central Park", "10001")).thenReturn(null);

        // THEN
        UserDTO updatedUserDTO = userService.updateUser(1, userDTO);


        assertEquals(userDTO.getName(), updatedUserDTO.getName());
        assertEquals(userDTO.getSurname(), updatedUserDTO.getSurname());
        assertEquals(userDTO.getGender(), updatedUserDTO.getGender());
        assertEquals(userDTO.getBirthdate(), updatedUserDTO.getBirthdate());
        assertEquals(userDTO.getHomeaddress(), updatedUserDTO.getHomeaddress());
        assertEquals(userDTO.getWorkaddress(), updatedUserDTO.getWorkaddress());
        verify(userRepository, times(1)).findById(1);
        verify(userRepository, times(1)).save(user);
        verify(addressRepository, times(0)).save(address);


    }
}
