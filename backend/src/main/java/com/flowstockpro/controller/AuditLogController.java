package com.flowstockpro.controller;

import com.flowstockpro.entity.AuditLog;
import com.flowstockpro.service.AuditLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/audit-logs")
@RequiredArgsConstructor
public class AuditLogController {

    private final AuditLogService service;

    @PostMapping
    public AuditLog save(@RequestBody AuditLog auditLog) {
        return service.save(auditLog);
    }

    @GetMapping
    public List<AuditLog> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public AuditLog getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}