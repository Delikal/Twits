import React, { useState, useEffect } from 'react';

function CustomerPage() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/customer/')
      .then(response => response.json())
      .then(data => setCustomers(data));
  }, []);

  return (
    <div>
      <h1>Naši Zákazníci</h1>
      <ul>
        {customers.map(customer => (
          <li key={customer.id}>{customer.name} - {customer.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerPage;
