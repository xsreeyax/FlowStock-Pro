package com.flowstockpro.controller;

import com.flowstockpro.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/dashboard")
    public Map<String, Object> getDashboardMetrics() {
        return analyticsService.getDashboardMetrics();
    }
}