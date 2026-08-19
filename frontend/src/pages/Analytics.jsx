import { useEffect, useState } from "react";
import { getAnalyticsDashboard } from "../services/api";

function Analytics() {
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getAnalyticsDashboard()
      .then((data) => {
        setMetrics(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return (
      <div>
        <h1>Business Analytics Dashboard</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div>
        <h1>Business Analytics Dashboard</h1>
        <p>Loading analytics...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Business Analytics Dashboard</h1>

      <p>
        View revenue, orders, inventory value, warehouse
        utilization, and business performance.
      </p>

      <div>
        <h2>Total Revenue</h2>
        <p>₹{metrics.totalRevenue}</p>
      </div>

      <div>
        <h2>Total Orders</h2>
        <p>{metrics.totalOrders}</p>
      </div>

      <div>
        <h2>Inventory Value</h2>
        <p>₹{metrics.inventoryValue}</p>
      </div>

      <div>
        <h2>Total Warehouses</h2>
        <p>{metrics.totalWarehouses}</p>
      </div>

      <div>
        <h2>Outbound Quantity</h2>
        <p>{metrics.outboundQuantity}</p>
      </div>
    </div>
  );
}

export default Analytics;