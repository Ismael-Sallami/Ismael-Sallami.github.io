# Adding things to the site

Where each kind of content is edited, and what happens afterwards. The short version:
most of it updates itself, and the two files still edited by hand are the ones where the
words matter more than the data.

| What | Edited in | Picked up |
| --- | --- | --- |
| Roles in the timeline | a Google Sheet | daily, 07:00 UTC |
| Skills | the same sheet, another tab | weekly, Mondays |
| A project's write-up | that repository's own README | daily, 05:30 UTC |
| A new project | a topic on the repository | daily, once the topic is set |
| Project cards (image, Spanish copy) | `src/data/projects.js` | on commit |
| Contribution numbers | nowhere, they come from the API | weekly, Mondays |
| Contribution descriptions | `src/data/contributions.js` | on commit |
| CVs and certifications | drop the file in `docs/` | on commit |
| Everything else (titles, menus) | `src/i18n/strings.js` | on commit |

Every sync commits to `main` only when something actually changed, and then asks for a
deploy by name. It has to ask: a push made with the default `GITHUB_TOKEN` does not start
another workflow, which GitHub does deliberately so workflows cannot trigger each other in
a loop. For weeks that meant the syncs committed and nothing published, and the data only
reached the site when some unrelated push happened to redeploy it.

Nothing is ever written when a source cannot be read, so a bad sheet or an API outage
leaves the last good version serving the site.

## Adding a role to the timeline

The roles live in a Google Sheet rather than in this repository, so adding a job is a
row in a spreadsheet. `scripts/sync-experience.mjs` reads the sheet every morning,
rewrites `experience.generated.json`, commits it and asks for a deploy. Run the workflow by
hand from the Actions tab if the wait is too long: that is **Run workflow**, not *Re-run all
jobs*, which replays the old run against the code as it was then.

Two rows per role, one per language, paired by `id`. An English cell left empty falls
back to the Spanish one, which is why most of them are empty. Only the Spanish row is
read for `publicar`, `fin`, `cifra_enlace` and `cifra_fuente`, since those describe the
role rather than its wording.

An empty `fin` means the role is still open, and that is what draws the hollow dot that
closes the timeline. The order of the Spanish rows is the order on the page.

A figure can quote a live number instead of a frozen one. Put `{prs} PRs` in
`cifra_valor` and the repository in `cifra_fuente`, and the count is read out of
`contributions.generated.json` when the page renders. That is why the GSoC figure cannot
drift away from the one the projects page shows. Only `{prs}` and `{commits}` exist.

The trap worth knowing before it bites: Sheets turns `2026-08-24` into a date value and
exports it as `24/08/2026`. Import with "Convert text to numbers, dates and formulas"
switched off, or set the `fin` column to plain text. The sync refuses the converted form
and says so rather than guessing which number is the month.

```bash
npm run sync:experience
```

## Adding a skill

Another tab in the same sheet, one row per skill, in the order they should appear.

`icono` is either a [devicon](https://devicon.dev) slug, like `cplusplus` or `python`,
or a full `https://` URL for anything devicon does not have, which is how the two flags
work.

The categories come out of the same tab, so a new one is a row rather than an edit in
three files. Put its key in `categoria` and its heading in `categoria_nombre` and
`categoria_nombre_en`. Only the first row of a group needs the heading; the rest inherit
it, and two rows naming one category differently is an error rather than a coin toss.
The groups print in the order they first appear.

One thing the sheet cannot move: the front page asks for `languages` and `infra` by key
(`Home.jsx`). Renaming their headings is safe, renaming those two keys is not, and the
sync warns if either disappears.

`nivel` is the badge next to the name, and almost every row leaves it empty on purpose.
The list used to carry an invented percentage per skill; those went, and what is left is
a level only when somebody other than him defined it, like a CEFR grade.

```bash
npm run sync:skills
```

## Adding a project

Give the repository the `portfolio` topic and the daily sync picks it up:

```bash
gh repo edit Ismael-Sallami/<repo> --add-topic portfolio
```

It arrives with what GitHub knows: the title from its README's first heading, the
description from the repository and the main language as its tag. To give it Spanish copy
of your own, add a card to `src/data/projects.js`; a hand-written card wins over the
generated data on every field it sets.

### The cover image

Three sources, in this order:

1. **An image uploaded to the repository.** On GitHub go to the repository, Settings,
   General, scroll to *Social preview*, and upload one at 1280×640. The sync finds it on
   its own, and it is also what people see when the repository link is shared anywhere.
   The image is linked from GitHub rather than copied here: they run to about 600 KB each
   and committing one per repository would put megabytes of binary into the history.
2. **One drawn for it**, if nothing was uploaded. Colours and composition come from a
   hash of the name, so every repository gets a different picture and the same repository
   always gets the same one.
3. The plain placeholder, only if something went wrong.

One thing worth knowing before picking an image: **the card prints the project's name
over the bottom of its own cover.** An image with its own title across the bottom ends up
with two sets of words on top of each other. The drawn ones carry no text for exactly
that reason, and it is why they are SVG: with no typography to match, rendering them in a
browser bought nothing over a kilobyte of gradient.

The write-up on the project page is the repository's own README, rendered through
GitHub's markdown endpoint so it looks the same as it does on GitHub. Editing the README
there updates the page here the next morning.

A weekly job opens an issue listing public repositories that are not on the site, so a
forgotten topic surfaces on its own. If one should never appear, add it to
`src/data/projects.exclude.json` and the issue stops counting it.

```bash
npm run check:repos
```

## Building a CV from the site

`/cv` assembles one out of whatever the site already knows: education, the roles, the
projects, the contributions and the skills. Everything starts ticked; untick what does not
belong in the one being sent. The sheet beside the checkboxes is the real document at
its real width, and the count above the button says how many pages it comes to.

A certification dropped into `docs/certificates/` shows up here too, in its own section,
without anything else being edited.

Exporting opens the browser's print dialog, where the choice is "Save as PDF". Three
settings matter and the browser does not remember them: **Margins → Default**, **Headers
and footers → off**, and **Scale → 100%**. With headers on, every page carries the URL and
the date.

The selection is remembered in this browser between visits. It is stored as what was taken
out rather than what was left in, so a project added by the daily sync arrives **included**
instead of quietly missing.

Nothing about the CV is written twice: the name, the contact lines and the degree all come
from `src/data/profile.js`, which is also where the badge under the name on the home page
reads from. That file exists because the degree had already ended up with four different
names across the site and the LaTeX CV.

`docs/CVs/` is empty, so the builder is the whole of the CV menu and the button in the nav
goes straight to it. Dropping a PDF back into that folder puts it in the menu beside
"Build one to fit", which is worth doing for a version written by hand and argued better
than anything assembled from a checklist.

## Adding a CV or a certification

Copy the file into `docs/CVs/` or `docs/certificates/` and build. A glob in
`documents.js` finds it, so the CV menu and the certifications page pick it up without
any code change. PDFs and PNGs both work; a PDF previews in an iframe and an image as an
image.

The title comes from the file name: `gsoc-2026-mifos-initiative.pdf` becomes "Gsoc 2026
Mifos Initiative", dashes and underscores both read as spaces. A four-digit year in the
name is picked up as the year, which is what the CV prints beside a certification.

So name the file the way you want it read, and that is the whole job.

Write a title in the `labels` map of `documents.js` only when the derived one is not good
enough. That is mostly acronyms, where "Oracle Oci Ai Foundations" wants to be "Oracle
Cloud Infrastructure … AI Foundations Associate", and anything needing an accent or a
character a file name cannot carry. A written title always wins.

```bash
npm run check:documents          # lists what each file will be called
node scripts/check-documents.mjs --fix
```

The check no longer fails over a missing title, but it still fails over a name with a
space or an accent, which turns into `%20` and `%C3%B3` once it is a URL, and over a title
left behind after its file was deleted.

Certifications sort themselves newest first, from the year in the file name. A file with
no year in it goes after the dated ones, so `certificado-algo-2026.pdf` lands at the top
and `certificado-algo.pdf` at the bottom. Putting the year in the name is worth the two
seconds.

**Deleting** one is the same job in reverse. A document with no written title just goes;
nothing else knows about it. One that has a title leaves that title pointing at nothing,
which is an error on purpose, since it might equally be a typo in a file name that means
the title never applied. Clear it with:

```bash
node scripts/check-documents.mjs --fix
```

Deleting the last file in `docs/CVs/` or `docs/certificates/` removes the folder too, since
git does not track an empty one. That is a valid state and the site copes: with no CVs at
all, the CV button stops being a menu and goes straight to the builder.

## Links that check your work

A figure can link to the evidence, and the link to use is the pull request list:

```
https://github.com/<owner>/<repo>/pulls?q=is%3Apr+author%3AIsmael-Sallami
```

Not the commit list. GitHub rate-limits `…/commits?author=` hard for anyone browsing
without a session and answers 429, which means the link looks broken to exactly the people
being sent to verify something. Measured: the commits view returns 429 even on repositories
unrelated to this site, while the PR list returns 200.

The experience sync warns if a `cifra_enlace` in the sheet points at the commits view.

## When a sync fails

It fails loudly and changes nothing. The message names the row and the column, and the
site keeps serving whatever was committed last. The three that actually happen:

- **The sheet stopped being shared.** Google answers a request for an unshared sheet with
  the sign-in page under status 200, not an error, so the syncs check that what came back
  is really CSV before parsing a word of it.
- **A date got converted.** See above.
- **A category has no heading.** The sync says which one and which column to write it
  in, rather than printing a group with no name.
- **An English cell was filled in that should not be.** `publicar`, `fin`, `cifra_enlace`
  and `cifra_fuente` are read from the Spanish row only. Filling them in on the English
  row means expecting them to be read there, and being quietly ignored would be worse
  than being stopped.

Run any of them by hand to see the message:

```bash
npm run sync:experience
npm run sync:skills
npm run sync:projects
```

`--check` validates what is already committed without touching the network, which is
what `deploy.yml` runs. It is there because a bad role or skill does not break one
section: unknown routes render the home page, so it takes the whole site with it.

```bash
node scripts/sync-experience.mjs --check
node scripts/sync-skills.mjs --check
```
