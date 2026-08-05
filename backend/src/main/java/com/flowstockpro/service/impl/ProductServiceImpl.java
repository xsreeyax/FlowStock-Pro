package com.flowstockpro.service.impl;

import com.flowstockpro.entity.Product;
import com.flowstockpro.repository.ProductRepository;
import com.flowstockpro.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository repository;

    @Override
    public Product addProduct(Product product) {
        return repository.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    @Override
    public Product getProduct(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @Override
    public Product updateProduct(Long id, Product product) {

        Product existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existing.setSku(product.getSku());
        existing.setProductName(product.getProductName());
        existing.setCategory(product.getCategory());
        existing.setSupplier(product.getSupplier());
        existing.setPurchasePrice(product.getPurchasePrice());
        existing.setSellingPrice(product.getSellingPrice());
        existing.setMinimumStock(product.getMinimumStock());
        existing.setMaximumStock(product.getMaximumStock());
        existing.setUnit(product.getUnit());

        return repository.save(existing);
    }

    @Override
    public void deleteProduct(Long id) {
        repository.deleteById(id);
    }

}