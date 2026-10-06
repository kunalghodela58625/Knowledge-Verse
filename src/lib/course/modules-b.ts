import type { CourseModule, Lesson } from "./types";

// ---------------------------------------------------------------------------
// MODULES 5–8 : quality & testing, maintenance, UML, revision
// ---------------------------------------------------------------------------

export const modulesB: CourseModule[] = [
  {
    id: "m5",
    title: "Software Quality & Testing",
    description:
      "Verification vs validation, test levels (unit → acceptance), white-box and black-box techniques, coverage metrics and revision practice.",
    objectives: [
      "Distinguish verification from validation",
      "Explain unit, integration, system and acceptance testing",
      "Apply white-box coverage and black-box design techniques",
      "Compute cyclomatic complexity",
    ],
    lessonIds: [
      "m5l1",
      "m5l2",
      "m5l3",
      "m5l4",
      "m5l5",
      "m5l6",
      "m5l7",
      "m5l8",
      "m5l9",
      "m5l10",
      "m5l11",
      "m5l12",
      "m5l13",
      "m5l14",
      "m5l15",
      "m5l16",
      "m5l17",
    ],
  },
  {
    id: "m6",
    title: "Maintenance, Reliability & Support",
    description:
      "Life after delivery: maintenance types, reliability metrics (MTBF/MTTR), reverse engineering and CASE tools.",
    objectives: [
      "Classify the four maintenance types",
      "Compute availability from MTBF and MTTR",
      "Explain reverse engineering and CASE tools",
    ],
    lessonIds: ["m6l1", "m6l2", "m6l3", "m6l4"],
  },
  {
    id: "m7",
    title: "UML & Software Design",
    description:
      "Visual modelling with the Unified Modeling Language: use-case, sequence, activity, class and object diagrams, plus aggregation vs composition.",
    objectives: [
      "Read and draw core UML diagrams",
      "Model a real system (banking / OTT examples)",
      "Distinguish aggregation from composition",
    ],
    lessonIds: [
      "m7l1",
      "m7l2",
      "m7l3",
      "m7l4",
      "m7l5",
      "m7l6",
      "m7l7",
      "m7l8",
    ],
  },
  {
    id: "m8",
    title: "Revision & Exam Practice",
    description:
      "Consolidate everything: important MCQs, problem-solving practice and a checklist for final revision before the assessment.",
    objectives: [
      "Revise key definitions across all modules",
      "Practise exam-style MCQs and numericals",
      "Attempt the final assessment with confidence",
    ],
    lessonIds: ["m8l1", "m8l2"],
  },
];

export const lessonsB: Lesson[] = [
  // ============================ MODULE 5 ============================
  {
    id: "m5l1",
    moduleId: "m5",
    title: "Verification vs Validation",
    videoId: "fxXZf4zDjGQ",
    videoTitle: "Verification vs Validation in Software Engineering",
    videoDuration: "≈ 11 min video",
    estimatedMinutes: 24,
    description:
      "The most confused pair in testing: verification (are we building it right?) versus validation (are we building the right thing?).",
    objectives: [
      "Define verification and validation",
      "Give examples of each activity",
    ],
    sections: [
      {
        heading: "The core distinction",
        paragraphs: [
          "Verification checks conformance to specifications WITHOUT executing code — reviews, inspections, walkthroughs, desk-checking ('are we building the product right?'). Validation checks the running product against real user needs by executing it — testing ('are we building the right product?'). Both are needed: verified-but-wrong software passes reviews yet fails users.",
        ],
        bullets: [
          "Verification: static, preventive, done on documents/design",
          "Validation: dynamic, detective, done on executing code",
          "V-model pairs each verification artefact with validation tests",
        ],
      },
    ],
    keyTakeaways: [
      "Verification = building it right (reviews); Validation = right product (testing)",
      "Verification is static; validation executes the software",
      "Quality needs both",
    ],
  },
  {
    id: "m5l2",
    moduleId: "m5",
    title: "Levels of Testing",
    videoId: "T0TynxN77oY",
    videoTitle: "Types of Testing in Software Engineering (levels of testing)",
    videoDuration: "≈ 13 min video",
    estimatedMinutes: 28,
    description:
      "The testing pyramid of levels: unit, integration, system and acceptance — who tests what, when, and why.",
    objectives: [
      "Describe the four test levels",
      "Explain the objective of each level",
    ],
    sections: [
      {
        heading: "The four levels",
        paragraphs: [
          "Testing climbs in scope. Unit testing checks single functions/classes in isolation (by developers, with stubs/drivers). Integration testing checks module interactions (top-down, bottom-up, sandwich/big-bang). System testing checks the complete integrated product against the SRS (functional + non-functional). Acceptance testing (alpha/beta, UAT) has users confirm fitness for purpose before release.",
        ],
        bullets: [
          "Unit → smallest pieces, developer-owned, automated",
          "Integration → interfaces between modules",
          "System → end-to-end behaviour of the whole product",
          "Acceptance → customer sign-off (alpha in-house, beta with real users)",
        ],
      },
    ],
    keyTakeaways: [
      "Test in layers: unit → integration → system → acceptance",
      "Each level catches different defect classes",
      "Acceptance testing is the customer's verdict",
    ],
  },
  {
    id: "m5l3",
    moduleId: "m5",
    title: "Error Seeding with Numerical",
    videoId: "lyEAdt8BPM8",
    videoTitle: "Error Seeding in Software Testing (numerical explanation)",
    videoDuration: "≈ 12 min video",
    estimatedMinutes: 26,
    description:
      "Estimating hidden defects by deliberately planting known bugs — and computing the estimate with a simple formula.",
    objectives: [
      "Explain the error-seeding technique",
      "Compute the defect estimate from seeding data",
    ],
    sections: [
      {
        heading: "Method and formula",
        paragraphs: [
          "Seed S known artificial defects into the code before testing. Testers find s seeded defects and n unseeded (real) defects. Estimated total real defects N = (S × n) / s. Example: seed 30, find 21 seeded + 14 real → N = 30×14/21 = 20 real defects estimated, so ~6 remain. Testing can stop when the residual estimate is acceptably low.",
        ],
        bullets: [
          "Seeded bugs must resemble real bugs in difficulty",
          "Assumes seeded and real bugs are equally findable",
          "Gives a stopping criterion for testing",
        ],
      },
    ],
    keyTakeaways: [
      "N = (seeded × real found) / seeded found",
      "Estimates remaining defects objectively",
      "Seeded bugs must be representative",
    ],
  },
  {
    id: "m5l4",
    moduleId: "m5",
    title: "Cohesion & Coupling",
    videoId: "NweTzHYBgYU",
    videoTitle: "Cohesion and Coupling in Software Engineering",
    videoDuration: "≈ 13 min video",
    estimatedMinutes: 28,
    description:
      "The twin measures of modular design quality: high cohesion inside modules, low coupling between them — with types and examples.",
    objectives: [
      "Rank cohesion and coupling types",
      "Apply the high-cohesion/low-coupling principle",
    ],
    sections: [
      {
        heading: "Cohesion (inside) and coupling (between)",
        paragraphs: [
          "Cohesion measures how focused a module's elements are — best (functional: single purpose) down through sequential, communicational, procedural, temporal, logical to worst (coincidental: unrelated bits stuffed together). Coupling measures inter-module dependence — best (data: simple parameters) through stamp, control, external, common to worst (content: one module reaches into another's internals).",
        ],
        bullets: [
          "Aim: HIGH cohesion, LOW coupling",
          "Functional cohesion + data coupling = excellent design",
          "Coincidental cohesion + content coupling = redesign immediately",
          "Exam favourite: order both scales best→worst",
        ],
      },
    ],
    keyTakeaways: [
      "Cohesion: strength within; coupling: dependence between",
      "Functional cohesion (best) → coincidental (worst)",
      "Data coupling (best) → content coupling (worst)",
    ],
  },
  {
    id: "m5l5",
    moduleId: "m5",
    title: "Unit Testing with Examples",
    videoId: "9gu4BsqjQrA",
    videoTitle: "Unit Testing with examples in Software Engineering",
    videoDuration: "≈ 12 min video",
    estimatedMinutes: 26,
    description:
      "Testing the smallest units in isolation using drivers and stubs, with practical examples.",
    objectives: [
      "Explain unit testing procedure",
      "Describe drivers and stubs",
    ],
    sections: [
      {
        heading: "Units, drivers and stubs",
        paragraphs: [
          "A unit (function, method, class) is tested alone by replacing its neighbours: a driver calls the unit (simulating the caller above), stubs simulate called subordinates below. Example: testing calculateDiscount() with a driver feeding prices and a stub returning fake tax rates. Modern frameworks (JUnit, pytest, Jest) automate this; run units on every commit (CI).",
        ],
        bullets: [
          "Driver = fake caller; Stub = fake callee",
          "Catches ~50%+ of defects at the cheapest stage",
          "Keep tests fast, independent and repeatable",
        ],
      },
    ],
    keyTakeaways: [
      "Test each unit isolated with drivers and stubs",
      "Automate and run on every change",
      "Cheapest place to find and fix defects",
    ],
  },
  {
    id: "m5l6",
    moduleId: "m5",
    title: "Integration Testing with Examples",
    videoId: "p8vrpGMR3g4",
    videoTitle: "Integration Testing with examples",
    videoDuration: "≈ 12 min video",
    estimatedMinutes: 26,
    description:
      "Testing modules together: top-down, bottom-up, sandwich and big-bang strategies.",
    objectives: [
      "Compare integration strategies",
      "Choose a strategy for a given module hierarchy",
    ],
    sections: [
      {
        heading: "Strategies compared",
        paragraphs: [
          "Top-down integrates from the main module downward using stubs; faults in key control surface early, but low-level logic waits. Bottom-up builds upward using drivers; foundations solidify first, but the overall flow appears late. Sandwich mixes both. Big-bang integrates everything at once — simple, but fault isolation is a nightmare. Incremental approaches beat big-bang for anything non-trivial.",
        ],
      },
    ],
    keyTakeaways: [
      "Top-down uses stubs; bottom-up uses drivers",
      "Incremental integration localises faults faster",
      "Avoid big-bang except for tiny systems",
    ],
  },
  {
    id: "m5l7",
    moduleId: "m5",
    title: "System Testing with Examples",
    videoId: "AloUqnD7aPs",
    videoTitle: "System Testing with examples",
    videoDuration: "≈ 12 min video",
    estimatedMinutes: 26,
    description:
      "Validating the complete, integrated system against the SRS in a production-like environment.",
    objectives: ["Explain system testing scope and entry criteria"],
    sections: [
      {
        heading: "Testing the whole",
        paragraphs: [
          "System testing treats the software as a black box running on representative hardware, data and load. It verifies end-to-end scenarios from the SRS: a bank transfer debits A, credits B, logs the audit trail and sends SMS — all together. Entry criterion: integration complete and stable; exit: all critical defects fixed and requirement coverage achieved.",
        ],
      },
    ],
    keyTakeaways: [
      "System testing validates the whole product vs the SRS",
      "Uses realistic environments and data volumes",
      "Independent testers reduce developer blind spots",
    ],
  },
  {
    id: "m5l8",
    moduleId: "m5",
    title: "Types of System Testing",
    videoId: "NY7k2qoe4OY",
    videoTitle: "Types of System Testing",
    videoDuration: "≈ 13 min video",
    estimatedMinutes: 28,
    description:
      "Beyond functionality: performance, load, stress, security, usability, compatibility and recovery testing.",
    objectives: ["List and describe system-testing types"],
    sections: [
      {
        heading: "The catalogue",
        paragraphs: [
          "Functional system testing checks what it does; the rest check how well:",
        ],
        bullets: [
          "Performance/load/stress: speed under expected, peak and breaking loads",
          "Security: authentication, authorisation, injection resistance",
          "Usability: real users completing tasks efficiently",
          "Compatibility: browsers, OS versions, devices",
          "Recovery: resume correctly after crashes/power loss",
          "Regression (next module): old features still work after changes",
        ],
      },
    ],
    keyTakeaways: [
      "System testing covers functional + non-functional behaviour",
      "Choose types from the SRS's non-functional requirements",
      "Automate repeated types (regression, load) first",
    ],
  },
  {
    id: "m5l9",
    moduleId: "m5",
    title: "White-Box Testing",
    videoId: "IOrAlTY639U",
    videoTitle: "White Box Testing with example",
    videoDuration: "≈ 13 min video",
    estimatedMinutes: 28,
    description:
      "Testing with full knowledge of internals: designing cases from code structure, logic paths and conditions.",
    objectives: [
      "Explain white-box test design",
      "Design cases from control flow",
    ],
    sections: [
      {
        heading: "Inside-out testing",
        paragraphs: [
          "White-box (structural/glass-box) testers read the code and craft inputs to exercise statements, branches, conditions and paths — e.g. forcing both sides of every if, boundary loop counts (0, 1, many), and all switch cases. Strength: finds hidden logic errors and dead code. Limit: can't detect missing requirements — pair it with black-box testing.",
        ],
      },
    ],
    keyTakeaways: [
      "White-box uses code structure to design cases",
      "Finds logic errors black-box tests miss",
      "Cannot reveal missing features — combine both views",
    ],
  },
  {
    id: "m5l10",
    moduleId: "m5",
    title: "White-Box vs Black-Box Testing",
    videoId: "89VOHd8F8Ao",
    videoTitle: "White Box vs Black Box Testing",
    videoDuration: "≈ 11 min video",
    estimatedMinutes: 24,
    description:
      "Head-to-head comparison of the two fundamental testing perspectives across every exam-relevant dimension.",
    objectives: ["Compare white-box and black-box across key dimensions"],
    sections: [
      {
        heading: "Comparison",
        paragraphs: ["Keep this table ready for exams and interviews:"],
        bullets: [
          "Knowledge: internals visible (white) vs hidden (black)",
          "Basis: code structure vs specifications",
          "Finds: logic/path errors vs missing/wrong functionality",
          "Who: usually developers vs independent testers",
          "When: unit/integration vs system/acceptance (typically)",
          "Techniques: coverage, basis-path vs equivalence, BVA, decision tables",
          "Verdict: complementary — use both, never only one",
        ],
      },
    ],
    keyTakeaways: [
      "White = structure-based; black = specification-based",
      "White finds wrong logic; black finds wrong/missing behaviour",
      "Mature teams always combine both",
    ],
  },
  {
    id: "m5l11",
    moduleId: "m5",
    title: "Statement Coverage",
    videoId: "BKsGb4sAsxo",
    videoTitle: "Statement Coverage Technique",
    videoDuration: "≈ 11 min video",
    estimatedMinutes: 24,
    description:
      "The simplest white-box metric: what fraction of statements did tests execute? — with a worked example.",
    objectives: [
      "Compute statement coverage",
      "Explain its limitations",
    ],
    sections: [
      {
        heading: "Formula and example",
        paragraphs: [
          "Statement coverage = (executed statements / total statements) × 100%. Example: 8 of 10 statements executed → 80%. It is the weakest meaningful criterion: 100% statement coverage can still miss untested branches (an if whose false side never runs) — which is why branch coverage exists (next lessons).",
        ],
      },
    ],
    keyTakeaways: [
      "Coverage = executed ÷ total × 100%",
      "100% statement coverage ≠ bug-free",
      "Minimum bar, not a stopping rule alone",
    ],
  },
  {
    id: "m5l12",
    moduleId: "m5",
    title: "Condition Coverage",
    videoId: "WTOH1PfxA5M",
    videoTitle: "Condition Coverage in White Box Testing",
    videoDuration: "≈ 12 min video",
    estimatedMinutes: 26,
    description:
      "Stronger than branches: ensuring every atomic condition in a decision takes both true and false outcomes.",
    objectives: [
      "Compute condition and branch-condition coverage",
      "Explain MC/DC briefly",
    ],
    sections: [
      {
        heading: "Conditions vs decisions",
        paragraphs: [
          "For `if (A && B)`, branch coverage needs the decision true once and false once — but B might never be false independently. Condition coverage requires EACH atomic condition (A, B) to be both true and false across tests. Branch+condition (and MC/DC in avionics: each condition independently affects the outcome) close the gap. More tests, far fewer escaped logic bugs.",
        ],
      },
    ],
    keyTakeaways: [
      "Test each atomic condition both ways",
      "Branch coverage alone can mask untested conditions",
      "MC/DC is the safety-critical gold standard",
    ],
  },
  {
    id: "m5l13",
    moduleId: "m5",
    title: "Data-Flow Testing",
    videoId: "kRVXMVAH5H8",
    videoTitle: "Data Flow Testing Technique",
    videoDuration: "≈ 12 min video",
    estimatedMinutes: 26,
    description:
      "Tracking variable lifecycles: every definition should reach a use; anomalies (define-define, use-before-define, define-never-used) signal bugs.",
    objectives: [
      "Identify def-use anomalies",
      "Explain du-path coverage",
    ],
    sections: [
      {
        heading: "Anomalies to hunt",
        paragraphs: [
          "Annotate each variable's definitions (d) and uses (u — computation c-use, predicate p-use). Suspicious patterns: defined then redefined without use (lost value), used before definition (uninitialised), defined but never used (dead code). Data-flow coverage requires tests exercising def→use paths — excellent at catching initialisation and scope bugs.",
        ],
      },
    ],
    keyTakeaways: [
      "Follow each variable from definition to use",
      "du-anomalies reveal initialisation and dead-code bugs",
      "Complements control-flow coverage",
    ],
  },
  {
    id: "m5l14",
    moduleId: "m5",
    title: "Boundary Value Analysis",
    videoId: "l239yuyq9xQ",
    videoTitle: "Boundary Value Testing with real-life examples",
    videoDuration: "≈ 13 min video",
    estimatedMinutes: 28,
    description:
      "The highest-ROI black-box technique: bugs cluster at boundaries, so test min−1, min, min+1, max−1, max, max+1.",
    objectives: [
      "Derive boundary test cases",
      "Combine BVA with equivalence partitioning",
    ],
    sections: [
      {
        heading: "Method with example",
        paragraphs: [
          "For an input range 1–100 (e.g. exam marks), equivalence classes are {<1, 1–100, >100}; BVA adds the edges: 0, 1, 2, 99, 100, 101. Real-life: an ATM allowing ₹100–₹10,000 withdrawals — test 99, 100, 101 and 9999, 10000, 10001. Off-by-one errors (`<` vs `<=`) live exactly here, which is why BVA catches a disproportionate share of field bugs.",
        ],
        bullets: [
          "Always test both sides of every boundary",
          "Include output boundaries too (e.g. array sizes)",
          "Pair with equivalence classes for full coverage",
        ],
      },
    ],
    keyTakeaways: [
      "Bugs love boundaries — test min±1 and max±1",
      "BVA + equivalence partitioning = core black-box pair",
      "Covers off-by-one and overflow errors",
    ],
  },
  {
    id: "m5l15",
    moduleId: "m5",
    title: "Cyclomatic Complexity — Problem Solving",
    videoId: "cEGh6YK_XCs",
    videoTitle: "Question on Cyclomatic Complexity (numerical/problem solving)",
    videoDuration: "≈ 14 min video",
    estimatedMinutes: 30,
    description:
      "McCabe's complexity metric and basis-path testing: three formulas, flow-graph practice and exam numericals.",
    objectives: [
      "Compute V(G) by all three methods",
      "Explain its use in test planning",
    ],
    sections: [
      {
        heading: "Three routes to V(G)",
        paragraphs: [
          "Cyclomatic complexity counts independent paths: V(G) = E − N + 2P (edges − nodes + 2×components); or V(G) = number of predicate (decision) nodes + 1; or count bounded regions + 1 in the planar flow graph. Example: a graph with 9 edges, 7 nodes → V = 9 − 7 + 2 = 4, so 4 basis paths need testing. Higher V(G) (>10 per module) signals refactor-worthy code.",
        ],
        bullets: [
          "V(G) = E − N + 2P = predicates + 1 = regions + 1",
          "V(G) = minimum test cases for basis-path coverage",
          "Flag modules with V(G) > 10 for simplification",
        ],
      },
    ],
    keyTakeaways: [
      "Three equivalent formulas — use whichever the graph gives",
      "V(G) sets the basis-path test count",
      "High complexity predicts defect-prone code",
    ],
  },
  {
    id: "m5l16",
    moduleId: "m5",
    title: "Performance Testing with Real-life Examples",
    videoId: "8SYFrCe4uAI",
    videoTitle: "Performance Testing with real life examples",
    videoDuration: "≈ 12 min video",
    estimatedMinutes: 26,
    description:
      "Measuring speed, scalability and stability: load, stress, soak and spike testing with relatable examples.",
    objectives: [
      "Distinguish load, stress, soak and spike tests",
      "State key performance metrics",
    ],
    sections: [
      {
        heading: "Types and metrics",
        paragraphs: [
          "Load testing checks behaviour under expected users (e.g. 10,000 concurrent shoppers on a sale day). Stress testing pushes beyond capacity to find the breaking point. Soak testing runs sustained load for hours to catch memory leaks. Spike testing slams sudden surges (IRCTC Tatkal opening). Metrics: response time, throughput, error rate, CPU/memory utilisation.",
        ],
      },
    ],
    keyTakeaways: [
      "Load = expected; stress = breaking; soak = endurance; spike = surge",
      "Track response time, throughput and error rate",
      "Test in production-like environments",
    ],
  },
  {
    id: "m5l17",
    moduleId: "m5",
    title: "Regression Testing with Real-life Examples",
    videoId: "5496sXljdnQ",
    videoTitle: "Regression Testing with real life examples",
    videoDuration: "≈ 12 min video",
    estimatedMinutes: 26,
    description:
      "Proving that new changes didn't break old features: selective retesting, automation and real-life cases.",
    objectives: [
      "Explain when regression testing is needed",
      "Describe selection and automation strategy",
    ],
    sections: [
      {
        heading: "Retest after every change",
        paragraphs: [
          "Fixing one bug or adding one feature can silently break others — regression suites guard against that. Example: after adding UPI payments to a store app, re-run login, cart, card-payment and refund tests. Strategy: automate the stable core suite, run it on every build (CI), and prioritise tests touching changed code (test selection/minimisation).",
        ],
      },
    ],
    keyTakeaways: [
      "Run regression suites after every fix or feature",
      "Automate the stable core; run in CI",
      "Prioritise tests near changed code",
    ],
  },
  // ============================ MODULE 6 ============================
  {
    id: "m6l1",
    moduleId: "m6",
    title: "Types of Software Maintenance",
    videoId: "nulFv99VBGs",
    videoTitle: "Perfective, Preventive, Adaptive, Corrective Maintenance",
    videoDuration: "≈ 12 min video",
    estimatedMinutes: 26,
    description:
      "The four maintenance categories that consume most of software budgets — with examples for each.",
    objectives: ["Classify maintenance activities into the four types"],
    sections: [
      {
        heading: "The four types",
        paragraphs: ["Every post-delivery change is one of:"],
        bullets: [
          "Corrective: fix bugs found after delivery (crash on logout)",
          "Adaptive: adapt to new environments (new OS, GST rule change)",
          "Perfective: add/improve features per user requests (dark mode)",
          "Preventive: restructure now to avoid future pain (refactor, add monitoring)",
          "Maintenance ≈ 60–70% of lifetime cost — design for it",
        ],
      },
    ],
    keyTakeaways: [
      "Corrective = fix; adaptive = environment; perfective = enhance; preventive = future-proof",
      "Maintenance dominates lifetime cost",
      "Good design and docs slash maintenance effort",
    ],
  },
  {
    id: "m6l2",
    moduleId: "m6",
    title: "MTBF vs MTTR — Reliability Metrics",
    videoId: "Gp9DhFWGgJQ",
    videoTitle: "MTBF vs MTTR (Mean Time Between Failure / To Repair)",
    videoDuration: "≈ 11 min video",
    estimatedMinutes: 24,
    description:
      "Quantifying reliability and maintainability — and combining them into availability — with numericals.",
    objectives: [
      "Define MTBF, MTTR and availability",
      "Compute availability from given figures",
    ],
    sections: [
      {
        heading: "Formulas and example",
        paragraphs: [
          "MTBF (Mean Time Between Failures) measures reliability — average uptime between failures. MTTR (Mean Time To Repair) measures maintainability — average downtime per failure. Availability = MTBF / (MTBF + MTTR). Example: MTBF 990 h, MTTR 10 h → availability = 990/1000 = 99%. Raising availability needs fewer failures (reliability) AND faster recovery (maintainability).",
        ],
      },
    ],
    keyTakeaways: [
      "MTBF = reliability; MTTR = maintainability",
      "Availability = MTBF / (MTBF + MTTR)",
      "Improve both sides for high-availability systems",
    ],
  },
  {
    id: "m6l3",
    moduleId: "m6",
    title: "Reverse Engineering with Real-life Examples",
    videoId: "eh88vW60-I4",
    videoTitle: "Reverse Engineering with real life examples",
    videoDuration: "≈ 12 min video",
    estimatedMinutes: 26,
    description:
      "Working backwards from code to design: recovery, redocumentation, restructuring and re-engineering — plus legal and ethical boundaries.",
    objectives: [
      "Explain reverse-engineering activities",
      "State legitimate uses and limits",
    ],
    sections: [
      {
        heading: "Going backwards up the life cycle",
        paragraphs: [
          "Forward engineering moves requirements → design → code; reverse engineering extracts design and specification understanding FROM existing code — vital for undocumented legacy systems. Levels: redocumentation (recreate docs), restructuring (clean code, same function), re-engineering (rebuild better), plus reverse-design recovery. Real-life: migrating a 20-year-old banking system nobody fully understands. Respect licences and IP — analyse interfaces and behaviour, don't steal protected code.",
        ],
      },
    ],
    keyTakeaways: [
      "Reverse engineering recovers design from code",
      "Essential for legacy maintenance and migration",
      "Stay within legal and licensing boundaries",
    ],
  },
  {
    id: "m6l4",
    moduleId: "m6",
    title: "CASE Tools",
    videoId: "MZk2KQgptts",
    videoTitle: "CASE Tools in Software Engineering",
    videoDuration: "≈ 11 min video",
    estimatedMinutes: 24,
    description:
      "Computer-Aided Software Engineering tools that automate phases of development — upper, lower and integrated CASE with examples.",
    objectives: ["Classify CASE tools and give examples"],
    sections: [
      {
        heading: "Categories and examples",
        paragraphs: [
          "Upper CASE supports early phases (requirement managers, UML modellers like diagram tools); Lower CASE supports later phases (compilers, debuggers, test automation, version control); Integrated CASE covers the full life cycle in one environment (modern IDEs, DevOps pipelines). Benefits: productivity, consistency, better documentation — but tools never substitute for engineering judgement.",
        ],
      },
    ],
    keyTakeaways: [
      "Upper = planning/analysis/design; lower = code/test",
      "Integrated CASE spans the whole life cycle",
      "Tools amplify good process; they don't replace it",
    ],
  },
  // ============================ MODULE 7 ============================
  {
    id: "m7l1",
    moduleId: "m7",
    title: "Introduction to UML",
    videoId: "3qKKcUZqfQk",
    videoTitle: "Introduction to UML with examples",
    videoDuration: "≈ 13 min video",
    estimatedMinutes: 28,
    description:
      "The Unified Modeling Language: why we model, structural vs behavioural diagrams, and how UML fits into design.",
    objectives: [
      "Explain the purpose of modelling",
      "Classify UML diagram types",
    ],
    sections: [
      {
        heading: "UML at a glance",
        paragraphs: [
          "UML is a standard visual language for specifying, visualising and documenting software designs. Structural diagrams show static organisation (class, object, component, deployment); behavioural diagrams show dynamics (use-case, sequence, activity, state). Models are blueprints: they let teams agree on design BEFORE expensive coding, and serve maintenance for years.",
        ],
        bullets: [
          "Structural: class, object, component, deployment",
          "Behavioural: use case, sequence, activity, state",
          "Model just enough — up-to-date simple models beat stale encyclopaedias",
        ],
      },
    ],
    keyTakeaways: [
      "UML = standard visual design language",
      "Structural diagrams show static parts; behavioural show dynamics",
      "Models are communication and maintenance assets",
    ],
  },
  {
    id: "m7l2",
    moduleId: "m7",
    title: "Use Case Diagrams",
    videoId: "Hj6Lkoi_VoM",
    videoTitle: "Use Case Diagram in UML",
    videoDuration: "≈ 13 min video",
    estimatedMinutes: 28,
    description:
      "Capturing system behaviour from the user's viewpoint: actors, use cases, and include/extend/generalisation relationships.",
    objectives: [
      "Identify actors and use cases",
      "Draw use-case diagrams with relationships",
    ],
    sections: [
      {
        heading: "Actors, bubbles and lines",
        paragraphs: [
          "Actors (stick figures) are external roles — Customer, Admin, Payment Gateway. Use cases (ovals) are goals the system delivers — 'Place Order', 'Refund Payment'. Associations connect actors to the use cases they participate in. <<include>> marks mandatory shared steps (login); <<extend>> marks optional variations (apply coupon); generalisation specialises actors or cases.",
          "Example: Food app — Customer places orders, tracks delivery; Restaurant manages menu; <<include>>: verify payment; <<extend>>: apply promo.",
        ],
      },
    ],
    keyTakeaways: [
      "Use cases = user goals; actors = external roles",
      "Include = mandatory; extend = optional",
      "Scope the system boundary explicitly",
    ],
  },
  {
    id: "m7l3",
    moduleId: "m7",
    title: "Sequence Diagrams",
    videoId: "VnRQ5CNC4Fs",
    videoTitle: "Sequence Diagram in UML",
    videoDuration: "≈ 13 min video",
    estimatedMinutes: 28,
    description:
      "Modelling time-ordered interactions: lifelines, activations, synchronous/asynchronous messages and combined fragments.",
    objectives: [
      "Read lifelines, activations and messages",
      "Draw a sequence for a core scenario",
    ],
    sections: [
      {
        heading: "Reading a sequence diagram",
        paragraphs: [
          "Time flows downward. Each participant has a lifeline (dashed line) with activation bars during processing. Solid arrows are synchronous calls (wait for reply — dashed return arrow); open arrows are asynchronous signals. Boxes labelled alt/opt/loop express branches, options and repetition. Example: checkout — Customer → Cart → Payment Gateway → Bank, with an alt fragment for success vs failure.",
        ],
      },
    ],
    keyTakeaways: [
      "Time flows down; messages flow between lifelines",
      "Solid = synchronous; open = asynchronous",
      "alt/opt/loop fragments express logic compactly",
    ],
  },
  {
    id: "m7l4",
    moduleId: "m7",
    title: "Activity Diagrams",
    videoId: "LyhTDsjjjrE",
    videoTitle: "Activity Diagram in UML",
    videoDuration: "≈ 12 min video",
    estimatedMinutes: 26,
    description:
      "Flowchart-style modelling of workflows: actions, decisions, forks/joins and swimlanes.",
    objectives: [
      "Draw activity diagrams with branches and parallelism",
      "Use swimlanes for responsibilities",
    ],
    sections: [
      {
        heading: "Elements and example",
        paragraphs: [
          "Start/final nodes bound the flow; action nodes are steps; diamonds are decisions/merges; thick bars are forks (parallel split) and joins (synchronise). Swimlanes (partitions) assign steps to actors — e.g. order flow split across Customer, System and Kitchen lanes. Perfect for business processes and use-case elaboration.",
        ],
      },
    ],
    keyTakeaways: [
      "Activity diagrams = UML flowcharts for workflows",
      "Fork/join express true parallelism",
      "Swimlanes show who does what",
    ],
  },
  {
    id: "m7l5",
    moduleId: "m7",
    title: "Class Diagrams — Banking System Example",
    videoId: "HuL9EMx8NQo",
    videoTitle: "Class Diagram in UML (Banking System real-life example)",
    videoDuration: "≈ 15 min video",
    estimatedMinutes: 32,
    description:
      "The most important structural diagram, taught through a banking system: classes, attributes, operations, visibility and relationships.",
    objectives: [
      "Draw classes with attributes and operations",
      "Model associations with multiplicity",
    ],
    sections: [
      {
        heading: "Banking model walkthrough",
        paragraphs: [
          "Classes: Customer (name, id, +openAccount()), Account (balance, +debit(), +credit()), SavingsAccount and CurrentAccount (specialisations), Transaction, Branch. Associations carry multiplicity: one Customer holds 1..* Accounts; one Account has 0..* Transactions. Visibility: + public, − private, # protected. This single diagram drives database tables and code skeletons.",
        ],
        bullets: [
          "Compartments: name | attributes | operations",
          "Multiplicity: 1, 0..1, *, 1..* — always label both ends",
          "Inheritance (hollow triangle) for Savings/Current accounts",
        ],
      },
    ],
    keyTakeaways: [
      "Class diagrams blueprint data + behaviour",
      "Multiplicity defines real business rules",
      "One good class diagram seeds code and schema",
    ],
  },
  {
    id: "m7l6",
    moduleId: "m7",
    title: "Class Diagrams — OTT Platform Example",
    videoId: "3SHCM114zI8",
    videoTitle: "Class Diagram in UML (OTT Platform real-life example)",
    videoDuration: "≈ 15 min video",
    estimatedMinutes: 32,
    description:
      "Second modelling workout: an OTT (streaming) platform with subscriptions, profiles, watchlists and recommendations.",
    objectives: ["Model a second real system independently"],
    sections: [
      {
        heading: "OTT model walkthrough",
        paragraphs: [
          "Classes: User, Profile (a User has 1..5 Profiles), Subscription (plan, renewal), Content (Movie/Episode subclasses), Watchlist, Payment. Key relationships: User–Subscription (1..1 active), Profile–Watchlist (1..1), Content–Genre (*..*). Notice how the same notation expresses a totally different domain — that transferability is UML's power. Try redrawing it from memory afterwards.",
        ],
      },
    ],
    keyTakeaways: [
      "Same notation models any domain",
      "Look for has-a (association) vs is-a (inheritance)",
      "Redraw from memory to lock in the skill",
    ],
  },
  {
    id: "m7l7",
    moduleId: "m7",
    title: "Object Diagrams — Class vs Object",
    videoId: "VIPhgTc5Ss0",
    videoTitle: "Object Diagram in UML (class vs object diagrams)",
    videoDuration: "≈ 11 min video",
    estimatedMinutes: 24,
    description:
      "Snapshots of the system at runtime: instances, attribute values and links — and how they differ from class diagrams.",
    objectives: ["Distinguish class and object diagrams", "Draw an object snapshot"],
    sections: [
      {
        heading: "Blueprint vs photograph",
        paragraphs: [
          "A class diagram is the blueprint (Customer class); an object diagram is a photograph at one moment (customer_42: name='Asha', linked to account_7 with balance ₹5,000). Object names underline as `name: Class`; links are instances of associations. Uses: verifying multiplicity, illustrating test scenarios and explaining examples concretely.",
        ],
      },
    ],
    keyTakeaways: [
      "Class = type; object = instance at a moment",
      "Underline object names (`obj: Class`)",
      "Use snapshots to verify designs and explain scenarios",
    ],
  },
  {
    id: "m7l8",
    moduleId: "m7",
    title: "Aggregation vs Composition",
    videoId: "8Nkat4_lDik",
    videoTitle: "Aggregation vs Composition in UML with examples",
    videoDuration: "≈ 12 min video",
    estimatedMinutes: 26,
    description:
      "The two whole-part relationships that confuse everyone: shared aggregation (hollow diamond) versus lifecycle-bound composition (filled diamond).",
    objectives: [
      "Distinguish aggregation from composition",
      "Choose correctly in modelling questions",
    ],
    sections: [
      {
        heading: "Ownership and lifecycle",
        paragraphs: [
          "Aggregation (hollow diamond): a weak has-a — parts can outlive the whole. Team ◇— Player: players exist without the team. Composition (filled diamond): a strong owns-a — parts die with the whole. House ◆— Room: demolish the house, rooms vanish. Code parallel: composition often means the whole creates/destroys parts (constructors/destructors); aggregation passes existing references in.",
        ],
        bullets: [
          "Mnemonic: hollow = hole (parts can leave); filled = fixed together",
          "Exam traps: Library–Book (aggregation), Car–Engine (composition)",
          "Wrong choice corrupts cascading delete and lifecycle logic",
        ],
      },
    ],
    keyTakeaways: [
      "Aggregation = shared parts survive; composition = parts live and die with whole",
      "Hollow diamond vs filled diamond",
      "The choice drives real implementation lifecycle",
    ],
  },

  // ============================ MODULE 8 ============================
  {
    id: "m8l1",
    moduleId: "m8",
    title: "Final Revision — Key Concepts Sprint",
    videoId: "xfjkq0WpRcQ",
    videoTitle: "Important MCQs on Software Engineering (final revision pass)",
    videoDuration: "≈ 18 min video",
    estimatedMinutes: 30,
    description:
      "A guided final pass over every module's must-remember points before you attempt the assessment.",
    objectives: [
      "Recall the top facts from each module",
      "Enter the assessment ready",
    ],
    sections: [
      {
        heading: "Module-by-module checklist",
        paragraphs: ["Confirm you can state each of these cold:"],
        bullets: [
          "SDLC phases and deliverables; Waterfall vs iterative vs V",
          "Prototype/Incremental/Evolutionary/Spiral/Agile/Scrum/RAD triggers",
          "RE stages; functional vs non-functional; SRS qualities; DFD symbols & levels",
          "COCOMO formulas; FP = UFP × CAF; critical path; risk responses",
          "V&V; test levels; cohesion/coupling orders; coverage types; BVA; cyclomatic V(G)",
          "Maintenance types; MTBF/MTTR; CASE categories; UML diagrams",
        ],
      },
    ],
    keyTakeaways: [
      "Check off every module before the quiz",
      "Revisit weak lessons — progress is already saved",
      "The quiz is practice; completion earns the certificate",
    ],
  },
  {
    id: "m8l2",
    moduleId: "m8",
    title: "Course Wrap-up & Next Steps",
    videoId: "ASrMUd0p9fE",
    videoTitle: "Comparison of All SDLC Models (capstone review)",
    videoDuration: "≈ 16 min video",
    estimatedMinutes: 28,
    description:
      "Capstone: re-watch the model comparison, confirm 100% completion, and claim your verifiable Certificate of Completion.",
    objectives: [
      "Consolidate model-selection judgement",
      "Complete the course and claim the certificate",
    ],
    sections: [
      {
        heading: "Finish strong",
        paragraphs: [
          "Revisit the comparison lesson with fresh eyes — you should now classify any scenario in seconds. Then check your dashboard: every lesson ticked means 100% progress, Completed status, and an issued certificate with QR verification. Share it, print it, and keep learning — more courses are coming to Knowledgeverse.",
        ],
      },
    ],
    keyTakeaways: [
      "100% lesson completion = course completed = certificate",
      "No quiz score or watch-time requirement",
      "Share and verify your certificate via its QR code",
    ],
  },
];
