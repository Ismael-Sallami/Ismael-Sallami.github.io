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
    desc: 'Prácticas de Aprendizaje Automático (Machine Learning) desarrolladas durante el curso.',
    tag: 'Machine Learning',
    url: 'https://github.com/Ismael-Sallami/AA-practices',
    img: aaPractices,
    featured: true,
    en: {
      title: 'AA Practices',
      desc: 'Machine Learning practices developed during the course.',
      tag: 'Machine Learning',
    },
  },
  {
    title: 'MH Practices',
    desc: 'Repositorio de prácticas de Metaheurísticas. Doble Grado en Ingeniería Informática y ADE.',
    tag: 'Metaheurística',
    url: 'https://github.com/Ismael-Sallami/MH-Practices',
    img: mhPractices,
    featured: true,
    en: {
      title: 'MH Practices',
      desc: 'Repository for practices of metaheuristics. Double Degree in Computer Science and Business Administration.',
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
    featured: true,
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
    featured: true,
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
    featured: true,
    en: {
      title: 'md2html · Test Generator',
      desc: 'A tool that converts Markdown to HTML to generate multiple-choice test questions.',
      tag: 'Tooling',
    },
  },
  {
    title: 'Media Manager',
    desc: 'Elimina imágenes del móvil creando un respaldo, con funcionalidades extra de gestión.',
    tag: 'App',
    url: 'https://github.com/Ismael-Sallami/media-manager',
    img: saveImage,
    en: {
      title: 'Media Manager',
      desc: 'Removes images from your phone while creating a backup, plus extra management features.',
      tag: 'App',
    },
  },
  {
    title: 'TDA · Tratamiento de Imagen',
    desc: 'Métodos y estructuras de datos para el procesamiento y manipulación de imágenes.',
    tag: 'C++',
    url: 'https://github.com/Ismael-Sallami/TDA-Imagen',
    img: tda,
    en: {
      title: 'ADT · Image Processing',
      desc: 'Methods and data structures for image processing and manipulation.',
      tag: 'C++',
    },
  },
  {
    title: 'Práctica IA · Agente Reactivo',
    desc: 'Algoritmos de búsqueda y resolución de problemas en Inteligencia Artificial.',
    tag: 'IA',
    url: 'https://github.com/Ismael-Sallami/Practica2_IA',
    img: agente,
    en: {
      title: 'AI Practice · Reactive Agent',
      desc: 'Search algorithms and problem solving in Artificial Intelligence.',
      tag: 'AI',
    },
  },
  {
    title: 'Parcherckers',
    desc: 'Juego inventado basado en el parchís, desarrollado como práctica universitaria.',
    tag: 'Game',
    url: 'https://github.com/Ismael-Sallami/Parcherckers',
    img: parchis,
    en: {
      title: 'Parcherckers',
      desc: 'An invented game based on Parcheesi, built as a university assignment.',
      tag: 'Game',
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
    desc: 'Análisis y gestión de trayectorias y rutas aéreas.',
    tag: 'Data',
    url: 'https://github.com/Ismael-Sallami/Air-lines-Project',
    img: rutas,
    en: {
      title: 'Air Lines Project',
      desc: 'Analysis and management of flight paths and air routes.',
      tag: 'Data',
    },
  },
  {
    title: 'Modelo Econométrico · Obesidad',
    desc: 'Análisis de factores económicos y sociales mediante un modelo econométrico.',
    tag: 'Econometría',
    url: 'https://github.com/Ismael-Sallami/ModeloEconometrico',
    img: eco,
    en: {
      title: 'Econometric Model · Obesity',
      desc: 'Analysis of economic and social factors through an econometric model.',
      tag: 'Econometrics',
    },
  },
  {
    title: 'Modelos Complejos y Dinámicos',
    desc: 'Seminario de EM sobre modelos complejos y dinámicos.',
    tag: 'Modelos',
    url: 'https://github.com/Leonin04/ModelosComplejosModelosDinamicos',
    img: modDinamicos,
    featured: false,
    en: {
      title: 'Complex and Dynamic Models',
      desc: 'EM Seminar on complex and dynamic models.',
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
