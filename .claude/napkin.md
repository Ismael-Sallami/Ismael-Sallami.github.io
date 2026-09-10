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
4. **[2026-09-10] projects.js links use old repo names and survive on GitHub redirects**
   Do instead: 10 of them (SCD-Concurrency-MPI, MH-Practices, AA-practices,
   Parcherckers, DDSI, TDA-Imagen, Air-lines-Project, Practica2_IA,
   ModeloEconometrico). Ask before renaming; they still resolve.
5. **[2026-09-10] `featured: true` projects must stay at the top of the array**
   Do instead: a wide card landing on an odd grid column leaves a hole. Four are set.

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
