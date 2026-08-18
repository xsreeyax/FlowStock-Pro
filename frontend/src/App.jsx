import BusinessAdministration from "./pages/BusinessAdministration";
import Analytics from "./pages/Analytics";
import Shipments from "./pages/Shipments";
import Warehouses from "./pages/Warehouses";
import Orders from "./pages/Orders";
import Suppliers from "./pages/Suppliers";
import Products from "./pages/Products";
import Inventory from "./pages/Inventory";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/business-administration"
          element={<BusinessAdministration />}
        />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/shipments" element={<Shipments />} />
        <Route path="/warehouses" element={<Warehouses />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/products" element={<Products />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;