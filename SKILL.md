---
name: ux-ui-design
description: Apply the craft and methods of UX/UI (product) design when building, redesigning, or reviewing any user interface — defining user needs and tasks, information architecture, user flows, interaction design, usability heuristics, accessibility (WCAG), forms and validation, interface states, and microcopy. Use this whenever the user is building, changing, or critiquing a UI, screen, page, flow, form, dashboard, app, or component and wants it to actually work for people — not just look good — even if they never say the words "UX", "usability", or "accessibility". This is the companion to the visual frontend-design skill — that one governs how an interface looks, this one governs how it works.
---

# UX/UI Design

Approach this as a product designer whose job is to make a person succeed at a task with the least friction possible. A screen is never the deliverable; the deliverable is someone completing what they came to do — finding the thing, submitting the form, understanding the answer, recovering from the mistake. Visual polish that sits on top of a confusing flow is lipstick on a maze. Get the structure, the flow, and the interaction right first; the looks come after and are covered by the separate `frontend-design` skill.

The most common reason real interfaces fail is not ugliness. It is missing states, unclear next steps, forms that punish people, jargon borrowed from the database, and dead ends with no way forward. This skill exists to catch those before they ship.

## Always start from the user and the task

Before laying out a single element, pin down three things and state them:

- **Who** is using this, and what do they already know? A first-time citizen filling a government form is not a power user living in a dashboard all day. Their tolerance for jargon, density, and ambiguity is completely different.
- **What is the one job** this screen or flow does? Name the single primary task. Everything else is secondary and should look secondary.
- **What does success look like** — and what does failure look like? Success is usually "task completed, with confidence it worked." Design the failure paths (errors, empty, partial) as deliberately as the happy path, because that is where people get stuck.

If the brief doesn't say, make a reasonable choice and state it rather than designing for a vague everyone. If memory or the conversation holds context about what the person is building, their stack, their users, or prior decisions, use it.

## Two modes of work

### Mode A — Building or redesigning a UI from a brief

Work in this order. Resist jumping to visual layout before the structure exists.

1. **Define** user, primary task, and success (above).
2. **Map the flow before the screens.** List the steps from entry to completion, the decision points, and every exit (success, cancel, error, back). A flow with five happy steps usually hides ten real states. Sketch it in prose or a simple list/diagram first.
3. **Information architecture.** Group and label content by the user's mental model, not the system's structure. People manage "notifications", not "webhook configuration". Name things by what the person controls and recognizes.
4. **Lay out by priority.** One primary action per screen, made obviously primary. Establish a clear visual hierarchy that matches task importance. When a task is complex or high-stakes, prefer one decision per screen over a dense wall of fields.
5. **Specify the interaction, not just the layout** — every state, every bit of feedback, what happens on success and on error (see "Interaction fundamentals" below).
6. **Write the words** as part of the design (see "Words are interface").
7. **Critique** against the heuristics and accessibility before declaring it done (see references).

### Mode B — Critiquing or auditing an existing UI

Don't free-associate complaints. Run a structured pass:

1. **Walk the primary task end to end as the actual user would**, not as the person who built it. Note every point of friction, hesitation, or dead end.
2. **Evaluate against the usability heuristics** — load `references/usability-heuristics.md` and check each one, which also gives you a severity rating scale and an output format.
3. **Check accessibility** — load `references/accessibility.md`.
4. **Report findings ranked by severity**, each with the specific element, why it's a problem for the user, and a concrete fix — not "improve the UX" but "the only way back is the browser button; add a visible Back link to the previous step." Specificity is the whole value.

## Interaction fundamentals (apply in every mode)

These are the things most often missing, and the cheapest to get right once you're looking for them.

- **Every interactive element has all its states.** Default, hover, focus, active, disabled, loading, and — where relevant — error, empty, and success. A screen that only handles the happy path is incomplete, not finished. The empty state, the loading state, and the error state are part of the design, not afterthoughts.
- **Every action produces immediate, visible feedback.** A tap, a save, a submit — the person must see that the system heard them. Anything that takes more than roughly a second needs a spinner, skeleton, progress indicator, or optimistic update, or it reads as broken.
- **Keep names consistent through a flow.** The button that says "Publish" produces a confirmation that says "Published", not "Success". The vocabulary of an interface is the signposting people use to learn it.
- **Affordances should not lie.** Things that look tappable must be tappable; things that aren't shouldn't look like they are. Disabled controls should look disabled and, ideally, say why.
- **Favour recognition over recall and forgiveness over confirmation.** Show choices rather than making people remember them. Prefer easy undo to a wall of "Are you sure?" dialogs — but keep confirmation (or a safer pattern) for genuinely destructive, irreversible actions.
- **Default to the safe, common choice.** Good defaults remove work. The most likely option should usually be pre-selected, and nothing destructive should be the default.

## Information architecture and flows

- Reduce the number of steps and decisions on the path to the primary task; every extra field, click, or page is a place to drop off.
- Navigation must always answer three questions for the user: where am I, where can I go, and how do I get back. Provide a real way back at every step — never rely on the browser button.
- Group related things; separate unrelated things; order by the user's priority, not the org chart.

## Accessibility is part of the design, not a final pass

Designing accessibly almost always makes the interface better for everyone — clearer labels, bigger targets, visible focus, sensible structure. Build to the floor as you go rather than bolting it on: semantic HTML first, full keyboard operability, visible focus, sufficient contrast, adequate target sizes, labelled controls, and respect for reduced-motion preferences. Load `references/accessibility.md` for the practical WCAG checklist and the specific numbers.

## Forms are where UX is won or lost

Most real product pain lives in forms. One question per idea, labels that stay visible, the right input type, help text that prevents errors, validation timed so it helps instead of nagging, and error messages that say what went wrong and exactly how to fix it. Load `references/forms-and-validation.md` before designing or reviewing any form, sign-up, checkout, or multi-step input flow.

## Words are interface

Copy is design material, not decoration — it is often the fastest fix for a usability problem. Label controls by the action they perform ("Save changes", not "Submit"). Use plain language from the user's side of the screen, not system terms. Errors explain what happened and how to fix it, without apologising or blaming. Empty states invite the next action instead of just saying "Nothing here". Keep one consistent word for one concept throughout. (The `frontend-design` skill covers writing for tone and brand; this skill cares that the words make the thing usable.)

## Quality bar — critique before you call it done

Walk the primary task one more time and ask honestly:

- Could a first-time user finish this without being told how?
- Can the whole task be completed with the keyboard alone, with focus always visible?
- Is every state handled — loading, empty, error, success, disabled?
- Does every action give feedback, and is there always a clear way forward and a way back?
- Is the copy plain, specific, and consistent?
- Is there one obvious primary action per screen?

Fix what fails before moving on. Then — only then — hand off to visual design (`frontend-design`) to make it distinctive. Usable first, beautiful second; the two compose, and a usable interface is what earns the right to be beautiful.

## References

Load these as the task calls for them; don't read all three pre-emptively.

- `references/usability-heuristics.md` — the ten heuristics with concrete checks and fix examples, plus a severity scale and report format. Use for any critique/audit, and as a final check when building.
- `references/accessibility.md` — practical WCAG 2.2 AA guidance with the actual numbers (contrast, target size, focus), keyboard and semantics, and a test checklist. Use whenever you build or review real UI.
- `references/forms-and-validation.md` — form structure, inputs, labels, help text, validation timing, error-message patterns, and destructive actions. Use for any form or input-heavy flow.
