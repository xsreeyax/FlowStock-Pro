package com.flowstockpro.service.impl;

import com.flowstockpro.entity.BusinessAdministration;
import com.flowstockpro.repository.BusinessAdministrationRepository;
import com.flowstockpro.service.BusinessAdministrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BusinessAdministrationServiceImpl
        implements BusinessAdministrationService {

    private final BusinessAdministrationRepository repository;

    @Override
    public BusinessAdministration save(BusinessAdministration admin) {
        return repository.save(admin);
    }

    @Override
    public List<BusinessAdministration> getAll() {
        return repository.findAll();
    }

    @Override
    public BusinessAdministration getById(Long id) {
        return repository.findById(id).orElseThrow();
    }

    @Override
    public BusinessAdministration update(Long id,
                                         BusinessAdministration admin) {

        BusinessAdministration existing =
                repository.findById(id).orElseThrow();

        existing.setDepartment(admin.getDepartment());
        existing.setBusinessUnit(admin.getBusinessUnit());
        existing.setCostCenter(admin.getCostCenter());
        existing.setManager(admin.getManager());

        return repository.save(existing);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}