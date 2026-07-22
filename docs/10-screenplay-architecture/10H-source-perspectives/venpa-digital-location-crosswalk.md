# Venpa Digital Location Crosswalk

## Status

**Scope:** the thirteen `PROPOSED` records in the Venpa master decision register  
**Source witness:** Bharathidasan, *Manimekalai Venpa*, Pari Nilayam, 1990  
**Digital witnesses checked:** Tamil Virtual Academy paginated text, Project Madurai UTF-8 e-text and Project Madurai PDF text layer  
**Screenplay text changed:** No  
**TRACE records changed:** No

This crosswalk advances the evidence packet from heading-only retrieval to stable digital location references. It does **not** complete the visual scan-page gate. The Project Madurai PDF text layer was searchable, but page-image screenshot retrieval was unavailable during this pass. Therefore:

- Tamil Virtual Academy `pno` values are recorded as stable digital page locators;
- Project Madurai PDF locations are recorded only where the text layer produced a clear page match;
- no locator is described as a visually inspected printed page;
- no close quotation is authorised for screenplay use by this document.

## Locator codes

| Code | Meaning |
|---|---|
| `TVA` | Tamil Virtual Academy paginated text, identified by `bookid=146&pno=...` |
| `PM-HTML` | Project Madurai UTF-8 e-text heading or stanza anchor |
| `PM-PDF` | Project Madurai PDF text-layer page index; visual inspection still pending |
| `V-PENDING` | Page image or lawful printed-copy comparison remains required |

## Proposed-record crosswalk

| ID | Source movement | Stable digital locator | Project Madurai PDF text locator | Verification result |
|---|---|---|---|---|
| `VENPA-USE-001` | Madhavi grief and renunciation; Sudhamathi reports to Madhavi | `TVA pno=186`: early Madhavi movement and `சுதமதி மாதவிக்கு!`; `PM-HTML`: `அறவண அடிகளிடம் மாதவி சொன்னாளாம்`, `அறவணர் சொல்லியது`, `சுதமதி மாதவிக்கு!` | Madhavi passage clearly located around `P4–P5`; Sudhamathi-report PDF page remains uncertain because of OCR ordering | `TVA + PM-HTML VERIFIED`; `V-PENDING` |
| `VENPA-USE-004` | Sudhamathi challenges the prince and gives her history | `TVA pno=186`: `மணிமேகலை மனத்தை மாற்ற நீ யார்?`, stanzas `(185)`; `சுதமதி வரலாறு`, stanzas `(190–195)` | Clear heading match not reliable in PDF text layer | `TVA + PM-HTML VERIFIED`; `V-PENDING` |
| `VENPA-USE-007` | Aadhirai welcomes Manimekalai and fills the vessel with cooked food | `TVA pno=190`: `ஆதிரை வரவேற்பு`, `ஆதிரை கறியோடு சோறிட்டாள்`, stanzas `(40–45)` | `PM-PDF P28` contains the welcome and cooked-rice/curry movement | `TVA + PM-HTML + PM-PDF TEXT VERIFIED`; `V-PENDING` |
| `VENPA-USE-008` | Aadhirai's offering precedes public feeding and continuing abundance | `TVA pno=190`: `ஆதிரை இட்ட அமிழ்து`, `மணிமேகலை எல்லார்க்கும் இட்டாள்`, stanzas `(55–60)` | `PM-PDF P28` contains both headings and the continuing-fullness movement | `TVA + PM-HTML + PM-PDF TEXT VERIFIED`; `V-PENDING` |
| `VENPA-USE-011` | Kayasandihai names hunger and recovers through feeding | `TVA pno=190`: `காயசண்டிகை சொன்னாள்` through `காயசண்டிகை நோயகன்றது`, stanzas `(60–75)` | `PM-PDF P29` contains the hunger, repeated feeding and recovery movement | `TVA + PM-HTML + PM-PDF TEXT VERIFIED`; `V-PENDING` |
| `VENPA-USE-016` | Aputhiran's ethical fame, resistance and service | `TVA pno=190`: `ஆபுத்திரன் புகழ் விண்ணினும் பெரிது`, `கொலை வேள்வியை எதிர்த்தவன் ஆபுத்திரன்`, `எத்தீமைக்கும் ஆபுத்திரன் இளைத்து விடவில்லை`, stanzas `(1–15)` | `PM-PDF P26–P27` contains the ethical-resistance movement; the exact heavenly-reward refusal remains to be isolated | `MOVEMENT VERIFIED`; exact refusal `V-PENDING` |
| `VENPA-USE-017` | Giving becomes collective rather than dependent on one heroic giver | `PM-HTML`: `அமுதசுரபியைக் கண்டு பிச்சையிட்டவர்கள்...`, `ஈதல் அமுத சுரபிக்கே ஈதல்`; the Tamil Virtual Academy search result places this movement after the Udayakumaran-grief section in the same continuous text | PDF text-layer retrieval for the exact collective-giving lines was unstable and appears out of sequence | `PM-HTML VERIFIED`; `TVA/PDF exact locator V-PENDING` |
| `VENPA-USE-021` | Prison transformation linked to education and public welfare | `TVA pno=190`: `முறையிருக்கும் போது சிறைஎதற்கு வேந்தே?`, `கட்டாயக்கல்வி தேவை`, `வேந்தன் வேலை தொடங்கினான்`, stanzas `(240–260)` | PDF text layer places prison-transformation material in the middle movement but is not reliable enough for a single precise page claim | `TVA + PM-HTML VERIFIED`; `V-PENDING` |
| `VENPA-USE-022` | Public protest and prison-worker witness during confinement | `TVA pno=195`: `அரசுக்கு எதிர்ப்பு`, `சிறையிலும் மக்கள் சீற்றம்`, `மணிமேகலைக்குச் சாப்பாடு வந்தது`, `சிறைப் பணியாளர் கூற்று`, `தெருவார் தருவார்`, stanzas `(25–65)` | `PM-PDF P52–P54` contains the protest, food and worker-report movement | `TVA + PM-HTML + PM-PDF TEXT VERIFIED`; `V-PENDING` |
| `VENPA-USE-023` | Orders, workers and reports carry harm and accountability | `TVA pno=195`: `சிறைப் பணியாளர் கூற்று`, `சிறை பணியாளரைச் சீர்த்தி கேட்டாள்`, and the following queen/prison movement | `PM-PDF P54` contains the worker statement and street-supplied food; later queen material continues beyond it | `TVA + PM-HTML + PARTIAL PM-PDF TEXT VERIFIED`; `V-PENDING` |
| `VENPA-USE-026` | Udayakumaran's knowledge, warning, fixation and repeated approach | `TVA pno=186`: `உதயகுமரன் மணிமேகலை பற்றிக் கேள்விப்படுகிறான்`, `மணிமேகலையை என்தேரில் ஏற்றி வந்துவிடுவேன்`, `உதயனின் கண்ணுக்கு வழியெல்லாம் மணிமேகலை`, `காமம் ஒரு தீ !`, `மணிமேகலை மனத்தை மாற்ற நீ யார்?`; later continuation at `TVA pno=190` | PDF text layer is too disordered for a trustworthy single-page chain | `TVA + PM-HTML VERIFIED`; `V-PENDING` |
| `VENPA-USE-027` | Manimekalai grieves Udayakumaran and then questions that grief | Tamil Virtual Academy indexed text: `இறந்த உதயனுக்கு அழுதாள் மணிமேகலை`, stanza `(350)`, followed by `அறம் பயிலும் நான் இறந்தானுக்கு அழுவதா?`; `PM-HTML` has the same consecutive headings | Project Madurai PDF text layer did not return a clean heading-page result for this exact pair | `TVA INDEX + PM-HTML VERIFIED`; direct page-image locator `V-PENDING` |
| `VENPA-USE-028` | Royal grief and the later queen-accountability movement | `TVA pno=195`: begins with the king's grief after the prince's death and continues through the queen's confinement, deprivation, recognition and apology movement | `PM-PDF P52` begins the imprisonment order; later queen material continues through approximately `P56–P60` | `TVA + PM-HTML + PARTIAL PM-PDF TEXT VERIFIED`; `V-PENDING` |

## High-confidence source findings

### Aadhirai sequence

Tamil Virtual Academy `pno=190` establishes a precise order:

1. Aadhirai welcomes Manimekalai.
2. She fills the vessel with cooked rice and curry.
3. Ghee is explicitly evoked.
4. The town sees or hears of the offering.
5. Manimekalai serves everyone.
6. The vessel remains full.

This materially supports reviewing `VENPA-USE-007` and `VENPA-USE-008` as one linked causal batch, while still requiring primary-epic and visual-page review.

### Sudhamathi and Udayakumaran

Tamil Virtual Academy `pno=186` confirms that Udayakumaran's movement includes prior information, declared intent, pervasive fixation, a warning that desire is destructive, Sudhamathi's direct challenge to his authority and her own history. This supports the hearing-timeline concept in `VENPA-USE-026` without determining its final screenplay wording.

### Prison and public witness

Tamil Virtual Academy `pno=195` places public opposition, Manimekalai's address, formal confinement, public anger, food delivery, prison-worker testimony and street support in one continuous movement. This strengthens the evidence basis for `VENPA-USE-022` and the worker/accountability component of `VENPA-USE-023`.

## Remaining evidence work

1. Visually inspect and record the actual scan or lawful printed-copy page for every proposed record.
2. Record the printed page number separately from Tamil Virtual Academy `pno` and Project Madurai PDF viewer index.
3. Capture a private verification note or image reference without committing copyrighted scan pages publicly.
4. Isolate the exact Aputhiran reward-refusal stanza for `VENPA-USE-016`.
5. Resolve a stable Tamil Virtual Academy page locator for the collective-giving movement used by `VENPA-USE-017`.
6. Resolve the direct Tamil Virtual Academy page containing the Udayakumaran death-and-grief pair used by `VENPA-USE-027`.
7. Complete primary-epic counterpart verification before any approval decision.
8. Do not change a `VENPA-USE` status on the strength of digital location alone.

## Gate rule

This crosswalk satisfies retrieval and digital-location preparation only. It does not satisfy the visual page, primary-source compatibility, terminology, spoken-Tamil, bilingual validation or explicit approval gates. No screenplay insertion is authorised.
