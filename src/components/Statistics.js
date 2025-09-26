// src/components/Statistics.js
import React from 'react';

const Statistics = ({ stats }) => {
  // Calcular progreso
  const progressPercentage = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  return (
    <div className="mb-4">
      {/* TARJETAS DE ESTADÍSTICAS */}
      <div className="row text-center mb-3">
        {/* Total */}
        <div className="col-4">
          <div className="card stats-card h-100 bg-light">
            <div className="card-body py-3">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <i className="bi bi-list-ul text-primary me-2" style={{ fontSize: '1.5rem' }}></i>
                <h3 className="text-primary mb-0">{stats.total}</h3>
              </div>
              <small className="text-muted fw-bold">TOTAL</small>
            </div>
          </div>
        </div>

        {/* Completados */}
        <div className="col-4">
          <div className="card stats-card h-100 bg-success text-white">
            <div className="card-body py-3">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <i className="bi bi-check-circle-fill me-2" style={{ fontSize: '1.5rem' }}></i>
                <h3 className="mb-0">{stats.completed}</h3>
              </div>
              <small className="fw-bold">COMPRADOS</small>
            </div>
          </div>
        </div>

        {/* Pendientes */}
        <div className="col-4">
          <div className="card stats-card h-100 bg-warning text-white">
            <div className="card-body py-3">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <i className="bi bi-clock-fill me-2" style={{ fontSize: '1.5rem' }}></i>
                <h3 className="mb-0">{stats.pending}</h3>
              </div>
              <small className="fw-bold">PENDIENTES</small>
            </div>
          </div>
        </div>
      </div>

      {/* BARRA DE PROGRESO */}
      {stats.total > 0 && (
        <div className="card bg-light">
          <div className="card-body py-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <small className="text-muted fw-bold">
                <i className="bi bi-graph-up me-1"></i>
                PROGRESO DE COMPRAS
              </small>
              <small className="text-muted fw-bold">
                {progressPercentage}%
              </small>
            </div>
            
            <div className="progress progress-custom">
              <div
                className="progress-bar progress-bar-custom"
                role="progressbar"
                style={{ width: `${progressPercentage}%` }}
                aria-valuenow={progressPercentage}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            
            {/* Mensaje motivacional */}
            <div className="mt-2 text-center">
              <small className="text-muted">
                {progressPercentage === 100 ? (
                  <>
                    <i className="bi bi-trophy-fill text-warning me-1"></i>
                    ¡Felicidades! Has completado toda tu lista
                  </>
                ) : progressPercentage >= 75 ? (
                  <>
                    <i className="bi bi-emoji-smile text-success me-1"></i>
                    ¡Muy bien! Ya casi terminas
                  </>
                ) : progressPercentage >= 50 ? (
                  <>
                    <i className="bi bi-emoji-neutral text-info me-1"></i>
                    Vas por la mitad, ¡sigue así!
                  </>
                ) : progressPercentage > 0 ? (
                  <>
                    <i className="bi bi-emoji-wink text-primary me-1"></i>
                    ¡Buen comienzo! Continúa comprando
                  </>
                ) : (
                  <>
                    <i className="bi bi-cart text-muted me-1"></i>
                    ¡Es hora de ir de compras!
                  </>
                )}
              </small>
            </div>
          </div>
        </div>
      )}

      {/* MENSAJE CUANDO NO HAY ITEMS */}
      {stats.total === 0 && (
        <div className="card bg-light">
          <div className="card-body text-center py-4">
            <i className="bi bi-cart-plus text-muted" style={{ fontSize: '2rem' }}></i>
            <h6 className="text-muted mt-2 mb-0">
              Agrega artículos para ver tus estadísticas
            </h6>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;