package com.java55.supermarktitvitae.security;

import com.java55.supermarktitvitae.customer.Customer;
import com.java55.supermarktitvitae.customer.CustomerRepository;
import com.java55.supermarktitvitae.manager.Manager;
import com.java55.supermarktitvitae.manager.ManagerRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@RequiredArgsConstructor
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final CustomerRepository customerRepository;
    private final ManagerRepository managerRepository;
    private final JwtService jwtService;

    private static final String AUTHORIZATION_HEADER_NAME = "Authorization";
    private static final String AUTHORIZATION_HEADER_JWT_PREFIX = "Bearer ";

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {


        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            filterChain.doFilter(request, response);
        }

        if (requestHasValidAuthHeader(request)) {
            String[] roles = getRoleFromAuthorization(request.getHeader(AUTHORIZATION_HEADER_NAME));
            var currentRole = roles[0];
            var possibleUser = currentRole.equalsIgnoreCase("ROLE_customer") ?
                    getCustomerFromAuthorizationHeader(request.getHeader(AUTHORIZATION_HEADER_NAME)) :
                    getManagerFromAuthorizationHeader(request.getHeader(AUTHORIZATION_HEADER_NAME));

            possibleUser.ifPresent(
                    principal -> {
                        UsernamePasswordAuthenticationToken authToken =
                                new UsernamePasswordAuthenticationToken(
                                        principal,
                                        null,
                                        principal.getAuthorities()
                                );

                        authToken.setDetails(
                                new WebAuthenticationDetailsSource()
                                        .buildDetails(request)
                        );

                        SecurityContextHolder.getContext().setAuthentication(authToken);
                    }
            );
        }

        filterChain.doFilter(request, response);
    }

    private static boolean requestHasValidAuthHeader(HttpServletRequest request) {
        String authHeader = request.getHeader(AUTHORIZATION_HEADER_NAME);
        return authHeader != null && authHeader.startsWith(AUTHORIZATION_HEADER_JWT_PREFIX);
    }

    private Optional<Customer> getCustomerFromAuthorizationHeader(String authorization) {
        if (authorization == null || !authorization.startsWith(AUTHORIZATION_HEADER_JWT_PREFIX)) {
            return Optional.empty();
        }

        var possibleToken = jwtService.readToken(authorization.substring(AUTHORIZATION_HEADER_JWT_PREFIX.length())).filter(token -> !token.isExpired());
        if (possibleToken.isEmpty()) {
            throw new RuntimeException("error on token");
        }
        return jwtService
                .readToken(authorization.substring(AUTHORIZATION_HEADER_JWT_PREFIX.length()))
                .filter(token -> !token.isExpired())
                .map(token -> customerRepository.findByEmailIgnoreCase(token.username()).orElseThrow(RuntimeException::new));
    }

    private Optional<Manager> getManagerFromAuthorizationHeader(String authorization) {
        if (authorization == null || !authorization.startsWith(AUTHORIZATION_HEADER_JWT_PREFIX)) {
            return Optional.empty();
        }

        var possibleToken = jwtService.readToken(authorization.substring(AUTHORIZATION_HEADER_JWT_PREFIX.length())).filter(token -> !token.isExpired());
        if (possibleToken.isEmpty()) {
            throw new RuntimeException("error on token");
        }
        return jwtService
                .readToken(authorization.substring(AUTHORIZATION_HEADER_JWT_PREFIX.length()))
                .filter(token -> !token.isExpired())
                .map(token -> managerRepository.findById(token.username()).orElseThrow(RuntimeException::new));
    }

    private String[] getRoleFromAuthorization(String authorization) {
        if (authorization == null || !authorization.startsWith(AUTHORIZATION_HEADER_JWT_PREFIX)) {
            return null;
        }

        var possibleToken = jwtService.readToken(authorization.substring(AUTHORIZATION_HEADER_JWT_PREFIX.length())).filter(token -> !token.isExpired());
        if (possibleToken.isEmpty()) {
            throw new RuntimeException("error on token");
        }
        var token = possibleToken.get();
        return token.roles();
    }
}
