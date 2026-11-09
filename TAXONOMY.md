# A MECE map of biological laboratory work

A structural map of what wet labs and life science companies actually do at the bench, independent of whether any of it can be automated.

## The one rule

**Every workflow is filed under the kind of thing it exists to produce.**

Not the field it serves, not the technique it uses, not the instrument it runs on. Those all overlap, so they become lenses over the tree rather than branches in it. Output does not overlap: a workflow produces purified RNA, or an engineered cell line, or a number, but not two of those at once.

This rule is borrowed from the Ontology for Biomedical Investigations, which divides all planned laboratory processes by whether they change a material or produce data.

### Four tie-breaks

1. **Generic beats specialized.** If the output is the same molecule a hundred labs make, it lives in the generic branch, however specialized the context. Branch 7 and the applied lenses hold only outputs that exist nowhere else.
2. **One technique, two outputs, two homes.** PCR that makes DNA for a later step is construction (4.1). PCR run to produce a number is measurement (8.2). A gel that recovers a band is purification (3.1.5). A gel that reports a size is measurement (8.4.1).
3. **Single operations are not workflows.** Centrifuging, mixing, incubating, sealing and reading a plate are steps. They live in the unit operation lens, never as branches.
4. **Scale and setting are lenses, not branches.** A 2,000 L bioreactor and a 5 mL culture produce the same kind of output. Manufacturing, clinical, environmental and forensic work are tagged, not separately rooted, except where the output genuinely exists only there.

---

## The tree

```
Biological laboratory work
│
├── 1. REAGENTS AND MATERIALS PREPARED
│   │   output: a ready-to-use input for other work
│   │
│   ├── 1.1 Solutions and buffers
│   │   ├── 1.1.1 Stock preparation (weighing, dissolving, sterilization)
│   │   ├── 1.1.2 Working dilution and aliquoting
│   │   ├── 1.1.3 pH, ionic strength and osmolality adjustment
│   │   └── 1.1.4 Solution QC and shelf-life management
│   │
│   ├── 1.2 Culture media and growth substrates
│   │   ├── 1.2.1 Microbial media (broth, agar, selective, differential)
│   │   ├── 1.2.2 Mammalian and insect media with supplements and sera
│   │   ├── 1.2.3 Plant tissue culture media and hormone series
│   │   ├── 1.2.4 Matrices, scaffolds and coatings for 3D culture
│   │   └── 1.2.5 Organism diets and bedding substrates
│   │
│   ├── 1.3 Reaction mixes and assay-ready plates
│   │   ├── 1.3.1 Enzyme and master mix assembly
│   │   ├── 1.3.2 Primer, probe and oligo working plates
│   │   └── 1.3.3 Assay plate stamping and reagent pre-loading
│   │
│   ├── 1.4 Compound and library management
│   │   ├── 1.4.1 Solubilization and stock plating
│   │   ├── 1.4.2 Dose and dilution series construction
│   │   ├── 1.4.3 Library replication and cherry picking
│   │   └── 1.4.4 Storage, freeze-thaw tracking and integrity checks
│   │
│   ├── 1.5 Chemically synthesized reagents
│   │   ├── 1.5.1 Oligonucleotide synthesis and purification
│   │   ├── 1.5.2 Peptide synthesis and purification
│   │   ├── 1.5.3 Labeled and modified reagents (fluorophore, biotin, isotope)
│   │   └── 1.5.4 Radiolabeled reagent preparation
│   │
│   └── 1.6 Labware, containment and consumable preparation
│       ├── 1.6.1 Washing, autoclaving and depyrogenation
│       ├── 1.6.2 Sterile field and aseptic workspace setup
│       └── 1.6.3 Containment, decontamination and waste handling
│
├── 2. SPECIMENS ACQUIRED, PROCESSED AND BANKED
│   │   output: a biological specimen that is ready to use or ready to store
│   │
│   ├── 2.1 Acquisition and accessioning
│   │   ├── 2.1.1 Human subject and clinical specimen collection
│   │   ├── 2.1.2 Animal specimen collection
│   │   ├── 2.1.3 Plant, soil and agricultural sampling
│   │   ├── 2.1.4 Environmental and field sampling (water, air, sediment, swabs)
│   │   ├── 2.1.5 Microbial and clinical isolate recovery
│   │   └── 2.1.6 Labeling, chain of custody and consent documentation
│   │
│   ├── 2.2 Primary processing
│   │   ├── 2.2.1 Blood and body fluid fractionation (plasma, serum, PBMC, CSF)
│   │   ├── 2.2.2 Solid tissue dissection, grossing and trimming
│   │   ├── 2.2.3 Tissue dissociation to cells or nuclei
│   │   ├── 2.2.4 Cell lysis and homogenization
│   │   └── 2.2.5 Field concentration and filtration of dilute samples
│   │
│   ├── 2.3 Stabilization and preservation
│   │   ├── 2.3.1 Chemical fixation and preservative addition
│   │   ├── 2.3.2 Snap freezing and cryopreservation
│   │   └── 2.3.3 Drying, lyophilization and card-based storage
│   │
│   ├── 2.4 Formatting and distribution
│   │   ├── 2.4.1 Aliquoting and tube-to-plate transfer
│   │   ├── 2.4.2 Plate reformatting and consolidation
│   │   └── 2.4.3 Input normalization by concentration or volume
│   │
│   └── 2.5 Biobanking and inventory
│       ├── 2.5.1 Controlled-rate freezing and vapor-phase storage
│       ├── 2.5.2 Inventory systems, barcoding and location tracking
│       ├── 2.5.3 Retrieval, thaw and re-banking
│       └── 2.5.4 Specimen integrity QC gates
│
├── 3. BIOMOLECULES ISOLATED AND PURIFIED
│   │   output: a purified, naturally occurring biomolecule or particle
│   │
│   ├── 3.1 Nucleic acid isolation
│   │   ├── 3.1.1 Genomic and total DNA
│   │   ├── 3.1.2 RNA (total, mRNA, small RNA, nascent)
│   │   ├── 3.1.3 Plasmid and episomal DNA
│   │   ├── 3.1.4 Low-input and cell-free (cfDNA, ctDNA, single-cell, ancient, eDNA)
│   │   ├── 3.1.5 Cleanup, size selection and gel recovery
│   │   └── 3.1.6 Elution, concentration and buffer conditioning
│   │
│   ├── 3.2 Protein isolation and purification
│   │   ├── 3.2.1 Extraction, clarification and solubilization
│   │   ├── 3.2.2 Affinity capture (tag, Protein A, custom ligand)
│   │   ├── 3.2.3 Chromatographic separation (ion exchange, hydrophobic, size exclusion)
│   │   ├── 3.2.4 Precipitation and phase separation
│   │   ├── 3.2.5 Buffer exchange, concentration and polishing
│   │   └── 3.2.6 Immunoprecipitation and interaction pulldown
│   │
│   ├── 3.3 Lipid, metabolite and small-molecule extraction
│   │   ├── 3.3.1 Quenching and extraction
│   │   ├── 3.3.2 Liquid-liquid and solid-phase cleanup
│   │   └── 3.3.3 Fractionation and class enrichment
│   │
│   ├── 3.4 Carbohydrate, glycan and other biopolymer isolation
│   │
│   └── 3.5 Complexes, organelles and particles
│       ├── 3.5.1 Subcellular fractionation (nuclei, mitochondria, membranes)
│       ├── 3.5.2 Chromatin, ribosome and ribonucleoprotein isolation
│       ├── 3.5.3 Extracellular vesicle isolation
│       └── 3.5.4 Virus and virus-like particle purification
│
├── 4. BIOMOLECULES AND CONSTRUCTS BUILT
│   │   output: a biomolecule that did not exist before this work
│   │
│   ├── 4.1 Nucleic acid construction
│   │   ├── 4.1.1 Fragment generation
│   │   │   ├── 4.1.1.1 PCR amplification (preparative)
│   │   │   ├── 4.1.1.2 Restriction digestion
│   │   │   └── 4.1.1.3 De novo gene and fragment synthesis
│   │   ├── 4.1.2 Assembly (ligation, Gibson, Golden Gate, recombineering, gateway)
│   │   ├── 4.1.3 Propagation in host and construct recovery
│   │   ├── 4.1.4 Verification (restriction mapping, sequencing, gel check)
│   │   └── 4.1.5 Library construction
│   │       ├── 4.1.5.1 Site-directed and saturation mutagenesis
│   │       ├── 4.1.5.2 Pooled guide, shRNA and variant libraries
│   │       └── 4.1.5.3 Barcoded and combinatorial libraries
│   │
│   ├── 4.2 Sequencing library preparation
│   │   ├── 4.2.1 Fragmentation, end repair and adapter ligation
│   │   ├── 4.2.2 Indexing amplification
│   │   ├── 4.2.3 Cleanup and size selection
│   │   ├── 4.2.4 Target enrichment and depletion
│   │   ├── 4.2.5 Library QC, normalization and pooling
│   │   └── 4.2.6 Assay-specific variants
│   │       ├── 4.2.6.1 Whole genome, exome and targeted panels
│   │       ├── 4.2.6.2 RNA-seq and small RNA
│   │       ├── 4.2.6.3 Single-cell and single-nucleus
│   │       ├── 4.2.6.4 Spatial transcriptomics
│   │       ├── 4.2.6.5 Epigenomics (methylation, ATAC, ChIP, Hi-C)
│   │       ├── 4.2.6.6 Long-read and native-molecule
│   │       └── 4.2.6.7 Amplicon and metagenomic
│   │
│   ├── 4.3 Recombinant protein production
│   │   ├── 4.3.1 Expression construct and host selection
│   │   ├── 4.3.2 Expression culture and induction
│   │   ├── 4.3.3 Cell-free expression
│   │   └── 4.3.4 Harvest and capture (purification continues at 3.2)
│   │
│   ├── 4.4 Antibody and binder generation
│   │   ├── 4.4.1 Immunization and hybridoma development
│   │   ├── 4.4.2 Display selection (phage, yeast, ribosome)
│   │   ├── 4.4.3 Single B cell and repertoire cloning
│   │   └── 4.4.4 Recombinant expression and lead characterization
│   │
│   ├── 4.5 Chemical modification and conjugation
│   │   ├── 4.5.1 Labeling and tagging (fluorophore, biotin, isotope)
│   │   ├── 4.5.2 Crosslinking and bioconjugation
│   │   ├── 4.5.3 Antibody-drug and polymer conjugates
│   │   └── 4.5.4 In vitro transcription and RNA modification
│   │
│   └── 4.6 Formulated biological materials
│       ├── 4.6.1 Lipid nanoparticle and liposome formulation
│       ├── 4.6.2 Hydrogels, scaffolds and biomaterials
│       └── 4.6.3 Drug product formulation and stabilization
│
├── 5. LIVING SYSTEMS CULTURED AND MAINTAINED
│   │   output: a living, propagated biological system
│   │
│   ├── 5.1 Microbial culture
│   │   ├── 5.1.1 Isolation, streaking and single-colony recovery
│   │   ├── 5.1.2 Liquid culture, growth monitoring and induction
│   │   ├── 5.1.3 Anaerobic, fastidious and extremophile culture
│   │   ├── 5.1.4 Consortia, microbiome and enrichment culture
│   │   ├── 5.1.5 Bacteriophage propagation
│   │   └── 5.1.6 Strain banking and revival
│   │
│   ├── 5.2 Animal cell culture
│   │   ├── 5.2.1 Thaw, seeding and establishment
│   │   ├── 5.2.2 Feeding, passaging and expansion
│   │   ├── 5.2.3 Suspension and bioreactor-adapted culture
│   │   ├── 5.2.4 Primary cell isolation and culture
│   │   ├── 5.2.5 Co-culture and conditioned media systems
│   │   ├── 5.2.6 Cell banking (master and working banks)
│   │   └── 5.2.7 Identity, mycoplasma and sterility monitoring
│   │
│   ├── 5.3 Stem cell and advanced in vitro models
│   │   ├── 5.3.1 Pluripotent stem cell derivation and maintenance
│   │   ├── 5.3.2 Directed differentiation
│   │   ├── 5.3.3 Organoid establishment, passaging and maturation
│   │   ├── 5.3.4 3D, scaffold and bioprinted culture
│   │   ├── 5.3.5 Organ-on-chip and perfused systems
│   │   └── 5.3.6 Tissue explant and slice culture
│   │
│   ├── 5.4 Plant and algal culture
│   │   ├── 5.4.1 Sterile seed, explant and callus culture
│   │   ├── 5.4.2 Regeneration, rooting and acclimatization
│   │   ├── 5.4.3 Hydroponic and controlled-environment growth
│   │   └── 5.4.4 Greenhouse and field propagation
│   │
│   ├── 5.5 Virus and vector propagation
│   │   ├── 5.5.1 Virus isolation and propagation in host cells
│   │   ├── 5.5.2 Viral vector production (lentivirus, AAV, adenovirus)
│   │   ├── 5.5.3 Harvest, concentration and purification
│   │   └── 5.5.4 High-containment propagation
│   │
│   ├── 5.6 Whole organism husbandry
│   │   ├── 5.6.1 Rodent colony management and breeding
│   │   ├── 5.6.2 Non-mammalian models (zebrafish, Drosophila, C. elegans, Xenopus)
│   │   ├── 5.6.3 Insects, arthropods and vectors
│   │   ├── 5.6.4 Gnotobiotic and germ-free systems
│   │   ├── 5.6.5 Aquatic, avian and large animal systems
│   │   └── 5.6.6 Health monitoring, welfare and colony QC
│   │
│   └── 5.7 Scaled culture and bioprocessing
│       ├── 5.7.1 Inoculum development and seed train
│       ├── 5.7.2 Bioreactor operation, feeding and control
│       ├── 5.7.3 In-process monitoring and sampling
│       ├── 5.7.4 Harvest and clarification
│       ├── 5.7.5 Downstream processing at scale
│       └── 5.7.6 Formulation, fill and finish
│
├── 6. LIVING SYSTEMS ENGINEERED
│   │   output: a biological system whose genome or composition has been changed
│   │
│   ├── 6.1 Microbial engineering
│   │   ├── 6.1.1 Competent cell preparation
│   │   ├── 6.1.2 Transformation, conjugation and electroporation
│   │   ├── 6.1.3 Selection, outgrowth and colony isolation
│   │   ├── 6.1.4 Genome integration, deletion and marker curing
│   │   └── 6.1.5 Clone screening and strain verification
│   │
│   ├── 6.2 Cultured cell engineering
│   │   ├── 6.2.1 Delivery
│   │   │   ├── 6.2.1.1 Chemical and lipid transfection
│   │   │   ├── 6.2.1.2 Electroporation and nucleofection
│   │   │   └── 6.2.1.3 Viral transduction
│   │   ├── 6.2.2 Genome editing (nuclease, base, prime, epigenome)
│   │   ├── 6.2.3 Knockdown and overexpression systems
│   │   ├── 6.2.4 Selection and single-cell cloning
│   │   ├── 6.2.5 Clone screening, genotyping and validation
│   │   └── 6.2.6 Stable line establishment and banking
│   │
│   ├── 6.3 Whole organism engineering
│   │   ├── 6.3.1 Embryo manipulation and microinjection
│   │   ├── 6.3.2 Transgenic and knockout line generation
│   │   ├── 6.3.3 Breeding schemes, crossing and genotyping
│   │   ├── 6.3.4 Plant transformation (Agrobacterium, biolistic, protoplast)
│   │   └── 6.3.5 Line establishment, backcrossing and seed stock
│   │
│   ├── 6.4 Therapeutic cell engineering
│   │   ├── 6.4.1 Primary cell isolation and activation
│   │   ├── 6.4.2 Gene transfer and editing of primary cells
│   │   ├── 6.4.3 Expansion and enrichment
│   │   └── 6.4.4 Formulation, cryopreservation and release preparation
│   │
│   └── 6.5 Synthetic biology system construction
│       ├── 6.5.1 Pathway design, assembly and refactoring
│       ├── 6.5.2 Strain and chassis optimization
│       ├── 6.5.3 Directed evolution and selection rounds
│       └── 6.5.4 Cell-free and minimal system construction
│
├── 7. SPECIMENS PREPARED FOR ANALYSIS
│   │   output: a specimen in the exact physical form an instrument requires
│   │
│   ├── 7.1 Histology and pathology preparation
│   │   ├── 7.1.1 Fixation, decalcification and grossing
│   │   ├── 7.1.2 Processing, embedding and block preparation
│   │   ├── 7.1.3 Sectioning (microtome, cryostat, vibratome)
│   │   ├── 7.1.4 Routine and special staining
│   │   ├── 7.1.5 Immunohistochemistry and multiplex immunofluorescence
│   │   ├── 7.1.6 In situ hybridization on sections
│   │   ├── 7.1.7 Coverslipping and slide finishing
│   │   └── 7.1.8 Tissue microarray construction
│   │
│   ├── 7.2 Light microscopy preparation
│   │   ├── 7.2.1 Fixation and permeabilization
│   │   ├── 7.2.2 Immunofluorescence and dye labeling
│   │   ├── 7.2.3 FISH and in situ detection
│   │   ├── 7.2.4 Clearing and expansion
│   │   ├── 7.2.5 Mounting and slide assembly
│   │   └── 7.2.6 Live-imaging chamber and dish setup
│   │
│   ├── 7.3 Electron microscopy preparation
│   │   ├── 7.3.1 Chemical fixation and en bloc staining
│   │   ├── 7.3.2 High-pressure freezing and freeze substitution
│   │   ├── 7.3.3 Dehydration, infiltration and resin embedding
│   │   ├── 7.3.4 Ultramicrotomy and grid mounting
│   │   ├── 7.3.5 Negative staining and post-section staining
│   │   └── 7.3.6 Immunogold labeling
│   │
│   ├── 7.4 Structural biology preparation
│   │   ├── 7.4.1 Sample homogeneity and stability screening
│   │   ├── 7.4.2 Crystallization screening and optimization
│   │   ├── 7.4.3 Crystal harvesting and cryoprotection
│   │   ├── 7.4.4 Cryo-EM grid preparation and vitrification
│   │   ├── 7.4.5 Grid clipping, screening and storage
│   │   └── 7.4.6 NMR and solution scattering sample preparation
│   │
│   ├── 7.5 Cytometry preparation
│   │   ├── 7.5.1 Single-cell suspension and debris removal
│   │   ├── 7.5.2 Surface and intracellular antibody staining
│   │   ├── 7.5.3 Fixation, permeabilization and viability dyes
│   │   ├── 7.5.4 Compensation and control panels
│   │   └── 7.5.5 Mass cytometry labeling and barcoding
│   │
│   ├── 7.6 Mass spectrometry and chromatography preparation
│   │   ├── 7.6.1 Reduction, alkylation and proteolytic digestion
│   │   ├── 7.6.2 Peptide cleanup, desalting and fractionation
│   │   ├── 7.6.3 Post-translational modification enrichment
│   │   ├── 7.6.4 Isobaric and metabolic labeling
│   │   ├── 7.6.5 Metabolite and lipid extract conditioning
│   │   └── 7.6.6 Derivatization and vial or plate loading
│   │
│   ├── 7.7 Electrophoresis and blotting preparation
│   │   ├── 7.7.1 Sample denaturation and loading preparation
│   │   ├── 7.7.2 Gel casting and assembly
│   │   └── 7.7.3 Transfer, membrane blocking and probing
│   │
│   └── 7.8 Spatial and correlative preparation
│       ├── 7.8.1 Spatial omics slide preparation
│       ├── 7.8.2 Laser capture microdissection
│       └── 7.8.3 Correlative and multimodal specimen preparation
│
└── 8. MEASUREMENTS AND CHARACTERIZATION
    │   output: data about a sample, system or organism
    │
    ├── 8.1 Quantity, quality and integrity assays
    │   ├── 8.1.1 Nucleic acid concentration and integrity
    │   ├── 8.1.2 Protein concentration and purity
    │   ├── 8.1.3 Cell counting, viability and confluency
    │   └── 8.1.4 Contamination testing (endotoxin, mycoplasma, sterility, bioburden)
    │
    ├── 8.2 Amplification-based detection and quantification
    │   ├── 8.2.1 qPCR and RT-qPCR
    │   ├── 8.2.2 Digital PCR
    │   ├── 8.2.3 Isothermal and point-of-care amplification
    │   └── 8.2.4 Melt curve and genotyping assays
    │
    ├── 8.3 Sequencing readout
    │   ├── 8.3.1 Short-read sequencing runs
    │   ├── 8.3.2 Long-read and native-molecule sequencing
    │   ├── 8.3.3 Sanger sequencing and fragment analysis
    │   └── 8.3.4 Run QC and base-level quality assessment
    │
    ├── 8.4 Separation-based analysis
    │   ├── 8.4.1 Agarose and polyacrylamide gel analysis
    │   ├── 8.4.2 Western blot detection
    │   ├── 8.4.3 Capillary and microfluidic electrophoresis
    │   ├── 8.4.4 Liquid and gas chromatography
    │   └── 8.4.5 Mass spectrometry acquisition
    │
    ├── 8.5 Binding, immunoassay and interaction analysis
    │   ├── 8.5.1 ELISA and sandwich immunoassays
    │   ├── 8.5.2 Multiplex bead and array immunoassays
    │   ├── 8.5.3 Lateral flow and rapid tests
    │   ├── 8.5.4 Label-free binding kinetics (SPR, BLI)
    │   └── 8.5.5 Thermodynamic and stability assays (ITC, thermal shift)
    │
    ├── 8.6 Cell-based and functional assays
    │   ├── 8.6.1 Viability, proliferation and cytotoxicity
    │   ├── 8.6.2 Reporter and signaling pathway assays
    │   ├── 8.6.3 Enzyme activity and kinetics
    │   ├── 8.6.4 Migration, invasion and adhesion
    │   ├── 8.6.5 Differentiation, potency and colony-forming assays
    │   ├── 8.6.6 Dose response and drug combination studies
    │   └── 8.6.7 Pooled and arrayed screening campaigns
    │
    ├── 8.7 Cytometry acquisition
    │   ├── 8.7.1 Conventional and spectral flow acquisition
    │   ├── 8.7.2 Cell sorting and single-cell deposition
    │   └── 8.7.3 Mass cytometry acquisition
    │
    ├── 8.8 Imaging acquisition
    │   ├── 8.8.1 Widefield, confocal and super-resolution microscopy
    │   ├── 8.8.2 Live-cell and time-lapse imaging
    │   ├── 8.8.3 High-content and automated imaging
    │   ├── 8.8.4 Electron microscopy and tomography acquisition
    │   ├── 8.8.5 Whole-slide scanning and digital pathology capture
    │   └── 8.8.6 In vivo and preclinical imaging
    │
    ├── 8.9 Structural and biophysical characterization
    │   ├── 8.9.1 X-ray diffraction data collection
    │   ├── 8.9.2 Cryo-EM data collection
    │   ├── 8.9.3 NMR spectroscopy
    │   ├── 8.9.4 Circular dichroism and optical spectroscopy
    │   └── 8.9.5 Light scattering, analytical ultracentrifugation, calorimetry
    │
    ├── 8.10 Electrophysiology and biosensing
    │   ├── 8.10.1 Manual and automated patch clamp
    │   ├── 8.10.2 Multi-electrode array and impedance
    │   └── 8.10.3 Electrochemical and optical biosensors
    │
    ├── 8.11 Microbial and organism phenotyping
    │   ├── 8.11.1 Enumeration and viability plating
    │   ├── 8.11.2 Growth kinetics and fitness assays
    │   ├── 8.11.3 Antimicrobial susceptibility testing
    │   ├── 8.11.4 Identification and biochemical panels
    │   └── 8.11.5 Morphometric and behavioral phenotyping
    │
    └── 8.12 In vivo study execution and readout
        ├── 8.12.1 Dosing and administration
        ├── 8.12.2 In-life sampling and pharmacokinetics
        ├── 8.12.3 Physiological and behavioral monitoring
        ├── 8.12.4 Model induction and challenge studies
        └── 8.12.5 Terminal procedures and tissue collection
```

---

## The lenses

Everything that legitimately overlaps lives here, as tags on workflows, not as branches. A workflow carries any number of tags from each lens.

**Research area.** Biochemistry and structural biology, molecular biology, cell biology, developmental and stem cell biology, genetics and genomics, neuroscience, immunology, microbiology and virology, cancer biology, plant biology, ecology and environmental biology, synthetic biology, pharmacology and toxicology, bioengineering.

**Function.** Basic discovery, target identification and validation, assay development, screening, lead optimization, preclinical and translational, process development, analytical development, quality control, manufacturing, diagnostics, surveillance and monitoring.

**Setting.** Academic research lab, core facility, biotech or pharma R&D, contract research organization, clinical laboratory, manufacturing site, field station.

**Scale.** Single sample, low throughput, plate-based, high throughput, pilot, manufacturing.

**Regulatory regime.** Research use only, GLP, GCLP, CLIA or CAP, GMP, biosafety level 1 to 4, animal welfare oversight.

**Unit operation.** Liquid transfer, mixing, dilution, incubation, thermal cycling, separation (magnetic, centrifugal, chromatographic, electrophoretic), filtration, labware handling, detection, imaging, object manipulation, observation and judgment, documentation.

**Material acted on.** Nucleic acid, protein, lipid, metabolite, carbohydrate, cell, tissue, organism, chemical compound, data.

---

## Review

Written against the two standards requested: a strategy partner's test of whether the structure holds, and a thesis committee's test of whether the claims are defensible.

### What holds

**The splitting rule survives its hardest cases.** PCR, gel electrophoresis and centrifugation are the three techniques that break every other taxonomy, and each lands cleanly here because the rule asks what the work produces, not what it uses. The structure also predicts its own failures: any real protocol that fits two leaves exposes a rule violation, and any protocol that fits none exposes a gap. That is a testable structure, not a filing cabinet.

**Scale and setting as lenses rather than branches is the right call.** A separate bioprocess branch would duplicate culture, purification and measurement at larger volume. Keeping scale as a tag means a 5 mL culture and a 2,000 L bioreactor sit in the same branch, which is also how the underlying biology behaves.

**Coverage is broad enough to place most labs.** Branch 5 holds whole organisms, branch 8 holds in vivo work, and branches 1 and 2 hold the support work that most published taxonomies omit entirely even though it consumes real bench hours.

### What a reviewer would challenge

**The rule is a synthesis, not a standard.** No published wet-lab taxonomy exists to validate this against. The ontology precedent supports the top-level split, but the four tie-breaks are reasoned, not cited. This should be stated plainly wherever the tree is used.

**Branch 8 is doing too much work.** Twelve children, spanning a plate reader and a cryo-EM session, is wider than any other branch. The defense is that they share an output type. The honest reading is that "data" is a coarser output category than "purified protein," so branch 8 may deserve a split by measurement modality at the next level of rigor.

**Branch 7 and branch 8 have a soft boundary in practice.** Staining a slide and imaging it are one continuous activity to the person doing them. The split is defensible by output (a prepared slide, then an image) but it will feel unnatural to users, and any interface over this tree should show the pair together.

**Several branches are thin relative to the field's real complexity.** Carbohydrate and glycan work (3.4), biosensing (8.10.3) and therapeutic cell engineering (6.4) each compress a substantial literature into a few leaves. They are placeholders pending expansion, not finished analysis.

**Depth is uneven by design, and that is a defect as well as a feature.** Nucleic acid work reaches four levels because it is where the most protocols exist. Plant and organism work stops at three. This reflects source availability, not relative importance, and it will bias anything that counts leaves as a proxy for field size.

### What would settle it

Run real protocols through the tree. Pull several hundred from public repositories across as many branches as possible, and assign each to exactly one leaf. Three numbers decide whether the structure works: the percentage assigned to exactly one leaf, the percentage that fit two or more (rule violations), and the percentage that fit none (missing branches). Agreement between two independent people assigning the same protocols tests whether the rule is teachable, which is the real test of a taxonomy intended for others to use.

---

## Scope

This map covers wet-lab work only, meaning anything performed on physical biological material.

Deliberately excluded: bioinformatics and computational biology, biostatistics, modeling and simulation, structure prediction, image analysis, cheminformatics, data management and laboratory information systems, literature and database curation, and clinical patient-facing procedures. These are substantial parts of modern biology, and a complete map of a lab would add them as a parallel tree rather than as branches inside this one.
