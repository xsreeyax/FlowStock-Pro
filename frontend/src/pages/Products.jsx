import { useEffect, useState } from "react";
import { getProducts } from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <h1>Product Management</h1>

      {error && <p>{error}</p>}

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>SKU</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Supplier</th>
              <th>Purchase Price</th>
              <th>Selling Price</th>
              <th>Minimum Stock</th>
              <th>Maximum Stock</th>
              <th>Unit</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.sku}</td>
                <td>{product.productName}</td>
                <td>{product.category?.categoryName}</td>
                <td>{product.supplier?.supplierName}</td>
                <td>₹{product.purchasePrice}</td>
                <td>₹{product.sellingPrice}</td>
                <td>{product.minimumStock}</td>
                <td>{product.maximumStock}</td>
                <td>{product.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Products;