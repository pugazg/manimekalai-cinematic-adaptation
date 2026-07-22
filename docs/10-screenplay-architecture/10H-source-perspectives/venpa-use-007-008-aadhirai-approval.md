# VENPA-USE-007 and VENPA-USE-008 — Aadhirai Approval and Implementation Record

## Decision

**Records:** `VENPA-USE-007`, `VENPA-USE-008`  
**Decision:** `APPROVED`  
**Implementation state:** `IMPLEMENTED — VALIDATION PENDING`  
**Decision authority:** Project owner instruction on 2026-07-21: use the Aadhirai movement from Bharathidasan's *Manimekalai Venpa* because it makes the sequence stronger.  
**Screenplay files changed:** English and Tamil Sequence 04  
**Scene numbers changed:** No  
**TRACE records changed:** No

## Approved adaptation

The two records are approved as one causal unit.

### VENPA-USE-007 — First offering

Scene `#31#` now uses the Venpa's stronger material order:

1. Aadhirai brings cooked rice and curry prepared within her household.
2. She serves with both hands until the Amudhasurabhi is full.
3. Ghee catches the light across the rice.
4. The existing threshold dialogue remains unchanged.
5. No crowd witnesses the first offering.

This replaces the earlier symbolic handful of uncooked grain.

### VENPA-USE-008 — First visible abundance

Scene `#32#` now establishes inexhaustibility only after service begins:

1. Manimekalai serves the first portions of Aadhirai's rice and curry.
2. She looks back into the vessel.
3. The food level has not fallen.
4. The crowd then grows and the existing water, access, translation, cleaning and safety problems emerge.

This preserves the governing order:

> Aadhirai gives; Manimekalai shares; abundance continues; organisation becomes necessary.

## Source basis

### Bharathidasan perspective

The located Venpa movement includes:

- `ஆதிரை வரவேற்பு`
- `ஆதிரை கறியோடு சோறிட்டாள்`
- `ஆதிரை வாழ்த்து`
- `ஆதிரை இட்ட அமிழ்து`
- `மணிமேகலை எல்லார்க்கும் இட்டாள்`

Distinctive e-text language includes:

```text
கலமே நிறையக் கறியொடு சோறிட்டாள்
...
பசுநெய்-ஒழுகக்
கலத்திலிட்டேவிரு கையாலும் சோறு
```

### Primary-epic compatibility

The checked primary Chapter 16 movement directly supports:

- Aadhirai receiving Manimekalai;
- Aadhirai placing food in the vessel;
- the vessel becoming full;
- Manimekalai continuing into public feeding.

The cooked rice, curry and ghee detail is retained as a clearly identified Bharathidasan elaboration rather than silently attributed to Sāttanār's primary text.

## Implementation

### English

File:

`../10E-screenplay-draft/SEQ-04_the_bowl_and_the_hungry_city.fountain`

Commit:

`779ebb890cab86eb5b437d30a647975a81306f4d`

### Tamil

File:

`../10F-bilingual-screenplay/TA/SEQ-04_பாத்திரமும்_பசியுற்ற_நகரமும்.fountain`

Implementation commit:

`4289992d2f0a091f7062acb623bcda1245627d32`

Integrity correction restoring an unrelated pre-existing Aputhiran action line:

`95a2d4cc92ae072c0e8389da9733b26a5055d5a3`

The commit audit confirms that the final Tamil difference contains the approved Aadhirai changes and retains the rescued-cow action.

## Preserved safeguards

- The offering remains private and non-performative; `VENPA-USE-009` remains rejected.
- The existing door and trust dialogue remains intact.
- Miracle follows household labour rather than replacing it.
- Public feeding still develops into logistics, access and shared work.
- Aadhirai initiates the mission materially without displacing Manimekalai's continuing responsibility.
- `VENPA-USE-010`, the optional spoken welcome, remains deferred.
- English and Tamil retain identical scene and TRACE architecture.

## Open post-implementation gates

Approval authorises the content choice, but the following quality gates remain open:

1. run the regression suite and full bilingual screenplay validator;
2. complete spoken-Tamil review of `சோறும் கறியும்`, `பசுநெய்` and the action rhythm;
3. complete culinary and historical-register review without modernly narrowing `கறி`;
4. verify the Bharathidasan passage visually against a reliable scan page or lawful printed copy;
5. confirm that the final English and Tamil performance durations remain compatible.

The Aadhirai pair is approved and present in the screenplay. It must not be removed or materially altered without a new recorded decision.
