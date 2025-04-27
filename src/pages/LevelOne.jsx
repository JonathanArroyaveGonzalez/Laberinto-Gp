// ProyectoEnLlamas.jsx
import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { BookOpen, Cog, Users, ShoppingCart, DollarSign, Briefcase, Layers, Grid } from "lucide-react";

// Íconos por tema
const TOPIC_ICONS = {
  PRODUCCION: <Cog className="w-10 h-10 text-blue-600" />,
  MERCADEO: <ShoppingCart className="w-10 h-10 text-pink-500" />,
  FINANZAS: <DollarSign className="w-10 h-10 text-green-600" />,
  RRHH: <Users className="w-10 h-10 text-orange-500" />,
  ADMIN: <Briefcase className="w-10 h-10 text-purple-600" />,
  ESTRUCTURA: <Layers className="w-10 h-10 text-indigo-600" />,
  COSTOS_ORG: <Grid className="w-10 h-10 text-red-600" />,
  COSTOS_PROC: <BookOpen className="w-10 h-10 text-yellow-500" />,
};

const SPECIAL_TOPICS = {
  PRODUCCION: "Función de Producción",
  MERCADEO: "Función de Mercadeo",
  FINANZAS: "Función Financiera",
  RRHH: "Recursos Humanos",
  ADMIN: "Función Administrativa",
  ESTRUCTURA: "Estructura Organizacional",
  COSTOS_ORG: "Costos Organizacionales",
  COSTOS_PROC: "Costos de Procedimientos",
};

const LEARNING_CONTENT = {
  ESTRUCTURA: `La estructura organizacional define cómo se asignan funciones y responsabilidades para lograr los objetivos. Puede ser funcional, proyectizada o matricial.`,
  PRODUCCION: `La función de producción se encarga de transformar insumos en productos o servicios. Incluye actividades como planificación, control de calidad y gestión de materiales.`,
  MERCADEO: `La función de mercadeo se enfoca en analizar el mercado, promocionar productos y entender al cliente para mejorar las ventas.`,
  FINANZAS: `La función financiera gestiona los recursos económicos de la empresa, incluyendo presupuestos, ingresos, gastos y decisiones de inversión.`,
  RRHH: `La función de recursos humanos administra el talento humano: contratación, desarrollo profesional, clima laboral y bienestar del personal.`,
  ADMIN: `La función administrativa planifica, organiza, dirige y controla las actividades empresariales para alcanzar los objetivos.`,
  COSTOS_ORG: `Los costos organizacionales se relacionan con la estructura interna de la empresa y cómo esta afecta la eficiencia operativa.`,
  COSTOS_PROC: `Los costos de procedimientos se refieren a los gastos asociados a la implementación y gestión de procesos administrativos.`
};

const learningMode = true;

// Mapa del laberinto con paredes (1 = pared, 0 = camino)
const MAZE_LAYOUT = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// Posiciones de los temas en el laberinto
const TOPIC_POSITIONS = [
  [null, null, null, null, null, null, null, null, null],
  [null, 'ESTRUCTURA', null, null, null, null, null, 'ADMIN', null],
  [null, null, null, 'RRHH', null, null, null, null, null],
  [null, null, null, null, null, 'FINANZAS', null, null, null],
  [null, 'PRODUCCION', null, null, null, null, null, null, null],
  [null, null, null, 'MERCADEO', null, null, null, null, null],
  [null, null, null, null, null, null, null, 'COSTOS_PROC', null],
  [null, 'COSTOS_ORG', null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null]
];

const ProyectoEnLlamas = ({ playerName = "Jugador" }) => {
  const rows = MAZE_LAYOUT.length;
  const cols = MAZE_LAYOUT[0].length;
  const cellSize = Math.min(
    Math.floor((window.innerHeight * 0.7) / rows),
    Math.floor((window.innerWidth * 0.9) / cols)
  );
  
  const [maze, setMaze] = useState([]);
  const [gameState, setGameState] = useState({ 
    playerPos: { row: 7, col: 4 },  // Posición inicial
    visitedTopics: {},
    discoveredTopics: 0
  });
  const [modal, setModal] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [gameCompleted, setGameCompleted] = useState(false);

  const generateMaze = useCallback(() => {
    const maze = Array(rows).fill(null).map(() => Array(cols).fill({}));
    
    // Crear laberinto con paredes y temas
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const isWall = MAZE_LAYOUT[row][col] === 1;
        const topic = TOPIC_POSITIONS[row][col];
        maze[row][col] = { 
          isWall,
          topic: isWall ? null : topic 
        };
      }
    }
    
    return maze;
  }, [rows, cols]);

  const movePlayer = useCallback((dRow, dCol) => {
    if (modal || gameCompleted) return;
    
    const { row, col } = gameState.playerPos;
    const newRow = row + dRow;
    const newCol = col + dCol;
    
    // Verificar límites y paredes
    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
      const cell = maze[newRow][newCol];
      
      if (cell.isWall) {
        // No se puede mover a una pared
        return;
      }
      
      const topic = cell?.topic;
      
      if (topic && !gameState.visitedTopics[topic]) {
        if (learningMode) {
          setModal({ 
            topic, 
            explanation: LEARNING_CONTENT[topic],
            newPos: { row: newRow, col: newCol },
            isLastTopic: gameState.discoveredTopics === Object.keys(SPECIAL_TOPICS).length - 1
          });
        }
      } else {
        setGameState(prev => ({ ...prev, playerPos: { row: newRow, col: newCol } }));
      }
    }
  }, [gameState, maze, modal, gameCompleted, rows, cols]);

  const handleModalClose = () => {
    const newVisited = { ...gameState.visitedTopics, [modal.topic]: true };
    const discoveredCount = Object.keys(newVisited).length;
    
    setGameState(prev => ({
      ...prev,
      playerPos: modal.newPos,
      visitedTopics: newVisited,
      discoveredTopics: discoveredCount
    }));
    
    if (modal.isLastTopic) {
      setGameCompleted(true);
    }
    
    setModal(null);
  };

  useEffect(() => {
    setMaze(generateMaze());
    
    const handleKeyDown = (e) => {
      if (!modal && !gameCompleted) {
        const directions = { 
          ArrowUp: [-1, 0], 
          ArrowDown: [1, 0], 
          ArrowLeft: [0, -1], 
          ArrowRight: [0, 1],
          w: [-1, 0],
          s: [1, 0],
          a: [0, -1],
          d: [0, 1]
        };
        if (e.key in directions) {
          movePlayer(...directions[e.key]);
        }
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modal, movePlayer, generateMaze, gameCompleted]);

  const resetGame = () => {
    setMaze(generateMaze());
    setGameState({ 
      playerPos: { row: 7, col: 4 },
      visitedTopics: {},
      discoveredTopics: 0
    });
    setGameCompleted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 flex flex-col items-center justify-start">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-4">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-gray-800">🧩 Laberinto Corporativo</h1>
            <p className="text-gray-600">Modo Aprendizaje - Descubre todos los temas empresariales</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium flex items-center">
              <span className="mr-1">👤</span>
              <span>{playerName}</span>
            </div>
            <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
              Descubiertos: {gameState.discoveredTopics}/{Object.keys(SPECIAL_TOPICS).length}
            </div>
          </div>
        </div>
        
        {showInstructions && (
          <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-blue-800">Cómo jugar:</h3>
              <button 
                onClick={() => setShowInstructions(false)}
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
              <li>Usa las teclas de flecha (↑ ↓ ← →) o WASD para moverte</li>
              <li>Las paredes grises oscuras no se pueden atravesar</li>
              <li>Encuentra todos los iconos para aprender sobre temas empresariales</li>
              <li>El objetivo es descubrir los 8 temas organizacionales</li>
            </ul>
          </div>
        )}
        
        {!showInstructions && (
          <button 
            onClick={() => setShowInstructions(true)}
            className="mb-6 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Mostrar instrucciones
          </button>
        )}
        
        <div 
          className="grid mx-auto mb-8 gap-1 bg-gray-200 p-2 rounded-lg"
          style={{ 
            gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${rows}, ${cellSize}px)`
          }}
        >
          {maze.map((row, rIdx) =>
            row.map((cell, cIdx) => {
              const isPlayer = gameState.playerPos.row === rIdx && gameState.playerPos.col === cIdx;
              const isVisited = cell.topic && gameState.visitedTopics[cell.topic];
              
              return (
                <div
                  key={`${rIdx}-${cIdx}`}
                  className={`flex items-center justify-center relative transition-all duration-200
                    ${cell.isWall ? 'bg-gray-700 cursor-not-allowed' : 
                     isPlayer ? 'bg-yellow-100 border-2 border-yellow-400 shadow-md' : 
                     'bg-white border border-gray-300 hover:border-blue-300'}
                    ${isVisited ? 'opacity-80' : ''}
                  `}
                  style={{
                    width: `${cellSize}px`,
                    height: `${cellSize}px`,
                    borderRadius: cell.isWall ? '4px' : '8px'
                  }}
                >
                  {cell.topic && (
                    <>
                      <div className={`p-2 rounded-full ${isVisited ? 'bg-gray-100' : 'bg-white shadow-sm'}`}>
                        {TOPIC_ICONS[cell.topic]}
                      </div>
                      {isVisited && (
                        <div className="absolute top-1 right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                      )}
                    </>
                  )}
                  {isPlayer && (
                    <div className="absolute inset-0 flex items-center justify-center text-3xl animate-bounce">
                      🔥
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
          <div className="flex justify-center space-x-3">
            <button
              onClick={() => movePlayer(-1, 0)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-sm transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              <span className="ml-2">Arriba</span>
            </button>
          </div>
          <div className="flex justify-center space-x-3">
            <button
              onClick={() => movePlayer(0, -1)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-sm transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2">Izquierda</span>
            </button>
            <button
              onClick={() => movePlayer(0, 1)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-sm transition-colors flex items-center"
            >
              <span className="mr-2">Derecha</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="flex justify-center space-x-3">
            <button
              onClick={() => movePlayer(1, 0)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-sm transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span className="ml-2">Abajo</span>
            </button>
          </div>
        </div>
        
        <button
          onClick={resetGame}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg shadow-sm transition-colors flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reiniciar juego
        </button>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md border-t-4 border-blue-500">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {SPECIAL_TOPICS[modal.topic]}
              </h2>
              <div className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-full">
                {React.cloneElement(TOPIC_ICONS[modal.topic], { className: "w-6 h-6" })}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-gray-700">{modal.explanation}</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleModalClose}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-md flex items-center"
              >
                {modal.isLastTopic ? "¡Completado!" : "Entendido"}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {gameCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center border-t-4 border-green-500">
            <div className="text-7xl mb-6 animate-bounce">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">¡Felicidades!</h2>
            <p className="mb-6 text-gray-700 text-lg">Has completado el Laberinto Corporativo y descubierto todos los temas empresariales.</p>
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <p className="text-green-800 font-medium">Ahora tienes un mejor entendimiento de la estructura organizacional.</p>
            </div>
            <button
              onClick={resetGame}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Jugar de nuevo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

ProyectoEnLlamas.propTypes = {
  playerName: PropTypes.string
};

export default ProyectoEnLlamas;
