---
approved: # a date, or empty. Empty compiles to @draft: nothing counts it until someone approves.
person: someone who can say what the product is out loud, and cannot find it in the repository
---

# Someone who can say what the product is out loud, and cannot find it in the repository

They have the code that will exist and a board that says what is next. Neither says what the product
is for, so every session re-derives it — in a different mood, from a different half of the chat — and
the answer comes back different each time. This is the pass they make through the folder before
anything is built.

## 1 · Standing in the repository

The first minute decides the rest. A folder that opens with a template produces a filled-in template.

@state the repository has a walkthrough folder

### US-1 · Wants to know what belongs here before being told what to type

Four ways in, and each one writes something different. Without that table the only route anyone finds
is the one they happened to arrive by.

@when reads walkthrough/AGENTS.md
@then routes = 4
@then lines <= 60

### US-2 · Wants the product as one person meets it, in the order it happens

Not a feature list with headings. A pass through the product, in their voice, where the order carries
as much as the sentences do.

@when reads walkthrough/journey.md
@then stories >= 6
@then unaccounted = 0

## 2 · Reading what the format allows

They write prose freely. The markers are the part a machine reads, and the line between the two has to
be visible before they write the first story.

@state the repository has a walkthrough folder

### US-3 · Wants a number that will still mean the same story next month

Deleting a story is how a product loses weight. If the numbers move up to fill the hole, every
re-compile is a rewrite and every step definition that named an ID breaks with it.

@when reads walkthrough/journey.md
@then duplicated_ids = 0
@then ids_ascending = true

### US-4 · Wants to see what a machine may read before writing a word of it

@when reads walkthrough/rules/journey.md
@then markers = 4
@then rules = 6

## 3 · Handing the suite to a runner

The journey is prose; something has to collect it. One runner, one language, one glossary — and the
suite has to be the journey, not a copy of it that someone keeps in step by hand.

@state the repository has specs compiled once

### US-5 · Wants the suite the runner collects to be the journey itself

@when reads walkthrough/tech.md
@then runner = 1
@then phrasings <= 10
@then spec_scenarios = stories

### US-6 · Wants the journey to write the code as well

@refuse the folder writes specs, not source: a journey that emits code turns the journey into a request the machine fulfils, and nobody has to agree with it first. The compile stops at a scenario.

## 4 · Coming back to it

A week later nothing has changed. The compile runs again, and the answer has to be identical to the
last one — or the diff is noise, and a diff nobody reads cannot be a review.

Nothing in this suite can run the compile twice: the compile is a skill, not a program. The check is
a drill instead, and its number is in `decisions/`.

@state the journey has not changed since the last compile

### US-7 · Wants the second compile to cost nothing to read

@refuse the compile has no program behind it — it is a skill a person or a model performs, so no step definition can run it a second time and diff the result. The check is the drill recorded in decisions/: emit, emit again unchanged, change one @then, emit a third time. Measured there: 0 scenario lines moved, 15 header comment lines gone. A compiled scenario would be a green that proves nothing.
