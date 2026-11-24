# journey.md — the one file a person reads and the compiler reads

The product as one person walks through it, in order, once. Prose is for the reader; the four markers
are for the compiler. Nothing else is parsed — that line is the whole design.

## Shape

````markdown
---
approved:            # a date, or empty. Empty compiles to @draft: nothing counts it until someone approves.
person: 第一次来的人
---

# 第一次来的人

## 1 · 打开就停住了

输入框是空的，他没有准备好的第一句话。这一步的全部目的，是不要让他对着空白发呆。

@state 已注册，未开始任何对话

### US-1 · 想马上有个开头

他要的是一个能点的东西，不是一行"请输入文字"的提示。

@when 打开对话页
@then 可选话题数 = 3
@then 输入框为空

### US-2 · 想先看看别人怎么聊

@when 点开任一话题的示例
@then 返回一段对话，至少 4 轮
@then 不要求登录

## 2 · 说错了一句

@state 进行中，已完成至少 1 轮
...
````

## The four markers

| Marker | Where | Means |
| --- | --- | --- |
| `## N · <step>` | journey step | one thing the person does or sees, in order |
| `@state` | once per step | the Given for every story in that step |
| `### US-<n> · <want>` | story | one want; the ID is fixed for life |
| `@when` / `@then` | inside a story | the When, then one observable per line |

Two more, allowed but reported: `@todo` (a want not yet testable) and `@refuse <reason>` (decided
against).

## Six rules

1. **One person, one pass.** "The admin can also" is a second journey file, not a second voice here.
2. **`@then` names a count, a comparison, or a string.** "觉得自然" cannot compile; "≤ 2 句且含一个
   问号" can. If a step definition would have to guess, the line is prose that wandered into a marker.
3. **Prose is never parsed.** If the compiler needs it, it moves into a marker. Prose only a model
   could interpret is exactly how invented scenarios get in.
4. **IDs are assigned once.** Delete a story and the number is gone — never renumber, never reuse. This
   is what makes a re-compile a diff instead of a rewrite.
5. **Every story compiles, is `@todo`, or is `@refuse`.** The report counts all three. A silent skip is
   the one unacceptable outcome.
6. **`@refuse` compiles to a `@skip` scenario carrying its reason**, so a later implementer cannot
   build the refused thing by accident.

## Compile

`/walkthrough compile` reads this file and writes `specs/<journey>.feature`: one scenario per story,
tagged `@us-<n>`, `@state` as Given, `@when` as When, the `@then` lines as Then/And. The verb names the
act, not the format — `bdd` is the thing that comes out, `compile` is the thing you do.

- An unchanged ID keeps its exact wording. Only a story whose markers changed is rewritten.
- The report is three lists — added, changed, refused or todo — plus any scenario whose text changed
  while its ID was already referenced by a step definition. Those are listed for review, never
  silently swapped.
- With `approved:` empty the compile still runs, but every scenario is tagged `@draft`: it marks a
  want nobody has approved yet. A runner that means to gate filters `@draft` out; this repository
  runs none, so nothing here counts.
- The header is regenerated on every compile — one provenance line, no notes. Anything the compiler
  must not lose belongs in these rules, because `specs/` is the one place it cannot live.

## Why this shape and not BDD's own

`As a / I want / so that` is a sentence for a meeting, not a source language: nothing in it is
observable, so every scenario has to be invented afterwards. Here the readable half is prose you can
rewrite freely, and the compilable half is three markers per story. The cost is one rule — "prose is
never parsed" — and it buys the thing that matters: a re-compile diffs.
