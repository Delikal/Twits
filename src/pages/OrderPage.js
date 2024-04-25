import React, { useState, useEffect } from 'react';

function OrderPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/order/')
      .then(response => response.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div>
      <h1>Objednávky</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id}>Objednávka č. {order.id} od {order.customer.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default OrderPage;
