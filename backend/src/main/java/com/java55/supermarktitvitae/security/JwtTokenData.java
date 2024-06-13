package com.java55.supermarktitvitae.security;

import java.util.Date;

public record JwtTokenData(String username, String[] roles, Date issueDate, Date expirationDate) {
    public boolean isExpired() {
        return expirationDate.before(new Date());
    }
}
