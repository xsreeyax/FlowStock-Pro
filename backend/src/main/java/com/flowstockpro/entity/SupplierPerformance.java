package com.flowstockpro.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "supplier_performance")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SupplierPerformance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "supplier_id", nullable = false)
    private Supplier supplier;

    private Double averageDeliveryTime;

    private Integer lateDeliveries;

    private Double qualityScore;

    private Integer totalDeliveries;
}