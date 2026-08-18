import { useEffect, useState } from "react";
import {
  getWarehouses,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
} from "../services/api";

function Warehouses() {
  const [warehouses, setWarehouses] = useState([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    warehouseCode: "",
    warehouseName: "",
    location: "",
    capacity: "",
    managerName: "",
  });

  useEffect(() => {
    getWarehouses()
      .then((data) => {
        setWarehouses(data);
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
      warehouseCode: "",
      warehouseName: "",
      location: "",
      capacity: "",
      managerName: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const warehouseData = {
        warehouseCode: formData.warehouseCode,
        warehouseName: formData.warehouseName,
        location: formData.location,
        capacity: Number(formData.capacity),
        managerName: formData.managerName,
      };

      if (editingId) {
        const updatedWarehouse = await updateWarehouse(
          editingId,
          warehouseData
        );

        setWarehouses(
          warehouses.map((warehouse) =>
            warehouse.id === editingId
              ? updatedWarehouse
              : warehouse
          )
        );
      } else {
        const newWarehouse = await createWarehouse(warehouseData);
        setWarehouses([...warehouses, newWarehouse]);
      }

      resetForm();
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (warehouse) => {
    setEditingId(warehouse.id);

    setFormData({
      warehouseCode: warehouse.warehouseCode,
      warehouseName: warehouse.warehouseName,
      location: warehouse.location,
      capacity: warehouse.capacity,
      managerName: warehouse.managerName,
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this warehouse?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteWarehouse(id);

      setWarehouses(
        warehouses.filter((warehouse) => warehouse.id !== id)
      );

      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Warehouse Management</h1>

      {error && <p>{error}</p>}

      <h2>
        {editingId ? "Edit Warehouse" : "Add New Warehouse"}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          name="warehouseCode"
          placeholder="Warehouse Code"
          value={formData.warehouseCode}
          onChange={handleChange}
          required
        />

        <input
          name="warehouseName"
          placeholder="Warehouse Name"
          value={formData.warehouseName}
          onChange={handleChange}
          required
        />

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          name="capacity"
          type="number"
          placeholder="Capacity"
          value={formData.capacity}
          onChange={handleChange}
          required
        />

        <input
          name="managerName"
          placeholder="Manager Name"
          value={formData.managerName}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? "Update Warehouse" : "Add Warehouse"}
        </button>

        {editingId && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <h2>Warehouses</h2>

      {warehouses.length === 0 ? (
        <p>No warehouses found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Warehouse Code</th>
              <th>Warehouse Name</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>Manager Name</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {warehouses.map((warehouse) => (
              <tr key={warehouse.id}>
                <td>{warehouse.id}</td>
                <td>{warehouse.warehouseCode}</td>
                <td>{warehouse.warehouseName}</td>
                <td>{warehouse.location}</td>
                <td>{warehouse.capacity}</td>
                <td>{warehouse.managerName}</td>
                <td>
                  <button
                    onClick={() => handleEdit(warehouse)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(warehouse.id)}
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

export default Warehouses;