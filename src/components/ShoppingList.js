// src/components/ShoppingList.js
import React, { useState } from 'react';
import AddItemForm from './AddItemForm';
import SearchBar from './SearchBar';
import ItemCard from './ItemCard';
import Statistics from './Statistics';
import {
  showSuccessAlert,
  showErrorAlert,
  showInfoAlert,
  showDeleteConfirmation
} from '../utils/alerts';

const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);

  const addItem = (text) => {
    if (text.trim() === '') {
      showErrorAlert('Error', 'Por favor, ingresa un artículo válido');
      return false;
    }

    const newItem = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };

    setItems(prevItems => [newItem, ...prevItems]);
    showSuccessAlert('¡Éxito!', 'Artículo agregado correctamente');
    return true;
  };

  const toggleCompleted = (id) => {
    const item = items.find(item => item.id === id);
    const newStatus = !item.completed;
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, completed: newStatus } : item
      )
    );

    const statusText = newStatus ? 'comprado' : 'pendiente';
    showInfoAlert('Estado actualizado', `Artículo marcado como ${statusText}`);
  };

  const editItem = (id, newText) => {
    if (newText.trim() === '') {
      showErrorAlert('Error', 'El artículo no puede estar vacío');
      return false;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, text: newText.trim() } : item
      )
    );

    setEditingId(null);
    showSuccessAlert('¡Éxito!', 'Artículo editado correctamente');
    return true;
  };

  const deleteItem = async (id) => {
    try {
      const result = await showDeleteConfirmation('¿Eliminar este artículo?');
      
      if (result.isConfirmed) {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
        showSuccessAlert('Eliminado', 'El artículo ha sido eliminado');
      }
    } catch (error) {
      showErrorAlert('Error', 'Hubo un problema al eliminar el artículo');
    }
  };

  const filteredItems = items.filter(item =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: items.length,
    completed: items.filter(item => item.completed).length,
    pending: items.filter(item => !item.completed).length
  };

  return (
    <div className="gradient-bg">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            
            <div className="card shadow-lg border-0 mb-4">
              <div className="card-header text-center py-4 header-gradient">
                <h1 className="text-white mb-0 fade-in">
                  <i className="bi bi-cart-fill me-3" style={{ fontSize: '2rem' }}></i>
                  Lista de Compras
                </h1>
                <p className="text-white-50 mb-0 mt-2">
                  Equipo #2 - Gestión de Compras
                </p>
              </div>

              <div className="card-body">
                <AddItemForm onAddItem={addItem} />
                <SearchBar
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  resultCount={filteredItems.length}
                  totalCount={items.length}
                />
                <Statistics stats={stats} />
              </div>
            </div>

            <div className="card shadow-lg border-0">
              <div className="card-header bg-light d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="bi bi-list-ul me-2"></i>
                  Mis Artículos
                </h5>
                {searchTerm && (
                  <span className="badge bg-info">
                    {filteredItems.length} de {items.length} artículos
                  </span>
                )}
              </div>

              <div className="card-body p-0">
                {filteredItems.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="bi bi-bag-x text-muted" style={{ fontSize: '4rem' }}></i>
                    <h4 className="text-muted mt-3">
                      {searchTerm ? 'No se encontraron resultados' : 'Tu lista está vacía'}
                    </h4>
                    <p className="text-muted">
                      {searchTerm
                        ? `No hay artículos que coincidan con "${searchTerm}"`
                        : 'Agrega algunos artículos para comenzar'
                      }
                    </p>
                  </div>
                ) : (
                  <div className="list-group list-group-flush">
                    {filteredItems.map((item, index) => (
                      <ItemCard
                        key={item.id}
                        item={item}
                        index={index}
                        editingId={editingId}
                        onToggleCompleted={toggleCompleted}
                        onStartEdit={setEditingId}
                        onEditItem={editItem}
                        onDeleteItem={deleteItem}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;