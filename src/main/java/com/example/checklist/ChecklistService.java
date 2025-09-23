package com.example.checklist;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ChecklistService {

    private final ChecklistItemRepository repository;

    public ChecklistService(ChecklistItemRepository repository) {
        this.repository = repository;
    }

    public List<ChecklistItem> getAllItems() {
        return repository.findAll();
    }

    public ChecklistItem getItem(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Item not found"));
    }

    public ChecklistItem createItem(ChecklistItem item) {
        return repository.save(item);
    }

    public ChecklistItem updateItem(Long id, ChecklistItem updatedItem) {
        ChecklistItem item = getItem(id);
        item.setDescription(updatedItem.getDescription());
        item.setCompleted(updatedItem.isCompleted());
        return repository.save(item);
    }

    public void deleteItem(Long id) {
        repository.deleteById(id);
    }
}
