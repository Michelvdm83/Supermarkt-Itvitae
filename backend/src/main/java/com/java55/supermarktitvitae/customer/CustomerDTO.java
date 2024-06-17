package com.java55.supermarktitvitae.customer;

public record CustomerDTO(String name, String email) {
    public static CustomerDTO from(Customer customer) {
        return new CustomerDTO(customer.getName(), customer.getEmail());
    }
}
