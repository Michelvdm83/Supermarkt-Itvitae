package com.java55.supermarktitvitae.manager;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Manager {
    @Id
    private String email;

    private String name;

    private String password;
}