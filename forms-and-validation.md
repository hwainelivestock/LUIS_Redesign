# Forms & Validation

Forms are where most real product pain lives — sign-ups, checkouts, applications, settings, any multi-step input. Use this whenever designing or reviewing one. The goal is the same as everywhere: the person completes the task, correctly, with the least friction and the most confidence.

## Structure

- **Ask only what you need.** Every field is a cost and a drop-off point. For each one, ask "what happens if we don't collect this?" If the answer is "nothing much", cut it.
- **One thing per question.** Don't merge unrelated inputs into one field. Split a full name only if you actually use the parts.
- **Group and order logically.** Related fields together, in the order the user thinks about them. Put the easy, low-commitment fields first.
- **One primary action per form.** "Continue" or "Save" is prominent; "Cancel" is a quiet secondary or a link, never an equally-weighted twin of the primary.
- **One thing per page for complex or high-stakes flows.** Long or unfamiliar tasks (applications, anything legal/financial/medical) are easier and less error-prone as a sequence of small focused screens with a clear progress indication than as one giant page. Short, familiar forms (login, a quick filter) are fine on one screen — match the pattern to the task.

## Labels and help

- **Always a visible label**, programmatically tied to the input. Labels stay put; placeholders don't. Placeholder-as-label fails the moment someone starts typing and usually fails contrast too.
- **Mark the rarer case.** If most fields are required, mark the optional ones "(optional)"; if most are optional, mark required ones. Don't rely on a `*` alone — say what it means.
- **Help text prevents errors.** Put a short hint before the input where people predictably stumble: the format, an example, where to find a reference number ("for example, 27 3 2026"). Help text is not the same as a placeholder — it stays visible.
- **Right input type and autocomplete.** Use `type="email"`, `type="tel"`, numeric inputs for numbers, a structured day/month/year for dates, and `autocomplete` tokens so browsers can fill known values. The correct mobile keyboard alone removes a lot of error.

## Validation timing — help, don't nag

- **Don't validate angrily on every keystroke.** Flagging "invalid email" while someone is still on the second character is hostile. Validate a field when the user finishes it (on blur) or on submit.
- **Positive, late, gentle:** if you do live-validate, prefer confirming success once a field is valid over screaming while it's still being typed.
- **On submit, validate everything**, keep all the values the user entered (never wipe the form), and move focus to where it helps (see errors below).
- **Inline + summary together** for anything longer than a couple of fields.

## Error messages — what went wrong and how to fix it

A good error message is specific, blame-free, and actionable. The formula:

> **[What's wrong] + [how to fix it], in plain words.**

- "Invalid input" → **"Enter your date of birth, for example 31 3 1980."**
- "Error" → **"Select whether you want paperless billing."**
- "Field required" → **"Enter your email address."**

Rules:
- Put the message **next to the field** it refers to, and associate it programmatically (`aria-describedby`) so it's announced.
- At the top of the form, show an **error summary** listing every problem, each linking to its field; move focus to the summary on failed submit so keyboard and screen-reader users go straight to it.
- Use plain language. No error codes, no "an unexpected error occurred", no apologising, no blaming the user.
- Don't clear the form. Preserve what was entered so people only fix the broken field.

## Empty, loading, and success states

A form flow isn't just inputs:
- **Loading / submitting:** disable the submit to prevent double-submission, show that it's working, and never leave the user wondering if it went through.
- **Success:** confirm clearly what happened and what's next ("Your application has been submitted. Your reference is HJ-2931. We'll email you within 5 working days."). A reference number and a next step beat a bare "Success."
- **Empty state** (e.g. a list the form populates): say what would appear here and offer the action to create the first item, rather than a blank "Nothing to show."

## Destructive and irreversible actions

- Style destructive actions distinctly (commonly a warning treatment) and never make them the default or the easy mis-tap next to a safe one.
- Prefer **undo over confirm** where you can ("Item deleted — Undo"): it's less interruptive and recovers real mistakes. Reserve confirmation dialogs for genuinely irreversible actions.
- When you must confirm, make the dialog state the specific consequence ("Delete 3 records permanently? This can't be undone.") and label the buttons by action ("Delete records" / "Keep records"), not "Yes"/"No".

## Quick form review checklist

1. Is every field actually needed?
2. Does every input have a visible, associated label (not just a placeholder)?
3. Is the right input type / keyboard / autocomplete used?
4. Does validation help rather than nag (on blur or submit, not every keystroke)?
5. On error: values preserved, message says what + how to fix, inline + summary, focus moved to summary?
6. Is there one clear primary action, and a clear way back/cancel?
7. Are submitting and success states handled, with a real confirmation and next step?
8. Are destructive actions guarded by undo or a specific confirmation?
