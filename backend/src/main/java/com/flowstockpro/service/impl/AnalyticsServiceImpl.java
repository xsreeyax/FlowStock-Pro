package com.flowstockpro.service.impl;

import com.flowstockpro.repository.AnalyticsRepository;
import com.flowstockpro.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AnalyticsServiceImpl implements AnalyticsService {

    private final AnalyticsRepository repository;

    @Override
    public Map<String, Object> getDashboardMetrics() {

        Map<String, Object> metrics = new LinkedHashMap<>();

        metrics.put("totalRevenue", repository.getTotalRevenue());
        metrics.put("totalOrders", repository.getTotalOrders());
        metrics.put("inventoryValue", repository.getInventoryValue());
        metrics.put("totalWarehouses", repository.getTotalWarehouses());
        metrics.put("outboundQuantity", repository.getOutboundQuantity());

        return metrics;
    }
}