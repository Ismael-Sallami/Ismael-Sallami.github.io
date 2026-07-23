import aaPractices from '../../assets/images/aa_practices.jpg'
import mhPractices from '../../assets/images/mh_practices.jpg'
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

export const projects = [
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
    url: 'https://github.com/ElblogdeIsmael/ElblogdeIsmael.github.io/tree/main/Subjects/Third/IA/Practicas/Practicas/Practica3/practica3/practica3',
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
