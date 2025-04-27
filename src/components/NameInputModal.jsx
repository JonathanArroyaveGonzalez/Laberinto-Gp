import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * A modal component for user name input
 * @param {Object} props
 * @param {Function} props.onSubmit - Function called with the user name on form submission
 * @param {Function} props.onCancel - Function called when user cancels the input
 * @param {string} [props.initialName=''] - Initial value for the name input
 * @param {string} [props.title='Ingresa tu nombre'] - Modal title
 * @param {string} [props.submitText='Comenzar'] - Text for the submit button
 */
const NameInputModal = ({ 
  onSubmit, 
  onCancel, 
  initialName = '', 
  title = 'Ingresa tu nombre', 
  submitText = 'Comenzar' 
}) => {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate name
    if (!name.trim()) {
      setError('Por favor, ingresa tu nombre');
      return;
    }
    
    onSubmit(name.trim());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md border-t-4 border-indigo-500 animate-fadeIn">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del jugador
              </label>
              <input
                type="text"
                id="playerName"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                className={`w-full px-4 py-3 rounded-lg border ${
                  error ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="Escribe tu nombre aquí"
                autoFocus
              />
              {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
              )}
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow"
              >
                {submitText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

NameInputModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  initialName: PropTypes.string,
  title: PropTypes.string,
  submitText: PropTypes.string,
};

export default NameInputModal;

