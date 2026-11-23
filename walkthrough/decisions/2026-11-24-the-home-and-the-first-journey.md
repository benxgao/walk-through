# 2026-11-24 — the home is its own repository, and the first journey is this product

## The choice

- walk-through is the home of the walkthrough product: the folder, the skill, the rules, and the
  first compiled suite all live here, and a consumer copies the folder rather than linking to it.
- The first journey is **this product**, not the product that will consume it. The six stories a
  hand compile needs are the ones this repository can check today.

## Why

- A card in another repository is a card about that repository. Every path in `walkthrough/` was
  already escaping into a consumer's tree, and the extraction drill was going to be the first time
  anyone noticed.
- The card's P1 asks for one scenario failing for the right reason. A journey about a chatbot nobody
  has built produces seven failures and teaches nothing; a journey about a folder that exists
  produces five passes and one honest red where the compile verb is missing.
- small-talk-agents keeps its own journey. It is written there, during the install test, by the
  person who owns that product — which is the only way the journey is in someone's voice.

## Rejected

- **Keep the journey about small-talk-agents in this repository.** It would be a document about a
  product that does not exist yet, checked by a suite with nothing to read. The first journey has to
  be falsifiable in the repository it sits in.
- **A git submodule from each consumer.** Moves the drift instead of removing it, and a submodule
  makes the folder's paths a repository boundary rather than a folder boundary.
- **An npm package with `walkthrough init`.** A build step and a version number for four markdown
  files and one skill; the copy is one `cp -r` and the diff is readable.
- **Leave the card in small-talk-agents and plan here.** Two repositories, one card, and the board
  stops being the answer to "where were we".

## What it costs

- A consumer's copy can drift from this one. The install test names the version it copied, and the
  compile diff is the only guard — cheap while there is one consumer, and a real decision at three.
