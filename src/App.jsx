import { useState } from 'react';
import LaberintoCorporativo from './pages/MonopolyBoard.jsx';
import LaberintoAprendizaje from './pages/Learning.jsx';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'monopoly', 'learning'

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
          onClick={() => setCurrentView('monopoly')}
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
          onClick={() => setCurrentView('learning')}
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
      {currentView === 'home' && <HomePage />}
      {currentView === 'monopoly' && <LaberintoCorporativo />}
      {currentView === 'learning' && <LaberintoAprendizaje />}
      
      {currentView !== 'home' && (
        <button 
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-full shadow-lg transition-all duration-300 z-50"
          onClick={() => setCurrentView('home')}
        >
          Volver al inicio
        </button>
      )}
    </div>
  );
}

export default App;