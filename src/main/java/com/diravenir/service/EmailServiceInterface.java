package com.diravenir.service;

public interface EmailServiceInterface {
    void sendVerificationEmail(String toEmail, String userName, String verificationToken);
    void sendPasswordResetEmail(String toEmail, String userName, String resetToken);
    void sendOTPEmail(String toEmail, String userName, String otpCode);
    void sendWelcomeEmail(String toEmail, String userName);
    void sendOrientationResultsEmail(String toEmail, String userName, String testUuid, 
                                    String topRecommendation, Double topScore, 
                                    String userProfile);
}
