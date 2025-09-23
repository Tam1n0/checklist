package com.example.checklist;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ChecklistItemRepository extends JpaRepository<ChecklistItem, Long> {
}
