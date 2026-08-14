package com.flowstockpro.repository;

import com.flowstockpro.entity.OrderManagement;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

public interface AnalyticsRepository extends Repository<OrderManagement, Long> {

    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM OrderManagement o")
    Double getTotalRevenue();

    @Query("SELECT COUNT(o) FROM OrderManagement o")
    Long getTotalOrders();

    @Query("""
           SELECT COALESCE(SUM(
               p.sellingPrice *
               COALESCE(
                   (SELECT SUM(
                       CASE
                           WHEN sm.movementType = 'IN' THEN sm.quantity
                           WHEN sm.movementType = 'OUT' THEN -sm.quantity
                           ELSE 0
                       END
                   )
                   FROM StockMovement sm
                   WHERE sm.product.id = p.id), 0
               )
           ), 0)
           FROM Product p
           """)
    Double getInventoryValue();

    @Query("SELECT COUNT(w) FROM Warehouse w")
    Long getTotalWarehouses();

    @Query("""
           SELECT COALESCE(SUM(
               CASE
                   WHEN sm.movementType = 'OUT' THEN sm.quantity
                   ELSE 0
               END
           ), 0)
           FROM StockMovement sm
           """)
    Long getOutboundQuantity();
}