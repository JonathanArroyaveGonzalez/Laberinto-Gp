import { useState, useEffect } from 'react';
import LaberintoCorporativo from './pages/MonopolyBoard.jsx';
import LaberintoAprendizaje from './pages/Learning.jsx';
import NameInputModal from './components/NameInputModal.jsx';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'monopoly', 'learning'
  const [showNameModal, setShowNameModal] = useState(false);
  const [pendingView, setPendingView] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [showEditNameModal, setShowEditNameModal] = useState(false);

  // Retrieve player name from localStorage on component mount
  useEffect(() => {
    const storedName = localStorage.getItem('laberinto_player_name');
    if (storedName) {
      setPlayerName(storedName);
    }
  }, []);

  // Handle transitioning to a new view, checking for player name first
  const transitionToView = (view) => {
    if (playerName) {
      // If we already have a player name, go directly to the view
      setCurrentView(view);
    } else {
      // If no player name, show the modal and store the pending view
      setShowNameModal(true);
      setPendingView(view);
    }
  };

  // Handle name submission from the modal
  const handleNameSubmit = (name) => {
    // Store name in state and localStorage
    setPlayerName(name);
    localStorage.setItem('laberinto_player_name', name);
    
    // Hide the modal
    setShowNameModal(false);
    setShowEditNameModal(false);
    
    // Transition to the pending view if one exists
    if (pendingView) {
      setCurrentView(pendingView);
      setPendingView(null);
    }
  };

  // Handle modal cancellation
  const handleNameCancel = () => {
    setShowNameModal(false);
    setShowEditNameModal(false);
    setPendingView(null);
  };

  const handleEditName = () => {
    setShowEditNameModal(true);
  };

  const Header = () => (
    <div className="p-4 bg-white shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">Explorador Gestión Organizacional</h1>
      <div className="flex items-center gap-4">
        {playerName && (
          <div className="flex items-center gap-2">
            <h1 className="text-2xl text-gray-700 font-medium">🎮 Jugador:  {playerName}</h1>
            <button 
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded text-sm transition-colors duration-200 flex items-center"
              onClick={handleEditName}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Editar
            </button>
          </div>
        )}
        {currentView !== 'home' && (
          <button 
            className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-full shadow-lg transition-all duration-300"
            onClick={() => setCurrentView('home')}
          >
            Volver al inicio
          </button>
        )}
      </div>
    </div>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">Explorador Gestion Organizacional</h1>
        <p className="text-xl text-gray-600">Selecciona tu modo de aprendizaje</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
        {/* Tarjeta Laberinto Corporativo */}
        <div 
          className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex-1 cursor-pointer"
          onClick={() => transitionToView('monopoly')}
        >
          <div className="p-8 flex flex-col items-center text-center">
            <div className="text-6xl mb-6">🏢</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Laberinto Corporativo</h2>
            <p className="text-gray-600 mb-6">
              Aprende sobre estructura empresarial jugando un juego de mesa virtual
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition duration-300 transform hover:scale-105">
              Entrar
            </button>
          </div>
        </div>

        {/* Tarjeta Laberinto de Aprendizaje */}
        <div 
          className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex-1 cursor-pointer"
          onClick={() => transitionToView('learning')}
        >
          <div className="p-8 flex flex-col items-center text-center">
            <div className="text-6xl mb-6">🧠</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Laberinto de Aprendizaje</h2>
            <p className="text-gray-600 mb-6">
              Explora conceptos empresariales de forma interactiva y no lineal
            </p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-full transition duration-300 transform hover:scale-105">
              Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen">
      <Header />
      {currentView === 'home' && <HomePage />}
      {currentView === 'monopoly' && <LaberintoCorporativo playerName={playerName} />}
      {currentView === 'learning' && <LaberintoAprendizaje playerName={playerName} />}
      
      {/* Name input modal */}
      {showNameModal && (
        <NameInputModal
          onSubmit={handleNameSubmit}
          onCancel={handleNameCancel}
          title="¡Bienvenido al Laberinto!"
          submitText="Comenzar Juego"
        />
      )}
      
      {/* Edit name modal */}
      {showEditNameModal && (
        <NameInputModal
          onSubmit={handleNameSubmit}
          onCancel={handleNameCancel}
          initialName={playerName}
          title="Editar Nombre de Jugador"
          submitText="Guardar"
        />
      )}
      
    </div>
  );
}

export default App;