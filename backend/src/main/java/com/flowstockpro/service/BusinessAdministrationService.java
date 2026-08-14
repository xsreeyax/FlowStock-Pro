package com.flowstockpro.service;

import com.flowstockpro.entity.BusinessAdministration;

import java.util.List;

public interface BusinessAdministrationService {

    BusinessAdministration save(BusinessAdministration admin);

    List<BusinessAdministration> getAll();

    BusinessAdministration getById(Long id);

    BusinessAdministration update(Long id,
                                  BusinessAdministration admin);

    void delete(Long id);
}