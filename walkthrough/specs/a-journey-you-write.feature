# Compiled from walkthrough/journey.md by hand, 2026-11-24. This file is output: edit the journey.
# US-7 is red on purpose — it is the compile verb, which P2 of the card builds.
#
# Notes for the compiler (P2). Each marks a place where this hand pass was not mechanical:
#   1. @state becomes every story's Given. Two stories in one step share a first line; that is the
#      format working, not a copy-paste slip.
#   2. @then lines compile whole, `metric op value` included. Nothing is paraphrased into "Then the
#      folder names four routes" — the marker is already the sentence a step definition matches.
#   3. The story ID becomes a tag, `@us-<n>`, never part of the title. A re-worded story then keeps
#      its tag and the diff is one line instead of a delete and an insert.
#   4. @refuse becomes a @skip scenario whose only content is the reason, in a comment the runner
#      does not read. A refused want with steps would be a scenario somebody could implement.
#   5. approved: is empty, so every scenario carries @draft. The compiler decides that, not the writer.
#   6. These notes will not survive a compile. Whoever writes P2 has to decide whether the header is
#      regenerated from the journey or whether the notes belong in P2's own rules instead.
@walkthrough @journey
Feature: A journey you write, a suite you compile

  @us-1 @draft
  Scenario: US-1 Wants to know what belongs here before being told what to type
    Given a walkthrough folder
    When I read walkthrough/AGENTS.md
    Then routes = 4
    And lines <= 60

  @us-2 @draft
  Scenario: US-2 Wants the product as one person meets it, in the order it happens
    Given a walkthrough folder
    When I read walkthrough/journey.md
    Then stories >= 6
    And unaccounted = 0

  @us-3 @draft
  Scenario: US-3 Wants a number that will still mean the same story next month
    Given a walkthrough folder
    When I read walkthrough/journey.md
    Then duplicated_ids = 0
    And ids_ascending = true

  @us-4 @draft
  Scenario: US-4 Wants to see what a machine may read before writing a word of it
    Given a walkthrough folder
    When I read walkthrough/rules/journey.md
    Then markers = 4
    And rules = 6

  @us-5 @draft
  Scenario: US-5 Wants the suite the runner collects to be the journey itself
    Given specs compiled once
    When I read walkthrough/tech.md
    Then runner = 1
    And phrasings <= 10
    And spec_scenarios = stories

  @us-6 @draft @skip
  Scenario: US-6 Wants the journey to write the code as well
    # @refuse the folder writes specs, not source: a journey that emits code turns the journey into a
    # request the machine fulfils, and nobody has to agree with it first. The compile stops at a
    # scenario.
    Given a walkthrough folder

  @us-7 @draft
  Scenario: US-7 Wants the second compile to cost nothing to read
    Given the journey has not changed since the last compile
    When the compile runs again
    Then diff = 0
