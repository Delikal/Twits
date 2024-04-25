import React, { useState, useEffect } from 'react';

function CoffeePage() {
  const [coffees, setCoffees] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/coffee/')
      .then(response => response.json())
      .then(data => setCoffees(data));
  }, []);

  return (
    <div>
      <h1>Naše Kávy</h1>
      <ul>
        {coffees.map(coffee => (
          <li key={coffee.id}>{coffee.name} - {coffee.price} CZK</li>
        ))}
      </ul>
    </div>
  );
}

export default CoffeePage;
