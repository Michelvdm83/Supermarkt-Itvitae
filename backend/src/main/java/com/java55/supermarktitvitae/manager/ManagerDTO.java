package com.java55.supermarktitvitae.manager;

public record ManagerDTO(String name, String email) {
    public static ManagerDTO from(Manager manager) {
        return new ManagerDTO(manager.getName(), manager.getEmail());
    }
}
