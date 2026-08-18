import { useEffect, useState } from "react";
import {
  getShipments,
  createShipment,
  updateShipment,
  deleteShipment,
} from "../services/api";

function Shipments() {
  const [shipments, setShipments] = useState([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    shipmentNumber: "",
    orderId: "",
    carrier: "",
    trackingNumber: "",
    shipmentStatus: "",
    shipmentDate: "",
  });

  useEffect(() => {
    getShipments()
      .then((data) => {
        setShipments(data);
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
      shipmentNumber: "",
      orderId: "",
      carrier: "",
      trackingNumber: "",
      shipmentStatus: "",
      shipmentDate: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const shipmentData = {
        shipmentNumber: formData.shipmentNumber,

        order: {
          id: Number(formData.orderId),
        },

        carrier: formData.carrier,
        trackingNumber: formData.trackingNumber,
        shipmentStatus: formData.shipmentStatus,
        shipmentDate: formData.shipmentDate,
      };

      if (editingId) {
        const updatedShipment = await updateShipment(
          editingId,
          shipmentData
        );

        setShipments(
          shipments.map((shipment) =>
            shipment.id === editingId
              ? updatedShipment
              : shipment
          )
        );
      } else {
        const newShipment = await createShipment(shipmentData);
        setShipments([...shipments, newShipment]);
      }

      resetForm();
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (shipment) => {
    setEditingId(shipment.id);

    setFormData({
      shipmentNumber: shipment.shipmentNumber,
      orderId: shipment.order?.id || "",
      carrier: shipment.carrier,
      trackingNumber: shipment.trackingNumber,
      shipmentStatus: shipment.shipmentStatus,
      shipmentDate: shipment.shipmentDate || "",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this shipment?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteShipment(id);

      setShipments(
        shipments.filter((shipment) => shipment.id !== id)
      );

      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Shipment Management</h1>

      {error && <p>{error}</p>}

      <h2>
        {editingId ? "Edit Shipment" : "Add New Shipment"}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          name="shipmentNumber"
          placeholder="Shipment Number"
          value={formData.shipmentNumber}
          onChange={handleChange}
          required
        />

        <input
          name="orderId"
          type="number"
          placeholder="Order ID"
          value={formData.orderId}
          onChange={handleChange}
          required
        />

        <input
          name="carrier"
          placeholder="Carrier"
          value={formData.carrier}
          onChange={handleChange}
          required
        />

        <input
          name="trackingNumber"
          placeholder="Tracking Number"
          value={formData.trackingNumber}
          onChange={handleChange}
          required
        />

        <input
          name="shipmentStatus"
          placeholder="Shipment Status"
          value={formData.shipmentStatus}
          onChange={handleChange}
          required
        />

        <input
          name="shipmentDate"
          type="date"
          value={formData.shipmentDate}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? "Update Shipment" : "Add Shipment"}
        </button>

        {editingId && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <h2>Shipments</h2>

      {shipments.length === 0 ? (
        <p>No shipments found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Shipment Number</th>
              <th>Order</th>
              <th>Carrier</th>
              <th>Tracking Number</th>
              <th>Shipment Status</th>
              <th>Shipment Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {shipments.map((shipment) => (
              <tr key={shipment.id}>
                <td>{shipment.id}</td>
                <td>{shipment.shipmentNumber}</td>
                <td>{shipment.order?.orderNumber}</td>
                <td>{shipment.carrier}</td>
                <td>{shipment.trackingNumber}</td>
                <td>{shipment.shipmentStatus}</td>
                <td>{shipment.shipmentDate}</td>
                <td>
                  <button
                    onClick={() => handleEdit(shipment)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(shipment.id)}
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

export default Shipments;