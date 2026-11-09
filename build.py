#!/usr/bin/env python3
"""Build taxonomy.json and the README diagram from TAXONOMY.md and lenses.yaml.

TAXONOMY.md is the single source of truth for structure. Node ids carry the
hierarchy (4.1.1.1 is a child of 4.1.1), so indentation is never parsed.

Usage: python3 build.py
"""

import json
import re
from pathlib import Path

HERE = Path(__file__).parent
TAXONOMY_MD = HERE / "TAXONOMY.md"
LENSES_YAML = HERE / "lenses.yaml"
OUT_JSON = HERE / "docs" / "taxonomy.json"
OUT_MERMAID = HERE / "diagram.mmd"
README = HERE / "README.md"

BRANCH_BEGIN = "<!-- BEGIN BRANCHES -->"
BRANCH_END = "<!-- END BRANCHES -->"

NODE_RE = re.compile(r"^[\s│├└─]*(\d+(?:\.\d+)*)\.?\s+(.+?)\s*$")
OUTPUT_RE = re.compile(r"^[\s│├└─]*output:\s*(.+?)\s*$")

AREA_LABELS = {
    "all": "All areas",
    "biochemistry": "Biochemistry",
    "structural-biology": "Structural biology",
    "molecular-biology": "Molecular biology",
    "cell-biology": "Cell biology",
    "developmental-biology": "Developmental biology",
    "stem-cell": "Stem cell biology",
    "genetics": "Genetics",
    "genomics": "Genomics",
    "neuroscience": "Neuroscience",
    "immunology": "Immunology",
    "microbiology": "Microbiology",
    "virology": "Virology",
    "cancer-biology": "Cancer biology",
    "plant-biology": "Plant biology",
    "ecology": "Ecology and environment",
    "synthetic-biology": "Synthetic biology",
    "pharmacology": "Pharmacology and toxicology",
    "bioengineering": "Bioengineering",
}

MATERIAL_LABELS = {
    "nucleic-acid": "Nucleic acid",
    "protein": "Protein",
    "lipid": "Lipid",
    "metabolite": "Metabolite",
    "carbohydrate": "Carbohydrate",
    "cell": "Cell",
    "tissue": "Tissue",
    "organism": "Organism",
    "chemical": "Chemical compound",
    "data": "Data",
}


def sentence_case(text):
    """ALL CAPS headings become sentence case. Other text is left alone."""
    letters = [c for c in text if c.isalpha()]
    if letters and all(c.isupper() for c in letters):
        return text[0] + text[1:].lower()
    return text


def read_tree_block(markdown):
    """Return the lines of the first fenced code block."""
    lines = markdown.splitlines()
    try:
        start = next(i for i, ln in enumerate(lines) if ln.strip() == "```")
    except StopIteration:
        raise SystemExit("No fenced code block found in TAXONOMY.md")
    end = next(i for i, ln in enumerate(lines[start + 1:], start + 1)
               if ln.strip() == "```")
    return lines[start + 1:end]


def parse_lenses(text):
    """Minimal reader for the flat lenses.yaml shape used here."""
    lenses = {}
    current = None
    list_re = re.compile(r"\[(.*?)\]")

    def items(raw):
        return [s.strip() for s in raw.split(",") if s.strip()]

    for raw_line in text.splitlines():
        line = raw_line.split("#", 1)[0].rstrip()
        if not line.strip():
            continue
        key_match = re.match(r'^"([\d.]+)":\s*(.*)$', line)
        if key_match:
            current = key_match.group(1)
            lenses[current] = {"areas": [], "materials": []}
            inline = key_match.group(2).strip()
            if inline.startswith("{"):
                for field in ("areas", "materials"):
                    found = re.search(field + r":\s*\[(.*?)\]", inline)
                    if found:
                        lenses[current][field] = items(found.group(1))
            continue
        field_match = re.match(r"^\s+(areas|materials):\s*(.*)$", line)
        if field_match and current:
            found = list_re.search(field_match.group(2))
            if found:
                lenses[current][field_match.group(1)] = items(found.group(1))
    return lenses


def build_nodes(tree_lines, lenses):
    root = {"id": "", "title": "Biological laboratory work", "children": []}
    by_id = {"": root}
    last_top = None

    for line in tree_lines:
        output_match = OUTPUT_RE.match(line)
        if output_match and last_top is not None:
            last_top["output"] = output_match.group(1)
            continue

        node_match = NODE_RE.match(line)
        if not node_match:
            continue
        node_id, title = node_match.group(1), node_match.group(2)
        parent_id = node_id.rsplit(".", 1)[0] if "." in node_id else ""
        parent = by_id.get(parent_id)
        if parent is None:
            continue

        tags = lenses.get(node_id, {})
        node = {
            "id": node_id,
            "title": sentence_case(title),
            "depth": node_id.count(".") + 1,
            "children": [],
        }
        if tags.get("areas"):
            node["areas"] = tags["areas"]
        if tags.get("materials"):
            node["materials"] = tags["materials"]

        parent["children"].append(node)
        by_id[node_id] = node
        if node["depth"] == 1:
            last_top = node

    return root, by_id


def inherit_tags(node, areas=None, materials=None):
    """Children without their own tags inherit the nearest ancestor's."""
    areas = node.get("areas") or areas or []
    materials = node.get("materials") or materials or []
    node["areas"] = areas
    node["materials"] = materials
    for child in node["children"]:
        inherit_tags(child, areas, materials)


def count_leaves(node):
    if not node["children"]:
        return 1
    return sum(count_leaves(c) for c in node["children"])


def make_mermaid(root):
    """Top two levels only. Deeper levels make the GitHub render unreadable."""
    lines = ["flowchart LR", "    ROOT[\"Biological laboratory work\"]"]
    for top in root["children"]:
        key = "N" + top["id"]
        lines.append(f'    ROOT --> {key}["{top["id"]}. {top["title"]}"]')
        for child in top["children"]:
            child_key = "N" + child["id"].replace(".", "_")
            label = f'{child["id"]} {child["title"]}'
            lines.append(f'    {key} --> {child_key}["{label}"]')
    return "\n".join(lines)


def mermaid_key(node_id):
    return "N" + node_id.replace(".", "_")


def mermaid_label(text):
    """Mermaid labels are quoted, so only double quotes need replacing."""
    return text.replace('"', "'")


def make_branch_outline(root):
    """One diagram per domain, covering every subsection, for the README."""
    blocks = []
    for top in root["children"]:
        header = f'### {top["id"]}. {top["title"]}'
        if top.get("output"):
            header += f'\n\n*Output: {top["output"]}.*'
        header += (f'\n\n{count_leaves(top)} workflows in '
                   f'{len(top["children"])} branches.')

        root_key = mermaid_key(top["id"])
        lines = ["flowchart LR",
                 f'    {root_key}("{top["id"]}. {mermaid_label(top["title"])}")']

        def walk(node, parent_key):
            for child in node["children"]:
                key = mermaid_key(child["id"])
                label = mermaid_label(f'{child["id"]} {child["title"]}')
                lines.append(f'    {parent_key} --> {key}["{label}"]')
                walk(child, key)

        walk(top, root_key)
        lines.append(f'    class {root_key} domain;')
        lines.append("    classDef domain fill:#e4eee9,stroke:#2f5d50,stroke-width:2px;")
        diagram = "```mermaid\n" + "\n".join(lines) + "\n```"
        blocks.append(header + "\n\n" + diagram)
    return "\n\n".join(blocks)


def update_readme(outline):
    """Replace the generated section between the branch markers."""
    if not README.exists():
        return False
    text = README.read_text()
    if BRANCH_BEGIN not in text or BRANCH_END not in text:
        return False
    head, rest = text.split(BRANCH_BEGIN, 1)
    _, tail = rest.split(BRANCH_END, 1)
    new = (f"{head}{BRANCH_BEGIN}\n"
           f"<!-- Generated by build.py. Edit TAXONOMY.md, then rerun it. -->\n\n"
           f"{outline}\n\n{BRANCH_END}{tail}")
    if new != text:
        README.write_text(new)
        return True
    return False


def main():
    lenses = parse_lenses(LENSES_YAML.read_text())
    tree_lines = read_tree_block(TAXONOMY_MD.read_text())
    root, by_id = build_nodes(tree_lines, lenses)
    inherit_tags(root)

    nodes = [n for n in by_id.values() if n["id"]]
    data = {
        "title": "Biological laboratory work",
        "rule": "Every workflow is filed under the kind of thing it exists to produce.",
        "areaLabels": AREA_LABELS,
        "materialLabels": MATERIAL_LABELS,
        "stats": {
            "domains": len(root["children"]),
            "nodes": len(nodes),
            "leaves": sum(count_leaves(t) for t in root["children"]),
            "maxDepth": max(n["depth"] for n in nodes),
        },
        "tree": root["children"],
    }

    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(data, indent=2) + "\n")
    OUT_MERMAID.write_text(make_mermaid(root) + "\n")
    readme_changed = update_readme(make_branch_outline(root))

    print(f"{data['stats']['domains']} domains, "
          f"{data['stats']['nodes']} nodes, "
          f"{data['stats']['leaves']} leaves, "
          f"max depth {data['stats']['maxDepth']}")
    print(f"wrote {OUT_JSON}")
    print(f"wrote {OUT_MERMAID}")
    print(f"{'updated' if readme_changed else 'unchanged'} {README}")


if __name__ == "__main__":
    main()
