package com.java55.supermarktitvitae.security;

import com.java55.supermarktitvitae.customer.Customer;
import com.java55.supermarktitvitae.customer.CustomerRepository;
import com.java55.supermarktitvitae.manager.Manager;
import com.java55.supermarktitvitae.manager.ManagerRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.*;

@Service
@RequiredArgsConstructor
public class JwtService {
    private static final String ROLES_CLAIM_NAME = "roles";

    private final SecretKey secretKey;

    private final CustomerRepository customerRepository;
    private final ManagerRepository managerRepository;

    @Value("${supermarktitvitae.jwt-expiration-ms}")
    private int JWT_EXPIRATION_MS;

    public String generateTokenForManager(String email) throws UsernameNotFoundException {
        Manager manager = managerRepository.getReferenceById(email);
        if (manager.getEmail() == null) {
            throw new UsernameNotFoundException("No Customer with email: " + email + " found.");
        }

        return buildManagerToken(manager);
    }

    private String buildManagerToken(Manager manager) {
        long currentTimeMillis = System.currentTimeMillis();

        return Jwts.builder()
                .claims(Map.of(ROLES_CLAIM_NAME, manager.getAuthorities()))
                .subject(manager.getUsername())
                .issuedAt(new Date(currentTimeMillis))
                .expiration(new Date(currentTimeMillis + JWT_EXPIRATION_MS))
                .signWith(secretKey)
                .compact();
    }

    public String generateTokenForCustomer(String email) throws UsernameNotFoundException {
        Customer customer = customerRepository.getReferenceById(email);
        if (customer.getEmail() == null) {
            throw new UsernameNotFoundException("No Customer with email: " + email + " found.");
        }

        return buildToken(customer);
    }

    private String buildToken(Customer customer) {
        long currentTimeMillis = System.currentTimeMillis();

        return Jwts.builder()
                .claims(Map.of(ROLES_CLAIM_NAME, customer.getAuthorities()))
                .subject(customer.getUsername())
                .issuedAt(new Date(currentTimeMillis))
                .expiration(new Date(currentTimeMillis + JWT_EXPIRATION_MS))
                .signWith(secretKey)
                .compact();
    }

    public Optional<JwtTokenData> readToken(String token) {
        try {
            Claims claims = Jwts.parser().verifyWith(secretKey)
                    .build().parseSignedClaims(token).getPayload();

            return Optional.of(new JwtTokenData(
                    claims.getSubject(),
                    getRolesFromClaims(claims),
                    claims.getIssuedAt(),
                    claims.getExpiration()
            ));
        } catch (RuntimeException ex) {
            System.out.println("Exception reading JWT-token: TYPE: '"
                    + ex.getClass().getName()
                    + "', MESSAGE: '"
                    + ex.getMessage()
                    + "'");

            return Optional.empty();
        }
    }

    private String[] getRolesFromClaims(Claims claims) {
        Object rolesObject = claims.get(ROLES_CLAIM_NAME);

        if (rolesObject == null) {
            throw new IllegalArgumentException("'" + ROLES_CLAIM_NAME + "' claim not found");
        }
        if (!(rolesObject instanceof Iterable<?> rawRoles)) {
            throw new IllegalArgumentException("claims '" + ROLES_CLAIM_NAME + "' value is invalid");
        }

        List<String> parsedRoles = new LinkedList<>();

        for (Object o : rawRoles) {
            if (o instanceof LinkedHashMap<?, ?> map) {
                map.values().forEach(t -> {
                    if (t instanceof String) {
                        parsedRoles.add((String) t);
                    }
                });
            }
        }

        return parsedRoles.toArray(new String[0]);
    }
}
