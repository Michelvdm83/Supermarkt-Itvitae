package com.java55.supermarktitvitae.customer;

import com.java55.supermarktitvitae.security.AuthDTO;
import com.java55.supermarktitvitae.security.JwtService;
import com.java55.supermarktitvitae.security.JwtTokenDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/customers")
@RequiredArgsConstructor
@CrossOrigin(origins = "${supermarktitvitae.cors}")
public class CustomerController {

    private final CustomerRepository customerRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody AuthDTO authDTO) {
        if (authDTO.email() == null || authDTO.password() == null) {
            return ResponseEntity.badRequest()
                    .body(ProblemDetail.forStatusAndDetail(
                            HttpStatus.BAD_REQUEST,
                            "email and password are required"
                    ));
        }

        if (!(customerRepository.existsById(authDTO.email())
                && passwordEncoder.matches(authDTO.password(), customerRepository.getReferenceById(authDTO.email()).getPassword()))) {
            return ResponseEntity
                    .badRequest()
                    .body(ProblemDetail.forStatusAndDetail(
                            HttpStatus.BAD_REQUEST,
                            "email or password incorrect"
                    ));
        }

        return ResponseEntity.ok(new JwtTokenDTO(
                jwtService.generateTokenForCustomer(authDTO.email()),
                customerRepository.getReferenceById(authDTO.email()).getName()
        ));
    }
}
