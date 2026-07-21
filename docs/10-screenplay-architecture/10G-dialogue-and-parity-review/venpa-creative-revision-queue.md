# Manimekalai Venpa — Creative Revision Queue

## Purpose

This queue converts the *Manimekalai Venpa* perspective audit into a controlled screenplay-review process. It does not modify the existing 72-scene bilingual screenplay. It identifies what should be reviewed, what evidence is required, and what may eventually be proposed after the bilingual parity gate passes.

## Current gate

- Existing English screenplay: structurally frozen.
- Existing Tamil screenplay: structurally frozen.
- Validator integrity: restored and verified by read-back.
- Regression tests: committed.
- GitHub Actions runtime result: not yet confirmed.
- Creative insertions: prohibited until parity is confirmed.

## Review principles

1. Treat *Manimekalai Venpa* as `PERSPECTIVE: VENPA-BHARATHIDASAN`.
2. Do not use it to overwrite primary-source traces.
3. Do not assume that a Venpa emphasis is absent merely because code search does not locate a name.
4. Review English and Tamil versions together.
5. Record every accepted borrowing as `VENPA-USE-###`.
6. Preserve character agency, chronology, doctrinal distinctions, and source provenance.
7. Prefer strengthening existing scenes before adding new scenes.
8. Any new scene must preserve the approved 72-scene architecture unless a separately approved structural revision is opened.

## Priority 1 — Madhavi

**Review target:** opening movement, especially Sequences 01–02.

**Question:** Does Madhavi function only as an exposition carrier, or does the screenplay show grief, remorse, maternal responsibility, and the generational consequences of Kovalan's death?

**Possible revision types:**

- deepen an existing silent or dialogue beat;
- connect inherited grief to Manimekalai's choice;
- clarify that Madhavi's decision is morally difficult rather than merely functional;
- preserve the distinction between Madhavi's interpretation and Manimekalai's independent agency.

**Required evidence before change:** exact English and Tamil scene text, current trace IDs, primary-source support, and the corresponding Venpa heading or verse location.

## Priority 2 — Sudhamathi

**Review target:** garden, pursuit, crystal-hall, and immediate aftermath material.

**Question:** Does Sudhamathi act as protector, strategist, interpreter, witness, and companion, or is she reduced to exposition?

**Possible revision types:**

- give her a consequential decision;
- preserve her personal history;
- sharpen her reading of danger;
- ensure her protection does not remove Manimekalai's agency;
- use her as a continuity character across locations.

**Risk:** increasing Sudhamathi's competence must not turn Manimekalai into a passive character.

## Priority 3 — Aadhirai

**Review target:** the first-offering / Amudhasurabhi activation movement.

**Question:** Is the first offering clearly dramatized as ordinary human generosity making extraordinary power socially meaningful?

**Possible revision types:**

- strengthen an existing Aadhirai beat;
- clarify that the bowl does not replace the giver;
- use the offering as the transition from miracle to public service;
- consider a recurring visual or remembered line later in the screenplay.

**Decision preference:** strengthen before adding. A new scene is justified only if no existing scene can carry this function.

## Priority 4 — Kayasandikai and Kanchanan

**Review target:** hunger relief, disguise, mistaken identity, pursuit, and killing.

**Questions:**

- Does Kayasandikai have an independent suffering-and-recovery arc?
- Is she used only as a disguise mechanism?
- Is it clear what Kanchanan sees, assumes, and actually knows?
- Does the screenplay avoid assigning moral responsibility to Manimekalai for violence produced by others' jealousy or assumptions?

**Possible revision types:**

- separate hunger recovery from disguise mechanics;
- clarify visual information and mistaken inference;
- preserve suspense while reducing audience confusion;
- strengthen causal accountability.

## Priority 5 — Aputhiran

**Review target:** vessel origin, hunger ethics, refusal of reward, and later thematic echoes.

**Question:** Does Aputhiran provide the ethical foundation of Amudhasurabhi, or does his material function only as backstory?

**Possible revision types:**

- strengthen the refusal of personal or celestial reward;
- connect his service to Manimekalai's later institutional work;
- establish hunger as a social failure rather than an isolated misfortune;
- carry an Aputhiran image or phrase into the final shared-service system.

**Standalone option:** retain enough independent material to support a future Aputhiran feature without requiring the current screenplay to absorb all of it.

## Priority 6 — Prison, education, and institutional reform

**Review target:** prison-feeding, ruler confrontation, conversion of punitive space, and final social-system material.

**Questions:**

- Does the screenplay move from individual feeding to structural reform?
- Is prison transformation shown as a consequence of ethical argument rather than a decorative miracle?
- Does the ruler understand that failed governance can produce hunger, crime, and punishment?
- Does service continue beyond Manimekalai as an individual?

**Possible revision types:**

- clarify cause and effect;
- strengthen public-policy consequences;
- show education, shelter, food, and dignity as connected systems;
- reinforce the final transfer from hero-centred miracle to shared civic responsibility.

## Priority 7 — Udayakumaran

**Review target:** pursuit, opportunities to understand refusal, emotional complexity, and death.

**Question:** Is he tragic and accountable at the same time?

**Possible revision types:**

- preserve emotional complexity;
- make Manimekalai's refusal unmistakable;
- show repeated failures to accept autonomy;
- avoid romanticising persistence;
- ensure death results from a clear causal chain rather than narrative punishment alone.

## Review order

1. Confirm bilingual parity gate.
2. Read English and Tamil Sequence 01 together; audit Madhavi.
3. Continue through Sequence 02 if Madhavi's arc crosses the boundary.
4. Audit Sudhamathi in the garden / pursuit block.
5. Audit Aadhirai and the first offering.
6. Audit Kayasandikai–Kanchanan causality.
7. Audit Aputhiran's ethical continuity.
8. Audit prison-to-education reform.
9. Audit Udayakumaran across all relevant appearances.
10. Produce a revision proposal without changing screenplay text.
11. Approve or reject each `VENPA-USE-###` item.
12. Modify English and Tamil together, then rerun parity validation.

## Proposed use-record template

```text
VENPA-USE-###
Perspective: VENPA-BHARATHIDASAN
Source location:
Destination screenplay:
Destination sequence:
Destination scene:
Element:
Use type: DIRECT | ADAPTED | COMBINED | THEMATIC
Primary-source compatibility:
Effect on chronology:
Effect on motivation:
Effect on doctrine:
Effect on character agency:
English change proposed:
Tamil change proposed:
Status: PROPOSED | APPROVED | REJECTED | DEFERRED
Reviewer notes:
```

## Freeze rule

Until GitHub Actions or an equivalent reproducible execution confirms the bilingual parity validator and the full 72-scene corpus, this queue may be expanded, but no screenplay text or trace record may be changed.