package com.dira.diravenir1.payload;

public class LoginRequest {
    private String email;
    private String password;
    private String recaptchaToken;


    public LoginRequest() {}

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
