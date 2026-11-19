#set page(paper: "us-letter", margin: 1in)
#set text(font: "Source Serif 4", size: 10pt)
#set par(leading: 0.55em)
#show link: set text(fill: rgb("#005078"))
#set heading(numbering: none)
// Cooper Hewitt’s font files use nonstandard weight values: 707 is Medium.
#show heading: set text(font: "Cooper Hewitt", weight: 707, size: 16pt)
#show heading: set block(above: 1.2em, below: 1em)

#let entry(date, body) = grid(
  columns: (3.8cm, 1fr), column-gutter: 1.4em,
  align(right)[#smallcaps(date)], body,
)
#let details(body) = block(width: 100%, below: 2em)[
  #set text(size: 9pt)
  #set list(indent: 2.5em, spacing: 11pt)
  #body
]

#grid(columns: (auto, auto), column-gutter: 1.5em, align: horizon,
  text(font: "Cooper Hewitt", size: 28pt, weight: 707)[
    #underline("Jack Stanek", stroke: 0.1em + rgb("#9FE2BF"), offset: 0.15em)
  ],
  block(stroke: (left: 0.5pt), inset: (left: 1em))[
    #link("mailto:jstanek@cs.wisc.edu") \
    #link("https://jackstanek.github.io") \
    1205 University Ave, Madison WI 53706
  ],
)

= Education
#entry([Sep 2023 -- Current], [*University of Wisconsin -- Madison* \ _PhD in Computer Sciences_])
#entry([Sep 2023 -- Dec 2025], [*University of Wisconsin -- Madison* \ _MS in Computer Sciences_ \ GPA: 4.0 / 4.0])
#entry([Sep 2015 -- May 2019], [*University of Minnesota -- Twin Cities* \ _BS in Computer Science; awarded with distinction_ \ GPA: 3.8 / 4.0])

= Research Experience
#entry([Jan 2025 -- Current], [*Stochastic Summaries and Neurosymbolic Reasoning* \ #text(size: 8pt)[(Under the supervision of #link("https://muraliadithya.github.io/")[Adithya Murali])]])
#details[
- Developing techniques to integrate LLMs into SMT and logic programming systems for sound reasoning over natural-language theories and real-world knowledge
- Designed a probabilistic programming language with guarded recursion and exact inference, and built a program synthesis framework in Rust to learn generative models of tree-like data #cite(<stanekStochastic2026>)
- Developed a prototype algorithm to construct diverse models of logical formulas, helping proof engineers uncover cognitive blind spots and construct non-obvious counter-examples in verification workflows
]
#entry([Jan 2024 -- May 2024], [*Gradual Information Flow Types with Secure Downgrading* \ #text(size: 8pt)[(Under the supervision of #link("https://cecchetti.sites.cs.wisc.edu/")[Ethan Cecchetti])]])
#details[
- Formalized a core calculus, operational semantics, and type system for a language with gradual information flow labels
- Developed a type system-based mechanism to enforce robust declassification and transparent endorsement to unify flexible non-interference with gradual type systems
]

= Publications
#bibliography("cvpubs.yaml", full: true, title: none)

= Industry Experience
#entry([Feb 2019 -- Jul 2023], [*Cray, Inc. / Hewlett Packard Enterprise* --- _Software Engineer_])
#details[
- Implemented an end-to-end automated HPC hardware maintenance package in Python which reduced system downtime from days to hours and eliminated human error from repair procedures and diagnostics
- Designed HPC hardware observability features in system administrator-oriented tooling, enabling a system-wide view of hardware state to speed up routine management and diagnostic tasks
]

#pagebreak(weak: true)

= Technical Skills
#entry([Languages], [Python, Rust, C++, Haskell, Java, OCaml])
#entry([PL Theory], [Formal verification, program synthesis, SMT solving, type systems, proof assistants])
#entry([Machine Learning], [PyTorch, NumPy, agentic systems, neurosymbolic reasoning and learning, probabilistic programming, Bayesian reasoning, Monte Carlo methods])

= Teaching Assistantships
#entry([Spring 2025], [CS 536: Intro to Compilers])
#entry([Fall 2024], [CS 559: Intro to Computer Graphics])
#entry([Spring 2024], [CS 577: Intro to Algorithms])
#entry([Fall 2023], [CS 559: Intro to Computer Graphics])

= Conferences and Workshops
#entry([Nov 2026], [#link("https://2026.mwpls.org/")[Midwest Programming Languages Summit]])
#entry([Jun 2024], [#link("https://www.cs.uoregon.edu/research/summerschool/summer24/")[Oregon Programming Languages Summer School]])

= Awards and Honors
#entry([May 2017 -- May 2019], [College of Science and Engineering Dean's List \ #text(size: 8pt)[University of Minnesota]])
#entry([May 2015], [Robert E. Rice Computer Engineering Scholarship \ #text(size: 8pt)[University of Minnesota]])

= Spoken Languages
#entry([English], [Native fluency])
#entry([German], [Working proficiency])
