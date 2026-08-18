import { useEffect, useState } from "react";
import {
  getInventory,
  createInventory,
  updateInventory,
  deleteInventory,
  getStockMovements,
  createStockMovement,
  updateStockMovement,
  deleteStockMovement,
} from "../services/api";

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [stockMovements, setStockMovements] = useState([]);

  const [error, setError] = useState("");
  const [stockError, setStockError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editingMovementId, setEditingMovementId] = useState(null);

  const [formData, setFormData] = useState({
    itemCode: "",
    itemName: "",
    category: "",
    quantity: "",
    price: "",
    warehouseLocation: "",
  });

  const [movementForm, setMovementForm] = useState({
    productId: "",
    quantity: "",
    movementType: "",
  });

  useEffect(() => {
    getInventory()
      .then((data) => {
        setInventory(data);
      })
      .catch((error) => {
        setError(error.message);
      });

    getStockMovements()
      .then((data) => {
        setStockMovements(data);
      })
      .catch((error) => {
        setStockError(error.message);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMovementChange = (event) => {
    const { name, value } = event.target;

    setMovementForm({
      ...movementForm,
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

  const resetMovementForm = () => {
    setMovementForm({
      productId: "",
      quantity: "",
      movementType: "",
    });

    setEditingMovementId(null);
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

  const handleMovementSubmit = async (event) => {
    event.preventDefault();

    try {
      const movementData = {
        product: {
          id: Number(movementForm.productId),
        },
        quantity: Number(movementForm.quantity),
        movementType: movementForm.movementType,
      };

      if (editingMovementId) {
        const updatedMovement = await updateStockMovement(
          editingMovementId,
          movementData
        );

        setStockMovements(
          stockMovements.map((movement) =>
            movement.id === editingMovementId
              ? updatedMovement
              : movement
          )
        );
      } else {
        const newMovement = await createStockMovement(
          movementData
        );

        setStockMovements([...stockMovements, newMovement]);
      }

      resetMovementForm();
      setStockError("");
    } catch (error) {
      setStockError(error.message);
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

  const handleEditMovement = (movement) => {
    setEditingMovementId(movement.id);

    setMovementForm({
      productId: movement.product?.id || "",
      quantity: movement.quantity,
      movementType: movement.movementType,
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

  const handleDeleteMovement = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this stock movement?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteStockMovement(id);

      setStockMovements(
        stockMovements.filter(
          (movement) => movement.id !== id
        )
      );

      setStockError("");
    } catch (error) {
      setStockError(error.message);
    }
  };

  return (
    <div>
      <h1>Inventory Management</h1>

      {error && <p>{error}</p>}

      <h2>
        {editingId
          ? "Edit Inventory Item"
          : "Add Inventory Item"}
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

                  <button
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <hr />

      <h2>Stock Movements</h2>

      {stockError && <p>{stockError}</p>}

      <h3>
        {editingMovementId
          ? "Edit Stock Movement"
          : "Add Stock Movement"}
      </h3>

      <form onSubmit={handleMovementSubmit}>
        <input
          name="productId"
          type="number"
          placeholder="Product ID"
          value={movementForm.productId}
          onChange={handleMovementChange}
          required
        />

        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={movementForm.quantity}
          onChange={handleMovementChange}
          required
        />

        <input
          name="movementType"
          placeholder="Movement Type (IN / OUT)"
          value={movementForm.movementType}
          onChange={handleMovementChange}
          required
        />

        <button type="submit">
          {editingMovementId
            ? "Update Movement"
            : "Add Movement"}
        </button>

        {editingMovementId && (
          <button
            type="button"
            onClick={resetMovementForm}
          >
            Cancel
          </button>
        )}
      </form>

      {stockMovements.length === 0 ? (
        <p>No stock movements found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Movement Type</th>
              <th>Movement Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {stockMovements.map((movement) => (
              <tr key={movement.id}>
                <td>{movement.id}</td>
                <td>{movement.product?.productName}</td>
                <td>{movement.quantity}</td>
                <td>{movement.movementType}</td>
                <td>{movement.movementDate}</td>
                <td>
                  <button
                    onClick={() =>
                      handleEditMovement(movement)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteMovement(movement.id)
                    }
                  >
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