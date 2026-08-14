package com.flowstockpro.service;

import com.flowstockpro.entity.AuditLog;

import java.util.List;

public interface AuditLogService {

    AuditLog save(AuditLog auditLog);

    List<AuditLog> getAll();

    AuditLog getById(Long id);

    void delete(Long id);
}