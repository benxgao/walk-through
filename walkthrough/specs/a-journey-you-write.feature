# Compiled from walkthrough/journey.md, 2026-11-24. This file is output: edit the journey.
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

  @us-7 @draft @skip
  Scenario: US-7 Wants the second compile to cost nothing to read
    # @refuse the compile has no program behind it — it is a skill a person or a model performs, so no
    # step definition can run it a second time and diff the result. The check is the drill recorded in
    # walkthrough/decisions/: emit, emit again unchanged, change one @then, emit a third time.
    # Measured there: 0 scenario lines moved, 15 header comment lines gone. A compiled scenario would
    # be a green that proves nothing.
    Given the journey has not changed since the last compile
