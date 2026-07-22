# Venpa Stage 2 — Aadhirai Linked Explicit Decision Record

## Status

**Decision scope:** `VENPA-USE-007` and `VENPA-USE-008`  
**Decision date:** 2026-07-21  
**Final owner decision:** `APPROVE — USE THE AADHIRAI MOVEMENT FROM THE VENPA`  
**Master statuses:** `APPROVED`  
**Screenplay text changed:** Yes — English and Tamil Sequence 04  
**TRACE records changed:** No  
**Scene count changed:** No  
**Approved insertions:** 2  
**Post-implementation validation:** Pending

This record began as a decision-preparation memo that selected a source-conservative prepared-food path while holding the specific curry-and-ghee imagery for later verification. The project owner subsequently directed that the stronger Aadhirai movement from Bharathidasan's *Manimekalai Venpa* be used. That final instruction authorises the Venpa-forward culinary detail and supersedes the earlier no-edit restriction for these two records only.

## Final linked decision

The two records move together as one causal unit:

- `VENPA-USE-007` establishes Aadhirai's material household offering;
- `VENPA-USE-008` establishes the discovery of continuing abundance after portions are served.

The approved order is:

```text
household labour -> voluntary giving -> first portions -> continuing abundance -> collective logistics
```

## VENPA-USE-007 — Approved Scene #31 implementation

### English action

```text
Aadhirai brings a household pot of cooked rice and curry to the threshold.

She serves with both hands until the Amudhasurabhi is full. A line of ghee catches the light across the rice.
```

### Tamil action

```text
ஆதிரை சமைத்த சோறும் கறியும் நிறைந்த வீட்டுக் கலத்தை வாசலுக்கு கொண்டு வருகிறாள்.

இரு கைகளாலும் பரிமாறி அமுதசுரபியை நிறைக்கிறாள். சோற்றின் மேல் வழியும் பசுநெய் ஒளியைப் பிடிக்கிறது.
```

The existing dialogue about food kept behind one door and crossing doors closed to hunger remains unchanged.

No crowd witnesses the first offering. `VENPA-USE-009` remains rejected.

## VENPA-USE-008 — Approved Scene #32 implementation

### English beat

```text
Manimekalai serves the first portions of Aadhirai's rice and curry.

She looks back into the vessel.

The level has not fallen.
```

### Tamil beat

```text
ஆதிரை இட்ட சோறும் கறியும் முதல் சிலருக்கு மணிமேகலை பரிமாறுகிறாள்.

பாத்திரத்துக்குள் மீண்டும் பார்க்கிறாள்.

உணவின் அளவு குறையவில்லை.
```

The crowd-pressure, water, access, translation, cleaning, child-safety and shared-labour beats remain in place immediately afterward.

## Why the Venpa-forward choice is stronger

1. Aadhirai's labour and generosity create the first visible fullness.
2. The bowl does not appear to manufacture its own moral meaning.
3. Household food becomes public nourishment through a woman's material decision.
4. Manimekalai's service reveals abundance rather than merely displaying a miracle.
5. The sequence moves naturally from food to access and organisation.
6. The existing quiet threshold protects the gift from becoming public tribute.
7. Curry and ghee make the offering embodied, prepared and shareable rather than symbolic grain.

## Source classification

### Primary epic

The checked Chapter 16 movement directly supports:

- Aadhirai receiving Manimekalai;
- placing food into the vessel;
- the vessel becoming full;
- Manimekalai continuing toward public feeding.

### Bharathidasan perspective

The more specific culinary treatment is retained as an identified later-source elaboration. Located headings and language include:

- `ஆதிரை வரவேற்பு`
- `ஆதிரை கறியோடு சோறிட்டாள்`
- `ஆதிரை வாழ்த்து`
- `ஆதிரை இட்ட அமிழ்து`
- `மணிமேகலை எல்லார்க்கும் இட்டாள்`

```text
கலமே நிறையக் கறியொடு சோறிட்டாள்
...
பசுநெய்-ஒழுகக்
கலத்திலிட்டேவிரு கையாலும் சோறு
```

The screenplay and approval records must continue to identify cooked rice, curry and ghee as Bharathidasan-derived specificity rather than silently attributing every detail to Sāttanār.

## Earlier decision-preparation path

Before final owner approval, this record selected the more general wording `prepared household food` and deferred curry-and-ghee specificity pending visual and culinary review. That caution remains part of the audit history, but it no longer governs the approved screenplay wording.

The owner chose the Venpa-forward version because it is dramatically and ethically stronger. The remaining source and terminology checks now function as post-implementation quality gates rather than preconditions for the content choice.

## Implementation provenance

### English Sequence 04

Commit:

`779ebb890cab86eb5b437d30a647975a81306f4d`

### Tamil Sequence 04

Implementation commit:

`4289992d2f0a091f7062acb623bcda1245627d32`

A full-file replacement briefly omitted one unrelated pre-existing Aputhiran action line. Patch review caught the omission, and it was restored in:

`95a2d4cc92ae072c0e8389da9733b26a5055d5a3`

The final patch state contains only the intended Aadhirai revision relative to the earlier Tamil baseline.

### Final approval record

See:

[`venpa-use-007-008-aadhirai-approval.md`](venpa-use-007-008-aadhirai-approval.md)

## Preserved safeguards

The sequence must not become:

- a magical flash before any recipient eats;
- food glamour detached from hunger;
- a public tribute scene at Aadhirai's threshold;
- proof that the vessel eliminates labour or infrastructure;
- a scene in which Manimekalai alone produces the feeding system;
- an excuse to add the deferred spoken welcome unless separately approved.

## Remaining post-implementation gates

1. Run and record regression tests and the full bilingual screenplay validator.
2. Verify the relevant Bharathidasan passage visually against a reliable scan page or lawful printed copy.
3. Compare the culinary wording with the chosen Tamil primary edition.
4. Complete food-history and material-culture review.
5. Review `சோறு`, `கறி`, `பசுநெய்`, household vessels and serving practice for historical and performance register.
6. Test the English and Tamil transition from Scene `#31#` into Scene `#32#` aloud and through blocking.
7. Confirm that the abundance reveal does not weaken crowd pressure or logistics.
8. Confirm English–Tamil semantic parity after validator execution.

## Stage 2 outcome

| ID | Final decision | Implemented path | Screenplay state |
|---|---|---|---|
| `VENPA-USE-007` | `APPROVED` | cooked rice and curry materially fill the vessel; ghee catches the light | Implemented in English and Tamil |
| `VENPA-USE-008` | `APPROVED` | unchanged food level discovered after first portions are served | Implemented in English and Tamil |

Stage 2 is complete at the content-decision and implementation level. Validation, visual-source, culinary and performance gates remain open.
