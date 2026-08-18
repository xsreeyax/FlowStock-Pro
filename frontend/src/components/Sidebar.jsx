import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside>
      <h3>Navigation</h3>

      <ul>
        <li>
            <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
            <Link to="/inventory">Inventory</Link>
        </li>
        <li>
            <Link to="/products">Products</Link>
        </li>
        <li>
            <Link to="/suppliers">Suppliers</Link>
        </li>
        <li>
            <Link to="/orders">Orders</Link>
        </li>
        <li>
            <Link to="/warehouses">Warehouses</Link>
        </li>
        <li>
            <Link to="/shipments">Shipments</Link>
        </li>
        <li>
            <Link to="/analytics">Business Analytics</Link>
        </li>
        <li>
            <Link to="/business-administration">
            Business Administration
            </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;