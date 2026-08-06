package com.flowstockpro.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "shipments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Shipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String shipmentNumber;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private OrderManagement order;

    private String carrier;

    private String trackingNumber;

    private String shipmentStatus;

    private LocalDate shipmentDate;
}