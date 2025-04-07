import { useEffect, useState, useCallback } from "react";
import { BookOpen, Cog, Users, ShoppingCart, DollarSign, Briefcase, Layers, Grid } from "lucide-react";

// Íconos SVG por tema
const TOPIC_ICONS = {
  PRODUCCION: <Cog className="w-7 h-7 text-blue-600" />,
  MERCADEO: <ShoppingCart className="w-7 h-7 text-pink-500" />,
  FINANZAS: <DollarSign className="w-7 h-7 text-green-600" />,
  RRHH: <Users className="w-7 h-7 text-orange-500" />,
  ADMIN: <Briefcase className="w-7 h-7 text-purple-600" />,
  ESTRUCTURA: <Layers className="w-7 h-7 text-indigo-600" />,
  COSTOS_ORG: <Grid className="w-7 h-7 text-red-600" />,
  COSTOS_PROC: <BookOpen className="w-7 h-7 text-yellow-500" />,
};

// Títulos por tema
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

// Explicaciones
const LEARNING_CONTENT = {
  ESTRUCTURA: `La estructura organizacional define cómo se asignan funciones y responsabilidades para lograr los objetivos. Puede ser funcional, proyectizada o matricial.`,
  PRODUCCION: `La función de producción transforma insumos en productos o servicios. Incluye planificación, control de calidad y gestión de materiales.`,
  MERCADEO: `La función de mercadeo analiza el mercado, promociona productos y entiende al cliente para mejorar ventas.`,
  FINANZAS: `La función financiera gestiona recursos económicos: presupuestos, ingresos, gastos y decisiones de inversión.`,
  RRHH: `Recursos Humanos gestiona el talento humano: contratación, desarrollo, clima laboral y bienestar del personal.`,
  ADMIN: `La administración planifica, organiza, dirige y controla las actividades para alcanzar los objetivos.`,
  COSTOS_ORG: `Los costos organizacionales están relacionados con la estructura interna y cómo impacta la eficiencia operativa.`,
  COSTOS_PROC: `Los costos de procedimientos son los gastos asociados a la gestión e implementación de procesos administrativos.`
};

const fixedLayout = [
  [null, null, null, null, null],
  [null, "PRODUCCION", "RRHH", null, null],
  ["ESTRUCTURA", "ADMIN", null, "MERCADEO", "COSTOS_ORG"],
  [null, null, "FINANZAS", null, null],
  ["COSTOS_PROC", null, null, null, null]
];

const ProyectoEnLlamas = () => {
  const [playerPos, setPlayerPos] = useState({ row: 0, col: 0 });
  const [visitedTopics, setVisitedTopics] = useState({});
  const [modal, setModal] = useState(null);
  const gridSize = fixedLayout.length;

  const movePlayer = useCallback((dRow, dCol) => {
    const newRow = playerPos.row + dRow;
    const newCol = playerPos.col + dCol;
    if (
      newRow >= 0 && newRow < gridSize &&
      newCol >= 0 && newCol < fixedLayout[0].length
    ) {
      const topic = fixedLayout[newRow][newCol];
      if (topic && !visitedTopics[topic]) {
        setModal({
          topic,
          explanation: LEARNING_CONTENT[topic],
          newPos: { row: newRow, col: newCol }
        });
      } else {
        setPlayerPos({ row: newRow, col: newCol });
      }
    }
  }, [playerPos, visitedTopics, gridSize]);

  useEffect(() => {
    const handleKey = (e) => {
      if (!modal) {
        const dir = {
          ArrowUp: [-1, 0],
          ArrowDown: [1, 0],
          ArrowLeft: [0, -1],
          ArrowRight: [0, 1],
        };
        if (dir[e.key]) movePlayer(...dir[e.key]);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [movePlayer, modal]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-indigo-800 mb-6 flex items-center gap-2">
        🧩 Laberinto Corporativo - <span className="text-green-600">Modo Aprendizaje</span>
      </h1>

      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${fixedLayout[0].length}, 90px)` }}>
        {fixedLayout.map((row, rIdx) =>
          row.map((topic, cIdx) => {
            const isPlayer = playerPos.row === rIdx && playerPos.col === cIdx;
            return (
              <div
                key={`${rIdx}-${cIdx}`}
                className="w-[90px] h-[90px] border border-gray-300 rounded-xl bg-white shadow flex items-center justify-center relative"
              >
                {topic && TOPIC_ICONS[topic]}
                {isPlayer && (
                  <div className="absolute inset-0 flex items-center justify-center text-3xl">
                    🔥
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-xl max-w-md shadow-lg w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {SPECIAL_TOPICS[modal.topic]}
            </h2>
            <p className="text-gray-700 mb-4">{modal.explanation}</p>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded font-bold"
              onClick={() => {
                setPlayerPos(modal.newPos);
                setVisitedTopics({ ...visitedTopics, [modal.topic]: true });
                setModal(null);
              }}
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProyectoEnLlamas;
