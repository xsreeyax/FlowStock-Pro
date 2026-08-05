package com.flowstockpro.service;

import com.flowstockpro.entity.Category;

import java.util.List;

public interface CategoryService {

    Category save(Category category);

    List<Category> getAll();

    Category getById(Long id);

    Category update(Long id, Category category);

    void delete(Long id);
}