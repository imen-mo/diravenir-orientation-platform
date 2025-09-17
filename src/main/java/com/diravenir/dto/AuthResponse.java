package com.diravenir.dto;

import com.diravenir.Entities.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    
    private String token;
    private String refreshToken;
    private String email;
    private String firstName;
    private String lastName;
    private Role role;
    private Long userId;
    private String message;
    private Boolean success;
}
