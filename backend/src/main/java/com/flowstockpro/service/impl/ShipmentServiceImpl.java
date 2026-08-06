package com.flowstockpro.service.impl;

import com.flowstockpro.entity.Shipment;
import com.flowstockpro.repository.ShipmentRepository;
import com.flowstockpro.service.ShipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ShipmentServiceImpl implements ShipmentService {

    private final ShipmentRepository repository;

    @Override
    public Shipment save(Shipment shipment) {
        shipment.setShipmentDate(LocalDate.now());
        return repository.save(shipment);
    }

    @Override
    public List<Shipment> getAll() {
        return repository.findAll();
    }

    @Override
    public Shipment getById(Long id) {
        return repository.findById(id).orElseThrow();
    }

    @Override
    public Shipment update(Long id, Shipment shipment) {

        Shipment existing = repository.findById(id).orElseThrow();

        existing.setShipmentNumber(shipment.getShipmentNumber());
        existing.setOrder(shipment.getOrder());
        existing.setCarrier(shipment.getCarrier());
        existing.setTrackingNumber(shipment.getTrackingNumber());
        existing.setShipmentStatus(shipment.getShipmentStatus());

        return repository.save(existing);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}