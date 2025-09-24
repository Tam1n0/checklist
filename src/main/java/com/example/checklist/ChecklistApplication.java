package com.example.checklist;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ChecklistApplication {

    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.configure()
                              .ignoreIfMissing()
                              .load();

        // Setze Variablen als System-Properties, damit Spring sie erkennen kann
        System.setProperty("MAIL_USERNAME", dotenv.get("MAIL_USERNAME", ""));
        System.setProperty("MAIL_PASSWORD", dotenv.get("MAIL_PASSWORD", ""));

        SpringApplication.run(ChecklistApplication.class, args);
    }
}
