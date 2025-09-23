package com.example.checklist;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendChecklistReport(String toEmail, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("deine-email@gmail.com"); // muss zum SMTP-Account passen
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
}
