package com.java55.supermarktitvitae.manager;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/managers")
@CrossOrigin("http://localhost:5173")
public class ManagerController {
    private final ManagerRepository managerRepository;
}