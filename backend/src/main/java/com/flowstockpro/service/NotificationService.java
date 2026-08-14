package com.flowstockpro.service;

import com.flowstockpro.entity.Notification;

import java.util.List;

public interface NotificationService {

    Notification save(Notification notification);

    List<Notification> getAll();

    Notification getById(Long id);

    Notification update(Long id, Notification notification);

    void delete(Long id);
}