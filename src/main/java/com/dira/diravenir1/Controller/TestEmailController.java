package com.dira.diravenir1.Controller;

import com.dira.diravenir1.service.EmailService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestEmailController {

    private final EmailService emailService;

    public TestEmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/mail")
    public String sendTestEmail() {
        emailService.sendVerificationEmail("imane.tesmailperso@gmail.com", "1234");
        return "Mail envoyé !";
    }
}
