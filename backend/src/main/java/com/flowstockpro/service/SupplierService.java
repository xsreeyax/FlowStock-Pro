package com.flowstockpro.service;

import com.flowstockpro.entity.Supplier;

import java.util.List;

public interface SupplierService {

    Supplier addSupplier(Supplier supplier);

    List<Supplier> getAllSuppliers();

    Supplier updateSupplier(Long id, Supplier supplier);

    void deleteSupplier(Long id);
}