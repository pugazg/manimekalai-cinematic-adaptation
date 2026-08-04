# 02 — Design Pillars

Six pillars. Each is derived from a repository principle, has a **gameplay** and a
**narrative** expression, a **failure mode** (how it goes wrong), and an
**acceptance test** (a checkable condition a build must pass). Pillars are ranked;
if two conflict in a design choice, the lower number wins.

---

## Pillar 1 — Compassion is action, not sentiment

**Meaning.** Compassion in *Manimekalai* is *practice* — begging, serving, cleaning,
organising — before it is feeling or miracle (10A: "Compassion precedes miracles";
`04H` Aputhiran: compassion existed "when the pot was ordinary"; `AD-0134`).

**Gameplay expression.** The verbs the player spends the most time on are physical
and organisational: move, observe, listen, carry, place a water route, assign a
serving hand, open a room. Feeling is *produced by* doing, never selected from a menu.

**Narrative expression.** Every branch story must "answer a present question and
return with a changed decision" (10A branch-story rule). The game preserves this:
an embedded memory (e.g. Aputhiran) is playable only if it changes what the player
can *do* next.

**Failure mode.** "Compassion" becomes a dialogue option or a cutscene; the player
watches kindness instead of performing it → the screenplay-with-buttons problem
(`GRT-02`).

**Acceptance test.** In any 10-minute slice, **≥ 60%** of player *inputs* are
world-actions (move/observe/listen/arrange/serve), **≤ 40%** are dialogue choices.
No emotional beat is delivered solely by a "Feel compassion" prompt.

---

## Pillar 2 — Listen before you intervene

**Meaning.** "Three women have come. Three accounts must be heard… No one is invited
to surrender her knowledge" (`FU-017`). Aravana "listens before interpreting"
(`FU-018`, 10A). Intervening before understanding is the epic's recurring error.

**Gameplay expression.** Testimony can be **heard fully or cut short**, and cutting
it short has consequences (lost evidence, lost trust, unsafe witness). The
investigation cannot be "completed" by observation alone; some causes are only
knowable through patient listening.

**Narrative expression.** Sudhamathi's account, Aputhiran's story, Kayasandihai's
"where hunger waits beyond this courtyard" — each unlocks understanding only when
allowed to finish.

**Failure mode.** Skippable, weightless dialogue; player mashes past testimony and
still succeeds → trivialises the epic's core epistemic virtue.

**Acceptance test.** There exists at least one problem in the slice whose true
cause is **impossible to identify** without letting a specific testimony finish;
skipping it produces a visibly worse, still-playable outcome (fail-forward, `03`).

---

## Pillar 3 — Hunger is a system, not a bowl

**Meaning.** The Amudhasurabhi removes food scarcity and thereby *reveals* water,
vessels, cooking, serving, sanitation, access, labour, power, exclusion, dignity,
sustainability (`AD-0139`; `04H` §6 Miracle rule; `RISK-011`; 10A "Compassion
becomes logistics").

**Gameplay expression.** The bowl is one solved variable among ~10 unsolved ones
(`04`). "Distribute food" alone can never clear a feeding scenario; the player must
address at least the *binding constraints* for that place and population.

**Narrative expression.** Aadhirai's single household pot → Ulaga Aravi crowd →
prison kitchen shows the same ethic scaling up and hitting new system walls.

**Failure mode.** One-button abundance; hunger "solved"; the world's poverty
becomes cosmetic → the game endorses charity-as-spectacle (`RISK-011`,
`RISK-013` decorative reform).

**Acceptance test.** In the feeding scenario, a run that only fills bowls leaves
**measurable, on-screen** unmet need (someone who cannot reach the line, unsafe
water, a crushed queue) and does **not** register as success.

---

## Pillar 4 — Evidence before certainty

**Meaning.** Distinguish "private experience, testimony, inference and public proof"
(README core principle; `05B`; `PHL-02`). Unexamined interpretation destroys lives:
Udayakumaran reads desire as destiny; Kanchanan reads resemblance as identity;
Rajamadevi reads grief as guilt (10A Act II-B/III; `RISK-006`/`007`/`008`).

**Gameplay expression.** The signature verb: the player **classifies** each thing
they learn — direct observation, testimony, inference, assumption, memory,
philosophical claim, public proof (`GM-04`, the "Ledger of Knowing"). Acting on an
*assumption* as if it were *proof* is the central mistake the game lets you make —
and correct (10A: "Manimekalai must make at least one incomplete inference and
accept correction").

**Narrative expression.** The reasoning is not a late-game lecture; it is seeded in
Sequence 04's testimonies and paid off in Sequences 09–10.

**Failure mode.** The classification becomes busywork with one right answer and a
score → a quiz, not an epistemology; caricatures reasoning (`RISK-014`).

**Acceptance test.** At least one juncture rewards *correctly labelling something as
uncertain* (holding back) over acting confidently; and misclassification is
**recoverable** (fail-forward), never a hard fail.

---

## Pillar 5 — Nonviolent tension

**Meaning.** "The player should not defeat enemies through violence." Yet the source
is full of real danger — pursuit, a killing, drugging, defamation, starvation as
coercion (10A; `SEQ-05`/`06`). Tension without violence.

**Gameplay expression.** Threats are resolved by **access, evidence, witnessing,
timing and institutional pressure**, never by force. "Danger" = a witness may be
silenced, a reform may be reversed, a person may be starved in custody (`SEQ-06`).
The player's counter-moves are recording, routing, sheltering, testifying,
convening.

**Narrative expression.** The prison scene (`FU-024`) literally hands a former
prisoner the *first ladle* instead of a weapon; power is reorganised, not overthrown.

**Failure mode.** Nonviolence read as low-stakes/"cosy"; or coercion staged as
titillation/spectacle → gamifying trauma, romanticising coercion (`GRT-06`/`GRT-07`;
`RISK-006`/`010`).

**Acceptance test.** No player verb anywhere deals damage or "defeats" a person.
Every antagonistic beat has a nonviolent counter that is *harder and more
interesting* than a hypothetical fight would be.

---

## Pillar 6 — Plurality without a "winning religion"

**Meaning.** "Represent philosophical plurality without imposing a modern
Hindu-versus-Buddhist binary or reducing rival positions to caricature"; "Give rival
philosophical positions their strongest intelligible form"; Buddhist commitment is
"earned through inquiry… rather than caricatured victory" (README; 10A
non-negotiables #11/#12; `05B`).

**Gameplay expression.** Philosophical encounters (Sequence 09) are **not** answered
by picking the "correct" school for points. The player *reconstructs each position
in its strongest form* and leaves "with sharper questions" (10A Vanji outcome). No
school has a win-state; the meter that would rank them does not exist.

**Narrative expression.** Manimekalai's Buddhist practice is reached through method
and material stakes (feeding, causation), never by defeating opponents.

**Failure mode.** A dialogue tree where one faith lights up green → propaganda
(`GRT-08` flattening; explicit owner non-goal).

**Acceptance test.** No encounter has a scored "correct doctrine"; each rival voice
has at least one line the player can *agree is true within its frame*; the game can
be completed without any school being labelled false.

---

## Cross-cutting constraint — Tamil cultural specificity without false certainty

Not a separate pillar but a filter over all six (README `[CAUTION]` policy;
`RISK-002`/`003`/`005`; `12`). The game states uncertainty where the archive does:
Puhar is "a sophisticated maritime culture" without "one exact harbour, hull or
urban reconstruction proven" (`AD-0005`). Art, terminology and typography follow the
evidence labels, and the glossary marks `[INTERPRETATION]` openly (`11`, `12`).

**Acceptance test.** Every environment art brief and terminology string in the build
carries an evidence label; nothing presents `[INTERPRETATION]` as `[HISTORY]`.
