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

All of it is data, not markup. Editing these files is enough; no component needs
touching.

| File | Holds |
| --- | --- |
| `src/data/projects.js` | the 27 projects, with their Spanish and English copy |
| `src/data/contributions.js` | descriptions of the open source work; the numbers come from the API |
| `src/data/experience.generated.json` | the roles in the Home timeline, written in a Google Sheet |
| `src/data/documents.js` | the titles of the CVs and certifications under `docs/` |
| `src/data/skills.generated.json` | the 30 skills, grouped by what each one is; written in the same sheet |
| `src/i18n/strings.js` | every other string, in both languages |

A role with an empty end date is still open, which is what draws the hollow dot at
the end of the timeline. The roles overlap on purpose, so each one prints its own
date range. The GSoC figure is never typed as a number: the sheet holds `{prs} PRs`
and the repository it comes from, and the count is read out of
`contributions.generated.json` when the page renders, so it cannot disagree with the
contributions table.

How to add a project, a role, a skill or a CV is in [MAINTAINING.md](MAINTAINING.md).

The `featured` flag in `projects.js` picks what the front page shows and which
cards span two columns. Six are set. Keep them at the top of the array: a wide
card landing on an odd column leaves a hole in the grid.

## Figures quoted from other repositories

Some project descriptions quote a count that lives in another repository: the size
of the catalogue in `algorithms-and-patterns`, the page count of the 3-Partition
proof, my share of the commits in a teammate's repository.

`scripts/check-numbers.mjs` reads each of those out of what the owning repository
publishes and fails the build when the site no longer matches. The wording on the
site is deliberately rounded ("almost 200"), so the checks are ranges: the claim
stays true while the repository grows and only fails when the rounding itself goes
stale.

This is worth having because it already went wrong. The site said 183
implementations for months while the catalogue had reached 198, and it went
unnoticed because the repository's own GitHub description also still said 183, so
checking one against the other agreed and both were wrong.

```bash
npm run check:numbers        # needs gh, or GITHUB_TOKEN
```

## Contribution numbers

`src/data/contributions.generated.json` holds the merged pull request and commit
counts, written by `scripts/sync-contributions.mjs` from the GitHub API. A weekly
workflow runs it and commits the file when the numbers move, so they cannot go
stale by being forgotten. The descriptions stay hand-written in
`contributions.js`, and `contributions.exclude.json` lists what to leave out and
why.

The tables further down quote the same numbers, so the workflow regenerates the
README too. Both tables come out of the data files, so edit `projects.js` or
`contributions.js` and rerun rather than editing the tables by hand.

```bash
npm run sync:contributions   # needs gh, or GITHUB_TOKEN
npm run gen:readme           # rewrites the tables below
```

## Projects

### Featured

- **[Laboratorio de infraestructura con Ansible](https://github.com/Ismael-Sallami/ansible-infra-lab)** — DevOps · Ansible. Aprovisionamiento de un laboratorio Rocky Linux: playbooks que crean usuarios y servidores web, Prometheus y Grafana midiéndolos, y un plan de JMeter que los somete a carga. Las claves no viven en el repositorio, las genera un script.
- **[Algorithms and Patterns](https://github.com/Ismael-Sallami/algorithms-and-patterns)** — Algoritmos · C++. Casi 200 implementaciones organizadas por patrón. Más de 140 son extractos de mi trabajo previo, cada uno con enlace al fichero y las líneas de las que sale; el resto están escritas para el repositorio y se verifican solas al compilar.
- **[Personal Finance Manager](https://github.com/Ismael-Sallami/personal-finance-manager)** — Full-stack. Servicio de finanzas autoalojado: importa extractos de varios brókeres, calcula rentabilidad en aritmética decimal, agrega los informes y expone un bot de Telegram. FastAPI y PostgreSQL.
- **[Metaheurísticas · optimización de cartera](https://github.com/Ismael-Sallami/metaheuristics)** — Metaheurística. Dieciséis algoritmos de optimización sobre el mismo problema de cartera, del greedy y la búsqueda local al enfriamiento simulado, genéticos, meméticos y evolución diferencial. Cada uno se mide con repeticiones y desviación típica, no con una sola ejecución.
- **[Agentes reactivos y deliberativos](https://github.com/Ismael-Sallami/rescue-agents)** — IA · C++. Agentes que exploran un mapa que no conocen. Cuando no hay mapa sobre el que planificar actúan por reglas; cuando lo hay, planifican con Dijkstra sobre una rejilla con coste y estado compuesto, y con A* usando distancia Manhattan. La proyección del sensor al mapa global es lo que une las dos capas.
- **[Irrgarten](https://github.com/Ismael-Sallami/irrgarten)** — Java · Ruby. Juego de monstruos desarrollado en Java y Ruby como proyecto de POO.

### Everything else

- **[Concurrencia y sistemas distribuidos](https://github.com/Ismael-Sallami/concurrency-mpi)** — C++ · MPI
- **[Parchís · IA con adversario](https://github.com/Ismael-Sallami/parchis-ai)** — IA · C++
- **[Sistema de información sobre Oracle](https://github.com/Ismael-Sallami/oracle-dbms-project)** — Oracle · SQL
- **[pdf-to-md](https://github.com/Ismael-Sallami/pdf-to-md)** — Python · CLI
- **[Esta web](https://github.com/Ismael-Sallami/Ismael-Sallami.github.io)** — React
- **[Prácticas de aprendizaje automático](https://github.com/Ismael-Sallami/machine-learning-practices)** — Machine Learning
- **[3-Partition · Demostración NP-completo](https://github.com/Ismael-Sallami/3-Partition-NP-Completeness)** — Complejidad
- **[Blog del doble grado Informática + ADE](https://elblogdeismael.github.io/)** — Web
- **[md2html · Test Generator](https://github.com/Ismael-Sallami/md2html-testGenerator)** — Tooling
- **[Media Manager](https://github.com/Ismael-Sallami/media-manager)** — App
- **[TDA · Tratamiento de Imagen](https://github.com/Ismael-Sallami/image-adt)** — C++
- **[Arch Linux · Dotfiles](https://github.com/Ismael-Sallami/Arch_Configuration)** — Linux
- **[Técnicas de diseño de algoritmos](https://github.com/Ismael-Sallami/algorithm-design-techniques)** — C++ · Algoritmia
- **[Air Lines Project](https://github.com/Ismael-Sallami/airline-routes-adt)** — C++
- **[Modelo Econométrico · Obesidad](https://github.com/Ismael-Sallami/econometric-model)** — Econometría
- **[Modelos Complejos y Dinámicos](https://github.com/Leonin04/ModelosComplejosModelosDinamicos)** — Modelos
- **[Informática gráfica en Godot](https://github.com/Ismael-Sallami/godot-graphics-exercises)** — Gráficos · GDScript
- **[Ejercicios de SQL sobre Oracle](https://github.com/Ismael-Sallami/oracle-sql-exercises)** — Oracle · SQL
- **[Especificación de un sistema de gestión turística](https://github.com/Ismael-Sallami/software-engineering-practices)** — Ingeniería del software
- **[NeetCode · problemas resueltos](https://github.com/Ismael-Sallami/neetcode-submissions)** — Algoritmos · C++
- **[Cursos de 2024](https://github.com/Ismael-Sallami/early-courses)** — Formación

## Contributions to open source

Other people's projects, kept apart from my own. The bar is a merged pull
request: a fork with none is a clone. Each link opens the upstream commit list
filtered to my commits. The numbers come from the API, refreshed weekly.

| Project | Upstream | Language | Merged PRs | My commits |
| --- | --- | --- | ---: | ---: |
| [mifos-gazelle](https://github.com/openMF/mifos-gazelle/pulls?q=is%3Apr+author%3AIsmael-Sallami) | openMF | Shell | 21 | 46 |
| [mifos-x-reporting-plugin-birt](https://github.com/openMF/mifos-x-reporting-plugin-birt/pulls?q=is%3Apr+author%3AIsmael-Sallami) | openMF | Java | 2 | 5 |
| [mifos-reporting-plugin](https://github.com/openMF/mifos-reporting-plugin/pulls?q=is%3Apr+author%3AIsmael-Sallami) | openMF | Java | 2 | 2 |
| [cbioportal-frontend](https://github.com/cBioPortal/cbioportal-frontend/pulls?q=is%3Apr+author%3AIsmael-Sallami) | cBioPortal | TypeScript | 1 | 1 |

## Skills

**Languages** — C++ · Python · C · Java · JavaScript · Bash · Ruby

**Infrastructure & deployment** — Kubernetes · Helm · Docker · Ansible · Linux · Git · GitHub Actions · Grafana · Prometheus · YAML

**Web** — React · HTML · CSS · Tailwind · FastAPI

**Data & computation** — Oracle SQL · PostgreSQL · scikit-learn · MPI

**Technical writing** — LaTeX · Markdown

**Spoken** — Español · Inglés

## Licence

MIT. See [`LICENSE`](LICENSE).

## Author

Ismael Sallami Moreno
