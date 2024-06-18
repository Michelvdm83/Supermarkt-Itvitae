package com.java55.supermarktitvitae.manager;

import com.java55.supermarktitvitae.security.AuthDTO;
import com.java55.supermarktitvitae.security.JwtService;
import com.java55.supermarktitvitae.security.JwtTokenDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/managers")
@CrossOrigin("http://localhost:5173")
public class ManagerController {
    private final ManagerRepository managerRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody AuthDTO authDTO) {
        if (authDTO.email() == null || authDTO.password() == null) {
            return ResponseEntity.badRequest()
                    .body(ProblemDetail.forStatusAndDetail(
                            HttpStatus.BAD_REQUEST,
                            "email en wachtwoord zijn nodig"
                    ));
        }

        if (!(managerRepository.existsById(authDTO.email())
                && passwordEncoder.matches(authDTO.password(), managerRepository.getReferenceById(authDTO.email()).getPassword()))) {
            return ResponseEntity
                    .badRequest()
                    .body(ProblemDetail.forStatusAndDetail(
                            HttpStatus.BAD_REQUEST,
                            "email of wachtwoord incorrect"
                    ));
        }

        Manager manager = managerRepository.getReferenceById(authDTO.email());

        return ResponseEntity.ok(new JwtTokenDTO(
                jwtService.generateTokenForManager(authDTO.email()),
                manager.getName(),
                manager.getRole()
        ));
    }

    @GetMapping("page-info")
    public ManagerDTO getInfo(Authentication authentication) {
        Manager thisManager = (Manager) authentication.getPrincipal();

        return ManagerDTO.from(thisManager);
    }
}