import React from 'react';
import SideBar from './components/SideBar/SideBar';
import NavBar from './components/NavBar/NavBar';
import './App.css'; // Přidáno pro styly

function App({ children }) {
  return (
    <div className="app-container">
      <SideBar />
      <NavBar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default App;
