package com.flowstockpro.repository;

import com.flowstockpro.entity.BusinessAdministration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessAdministrationRepository
        extends JpaRepository<BusinessAdministration, Long> {
}