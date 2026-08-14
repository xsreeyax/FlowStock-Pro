package com.flowstockpro.service.impl;

import com.flowstockpro.entity.AuditLog;
import com.flowstockpro.repository.AuditLogRepository;
import com.flowstockpro.service.AuditLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuditLogServiceImpl implements AuditLogService {

    private final AuditLogRepository repository;

    @Override
    public AuditLog save(AuditLog auditLog) {
        auditLog.setTimestamp(LocalDateTime.now());
        return repository.save(auditLog);
    }

    @Override
    public List<AuditLog> getAll() {
        return repository.findAll();
    }

    @Override
    public AuditLog getById(Long id) {
        return repository.findById(id).orElseThrow();
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}