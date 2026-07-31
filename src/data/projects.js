import aaPractices from '../../assets/images/aa_practices.svg'
import mhPractices from '../../assets/images/mh_practices.svg'
import modDinamicos from '../../assets/images/modelos_dinamicos.jpg'
import libros from '../../assets/images/libros_apilados.jpg'
import testGen from '../../assets/images/test-generator.svg'
import saveImage from '../../assets/images/save-image.png'
import tda from '../../assets/images/tda.png'
import agente from '../../assets/images/agente-reactivo.jpg'
import parchis from '../../assets/images/parchis.jpg'
import irgarten from '../../assets/images/irgarten.jpg'
import arch from '../../assets/images/arch.jpg'
import rutas from '../../assets/images/rutas.png'
import eco from '../../assets/images/eco.jpg'
import scdCluster from '../../assets/images/scd_concurrency_mpi.jpg'
import threePartition from '../../assets/images/three_partition_np.jpg'
import algorithmsPatterns from '../../assets/images/algorithms_patterns.svg'
import financeManager from '../../assets/images/finance_manager.svg'
import ddsi from '../../assets/images/ddsi.svg'
import pdfToMd from '../../assets/images/pdf_to_md.svg'
import personalSite from '../../assets/images/personal_site.svg'
import ansibleLab from '../../assets/images/ansible_infra_lab.svg'
import godotGraphics from '../../assets/images/godot_graphics.svg'
import oracleSql from '../../assets/images/oracle_sql.svg'
import softwareEngineering from '../../assets/images/software_engineering.svg'
import neetcode from '../../assets/images/neetcode.svg'
import earlyCourses from '../../assets/images/early_courses.svg'

export const projects = [
  {
    title: 'Laboratorio de infraestructura con Ansible',
    desc: 'Aprovisionamiento de un laboratorio Rocky Linux: playbooks que crean usuarios y servidores web, Prometheus y Grafana midiéndolos, y un plan de JMeter que los somete a carga. Las claves no viven en el repositorio, las genera un script.',
    tag: 'DevOps · Ansible',
    url: 'https://github.com/Ismael-Sallami/ansible-infra-lab',
    img: ansibleLab,
    featured: true,
    en: {
      title: 'Infrastructure lab with Ansible',
      desc: 'Provisioning of a small Rocky Linux lab: playbooks that create users and web servers, Prometheus and Grafana measuring them, and a JMeter plan that puts them under load. The keys do not live in the repository, a script generates them.',
      tag: 'DevOps · Ansible',
    },
  },
  {
    title: 'Algorithms and Patterns',
    desc: '183 implementaciones organizadas por patrón. 126 son extractos de mi trabajo previo, cada uno con enlace al fichero y las líneas de las que sale; las otras 57 están escritas para el repositorio y se verifican solas al compilar.',
    tag: 'Algoritmos · C++',
    url: 'https://github.com/Ismael-Sallami/algorithms-and-patterns',
    img: algorithmsPatterns,
    featured: true,
    en: {
      title: 'Algorithms and Patterns',
      desc: '183 implementations organised by pattern. 126 are extracts from my earlier work, each linking to the file and lines it came from; the other 57 were written for the repository and verify themselves when compiled.',
      tag: 'Algorithms · C++',
    },
  },
  {
    title: 'Personal Finance Manager',
    desc: 'Servicio de finanzas autoalojado: importa extractos de varios brókeres, calcula rentabilidad en aritmética decimal, agrega los informes y expone un bot de Telegram. FastAPI y PostgreSQL.',
    tag: 'Full-stack',
    url: 'https://github.com/Ismael-Sallami/personal-finance-manager',
    img: financeManager,
    featured: true,
    en: {
      title: 'Personal Finance Manager',
      desc: 'Self-hosted finance service: imports statements from several brokers, computes returns in decimal arithmetic, aggregates the reports and exposes a Telegram bot. FastAPI and PostgreSQL.',
      tag: 'Full-stack',
    },
  },
  {
    title: 'Concurrencia y sistemas distribuidos',
    desc: 'Programación concurrente y distribuida desde primitivas: semáforos, monitores, paso de mensajes con MPI y planificadores de tiempo real (~8.500 líneas de C++).',
    tag: 'C++ · MPI',
    url: 'https://github.com/Ismael-Sallami/concurrency-mpi',
    img: scdCluster,
    en: {
      title: 'Concurrency and distributed systems',
      desc: 'Concurrent and distributed programming from primitives: semaphores, monitors, MPI message passing and real-time schedulers (~8,500 lines of C++).',
      tag: 'C++ · MPI',
    },
  },
  {
    title: 'Parchís · IA con adversario',
    desc: 'Agente para un parchís de cuatro jugadores con dados, así que el árbol tiene nodos de azar. Minimax, minimax con límite de profundidad, cuatro variantes de poda alfa-beta con ordenación de movimientos y corte probabilístico, búsqueda de quietud y cinco funciones de evaluación comparadas entre sí.',
    tag: 'IA · C++',
    url: 'https://github.com/Ismael-Sallami/parchis-ai',
    img: parchis,
    en: {
      title: 'Parcheesi · Adversarial search',
      desc: 'An agent for a four-player dice game, so the tree has chance nodes. Minimax, depth-limited minimax, four alpha-beta variants with move ordering and probabilistic cutoff, quiescence search, and five evaluation functions played against each other.',
      tag: 'AI · C++',
    },
  },
  {
    title: 'Sistema de información sobre Oracle',
    desc: 'Esquema relacional en Oracle con la integridad dentro de la base de datos: disparadores para el estado derivado y la auditoría, procedimientos en el servidor y escrituras transaccionales que confirman o revierten como una unidad. Trabajo de un equipo de cinco, con un subsistema por persona.',
    tag: 'Oracle · SQL',
    url: 'https://github.com/Ismael-Sallami/oracle-dbms-project',
    img: ddsi,
    en: {
      title: 'Information system on Oracle',
      desc: 'Relational schema in Oracle with the integrity kept inside the database: triggers for derived state and auditing, server-side procedures, and transactional writes that commit or roll back as one unit. Built by a team of five, one subsystem each.',
      tag: 'Oracle · SQL',
    },
  },
  {
    title: 'pdf-to-md',
    desc: 'Conversor de PDF a Markdown por línea de órdenes. La extracción va en cascada: primero la capa de texto, luego el análisis de disposición y sólo al final OCR, que es órdenes de magnitud más lento y sobra en los documentos que no lo necesitan.',
    tag: 'Python · CLI',
    url: 'https://github.com/Ismael-Sallami/pdf-to-md',
    img: pdfToMd,
    en: {
      title: 'pdf-to-md',
      desc: 'A command-line PDF to Markdown converter. Extraction is layered: the text layer first, then layout analysis, and OCR only at the end, since it is orders of magnitude slower and wasted on documents that do not need it.',
      tag: 'Python · CLI',
    },
  },
  {
    title: 'Esta web',
    desc: 'El sitio que estás leyendo: Vite, React Router, Tailwind, framer-motion y una escena en three.js, con todo el contenido en español e inglés desde un único fichero de textos.',
    tag: 'React',
    url: 'https://github.com/Ismael-Sallami/Ismael-Sallami.github.io',
    img: personalSite,
    en: {
      title: 'This website',
      desc: 'The site you are reading: Vite, React Router, Tailwind, framer-motion and a three.js scene, with every string in Spanish and English from a single file.',
      tag: 'React',
    },
  },
  {
    title: 'Prácticas de aprendizaje automático',
    desc: 'Aprendizaje automático de principio a fin: comparación de clasificadores bajo validación cruzada, agrupamiento eligiendo el número de grupos y el radio de vecindad a partir de los datos, y redes neuronales con regularización sobre texto.',
    tag: 'Machine Learning',
    url: 'https://github.com/Ismael-Sallami/machine-learning-practices',
    img: aaPractices,
    en: {
      title: 'Machine learning practices',
      desc: 'Machine learning end to end: classifier comparison under cross-validation, clustering with the cluster count and neighbourhood radius chosen from the data, and regularised neural networks over text.',
      tag: 'Machine Learning',
    },
  },
  {
    title: 'Metaheurísticas · optimización de cartera',
    desc: 'Dieciséis algoritmos de optimización sobre el mismo problema de cartera, del greedy y la búsqueda local al enfriamiento simulado, genéticos, meméticos y evolución diferencial. Cada uno se mide con repeticiones y desviación típica, no con una sola ejecución.',
    tag: 'Metaheurística',
    url: 'https://github.com/Ismael-Sallami/metaheuristics',
    img: mhPractices,
    featured: true,
    en: {
      title: 'Metaheuristics · portfolio optimisation',
      desc: 'Sixteen optimisation algorithms on one portfolio problem, from greedy and local search to simulated annealing, genetic, memetic and differential evolution. Each is measured over repeated runs with a standard deviation, not a single run.',
      tag: 'Metaheuristics',
    },
  },
  {
    title: '3-Partition · Demostración NP-completo',
    desc: 'Prueba formal en LaTeX (16 páginas) de la NP-completitud fuerte del problema 3-Partition, reproduciendo la cadena de reducción de Garey & Johnson.',
    tag: 'Complejidad',
    url: 'https://github.com/Ismael-Sallami/3-Partition-NP-Completeness',
    img: threePartition,
    en: {
      title: '3-Partition · NP-Completeness Proof',
      desc: 'A 16-page formal LaTeX proof of the strong NP-completeness of 3-Partition, reproducing Garey & Johnson\'s reduction chain.',
      tag: 'Complexity',
    },
  },
  {
    title: 'Blog del doble grado Informática + ADE',
    desc: 'Web con contenido y recursos del doble grado de Ingeniería Informática y Administración y Dirección de Empresas.',
    tag: 'Web',
    url: 'https://elblogdeismael.github.io/',
    img: libros,
    en: {
      title: 'Computer Engineering + Business Double Degree Blog',
      desc: 'Website with content and resources from the double degree in Computer Engineering and Business Administration.',
      tag: 'Web',
    },
  },
  {
    title: 'md2html · Test Generator',
    desc: 'Convierte preguntas escritas en Markdown en un test HTML que se corrige solo: baraja, califica y muestra la explicación de cada respuesta. El resultado es un único fichero que funciona sin servidor, y sus doce temas son los mismos que usa la versión web.',
    tag: 'Tooling',
    url: 'https://github.com/Ismael-Sallami/md2html-testGenerator',
    img: testGen,
    en: {
      title: 'md2html · Test Generator',
      desc: 'Turns questions written in Markdown into a self-marking HTML quiz: it shuffles them, marks them and shows an explanation per answer. The result is a single file that runs with no server, and its twelve themes are the ones the browser version uses.',
      tag: 'Tooling',
    },
  },
  {
    title: 'Media Manager',
    desc: 'Libera espacio en el móvil trasladando las fotos al ordenador y detecta las duplicadas por hash del contenido, no por nombre ni tamaño: al moverse entre dispositivos los nombres cambian y los bytes no.',
    tag: 'App',
    url: 'https://github.com/Ismael-Sallami/media-manager',
    img: saveImage,
    en: {
      title: 'Media Manager',
      desc: 'Frees space on the phone by moving photos to the computer, and finds duplicates by hashing contents rather than comparing names or sizes: names change when files move between devices and the bytes do not.',
      tag: 'App',
    },
  },
  {
    title: 'TDA · Tratamiento de Imagen',
    desc: 'Un tipo abstracto de dato para imágenes con la memoria gestionada a mano: matriz de punteros sobre un bloque contiguo, regla de tres para que copiar no acabe en doble liberación, y las operaciones construidas encima.',
    tag: 'C++',
    url: 'https://github.com/Ismael-Sallami/image-adt',
    img: tda,
    en: {
      title: 'ADT · Image Processing',
      desc: 'An image abstract data type with the memory managed by hand: a pointer array over one contiguous block, the rule of three so copying does not end in a double free, and the operations built on top.',
      tag: 'C++',
    },
  },
  {
    title: 'Agentes reactivos y deliberativos',
    desc: 'Agentes que exploran un mapa que no conocen. Cuando no hay mapa sobre el que planificar actúan por reglas; cuando lo hay, planifican con Dijkstra sobre una rejilla con coste y estado compuesto, y con A* usando distancia Manhattan. La proyección del sensor al mapa global es lo que une las dos capas.',
    tag: 'IA · C++',
    url: 'https://github.com/Ismael-Sallami/rescue-agents',
    img: agente,
    featured: true,
    en: {
      title: 'Reactive and Deliberative Agents',
      desc: 'Agents exploring a map they do not know. With no map to plan over they act on rules; once there is one they plan with Dijkstra over a weighted grid with composite state, and with A* using a Manhattan heuristic. Projecting the sensor reading onto the global map is what joins the two layers.',
      tag: 'AI · C++',
    },
  },
  {
    title: 'Irrgarten',
    desc: 'Juego de monstruos desarrollado en Java y Ruby como proyecto de POO.',
    tag: 'Java · Ruby',
    url: 'https://github.com/Ismael-Sallami/irrgarten',
    img: irgarten,
    featured: true,
    en: {
      title: 'Irrgarten',
      desc: 'A monster game built in Java and Ruby as an OOP project.',
      tag: 'Java · Ruby',
    },
  },
  {
    title: 'Arch Linux · Dotfiles',
    desc: 'Configuración personalizada de Arch Linux: scripts, dotfiles y ajustes de sistema.',
    tag: 'Linux',
    url: 'https://github.com/Ismael-Sallami/Arch_Configuration',
    img: arch,
    en: {
      title: 'Arch Linux · Dotfiles',
      desc: 'Custom Arch Linux setup: scripts, dotfiles and system tweaks.',
      tag: 'Linux',
    },
  },
  {
    title: 'Air Lines Project',
    desc: 'Contenedores escritos a mano en C++ sobre un dominio de rutas aéreas: un almacén ordenado por clave, iteradores bidireccionales, semántica de copia profunda y lectura y escritura de imágenes PPM y PGM en binario.',
    tag: 'C++',
    url: 'https://github.com/Ismael-Sallami/airline-routes-adt',
    img: rutas,
    en: {
      title: 'Air Lines Project',
      desc: 'Hand-written C++ containers over an air routes domain: a key-ordered store, bidirectional iterators, deep copy semantics, and binary PPM and PGM image reading and writing.',
      tag: 'C++',
    },
  },
  {
    title: 'Modelo Econométrico · Obesidad',
    desc: 'Modelo econométrico sobre series reales, con las pruebas de las que dependen los coeficientes: normalidad de los residuos, heterocedasticidad, multicolinealidad y autocorrelación. Sin ellas los errores estándar no significan nada. Trabajo de un equipo de tres.',
    tag: 'Econometría',
    url: 'https://github.com/Ismael-Sallami/econometric-model',
    img: eco,
    en: {
      title: 'Econometric Model · Obesity',
      desc: 'An econometric model on real series, with the tests its coefficients depend on: residual normality, heteroskedasticity, multicollinearity and autocorrelation. Without them the standard errors mean nothing. Written by a team of three.',
      tag: 'Econometrics',
    },
  },
  {
    title: 'Modelos Complejos y Dinámicos',
    desc: 'Seminario sobre modelos complejos y dinámicos. Trabajo en grupo: el repositorio está en la cuenta de un compañero y 29 de sus 35 commits son míos.',
    tag: 'Modelos',
    url: 'https://github.com/Leonin04/ModelosComplejosModelosDinamicos',
    img: modDinamicos,
    en: {
      title: 'Complex and Dynamic Models',
      desc: 'Seminar on complex and dynamic models. Group work: the repository lives under a teammate\'s account and 29 of its 35 commits are mine.',
      tag: 'Models',
    },
  },
  {
    title: 'Informática gráfica en Godot',
    desc: 'Sesenta y siete ejercicios de gráficos: mallas por revolución y extrusión, modelos jerárquicos, iluminación, animación paramétrica e intersección rayo-esfera. Cuarenta y siete estaban dentro del documento LaTeX de la asignatura; un extractor los saca a ficheros que ya se pueden ejecutar.',
    tag: 'Gráficos · GDScript',
    url: 'https://github.com/Ismael-Sallami/godot-graphics-exercises',
    img: godotGraphics,
    en: {
      title: 'Computer graphics in Godot',
      desc: 'Sixty-seven graphics exercises: meshes by revolution and extrusion, hierarchical models, lighting, parametric animation and ray-sphere intersection. Forty-seven of them lived inside the LaTeX write-up; an extractor pulls them into files that can actually be run.',
      tag: 'Graphics · GDScript',
    },
  },
  {
    title: 'Ejercicios de SQL sobre Oracle',
    desc: 'Base de datos de una liga de baloncesto: esquema, datos y veinte consultas, más el temario entero extraído de los apuntes en Markdown. El CI levanta un Oracle de verdad y las ejecuta, porque parsear una consulta no demuestra que la base de datos la acepte.',
    tag: 'Oracle · SQL',
    url: 'https://github.com/Ismael-Sallami/oracle-sql-exercises',
    img: oracleSql,
    en: {
      title: 'SQL exercises on Oracle',
      desc: 'A basketball league database: schema, seed data and twenty queries, plus the whole syllabus extracted from the Markdown notes. The CI starts a real Oracle and runs them, because parsing a query does not prove the database accepts it.',
      tag: 'Oracle · SQL',
    },
  },
  {
    title: 'Especificación de un sistema de gestión turística',
    desc: 'Requisitos, actores, casos de uso, diagrama de paquetes y glosario de una plataforma de gestión turística, en LaTeX y a cuatro manos. El CI compila los siete informes y publica los PDF.',
    tag: 'Ingeniería del software',
    url: 'https://github.com/Ismael-Sallami/software-engineering-practices',
    img: softwareEngineering,
    en: {
      title: 'Specification of a tourism management system',
      desc: 'Requirements, actors, use cases, package diagram and glossary of a tourism management platform, in LaTeX and written by a team of four. The CI compiles the seven reports and publishes the PDFs.',
      tag: 'Software engineering',
    },
  },
  {
    title: 'NeetCode · problemas resueltos',
    desc: 'Mis soluciones a los problemas de NeetCode, agrupadas por patrón. Es el cuaderno de práctica del que salieron después las implementaciones de referencia del catálogo.',
    tag: 'Algoritmos · C++',
    url: 'https://github.com/Ismael-Sallami/neetcode-submissions',
    img: neetcode,
    en: {
      title: 'NeetCode submissions',
      desc: 'My solutions to the NeetCode problems, grouped by pattern. It is the practice notebook the reference implementations of the catalogue came out of.',
      tag: 'Algorithms · C++',
    },
  },
  {
    title: 'Cursos de 2024',
    desc: 'Apuntes y ejercicios de los cursos que hice por mi cuenta en 2024: desarrollo web, introducción al aprendizaje automático y Python, con el código de las prácticas y los certificados.',
    tag: 'Formación',
    url: 'https://github.com/Ismael-Sallami/early-courses',
    img: earlyCourses,
    en: {
      title: 'Courses from 2024',
      desc: 'Notes and exercises from the online courses I took on my own in 2024: web development, an introduction to machine learning and Python, with the practice code and the certificates.',
      tag: 'Learning',
    },
  },
]

// Returns the project view for the active language (falls back to ES fields).
export function localizeProject(p, lang) {
  if (lang === 'en' && p.en) {
    return { ...p, title: p.en.title, desc: p.en.desc, tag: p.en.tag }
  }
  return p
}
