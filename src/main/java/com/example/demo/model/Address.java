package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Pattern;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="addresses")
public class Address {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;


    private String city;

    private String street;
    @Pattern(regexp = "\\d{5}", message = "Zipcode must be 5 digits")
    private String zipcode;

    public Address(String city, String street, String zipcode) {
        this.city = city;
        this.street = street;
        this.zipcode = zipcode;
    }




}
