import { useEffect, useState } from "react";
import {
  getBusinessAdministration,
  createBusinessAdministration,
  updateBusinessAdministration,
  deleteBusinessAdministration,
} from "../services/api";

function BusinessAdministration() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    department: "",
    businessUnit: "",
    costCenter: "",
    manager: "",
  });

  useEffect(() => {
  const loadRecords = async () => {
    try {
      const data = await getBusinessAdministration();
      setRecords(data);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  loadRecords();
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
      department: "",
      businessUnit: "",
      costCenter: "",
      manager: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editingId) {
        const updatedRecord =
          await updateBusinessAdministration(
            editingId,
            formData
          );

        setRecords(
          records.map((record) =>
            record.id === editingId
              ? updatedRecord
              : record
          )
        );
      } else {
        const newRecord =
          await createBusinessAdministration(formData);

        setRecords([...records, newRecord]);
      }

      resetForm();
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (record) => {
    setEditingId(record.id);

    setFormData({
      department: record.department,
      businessUnit: record.businessUnit,
      costCenter: record.costCenter,
      manager: record.manager,
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteBusinessAdministration(id);

      setRecords(
        records.filter((record) => record.id !== id)
      );

      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Business Administration</h1>

      {error && <p>{error}</p>}

      <h2>
        {editingId
          ? "Edit Business Administration"
          : "Add New Business Administration"}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />

        <input
          name="businessUnit"
          placeholder="Business Unit"
          value={formData.businessUnit}
          onChange={handleChange}
          required
        />

        <input
          name="costCenter"
          placeholder="Cost Center"
          value={formData.costCenter}
          onChange={handleChange}
          required
        />

        <input
          name="manager"
          placeholder="Manager"
          value={formData.manager}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? "Update Record" : "Add Record"}
        </button>

        {editingId && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <h2>Business Administration Records</h2>

      {records.length === 0 ? (
        <p>No business administration records found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Department</th>
              <th>Business Unit</th>
              <th>Cost Center</th>
              <th>Manager</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.department}</td>
                <td>{record.businessUnit}</td>
                <td>{record.costCenter}</td>
                <td>{record.manager}</td>
                <td>
                  <button
                    onClick={() => handleEdit(record)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(record.id)}
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

export default BusinessAdministration;