# Ismael Sallami Moreno · personal site

Source of <https://ismael-sallami.github.io>. Vite, React Router, Tailwind and
framer-motion, with a three.js background scene. Everything is bilingual from a
single dictionary.

## Running it

```bash
npm ci
npm run dev     # http://localhost:5173
npm run build   # into dist/
```

## Where the content lives

All of it is data, not markup. Editing these four files is enough; no component
needs touching.

| File | Holds |
| --- | --- |
| `src/data/projects.js` | the 20 projects, with their Spanish and English copy |
| `src/data/contributions.js` | contributions to other people's projects |
| `src/data/skills.js` | the 23 skills and their levels |
| `src/i18n/strings.js` | every other string, in both languages |

The `featured` flag in `projects.js` picks what the front page shows and which
cards span two columns. Four are set. Keep them at the top of the array: a wide
card landing on an odd column leaves a hole in the grid.

## Projects

### Featured

- **[Algorithms and Patterns](https://github.com/Ismael-Sallami/algorithms-and-patterns)** — Algoritmos · C++. 183 implementaciones organizadas por patrón. 126 son extractos de mi trabajo previo, cada uno con enlace al fichero y las líneas de las que sale; las otras 57 están escritas para el repositorio y se verifican solas al compilar.
- **[Personal Finance Manager](https://github.com/Ismael-Sallami/personal-finance-manager)** — Full-stack. Servicio de finanzas autoalojado: importa extractos de varios brókeres, calcula rentabilidad en aritmética decimal, agrega los informes y expone un bot de Telegram. FastAPI y PostgreSQL.
- **[SCD · Concurrencia y Sistemas Distribuidos (MPI)](https://github.com/Ismael-Sallami/SCD-Concurrency-MPI)** — C++ · MPI. Programación concurrente y distribuida desde primitivas: semáforos, monitores, paso de mensajes con MPI y planificadores de tiempo real (~8.500 líneas de C++).
- **[Parcherckers · IA con adversario](https://github.com/Ismael-Sallami/Parcherckers)** — IA · C++. Agente para un parchís de cuatro jugadores con dados, así que el árbol tiene nodos de azar. Minimax, minimax con límite de profundidad, cuatro variantes de poda alfa-beta con ordenación de movimientos y corte probabilístico, búsqueda de quietud y cinco funciones de evaluación comparadas entre sí.

### Everything else

- **[DDSI · Diseño de bases de datos](https://github.com/Ismael-Sallami/DDSI)** — Oracle · SQL
- **[pdf-to-md](https://github.com/Ismael-Sallami/pdf-to-md)** — Python · CLI
- **[Esta web](https://github.com/Ismael-Sallami/Ismael-Sallami.github.io)** — React
- **[AA Practices](https://github.com/Ismael-Sallami/AA-practices)** — Machine Learning
- **[MH Practices](https://github.com/Ismael-Sallami/MH-Practices)** — Metaheurística
- **[3-Partition · Demostración NP-completo](https://github.com/Ismael-Sallami/3-Partition-NP-Completeness)** — Complejidad
- **[Blog del doble grado Informática + ADE](https://elblogdeismael.github.io/)** — Web
- **[md2html · Test Generator](https://github.com/Ismael-Sallami/md2html-testGenerator)** — Tooling
- **[Media Manager](https://github.com/Ismael-Sallami/media-manager)** — App
- **[TDA · Tratamiento de Imagen](https://github.com/Ismael-Sallami/TDA-Imagen)** — C++
- **[Agentes reactivos y deliberativos](https://github.com/Ismael-Sallami/Practica2_IA)** — IA · C++
- **[Irrgarten](https://github.com/ElblogdeIsmael/ElblogdeIsmael.github.io/tree/main/Subjects/Third/PDOO/Practica/Proyecto_Irrgarten/Proyecto_Irrgarten)** — Java · Ruby
- **[Arch Linux · Dotfiles](https://github.com/Ismael-Sallami/Arch_Configuration)** — Linux
- **[Air Lines Project](https://github.com/Ismael-Sallami/Air-lines-Project)** — C++
- **[Modelo Econométrico · Obesidad](https://github.com/Ismael-Sallami/ModeloEconometrico)** — Econometría
- **[Modelos Complejos y Dinámicos](https://github.com/Leonin04/ModelosComplejosModelosDinamicos)** — Modelos

## Contributions to open source

Other people's projects, kept apart from my own. Each link opens the upstream
commit list filtered to my commits.

| Project | Upstream | Language | My commits |
| --- | --- | --- | ---: |
| [mifos-gazelle](https://github.com/openMF/mifos-gazelle/commits?author=Ismael-Sallami) | openMF | Shell | 12 |
| [mifos-x-reporting-plugin-birt](https://github.com/openMF/mifos-x-reporting-plugin-birt/commits?author=Ismael-Sallami) | openMF | Java | 5 |
| [cbioportal-frontend](https://github.com/cBioPortal/cbioportal-frontend/commits?author=Ismael-Sallami) | cBioPortal | TypeScript | 1 |

## Skills

C++ (90%) · Python (85%) · React (80%) · Oracle SQL (80%) · Git (85%) · Docker (70%) · JavaScript (70%) · Tailwind (80%) · HTML (85%) · CSS (70%) · PostgreSQL (75%) · FastAPI (70%) · Bash (80%) · Kubernetes (60%) · scikit-learn (70%) · Java (70%) · Ruby (60%) · LaTeX (90%) · Markdown (90%) · YAML (80%) · Grafana (70%) · Prometheus (65%) · Inglés (C1)

Levels are self-assessed and deliberately conservative.

## Licence

MIT. See [`LICENSE`](LICENSE).

## Author

Ismael Sallami Moreno
