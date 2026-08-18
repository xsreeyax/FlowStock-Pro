import { useEffect, useState } from "react";
import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../services/api";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    supplierName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    getSuppliers()
      .then((data) => {
        setSuppliers(data);
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
      supplierName: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editingId) {
        const updatedSupplier = await updateSupplier(
          editingId,
          formData
        );

        setSuppliers(
          suppliers.map((supplier) =>
            supplier.id === editingId
              ? updatedSupplier
              : supplier
          )
        );
      } else {
        const newSupplier = await createSupplier(formData);

        setSuppliers([...suppliers, newSupplier]);
      }

      resetForm();
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (supplier) => {
    setEditingId(supplier.id);

    setFormData({
      supplierName: supplier.supplierName,
      contactPerson: supplier.contactPerson,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this supplier?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteSupplier(id);

      setSuppliers(
        suppliers.filter((supplier) => supplier.id !== id)
      );

      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Supplier Management</h1>

      {error && <p>{error}</p>}

      <h2>
        {editingId ? "Edit Supplier" : "Add New Supplier"}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          name="supplierName"
          placeholder="Supplier Name"
          value={formData.supplierName}
          onChange={handleChange}
          required
        />

        <input
          name="contactPerson"
          placeholder="Contact Person"
          value={formData.contactPerson}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? "Update Supplier" : "Add Supplier"}
        </button>

        {editingId && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <h2>Suppliers</h2>

      {suppliers.length === 0 ? (
        <p>No suppliers found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Supplier Name</th>
              <th>Contact Person</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td>{supplier.id}</td>
                <td>{supplier.supplierName}</td>
                <td>{supplier.contactPerson}</td>
                <td>{supplier.email}</td>
                <td>{supplier.phone}</td>
                <td>{supplier.address}</td>
                <td>
                  <button
                    onClick={() => handleEdit(supplier)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(supplier.id)}
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

export default Suppliers;