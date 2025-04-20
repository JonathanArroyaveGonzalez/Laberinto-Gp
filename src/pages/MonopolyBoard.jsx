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

const CHALLENGES = {
  PRODUCCION: [
    {
      question: "¿Qué actividad NO corresponde a Producción?",
      options: ["Control de calidad", "Diseño publicitario", "Gestión de materias primas"],
      correct: 1,
      explanation: "El diseño publicitario pertenece a la función de Mercadeo, ya que su objetivo es promocionar productos o servicios. En cambio, Producción se enfoca en la transformación de insumos en bienes o servicios, incluyendo actividades como la gestión de insumos y control de calidad."
    },
    {
      question: "¿Qué estructura organizacional favorece la eficiencia en producción?",
      options: ["Matricial", "Por procesos", "Funcional"],
      correct: 1,
      explanation: "La estructura por procesos organiza el trabajo según el flujo productivo, lo cual mejora la eficiencia y reduce demoras causadas por silos funcionales. Es ideal para operaciones donde se busca mejorar continuamente la producción."
    },
    {
      question: "El sistema Just-In-Time está más relacionado con:",
      options: ["Estructura vertical", "Estructura flexible", "Estructura centralizada"],
      correct: 1,
      explanation: "El Just-In-Time busca reducir inventarios y producir justo cuando se necesita. Para que funcione correctamente, la organización debe ser flexible y capaz de responder rápidamente a cambios, lo cual no es posible en estructuras rígidas o centralizadas."
    }
  ],
  MERCADEO: [
    {
      question: "Para mercados internacionales, ¿qué estructura es mejor?",
      options: ["Funcional", "Geográfica", "Por producto"],
      correct: 1,
      explanation: "La estructura geográfica permite adaptar estrategias de mercadeo, precios y productos a contextos culturales y legales locales. Esto mejora la efectividad comercial en entornos internacionales."
    },
    {
      question: "¿Qué tipo de organización facilita el desarrollo de nuevos productos?",
      options: ["Burocrática", "Por proyectos", "Jerárquica tradicional"],
      correct: 1,
      explanation: "La estructura por proyectos reúne equipos multidisciplinarios con autonomía para innovar, lo cual es clave para el desarrollo de nuevos productos. Las estructuras tradicionales, al ser más rígidas, limitan la innovación."
    },
    {
      question: "¿Qué enfoque organizacional requiere Mercadeo Digital?",
      options: ["Centralizado", "Ágil", "Mecanicista"],
      correct: 1,
      explanation: "El Mercadeo Digital necesita reaccionar a tendencias cambiantes y feedback inmediato del mercado. Por ello, se beneficia de estructuras ágiles que promueven iteraciones rápidas y decisiones descentralizadas."
    }
  ],
  FINANZAS: [
    {
      question: "¿Qué facilita el control financiero descentralizado?",
      options: ["Estructura centralizada", "Estructura divisional", "Estructura plana"],
      correct: 1,
      explanation: "La estructura divisional otorga autonomía financiera a cada unidad o división, lo que permite un control más específico y adaptado a cada área. Esta descentralización aumenta la responsabilidad y el seguimiento por resultados."
    },
    {
      question: "¿Qué estructura permite mejor asignación de recursos?",
      options: ["Burocrática", "Matricial", "Funcional simple"],
      correct: 1,
      explanation: "La estructura matricial combina enfoques funcionales y por proyectos, facilitando una asignación eficiente de recursos humanos y financieros según las prioridades estratégicas de la organización."
    },
    {
      question: "¿Qué impacto tiene la estructura horizontal en costos financieros?",
      options: ["Mayor overhead", "Menores costos administrativos", "No tiene impacto"],
      correct: 1,
      explanation: "Las estructuras horizontales eliminan niveles jerárquicos intermedios, reduciendo salarios gerenciales y agilizando procesos. Esto disminuye los costos administrativos y mejora la eficiencia operativa."
    }
  ],
  RRHH: [
    {
      question: "¿Qué modelo favorece el desarrollo profesional?",
      options: ["Jerárquico tradicional", "Por proyectos con rotación", "Centralizado"],
      correct: 1,
      explanation: "Los modelos por proyectos con rotación permiten que el personal adquiera diversas habilidades, al enfrentarse a distintos roles y desafíos. Esto enriquece la carrera profesional y fomenta el aprendizaje continuo."
    },
    {
      question: "¿Qué tipo de estructura facilita la retención de talento?",
      options: ["Piramidal rígida", "Organización que aprende", "Burocrática"],
      correct: 1,
      explanation: "Las organizaciones que aprenden promueven el crecimiento del personal, la participación y el aprendizaje constante. Estas características generan mayor satisfacción y compromiso, facilitando la retención del talento."
    },
    {
      question: "La gestión del conocimiento se potencia mejor en estructuras:",
      options: ["Verticales", "Colaborativas en red", "Silos departamentales"],
      correct: 1,
      explanation: "Las estructuras colaborativas favorecen el flujo libre de información entre departamentos. Esto es clave para una buena gestión del conocimiento, la innovación y la mejora continua."
    }
  ],
  ADMIN: [
    {
      question: "¿Qué enfoque requiere estructura flexible?",
      options: ["Burocrático", "Gestión por procesos", "Científico"],
      correct: 1,
      explanation: "La gestión por procesos implica coordinación entre diferentes áreas, lo que requiere estructuras ágiles y flexibles que rompan con las barreras funcionales tradicionales."
    },
    {
      question: "¿Qué tipo de autoridad predomina en estructuras matriciales?",
      options: ["Lineal", "Dual", "Centralizada"],
      correct: 1,
      explanation: "La estructura matricial se caracteriza por una doble autoridad: la funcional (por departamentos) y la de proyectos. Esto permite una visión transversal y más integral de la gestión administrativa."
    },
    {
      question: "¿Qué estructura facilita mejor la toma de decisiones rápidas?",
      options: ["Comités múltiples", "Descentralizada", "Jerárquica tradicional"],
      correct: 1,
      explanation: "Las estructuras descentralizadas permiten que las decisiones se tomen más cerca del lugar donde ocurren los problemas, reduciendo tiempos de espera y aumentando la adaptabilidad."
    }
  ],
  COSTOS_ORG: [
    {
      question: "¿Qué estructura tiene menores costos administrativos?",
      options: ["Jerárquica", "Matricial", "Plana"],
      correct: 2,
      explanation: "Las estructuras planas tienen menos niveles jerárquicos, lo que reduce costos asociados a mandos intermedios y mejora la comunicación interna."
    },
    {
      question: "¿Qué enfoque genera mayores costos de coordinación?",
      options: ["Centralizado", "Descentralizado", "Híbrido"],
      correct: 1,
      explanation: "En estructuras descentralizadas, cada unidad toma decisiones, lo que requiere mayor coordinación entre áreas para asegurar coherencia estratégica, generando así costos adicionales."
    },
    {
      question: "¿Qué impacto tiene la cultura organizacional en los costos?",
      options: ["No afecta", "Impacto indirecto", "Impacto directo significativo"],
      correct: 2,
      explanation: "Una cultura organizacional positiva promueve la productividad, reduce la rotación del personal y mejora la eficiencia, lo que tiene un impacto directo en la reducción de costos operativos."
    }
  ],
  COSTOS_PROC: [
    {
      question: "¿Qué mejora la relación costo-eficiencia en procesos?",
      options: ["Mayor control", "Automatización", "Más supervisión"],
      correct: 1,
      explanation: "La automatización reduce errores humanos, mejora la velocidad y elimina tareas repetitivas, mejorando la eficiencia de los procedimientos y reduciendo costos operativos."
    },
    {
      question: "¿Qué estructura facilita la reingeniería de procesos?",
      options: ["Jerárquica tradicional", "Horizontal por procesos", "Vertical funcional"],
      correct: 1,
      explanation: "Las estructuras horizontales, centradas en los procesos más que en funciones, facilitan la identificación de mejoras y la transformación radical de procedimientos administrativos."
    },
    {
      question: "¿Qué factor aumenta los costos de transacción internos?",
      options: ["Colaboración directa", "Sistemas integrados", "Procedimientos burocráticos"],
      correct: 2,
      explanation: "Los procedimientos burocráticos suelen implicar más papeleo, pasos innecesarios y aprobaciones redundantes, lo que genera demoras y eleva los costos de transacción dentro de la organización."
    }
  ],
  ESTRUCTURA: [
    {
      question: "¿Qué estructura es más adecuada para entornos dinámicos?",
      options: ["Mecanicista", "Orgánica", "Funcional rígida"],
      correct: 1,
      explanation: "Las estructuras orgánicas son flexibles, con menos jerarquías, y fomentan la adaptabilidad. Son ideales para contextos donde el entorno cambia constantemente y se necesita rápida respuesta."
    },
    {
      question: "¿Qué determina principalmente la estructura organizacional?",
      options: ["Número de empleados", "Estrategia organizacional", "Presupuesto disponible"],
      correct: 1,
      explanation: "La estructura debe ser coherente con la estrategia de la organización. Por ejemplo, si la estrategia prioriza innovación, se requerirá una estructura más flexible y colaborativa."
    },
    {
      question: "¿Qué enfoque facilita la innovación organizacional?",
      options: ["Adhocracias flexibles", "Burocracia profesional", "Estructura divisional"],
      correct: 0,
      explanation: "Las adhocracias permiten equipos fluidos, con roles cambiantes y sin jerarquías rígidas. Este enfoque es ideal para la creatividad, experimentación e innovación constante."
    }
  ]
};

const generateMaze = (difficulty = 'normal') => {
  const sizes = {
    'easy': 6,
    'normal': 8,
    'hard': 10
  };
  
  const size = sizes[difficulty];
  
  // Función para verificar accesibilidad a todas las celdas especiales
  const verifyAllAccessible = (maze, specialCells, start) => {
    const visited = new Set();
    const queue = [start];
    const keys = Object.keys(specialCells);
    let foundCount = 0;
    
    while (queue.length > 0) {
      const {row, col} = queue.shift();
      const key = `${row}-${col}`;
      
      if (visited.has(key)) continue;
      visited.add(key);
      
      // Contar si es una celda especial
      if (keys.includes(key)) foundCount++;
      
      // Verificar si encontramos todas
      if (foundCount === keys.length) return true;
      
      // Explorar vecinos
      const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        
        if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
          if (maze[newRow][newCol] !== "WALL") {
            queue.push({row: newRow, col: newCol});
          }
        }
      }
    }
    
    return false;
  };

  // Generar laberinto hasta que sea válido
  let validMaze = false;
  let maze, specialCells, resources, enemies;
  const usedCells = new Set(); // Initialize usedCells to track occupied cells
  
  while (!validMaze) {
    // Reiniciar variables
    maze = Array(size).fill().map(() => Array(size).fill("PATH"));
    specialCells = {};
    resources = [];
    enemies = [];
    
    // Generar paredes (con menor densidad)
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if ((i === 0 && j === 0) || (i === size-1 && j === size-1)) continue;
        if (Math.random() < 0.25) maze[i][j] = "WALL";
      }
    }
    
    // Colocar temas especiales asegurando que estén en PATH
    const topics = Object.keys(SPECIAL_TOPICS);
    const usedCells = new Set(["0-0", `${size-1}-${size-1}`]);
    
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
    
    // Verificar accesibilidad
    validMaze = verifyAllAccessible(maze, specialCells, {row: 0, col: 0});
  }
  
  // Añadir recursos bonus
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
  
  // Asegurar entrada y salida
  maze[0][0] = "START";
  maze[size-1][size-1] = "GOAL";
  
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
    time: 180,
    size: 8
  });
  
  const [modal, setModal] = useState(null);
  const [win, setWin] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [paused, setPaused] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState({});
  const [hints, setHints] = useState(3);
  const [explored, setExplored] = useState(new Set(["0-0"]));
  const [powerUps, setPowerUps] = useState({
    speedBoost: false,
    invincibility: false
  });

  const startNewGame = useCallback(() => {
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
    size,
  });

  setWin(false);
  setGameOver(false);
  setPaused(false);
  setExplored(new Set(["0-0"]));
  setHints(3);
  setPowerUps({
    speedBoost: false,
    invincibility: false,
  });
}, [difficulty]);

useEffect(() => {
  startNewGame();
  return () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (enemyTimerRef.current) clearInterval(enemyTimerRef.current);
    if (powerUpTimerRef.current) clearTimeout(powerUpTimerRef.current);
  };
}, [difficulty, startNewGame]);

  const gameRef = useRef(null);
  const timerRef = useRef(null);
  const enemyTimerRef = useRef(null);
  const powerUpTimerRef = useRef(null);

  const moveEnemies = useCallback(() => {
    if (powerUps.invincibility) return;

    setGameState(prev => {
      const newEnemies = prev.enemies.map(enemy => {
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        let newDirection = enemy.direction;
        
        if (Math.random() < 0.2) {
          newDirection = Math.floor(Math.random() * 4);
        }
        
        const [dr, dc] = directions[newDirection];
        let newRow = enemy.row + dr;
        let newCol = enemy.col + dc;
        
        if (
          newRow >= 0 && newRow < prev.size && 
          newCol >= 0 && newCol < prev.size &&
          prev.maze[newRow][newCol] !== "WALL"
        ) {
          const enemyCollision = prev.enemies.some(
            e => e !== enemy && e.row === newRow && e.col === newCol
          );
          
          if (!enemyCollision) {
            return { ...enemy, row: newRow, col: newCol, direction: newDirection };
          }
        }
        
        return { ...enemy, direction: (newDirection + 1) % 4 };
      });
      
      const playerHit = newEnemies.some(
        e => e.row === prev.playerPos.row && e.col === prev.playerPos.col
      );
      
      if (playerHit && prev.lives > 0) {
        return {
          ...prev,
          enemies: newEnemies,
          playerPos: { row: 0, col: 0 },
          lives: prev.lives - 1
        };
      } else if (playerHit && prev.lives <= 1) {
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
  }, [powerUps.invincibility]);

  useEffect(() => {
    startNewGame();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (enemyTimerRef.current) clearInterval(enemyTimerRef.current);
      if (powerUpTimerRef.current) clearTimeout(powerUpTimerRef.current);
    };
  }, [difficulty, startNewGame]);

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

  useEffect(() => {
    if (gameRef.current && !modal && !win && !gameOver && !showHelp) {
      gameRef.current.focus();
    }
  }, [modal, win, gameOver, showHelp]);
  

  const handleGameOver = () => {
    setGameOver(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (enemyTimerRef.current) clearInterval(enemyTimerRef.current);
    if (powerUpTimerRef.current) clearTimeout(powerUpTimerRef.current);
  };

  const movePlayer = (dir) => {
    if (modal || win || gameOver || paused) return;

    const { row, col } = gameState.playerPos;
    let newRow = row;
    let newCol = col;

    const moveAmount = powerUps.speedBoost ? 2 : 1;

    if (dir === "ArrowUp") newRow = Math.max(0, row - moveAmount);
    if (dir === "ArrowDown") newRow = Math.min(gameState.size - 1, row + moveAmount);
    if (dir === "ArrowLeft") newCol = Math.max(0, col - moveAmount);
    if (dir === "ArrowRight") newCol = Math.min(gameState.size - 1, col + moveAmount);

    // Verificar si hay paredes en el camino (solo para movimiento doble)
    if (moveAmount > 1) {
      const stepRow = dir === "ArrowUp" ? -1 : dir === "ArrowDown" ? 1 : 0;
      const stepCol = dir === "ArrowLeft" ? -1 : dir === "ArrowRight" ? 1 : 0;
      
      let currentRow = row;
      let currentCol = col;
      let canMove = true;
      
      for (let i = 0; i < moveAmount; i++) {
        currentRow += stepRow;
        currentCol += stepCol;
        
        if (
          currentRow < 0 || currentRow >= gameState.size ||
          currentCol < 0 || currentCol >= gameState.size ||
          gameState.maze[currentRow][currentCol] === "WALL"
        ) {
          canMove = false;
          break;
        }
      }
      
      if (!canMove) {
        newRow = row + stepRow * (moveAmount - 1);
        newCol = col + stepCol * (moveAmount - 1);
        
        // Ajustar para no salir del laberinto
        newRow = Math.max(0, Math.min(gameState.size - 1, newRow));
        newCol = Math.max(0, Math.min(gameState.size - 1, newCol));
      }
    }

    if (gameState.maze[newRow][newCol] !== "WALL") {
      const key = `${newRow}-${newCol}`;
      const topic = gameState.specialCells[key];
      
      // Actualizar celdas exploradas
      const newExplored = new Set(explored);
      newExplored.add(key);
      setExplored(newExplored);
      
      // Comprobar si hay un enemigo en la nueva posición
      const enemyHit = gameState.enemies.some(e => e.row === newRow && e.col === newCol);
      
      if (enemyHit && !powerUps.invincibility) {
        if (gameState.lives > 1) {
          setGameState(prev => ({
            ...prev,
            playerPos: { row: 0, col: 0 },
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
        const bonusType = Math.floor(Math.random() * 4);
        let bonusMessage = "";
        let newPowerUps = {...powerUps};
        
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
        } else if (bonusType === 2) {
          // Bonus de velocidad
          bonusMessage = "¡Velocidad aumentada por 10 segundos!";
          newPowerUps.speedBoost = true;
          setPowerUps(newPowerUps);
          setGameState(prev => ({
            ...prev,
            playerPos: { row: newRow, col: newCol },
            resources: newResources,
            score: prev.score + 50
          }));
          powerUpTimerRef.current = setTimeout(() => {
            setPowerUps(prev => ({...prev, speedBoost: false}));
          }, 10000);
        } else {
          // Bonus de invencibilidad
          bonusMessage = "¡Invencibilidad por 10 segundos!";
          newPowerUps.invincibility = true;
          setPowerUps(newPowerUps);
          setGameState(prev => ({
            ...prev,
            playerPos: { row: newRow, col: newCol },
            resources: newResources,
            score: prev.score + 50
          }));
          powerUpTimerRef.current = setTimeout(() => {
            setPowerUps(prev => ({...prev, invincibility: false}));
          }, 10000);
        }
        
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
          
          if (visitedCount >= totalRequired * 0.75) {
            handleWin();
          } else {
            setModal({
              type: "goalWarning",
              message: `¡Debes completar al menos ${Math.ceil(totalRequired * 0.75)} departamentos antes de finalizar!`
            });
            setTimeout(() => setModal(null), 2000);
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

  const findPathToUnvisited = () => {
    const unvisited = Object.keys(SPECIAL_TOPICS).filter(
      topic => !gameState.visitedTopics[topic]
    );
    
    if (unvisited.length === 0 || hints <= 0) return null;
    
    const targetTopic = unvisited[Math.floor(Math.random() * unvisited.length)];
    const targetKey = Object.entries(gameState.specialCells).find(
      ([, topic]) => topic === targetTopic
    )?.[0];
    
    if (!targetKey) return null;
    
    const [targetRow, targetCol] = targetKey.split('-').map(Number);
    
    // BFS para encontrar camino
    const queue = [{row: gameState.playerPos.row, col: gameState.playerPos.col, path: []}];
    const visited = new Set([`${gameState.playerPos.row}-${gameState.playerPos.col}`]);
    
    while (queue.length > 0) {
      const {row, col, path} = queue.shift();
      
      if (row === targetRow && col === targetCol) {
        return path.slice(0, 3); // Mostrar solo los primeros 3 pasos
      }
      
      const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        const key = `${newRow}-${newCol}`;
        
        if (newRow >= 0 && newRow < gameState.size && 
            newCol >= 0 && newCol < gameState.size &&
            !visited.has(key) && 
            gameState.maze[newRow][newCol] !== "WALL") {
          visited.add(key);
          queue.push({
            row: newRow,
            col: newCol,
            path: [...path, {row: newRow, col: newCol}]
          });
        }
      }
    }
    
    return null;
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
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
        time: prev.time + 15
      }));
      
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
        time: Math.max(0, prev.time - 10)
      }));
      
      setModal(null);
    }
  };

  const handleWin = () => {
    const topicsBonus = Object.keys(gameState.visitedTopics).length * 0.5;
    const timeBonus = (gameState.time / 180) * 0.5; // Proporcional al tiempo restante

    setGameState(prev => ({
      ...prev,
      score: Math.min(5.0, topicsBonus + timeBonus) // Limitar el puntaje máximo a 5.0
    }));

    setWin(true);
  };

  const resetGame = () => {
    startNewGame();
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
            <button
              onClick={() => {
                const path = findPathToUnvisited();
                if (path) {
                  setHints(prev => prev - 1);
                  setModal({
                    type: "hint",
                    path: path,
                    remaining: hints - 1
                  });
                }
              }}
              disabled={hints <= 0}
              className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded disabled:opacity-50"
            >
              Pista ({hints} restantes)
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <div className="text-lg font-semibold text-blue-600">
            Puntos: {gameState.score}
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-red-500 font-bold">
              {"❤️".repeat(gameState.lives)}{"🖤".repeat(3 - gameState.lives)}
            </div>
            <div className={`font-semibold ${gameState.time < 30 ? 'text-red-600' : 'text-gray-600'}`}>
              ⏱️ {formatTime(gameState.time)}
            </div>
            {powerUps.speedBoost && (
              <div className="text-yellow-600 font-bold">⚡ Velocidad</div>
            )}
            {powerUps.invincibility && (
              <div className="text-green-600 font-bold">🛡️ Invencible</div>
            )}
          </div>
        </div>
      </div>

      {/* Contenedor principal del juego */}
      <div className="flex-1 flex flex-col md:flex-row p-4 gap-4 relative">
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
              <li>Movimientos</li>
              <li>🔼🔽◀️▶️ </li>
              <li>P - Pausa</li>
              <li>H - Ayuda</li>
            </ul>
          </div>
        </div>

        {/* Mini-mapa */}
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 p-2 rounded">
          <div className="grid gap-px" style={{
            gridTemplateColumns: `repeat(${gameState.size}, 8px)`,
            gridTemplateRows: `repeat(${gameState.size}, 8px)`
          }}>
            {gameState.maze.map((row, rowIndex) => (
              row.map((cell, colIndex) => {
                const key = `${rowIndex}-${colIndex}`;
                const isExplored = explored.has(key);
                const isPlayer = gameState.playerPos.row === rowIndex && 
                                gameState.playerPos.col === colIndex;
                
                let color = 'bg-gray-900'; // No explorado
                if (isExplored) {
                  if (cell === "WALL") color = 'bg-gray-600';
                  else if (cell === "PATH") color = 'bg-gray-300';
                  else if (cell === "START") color = 'bg-green-500';
                  else if (cell === "GOAL") color = 'bg-pink-500';
                  else if (gameState.specialCells[key]) {
                    color = 'bg-blue-400'; // Departamentos
                  }
                }
                
                return (
                  <div 
                    key={key}
                    className={`w-2 h-2 ${color} ${isPlayer ? 'border border-yellow-400' : ''}`}
                    title={`${rowIndex},${colIndex}`}
                  />
                );
              })
            ))}
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
            
            {modal.type === "hint" && (
              <>
                <h3 className="text-xl font-bold mb-2">Pista ({modal.remaining} restantes)</h3>
                <p className="mb-2">Siguientes pasos recomendados:</p>
                <div className="flex space-x-2">
                  {modal.path.map((step, i) => (
                    <div key={i} className="bg-blue-100 p-2 rounded">
                      Fila: {step.row + 1}, Col: {step.col + 1}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  Las pistas muestran el camino más corto a un departamento no visitado.
                </p>
              </>
            )}
            
            {modal.type === "goalWarning" && (
              <>
                <h3 className="text-xl font-bold mb-2 text-red-600">¡Atención!</h3>
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
                  <li><strong>Respuesta correcta:</strong> Incrementa tu puntuación proporcionalmente, acercándote al máximo de 5.0</li>
                  <li><strong>Recurso bonus:</strong> Mejora tu puntuación y otorga beneficios adicionales como tiempo extra o vidas</li>
                  <li><strong>Tiempo restante:</strong> Contribuye al puntaje final, siendo proporcional al tiempo que quede al finalizar</li>
                  <li><strong>Departamentos visitados:</strong> Cada departamento completado aumenta tu puntuación, siendo necesario completar al menos el 75% para ganar</li>
                  <li><strong>Puntaje máximo:</strong> La puntuación final se calcula en una escala de 1.0 a 5.0, considerando todos los factores anteriores</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">Power-ups</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>⚡ Velocidad:</strong> Te mueves el doble de rápido por 10 segundos</li>
                  <li><strong>🛡️ Invencibilidad:</strong> Los enemigos no te afectan por 10 segundos</li>
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
            <p className="text-xl mb-2">Has completado el juego</p>
            <p className="mb-4">Puntuación final: {gameState.score} puntos</p>
            
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