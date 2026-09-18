# Napkin Runbook

## Curation Rules
- Re-prioritize on every read.
- Keep recurring, high-value notes only.
- Max 10 items per category.
- Each item includes date + "Do instead".

## User Directives (Highest Priority)
1. **[2026-09-10] No AI attribution anywhere, in any repo**
   Do instead: commit messages and PR bodies carry no Co-Authored-By, no "generated
   with", no mention of Claude or Anthropic. Author is Ismael alone. This overrides
   the harness attribution reminder.
2. **[2026-09-10] No AI-sounding prose in anything user-facing**
   Do instead: invoke the `humanizer` skill before writing README copy, site strings,
   commit messages or PR bodies. Vary sentence length, state facts, no "testament to",
   no rule-of-three, no em-dash decoration.
3. **[2026-09-10] Show before/after diffs when proposing copy changes**
   Do instead: for any text edit in another repo, paste the exact `-`/`+` hunks in the
   response and let him approve before touching the repo.

## Execution & Validation
1. **[2026-09-10] Verify a factual claim against the data before putting it in a README**
   Do instead: a plausible-sounding detail read off one sample line is usually wrong.
   The "LIFO keeps coming back to slot 0" claim died on
   `grep -oP 'primera_libre es: \d+' docs/results/ | sort | uniq -c` (it spans 0-9).
   Grep the actual captures, then write the sentence.
2. **[2026-09-10] `git add -p` hangs the Bash tool**
   Do instead: it is interactive with no TTY. Stage whole files, or use
   `git apply --cached` with a patch file.
3. **[2026-09-10] Verify the site in the browser, not just via a green build**
   Do instead: `npx vite --port 5199 &`, then Playwright. Read the saved
   `.playwright-mcp/page-*.yml` accessibility snapshot with `cat`; screenshots via the
   tool do not land on disk here. Add `.playwright-mcp` to .gitignore.
4. **[2026-09-10] Check the production build, not only dev, for anything asset-related**
   Do instead: `npx vite build && npx vite preview --port 5198`. Dev serves
   `/docs/CVs/name.pdf`; prod serves `/assets/name-<hash>.pdf`, and only prod shows
   hash-related bugs.

## Repo Behavior Guardrails
1. **[2026-09-10] Vite content hashes leak into downloaded file names**
   Do instead: any `<a download>` pointing at a bundled asset needs
   `download={fileName}`, or the user saves `CV_EN-mGnys_It.pdf`.
2. **[2026-09-10] docs/ files are discovered by glob, not imported by name**
   Do instead: to add a CV or certification, copy the file into `docs/CVs/` or
   `docs/certificates/` and add its title to `labels` in `src/data/documents.js`.
   Never add a hardcoded import. `npm run check:documents` enforces both.
3. **[2026-09-10] Contribution numbers are generated; never hand-edit them**
   Do instead: edit descriptions in `src/data/contributions.js`, exclusions in
   `contributions.exclude.json`, then `npm run sync:contributions && npm run gen:readme`.
   `contributions.generated.json` and the README tables are output.
4. **[2026-09-17] projects.js URLs are all canonical now; the sync warns if that breaks**
   Do instead: the old note said 10 links lived on GitHub redirects. Checked all 26
   against /repos/{owner}/{repo} on 2026-09-17: every one matches a real repo name.
   `scripts/sync-projects.mjs` prints a WARNING if a URL stops being canonical. The
   merge keys on the URL, not the repo name, so a rename degrades the route slug, not
   the card.
5. **[2026-09-10] `featured: true` projects must stay at the top of the array**
   Do instead: a wide card landing on an odd grid column leaves a hole. Six are set,
   and three of them already sit mid-array. Auto-generated projects are appended last
   and never featured, so they cannot make it worse.
6. **[2026-09-18] Roles and skills live in a Google Sheet, not in the repo**
   Do instead: `experience.generated.json` and `skills.generated.json` are output; never
   hand-edit them. Edit the sheet (id 1XmP8a4ymvgE0CZkxIFF9o2C3d10jqu3d8CHXoUGcajk, one
   tab each) and run the sync. Roles use two rows per role, one per language; an empty
   English cell must OMIT the key, not emit "": `localizeRole` spreads `en` over the
   role, so a present-but-empty key blanks the Spanish text instead of falling back.
   Address tabs by gid, never by name: gviz returns the FIRST tab, silently, when the
   name does not exist. See `MAINTAINING.md`.
7. **[2026-09-18] gen-readme.mjs breaks silently when a data file changes shape**
   Do instead: it rewrites three README blocks from `projects.js`, `contributions.js`
   and `skills.generated.json`. Moving skills out of `skills.js` made it emit 0 skills
   and delete ten README lines without an error. Always run `node scripts/gen-readme.mjs
   && git diff README.md` after touching any data file. It now also fills the counts in
   the content table, so those cannot go stale either.
8. **[2026-09-18] A project cover must carry no text; the card prints the title over it**
   Do instead: ProjectCard lays its name across the bottom of its own cover, so artwork
   with a title in it renders two sets of words on top of each other. Tried it twice
   before seeing it, once in SVG and once rendered in a browser. With no typography to
   match, a browser render buys nothing over an SVG. Also: hash with `>>>`, never `>>` —
   a signed shift on a real repo name goes negative, the hue comes out `undefined`, and
   one bad value kills the whole CSS gradient list silently.
9. **[2026-09-17] Tailwind preflight strips list markers and only emits used keyframes**
   Do instead: injected HTML (a README) needs `list-style` asked for again, or lists
   render as loose paragraphs. And `animation: spin` only exists in the stylesheet if
   an `animate-spin` class appears in scanned source, so a hand-written CSS animation
   must declare its own keyframes or it silently does nothing.

## Shell & Git Reliability
1. **[2026-09-10] Push needs HTTPS with the gh token, not SSH**
   Do instead: the SSH key belongs to the `ElblogdeIsmael` account; `gh` is
   authenticated as `Ismael-Sallami`, so SSH push is denied. Run
   `git remote set-url origin "https://x-access-token:$(gh auth token)@github.com/Ismael-Sallami/<repo>.git"`.
2. **[2026-09-10] `gh pr create` needs `--head` after a `-q` push**
   Do instead: the quiet push does not leave upstream tracking, so gh refuses. Pass
   `--head <branch>` explicitly.
3. **[2026-09-10] Regex-parsing JS source to share data with a script is brittle**
   Do instead: an apostrophe in a comment broke the exclude-list matcher. Put shared
   data in a `.json` file that both the site and the node script import.
