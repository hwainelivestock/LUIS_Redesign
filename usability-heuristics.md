# Usability Heuristics & How to Critique

Use this when reviewing an existing interface (Mode B) and as a final check when building (Mode A). The ten heuristics below are Jakob Nielsen's, restated for practical use: for each one, what it means, how to check it on a real screen, and a concrete fail → fix.

## How to run a heuristic evaluation

1. Pick the primary task and the realistic user. Walk the task start to finish as that user.
2. At each screen, check it against the ten heuristics below.
3. For each issue, record: the **element/location**, the **heuristic** it violates, **why it hurts the user**, a **severity** (scale below), and a **specific fix**.
4. Report issues ordered by severity, worst first. Vague findings are useless — always name the element and the fix.

### Severity scale

- **0 — Not a problem.** Cosmetic preference only.
- **1 — Cosmetic.** Fix if time allows.
- **2 — Minor.** Causes mild, occasional friction.
- **3 — Major.** Frequently blocks or confuses users; fix soon.
- **4 — Catastrophic.** Stops people completing the task; fix before anything else.

### Report format

```
[Severity 4] Step 3, "Continue" button — Violates: Error prevention, Visibility of status
Problem: Submitting with an empty date silently reloads the page with no message; the
user thinks the service is broken.
Fix: Validate on submit, keep entered values, show an error summary linked to the field
with a message that says what to enter ("Enter the date the animal died, for example
27 3 2026").
```

## The ten heuristics

### 1. Visibility of system status
Keep people informed about what's happening through timely, appropriate feedback.
- **Check:** Does every action produce a visible response? Is progress shown for anything slow? Does the user always know where they are (step 2 of 5, which tab, which filter is active)?
- **Fail → Fix:** A save button that does nothing visible for two seconds → show a loading state on the button, then a confirmation ("Changes saved").

### 2. Match between system and the real world
Speak the user's language; follow real-world conventions; present things in a natural order.
- **Check:** Any jargon, internal codes, or database field names leaking into the UI? Do labels match how users think about the task?
- **Fail → Fix:** "Holding CPH null" → "Add the holding this animal moved from".

### 3. User control and freedom
People choose functions by mistake; give them a clearly marked exit. Support undo and redo.
- **Check:** Is there always a way back and a way to cancel? Can mistakes be undone? Is anything a one-way door that shouldn't be?
- **Fail → Fix:** A multi-step form with no Back link, forcing the browser button (which loses data) → add a "Back" link on every step that preserves entered values.

### 4. Consistency and standards
Same word, same action, everywhere. Follow platform and design-system conventions so people don't have to wonder whether different words mean the same thing.
- **Check:** Is one concept named one way throughout? Do similar things look and behave similarly? Are platform conventions respected (links look like links, primary action placement is consistent)?
- **Fail → Fix:** "Delete" on one screen, "Remove" on another, "Discard" on a third, all doing the same thing → pick one verb and use it everywhere.

### 5. Error prevention
Better than good error messages is a design that prevents the error in the first place.
- **Check:** Are destructive actions guarded? Are likely mistakes designed out (good defaults, constrained inputs, formatting helped, confirmation only where it earns its place)?
- **Fail → Fix:** A free-text date field that accepts "next Tuesday" → use a structured date input with day/month/year and an example, or a date picker.

### 6. Recognition rather than recall
Minimise memory load. Make objects, actions, and options visible; don't make people remember information across screens.
- **Check:** Does the user have to remember a code, a previous selection, or instructions from an earlier step? Are choices shown rather than recalled?
- **Fail → Fix:** "Enter the reference number from the previous page" → carry it forward and display it, pre-filled or as read-only context.

### 7. Flexibility and efficiency of use
Let frequent users go faster (shortcuts, defaults, saved state) without getting in the way of novices.
- **Check:** Can experienced users skip steps, reuse previous entries, or act in bulk? Do accelerators stay out of the novice's way?
- **Fail → Fix:** Re-entering the same address on every record → offer "Use my saved address" / "Same as last time".

### 8. Aesthetic and minimalist design
Every extra element competes with the relevant ones for attention. Keep only what serves the task.
- **Check:** Is there one clear primary action per screen? Is anything decorative drowning the signal? Could anything be removed without loss?
- **Fail → Fix:** Three equally-weighted buttons of equal prominence → make the primary action prominent and demote the rest to secondary/links.

### 9. Help users recognise, diagnose, and recover from errors
Error messages in plain language: say what went wrong and how to fix it, precisely.
- **Check:** Do errors name the specific problem and the remedy? Are they next to the field and summarised at the top? No codes, no blame, no "an error occurred"?
- **Fail → Fix:** "Invalid input" → "Enter an email address in the format name@example.com".

### 10. Help and documentation
Ideally the system needs no explanation, but where help is needed it should be easy to find, task-focused, and concise.
- **Check:** Where users predictably get stuck, is just-in-time help available inline (hint text, an example, a short "what's this?") rather than buried in a separate manual?
- **Fail → Fix:** A field labelled only "UPRN" with no explanation → add hint text describing what it is and where to find it.

## Common UX smells (quick scan)

Catch these fast; they show up constantly:
- No visible focus state when tabbing through the page.
- Placeholder text used as the only label (it vanishes when typing and fails contrast).
- A spinner with no eventual success or error resolution.
- An empty state that just says "No results" with no suggested action.
- Primary, secondary, and destructive actions all styled identically.
- Validation that fires aggressively on every keystroke before the user has finished.
- A flow with no way back except the browser button.
- Two different words for the same concept across screens.
- A destructive action with no confirmation or no undo.
- Text crammed edge to edge with no rhythm, making scanning impossible.
