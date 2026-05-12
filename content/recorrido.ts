export const recorrido = [
  {
    id: "extincion",
    title: "Extinción",
    subtitle: "El mundo cambia",
    time: "Hace 66 millones de años",
    href: "/recorrido/extincion",
    next: "/recorrido/purgatorius",
    previous: "/",
    color: "orange",
    challenge:
      "El cielo se oscurece, baja la temperatura y los ecosistemas se alteran.",
    question:
      "¿Qué estrategia puede ayudar a sobrevivir cuando el ambiente cambia de golpe?",
    options: [
      "Ser enorme y necesitar mucho alimento",
      "Buscar refugio y consumir distintos recursos",
      "Permanecer siempre en el mismo lugar",
    ],
    learning:
      "Una extinción no elimina toda la vida: cambia las condiciones de supervivencia.",
  },
  {
    id: "purgatorius",
    title: "Purgatorius",
    subtitle: "Pequeños sobrevivientes",
    time: "Paleoceno temprano",
    href: "/recorrido/purgatorius",
    next: "/recorrido/primeros-primates",
    previous: "/recorrido/extincion",
    color: "emerald",
    challenge:
      "En un mundo transformado, los animales pequeños encuentran oportunidades.",
    question:
      "¿Qué ventaja puede tener un animal pequeño, ágil y flexible en su alimentación?",
    options: [
      "Necesita menos alimento y puede refugiarse mejor",
      "Siempre vence por fuerza",
      "No depende del ambiente",
    ],
    learning:
      "La supervivencia depende de la relación entre rasgos y ambiente.",
  },
  {
    id: "primeros-primates",
    title: "Primeros primates",
    subtitle: "Ver, trepar, explorar",
    time: "Después del Paleoceno",
    href: "/recorrido/primeros-primates",
    next: "/recorrido/australopithecus",
    previous: "/recorrido/purgatorius",
    color: "lime",
    challenge:
      "La vida en ambientes con árboles favorece nuevas formas de moverse y percibir.",
    question:
      "¿Qué rasgos ayudan a explorar ramas, frutos y refugios?",
    options: [
      "Mejor visión, manos hábiles y coordinación",
      "Solo mayor tamaño corporal",
      "Depender de un único alimento",
    ],
    learning:
      "Muchos rasgos primates se relacionan con movimiento, visión y exploración.",
  },
  {
    id: "australopithecus",
    title: "Australopithecus afarensis",
    subtitle: "Caminar y adaptarse",
    time: "Entre 3,85 y 2,95 millones de años atrás",
    href: "/recorrido/australopithecus",
    next: "/recorrido/valle-del-rift",
    previous: "/recorrido/primeros-primates",
    color: "amber",
    challenge:
      "Los ambientes cambian y moverse de otra manera abre nuevas posibilidades.",
    question:
      "¿Qué ventaja puede aportar caminar erguido en ambientes abiertos?",
    options: [
      "Ver más lejos, liberar las manos y desplazarse de otra forma",
      "Eliminar todos los peligros",
      "No necesitar cooperación",
    ],
    learning:
      "El bipedismo fue una adaptación importante, pero no la única.",
  },
  {
    id: "valle-del-rift",
    title: "Valle del Rift",
    subtitle: "Ambientes que presionan, caminos que se abren",
    time: "África oriental",
    href: "/recorrido/valle-del-rift",
    next: "/recorrido/homo-habilis",
    previous: "/recorrido/australopithecus",
    color: "yellow",
    challenge:
      "Cambios geológicos y ambientales crean mosaicos de bosques, sabanas, lagos y zonas abiertas.",
    question:
      "¿Qué estrategia ayuda en un ambiente diverso y cambiante?",
    options: [
      "Moverse, observar, probar recursos distintos y aprender",
      "Usar siempre la misma conducta",
      "Evitar toda exploración",
    ],
    learning:
      "El ambiente no dirige la evolución hacia una meta, pero sí genera presiones y oportunidades.",
  },
  {
    id: "homo-habilis",
    title: "Homo habilis",
    subtitle: "Manos, piedra y oportunidad",
    time: "Hace aproximadamente 2,4 a 1,4 millones de años",
    href: "/recorrido/homo-habilis",
    next: "/recorrido/homo-erectus",
    previous: "/recorrido/valle-del-rift",
    color: "stone",
    challenge:
      "Usar objetos del ambiente permite resolver problemas de nuevas maneras.",
    question:
      "¿Qué cambia cuando una especie fabrica o usa herramientas?",
    options: [
      "Puede transformar el ambiente y acceder a nuevos recursos",
      "Deja de depender de otros seres vivos",
      "Ya no necesita aprender",
    ],
    learning:
      "La tecnología empieza como una forma de adaptación.",
  },
  {
    id: "homo-erectus",
    title: "Homo erectus",
    subtitle: "Caminar lejos, controlar el fuego, expandirse",
    time: "Hace aproximadamente 1,9 millones a 110 mil años",
    href: "/recorrido/homo-erectus",
    next: "/recorrido/neandertales",
    previous: "/recorrido/homo-habilis",
    color: "red",
    challenge:
      "Migrar, resistir climas diversos y sostener grupos requiere nuevas capacidades.",
    question:
      "¿Qué ventaja tiene combinar movilidad, herramientas y cooperación?",
    options: [
      "Permite habitar ambientes más variados",
      "Garantiza sobrevivir sin cambios",
      "Hace innecesaria la comunicación",
    ],
    learning:
      "La supervivencia humana se vuelve cada vez más social, técnica y ambiental.",
  },
  {
    id: "neandertales",
    title: "Neandertales",
    subtitle: "Adaptarse al frío, cuidar al grupo",
    time: "Hace aproximadamente 400 mil a 40 mil años",
    href: "/recorrido/neandertales",
    next: "/recorrido/homo-sapiens",
    previous: "/recorrido/homo-erectus",
    color: "sky",
    challenge:
      "Ambientes fríos y exigentes requieren conocimiento, herramientas y vida grupal.",
    question:
      "¿Qué valor tiene cuidar, enseñar y compartir recursos dentro de un grupo?",
    options: [
      "Aumenta las posibilidades de supervivencia colectiva",
      "Solo ayuda a los más fuertes",
      "No influye en la adaptación",
    ],
    learning:
      "La adaptación también puede ser cultural y social.",
  },
  {
    id: "homo-sapiens",
    title: "Homo sapiens",
    subtitle: "Lenguaje, memoria y cooperación",
    time: "Desde hace aproximadamente 300 mil años",
    href: "/recorrido/homo-sapiens",
    next: "/recorrido/presente",
    previous: "/recorrido/neandertales",
    color: "violet",
    challenge:
      "Comunicar, imaginar, enseñar y organizarse permite resolver problemas complejos.",
    question:
      "¿Cuál es una de las grandes ventajas adaptativas de Homo sapiens?",
    options: [
      "La adaptación colectiva mediante cultura, lenguaje y cooperación",
      "La fuerza individual",
      "La independencia total del ambiente",
    ],
    learning:
      "Nuestra supervivencia depende profundamente de aprender y actuar con otros.",
  },
  {
    id: "presente",
    title: "Presente",
    subtitle: "Adaptación colectiva",
    time: "Hoy",
    href: "/recorrido/presente",
    next: "/aula",
    previous: "/recorrido/homo-sapiens",
    color: "cyan",
    challenge:
      "La humanidad transforma el ambiente y enfrenta desafíos globales.",
    question:
      "¿Qué aprendizaje deja este recorrido para el presente?",
    options: [
      "Sobrevivimos mejor cuando cooperamos, cuidamos y aprendemos juntos",
      "Cada individuo debe resolver todo solo",
      "La evolución ya no importa",
    ],
    learning:
      "La adaptación colectiva es un valor central para nuestra supervivencia futura.",
  },
];