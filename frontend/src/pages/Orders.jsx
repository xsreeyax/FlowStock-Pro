import { useEffect, useState } from "react";
import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    orderNumber: "",
    customerName: "",
    productId: "",
    quantity: "",
    totalAmount: "",
    orderStatus: "",
    paymentStatus: "",
    deliverySlot: "",
    orderDate: "",
  });

  useEffect(() => {
    getOrders()
      .then((data) => {
        setOrders(data);
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
      orderNumber: "",
      customerName: "",
      productId: "",
      quantity: "",
      totalAmount: "",
      orderStatus: "",
      paymentStatus: "",
      deliverySlot: "",
      orderDate: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const orderData = {
        orderNumber: formData.orderNumber,
        customerName: formData.customerName,

        product: {
          id: Number(formData.productId),
        },

        quantity: Number(formData.quantity),
        totalAmount: Number(formData.totalAmount),
        orderStatus: formData.orderStatus,
        paymentStatus: formData.paymentStatus,
        deliverySlot: formData.deliverySlot,
        orderDate: formData.orderDate,
      };

      if (editingId) {
        const updatedOrder = await updateOrder(
          editingId,
          orderData
        );

        setOrders(
          orders.map((order) =>
            order.id === editingId ? updatedOrder : order
          )
        );
      } else {
        const newOrder = await createOrder(orderData);
        setOrders([...orders, newOrder]);
      }

      resetForm();
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (order) => {
    setEditingId(order.id);

    setFormData({
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      productId: order.product?.id || "",
      quantity: order.quantity,
      totalAmount: order.totalAmount,
      orderStatus: order.orderStatus,
      paymentStatus: order.paymentStatus,
      deliverySlot: order.deliverySlot,
      orderDate: order.orderDate || "",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteOrder(id);

      setOrders(
        orders.filter((order) => order.id !== id)
      );

      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Order Management</h1>

      {error && <p>{error}</p>}

      <h2>
        {editingId ? "Edit Order" : "Create New Order"}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          name="orderNumber"
          placeholder="Order Number"
          value={formData.orderNumber}
          onChange={handleChange}
          required
        />

        <input
          name="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={handleChange}
          required
        />

        <input
          name="productId"
          type="number"
          placeholder="Product ID"
          value={formData.productId}
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
          name="totalAmount"
          type="number"
          placeholder="Total Amount"
          value={formData.totalAmount}
          onChange={handleChange}
          required
        />

        <input
          name="orderStatus"
          placeholder="Order Status"
          value={formData.orderStatus}
          onChange={handleChange}
          required
        />

        <input
          name="paymentStatus"
          placeholder="Payment Status"
          value={formData.paymentStatus}
          onChange={handleChange}
          required
        />

        <input
          name="deliverySlot"
          placeholder="Delivery Slot"
          value={formData.deliverySlot}
          onChange={handleChange}
          required
        />

        <input
          name="orderDate"
          type="date"
          value={formData.orderDate}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? "Update Order" : "Create Order"}
        </button>

        {editingId && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <h2>Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Order Number</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total Amount</th>
              <th>Order Status</th>
              <th>Payment Status</th>
              <th>Delivery Slot</th>
              <th>Order Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.orderNumber}</td>
                <td>{order.customerName}</td>
                <td>{order.product?.productName}</td>
                <td>{order.quantity}</td>
                <td>₹{order.totalAmount}</td>
                <td>{order.orderStatus}</td>
                <td>{order.paymentStatus}</td>
                <td>{order.deliverySlot}</td>
                <td>{order.orderDate}</td>
                <td>
                  <button onClick={() => handleEdit(order)}>
                    Edit
                  </button>

                  <button onClick={() => handleDelete(order.id)}>
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

export default Orders;