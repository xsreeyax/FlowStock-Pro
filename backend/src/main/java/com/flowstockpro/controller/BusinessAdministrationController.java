package com.flowstockpro.controller;

import com.flowstockpro.entity.BusinessAdministration;
import com.flowstockpro.service.BusinessAdministrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/business")
@RequiredArgsConstructor
public class BusinessAdministrationController {

    private final BusinessAdministrationService service;

    @PostMapping
    public BusinessAdministration save(
            @RequestBody BusinessAdministration admin) {
        return service.save(admin);
    }

    @GetMapping
    public List<BusinessAdministration> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public BusinessAdministration getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public BusinessAdministration update(
            @PathVariable Long id,
            @RequestBody BusinessAdministration admin) {

        return service.update(id, admin);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}