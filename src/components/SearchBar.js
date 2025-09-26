// src/components/SearchBar.js
import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, resultCount, totalCount }) => {
  const handleClearSearch = () => {
    onSearchChange('');
  };

  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="mb-4">
      {/* Input de búsqueda */}
      <div className="input-group input-group-lg">
        <span className="input-group-text bg-light border-end-0">
          <i className="bi bi-search text-muted"></i>
        </span>
        <input
          type="text"
          className="form-control border-start-0"
          placeholder="Buscar artículos... (ej: leche, pan, frutas)"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchTerm && (
          <button
            className="btn btn-outline-secondary border-start-0"
            onClick={handleClearSearch}
            title="Limpiar búsqueda"
          >
            <i className="bi bi-x"></i>
          </button>
        )}
      </div>
      
      {/* Información de búsqueda */}
      {searchTerm && (
        <div className="mt-2 d-flex justify-content-between align-items-center flex-wrap">
          <small className="text-muted">
            <i className="bi bi-info-circle me-1"></i>
            Buscando: "<strong>{searchTerm}</strong>"
          </small>
          <small className="text-muted">
            {resultCount === 0 ? (
              <span className="text-warning">
                <i className="bi bi-exclamation-triangle me-1"></i>
                Sin resultados
              </span>
            ) : (
              <span className="text-success">
                <i className="bi bi-check-circle me-1"></i>
                {resultCount} de {totalCount} artículo{resultCount !== 1 ? 's' : ''}
              </span>
            )}
          </small>
        </div>
      )}
      
      {/* Sugerencias cuando no hay búsqueda */}
      {!searchTerm && totalCount > 0 && (
        <div className="mt-2">
          <small className="text-muted">
            <i className="bi bi-lightbulb me-1"></i>
            <strong>Tip:</strong> Busca por nombre del artículo para encontrarlo rápidamente
          </small>
        </div>
      )}
      
      {/* Mensaje cuando no hay artículos */}
      {!searchTerm && totalCount === 0 && (
        <div className="mt-2">
          <small className="text-muted">
            <i className="bi bi-info-circle me-1"></i>
            Agrega algunos artículos para poder buscar entre ellos
          </small>
        </div>
      )}
    </div>
  );
};

export default SearchBar;