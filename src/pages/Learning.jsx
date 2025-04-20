import React, { useState } from 'react';

const ModoAprendizajeExploratorio = () => {
  // Estructura de conocimiento mejorada con ejemplos y relaciones
  const KNOWLEDGE_MAP = {
    ESTRUCTURA: {
      title: "Estructura Organizacional",
      description: "Cómo se organizan los roles y jerarquías en la empresa",
      icon: "🏛️",
      subtemas: {
        TIPOS: {
          title: "Tipos de Estructuras",
          content: [
            "Funcional: Agrupada por especialidades (marketing, finanzas, etc.)",
            "Divisional: Organizada por productos/mercados",
            "Matricial: Combina funcional y por proyectos"
          ],
          examples: [
            {
              title: "Google",
              description: "Utiliza una estructura híbrida que combina elementos funcionales con una organización matricial para proyectos específicos."
            },
            {
              title: "Toyota",
              description: "Emplea una estructura divisional por regiones geográficas y líneas de productos."
            }
          ],
          relationships: ["PRODUCCION.PROCESOS", "FINANZAS.AREAS", "RRHH.DESARROLLO"],
          decisionTree: {
            question: "¿Qué estructura es más adecuada para mi organización?",
            factors: [
              "Tamaño de la empresa",
              "Diversidad de productos/servicios",
              "Necesidad de especialización",
              "Velocidad de toma de decisiones requerida"
            ]
          }
        },
        INNOVACION: {
          title: "Estructura e Innovación",
          content: [
            "Adhocracias flexibles favorecen la creatividad y experimentación",
            "Estructuras orgánicas son mejores para entornos dinámicos",
            "La estrategia organizacional determina la estructura adecuada"
          ],
          examples: [
            {
              title: "Startup vs Corporación",
              description: "Las startups suelen emplear estructuras planas que facilitan la innovación rápida, mientras que corporaciones establecidas pueden necesitar estructuras más definidas."
            },
            {
              title: "Modelos híbridos",
              description: "Organizaciones como Spotify utilizan 'tribus' y 'squads' para combinar estabilidad estructural con flexibilidad innovadora."
            }
          ],
          relationships: ["ADMIN.GESTION", "MERCADEO.ESTRATEGIAS"],
          decisionTree: {
            question: "¿Qué enfoque estructural facilita la innovación?",
            factors: [
              "Nivel de autonomía de equipos",
              "Velocidad de cambio del mercado",
              "Diversidad de talentos disponibles",
              "Cultura organizacional existente"
            ]
          },
          applicationTable: {
            title: "Aplicación de estructuras según objetivos",
            rows: [
              {
                structure: "Adhocracia",
                whenToUse: "Entornos altamente creativos con cambios constantes",
                whenToAvoid: "Operaciones que requieren alta estandarización"
              },
              {
                structure: "Mecanicista",
                whenToUse: "Operaciones estables con procesos previsibles",
                whenToAvoid: "Industrias emergentes con tecnologías disruptivas"
              }
            ]
          }
        },
        VENTAJAS: {
          title: "Ventajas/Desventajas",
          content: [
            "Estructuras jerárquicas: Claridad vs. lentitud",
            "Estructuras planas: Agilidad vs. falta de especialización"
          ],
          examples: [
            {
              title: "Spotify",
              description: "Estructura plana con equipos autónomos (squads) que permite innovación rápida, pero requiere coordinación adicional."
            },
            {
              title: "Ejercicio",
              description: "Estructura jerárquica estricta que asegura disciplina y cadena de mando clara, pero puede limitar la iniciativa individual."
            }
          ],
          relationships: ["MERCADEO.ESTRATEGIAS", "PRODUCCION.TECNICAS", "ADMIN.AUTORIDAD"],
          applicationTable: {
            title: "Cuándo aplicar cada estructura",
            rows: [
              {
                structure: "Jerárquica",
                whenToUse: "Empresas grandes con procesos estandarizados",
                whenToAvoid: "Startups o ambientes de innovación rápida"
              },
              {
                structure: "Plana",
                whenToUse: "Equipos creativos o ambientes dinámicos",
                whenToAvoid: "Organizaciones con muchos empleados o alta especialización"
              }
            ]
          }
        }
      }
    },
    PRODUCCION: {
      title: "Función de Producción",
      description: "Proceso de transformación de insumos en productos",
      icon: "🏭",
      subtemas: {
        PROCESOS: {
          title: "Tipos de Procesos",
          content: [
            "Producción por lotes: Para productos variados",
            "Producción continua: Para grandes volúmenes",
            "Producción por proyecto: Productos únicos"
          ],
          examples: [
            {
              title: "Fábrica de automóviles",
              description: "Utiliza producción en línea para ensamblar vehículos estandarizados con personalización limitada."
            },
            {
              title: "Panadería artesanal",
              description: "Emplea producción por lotes para crear diferentes tipos de pan en horneadas separadas."
            }
          ],
          relationships: ["ESTRUCTURA.TIPOS", "FINANZAS.INDICADORES"],
          decisionTree: {
            question: "¿Qué tipo de proceso productivo elegir?",
            factors: [
              "Volumen de producción esperado",
              "Nivel de personalización requerido",
              "Complejidad del producto",
              "Inversión en equipamiento disponible"
            ]
          }
        },
        ESTRUCTURAS: {
          title: "Estructuras para Producción",
          content: [
            "Estructuras por procesos favorecen la eficiencia productiva",
            "Estructuras flexibles facilitan sistemas Just-In-Time",
            "La organización por células potencia el control de calidad"
          ],
          examples: [
            {
              title: "Toyota Production System",
              description: "Estructura flexible que implementa Just-In-Time y mejora continua, eliminando inventarios innecesarios y maximizando eficiencia."
            },
            {
              title: "IKEA",
              description: "Estructura por procesos que optimiza el flujo desde diseño hasta distribución, reduciendo costos y manteniendo calidad."
            }
          ],
          relationships: ["ESTRUCTURA.VENTAJAS", "COSTOS_PROC.AUTOMATIZACION"],
          causeEffect: {
            title: "Impacto de la estructura en producción",
            effects: [
              "Estructuras verticales → Mayor control pero menor capacidad de adaptación",
              "Estructuras por procesos → Mejor flujo productivo pero posible redundancia",
              "Estructuras matriciales → Equilibrio entre especialización y coordinación"
            ]
          }
        },
        TECNICAS: {
          title: "Técnicas Modernas",
          content: [
            "Just-in-Time: Minimizar inventarios",
            "Lean Manufacturing: Eliminar desperdicios",
            "Automatización: Uso de robots y AI"
          ],
          examples: [
            {
              title: "Tesla",
              description: "Combina automatización avanzada con principios Lean para optimizar su cadena de producción."
            },
            {
              title: "Toyota",
              description: "Pionera del Just-in-Time y Kanban, con proveedores cerca de las plantas para minimizar tiempos de entrega."
            }
          ],
          relationships: ["ESTRUCTURA.VENTAJAS", "MERCADEO.HERRAMIENTAS", "COSTOS_PROC.REINGENIERIA"],
          causeEffect: {
            title: "Impacto de técnicas modernas",
            effects: [
              "Reducción de costos de almacenamiento",
              "Mayor flexibilidad ante cambios en demanda",
              "Reducción de tiempos de ciclo de producción",
              "Posible aumento en la dependencia tecnológica"
            ]
          }
        }
      }
    },
    MERCADEO: {
      title: "Función de Mercadeo",
      description: "Identificación de necesidades del mercado y promoción de productos",
      icon: "📢",
      subtemas: {
        ESTRATEGIAS: {
          title: "Estrategias Clave",
          content: [
            "Segmentación de mercado",
            "Posicionamiento de marca",
            "Marketing digital y tradicional"
          ],
          examples: [
            {
              title: "Apple",
              description: "Segmentación psicográfica y posicionamiento premium para atraer consumidores que valoran diseño y estatus."
            },
            {
              title: "Coca-Cola",
              description: "Segmentación geográfica adaptando sabores y campañas a diferentes regiones."
            }
          ],
          relationships: ["ESTRUCTURA.VENTAJAS", "FINANZAS.INDICADORES"],
          reflectionQuestions: [
            "¿Cómo afecta la estrategia de segmentación a los costos de producción?",
            "¿Qué métricas son críticas para evaluar el ROI de una estrategia de posicionamiento?"
          ]
        },
        ESTRUCTURAS: {
          title: "Estructuras para Mercadeo",
          content: [
            "Estructuras geográficas para mercados internacionales",
            "Estructuras por proyectos para desarrollo de nuevos productos",
            "Estructuras ágiles para mercadeo digital"
          ],
          examples: [
            {
              title: "Unilever",
              description: "Estructura geográfica con adaptaciones locales para cada mercado, permitiendo campañas culturalmente relevantes."
            },
            {
              title: "Agencias digitales",
              description: "Adoptan estructuras ágiles con equipos multidisciplinarios para responder rápidamente a tendencias y métricas en tiempo real."
            }
          ],
          relationships: ["ESTRUCTURA.TIPOS", "ADMIN.DECISION"],
          applicationTable: {
            title: "Selección de estructura según enfoque de mercado",
            rows: [
              {
                structure: "Geográfica",
                whenToUse: "Expansión internacional con necesidades culturales distintas",
                whenToAvoid: "Productos globales sin diferenciación regional"
              },
              {
                structure: "Por producto",
                whenToUse: "Portafolio amplio con estrategias de marketing distintas",
                whenToAvoid: "Líneas de productos muy similares o complementarias"
              }
            ]
          }
        },
        HERRAMIENTAS: {
          title: "Herramientas Comunes",
          content: [
            "Estudios de mercado",
            "Publicidad y promociones",
            "Redes sociales"
          ],
          examples: [
            {
              title: "Netflix",
              description: "Utiliza analítica avanzada para personalizar recomendaciones y campañas publicitarias."
            },
            {
              title: "Zara",
              description: "Implementa estudios de mercado en tiempo real observando tendencias en redes sociales y comportamiento en tienda."
            }
          ],
          relationships: ["PRODUCCION.TECNICAS", "FINANZAS.AREAS", "COSTOS_ORG.CULTURA"],
          applicationTable: {
            title: "Cuándo usar cada herramienta",
            rows: [
              {
                tool: "Estudios cualitativos",
                whenToUse: "Entender motivaciones profundas",
                whenToAvoid: "Cuando se necesitan datos estadísticos representativos"
              },
              {
                tool: "Campañas en redes sociales",
                whenToUse: "Productos para audiencias digitales",
                whenToAvoid: "Demografías con baja adopción tecnológica"
              }
            ]
          }
        }
      }
    },
    FINANZAS: {
      title: "Función Financiera",
      description: "Gestión de los recursos económicos de la organización",
      icon: "💰",
      subtemas: {
        AREAS: {
          title: "Áreas Principales",
          content: [
            "Contabilidad y reportes",
            "Presupuestos",
            "Análisis de inversiones"
          ],
          examples: [
            {
              title: "Amazon",
              description: "Reinvierte agresivamente en nuevas líneas de negocio con un horizonte de inversión a largo plazo."
            },
            {
              title: "Startups SaaS",
              description: "Utilizan métricas específicas como CAC, LTV y MRR para evaluar la salud financiera del negocio."
            }
          ],
          relationships: ["ESTRUCTURA.TIPOS", "MERCADEO.HERRAMIENTAS"],
          decisionTree: {
            question: "¿Cómo priorizar inversiones financieras?",
            factors: [
              "Horizonte temporal de la inversión",
              "Nivel de riesgo aceptable",
              "Liquidez requerida",
              "Etapa de crecimiento de la empresa"
            ]
          }
        },
        ESTRUCTURAS: {
          title: "Estructuras para Finanzas",
          content: [
            "Estructuras divisionales facilitan control financiero descentralizado",
            "Estructuras matriciales permiten mejor asignación de recursos",
            "Estructuras horizontales reducen costos administrativos"
          ],
          examples: [
            {
              title: "General Electric",
              description: "Su estructura divisional permite que cada unidad de negocio tenga autonomía financiera y responsabilidad por resultados."
            },
            {
              title: "Empresas de consultoría",
              description: "Utilizan estructuras matriciales para asignar consultores a proyectos según necesidades y optimizar utilización de talento."
            }
          ],
          relationships: ["ESTRUCTURA.VENTAJAS", "COSTOS_ORG.COSTOS"],
          causeEffect: {
            title: "Efecto de estructuras en finanzas",
            effects: [
              "Estructuras divisionales → Mayor autonomía financiera pero posible duplicación de recursos",
              "Estructuras horizontales → Menores costos administrativos pero posibles desafíos de coordinación",
              "Estructuras centralizadas → Mayor control pero procesos de decisión más lentos"
            ]
          }
        },
        INDICADORES: {
          title: "Indicadores Clave",
          content: [
            "ROI (Retorno sobre inversión)",
            "Flujo de caja",
            "Punto de equilibrio"
          ],
          examples: [
            {
              title: "Walmart",
              description: "Se enfoca en indicadores de eficiencia como la rotación de inventario y margen operativo."
            },
            {
              title: "Tesla en sus inicios",
              description: "Priorizó crecimiento y participación de mercado sobre rentabilidad inmediata, tolerando flujos de caja negativos."
            }
          ],
          relationships: ["PRODUCCION.PROCESOS", "MERCADEO.ESTRATEGIAS", "COSTOS_ORG.IMPACTO"],
          causeEffect: {
            title: "Decisiones financieras y sus efectos",
            effects: [
              "Mayor endeudamiento → Posible crecimiento acelerado pero mayor riesgo",
              "Política de dividendos generosa → Atrae cierto perfil de inversores pero limita reinversión",
              "Inversión en automatización → Mayores costos iniciales pero reducción de costos operativos a largo plazo"
            ]
          }
        }
      }
    },
    RRHH: {
      title: "Función de Recursos Humanos",
      description: "Gestión del talento y desarrollo del capital humano",
      icon: "👥",
      subtemas: {
        DESARROLLO: {
          title: "Desarrollo Profesional",
          content: [
            "Modelos por proyectos con rotación facilitan el crecimiento profesional",
            "Planes de capacitación continua aumentan la retención del talento",
            "Mentoría y coaching mejoran habilidades de liderazgo"
          ],
          examples: [
            {
              title: "Google",
              description: "Ofrece tiempo para proyectos personales (20% time) permitiendo desarrollo profesional y potencial innovación."
            },
            {
              title: "McKinsey",
              description: "Rotación entre proyectos e industrias que enriquece experiencia y desarrolla habilidades diversas."
            }
          ],
          relationships: ["ESTRUCTURA.TIPOS", "ADMIN.GESTION"],
          applicationTable: {
            title: "Estrategias de desarrollo por tipo de organización",
            rows: [
              {
                strategy: "Rotación de proyectos",
                whenToUse: "Empresas de consultoría o tecnología",
                whenToAvoid: "Roles altamente especializados o técnicos"
              },
              {
                strategy: "Plan de carrera vertical",
                whenToUse: "Organizaciones jerárquicas establecidas",
                whenToAvoid: "Startups o empresas con estructura plana"
              }
            ]
          }
        },
        RETENCION: {
          title: "Retención de Talento",
          content: [
            "Organizaciones que aprenden potencian la retención del personal clave",
            "Culturas de reconocimiento mejoran la satisfacción laboral",
            "Compensación competitiva es necesaria pero no suficiente"
          ],
          examples: [
            {
              title: "Salesforce",
              description: "Combina aprendizaje continuo, voluntariado corporativo y compensación competitiva para retener talento."
            },
            {
              title: "LinkedIn",
              description: "Cultura de transparencia y oportunidades de desarrollo interno que reduce la rotación de empleados."
            }
          ],
          relationships: ["COSTOS_ORG.CULTURA", "ESTRUCTURA.VENTAJAS"],
          causeEffect: {
            title: "Factores que impactan la retención",
            effects: [
              "Cultura tóxica → Principal causa de rotación voluntaria",
              "Falta de crecimiento → Éxodo de talento de alto potencial",
              "Liderazgo efectivo → Mayor compromiso y retención"
            ]
          }
        },
        CONOCIMIENTO: {
          title: "Gestión del Conocimiento",
          content: [
            "Estructuras colaborativas en red facilitan el intercambio de información",
            "Comunidades de práctica preservan conocimiento especializado",
            "Documentación y digitalización previenen pérdida de know-how"
          ],
          examples: [
            {
              title: "Microsoft",
              description: "Utiliza comunidades de práctica, wikis internos y herramientas colaborativas para preservar y compartir conocimiento."
            },
            {
              title: "Toyota",
              description: "Documenta sistemáticamente mejores prácticas mediante el concepto de 'lecciones de un punto' para transferencia de conocimiento."
            }
          ],
          relationships: ["ADMIN.PROCESOS", "COSTOS_PROC.SISTEMAS"],
          decisionTree: {
            question: "¿Cómo estructurar la gestión del conocimiento?",
            factors: [
              "Naturaleza del conocimiento (tácito vs explícito)",
              "Distribución geográfica de la organización",
              "Cultura de compartir vs competir",
              "Infraestructura tecnológica disponible"
            ]
          }
        }
      }
    },
    ADMIN: {
      title: "Función Administrativa",
      description: "Planificación, organización y control de procesos organizacionales",
      icon: "📋",
      subtemas: {
        GESTION: {
          title: "Gestión por Procesos",
          content: [
            "Requiere estructuras flexibles que superen barreras funcionales",
            "Enfocada en el valor para el cliente final",
            "Necesita medición constante y mejora continua"
          ],
          examples: [
            {
              title: "Amazon",
              description: "Organiza sus operaciones por procesos centrados en la experiencia del cliente, permitiendo optimización constante."
            },
            {
              title: "Hospitales modernos",
              description: "Organizan la atención médica por procesos (diagnóstico a tratamiento) en lugar de departamentos aislados."
            }
          ],
          relationships: ["ESTRUCTURA.INNOVACION", "COSTOS_PROC.REINGENIERIA"],
          applicationTable: {
            title: "Implementación de gestión por procesos",
            rows: [
              {
                phase: "Identificación de procesos clave",
                challenge: "Superar visión departamental",
                benefit: "Visualizar flujos de valor completos"
              },
              {
                phase: "Optimización de procesos",
                challenge: "Resistencia al cambio",
                benefit: "Eliminación de redundancias y cuellos de botella"
              }
            ]
          }
        },
        AUTORIDAD: {
          title: "Tipos de Autoridad",
          content: [
            "Estructuras matriciales utilizan autoridad dual (funcional y de proyecto)",
            "Autoridad descentralizada acelera toma de decisiones",
            "Balance entre autonomía y alineación estratégica"
          ],
          examples: [
            {
              title: "Pixar",
              description: "Combina autoridad creativa de directores con supervisión técnica de especialistas, en estructura matricial."
            },
            {
              title: "W.L. Gore",
              description: "Estructura con mínima jerarquía formal, donde la autoridad se basa en experiencia y liderazgo natural."
            }
          ],
          relationships: ["ESTRUCTURA.VENTAJAS", "RRHH.CONOCIMIENTO"],
          causeEffect: {
            title: "Impacto de modelos de autoridad",
            effects: [
              "Autoridad centralizada → Decisiones consistentes pero lentas",
              "Autoridad delegada → Mayor agilidad pero posible desalineación",
              "Autoridad dual → Equilibrio pero potenciales conflictos"
            ]
          }
        },
        DECISION: {
          title: "Toma de Decisiones",
          content: [
            "Estructuras descentralizadas facilitan decisiones rápidas",
            "Procesos de decisión deben alinearse con contexto organizacional",
            "Balance entre datos y experiencia según tipo de decisión"
          ],
          examples: [
            {
              title: "Netflix",
              description: "Promueve alta autonomía decisional con el principio 'context, not control' para acelerar innovación."
            },
            {
              title: "Amazon",
              description: "Utiliza el marco 'decisiones de tipo 1 y tipo 2' para balancear decisiones reversibles (rápidas) e irreversibles (cuidadosas)."
            }
          ],
          relationships: ["MERCADEO.ESTRUCTURAS", "FINANZAS.ESTRUCTURAS"],
          decisionTree: {
            question: "¿Qué proceso decisional implementar?",
            factors: [
              "Reversibilidad de la decisión",
              "Impacto estratégico",
              "Complejidad del problema",
              "Urgencia requerida"
            ]
          }
        }
      }
    },
    COSTOS_ORG: {
      title: "Costos en Aspectos Organizacionales",
      description: "Impacto económico de la estructura y cultura organizacional",
      icon: "📊",
      subtemas: {
        COSTOS: {
          title: "Costos Administrativos",
          content: [
            "Estructuras planas tienen menores costos administrativos que jerárquicas",
            "Descentralización aumenta costos de coordinación",
            "Centralización puede generar ineficiencias por burocracia"
          ],
          examples: [
            {
              title: "Valve Corporation",
              description: "Estructura plana sin jefes formales que minimiza costos administrativos pero requiere madurez organizacional."
            },
            {
              title: "Multinacionales tradicionales",
              description: "Estructuras con múltiples niveles jerárquicos que aumentan overhead pero pueden ser necesarias para organizaciones grandes."
            }
          ],
          relationships: ["ESTRUCTURA.VENTAJAS", "FINANZAS.ESTRUCTURAS"],
          causeEffect: {
            title: "Impacto de estructura en costos",
            effects: [
              "Cada nivel jerárquico → +10-15% costos administrativos",
              "Decisiones centralizadas → Mayor consistencia pero menor velocidad",
              "Departamentos aislados → Duplicación de recursos y esfuerzos"
            ]
          }
        },
        CULTURA: {
          title: "Cultura y Costos",
          content: [
            "Cultura organizacional positiva reduce rotación y costos asociados",
            "Compromiso del personal aumenta productividad y reduce supervisión",
            "Culturas tóxicas generan costos ocultos significativos"
          ],
          examples: [
            {
              title: "Zappos",
              description: "Inversión en cultura y satisfacción de empleados que resultó en menor rotación y mayor productividad."
            },
            {
              title: "Southwest Airlines",
              description: "Cultura de pertenencia y orgullo que reduce ausentismo y mejora servicio al cliente sin supervisión intensiva."
            }
          ],
          relationships: ["RRHH.RETENCION", "MERCADEO.HERRAMIENTAS"],
          applicationTable: {
            title: "Medición del impacto de cultura en costos",
            rows: [
              {
                metric: "Costo por rotación",
                formula: "1-2 años de salario por posición perdida",
                impact: "Directo en presupuesto de contratación y capacitación"
              },
              {
                metric: "Productividad por compromiso",
                formula: "Diferencial de 20-25% entre empleados comprometidos vs desconectados",
                impact: "Indirecto en resultados operativos"
              }
            ]
          }
        },
        IMPACTO: {
          title: "Medición de Impacto",
          content: [
            "Relación directa entre estructura organizacional y eficiencia de costos",
            "Indicadores de gestión deben incluir costos organizacionales",
            "Análisis costo-beneficio de cambios estructurales"
          ],
          examples: [
            {
              title: "IBM",
              description: "Transformación de estructura vertical a modelo ágil que redujo costos administrativos en 25% y aumentó velocidad de innovación."
            },
            {
              title: "Siemens",
              description: "Implementación de centro de servicios compartidos que consolidó funciones administrativas y redujo costos organizacionales."
            }
          ],
          relationships: ["FINANZAS.INDICADORES", "COSTOS_PROC.EFICIENCIA"],
          decisionTree: {
            question: "¿Cómo evaluar el costo-beneficio de una estructura?",
            factors: [
              "Costos directos de implementación",
              "Costos de transición y aprendizaje",
              "Beneficios esperados en productividad",
              "Impacto en velocidad y calidad de decisiones"
            ]
          }
        }
      }
    },
    COSTOS_PROC: {
      title: "Costos de Sistemas y Procedimientos",
      description: "Eficiencia económica de los procesos administrativos",
      icon: "📝",
      subtemas: {
        EFICIENCIA: {
          title: "Costo-Eficiencia",
          content: [
            "Automatización mejora relación costo-eficiencia en procesos",
            "Eliminación de pasos redundantes reduce costos operativos",
            "Digitalización disminuye costos de manejo documental"
          ],
          examples: [
            {
              title: "Servicios bancarios",
              description: "Transformación digital con automatización de procesos que redujo costos por transacción en más del 70%."
            },
            {
              title: "Empresas de seguros",
              description: "Automatización de procesamiento de reclamos que mejoró precisión y redujo tiempo de respuesta y costos operativos."
            }
          ],
          relationships: ["PRODUCCION.TECNICAS", "COSTOS_ORG.IMPACTO"],
          causeEffect: {
            title: "Automatización y sus efectos",
            effects: [
              "Reducción de errores humanos → Menos costos de corrección",
              "Estandarización de procesos → Mayor previsibilidad y control",
              "Captura de datos automatizada → Mejor análisis y decisiones"
            ]
          }
        },
        REINGENIERIA: {
          title: "Reingeniería de Procesos",
          content: [
            "Estructuras horizontales facilitan rediseño radical de procesos",
            "Enfoque en valor agregado elimina actividades innecesarias",
            "Transformación digital como catalizador de reingeniería"
          ],
          examples: [
            {
              title: "Ford Motor Company",
              description: "Rediseño del proceso de cuentas por pagar que redujo personal en 75% mientras mejoraba precisión y velocidad."
            },
            {
              title: "Progressive Insurance",
              description: "Reingeniería del proceso de reclamos con evaluación en sitio que redujo tiempo y costos de procesamiento."
            }
          ],
          relationships: ["ADMIN.GESTION", "PRODUCCION.TECNICAS"],
          applicationTable: {
            title: "Fases de reingeniería de procesos",
            rows: [
              {
                phase: "Identificación de procesos clave",
                challenge: "Resistencia departamental",
                outcome: "Mapa de procesos con oportunidades de mejora"
              },
              {
                phase: "Rediseño radical",
                challenge: "Capacidad de imaginar alternativas distintas",
                outcome: "Nuevos flujos optimizados de trabajo"
              }
            ]
          }
        },
        SISTEMAS: {
          title: "Procedimientos y Transacciones",
          content: [
            "Procedimientos burocráticos aumentan costos de transacción internos",
            "Simplificación administrativa reduce tiempos y costos de procesamiento",
            "Diseño de sistemas debe balancear control y agilidad"
          ],
          examples: [
            {
              title: "Amazon",
              description: "Sistema de aprobaciones por excepción: procesos estándar son automáticos, solo excepciones requieren revisión humana."
            },
            {
              title: "Gobierno de Estonia",
              description: "Transformación digital de procedimientos gubernamentales que redujo burocracia y costos de transacción para ciudadanos y empresas."
            }
          ],
          relationships: ["RRHH.CONOCIMIENTO", "ADMIN.AUTORIDAD"],
          decisionTree: {
            question: "¿Cómo reducir costos de transacción internos?",
            factors: [
              "Número de aprobaciones requeridas",
              "Complejidad de formularios y documentación",
              "Claridad de responsabilidades decisionales",
              "Nivel de excepciones al proceso estándar"
            ]
          }
        },
        AUTOMATIZACION: {
          title: "Tecnología y Costos",
          content: [
            "Sistemas integrados reducen duplicación y errores",
            "Inteligencia artificial optimiza decisiones rutinarias",
            "Análisis de datos mejora previsión y planificación"
          ],
          examples: [
            {
              title: "UPS",
              description: "Sistema ORION que optimiza rutas de entrega ahorrando millones en combustible y tiempo de operación."
            },
            {
              title: "Manufactureras",
              description: "Implementación de IoT para mantenimiento predictivo que reduce paradas no programadas y costos de reparación."
            }
          ],
          relationships: ["PRODUCCION.ESTRUCTURAS", "ADMIN.DECISION"],
          causeEffect: {
            title: "Inversión tecnológica y retorno",
            effects: [
              "Automatización básica → ROI rápido en procesos repetitivos",
              "Sistemas integrados → Eliminación de silos y redundancias",
              "Inversión en analítica → Mejores decisiones y previsiones"
            ]
          }
        }
      }
    }
  };

  // Estado del explorador
  const [currentArea, setCurrentArea] = useState(null);
  const [currentSubtheme, setCurrentSubtheme] = useState(null);
  const [explorationPath, setExplorationPath] = useState([]);
  const [viewMode, setViewMode] = useState('areas'); // 'areas' | 'subthemes' | 'detail'
  const [activeDetailTab, setActiveDetailTab] = useState('content'); // 'content' | 'examples' | 'relationships' | 'application'

  // Navegación
  const enterArea = (area) => {
    setCurrentArea(area);
    setCurrentSubtheme(null);
    setViewMode('subthemes');
    setExplorationPath([...explorationPath, area]);
  };

  const enterSubtheme = (subtheme) => {
    setCurrentSubtheme(subtheme);
    setViewMode('detail');
    setActiveDetailTab('content');
    setExplorationPath([...explorationPath, subtheme]);
  };

  const goBack = () => {
    if (viewMode === 'detail') {
      setViewMode('subthemes');
      setCurrentSubtheme(null);
    } else if (viewMode === 'subthemes') {
      setViewMode('areas');
      setCurrentArea(null);
    }
    setExplorationPath(explorationPath.slice(0, -1));
  };

  const navigateToRelatedTopic = (relation) => {
    const [relatedArea, relatedSubtheme] = relation.split('.');
    setCurrentArea(relatedArea);
    setCurrentSubtheme(relatedSubtheme);
    setViewMode('detail');
    setActiveDetailTab('content');
    setExplorationPath([...explorationPath, relatedArea, relatedSubtheme]);
  };

  // Calcular el total de conceptos para la barra de progreso
  const calculateTotalConcepts = () => {
    return Object.keys(KNOWLEDGE_MAP).length + 
      Object.keys(KNOWLEDGE_MAP).reduce((acc, area) => 
        acc + Object.keys(KNOWLEDGE_MAP[area].subtemas).length, 0);
  };

  // Componente de visualización de áreas principales
  const AreasView = () => (
    <div style={styles.areasGrid}>
      {Object.keys(KNOWLEDGE_MAP).map((areaKey) => (
        <div 
          key={areaKey}
          style={styles.areaCard}
          onClick={() => enterArea(areaKey)}
        >
          <div style={styles.areaIcon}>{KNOWLEDGE_MAP[areaKey].icon}</div>
          <h3 style={styles.areaTitle}>{KNOWLEDGE_MAP[areaKey].title}</h3>
          <p style={styles.areaDescription}>{KNOWLEDGE_MAP[areaKey].description}</p>
          <div style={styles.discoveryBadge}>
            {Object.keys(KNOWLEDGE_MAP[areaKey].subtemas).length} subtemas por explorar
          </div>
        </div>
      ))}
    </div>
  );

  // Componente de visualización de subtemas
  const SubthemesView = () => (
    <div style={styles.subthemesContainer}>
      <h2 style={styles.sectionTitle}>{KNOWLEDGE_MAP[currentArea].title}</h2>
      <p style={styles.areaDescription}>{KNOWLEDGE_MAP[currentArea].description}</p>
      
      <div style={styles.subthemesGrid}>
        {Object.keys(KNOWLEDGE_MAP[currentArea].subtemas).map((subthemeKey) => (
          <div
            key={subthemeKey}
            style={styles.subthemeCard}
            onClick={() => enterSubtheme(subthemeKey)}
          >
            <h4 style={styles.subthemeTitle}>{KNOWLEDGE_MAP[currentArea].subtemas[subthemeKey].title}</h4>
            <ul style={styles.subthemeList}>
              {KNOWLEDGE_MAP[currentArea].subtemas[subthemeKey].content.map((item, index) => (
                <li key={index} style={styles.subthemeListItem}>{item}</li>
              ))}
            </ul>
            {KNOWLEDGE_MAP[currentArea].subtemas[subthemeKey].examples && (
              <div style={styles.previewBadge}>
                <span style={styles.previewIcon}>📋</span> {KNOWLEDGE_MAP[currentArea].subtemas[subthemeKey].examples.length} ejemplos
              </div>
            )}
            {KNOWLEDGE_MAP[currentArea].subtemas[subthemeKey].relationships && (
              <div style={styles.previewBadge}>
                <span style={styles.previewIcon}>🔄</span> {KNOWLEDGE_MAP[currentArea].subtemas[subthemeKey].relationships.length} relaciones
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Componente de detalle de subtema
  const DetailView = () => {
    const currentContent = KNOWLEDGE_MAP[currentArea].subtemas[currentSubtheme];
    
    return (
      <div style={styles.detailView}>
        <h2 style={styles.sectionTitle}>{KNOWLEDGE_MAP[currentArea].title}</h2>
        <h3 style={styles.subthemeTitle}>{currentContent.title}</h3>
        
        <div style={styles.tabsContainer}>
          <button 
            style={{
              ...styles.tabButton,
              ...(activeDetailTab === 'content' ? styles.activeTab : {})
            }}
            onClick={() => setActiveDetailTab('content')}
          >
            Contenido
          </button>
          {currentContent.examples && (
            <button 
              style={{
                ...styles.tabButton,
                ...(activeDetailTab === 'examples' ? styles.activeTab : {})
              }}
              onClick={() => setActiveDetailTab('examples')}
            >
              Ejemplos
            </button>
          )}
          {(currentContent.decisionTree || currentContent.applicationTable || currentContent.causeEffect) && (
            <button 
              style={{
                ...styles.tabButton,
                ...(activeDetailTab === 'application' ? styles.activeTab : {})
              }}
              onClick={() => setActiveDetailTab('application')}
            >
              Aplicación
            </button>
          )}
          {currentContent.relationships && (
            <button 
              style={{
                ...styles.tabButton,
                ...(activeDetailTab === 'relationships' ? styles.activeTab : {})
              }}
              onClick={() => setActiveDetailTab('relationships')}
            >
              Relaciones
            </button>
          )}
        </div>
        
        {/* Contenido principal */}
        {activeDetailTab === 'content' && (
          <div style={styles.contentBox}>
            {currentContent.content.map((item, index) => (
              <div key={index} style={styles.contentItem}>
                <div style={styles.itemNumber}>{index + 1}</div>
                <p style={styles.contentText}>{item}</p>
              </div>
            ))}
            
            {currentContent.reflectionQuestions && (
              <div style={styles.reflectionBox}>
                <h4 style={styles.reflectionTitle}>Preguntas de reflexión:</h4>
                <ul style={styles.reflectionList}>
                  {currentContent.reflectionQuestions.map((question, index) => (
                    <li key={index} style={styles.reflectionItem}>{question}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        
        {/* Ejemplos */}
        {activeDetailTab === 'examples' && currentContent.examples && (
          <div style={styles.examplesBox}>
            {currentContent.examples.map((example, index) => (
              <div key={index} style={styles.exampleCard}>
                <h4 style={styles.exampleTitle}>{example.title}</h4>
                <p style={styles.exampleDescription}>{example.description}</p>
              </div>
            ))}
          </div>
        )}
        
        {/* Aplicación práctica */}
        {activeDetailTab === 'application' && (
          <div style={styles.applicationBox}>
            {currentContent.decisionTree && (
              <div style={styles.decisionTreeCard}>
                <h4 style={styles.decisionTreeTitle}>{currentContent.decisionTree.question}</h4>
                <div style={styles.factorsBox}>
                  <h5 style={styles.factorsTitle}>Factores a considerar:</h5>
                  <ul style={styles.factorsList}>
                    {currentContent.decisionTree.factors.map((factor, index) => (
                      <li key={index} style={styles.factorItem}>{factor}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {currentContent.applicationTable && (
              <div style={styles.applicationTableCard}>
                <h4 style={styles.applicationTableTitle}>{currentContent.applicationTable.title}</h4>
                <table style={styles.applicationTable}>
                  <thead>
                    <tr>
                      <th style={styles.tableHeader}>{Object.keys(currentContent.applicationTable.rows[0])[0]}</th>
                      <th style={styles.tableHeader}>{Object.keys(currentContent.applicationTable.rows[0])[1]}</th>
                      <th style={styles.tableHeader}>{Object.keys(currentContent.applicationTable.rows[0])[2]}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentContent.applicationTable.rows.map((row, index) => (
                      <tr key={index}>
                        <td style={styles.tableCell}>{Object.values(row)[0]}</td>
                        <td style={styles.tableCell}>{Object.values(row)[1]}</td>
                        <td style={styles.tableCell}>{Object.values(row)[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {currentContent.causeEffect && (
              <div style={styles.causeEffectCard}>
                <h4 style={styles.causeEffectTitle}>{currentContent.causeEffect.title}</h4>
                <ul style={styles.effectsList}>
                  {currentContent.causeEffect.effects.map((effect, index) => (
                    <li key={index} style={styles.effectItem}>{effect}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        
        {/* Relaciones */}
        {activeDetailTab === 'relationships' && currentContent.relationships && (
          <div style={styles.relationshipsBox}>
            <h4 style={styles.relationshipsTitle}>Conceptos relacionados:</h4>
            <div style={styles.relationshipsGrid}>
              {currentContent.relationships.map((relation, index) => {
                const [relatedArea, relatedSubtheme] = relation.split('.');
                const relatedContent = KNOWLEDGE_MAP[relatedArea].subtemas[relatedSubtheme];
                
                return (
                  <div 
                    key={index} 
                    style={styles.relationCard}
                    onClick={() => navigateToRelatedTopic(relation)}
                  >
                    <div style={styles.relationHeader}>
                      <span style={styles.relationArea}>{KNOWLEDGE_MAP[relatedArea].title}</span>
                      <span style={styles.relationIcon}>{KNOWLEDGE_MAP[relatedArea].icon}</span>
                    </div>
                    <h5 style={styles.relationTitle}>{relatedContent.title}</h5>
                    <p style={styles.relationDescription}>
                      {relatedContent.content[0].length > 60 
                        ? relatedContent.content[0].substring(0, 60) + '...' 
                        : relatedContent.content[0]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Calcular el porcentaje de progreso
  const progressPercentage = (explorationPath.length / calculateTotalConcepts()) * 100;

  // Estilos mejorados
  const styles = {
    exploratoryLearning: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      background: '#f7f9fc',
      borderRadius: '12px',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)',
      color: '#333'
    },
    breadcrumb: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
      fontSize: '14px',
      background: 'white',
      padding: '10px 15px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    },
    breadcrumbButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#3498db',
      padding: '5px',
      fontSize: '14px',
      fontWeight: '500'
    },
    breadcrumbButtonActive: {
      fontWeight: 'bold',
      color: '#2c3e50'
    },
    breadcrumbButtonCurrent: {
      color: '#7f8c8d',
      cursor: 'default'
    },
    breadcrumbSeparator: {
      margin: '0 5px',
      color: '#95a5a6'
    },
    areasGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '20px',
      marginTop: '20px'
    },
    areaCard: {
      background: 'white',
      borderRadius: '12px',
      padding: '25px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      cursor: 'pointer',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      border: '1px solid #f0f0f0',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    areaCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 12px 20px rgba(0,0,0,0.1)'
    },
    areaIcon: {
      fontSize: '48px',
      marginBottom: '15px',
      display: 'inline-block'
    },
    areaTitle: {
      color: '#2c3e50',
      marginTop: '0',
      marginBottom: '10px',
      fontSize: '22px',
      fontWeight: '600'
    },
    areaDescription: {
      color: '#7f8c8d',
      marginBottom: '15px',
      lineHeight: '1.6',
      flex: '1'
    },
    discoveryBadge: {
      background: 'linear-gradient(135deg, #f3c74f 0%, #f1c40f 100%)',
      color: '#fff',
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '13px',
      display: 'inline-block',
      fontWeight: '500',
      boxShadow: '0 2px 5px rgba(241, 196, 15, 0.3)'
    },
    subthemesContainer: {
      background: 'white',
      borderRadius: '12px',
      padding: '30px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
    },
    sectionTitle: {
      color: '#2c3e50',
      marginTop: '0',
      fontSize: '26px',
      fontWeight: '700',
      borderBottom: '2px solid #f0f4f8',
      paddingBottom: '10px',
      marginBottom: '20px'
    },
    subthemesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
      marginTop: '25px'
    },
    subthemeCard: {
      background: '#f8f9fa',
      borderRadius: '10px',
      padding: '22px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: '1px solid #eaecef',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    subthemeCardHover: {
      background: '#e8f4fc',
      boxShadow: '0 5px 15px rgba(52, 152, 219, 0.1)',
      transform: 'translateY(-3px)'
    },
    subthemeTitle: {
      marginTop: '0',
      color: '#2c3e50',
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '15px'
    },
    subthemeList: {
      paddingLeft: '20px',
      color: '#34495e',
      margin: '0 0 15px 0',
      flex: '1'
    },
    subthemeListItem: {
      marginBottom: '8px',
      lineHeight: '1.5'
    },
    previewBadge: {
      display: 'inline-block',
      background: '#e8f4fc',
      color: '#3498db',
      padding: '5px 10px',
      borderRadius: '15px',
      fontSize: '13px',
      marginRight: '8px',
      marginTop: '5px'
    },
    previewIcon: {
      marginRight: '3px'
    },
    detailView: {
      background: 'white',
      borderRadius: '12px',
      padding: '30px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
    },
    tabsContainer: {
      display: 'flex',
      borderBottom: '1px solid #ecf0f1',
      marginBottom: '25px',
      overflowX: 'auto',
      padding: '0 0 1px 0'
    },
    tabButton: {
      padding: '12px 20px',
      background: 'transparent',
      border: 'none',
      borderBottom: '3px solid transparent',
      margin: '0 5px',
      fontSize: '15px',
      fontWeight: '500',
      color: '#7f8c8d',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    activeTab: {
      color: '#3498db',
      borderBottom: '3px solid #3498db',
      fontWeight: '600'
    },
    contentBox: {
      margin: '25px 0'
    },
    contentItem: {
      display: 'flex',
      marginBottom: '20px',
      alignItems: 'flex-start',
      padding: '15px',
      background: '#f8f9fa',
      borderRadius: '10px',
      border: '1px solid #eaecef'
    },
    itemNumber: {
      background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
      color: 'white',
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '15px',
      flexShrink: '0',
      fontWeight: '600',
      boxShadow: '0 2px 5px rgba(41, 128, 185, 0.3)'
    },
    contentText: {
      margin: '0',
      lineHeight: '1.6',
      fontSize: '16px'
    },
    reflectionBox: {
      marginTop: '30px',
      padding: '20px',
      background: '#f0f7fb',
      borderRadius: '10px',
      borderLeft: '4px solid #3498db'
    },
    reflectionTitle: {
      color: '#2c3e50',
      marginTop: '0',
      marginBottom: '15px',
      fontSize: '18px',
      fontWeight: '600'
    },
    reflectionList: {
      paddingLeft: '20px',
      margin: '0'
    },
    reflectionItem: {
      marginBottom: '10px',
      lineHeight: '1.5',
      color: '#34495e'
    },
    examplesBox: {
      margin: '25px 0',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px'
    },
    exampleCard: {
      background: '#f8f9fa',
      borderRadius: '10px',
      padding: '20px',
      border: '1px solid #eaecef'
    },
    exampleTitle: {
      marginTop: '0',
      color: '#2c3e50',
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '10px'
    },
    exampleDescription: {
      margin: '0',
      lineHeight: '1.6',
      color: '#34495e'
    },
    applicationBox: {
      margin: '25px 0'
    },
    decisionTreeCard: {
      background: '#f0f7fb',
      borderRadius: '10px',
      padding: '20px',
      marginBottom: '25px',
      borderLeft: '4px solid #3498db'
    },
    decisionTreeTitle: {
      marginTop: '0',
      color: '#2c3e50',
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '15px'
    },
    factorsBox: {
      background: 'white',
      borderRadius: '8px',
      padding: '15px',
      marginTop: '15px'
    },
    factorsTitle: {
      marginTop: '0',
      color: '#7f8c8d',
      fontSize: '16px',
      fontWeight: '500',
      marginBottom: '10px'
    },
    factorsList: {
      paddingLeft: '20px',
      margin: '0'
    },
    factorItem: {
      marginBottom: '8px',
      lineHeight: '1.5',
      color: '#34495e'
    },
    applicationTableCard: {
      background: '#f5fbf7',
      borderRadius: '10px',
      padding: '20px',
      marginBottom: '25px',
      borderLeft: '4px solid #2ecc71'
    },
    applicationTableTitle: {
      marginTop: '0',
      color: '#2c3e50',
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '15px'
    },
    applicationTable: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '15px'
    },
    tableHeader: {
      background: '#e8f5e9',
      padding: '12px',
      textAlign: 'left',
      color: '#27ae60',
      fontWeight: '600',
      borderBottom: '2px solid #c8e6c9'
    },
    tableCell: {
      padding: '12px',
      borderBottom: '1px solid #e0e0e0',
      color: '#34495e'
    },
    causeEffectCard: {
      background: '#fef9e7',
      borderRadius: '10px',
      padding: '20px',
      borderLeft: '4px solid #f39c12'
    },
    causeEffectTitle: {
      marginTop: '0',
      color: '#2c3e50',
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '15px'
    },
    effectsList: {
      paddingLeft: '20px',
      margin: '0'
    },
    effectItem: {
      marginBottom: '8px',
      lineHeight: '1.5',
      color: '#34495e'
    },
    relationshipsBox: {
      margin: '25px 0'
    },
    relationshipsTitle: {
      marginTop: '0',
      color: '#2c3e50',
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '15px'
    },
    relationshipsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px'
    },
    relationCard: {
      background: '#f8f9fa',
      borderRadius: '10px',
      padding: '20px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: '1px solid #eaecef'
    },
    relationCardHover: {
      background: '#e8f4fc',
      boxShadow: '0 5px 15px rgba(52, 152, 219, 0.1)',
      transform: 'translateY(-3px)'
    },
    relationHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px'
    },
    relationArea: {
      fontSize: '14px',
      color: '#7f8c8d',
      fontWeight: '500'
    },
    relationIcon: {
      fontSize: '24px'
    },
    relationTitle: {
      margin: '0 0 10px 0',
      color: '#2c3e50',
      fontSize: '16px',
      fontWeight: '600'
    },
    relationDescription: {
      margin: '0',
      lineHeight: '1.5',
      color: '#7f8c8d',
      fontSize: '14px'
    },
    progressContainer: {
      margin: '30px 0',
      background: '#ecf0f1',
      borderRadius: '10px',
      height: '10px',
      overflow: 'hidden'
    },
    progressBar: {
      height: '100%',
      background: 'linear-gradient(90deg, #3498db, #2ecc71)',
      borderRadius: '10px',
      transition: 'width 0.5s ease'
    },
    progressText: {
      textAlign: 'center',
      color: '#7f8c8d',
      fontSize: '14px',
      marginTop: '5px'
    }
  };

  return (
    <div style={styles.exploratoryLearning}>
      {/* Breadcrumb navigation */}
      <div style={styles.breadcrumb}>
        <button 
          style={styles.breadcrumbButton} 
          onClick={() => {
            setCurrentArea(null);
            setCurrentSubtheme(null);
            setViewMode('areas');
            setExplorationPath([]);
          }}
        >
          Inicio
        </button>
        
        {explorationPath.length > 0 && (
          <>
            <span style={styles.breadcrumbSeparator}>›</span>
            {explorationPath.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span style={styles.breadcrumbSeparator}>›</span>}
                <button
                  style={{
                    ...styles.breadcrumbButton,
                    ...(index === explorationPath.length - 1 ? styles.breadcrumbButtonCurrent : {})
                  }}
                  onClick={() => {
                    if (index < explorationPath.length - 1) {
                      const newPath = explorationPath.slice(0, index + 1);
                      setExplorationPath(newPath);
                      
                      if (index % 2 === 0) {
                        // Es un área
                        setCurrentArea(newPath[index]);
                        setCurrentSubtheme(null);
                        setViewMode('subthemes');
                      } else {
                        // Es un subtema
                        setCurrentArea(newPath[index - 1]);
                        setCurrentSubtheme(newPath[index]);
                        setViewMode('detail');
                      }
                    }
                  }}
                >
                  {index % 2 === 0 
                    ? KNOWLEDGE_MAP[item].title 
                    : KNOWLEDGE_MAP[currentArea].subtemas[item].title}
                </button>
              </React.Fragment>
            ))}
          </>
        )}
      </div>

      {/* Progress bar */}
      <div style={styles.progressContainer}>
        <div 
          style={{
            ...styles.progressBar,
            width: `${progressPercentage}%`
          }} 
        />
      </div>
      <div style={styles.progressText}>
        {Math.round(progressPercentage)}% completado ({explorationPath.length} de {calculateTotalConcepts()} conceptos explorados)
      </div>

      {/* Main content view */}
      {viewMode === 'areas' && <AreasView />}
      {viewMode === 'subthemes' && <SubthemesView />}
      {viewMode === 'detail' && <DetailView />}

      {/* Back button when not on areas view */}
      {viewMode !== 'areas' && (
        <button 
          style={{
            background: '#ecf0f1',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '15px',
            color: '#7f8c8d',
            transition: 'all 0.2s ease'
          }}
          onClick={goBack}
        >
          ← Volver atrás
        </button>
      )}
    </div>
  );
};

export default ModoAprendizajeExploratorio;