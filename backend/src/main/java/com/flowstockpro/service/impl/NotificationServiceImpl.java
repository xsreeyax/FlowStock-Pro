package com.flowstockpro.service.impl;

import com.flowstockpro.entity.Notification;
import com.flowstockpro.repository.NotificationRepository;
import com.flowstockpro.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository repository;

    @Override
    public Notification save(Notification notification) {
        notification.setCreatedAt(LocalDateTime.now());
        return repository.save(notification);
    }

    @Override
    public List<Notification> getAll() {
        return repository.findAll();
    }

    @Override
    public Notification getById(Long id) {
        return repository.findById(id).orElseThrow();
    }

    @Override
    public Notification update(Long id, Notification notification) {

        Notification existing = repository.findById(id).orElseThrow();

        existing.setTitle(notification.getTitle());
        existing.setMessage(notification.getMessage());
        existing.setNotificationType(notification.getNotificationType());
        existing.setRead(notification.isRead());

        return repository.save(existing);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}