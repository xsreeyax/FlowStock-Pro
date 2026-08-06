package com.flowstockpro.service;

import com.flowstockpro.entity.Shipment;

import java.util.List;

public interface ShipmentService {

    Shipment save(Shipment shipment);

    List<Shipment> getAll();

    Shipment getById(Long id);

    Shipment update(Long id, Shipment shipment);

    void delete(Long id);
}