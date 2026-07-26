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
import financeManager from '../../assets/images/inversiones.png'
import ddsi from '../../assets/images/ddsi.svg'
import pdfToMd from '../../assets/images/pdf_to_md.svg'
import personalSite from '../../assets/images/personal_site.svg'

export const projects = [
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
    title: 'DDSI · Diseño de bases de datos',
    desc: 'Esquema relacional en Oracle con la integridad dentro de la base de datos: disparadores para el estado derivado y la auditoría, procedimientos en el servidor y escrituras transaccionales que confirman o revierten como una unidad.',
    tag: 'Oracle · SQL',
    url: 'https://github.com/Ismael-Sallami/DDSI',
    img: ddsi,
    en: {
      title: 'DDSI · Database Design',
      desc: 'Relational schema in Oracle with the integrity kept inside the database: triggers for derived state and auditing, server-side procedures, and transactional writes that commit or roll back as one unit.',
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
    title: 'AA Practices',
    desc: 'Aprendizaje automático de principio a fin: comparación de clasificadores bajo validación cruzada, agrupamiento eligiendo el número de grupos y el radio de vecindad a partir de los datos, y redes neuronales con regularización sobre texto.',
    tag: 'Machine Learning',
    url: 'https://github.com/Ismael-Sallami/AA-practices',
    img: aaPractices,
    en: {
      title: 'AA Practices',
      desc: 'Machine learning end to end: classifier comparison under cross-validation, clustering with the cluster count and neighbourhood radius chosen from the data, and regularised neural networks over text.',
      tag: 'Machine Learning',
    },
  },
  {
    title: 'MH Practices',
    desc: 'Dieciséis algoritmos de optimización sobre el mismo problema de cartera, del greedy y la búsqueda local al enfriamiento simulado, genéticos, meméticos y evolución diferencial. Cada uno se mide con repeticiones y desviación típica, no con una sola ejecución.',
    tag: 'Metaheurística',
    url: 'https://github.com/Ismael-Sallami/MH-Practices',
    img: mhPractices,
    en: {
      title: 'MH Practices',
      desc: 'Sixteen optimisation algorithms on one portfolio problem, from greedy and local search to simulated annealing, genetic, memetic and differential evolution. Each is measured over repeated runs with a standard deviation, not a single run.',
      tag: 'Metaheuristics',
    },
  },
  {
    title: 'SCD · Concurrencia y Sistemas Distribuidos (MPI)',
    desc: 'Programación concurrente y distribuida desde primitivas: semáforos, monitores, paso de mensajes con MPI y planificadores de tiempo real (~8.500 líneas de C++).',
    tag: 'C++ · MPI',
    url: 'https://github.com/Ismael-Sallami/SCD-Concurrency-MPI',
    img: scdCluster,
    featured: true,
    en: {
      title: 'SCD · Concurrency & Distributed Systems (MPI)',
      desc: 'Concurrent and distributed programming from primitives: semaphores, monitors, MPI message passing and real-time schedulers (~8,500 lines of C++).',
      tag: 'C++ · MPI',
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
    desc: 'Herramienta que convierte Markdown a HTML para generar preguntas tipo test.',
    tag: 'Tooling',
    url: 'https://github.com/Ismael-Sallami/md2html-testGenerator',
    img: testGen,
    en: {
      title: 'md2html · Test Generator',
      desc: 'A tool that converts Markdown to HTML to generate multiple-choice test questions.',
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
    url: 'https://github.com/Ismael-Sallami/TDA-Imagen',
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
    url: 'https://github.com/Ismael-Sallami/Practica2_IA',
    img: agente,
    en: {
      title: 'Reactive and Deliberative Agents',
      desc: 'Agents exploring a map they do not know. With no map to plan over they act on rules; once there is one they plan with Dijkstra over a weighted grid with composite state, and with A* using a Manhattan heuristic. Projecting the sensor reading onto the global map is what joins the two layers.',
      tag: 'AI · C++',
    },
  },
  {
    title: 'Parcherckers · IA con adversario',
    desc: 'Agente para un parchís de cuatro jugadores con dados, así que el árbol tiene nodos de azar. Minimax, minimax con límite de profundidad, cuatro variantes de poda alfa-beta con ordenación de movimientos y corte probabilístico, búsqueda de quietud y cinco funciones de evaluación comparadas entre sí.',
    tag: 'IA · C++',
    url: 'https://github.com/Ismael-Sallami/Parcherckers',
    img: parchis,
    featured: true,
    en: {
      title: 'Parcherckers · Adversarial Search',
      desc: 'An agent for a four-player dice game, so the tree has chance nodes. Minimax, depth-limited minimax, four alpha-beta variants with move ordering and probabilistic cutoff, quiescence search, and five evaluation functions played against each other.',
      tag: 'AI · C++',
    },
  },
  {
    title: 'Irrgarten',
    desc: 'Juego de monstruos desarrollado en Java y Ruby como proyecto de POO.',
    tag: 'Java · Ruby',
    url: 'https://github.com/ElblogdeIsmael/ElblogdeIsmael.github.io/tree/main/Subjects/Third/PDOO/Practica/Proyecto_Irrgarten/Proyecto_Irrgarten',
    img: irgarten,
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
    url: 'https://github.com/Ismael-Sallami/Air-lines-Project',
    img: rutas,
    en: {
      title: 'Air Lines Project',
      desc: 'Hand-written C++ containers over an air routes domain: a key-ordered store, bidirectional iterators, deep copy semantics, and binary PPM and PGM image reading and writing.',
      tag: 'C++',
    },
  },
  {
    title: 'Modelo Econométrico · Obesidad',
    desc: 'Modelo econométrico sobre series reales, con las pruebas de las que dependen los coeficientes: normalidad de los residuos, heterocedasticidad, multicolinealidad y autocorrelación. Sin ellas los errores estándar no significan nada.',
    tag: 'Econometría',
    url: 'https://github.com/Ismael-Sallami/ModeloEconometrico',
    img: eco,
    en: {
      title: 'Econometric Model · Obesity',
      desc: 'An econometric model on real series, with the tests its coefficients depend on: residual normality, heteroskedasticity, multicollinearity and autocorrelation. Without them the standard errors mean nothing.',
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
]

// Returns the project view for the active language (falls back to ES fields).
export function localizeProject(p, lang) {
  if (lang === 'en' && p.en) {
    return { ...p, title: p.en.title, desc: p.en.desc, tag: p.en.tag }
  }
  return p
}
