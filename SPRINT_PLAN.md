# PostHog-Quality Sprint Plan
# Portfolio Redesign — posthog-redesign branch
# Sprint Start: 2026-02-20 | Target: 2026-02-25 (6 days)

---

## Sprint Goal

Ship a portfolio that a PostHog designer would respect: cream background with real
saturation, near-black hard-shadow borders everywhere, zero rounded corners,
generous whitespace, readable type hierarchy, and a fully working OS mode with
a minimized-pill taskbar. Every page feels editorial and intentional.

Done when: A stranger who knows PostHog.com sees the site and says
"yeah, this is clearly inspired by PostHog" without being told.

---

## Constraint Reminders

- Agents CANNOT write to `.claude/worktrees/` — they produce code snippets only.
- Main session applies all file writes.
- 84 tests must stay green throughout.
- No regressions to OS mode window (WindowFrame.tsx is working well, do not restructure it).

---

## Priority Definitions

- P0: Broken or missing functionality. Blocks the "done" definition.
- P1: Visible quality gap vs PostHog bar. User will notice immediately.
- P2: Polish and completeness. Nice to have before deploy.

---

## Task Registry

---

### TASK-01 — MinimizedPill in Desktop taskbar
Priority: P0
Scope: S (Small — ~1-2 hours)
Executor: Main session
Can run in parallel with: TASK-03, TASK-04, TASK-05

Current state:
  Desktop.tsx has no center section. When WindowFrame sets windowState="minimized",
  the window fades/scales out (animate: opacity 0, scale 0.85) and pointerEvents:none,
  but there is no pill in the taskbar to restore it. The window is permanently lost
  until the user refreshes or clicks a desktop icon which re-navigates but does not
  set windowOpen back.

  AppContext already has: windowState, setWindowState, windowOpen, setWindowOpen.
  WindowFrame.tsx already handles: minimized -> opacity 0, scale 0.85.

Done when:
  1. A pill appears in the exact horizontal center of the 36px taskbar ONLY when
     windowState === "minimized".
  2. Clicking the pill calls setWindowState("normal"), which causes WindowFrame's
     animate block to restore opacity:1, scale:1.
  3. The pill shows the current route filename (e.g. "home.mdx") pulled from the
     same ROUTE_TITLES map used in WindowFrame, or a fallback "portfolio.tsx".
  4. Pill uses: font-mono-code text-[11px], border border-foreground, bg-card,
     px-3 py-0.5, no rounded corners, hard-shadow-sm on hover.
  5. All 84 existing tests still pass.

Implementation notes:
  Desktop.tsx needs to import useApp (already has setExperience, needs windowState
  and setWindowState added to the destructure) and useLocation from react-router-dom
  to derive the filename label.

  The ROUTE_TITLES map should be extracted to a shared constant (e.g.
  src/lib/routeTitles.ts) so both Desktop.tsx and WindowFrame.tsx import from one
  source of truth, avoiding duplication.

  Pill markup target:
    <div className="absolute left-1/2 -translate-x-1/2">
      {windowState === "minimized" && (
        <button
          onClick={() => setWindowState("normal")}
          className="font-mono-code text-[11px] px-3 py-0.5 border border-foreground
                     bg-card hover:bg-foreground hover:text-background
                     transition-colors duration-150 hard-shadow-sm"
        >
          {filename} — minimized
        </button>
      )}
    </div>

Test impact:
  AppContext.test.tsx does NOT test windowState or windowOpen at all (the
  ContextConsumer in that file only destructures experience, wallpaper, and
  the three functions). No test changes needed for TASK-01.

---

### TASK-02 — CSS token saturation lift (background + nav backdrop)
Priority: P0
Scope: S (Small — ~45 minutes)
Executor: Main session
Can run in parallel with: TASK-01, TASK-03, TASK-04, TASK-05

Current state:
  --background: 36 18% 92%  (hsl — hue 36, saturation 18%, lightness 92%)
  --card:       38 12% 97%

  PostHog uses roughly hsl(36, 35%, 96%) for their lightest cream surface.
  The current 18% saturation reads almost as warm gray — it lacks the biscuit/cream
  warmth that makes PostHog feel distinctive. Muted foreground at 30 8% 20% is
  similarly flat.

  Navigation.tsx uses `bg-background border-b-2 border-foreground` with no
  backdrop-blur. In website mode the nav is fully opaque, which is fine, but on
  scroll it has no visual separation from content below (both are the same flat
  cream).

Done when:
  1. --background changed to: 36 35% 96%
     (matches PostHog's documented ~F0E8DC family but expressed in HSL)
  2. --card changed to: 38 20% 98%
     (cards are lighter than background, maintaining the layering)
  3. --secondary changed to: 35 18% 90%
     (slightly warmer secondary surfaces)
  4. --muted-foreground changed to: 30 12% 38%
     (more readable on the new warmer background, still clearly muted)
  5. Navigation.tsx header gets `backdrop-blur-sm bg-background/90` replacing
     `bg-background` so it has a frosted-but-sharp feel on scroll.
     Note: PostHog navigation IS slightly translucent on scroll — this is the
     one intentional exception to the no-blur rule because it is functional
     (depth cue) not decorative.
  6. Visual check: hero cream background visually matches #F0E8DC range.

File: src/index.css (lines 14-18 in :root block)
File: src/components/Navigation.tsx (line 50 — the header className)

---

### TASK-03 — Audit and kill rounded corners site-wide
Priority: P1
Scope: M (Medium — ~2-3 hours, many files)
Executor: Agent (research + grep pass) then Main session applies
Can run in parallel with: TASK-01, TASK-02, TASK-05

Current state:
  tailwind.config.ts correctly sets --radius: 0rem, so borderRadius lg/md/sm
  all resolve to 0. However, several components use Tailwind utility classes
  directly (rounded-full, rounded, etc.) that bypass the CSS variable:

  Known offenders found in codebase:
    - TrafficLight button in WindowFrame.tsx: `rounded-full` (intentional —
      traffic lights ARE circles, keep this)
    - Scrollbar CSS in index.css: `border-radius: 0` (already correct)
    - The animate-ping span in Navigation.tsx: implicitly circular via
      `bg-green-500` without explicit rounding — OK, status dots can be round
    - Search for `rounded` across all src/*.tsx files will reveal more

  The agent task is to grep every .tsx file for `rounded` and produce a
  report of all occurrences with file + line + whether it should be kept
  (traffic lights, status dots) or removed (cards, buttons, badges).

Agent deliverable:
  A complete list in format:
    FILE:LINE  CLASS  VERDICT(keep/remove)  REASON

Main session then removes all "remove" verdict classes.

Done when:
  Zero `rounded` classes (except rounded-full on TrafficLight and status indicator
  ping spans) remain in any src/ file.

---

### TASK-04 — Typography hierarchy tightening
Priority: P1
Scope: M (Medium — ~3 hours, touches every page)
Executor: Agent (analysis + spec) then Main session applies
Can run in parallel with: TASK-01, TASK-02, TASK-03

Current state analysis:
  Font loading: Instrument Serif (display), Space Grotesk (body), JetBrains Mono
  (mono) — these are correct PostHog-quality choices. No changes needed here.

  Issues identified by reading the pages:

  a) Heading size inconsistency across pages:
     - Home hero h1: text-[9rem] on lg — very large, intentional
     - About h1: text-8xl on lg — one step smaller, OK
     - Projects h1: text-7xl — another step smaller, inconsistent with About
     - Contact h1: text-8xl on lg — matches About
     - Changelog h1: text-7xl — matches Projects
     There is no clear type scale rationale. PostHog uses a deliberate modular
     scale. The sub-hero pages (About, Projects, Contact, Changelog) should all
     be the same size.

  b) Section heading sizes are inconsistent:
     - Some h2s use text-4xl, some text-5xl, no pattern
     - "Currently open to new opportunities" CTA uses text-5xl
     - "Academic background" uses text-5xl
     No clear rule for when h2 is 4xl vs 5xl.

  c) Muted text opacity: some places use text-muted-foreground, others use
     text-foreground/60, others opacity-60. These produce different rendered
     colors. Standardize to text-muted-foreground for all body secondary text.

  d) Line height: hero h1 uses leading-[0.88] — tight, editorial. But section
     h2s inherit the default leading which is too loose for display font.
     Section h2s should use leading-tight or leading-[0.92].

  e) The sub-tagline strip in Navigation (lines 127-133 in Navigation.tsx) is a
     visually interesting detail but `bg-card/40` with the old token values will
     look different after TASK-02's saturation change — verify it still reads well.

Agent deliverable:
  A page-by-page spec table:
    Page | Element | Current class | Recommended class | Rationale

  Also: a proposed type scale rule to encode as a comment in index.css:
    Display (h1 hero): 9rem / leading-[0.88]
    Section title (h1 sub-pages): 7xl / leading-[0.9]
    Section heading (h2): 5xl / leading-tight
    Card heading (h3): 2xl or 3xl / leading-snug
    Body: base / leading-relaxed
    Mono label: xs / tracking-widest / uppercase

Done when:
  All sub-page h1s are text-7xl md:text-8xl (unified).
  All h2 section headings are text-4xl md:text-5xl with leading-tight.
  Zero instances of opacity-60 or /60 on text (use text-muted-foreground instead).
  The type scale rule comment exists in index.css.

---

### TASK-05 — Section whitespace and visual rhythm audit
Priority: P1
Scope: M (Medium — ~2-3 hours)
Executor: Agent (analysis) then Main session applies
Can run in parallel with: TASK-01, TASK-02, TASK-03, TASK-04

Current state analysis from reading pages:
  PostHog sections have extremely generous vertical padding — often 80-100px
  between elements, never cramped. The current pages are generally good but
  have several compressed areas:

  Home.tsx issues:
    - Visitor counter has mb-8, then tagline p, then giant h1 — the hierarchy
      reads left-to-right but does not breathe enough top of page
    - Metrics table rows use py-2.5 — very tight, should be py-4 minimum
    - "Bedtime reading" section uses py-16 while all other sections use py-20
      or py-24 — the inconsistency makes it feel like an afterthought

  About.tsx issues:
    - Stats row (the 4-cell grid): p-6 per cell — OK
    - Experience cards use p-8 — good
    - Skill cards use p-5 — slightly tight for the content density
    - The space between experience cards is space-y-6 — should be space-y-8

  Projects.tsx issues:
    - Project grid uses gap-6 — fine
    - The drawer content (detail panel) has space-y-6 — OK
    - Card body p-5 is tight when content is dense with tech chips + impact

  Contact.tsx issues:
    - Contact link cards use p-6 — good
    - Resume section uses p-8 — good
    - Overall Contact is well-spaced — minimal changes needed

  Changelog.tsx issues:
    - space-y-16 between versions — generous, correct
    - Change cards use p-4 — slightly tight, should be p-5
    - space-y-3 between change cards — should be space-y-4

  Global issue: Footer marquee `mt-32` — this is only applied when Footer
  is at the bottom of pages that don't have a CTA section above it. But Home,
  About, Contact, Changelog all have a CTA section directly above Footer,
  so the mt-32 stacks with the section's py-24, creating 56px + 96px = 152px
  of space before the marquee text. This should be mt-0 when there's a
  preceding bordered section. Since Footer can't know its context, the CTA
  sections that precede Footer should use pb-0 or the footer should drop mt-32.

Agent deliverable:
  A diff-ready list of spacing class changes per file, line number, old value,
  new value, and reason.

Done when:
  All section paddings use py-20 or py-24 (no py-16 outliers except intentional
  compact sections).
  Metrics table rows use py-4.
  Experience cards use space-y-8.
  Changelog change cards use p-5 and space-y-4.
  Footer mt-32 replaced with mt-0 (the CTA section above provides visual
  separation via border-t-2 and bg-foreground contrast).

---

### TASK-06 — AppContext test coverage for windowState/windowOpen
Priority: P1
Scope: S (Small — ~1 hour)
Executor: Main session (no agent needed, straightforward test additions)
Can run in parallel with: TASK-02, TASK-03, TASK-04, TASK-05
Depends on: TASK-01 (write tests after pill component is implemented to avoid
            rewriting tests twice)

Current state:
  AppContext.test.tsx ContextConsumer (lines 7-19) does NOT expose windowState,
  setWindowState, windowOpen, or setWindowOpen. The context already has these
  fields (AppContext.tsx lines 13-16, 39-40), but zero tests exercise them.

  The setExperience function in AppContext has side effects on window state:
  when called with "os", it resets windowOpen=true and windowState="normal"
  (lines 44-47 in AppContext.tsx). This is currently untested.

Done when:
  AppContext.test.tsx has a ContextConsumer that also exposes:
    data-testid="window-state"  <- windowState value
    data-testid="window-open"   <- windowOpen.toString()
    button "minimize-window"    <- calls setWindowState("minimized")
    button "close-window"       <- calls setWindowOpen(false)

  New test cases added:
    1. "windowState defaults to normal" — checks data-testid="window-state" = "normal"
    2. "windowOpen defaults to true" — checks data-testid="window-open" = "true"
    3. "setWindowState minimized updates state" — click "minimize-window", check "minimized"
    4. "setWindowOpen false updates state" — click "close-window", check "false"
    5. "switching to os mode resets window to normal+open" — set windowState=minimized,
       then click "set-os", verify windowState="normal" and windowOpen="true"

  All 84 existing tests continue to pass. New tests add to the count.

---

### TASK-07 — Interactive card hover states and button consistency
Priority: P1
Scope: M (Medium — ~2 hours)
Executor: Agent (spec) then Main session applies
Can run in parallel with: TASK-03, TASK-04, TASK-05
Sequential after: TASK-02 (token values affect shadow colors)

Current state analysis:
  Three inconsistent patterns for hover shadow found in codebase:

  Pattern A (CSS class, correct):
    className="interactive-card"  or  "neo-btn"
    Defined in index.css with CSS transitions — this is the right approach.

  Pattern B (inline JS onMouseEnter/Leave, incorrect):
    Projects.tsx lines 208-209: Shuffle button uses JS to toggle boxShadow inline.
    Projects.tsx lines 415-416: "View Slides" button in drawer footer uses JS too.
    These bypass the CSS system and create janky imperative state.

  Pattern C (mixed, partially incorrect):
    Some buttons use `hover:translate-x-0.5 hover:translate-y-0.5` inline Tailwind
    without the corresponding box-shadow collapse — the translate without shadow
    collapse looks broken (it shifts but the shadow shifts with it).

  CTA buttons on Home (the dark bg-foreground section, lines 381-398) use
  neo-btn-invert with rgba(255,255,255,0.25) shadow — this is correct for
  inverted context but the shadow is very faint. PostHog dark sections use
  stronger contrast.

  The "Open Slides" footer button in Projects cards (line 303) uses
  hover:bg-primary hover:text-primary-foreground transition — this is fine
  but it has no shadow treatment, making it feel flat compared to other buttons.

Agent deliverable:
  List every button/card in every page file with:
    FILE:LINE  ELEMENT  CURRENT_PATTERN  RECOMMENDED_PATTERN

  For each Pattern B occurrence: provide the replacement className that uses
  CSS classes instead of inline JS handlers.

Done when:
  Zero onMouseEnter/onMouseLeave handlers remain that manipulate boxShadow.
  All interactive elements use one of: neo-btn, neo-btn-primary, neo-btn-sm,
  neo-btn-invert, or interactive-card.
  The "View Slides" drawer button shadow is expressed as CSS class not inline JS.

---

### TASK-08 — Projects page drawer UX improvements
Priority: P2
Scope: S (Small — ~1 hour)
Executor: Main session
Can run in parallel with: TASK-05, TASK-06
Sequential after: TASK-07

Current state:
  The project detail drawer (AnimatePresence > motion.div, lines 329-436 in
  Projects.tsx) works but has UX gaps:

  1. The backdrop (bg-foreground/30) is quite translucent — on the warm cream
     background it reads almost as no backdrop. PostHog overlays use ~50-60%
     opacity background darkening.

  2. No keyboard dismiss (Escape key) — standard UX expectation for drawers/modals.

  3. The drawer transition is `type: "tween", duration: 0.25` — fast but jerky.
     A spring feels more physical: `type: "spring", stiffness: 300, damping: 30`.

  4. Impact metric rows in the drawer use `border border-border bg-card` (1px
     border, lowercase `border`). Per neo-brutalist spec these should be
     `border-2 border-foreground/20 bg-card` for visual consistency.

Done when:
  Backdrop opacity is bg-foreground/50.
  Escape key closes the drawer (useEffect on keydown in Projects.tsx).
  Drawer transition uses spring.
  Impact rows use border-2 border-foreground/20.

---

### TASK-09 — Changelog page "what's next" copy update + v3.0.0 entry
Priority: P2
Scope: S (Small — ~30 minutes, content only)
Executor: Main session
Can run in parallel with: all other tasks

Current state:
  Changelog.tsx line 313: "Next up: OS window framing, interactive project demos,
  maybe an AI assistant."

  The OS window framing is now shipped (v3.0.0). This copy is stale.

  v3.0.0 entry (lines 25-60) mentions "PostHog-inspired editorial aesthetic" but
  does not mention the MinimizedPill (TASK-01) which will be shipped in this sprint.

Done when:
  "what's next" copy updated to reflect actual roadmap post v3.0.0:
  "Next up: contact form integration, live project demos, and maybe a terminal."

  v3.0.0 changelog entry gets a new change:
    type: "feat"
    title: "MinimizedPill — taskbar restore for minimized windows"
    description: "Clicking the yellow traffic light now sends the window to a taskbar
                  pill. Click it to restore. Matches real macOS behavior."

---

### TASK-10 — Final visual QA pass and build verification
Priority: P0 (gate to merge)
Scope: S (Small — ~1 hour)
Executor: Main session
Sequential after: all other tasks complete

Checklist:
  [ ] Run: npx vitest run — all tests pass (count >= 84)
  [ ] Run: npx tsc --noEmit — zero TypeScript errors
  [ ] Run: npx vite build — build succeeds, no warnings about missing imports
  [ ] Visual check website mode:
        - Nav backdrop-blur visible on scroll
        - Cream background is visibly warm (not gray)
        - No rounded corners on cards, buttons, badges
        - Hard shadows consistently 4px offset on all interactive elements
        - Metrics table rows are not cramped
  [ ] Visual check OS mode:
        - Click yellow traffic light -> window fades out -> pill appears in taskbar center
        - Click pill -> window restores to normal state
        - Click red traffic light -> window closes -> desktop icon click reopens (windowOpen=true)
        - Click green traffic light -> window maximizes -> click again -> restores to saved position
        - Drag window by title bar -> confirm only title bar initiates drag, not content
        - Resize from all 4 corners
  [ ] Mobile check (375px viewport):
        - Navigation hamburger opens/closes
        - Hero text does not overflow horizontally
        - Project grid goes to 1 column

Done when: all checklist items checked.

---

## Execution Order and Parallelism Map

Day 1 (2026-02-20):
  [Main session] TASK-02 — CSS tokens (fast, foundational, everything else looks right after this)
  [Main session] TASK-01 — MinimizedPill (P0 functional gap, do while TASK-02 diffs are tiny)
  [Agent A]      TASK-03 — Rounded corners grep report (agent researches while main codes)
  [Agent B]      TASK-04 — Typography spec (agent analyzes while main codes)

Day 2 (2026-02-21):
  [Main session] Apply TASK-03 removes (main reads agent A report, applies changes)
  [Main session] Apply TASK-04 typography changes (main reads agent B spec, applies changes)
  [Agent C]      TASK-05 — Spacing audit (agent analyzes while main applies type/corner fixes)
  [Agent D]      TASK-07 — Button consistency spec (agent lists all onMouseEnter JS handlers)

Day 3 (2026-02-22):
  [Main session] Apply TASK-05 spacing changes (main reads agent C report)
  [Main session] Apply TASK-07 button fixes (main reads agent D report, removes JS handlers)
  [Main session] TASK-06 — AppContext tests (straightforward, no agent needed)

Day 4 (2026-02-23):
  [Main session] TASK-08 — Drawer UX improvements
  [Main session] TASK-09 — Changelog copy update

Day 5-6 (2026-02-24-25):
  [Main session] TASK-10 — Full QA pass, fix any issues found
  Buffer for anything that surfaced during QA

---

## Task Summary Table

| Task | Name                              | Priority | Scope | Executor          | Parallel With        |
|------|-----------------------------------|----------|-------|-------------------|----------------------|
| 01   | MinimizedPill in taskbar          | P0       | S     | Main session      | 03,04,05             |
| 02   | CSS token saturation + nav blur   | P0       | S     | Main session      | 01,03,04,05          |
| 03   | Audit/kill rounded corners        | P1       | M     | Agent then Main   | 01,02,05             |
| 04   | Typography hierarchy tightening   | P1       | M     | Agent then Main   | 01,02,03             |
| 05   | Section whitespace/rhythm audit   | P1       | M     | Agent then Main   | 01,02,03,04          |
| 06   | AppContext windowState tests      | P1       | S     | Main session      | 02,03,04,05          |
| 07   | Button/card hover consistency     | P1       | M     | Agent then Main   | 03,04,05             |
| 08   | Projects drawer UX                | P2       | S     | Main session      | 05,06 (after 07)     |
| 09   | Changelog copy update             | P2       | S     | Main session      | All                  |
| 10   | QA pass + build verification      | P0(gate) | S     | Main session      | After all tasks      |

---

## PostHog Design Principles Checklist (reference for QA)

Cream/warm background (#F0E8DC range):
  Token: --background: 36 35% 96%  (TASK-02 target)

Near-black borders (2px solid, very sharp), NO border-radius:
  Token: --border: 0 0% 12%  (already correct)
  Tailwind: border-2 border-foreground on all cards/buttons  (verify in TASK-10)
  Rounded: zero (TASK-03)

Orange primary (#f54e00):
  Token: --primary: 20 100% 48%  (already correct — hsl(20,100%,48%) = #f54e00)

Hard offset shadows (4px 4px 0px near-black):
  CSS classes: hard-shadow, hard-shadow-lg, hard-shadow-sm  (already defined)
  Verify all interactive elements use these (TASK-07)

Typography: bold display font + clean mono:
  Fonts: Instrument Serif + JetBrains Mono  (already loaded, already applied)
  Hierarchy: standardized in TASK-04

Whitespace: very generous, nothing cramped:
  Padding: py-20/py-24 for sections (TASK-05)
  Metrics table row padding: py-4 (TASK-05)

NO gradients, NO blur backgrounds (except functional nav on scroll), NO rounded corners:
  Gradients: none currently — maintain
  Blur: nav backdrop-blur-sm only (TASK-02)
  Rounded: eliminated (TASK-03)

---

## Risk Register

Risk 1: TASK-02 token changes break dark mode
  Likelihood: Medium. The dark mode block in index.css is separate and uses
  different token values. The light mode changes should not affect dark mode,
  but the nav backdrop-blur change applies to both modes. Mitigate: test
  dark mode toggle during TASK-10 QA.

Risk 2: TASK-01 MinimizedPill breaks existing AppContext tests
  Likelihood: Low. The ContextConsumer in AppContext.test.tsx only destructures
  experience, wallpaper, and the three functions. It does not touch windowState.
  Desktop.tsx is not tested directly. No test changes needed for TASK-01 alone.
  TASK-06 adds new tests — these are additive, not modifications.

Risk 3: TASK-03 accidentally removes rounded-full from TrafficLight
  Likelihood: Medium if done carelessly. Mitigation: agent report explicitly
  marks TrafficLight rounded-full as KEEP. Main session must read the full
  report before applying changes.

Risk 4: TASK-04 typography changes cause line overflow on mobile
  Likelihood: Low-Medium. The hero is already responsive (text-[4.5rem] at base,
  text-[7.5rem] at md, text-[9rem] at lg). Changes are only to sub-page h1 sizing
  (unifying to text-7xl md:text-8xl) which the current About and Contact already use.
  Verify in TASK-10 mobile check.

Risk 5: Framer motion AnimatePresence in WindowFrame reacts unexpectedly to
  windowState changes after TASK-01
  Likelihood: Low. WindowFrame already handles the minimized animate state
  (opacity:0, scale:0.85, pointerEvents:none). The MinimizedPill only calls
  setWindowState("normal") which causes the existing animate block to restore
  opacity:1, scale:1. No changes to WindowFrame.tsx are needed for TASK-01.

---

## Files Modified Per Task

TASK-01:
  src/components/Desktop.tsx  (add MinimizedPill, import useApp windowState/setWindowState, import useLocation)
  src/lib/routeTitles.ts      (NEW — shared constant extracted from WindowFrame)
  src/components/WindowFrame.tsx  (import routeTitles from shared lib instead of local const)

TASK-02:
  src/index.css               (lines 16-17: --background and --card token values)
  src/components/Navigation.tsx  (line 50: add backdrop-blur-sm bg-background/90)

TASK-03:
  src/pages/*.tsx             (remove rounded-* classes per agent report)
  src/components/*.tsx        (remove rounded-* classes per agent report, except TrafficLight)

TASK-04:
  src/pages/Projects.tsx      (h1 size)
  src/pages/Changelog.tsx     (h1 size)
  src/pages/About.tsx         (h2 leading)
  src/pages/Home.tsx          (h2 leading, opacity/60 -> text-muted-foreground)
  src/pages/Contact.tsx       (opacity-60 -> text-muted-foreground)
  src/index.css               (add type scale comment block)

TASK-05:
  src/pages/Home.tsx          (metrics table py-4, bedtime section py-24)
  src/pages/About.tsx         (experience cards space-y-8)
  src/pages/Changelog.tsx     (change cards p-5, space-y-4)
  src/components/sections/Footer.tsx  (mt-32 -> mt-0)

TASK-06:
  src/test/AppContext.test.tsx  (additive new tests)

TASK-07:
  src/pages/Projects.tsx      (remove onMouseEnter/Leave handlers, replace with CSS classes)

TASK-08:
  src/pages/Projects.tsx      (backdrop opacity, Escape key, spring transition, impact row borders)

TASK-09:
  src/pages/Changelog.tsx     (copy + new changelog entry)

TASK-10:
  No files (QA only, unless issues found)
