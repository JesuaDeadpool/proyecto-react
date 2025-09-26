// src/components/AddItemForm.js
import React, { useState } from 'react';

const AddItemForm = ({ onAddItem }) => {
  const [newItem, setNewItem] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    
    setIsLoading(true);
    
    // Simular un pequeño delay para mostrar loading
    setTimeout(() => {
      const success = onAddItem(newItem);
      if (success) {
        setNewItem('');
      }
      setIsLoading(false);
    }, 300);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleClear = () => {
    setNewItem('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-3">
        <div className="col-md-8">
          <div className="input-group input-group-lg">
            <span className="input-group-text bg-light border-end-0">
              <i className="bi bi-plus-circle text-primary"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Agregar nuevo artículo... (ej: Leche, Pan, Frutas)"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              autoFocus
              maxLength="100"
            />
            {newItem && (
              <button
                type="button"
                className="btn btn-outline-secondary border-start-0"
                onClick={handleClear}
                disabled={isLoading}
                title="Limpiar campo"
              >
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>
          
          {/* Contador de caracteres */}
          {newItem && (
            <div className="mt-2">
              <small className={`text-muted ${newItem.length > 80 ? 'text-warning' : ''}`}>
                <i className="bi bi-info-circle me-1"></i>
                {newItem.length}/100 caracteres
                {newItem.length > 80 && ' (máximo recomendado: 80)'}
              </small>
            </div>
          )}
        </div>
        
        <div className="col-md-4">
          <button
            type="submit"
            className="btn btn-gradient btn-lg w-100 d-flex align-items-center justify-content-center"
            disabled={isLoading || !newItem.trim()}
          >
            {isLoading ? (
              <>
                <span 
                  className="spinner-border spinner-border-sm me-2 spinner-custom" 
                  role="status"
                >
                  <span className="visually-hidden">Cargando...</span>
                </span>
                Agregando...
              </>
            ) : (
              <>
                <i className="bi bi-plus-circle me-2"></i>
                Agregar
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Tips de uso */}
      {!newItem && (
        <div className="mt-3">
          <small className="text-muted">
            <i className="bi bi-lightbulb me-1"></i>
            <strong>Tip:</strong> Presiona Enter para agregar rápidamente
          </small>
        </div>
      )}
    </form>
  );
};

export default AddItemForm;