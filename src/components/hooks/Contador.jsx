import { useEffect, useState, useRef } from "react";

const SPECIAL_TOPICS = {
  ESTRUCTURA: "Estructura organizacional del proyecto",
  PRODUCCION: "Función de Producción",
  MERCADEO: "Función de Mercadeo",
  FINANZAS: "Función Financiera",
  RRHH: "Función de Recursos Humanos",
  ADMIN: "Función Administrativa",
  COSTOS_ORG: "Costos organizacionales",
  COSTOS_PROC: "Costos de procedimientos"
};

const categories = {
  WALL: "#2c3e50",
  PATH: "#ecf0f1",
  START: "#2ecc71",
  GOAL: "#e84393",
  PRODUCCION: "#3498db",
  MERCADEO: "#e74c3c",
  FINANZAS: "#2ecc71",
  RRHH: "#9b59b6",
  ADMIN: "#f39c12",
  COSTOS_ORG: "#1abc9c",
  COSTOS_PROC: "#1abc9c",
  ESTRUCTURA: "#f1c40f"
};

const EMOJIS = {
  PLAYER: "🧑‍💼",
  START: "🚩",
  GOAL: "🏆"
};

const SVGs = {
  PRODUCCION: "🏭",
  MERCADEO: "📢",
  FINANZAS: "💰",
  RRHH: "👥",
  ADMIN: "📋",
  COSTOS_ORG: "📊",
  COSTOS_PROC: "📝",
  ESTRUCTURA: "🏗️"
};

const CHALLENGES = {
  PRODUCCION: [
    {
      question: "¿Qué actividad NO corresponde a Producción?",
      options: ["Control de calidad", "Diseño publicitario", "Gestión de materias primas"],
      correct: 1,
      explanation: "El diseño publicitario es parte de Mercadeo"
    }
  ],
  MERCADEO: [
    {
      question: "Para mercados internacionales, ¿qué estructura es mejor?",
      options: ["Funcional", "Geográfica", "Por producto"],
      correct: 1,
      explanation: "La estructura geográfica permite adaptación regional"
    }
  ],
  FINANZAS: [
    {
      question: "¿Qué facilita el control financiero descentralizado?",
      options: ["Estructura centralizada", "Estructura divisional", "Estructura plana"],
      correct: 1,
      explanation: "La estructura divisional permite autonomía con estándares"
    }
  ],
  RRHH: [
    {
      question: "¿Qué modelo favorece el desarrollo profesional?",
      options: ["Jerárquico tradicional", "Por proyectos con rotación", "Centralizado"],
      correct: 1,
      explanation: "La rotación en proyectos desarrolla diversas habilidades"
    }
  ],
  ADMIN: [
    {
      question: "¿Qué enfoque requiere estructura flexible?",
      options: ["Burocrático", "Gestión por procesos", "Científico"],
      correct: 1,
      explanation: "La gestión por procesos necesita flexibilidad"
    }
  ],
  COSTOS_ORG: [
    {
      question: "¿Qué estructura tiene menores costos administrativos?",
      options: ["Jerárquica", "Matricial", "Plana"],
      correct: 2,
      explanation: "Estructuras planas reducen mandos medios"
    }
  ]
};

const generateMaze = () => {
  const maze = [
    ["START", "PATH", "WALL", "PATH", "PATH", "PATH"],
    ["PATH", "PATH", "WALL", "PATH", "WALL", "PATH"],
    ["PATH", "WALL", "PATH", "PATH", "WALL", "PATH"],
    ["PATH", "PATH", "PATH", "WALL", "PATH", "PATH"],
    ["WALL", "WALL", "PATH", "WALL", "PATH", "WALL"],
    ["PATH", "PATH", "PATH", "PATH", "PATH", "GOAL"]
  ];

  const specialCells = {
    "0-3": "PRODUCCION",
    "1-5": "MERCADEO",
    "2-0": "FINANZAS",
    "3-5": "RRHH",
    "4-2": "ADMIN",
    "5-0": "COSTOS_ORG"
  };

  return { maze, specialCells };
};

export default function LaberintoCorporativo() {
  const [gameState, setGameState] = useState({
    maze: [],
    playerPos: { row: 0, col: 0 },
    specialCells: {},
    visitedTopics: {},
    score: 0
  });
  const [modal, setModal] = useState(null);
  const [win, setWin] = useState(false);
  const gameRef = useRef(null);

  useEffect(() => {
    const { maze, specialCells } = generateMaze();
    setGameState({
      maze,
      playerPos: { row: 0, col: 0 },
      specialCells,
      visitedTopics: {},
      score: 0
    });
  }, []);

  useEffect(() => {
    gameRef.current.focus();
  }, []);

  const movePlayer = (dir) => {
    if (modal || win) return;

    const { row, col } = gameState.playerPos;
    let newRow = row;
    let newCol = col;

    if (dir === "ArrowUp") newRow = Math.max(0, row - 1);
    if (dir === "ArrowDown") newRow = Math.min(5, row + 1);
    if (dir === "ArrowLeft") newCol = Math.max(0, col - 1);
    if (dir === "ArrowRight") newCol = Math.min(5, col + 1);

    if (gameState.maze[newRow][newCol] !== "WALL") {
      const key = `${newRow}-${newCol}`;
      const topic = gameState.specialCells[key];

      if (topic && !gameState.visitedTopics[topic]) {
        setModal({
          topic,
          challenge: CHALLENGES[topic][0],
          newPos: { row: newRow, col: newCol },
          prevPos: { row, col }
        });
      } else {
        setGameState(prev => ({
          ...prev,
          playerPos: { row: newRow, col: newCol }
        }));

        if (gameState.maze[newRow][newCol] === "GOAL") {
          const allVisited = Object.keys(SPECIAL_TOPICS)
            .filter(k => k !== "ESTRUCTURA" && k !== "COSTOS_PROC")
            .every(k => gameState.visitedTopics[k]);

          if (allVisited) {
            setWin(true);
          } else {
            alert("¡Debes completar todos los departamentos primero!");
            setGameState(prev => ({
              ...prev,
              playerPos: { row, col }
            }));
          }
        }
      }
    }
  };

  const handleKeyDown = (e) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      e.preventDefault();
      movePlayer(e.key);
    }
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setGameState(prev => ({
        ...prev,
        playerPos: modal.newPos,
        visitedTopics: { ...prev.visitedTopics, [modal.topic]: true },
        score: prev.score + 100
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        playerPos: modal.prevPos
      }));
    }
    setModal(null);
  };

  const resetGame = () => {
    const { maze, specialCells } = generateMaze();
    setGameState({
      maze,
      playerPos: { row: 0, col: 0 },
      specialCells,
      visitedTopics: {},
      score: 0
    });
    setWin(false);
  };

  return (
    <div
      ref={gameRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="w-screen h-screen outline-none bg-gray-100 flex flex-col"
    >
      <div className="p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Laberinto Corporativo</h1>
        <div className="flex justify-between items-center mt-2">
          <div className="text-lg font-semibold text-blue-600">Puntos: {gameState.score}</div>
          <div className="text-sm text-gray-600">
            Departamentos completados: {Object.keys(gameState.visitedTopics).length}/6
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="grid grid-cols-6 grid-rows-6 gap-2 w-full h-full max-w-2xl max-h-2xl">
          {gameState.maze.map((row, r) =>
            row.map((cell, c) => {
              const isPlayer = r === gameState.playerPos.row && c === gameState.playerPos.col;
              const key = `${r}-${c}`;
              const topic = gameState.specialCells[key];
              const type = topic || cell;
              const isVisited = topic && gameState.visitedTopics[topic];

              return (
                <div
                  key={key}
                  className={`
                    flex items-center justify-center text-3xl font-bold rounded-2xl transition-all duration-300
                    shadow-md border border-white
                    ${isVisited ? "opacity-60 grayscale" : ""}
                    ${isPlayer ? "ring-4 ring-blue-500 z-10" : ""}
                  `}
                  style={{
                    backgroundColor: categories[type] || "#bdc3c7",
                    width: "100%",
                    height: "100%"
                  }}
                >
                  {isPlayer
                    ? EMOJIS.PLAYER
                    : cell === "START"
                    ? EMOJIS.START
                    : cell === "GOAL"
                    ? EMOJIS.GOAL
                    : topic
                    ? (isVisited ? "✓" : SVGs[topic])
                    : ""}
                </div>
              );
            })
          )}
        </div>
      </div>

      {modal && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-2 text-gray-800">{SPECIAL_TOPICS[modal.topic]}</h2>
            <p className="mb-4 text-gray-700">{modal.challenge.question}</p>

            <div className="space-y-2 mb-4">
              {modal.challenge.options.map((option, index) => (
                <div 
                  key={index}
                  className="p-2 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleAnswer(index === modal.challenge.correct)}
                >
                  {option}
                </div>
              ))}
            </div>

            <div className="text-sm text-gray-500">
              Selecciona la opción correcta para avanzar
            </div>
          </div>
        </div>
      )}

      {win && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">¡Felicidades!</h2>
            <p className="mb-4 text-gray-700">
              Has completado el Laberinto Corporativo con {gameState.score} puntos.
            </p>
            <p className="mb-6 text-gray-700">
              Has aprendido sobre la estructura organizacional y sus diferentes áreas funcionales.
            </p>
            <button
              onClick={resetGame}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Jugar de nuevo
            </button>
          </div>
        </div>
      )}

      <div className="p-4 bg-white shadow-inner">
        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => movePlayer("ArrowUp")}
            className="bg-gray-200 hover:bg-gray-300 p-2 rounded"
          >
            ↑
          </button>
        </div>
        <div className="flex justify-center space-x-4 mt-2">
          <button 
            onClick={() => movePlayer("ArrowLeft")}
            className="bg-gray-200 hover:bg-gray-300 p-2 rounded"
          >
            ←
          </button>
          <button 
            onClick={() => movePlayer("ArrowDown")}
            className="bg-gray-200 hover:bg-gray-300 p-2 rounded"
          >
            ↓
          </button>
          <button 
            onClick={() => movePlayer("ArrowRight")}
            className="bg-gray-200 hover:bg-gray-300 p-2 rounded"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
