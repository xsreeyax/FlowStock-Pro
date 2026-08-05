package com.flowstockpro.service.impl;

import com.flowstockpro.entity.Category;
import com.flowstockpro.repository.CategoryRepository;
import com.flowstockpro.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository repository;

    public CategoryServiceImpl(CategoryRepository repository) {
        this.repository = repository;
    }

    @Override
    public Category save(Category category) {
        return repository.save(category);
    }

    @Override
    public List<Category> getAll() {
        return repository.findAll();
    }

    @Override
    public Category getById(Long id) {
        return repository.findById(id).orElseThrow();
    }

    @Override
    public Category update(Long id, Category category) {

        Category existing = repository.findById(id).orElseThrow();

        existing.setCategoryName(category.getCategoryName());
        existing.setDescription(category.getDescription());

        return repository.save(existing);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}