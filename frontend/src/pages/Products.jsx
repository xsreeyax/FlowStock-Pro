import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    sku: "",
    productName: "",
    categoryId: "",
    supplierId: "",
    purchasePrice: "",
    sellingPrice: "",
    minimumStock: "",
    maximumStock: "",
    unit: "",
  });

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData({
      sku: "",
      productName: "",
      categoryId: "",
      supplierId: "",
      purchasePrice: "",
      sellingPrice: "",
      minimumStock: "",
      maximumStock: "",
      unit: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const productData = {
        sku: formData.sku,
        productName: formData.productName,
        category: {
          id: Number(formData.categoryId),
        },
        supplier: {
          id: Number(formData.supplierId),
        },
        purchasePrice: Number(formData.purchasePrice),
        sellingPrice: Number(formData.sellingPrice),
        minimumStock: Number(formData.minimumStock),
        maximumStock: Number(formData.maximumStock),
        unit: formData.unit,
      };

      if (editingId) {
        const updatedProduct = await updateProduct(editingId, productData);

        setProducts(
          products.map((product) =>
            product.id === editingId ? updatedProduct : product
          )
        );
      } else {
        const newProduct = await createProduct(productData);
        setProducts([...products, newProduct]);
      }

      resetForm();
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);

    setFormData({
      sku: product.sku,
      productName: product.productName,
      categoryId: product.category?.id || "",
      supplierId: product.supplier?.id || "",
      purchasePrice: product.purchasePrice,
      sellingPrice: product.sellingPrice,
      minimumStock: product.minimumStock,
      maximumStock: product.maximumStock,
      unit: product.unit,
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProduct(id);

      setProducts(
        products.filter((product) => product.id !== id)
      );

      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Product Management</h1>

      {error && <p>{error}</p>}

      <h2>{editingId ? "Edit Product" : "Add New Product"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="sku"
          placeholder="SKU"
          value={formData.sku}
          onChange={handleChange}
          required
        />

        <input
          name="productName"
          placeholder="Product Name"
          value={formData.productName}
          onChange={handleChange}
          required
        />

        <input
          name="categoryId"
          type="number"
          placeholder="Category ID"
          value={formData.categoryId}
          onChange={handleChange}
          required
        />

        <input
          name="supplierId"
          type="number"
          placeholder="Supplier ID"
          value={formData.supplierId}
          onChange={handleChange}
          required
        />

        <input
          name="purchasePrice"
          type="number"
          placeholder="Purchase Price"
          value={formData.purchasePrice}
          onChange={handleChange}
          required
        />

        <input
          name="sellingPrice"
          type="number"
          placeholder="Selling Price"
          value={formData.sellingPrice}
          onChange={handleChange}
          required
        />

        <input
          name="minimumStock"
          type="number"
          placeholder="Minimum Stock"
          value={formData.minimumStock}
          onChange={handleChange}
          required
        />

        <input
          name="maximumStock"
          type="number"
          placeholder="Maximum Stock"
          value={formData.maximumStock}
          onChange={handleChange}
          required
        />

        <input
          name="unit"
          placeholder="Unit"
          value={formData.unit}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? "Update Product" : "Add Product"}
        </button>

        {editingId && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <h2>Products</h2>

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
              <th>Actions</th>
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
                <td>
                  <button onClick={() => handleEdit(product)}>
                    Edit
                  </button>

                  <button onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Products;