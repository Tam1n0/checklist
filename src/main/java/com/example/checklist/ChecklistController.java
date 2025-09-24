package com.example.checklist;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/checklist")
@CrossOrigin(origins = "http://localhost:3000")
public class ChecklistController {

    private final ChecklistService service;
    private final EmailService emailService;

    public ChecklistController(ChecklistService service, EmailService emailService) {
        this.service = service;
        this.emailService = emailService;
    }


    @PostMapping("/report")
    public void sendReport(@RequestParam String email, @RequestParam String name) {
        var items = service.getAllItems();
        var sb = new StringBuilder();
        sb.append("Checklist Report von ").append(name).append(": \n\n");

        for (ChecklistItem item : items) {
            sb.append("- ")
              .append(item.getDescription())
              .append(item.isCompleted() ? " ✅" : " ❌")
              .append("\n");
        }

        String subject = "Checklist Report - " + name;

        emailService.sendChecklistReport(email, subject, sb.toString());
    }


    @GetMapping
    public List<ChecklistItem> getAllItems() {
        return service.getAllItems();
    }

    @GetMapping("/{id}")
    public ChecklistItem getItem(@PathVariable Long id) {
        return service.getItem(id);
    }

    @PostMapping
    public ChecklistItem createItem(@RequestBody ChecklistItem item) {
        return service.createItem(item);
    }

    @PutMapping("/{id}")
    public ChecklistItem updateItem(@PathVariable Long id, @RequestBody ChecklistItem item) {
        return service.updateItem(id, item);
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        service.deleteItem(id);
    }
}
