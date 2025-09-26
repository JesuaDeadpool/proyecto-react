// src/utils/alerts.js
import Swal from 'sweetalert2';

// Configuración base para SweetAlert2
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

// Alertas de éxito
export const showSuccessAlert = (title, text) => {
  Toast.fire({
    icon: 'success',
    title: title,
    text: text
  });
};

// Alertas de error
export const showErrorAlert = (title, text) => {
  Toast.fire({
    icon: 'error',
    title: title,
    text: text
  });
};

// Alertas de información
export const showInfoAlert = (title, text) => {
  Toast.fire({
    icon: 'info',
    title: title,
    text: text
  });
};

// Confirmación para eliminar
export const showDeleteConfirmation = (title = '¿Estás seguro?') => {
  return Swal.fire({
    title: title,
    text: "No podrás revertir esta acción",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true
  });
};