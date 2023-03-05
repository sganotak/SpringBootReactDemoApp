package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
@Data
@Entity
@Table(name="users")
@AllArgsConstructor
@NoArgsConstructor
public class User {

    public enum Gender {
        M,
        F
        }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @NotBlank(message="Name is required")
    private String name;

    @NotBlank(message="Surname is required")
    private String surname;
    @Enumerated(EnumType.STRING)
    @NotNull(message = "Gender is required")
    private Gender gender;

    @NotNull(message = "Birthdate is required")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
   @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDate birthdate;

    @ManyToOne(cascade=CascadeType.PERSIST,optional = true)
    @JoinColumn(name="home_address_id",referencedColumnName = "id")
    private Address homeAddress;

    @ManyToOne(cascade=CascadeType.PERSIST,optional = true)
    @JoinColumn(name="work_address_id",referencedColumnName = "id")
    private Address workAddress;







}

