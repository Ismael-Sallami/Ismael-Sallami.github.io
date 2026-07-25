// Bilingual dictionary (ES default / EN). No external dependency.
// Hero title is stored as fragments so the italic accent spans are preserved.

export const dict = {
  es: {
    nav: { home: 'Inicio', projects: 'Proyectos', skills: 'Habilidades', letters: 'Cartas y certificados', cv: 'CV' },
    hero: {
      badge: 'Doble grado Informática + ADE · UGR',
      titleParts: [
        { t: 'Construyo ' },
        { t: 'tecnología', a: true },
        { t: ' con propósito, en ' },
        { t: 'cualquier campo', a: true },
        { t: '.' },
      ],
      textPre: 'Soy ',
      name: 'Ismael Sallami Moreno',
      textPost:
        '. Me apasiona la programación, el desarrollo web y crear soluciones que aporten valor real en cualquier ámbito donde la informática pueda ayudar: sistemas y servidores, medicina, matemáticas, finanzas e investigación.',
      contact: 'Contáctame',
      viewProjects: 'Ver proyectos',
      proyectsCount: 'Proyectos',
    },
    about: {
      kicker: 'Innovación',
      title: 'Informática al servicio de cualquier campo para generar impacto positivo.',
      p1: 'La informática es una herramienta transversal: la misma capacidad técnica que optimiza servidores y sistemas puede acelerar la investigación médica, resolver problemas matemáticos o modelar mercados financieros. Me interesa aplicarla allá donde aporte valor real.',
      p2: 'Disfruto explorando campos diversos —de la IA y las finanzas a la medicina y las matemáticas— y construyendo soluciones que mejoren la vida de las personas. Mi objetivo: seguir formándome y participar en proyectos con valor social, integrando habilidad técnica con una visión de crecimiento personal y profesional.',
    },
    featured: {
      kicker: 'Trabajo seleccionado',
      title: 'Proyectos destacados',
      viewAll: 'Ver todos los proyectos',
    },
    skillsPreview: {
      kicker: 'Caja de herramientas',
      title: 'Habilidades en evolución constante',
      viewAll: 'Ver todas las habilidades',
    },
    contact: {
      kicker: 'Hablemos',
      title: 'Página de contacto',
      text: '¿Tienes una duda, una propuesta o quieres reportar algo? Rellena el formulario y te responderé lo antes posible.',
      name: 'Tu nombre',
      email: 'Email',
      message: 'Mensaje',
      send: 'Enviar',
    },
    footer: { rights: 'Todos los derechos reservados.', terms: 'Términos', privacy: 'Privacidad' },
    projectsPage: {
      kicker: 'Portfolio',
      title: 'Mis trabajos',
      intro:
        'Una selección de proyectos que reflejan mi pasión por la programación y mi compromiso con la excelencia — de herramientas y videojuegos a análisis de datos y configuración de sistemas.',
    },
    skillsPage: {
      kicker: 'Stack',
      title: 'Habilidades',
      intro:
        'Habilidades técnicas y blandas que me permiten abordar proyectos complejos y colaborar en equipos multidisciplinares. Comprometido con el aprendizaje continuo — aún me queda mucho por aprender.',
    },
    lettersPage: {
      kicker: 'Documentos',
      title: 'Cartas y certificados',
      intro: 'Cartas de recomendación de profesores y profesionales, y certificaciones obtenidas. Puedes previsualizarlas aquí o descargarlas.',
      letter1: 'Carta de recomendación I',
      letter2: 'Carta de recomendación II',
      ecert: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
      download: 'Descargar',
    },
    common: { viewProject: 'Ver proyecto' },
  },

  en: {
    nav: { home: 'Home', projects: 'Projects', skills: 'Skills', letters: 'Letters & Certificates', cv: 'CV' },
    hero: {
      badge: 'Double Degree in Computer Engineering + Business · UGR',
      titleParts: [
        { t: 'I build ' },
        { t: 'technology', a: true },
        { t: ' with purpose, for ' },
        { t: 'any field', a: true },
        { t: '.' },
      ],
      textPre: "I'm ",
      name: 'Ismael Sallami Moreno',
      textPost:
        ". I'm passionate about programming, web development and building solutions that add real value in any field where computer science can help: systems and servers, medicine, mathematics, finance and research.",
      contact: 'Contact me',
      viewProjects: 'View projects',
      proyectsCount: 'Projects',
    },
    about: {
      kicker: 'Innovation',
      title: 'Computer science serving any field to create positive impact.',
      p1: 'Computer science is a cross-cutting tool: the same technical skill that optimizes servers and systems can accelerate medical research, solve mathematical problems or model financial markets. I want to apply it wherever it adds real value.',
      p2: "I enjoy exploring diverse fields —from AI and finance to medicine and mathematics— and building solutions that improve people's lives. My goal: keep learning and contribute to projects with social value, combining technical skill with a vision of personal and professional growth.",
    },
    featured: {
      kicker: 'Selected work',
      title: 'Featured projects',
      viewAll: 'View all projects',
    },
    skillsPreview: {
      kicker: 'Toolbox',
      title: 'Skills in constant evolution',
      viewAll: 'View all skills',
    },
    contact: {
      kicker: "Let's talk",
      title: 'Contact page',
      text: "Got a question, a proposal or something to report? Fill out the form and I'll reply as soon as possible.",
      name: 'Your name',
      email: 'Email',
      message: 'Message',
      send: 'Send',
    },
    footer: { rights: 'All rights reserved.', terms: 'Terms', privacy: 'Privacy' },
    projectsPage: {
      kicker: 'Portfolio',
      title: 'My work',
      intro:
        'A selection of projects that reflect my passion for programming and my commitment to excellence — from tools and games to data analysis and system configuration.',
    },
    skillsPage: {
      kicker: 'Stack',
      title: 'Skills',
      intro:
        'Technical and soft skills that let me tackle complex projects and collaborate in multidisciplinary teams. Committed to continuous learning — I still have a lot to learn.',
    },
    lettersPage: {
      kicker: 'Documents',
      title: 'Letters & Certificates',
      intro: 'Recommendation letters from professors and professionals, plus the certifications I have earned. You can preview them here or download them.',
      letter1: 'Recommendation letter I',
      letter2: 'Recommendation letter II',
      ecert: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
      download: 'Download',
    },
    common: { viewProject: 'View project' },
  },
}
