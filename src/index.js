import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoffeePage from './pages/CoffeePage';
import CustomerPage from './pages/CustomerPage';
import OrderPage from './pages/OrderPage';
import App from './App'; // Pokud máte stále App komponentu

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" index element={<HomePage />} />
          <Route path="/coffee" element={<CoffeePage />} />
          <Route path="/customers" element={<CustomerPage />} />
          <Route path="/orders" element={<OrderPage />} />
        </Routes>
      </App>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
