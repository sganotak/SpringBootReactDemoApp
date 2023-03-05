package com.example.demo.controller;

import com.example.demo.model.Address;
import com.example.demo.model.User;
import com.example.demo.repository.AddressRepository;
import com.example.demo.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(properties={"spring.config.name=application-test"})
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)

class UserControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;


   private User user1,user2,user3,user4;

   private Address address1,address2,address3;

    @BeforeEach
    public void setup() {


        //given
         address1 =new Address("London","123 Main Street","12345");
        addressRepository.save(address1);

         address2 =new Address("London","124 Main Street","12345");
        addressRepository.save(address2);

         address3=new Address("London","125 Main Street","12345");
        addressRepository.save(address3);


         user1 = new User();
        user1.setId(1);
        user1.setName("John");
        user1.setSurname("Doe");
        user1.setGender(User.Gender.M);
        user1.setBirthdate(LocalDate.of(1995, 4, 15));
        userRepository.save(user1);

         user2 = new User();
        user2.setId(2);
        user2.setName("Jane");
        user2.setSurname("Doe");
        user2.setGender(User.Gender.F);
        user2.setBirthdate(LocalDate.of(1995, 4, 15));
        user2.setHomeAddress(address1);
        userRepository.save(user2);

         user3 = new User();
        user3.setId(3);
        user3.setName("Bob");
        user3.setSurname("Doe");
        user3.setGender(User.Gender.M);
        user3.setBirthdate(LocalDate.of(1995, 4, 15));
        user3.setHomeAddress(address2);
        user3.setWorkAddress(address3);
        userRepository.save(user3);

         user4 = new User();
        user4.setId(4);
        user4.setName("George");
        user4.setSurname("Doe");
        user4.setGender(User.Gender.M);
        user4.setBirthdate(LocalDate.of(1995, 4, 15));
        user4.setWorkAddress(address3);
        userRepository.save(user4);


    }


    @Test
    public void testGetAllUsers() throws Exception {



        mockMvc.perform(get("/demo/users")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(4));
    }


    @Test
    void updateUser_isSuccessful() throws Exception {


        // Act
        this.mockMvc.perform(put("/demo/users/{id}", 1)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{ \"name\": \"Alex\", \"surname\": \"Doe\",\"gender\": \"M\",\"birthdate\": \"15/04/1995\"}")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void updateUser_withInvalidUserId_returns404() throws Exception {


        // Act
        this.mockMvc.perform(put("/demo/users/{id}", 100)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{ \"name\": \"Jim\", \"surname\": \"Doe\",\"gender\": \"M\",\"birthdate\": \"15/04/1995\"}")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    void updateUser_withInvalidInput_returns400() throws Exception {


        // Act
        this.mockMvc.perform(put("/demo/users/{id}", 1)
                        .content("{ \"name\": \"Jim\", \"surname\": \"Doe\",\"gender\": \"M\",\"birthdate\":  \"15-04-1995\"}")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    void registerUser_isSuccessful() throws Exception {



        this.mockMvc.perform(MockMvcRequestBuilders.post("/demo/register")
                        .content("{\"name\": \"Max\", \"surname\": \"Doe\",\"gender\": \"M\",\"birthdate\": \"15/04/1995\"}")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("User registered successfully!"));
    }

    @Test
    void registerUser_withInvalidInput_returns400() throws Exception {

        this.mockMvc.perform(MockMvcRequestBuilders.post("/demo/register")
                        .content("{\"name\": \"Max\", \"surname\": \"Doe\",\"gender\": \"M\",\"birthdate\": \"15-04-95\"}")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }


    @Test
    void getUserById_withInvalidId_returns404() throws Exception {

        this.mockMvc.perform(get("/demo/users/{id}", 100))
                .andDo(print())
                .andExpect(status().isNotFound());
    }

    @Test
    void getUserById_withValidId_returnsUser() throws Exception {



        this.mockMvc.perform(get("/demo/users/{id}", 1))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("John"))
                .andExpect(jsonPath("$.surname").value("Doe"))
                .andExpect(jsonPath("$.gender").value("M"))
                .andExpect(jsonPath("$.birthdate").value("15/04/1995"));
    }


    @Test
    void deleteUserById_withValidId_returnsNoContent() throws Exception {



        this.mockMvc.perform(delete("/demo/users/{id}", 3))
                .andDo(print())
                .andExpect(status().isNoContent());
    }



    @Test
    void deleteUserById_withInvalidId_returns404() throws Exception {


        this.mockMvc.perform(delete("/demo/users/{id}", 100))
                .andDo(print())
                .andExpect(status().isNotFound());
    }


}