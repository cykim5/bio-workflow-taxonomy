# Biological Workflow Map

A structural map of what wet labs and life science companies do at the bench, organized so that every workflow has exactly one place.

**[Browse the interactive map](https://cykim5.github.io/bio-workflow-taxonomy/)**

## The rule

**Every workflow is filed under the kind of thing it exists to produce.**

Research field, technique and instrument all overlap, so an ELISA belongs to immunology, cancer biology and bioprocess at the same time. Output does not overlap: a workflow produces purified RNA, or an engineered cell line, or a number, but never two at once. That single rule is what keeps the branches mutually exclusive.

Everything that does overlap becomes a lens instead: research area, function, setting, scale, regulatory regime, unit operation, and material acted on.

## The eight domains

```mermaid
flowchart LR
    ROOT["Biological laboratory work"]
    ROOT --> N1["1. Reagents and materials prepared"]
    ROOT --> N2["2. Specimens acquired, processed and banked"]
    ROOT --> N3["3. Biomolecules isolated and purified"]
    ROOT --> N4["4. Biomolecules and constructs built"]
    ROOT --> N5["5. Living systems cultured and maintained"]
    ROOT --> N6["6. Living systems engineered"]
    ROOT --> N7["7. Specimens prepared for analysis"]
    ROOT --> N8["8. Measurements and characterization"]
```

They run in order from inputs to answers. 8 domains, 264 workflows, up to 4 levels deep.

| Domain | Output |
|---|---|
| 1. Reagents and materials prepared | A ready-to-use input for other work |
| 2. Specimens acquired, processed and banked | A specimen ready to use or ready to store |
| 3. Biomolecules isolated and purified | A purified, naturally occurring biomolecule or particle |
| 4. Biomolecules and constructs built | A biomolecule that did not exist before this work |
| 5. Living systems cultured and maintained | A living, propagated biological system |
| 6. Living systems engineered | A system whose genome or composition has been changed |
| 7. Specimens prepared for analysis | A specimen in the exact form an instrument requires |
| 8. Measurements and characterization | Data about a sample, system or organism |

A fuller diagram covering the second level is in [diagram.mmd](diagram.mmd).

## Where the hard cases land

The three techniques that break most taxonomies each land cleanly, because the rule asks what the work produces rather than what it uses.

| Technique | Where it goes | Why |
|---|---|---|
| PCR to make DNA for a later step | 4.1.1.1 Fragment generation | Output is DNA |
| qPCR to produce a number | 8.2.1 qPCR and RT-qPCR | Output is data |
| Gel run to recover a band | 3.1.5 Cleanup, size selection and gel recovery | Output is DNA |
| Gel run to report a size | 8.4.1 Agarose and polyacrylamide gel analysis | Output is data |
| Centrifuging, mixing, incubating | Not in the tree | Single operations are steps, not workflows |

## Files

| File | What it is |
|---|---|
| [`TAXONOMY.md`](TAXONOMY.md) | Source of truth: the full tree, the lenses, and a critical review |
| [`lenses.yaml`](lenses.yaml) | Research area and material tags, keyed by node id |
| [`build.py`](build.py) | Generates `docs/taxonomy.json` and `diagram.mmd` from the two files above |
| [`docs/`](docs/) | The interactive map, published with GitHub Pages |
| [`docs/taxonomy.json`](docs/taxonomy.json) | The tree as data, for loading into other tools |

Rebuild after editing the tree or the tags:

```bash
python3 build.py
```

Preview the page locally:

```bash
python3 -m http.server --directory docs 8000
```

## Status and limitations

This is a synthesis, not a published standard. It draws on how formal ontologies (OBI, EFO, BAO, MeSH), protocol publishers, automation vendors, university departments and core facilities, and industry R&D organizations structure lab work, but no existing taxonomy covers wet-lab workflows as a whole, so there is nothing to validate it against directly.

Known weaknesses, stated plainly:

- **Domain 8 is overloaded.** Twelve children spanning a plate reader and a cryo-EM session. "Data" is a coarser output category than "purified protein."
- **Domains 7 and 8 have a soft seam.** Staining a slide and imaging it feel like one activity to the person doing them.
- **Depth is uneven.** Nucleic acid work reaches four levels because that is where the most documented protocols exist, not because it matters more. Carbohydrate work, biosensing and therapeutic cell engineering are thin.
- **The tie-break rules are reasoned, not cited.** Only the top-level output split has ontology precedent.

**The test that would settle it:** assign several hundred real published protocols to leaves. Three numbers decide whether the structure works, namely the share landing in exactly one leaf, the share fitting two or more (rule violations), and the share fitting none (missing branches). Agreement between two independent people assigning the same protocols tests whether the rule is teachable, which is the real bar for a taxonomy meant for others to use.

## Scope

Wet-lab work only, meaning anything performed on physical biological material.

Deliberately excluded: bioinformatics and computational biology, biostatistics, modeling and simulation, structure prediction, image analysis, cheminformatics, laboratory information systems, database curation, and clinical patient-facing procedures. A complete picture of a modern lab would add these as a parallel tree rather than as branches inside this one.
