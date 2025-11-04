package com.vmmedico.authentication.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponse {
    private String message;
    private String username;
    private String role;
    private String token;
    private Long userId;

    // Constructor without message
    public LoginResponse(String username, String role, String token, Long userId) {
        this.username = username;
        this.role = role;
        this.token = token;
        this.userId = userId;
        this.message = "Login successful"; // default
    }

    // Constructor without userId for backward compatibility
    public LoginResponse(String username, String role, String token) {
        this.username = username;
        this.role = role;
        this.token = token;
        this.message = "Login successful"; // default
    }
}
