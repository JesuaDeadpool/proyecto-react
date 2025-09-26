// src/components/ItemCard.js
import React, { useState } from 'react';

const ItemCard = ({
  item,
  index,
  editingId,
  onToggleCompleted,
  onStartEdit,
  onEditItem,
  onDeleteItem
}) => {
  const [editText, setEditText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStartEdit = () => {
    setEditText(item.text);
    onStartEdit(item.id);
  };

  const handleSaveEdit = () => {
    const success = onEditItem(item.id, editText);
    if (success) {
      setEditText('');
    }
  };

  const handleCancelEdit = () => {
    setEditText('');
    onStartEdit(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancelEdit();
    }
  };

  const handleToggleCompleted = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onToggleCompleted(item.id);
      setIsAnimating(false);
    }, 150);
  };

  const handleDelete = () => {
    onDeleteItem(item.id);
  };

  const isEditing = editingId === item.id;
  const isNewItem = new Date() - new Date(item.createdAt) < 300000; // 5 minutos

  return (
    <div
      className={`list-group-item d-flex align-items-center py-3 list-item fade-in ${
        item.completed ? 'completed-item' : ''
      } ${isAnimating ? 'fade-out' : ''}`}
      style={{
        animationDelay: `${index * 0.1}s`,
        transition: 'all 0.3s ease',
        borderLeft: item.completed ? '4px solid #28a745' : '4px solid transparent'
      }}
    >
      {/* CHECKBOX PERSONALIZADO */}
      <div className="me-3">
        <div
          className={`custom-checkbox ${item.completed ? 'checked' : ''}`}
          onClick={handleToggleCompleted}
          role="checkbox"
          aria-checked={item.completed}
          tabIndex="0"
          title={item.completed ? 'Marcar como pendiente' : 'Marcar como completado'}
        >
          {item.completed && <i className="bi bi-check fw-bold"></i>}
        </div>
      </div>

      {/* CONTENIDO DEL ARTÍCULO */}
      <div className="flex-grow-1 me-3">
        {isEditing ? (
          // MODO EDICIÓN
          <div className="d-flex gap-2 align-items-center">
            <input
              type="text"
              className="form-control"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nombre del artículo..."
              autoFocus
              maxLength="100"
            />
            <div className="d-flex gap-1">
              <button
                className="btn btn-success btn-sm"
                onClick={handleSaveEdit}
                disabled={!editText.trim()}
                title="Guardar cambios (Enter)"
              >
                <i className="bi bi-check"></i>
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleCancelEdit}
                title="Cancelar edición (Escape)"
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
          </div>
        ) : (
          // MODO VISUALIZACIÓN
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center">
              <span
                className={`${
                  item.completed
                    ? 'text-decoration-line-through text-muted'
                    : 'text-dark'
                }`}
                style={{
                  fontSize: '1.1rem',
                  wordBreak: 'break-word',
                  lineHeight: '1.4'
                }}
              >
                {item.text}
              </span>
              
              {/* Badge para items nuevos */}
              {!item.completed && isNewItem && (
                <span className="badge bg-info ms-2 badge-new" title="Artículo recién agregado">
                  <i className="bi bi-star-fill me-1"></i>
                  Nuevo
                </span>
              )}
            </div>
            
            {/* Información adicional */}
            <small className="text-muted mt-1">
              <i className="bi bi-clock me-1"></i>
              Agregado: {new Date(item.createdAt).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
              })}
              {item.completed && (
                <span className="ms-3">
                  <i className="bi bi-check-circle-fill text-success me-1"></i>
                  Completado
                </span>
              )}
            </small>
          </div>
        )}
      </div>

      {/* ACCIONES */}
      {!isEditing && (
        <div className="d-flex gap-2">
          {/* Botón Editar */}
          <button
            className="btn btn-outline-warning btn-sm"
            onClick={handleStartEdit}
            disabled={item.completed}
            title={
              item.completed 
                ? 'No se puede editar un artículo completado' 
                : 'Editar artículo'
            }
          >
            <i className="bi bi-pencil"></i>
          </button>

          {/* Botón Eliminar */}
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={handleDelete}
            title="Eliminar artículo"
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemCard;