// src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import ShoppingList from './components/ShoppingList';
import './App.css';

function App() {
  return (
    <div className="App">
      <ShoppingList />
    </div>
  );
}

export default App;
