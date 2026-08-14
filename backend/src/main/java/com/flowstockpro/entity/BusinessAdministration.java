package com.flowstockpro.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "business_administration")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BusinessAdministration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String department;

    @Column(nullable = false)
    private String businessUnit;

    @Column(nullable = false)
    private String costCenter;

    @Column(nullable = false)
    private String manager;
}