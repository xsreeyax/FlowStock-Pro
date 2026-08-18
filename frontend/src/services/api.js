const API_BASE_URL = "http://localhost:8080/api";

export async function getProducts() {
  const response = await fetch(`${API_BASE_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function createProduct(product) {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Failed to create product");
  }

  return response.json();
}

export async function updateProduct(id, product) {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  return response.json();
}

export async function deleteProduct(id) {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }
}

export async function getInventory() {
  const response = await fetch(`${API_BASE_URL}/inventory`);

  if (!response.ok) {
    throw new Error("Failed to fetch inventory");
  }

  return response.json();
}

export async function createInventory(item) {
  const response = await fetch(`${API_BASE_URL}/inventory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error("Failed to create inventory item");
  }

  return response.json();
}

export async function updateInventory(id, item) {
  const response = await fetch(`${API_BASE_URL}/inventory/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error("Failed to update inventory item");
  }

  return response.json();
}

export async function deleteInventory(id) {
  const response = await fetch(`${API_BASE_URL}/inventory/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete inventory item");
  }
}

export async function getSuppliers() {
  const response = await fetch(`${API_BASE_URL}/suppliers`);

  if (!response.ok) {
    throw new Error("Failed to fetch suppliers");
  }

  return response.json();
}

export async function createSupplier(supplier) {
  const response = await fetch(`${API_BASE_URL}/suppliers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(supplier),
  });

  if (!response.ok) {
    throw new Error("Failed to create supplier");
  }

  return response.json();
}

export async function updateSupplier(id, supplier) {
  const response = await fetch(`${API_BASE_URL}/suppliers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(supplier),
  });

  if (!response.ok) {
    throw new Error("Failed to update supplier");
  }

  return response.json();
}

export async function deleteSupplier(id) {
  const response = await fetch(`${API_BASE_URL}/suppliers/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete supplier");
  }
}

export async function getOrders() {
  const response = await fetch(`${API_BASE_URL}/orders`);

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  return response.json();
}

export async function createOrder(order) {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error("Failed to create order");
  }

  return response.json();
}

export async function updateOrder(id, order) {
  const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error("Failed to update order");
  }

  return response.json();
}

export async function deleteOrder(id) {
  const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete order");
  }
}

export async function getWarehouses() {
  const response = await fetch(`${API_BASE_URL}/warehouses`);

  if (!response.ok) {
    throw new Error("Failed to fetch warehouses");
  }

  return response.json();
}

export async function createWarehouse(warehouse) {
  const response = await fetch(`${API_BASE_URL}/warehouses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(warehouse),
  });

  if (!response.ok) {
    throw new Error("Failed to create warehouse");
  }

  return response.json();
}

export async function updateWarehouse(id, warehouse) {
  const response = await fetch(`${API_BASE_URL}/warehouses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(warehouse),
  });

  if (!response.ok) {
    throw new Error("Failed to update warehouse");
  }

  return response.json();
}

export async function deleteWarehouse(id) {
  const response = await fetch(`${API_BASE_URL}/warehouses/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete warehouse");
  }
}

export async function getShipments() {
  const response = await fetch(`${API_BASE_URL}/shipments`);

  if (!response.ok) {
    throw new Error("Failed to fetch shipments");
  }

  return response.json();
}

export async function createShipment(shipment) {
  const response = await fetch(`${API_BASE_URL}/shipments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shipment),
  });

  if (!response.ok) {
    throw new Error("Failed to create shipment");
  }

  return response.json();
}

export async function updateShipment(id, shipment) {
  const response = await fetch(`${API_BASE_URL}/shipments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shipment),
  });

  if (!response.ok) {
    throw new Error("Failed to update shipment");
  }

  return response.json();
}

export async function deleteShipment(id) {
  const response = await fetch(`${API_BASE_URL}/shipments/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete shipment");
  }
}