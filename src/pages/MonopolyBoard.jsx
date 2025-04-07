import { useEffect, useState, useRef, useCallback } from "react";

const SPECIAL_TOPICS = {
  ESTRUCTURA: "Estructura organizacional del proyecto",
  PRODUCCION: "Función de Producción",
  MERCADEO: "Función de Mercadeo",
  FINANZAS: "Función Financiera",
  RRHH: "Función de Recursos Humanos",
  ADMIN: "Función Administrativa",
  COSTOS_ORG: "Incidencia de los costos en aspectos organizacionales",
  COSTOS_PROC: "Incidencia de los costos de sistemas y procedimientos administrativos"
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
  COSTOS_PROC: "#e67e22",
  ESTRUCTURA: "#f1c40f"
};

const EMOJIS = {
  PLAYER: "🧑‍💼",
  START: "🚩",
  GOAL: "🏆",
  ENEMY: "⚠️",
  RESOURCE: "💼"
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

// Desafíos ampliados con múltiples preguntas por tema
const CHALLENGES = {
  PRODUCCION: [
    {
      question: "¿Qué actividad NO corresponde a Producción?",
      options: ["Control de calidad", "Diseño publicitario", "Gestión de materias primas"],
      correct: 1,
      explanation: "El diseño publicitario es parte de Mercadeo, no de la función de Producción."
    },
    {
      question: "¿Qué estructura organizacional favorece la eficiencia en producción?",
      options: ["Matricial", "Por procesos", "Funcional"],
      correct: 1,
      explanation: "La estructura por procesos optimiza el flujo productivo evitando silos departamentales."
    },
    {
      question: "El sistema Just-In-Time está más relacionado con:",
      options: ["Estructura vertical", "Estructura flexible", "Estructura centralizada"],
      correct: 1,
      explanation: "El JIT requiere estructuras flexibles para responder ágilmente a la demanda."
    }
  ],
  MERCADEO: [
    {
      question: "Para mercados internacionales, ¿qué estructura es mejor?",
      options: ["Funcional", "Geográfica", "Por producto"],
      correct: 1,
      explanation: "La estructura geográfica permite mejor adaptación a mercados regionales."
    },
    {
      question: "¿Qué tipo de organización facilita el desarrollo de nuevos productos?",
      options: ["Burocrática", "Por proyectos", "Jerárquica tradicional"],
      correct: 1,
      explanation: "La estructura por proyectos permite equipos multidisciplinarios enfocados en innovación."
    },
    {
      question: "¿Qué enfoque organizacional requiere Mercadeo Digital?",
      options: ["Centralizado", "Ágil", "Mecanicista"],
      correct: 1,
      explanation: "El enfoque ágil permite adaptarse rápidamente a cambios en tendencias digitales."
    }
  ],
  FINANZAS: [
    {
      question: "¿Qué facilita el control financiero descentralizado?",
      options: ["Estructura centralizada", "Estructura divisional", "Estructura plana"],
      correct: 1,
      explanation: "La estructura divisional permite autonomía con estándares compartidos."
    },
    {
      question: "¿Qué estructura permite mejor asignación de recursos?",
      options: ["Burocrática", "Matricial", "Funcional simple"],
      correct: 1,
      explanation: "La estructura matricial permite balancear necesidades transversales y departamentales."
    },
    {
      question: "¿Qué impacto tiene la estructura horizontal en costos financieros?",
      options: ["Mayor overhead", "Menores costos administrativos", "No tiene impacto"],
      correct: 1,
      explanation: "Las estructuras horizontales reducen capas de gestión y costos administrativos."
    }
  ],
  RRHH: [
    {
      question: "¿Qué modelo favorece el desarrollo profesional?",
      options: ["Jerárquico tradicional", "Por proyectos con rotación", "Centralizado"],
      correct: 1,
      explanation: "La rotación en proyectos desarrolla diversas habilidades y competencias."
    },
    {
      question: "¿Qué tipo de estructura facilita la retención de talento?",
      options: ["Piramidal rígida", "Organización que aprende", "Burocrática"],
      correct: 1,
      explanation: "Las organizaciones que aprenden fomentan el crecimiento y satisfacción profesional."
    },
    {
      question: "La gestión del conocimiento se potencia mejor en estructuras:",
      options: ["Verticales", "Colaborativas en red", "Silos departamentales"],
      correct: 1,
      explanation: "Las redes colaborativas facilitan el intercambio de conocimiento transversal."
    }
  ],
  ADMIN: [
    {
      question: "¿Qué enfoque requiere estructura flexible?",
      options: ["Burocrático", "Gestión por procesos", "Científico"],
      correct: 1,
      explanation: "La gestión por procesos necesita flexibilidad entre departamentos."
    },
    {
      question: "¿Qué tipo de autoridad predomina en estructuras matriciales?",
      options: ["Lineal", "Dual", "Centralizada"],
      correct: 1,
      explanation: "En matrices existe autoridad dual: funcional y de proyecto."
    },
    {
      question: "¿Qué estructura facilita mejor la toma de decisiones rápidas?",
      options: ["Comités múltiples", "Descentralizada", "Jerárquica tradicional"],
      correct: 1,
      explanation: "Las estructuras descentralizadas permiten decisiones autónomas más ágiles."
    }
  ],
  COSTOS_ORG: [
    {
      question: "¿Qué estructura tiene menores costos administrativos?",
      options: ["Jerárquica", "Matricial", "Plana"],
      correct: 2,
      explanation: "Las estructuras planas reducen mandos medios y overhead administrativo."
    },
    {
      question: "¿Qué enfoque genera mayores costos de coordinación?",
      options: ["Centralizado", "Descentralizado", "Híbrido"],
      correct: 1,
      explanation: "La descentralización aumenta costos de coordinación aunque reduce otros costos."
    },
    {
      question: "¿Qué impacto tiene la cultura organizacional en los costos?",
      options: ["No afecta", "Impacto indirecto", "Impacto directo significativo"],
      correct: 2,
      explanation: "La cultura afecta directamente productividad, rotación y costos operativos."
    }
  ],
  COSTOS_PROC: [
    {
      question: "¿Qué mejora la relación costo-eficiencia en procesos?",
      options: ["Mayor control", "Automatización", "Más supervisión"],
      correct: 1,
      explanation: "La automatización reduce errores y optimiza recursos en procedimientos administrativos."
    },
    {
      question: "¿Qué estructura facilita la reingeniería de procesos?",
      options: ["Jerárquica tradicional", "Horizontal por procesos", "Vertical funcional"],
      correct: 1,
      explanation: "Las estructuras horizontales están orientadas a los procesos, no a las funciones."
    },
    {
      question: "¿Qué factor aumenta los costos de transacción internos?",
      options: ["Colaboración directa", "Sistemas integrados", "Procedimientos burocráticos"],
      correct: 2,
      explanation: "La burocracia incrementa pasos y aprobaciones, aumentando costos transaccionales."
    }
  ],
  ESTRUCTURA: [
    {
      question: "¿Qué estructura es más adecuada para entornos dinámicos?",
      options: ["Mecanicista", "Orgánica", "Funcional rígida"],
      correct: 1,
      explanation: "Las estructuras orgánicas son flexibles y adaptables al cambio constante."
    },
    {
      question: "¿Qué determina principalmente la estructura organizacional?",
      options: ["Número de empleados", "Estrategia organizacional", "Presupuesto disponible"],
      correct: 1,
      explanation: "La estructura debe alinearse con la estrategia para apoyar los objetivos."
    },
    {
      question: "¿Qué enfoque facilita la innovación organizacional?",
      options: ["Adhocracias flexibles", "Burocracia profesional", "Estructura divisional"],
      correct: 0,
      explanation: "Las adhocracias permiten equipos fluidos y experimentación para innovar."
    }
  ]
};

// Generador de laberinto mejorado - más grande y con más elementos
const generateMaze = (difficulty = 'normal') => {
  // Tamaños según dificultad
  const sizes = {
    'easy': 6,
    'normal': 8,
    'hard': 10
  };
  
  const size = sizes[difficulty];
  
  // Crear laberinto base vacío
  const maze = Array(size).fill().map(() => Array(size).fill("PATH"));
  
  // Generar paredes aleatorias (30% de las celdas)
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      // Evitar colocar paredes en la entrada y salida
      if ((i === 0 && j === 0) || (i === size-1 && j === size-1)) continue;
      
      if (Math.random() < 0.3) {
        maze[i][j] = "WALL";
      }
    }
  }
  
  // Asegurar que hay un camino válido de inicio a fin usando BFS
  const createPath = () => {
    maze[0][0] = "START";
    maze[size-1][size-1] = "GOAL";
    
    // Usamos BFS para verificar y crear un camino válido
    const queue = [{row: 0, col: 0, path: []}];
    const visited = new Set(["0-0"]);
    
    while (queue.length > 0) {
      const {row, col, path} = queue.shift();
      
      if (row === size-1 && col === size-1) {
        // Tenemos un camino, aseguremos que sea transitable
        path.forEach(pos => {
          const [r, c] = pos.split('-').map(Number);
          maze[r][c] = "PATH";
        });
        return true;
      }
      
      const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        
        if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
          const key = `${newRow}-${newCol}`;
          if (!visited.has(key)) {
            visited.add(key);
            queue.push({
              row: newRow, 
              col: newCol, 
              path: [...path, key]
            });
          }
        }
      }
    }
    
    // Si no hay camino, intentamos de nuevo
    return false;
  };
  
  // Intentar crear un camino hasta 10 veces
  let pathCreated = false;
  for (let attempt = 0; attempt < 10 && !pathCreated; attempt++) {
    pathCreated = createPath();
    if (!pathCreated) {
      // Reducir paredes y reintentar
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (maze[i][j] === "WALL" && Math.random() < 0.4) {
            maze[i][j] = "PATH";
          }
        }
      }
    }
  }
  
  // Colocar temas especiales
  const topics = Object.keys(SPECIAL_TOPICS);
  const specialCells = {};
  const usedCells = new Set(["0-0", `${size-1}-${size-1}`]);
  
  // Distribuir todos los temas
  topics.forEach(topic => {
    let placed = false;
    while (!placed) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      const key = `${row}-${col}`;
      
      if (!usedCells.has(key) && maze[row][col] === "PATH") {
        specialCells[key] = topic;
        usedCells.add(key);
        placed = true;
      }
    }
  });
  
  // Añadir recursos bonus
  const resources = [];
  for (let i = 0; i < 3; i++) {
    let placed = false;
    while (!placed) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      const key = `${row}-${col}`;
      
      if (!usedCells.has(key) && maze[row][col] === "PATH") {
        resources.push(key);
        usedCells.add(key);
        placed = true;
      }
    }
  }
  
  // Añadir obstáculos móviles (enemigos)
  const enemies = [];
  for (let i = 0; i < Math.floor(size/3); i++) {
    let placed = false;
    while (!placed) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      const key = `${row}-${col}`;
      
      if (!usedCells.has(key) && maze[row][col] === "PATH") {
        enemies.push({row, col, direction: Math.floor(Math.random() * 4)});
        usedCells.add(key);
        placed = true;
      }
    }
  }
  
  return { maze, specialCells, resources, enemies, size };
};

export default function LaberintoCorporativo() {
  const [difficulty, setDifficulty] = useState('normal');
  const [gameState, setGameState] = useState({
    maze: [],
    playerPos: { row: 0, col: 0 },
    specialCells: {},
    resources: [],
    enemies: [],
    visitedTopics: {},
    score: 0,
    lives: 3,
    time: 180, // 3 minutos
    size: 8
  });
  
  const [modal, setModal] = useState(null);
  const [win, setWin] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [paused, setPaused] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [knowledgeBase, setKnowledgeBase] = useState({});
  
  const gameRef = useRef(null);
  const timerRef = useRef(null);
  const enemyTimerRef = useRef(null);

    const moveEnemies = useCallback(() => {
    setGameState(prev => {
      const newEnemies = prev.enemies.map(enemy => {
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // arriba, abajo, izq, der
        let newDirection = enemy.direction;
        
        // 20% de probabilidad de cambiar dirección
        if (Math.random() < 0.2) {
          newDirection = Math.floor(Math.random() * 4);
        }
        
        const [dr, dc] = directions[newDirection];
        let newRow = enemy.row + dr;
        let newCol = enemy.col + dc;
        
        // Verificar límites y paredes
        if (
          newRow >= 0 && newRow < prev.size && 
          newCol >= 0 && newCol < prev.size &&
          prev.maze[newRow][newCol] !== "WALL"
        ) {
          // Verificar si hay otro enemigo en esa posición
          const enemyCollision = prev.enemies.some(
            e => e !== enemy && e.row === newRow && e.col === newCol
          );
          
          if (!enemyCollision) {
            return { ...enemy, row: newRow, col: newCol, direction: newDirection };
          }
        }
        
        // Si no puede moverse, cambiar dirección
        return { ...enemy, direction: (newDirection + 1) % 4 };
      });
      
      // Verificar si algún enemigo choca con el jugador
      const playerHit = newEnemies.some(
        e => e.row === prev.playerPos.row && e.col === prev.playerPos.col
      );
      
      if (playerHit && prev.lives > 0) {
        // Restar vida y mover al jugador a posición inicial
        return {
          ...prev,
          enemies: newEnemies,
          playerPos: { row: 0, col: 0 },
          lives: prev.lives - 1
        };
      } else if (playerHit && prev.lives <= 1) {
        // Game over si no quedan vidas
        setTimeout(() => handleGameOver(), 100);
        return {
          ...prev,
          enemies: newEnemies,
          lives: 0
        };
      }
      
      return {
        ...prev,
        enemies: newEnemies
      };
    });
  }, []);

  // Iniciar juego
  useEffect(() => {
    startNewGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  // Manejar el timer del juego
  useEffect(() => {
    if (gameState.time <= 0 && !win && !gameOver && !paused) {
      handleGameOver();
    }
    
    if (!win && !gameOver && !paused && gameState.time > 0) {
      timerRef.current = setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          time: prev.time - 1
        }));
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [gameState.time, win, gameOver, paused]);

  // Mover enemigos
  useEffect(() => {
    if (!win && !gameOver && !paused && gameState.enemies.length > 0) {
      enemyTimerRef.current = setInterval(() => {
        moveEnemies();
      }, 1000);
    }
    
    return () => {
      if (enemyTimerRef.current) clearInterval(enemyTimerRef.current);
    };
  }, [win, gameOver, paused, gameState.enemies.length, moveEnemies]);

  // Mantener foco en el juego
  useEffect(() => {
    if (gameRef.current && !modal && !win && !gameOver && !showHelp) {
      gameRef.current.focus();
    }
  }, [modal, win, gameOver, showHelp]);
  
  const startNewGame = () => {
    const { maze, specialCells, resources, enemies, size } = generateMaze(difficulty);
    
    setGameState({
      maze,
      playerPos: { row: 0, col: 0 },
      specialCells,
      resources,
      enemies,
      visitedTopics: {},
      score: 0,
      lives: 3,
      time: difficulty === 'easy' ? 240 : difficulty === 'normal' ? 180 : 120,
      size
    });
    
    setWin(false);
    setGameOver(false);
    setPaused(false);
  };
  


  const handleGameOver = () => {
    setGameOver(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (enemyTimerRef.current) clearInterval(enemyTimerRef.current);
  };

  const movePlayer = (dir) => {
    if (modal || win || gameOver || paused) return;

    const { row, col } = gameState.playerPos;
    let newRow = row;
    let newCol = col;

    if (dir === "ArrowUp") newRow = Math.max(0, row - 1);
    if (dir === "ArrowDown") newRow = Math.min(gameState.size - 1, row + 1);
    if (dir === "ArrowLeft") newCol = Math.max(0, col - 1);
    if (dir === "ArrowRight") newCol = Math.min(gameState.size - 1, col + 1);

    if (gameState.maze[newRow][newCol] !== "WALL") {
      const key = `${newRow}-${newCol}`;
      const topic = gameState.specialCells[key];
      
      // Comprobar si hay un enemigo en la nueva posición
      const enemyHit = gameState.enemies.some(e => e.row === newRow && e.col === newCol);
      
      if (enemyHit) {
        if (gameState.lives > 1) {
          setGameState(prev => ({
            ...prev,
            playerPos: { row: 0, col: 0 }, // Enviar jugador al inicio
            lives: prev.lives - 1
          }));
        } else {
          setGameState(prev => ({
            ...prev,
            lives: 0
          }));
          handleGameOver();
        }
        return;
      }
      
      // Comprobar si hay un recurso en la nueva posición
      const resourceIndex = gameState.resources.indexOf(key);
      if (resourceIndex !== -1) {
        const newResources = [...gameState.resources];
        newResources.splice(resourceIndex, 1);
        
        // Bonificación aleatoria
        const bonusType = Math.floor(Math.random() * 3);
        let bonusMessage = "";
        
        if (bonusType === 0) {
          // Bonus de tiempo
          bonusMessage = "¡Tiempo extra! +30 segundos";
          setGameState(prev => ({
            ...prev,
            playerPos: { row: newRow, col: newCol },
            resources: newResources,
            time: prev.time + 30,
            score: prev.score + 50
          }));
        } else if (bonusType === 1) {
          // Bonus de vida
          bonusMessage = "¡Vida extra!";
          setGameState(prev => ({
            ...prev,
            playerPos: { row: newRow, col: newCol },
            resources: newResources,
            lives: Math.min(prev.lives + 1, 5),
            score: prev.score + 50
          }));
        } else {
          // Bonus de puntos
          bonusMessage = "¡100 puntos extra!";
          setGameState(prev => ({
            ...prev,
            playerPos: { row: newRow, col: newCol },
            resources: newResources,
            score: prev.score + 150
          }));
        }
        
        // Mostrar mensaje de bonus
        setModal({
          type: "bonus",
          message: bonusMessage
        });
        
        setTimeout(() => {
          setModal(null);
        }, 1500);
        
        return;
      }

      // Comprobar si es una celda de tema especial
      if (topic && !gameState.visitedTopics[topic]) {
        const challengeIndex = Math.floor(Math.random() * CHALLENGES[topic].length);
        setModal({
          type: "challenge",
          topic,
          challenge: CHALLENGES[topic][challengeIndex],
          newPos: { row: newRow, col: newCol },
          prevPos: { row, col }
        });
      } else {
        setGameState(prev => ({
          ...prev,
          playerPos: { row: newRow, col: newCol }
        }));

        // Comprobar si llegó a la meta
        if (gameState.maze[newRow][newCol] === "GOAL") {
          const requiredTopics = Object.keys(SPECIAL_TOPICS);
          const visitedCount = Object.keys(gameState.visitedTopics).length;
          const totalRequired = requiredTopics.length;
          
          if (visitedCount >= totalRequired * 0.75) { // 75% de temas visitados para ganar
            handleWin();
          } else {
            alert(`¡Debes completar al menos ${Math.ceil(totalRequired * 0.75)} departamentos antes de finalizar!`);
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
    } else if (e.key === "p" || e.key === "P") {
      togglePause();
    } else if (e.key === "h" || e.key === "H") {
      setShowHelp(prev => !prev);
    }
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      // Guardar conocimiento adquirido
      setKnowledgeBase(prev => ({
        ...prev,
        [modal.topic]: [...(prev[modal.topic] || []), {
          question: modal.challenge.question,
          correctAnswer: modal.challenge.options[modal.challenge.correct],
          explanation: modal.challenge.explanation
        }]
      }));
      
      setGameState(prev => ({
        ...prev,
        playerPos: modal.newPos,
        visitedTopics: { ...prev.visitedTopics, [modal.topic]: true },
        score: prev.score + 100,
        // Bonificación de tiempo por respuesta correcta
        time: prev.time + 15
      }));
      
      // Mostrar explicación
      setModal({
        type: "explanation",
        topic: modal.topic,
        explanation: modal.challenge.explanation
      });
      
      setTimeout(() => {
        setModal(null);
      }, 2500);
    } else {
      setGameState(prev => ({
        ...prev,
        playerPos: modal.prevPos,
        // Penalización de tiempo por respuesta incorrecta
        time: Math.max(0, prev.time - 10)
      }));
      
      setModal(null);
    }
  };

  const handleWin = () => {
    // Calcular bonus por tiempo restante
    const timeBonus = gameState.time * 5;
    // Calcular bonus por temas visitados
    const topicsBonus = Object.keys(gameState.visitedTopics).length * 100;
    
    setGameState(prev => ({
      ...prev,
      score: prev.score + timeBonus + topicsBonus
    }));
    
    setWin(true);
    
    // Subir de nivel si corresponde
    if (currentLevel < 3) {
      setTimeout(() => {
        setCurrentLevel(prev => prev + 1);
        if (difficulty === 'easy') {
          setDifficulty('normal');
        } else if (difficulty === 'normal') {
          setDifficulty('hard');
        }
      }, 5000);
    }
  };

  const resetGame = () => {
    startNewGame();
    setCurrentLevel(1);
    setDifficulty('normal');
    setKnowledgeBase({});
  };
  
  const togglePause = () => {
    setPaused(prev => !prev);
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

return (
    <div
      ref={gameRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="w-screen h-screen outline-none bg-gray-100 flex flex-col"
    >
      {/* Header con información del juego */}
      <div className="p-4 bg-white shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Laberinto Corporativo</h1>
          <div className="flex space-x-4">
            <button
              onClick={togglePause}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            >
              {paused ? "Continuar" : "Pausa"}
            </button>
            <button
              onClick={() => setShowHelp(true)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
            >
              Ayuda
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <div className="text-lg font-semibold text-blue-600">
            Nivel: {currentLevel} | Puntos: {gameState.score}
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-red-500 font-bold">
              {"❤️".repeat(gameState.lives)}{"🖤".repeat(3 - gameState.lives)}
            </div>
            <div className={`font-semibold ${gameState.time < 30 ? 'text-red-600' : 'text-gray-600'}`}>
              ⏱️ {formatTime(gameState.time)}
            </div>
          </div>
        </div>
      </div>

      {/* Contenedor principal del juego */}
      <div className="flex-1 flex flex-col md:flex-row p-4 gap-4">
        {/* Tablero del laberinto */}
        <div className="flex-1 flex justify-center items-center">
          <div 
            className="grid gap-1 bg-gray-200 p-2 rounded-lg shadow-lg"
            style={{
              gridTemplateColumns: `repeat(${gameState.size}, minmax(30px, 50px))`,
              gridTemplateRows: `repeat(${gameState.size}, minmax(30px, 50px))`
            }}
          >
            {gameState.maze.map((row, rowIndex) => (
              row.map((cell, colIndex) => {
                const cellKey = `${rowIndex}-${colIndex}`;
                const isPlayer = gameState.playerPos.row === rowIndex && gameState.playerPos.col === colIndex;
                const isSpecial = gameState.specialCells[cellKey];
                const isResource = gameState.resources.includes(cellKey);
                const isEnemy = gameState.enemies.some(e => e.row === rowIndex && e.col === colIndex);
                
                let cellContent = null;
                let bgColor = categories[cell] || "#ffffff";
                let textColor = "#000000";
                
                if (isPlayer) {
                  cellContent = EMOJIS.PLAYER;
                } else if (isEnemy) {
                  cellContent = EMOJIS.ENEMY;
                } else if (isResource) {
                  cellContent = EMOJIS.RESOURCE;
                } else if (isSpecial) {
                  cellContent = SVGs[isSpecial];
                  bgColor = categories[isSpecial];
                  textColor = "#ffffff";
                } else if (cell === "START") {
                  cellContent = EMOJIS.START;
                } else if (cell === "GOAL") {
                  cellContent = EMOJIS.GOAL;
                }
                
                return (
                  <div
                    key={cellKey}
                    className="flex justify-center items-center text-xl rounded-sm"
                    style={{
                      backgroundColor: bgColor,
                      color: textColor,
                      opacity: (paused || modal) ? 0.7 : 1
                    }}
                  >
                    {cellContent}
                  </div>
                );
              })
            ))}
          </div>
        </div>
        
        {/* Panel de información lateral */}
        <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Departamentos visitados</h2>
          <div className="space-y-2">
            {Object.keys(SPECIAL_TOPICS).map(topic => (
              <div 
                key={topic} 
                className={`p-2 rounded flex items-center ${gameState.visitedTopics[topic] ? 'bg-green-100' : 'bg-gray-100'}`}
              >
                <span className="mr-2">{SVGs[topic]}</span>
                <span className="text-sm">
                  {SPECIAL_TOPICS[topic]}
                  {gameState.visitedTopics[topic] && " ✓"}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Controles:</h3>
            <ul className="text-sm space-y-1">
              <li>🔼🔽◀️▶️ - Movimiento</li>
              <li>P - Pausa</li>
              <li>H - Ayuda</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modales */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            {modal.type === "challenge" && (
              <>
                <h3 className="text-xl font-bold mb-2">{SPECIAL_TOPICS[modal.topic]}</h3>
                <p className="mb-4">{modal.challenge.question}</p>
                <div className="space-y-2">
                  {modal.challenge.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index === modal.challenge.correct)}
                      className="w-full text-left p-2 bg-blue-100 hover:bg-blue-200 rounded"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            )}
            
            {modal.type === "explanation" && (
              <>
                <h3 className="text-xl font-bold mb-2">¡Correcto!</h3>
                <p className="mb-4">{modal.explanation}</p>
                <div className="text-green-600 font-semibold">
                  +100 puntos +15 segundos
                </div>
              </>
            )}
            
            {modal.type === "bonus" && (
              <>
                <h3 className="text-xl font-bold mb-2">¡Bonus encontrado!</h3>
                <p className="text-lg text-center py-4">{modal.message}</p>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Pantalla de ayuda */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Ayuda del juego</h2>
              <button 
                onClick={() => setShowHelp(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Objetivo del juego</h3>
                <p>
                  Debes recorrer la empresa (laberinto) visitando los diferentes departamentos 
                  y respondiendo correctamente a sus desafíos. Al completar al menos el 75% 
                  de los departamentos, podrás dirigirte a la meta final (🏆) para ganar.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">Elementos del juego</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>🧑‍💼</strong> - Tu personaje</li>
                  <li><strong>🚩</strong> - Punto de inicio</li>
                  <li><strong>🏆</strong> - Meta final</li>
                  <li><strong>⚠️</strong> - Obstáculos/Enemigos (te quitan vidas)</li>
                  <li><strong>💼</strong> - Recursos bonus (dan puntos, tiempo o vidas extra)</li>
                  <li><strong>Íconos de departamentos</strong> - Desafíos por superar</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">Departamentos y temas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {Object.entries(SPECIAL_TOPICS).map(([key, topic]) => (
                    <div key={key} className="flex items-center p-2 bg-gray-50 rounded">
                      <span className="mr-2">{SVGs[key]}</span>
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">Sistema de puntuación</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Respuesta correcta:</strong> +100 puntos +15 segundos</li>
                  <li><strong>Recurso bonus:</strong> +50 a +150 puntos (y otros beneficios)</li>
                  <li><strong>Tiempo restante:</strong> Multiplicado por 5 al final</li>
                  <li><strong>Departamentos visitados:</strong> +100 puntos cada uno</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Pantalla de victoria */}
      {win && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4 text-center">
            <h2 className="text-3xl font-bold text-green-600 mb-4">¡Felicidades!</h2>
            <p className="text-xl mb-2">Has completado el nivel {currentLevel}</p>
            <p className="mb-4">Puntuación final: {gameState.score} puntos</p>
            
            {currentLevel < 3 ? (
              <p className="mb-4">Preparando nivel {currentLevel + 1}...</p>
            ) : (
              <p className="mb-4">¡Has completado todos los niveles!</p>
            )}
            
            <button
              onClick={resetGame}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Jugar de nuevo
            </button>
          </div>
        </div>
      )}
      
      {/* Pantalla de game over */}
      {gameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4 text-center">
            <h2 className="text-3xl font-bold text-red-600 mb-4">¡Game Over!</h2>
            <p className="text-xl mb-2">Puntuación final: {gameState.score} puntos</p>
            <p className="mb-4">Departamentos completados: {Object.keys(gameState.visitedTopics).length}/{Object.keys(SPECIAL_TOPICS).length}</p>
            
            <div className="mt-6">
              <h3 className="font-bold mb-2">Conocimiento adquirido:</h3>
              <div className="max-h-40 overflow-y-auto text-left">
                {Object.entries(knowledgeBase).map(([topic, questions]) => (
                  <div key={topic} className="mb-3">
                    <h4 className="font-semibold">{SPECIAL_TOPICS[topic]}</h4>
                    <ul className="list-disc pl-5 text-sm">
                      {questions.map((q, i) => (
                        <li key={i}>
                          <strong>P:</strong> {q.question}<br />
                          <strong>R:</strong> {q.correctAnswer}<br />
                          <em>{q.explanation}</em>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            
            <button
              onClick={resetGame}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      )}
      
      {/* Pantalla de pausa */}
      {paused && !modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Juego en pausa</h2>
            <p className="mb-4">Tiempo restante: {formatTime(gameState.time)}</p>
            <p className="mb-4">Vidas: {"❤️".repeat(gameState.lives)}{"🖤".repeat(3 - gameState.lives)}</p>
            <p className="mb-4">Puntos: {gameState.score}</p>
            
            <button
              onClick={togglePause}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}