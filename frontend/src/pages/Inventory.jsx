import { useEffect, useState } from "react";
import {
  getInventory,
  createInventory,
  updateInventory,
  deleteInventory,
} from "../services/api";

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    itemCode: "",
    itemName: "",
    category: "",
    quantity: "",
    price: "",
    warehouseLocation: "",
  });

  useEffect(() => {
    getInventory()
      .then((data) => {
        setInventory(data);
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
      itemCode: "",
      itemName: "",
      category: "",
      quantity: "",
      price: "",
      warehouseLocation: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const inventoryData = {
        itemCode: formData.itemCode,
        itemName: formData.itemName,
        category: formData.category,
        quantity: Number(formData.quantity),
        price: Number(formData.price),
        warehouseLocation: formData.warehouseLocation,
      };

      if (editingId) {
        const updatedItem = await updateInventory(
          editingId,
          inventoryData
        );

        setInventory(
          inventory.map((item) =>
            item.id === editingId ? updatedItem : item
          )
        );
      } else {
        const newItem = await createInventory(inventoryData);
        setInventory([...inventory, newItem]);
      }

      resetForm();
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      itemCode: item.itemCode,
      itemName: item.itemName,
      category: item.category,
      quantity: item.quantity,
      price: item.price,
      warehouseLocation: item.warehouseLocation,
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this inventory item?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteInventory(id);

      setInventory(
        inventory.filter((item) => item.id !== id)
      );

      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Inventory Management</h1>

      {error && <p>{error}</p>}

      <h2>
        {editingId ? "Edit Inventory Item" : "Add Inventory Item"}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          name="itemCode"
          placeholder="Item Code"
          value={formData.itemCode}
          onChange={handleChange}
          required
        />

        <input
          name="itemName"
          placeholder="Item Name"
          value={formData.itemName}
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          name="warehouseLocation"
          placeholder="Warehouse Location"
          value={formData.warehouseLocation}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? "Update Item" : "Add Item"}
        </button>

        {editingId && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <h2>Inventory</h2>

      {inventory.length === 0 ? (
        <p>No inventory items found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Item Code</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Warehouse Location</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.itemCode}</td>
                <td>{item.itemName}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price}</td>
                <td>{item.warehouseLocation}</td>
                <td>
                  <button onClick={() => handleEdit(item)}>
                    Edit
                  </button>

                  <button onClick={() => handleDelete(item.id)}>
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

export default Inventory;