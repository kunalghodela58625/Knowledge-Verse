import type { CourseModule, Lesson } from "./types";

// ---------------------------------------------------------------------------
// MODULES 1–4 : foundations, process models, requirements, project management
// ---------------------------------------------------------------------------

export const modulesA: CourseModule[] = [
  {
    id: "m1",
    title: "Introduction to Software Engineering & SDLC",
    description:
      "Why software engineering exists, how it evolved, and the Software Development Life Cycle that underpins every process model.",
    objectives: [
      "Define software engineering and explain why it is needed",
      "Describe the evolution of software engineering",
      "Explain each phase of the Software Development Life Cycle (SDLC)",
      "Relate SDLC phases to a real-life example",
    ],
    lessonIds: ["m1l1", "m1l2", "m1l3"],
  },
  {
    id: "m2",
    title: "Software Process Models",
    description:
      "The classic and modern ways software is built: Waterfall, V-model, Prototyping, Incremental, Evolutionary, Spiral, Agile, Scrum and RAD — and how to choose between them.",
    objectives: [
      "Compare sequential, iterative, risk-driven and agile process models",
      "Explain the strengths and weaknesses of each SDLC model",
      "Select a suitable model for a given project scenario",
      "Describe Scrum roles, events and artefacts",
    ],
    lessonIds: [
      "m2l1",
      "m2l2",
      "m2l3",
      "m2l4",
      "m2l5",
      "m2l6",
      "m2l7",
      "m2l8",
      "m2l9",
      "m2l10",
      "m2l11",
    ],
  },
  {
    id: "m3",
    title: "Requirements Engineering & Analysis",
    description:
      "Capturing what the software must do: elicitation, functional vs non-functional requirements, SRS documents, user requirements and Data Flow Diagrams.",
    objectives: [
      "Explain the requirement engineering process",
      "Distinguish functional and non-functional requirements",
      "Describe the structure of an SRS document",
      "Draw and read Data Flow Diagrams (DFDs)",
    ],
    lessonIds: ["m3l1", "m3l2", "m3l3", "m3l4", "m3l5"],
  },
  {
    id: "m4",
    title: "Project Management, Estimation & Risk",
    description:
      "Managing software projects in practice: planning, COCOMO cost estimation, Function Point sizing, CPM scheduling and risk management.",
    objectives: [
      "Explain software project management activities",
      "Estimate effort with Basic/Intermediate COCOMO",
      "Estimate size with Function Point Analysis",
      "Schedule projects with CPM and manage risks",
    ],
    lessonIds: [
      "m4l1",
      "m4l2",
      "m4l3",
      "m4l4",
      "m4l5",
      "m4l6",
      "m4l7",
      "m4l8",
      "m4l9",
    ],
  },
];

export const lessonsA: Lesson[] = [
  // ============================ MODULE 1 ============================
  {
    id: "m1l1",
    moduleId: "m1",
    title: "Course Orientation & Software Engineering Syllabus",
    videoId: "qtTWBs49BCA",
    videoTitle: "Software Engineering Syllabus Discussion",
    videoDuration: "≈ 12 min video",
    estimatedMinutes: 25,
    description:
      "Orientation to the Software Engineering course: what the subject covers, how the topics connect, and how to study them for exams and real projects.",
    objectives: [
      "Outline the full syllabus of Software Engineering",
      "Understand how modules in this course connect",
      "Plan a study approach for the subject",
    ],
    sections: [
      {
        heading: "What this course covers",
        paragraphs: [
          "Software Engineering is the systematic, disciplined study of how software is specified, designed, built, tested and maintained. This course walks you through that journey in order: from understanding what software engineering is, through process models, requirements, project management, testing, maintenance and UML design.",
          "Each module pairs a video lesson with written notes, examples and key takeaways so you can study even without re-watching every video.",
        ],
        bullets: [
          "Module 1–2: fundamentals and life-cycle models",
          "Module 3: requirements and analysis",
          "Module 4: management, estimation and risk",
          "Modules 5–6: quality, testing and maintenance",
          "Modules 7: UML design; Module 8: final revision",
        ],
      },
      {
        heading: "How to use this course",
        paragraphs: [
          "Study one lesson at a time: watch the embedded video (at your own pace), read the written explanation, note the key takeaways, then click Mark as Complete. Your progress is saved, so you can leave and continue later from any device.",
        ],
        bullets: [
          "Watching the full video is optional — reading the notes also counts",
          "Quizzes are for self-assessment only and never block your certificate",
          "Completing 100% of lessons earns the Certificate of Completion",
        ],
      },
    ],
    keyTakeaways: [
      "The course follows the real software life cycle in order",
      "Every lesson has video + written material + takeaways",
      "Progress is saved automatically in your account",
    ],
  },
  {
    id: "m1l2",
    moduleId: "m1",
    title: "What is Software Engineering? Need & Evolution",
    videoId: "IQFfMb2T2PY",
    videoTitle: "What is Software Engineering and its Evolution (Hindi, with examples)",
    videoDuration: "≈ 15 min video",
    estimatedMinutes: 30,
    description:
      "The definition of software engineering, why disciplined engineering became necessary (the software crisis), and how the field evolved.",
    objectives: [
      "Define software and software engineering",
      "Explain the software crisis and the need for engineering discipline",
      "Summarise the evolution of software engineering",
    ],
    sections: [
      {
        heading: "Software vs Software Engineering",
        paragraphs: [
          "Software is more than code: it is programs plus documentation, configuration and data that allow the programs to operate correctly. Software Engineering is the application of a systematic, disciplined, quantifiable approach to the development, operation and maintenance of software — in short, engineering discipline applied to software.",
          "Fritz Bauer's classic definition at the 1968 NATO conference framed it as establishing sound engineering principles to obtain reliable, efficient software on real machines.",
        ],
        bullets: [
          "Software = programs + documentation + operating procedures",
          "Engineering = systematic, measurable, repeatable practice",
          "Goal: high-quality software, delivered on time and within budget",
        ],
      },
      {
        heading: "Why it was needed: the software crisis",
        paragraphs: [
          "In the 1960s–70s, projects routinely ran over budget, missed deadlines and produced unreliable software — the so-called software crisis. Programs grew larger than any single person could manage informally, hardware became cheaper while software costs exploded, and maintenance consumed most budgets.",
          "The answer was to treat software development as engineering: with requirements, design, measurement, testing and project management — exactly what this course teaches.",
        ],
      },
      {
        heading: "Evolution at a glance",
        paragraphs: [
          "From unstructured programming came structured programming, then modular and object-oriented approaches; from ad-hoc hacking came phased life cycles (SDLC), formal methods, CASE tools, agile methods and today's DevOps practices.",
        ],
        bullets: [
          "1968: term 'Software Engineering' coined (NATO conference)",
          "1970s–80s: structured methods, Waterfall, early CASE tools",
          "1990s–2000s: object orientation, UML, Agile manifesto (2001)",
        ],
      },
    ],
    keyTakeaways: [
      "Software engineering applies systematic discipline to software production",
      "It arose to solve the software crisis of cost, delay and poor quality",
      "The field evolved from structured methods to agile and DevOps",
    ],
  },
  {
    id: "m1l3",
    moduleId: "m1",
    title: "SDLC — Software Development Life Cycle",
    videoId: "bTv3qCtSR5c",
    videoTitle: "SDLC Life Cycle for Beginners (with real-life example)",
    videoDuration: "≈ 14 min video",
    estimatedMinutes: 30,
    description:
      "The phases every software project passes through — planning, analysis, design, implementation, testing, deployment and maintenance — explained with a real-life analogy.",
    objectives: [
      "List and explain the phases of the SDLC",
      "Explain what each phase produces",
      "Apply the SDLC to a real-life example",
    ],
    sections: [
      {
        heading: "The six phases",
        paragraphs: [
          "The SDLC is a framework describing the stages of building software. Although models differ, the core phases are: Requirement Analysis, Design, Implementation (coding), Testing, Deployment and Maintenance.",
        ],
        bullets: [
          "1. Requirement Analysis — gather and document what is needed (SRS)",
          "2. Design — architecture, modules, database and UI design",
          "3. Implementation — write and integrate code",
          "4. Testing — verify behaviour and remove defects",
          "5. Deployment — release to users with training and manuals",
          "6. Maintenance — fix issues and add enhancements",
        ],
      },
      {
        heading: "Real-life analogy: building a house",
        paragraphs: [
          "Think of constructing a house. First you list needs (rooms, budget) — requirements. Then an architect draws plans — design. Workers build — implementation. Inspectors check quality — testing. You move in — deployment. Repairs and extensions later — maintenance. Skipping the plan guarantees expensive rework, in houses and in software.",
        ],
      },
      {
        heading: "Why SDLC matters",
        paragraphs: [
          "The SDLC gives visibility and control: each phase has entry/exit criteria and deliverables, so problems are caught early when they are cheapest to fix. Every process model in Module 2 is simply a different way of organising these same phases.",
        ],
      },
    ],
    keyTakeaways: [
      "SDLC = requirements → design → code → test → deploy → maintain",
      "Each phase produces deliverables reviewed before moving on",
      "All process models are variations on the SDLC",
    ],
  },

  // ============================ MODULE 2 ============================
  {
    id: "m2l1",
    moduleId: "m2",
    title: "Classic Waterfall Model",
    videoId: "noE3pnRzQGI",
    videoTitle: "Classic Waterfall Model in Software Engineering",
    videoDuration: "≈ 13 min video",
    estimatedMinutes: 28,
    description:
      "The oldest sequential life-cycle model: phases flow downward like a waterfall, each completed and reviewed before the next begins.",
    objectives: [
      "Draw and explain the Waterfall phases",
      "State when Waterfall works well and when it fails",
      "Define entry/exit criteria and phase reviews",
    ],
    sections: [
      {
        heading: "How it works",
        paragraphs: [
          "Proposed by Winston Royce (1970), the Waterfall model executes SDLC phases strictly in sequence: Feasibility → Requirements → Design → Coding → Testing → Maintenance. Output of one phase is the input of the next, and each phase ends with verification (review) before proceeding.",
        ],
        bullets: [
          "Simple, disciplined and easy to manage",
          "Heavy documentation at every phase",
          "Working software appears only late in the project",
        ],
      },
      {
        heading: "Advantages and disadvantages",
        paragraphs: [
          "Waterfall suits small projects with stable, well-understood requirements (e.g. payroll for a known process). Its rigidity is its weakness: changing requirements late is very costly, and customers see nothing usable until the end.",
        ],
        bullets: [
          "Good for: fixed requirements, short projects, regulated domains",
          "Bad for: unclear requirements, long projects, products needing feedback",
        ],
      },
    ],
    keyTakeaways: [
      "Waterfall = strictly sequential phases with reviews",
      "Best when requirements are frozen and well understood",
      "Late changes are expensive; no early working product",
    ],
  },
  {
    id: "m2l2",
    moduleId: "m2",
    title: "Iterative Waterfall Model",
    videoId: "vl-IWe0DkwU",
    videoTitle: "Iterative Waterfall Model with example (Hindi)",
    videoDuration: "≈ 12 min video",
    estimatedMinutes: 28,
    description:
      "Waterfall with feedback paths: errors found in a later phase can send work back to the earlier phase that caused them.",
    objectives: [
      "Explain feedback loops in iterative Waterfall",
      "Contrast it with the classic Waterfall model",
    ],
    sections: [
      {
        heading: "The key improvement",
        paragraphs: [
          "Classic Waterfall forbids going backwards. The iterative variant adds feedback edges: if testing reveals a design flaw, work returns to the design phase, is corrected, and flows forward again. In practice this is how most 'Waterfall' projects really run.",
          "Example: during system testing of an online exam portal, a missing requirement (negative marking) is found, so the team revisits requirements and design rather than patching code blindly.",
        ],
        bullets: [
          "Feedback paths between consecutive phases",
          "Defects are fixed at their source phase",
          "Still document-heavy and largely sequential",
        ],
      },
    ],
    keyTakeaways: [
      "Iterative Waterfall = Waterfall + backward feedback",
      "Fixes are applied in the phase where the error originated",
      "More realistic than pure Waterfall, still rigid for volatile needs",
    ],
  },
  {
    id: "m2l3",
    moduleId: "m2",
    title: "V-Shaped Model",
    videoId: "algSKfQ03Sk",
    videoTitle: "V Shaped Model with examples",
    videoDuration: "≈ 13 min video",
    estimatedMinutes: 28,
    description:
      "The Verification & Validation model: every development phase on the left arm of the V has a matching testing phase on the right arm.",
    objectives: [
      "Draw the V-model and its test pairings",
      "Explain verification vs validation in this context",
    ],
    sections: [
      {
        heading: "Structure of the V",
        paragraphs: [
          "The left arm descends from requirements to coding; the right arm ascends through testing. Each left-side artefact is tested by a corresponding right-side level — planned in advance, executed after coding.",
        ],
        bullets: [
          "Requirements ↔ Acceptance testing",
          "High-level design ↔ System testing",
          "Detailed design ↔ Integration testing",
          "Coding ↔ Unit testing",
        ],
      },
      {
        heading: "Strengths and limits",
        paragraphs: [
          "Because test planning starts early, defects are caught systematically and traceability is excellent — ideal for safety-critical and medical software. But like Waterfall, it assumes stable requirements and delivers no early prototypes.",
        ],
      },
    ],
    keyTakeaways: [
      "Every development phase has a paired testing phase",
      "Test design starts early, execution happens after coding",
      "Great for critical systems; poor for changing requirements",
    ],
  },
  {
    id: "m2l4",
    moduleId: "m2",
    title: "Prototyping Model",
    videoId: "nNzH2rlEH6A",
    videoTitle: "Prototyping Model in Software Engineering",
    videoDuration: "≈ 12 min video",
    estimatedMinutes: 28,
    description:
      "Build a quick throwaway mock-up of the system so users can see, touch and correct requirements before the real product is built.",
    objectives: [
      "Explain throwaway vs evolutionary prototyping",
      "Describe the prototyping cycle",
      "State when prototyping is the right choice",
    ],
    sections: [
      {
        heading: "The prototyping cycle",
        paragraphs: [
          "Gather initial (fuzzy) requirements → build a quick prototype (UI screens, mock flows) → let the customer evaluate → refine requirements → repeat until the customer says 'yes, this is what I want'. Then either discard the prototype and build properly (throwaway) or grow it into the product (evolutionary).",
        ],
        bullets: [
          "Best when requirements are unclear or UI-heavy",
          "Reduces requirement errors — the costliest kind",
          "Risk: customers may mistake the prototype for the finished product",
        ],
      },
    ],
    keyTakeaways: [
      "Prototypes clarify fuzzy requirements fast",
      "Throwaway prototypes are discarded; evolutionary ones grow",
      "Manage expectations: a prototype is not the product",
    ],
  },
  {
    id: "m2l5",
    moduleId: "m2",
    title: "Incremental Model",
    videoId: "yd6uxnBIIQg",
    videoTitle: "Incremental Model in Software Engineering",
    videoDuration: "≈ 12 min video",
    estimatedMinutes: 28,
    description:
      "Deliver the system in small working pieces (increments): a core product first, then added features release by release.",
    objectives: [
      "Explain increment planning and delivery",
      "List benefits of early working software",
    ],
    sections: [
      {
        heading: "How increments work",
        paragraphs: [
          "Requirements are divided so that a usable core ships first; each further increment adds functionality until the full system exists. Example: a library system first supports issue/return, then adds reservations, then fines, then reports — each increment is designed, coded and tested like a mini-Waterfall.",
        ],
        bullets: [
          "Early partial product → early feedback and revenue",
          "Lower risk than one big-bang delivery",
          "Needs good upfront partitioning of requirements",
        ],
      },
    ],
    keyTakeaways: [
      "Ship a working core first, add features in increments",
      "Each increment goes through mini design–code–test",
      "Requires stable high-level architecture from the start",
    ],
  },
  {
    id: "m2l6",
    moduleId: "m2",
    title: "Evolutionary Model",
    videoId: "SzRs2y1TcSY",
    videoTitle: "Evolutionary Model with real life examples",
    videoDuration: "≈ 12 min video",
    estimatedMinutes: 26,
    description:
      "Evolve the software through successive versions shaped by user feedback — closely related to incremental and prototyping ideas.",
    objectives: [
      "Explain evolutionary development",
      "Give real-life examples of evolving software",
    ],
    sections: [
      {
        heading: "Evolve, don't just build",
        paragraphs: [
          "An initial version is released, users respond, and the system evolves version by version. Think of WhatsApp or Instagram: early versions did far less than today's, and each release was shaped by how people actually used the app.",
        ],
        bullets: [
          "Suits products where needs emerge through use",
          "Continuous user involvement is essential",
          "Architecture must tolerate constant change",
        ],
      },
    ],
    keyTakeaways: [
      "The product evolves through real usage feedback",
      "Ideal for innovative products with emerging requirements",
      "Demands flexible architecture and close user contact",
    ],
  },
  {
    id: "m2l7",
    moduleId: "m2",
    title: "Spiral Model",
    videoId: "y2CnstDLhXM",
    videoTitle: "Spiral Model in Software Engineering",
    videoDuration: "≈ 14 min video",
    estimatedMinutes: 30,
    description:
      "Barry Boehm's risk-driven model: the project spirals through planning, risk analysis, engineering and evaluation, round after round.",
    objectives: [
      "Explain the four quadrants of the spiral",
      "Show how risk analysis drives each loop",
      "Identify projects suited to the Spiral model",
    ],
    sections: [
      {
        heading: "The four quadrants",
        paragraphs: [
          "Each loop around the spiral passes through: (1) Objective setting — goals and constraints for this cycle; (2) Risk assessment — identify and resolve the biggest risks (often with a prototype); (3) Development & validation — build and test the next increment; (4) Planning — review and plan the next loop.",
        ],
        bullets: [
          "Risk analysis is the engine of the model",
          "Early loops may be paper studies; later loops build product",
          "Combines prototyping, Waterfall and incremental ideas",
        ],
      },
      {
        heading: "When to use it",
        paragraphs: [
          "Spiral fits large, complex, high-risk projects (defence, aerospace, banking cores) where failure is expensive. Its overhead makes it overkill for small, low-risk apps.",
        ],
      },
    ],
    keyTakeaways: [
      "Each spiral loop resolves the biggest remaining risks first",
      "Four quadrants: objectives → risks → build → plan",
      "Best for large, risky projects; heavyweight for small ones",
    ],
  },
  {
    id: "m2l8",
    moduleId: "m2",
    title: "Agile Development",
    videoId: "Xs6E-MAJbfE",
    videoTitle: "Agile in Software Engineering",
    videoDuration: "≈ 14 min video",
    estimatedMinutes: 30,
    description:
      "The Agile mindset: deliver working software in short iterations, welcome changing requirements, and collaborate closely with customers.",
    objectives: [
      "State the 4 values and 12 principles of the Agile Manifesto",
      "Explain iterations, backlogs and working-software delivery",
    ],
    sections: [
      {
        heading: "The Agile Manifesto (2001)",
        paragraphs: [
          "Seventeen developers distilled agility into four values: individuals and interactions over processes and tools; working software over comprehensive documentation; customer collaboration over contract negotiation; responding to change over following a plan.",
        ],
        bullets: [
          "Deliver working software frequently (weeks, not months)",
          "Welcome changing requirements, even late",
          "Business people and developers work together daily",
          "Simplicity and self-organising teams",
        ],
      },
      {
        heading: "How agile projects run",
        paragraphs: [
          "Work is sliced into small user stories kept in a backlog, built in short time-boxed iterations (1–4 weeks), demonstrated to stakeholders each cycle, and continuously improved through retrospectives. Scrum (next lesson) is the most popular way to run Agile.",
        ],
      },
    ],
    keyTakeaways: [
      "Agile values working software and customer collaboration",
      "Change is welcomed; delivery happens in short iterations",
      "Agile is a mindset — Scrum, Kanban and XP implement it",
    ],
  },
  {
    id: "m2l9",
    moduleId: "m2",
    title: "Scrum Framework",
    videoId: "xef_bCjoRCk",
    videoTitle: "SCRUM Model in Software Engineering",
    videoDuration: "≈ 15 min video",
    estimatedMinutes: 30,
    description:
      "Scrum roles (Product Owner, Scrum Master, Developers), events (Sprint, Daily Scrum, Review, Retrospective) and artefacts (Backlog, Sprint Backlog, Increment).",
    objectives: [
      "Describe the three Scrum roles",
      "Explain the five Scrum events",
      "Describe the three Scrum artefacts",
    ],
    sections: [
      {
        heading: "Roles",
        paragraphs: [
          "The Product Owner owns the vision and prioritises the Product Backlog. The Scrum Master coaches the team and removes impediments. Developers (3–9 people, cross-functional) build the Increment.",
        ],
      },
      {
        heading: "Events and artefacts",
        paragraphs: [
          "Work flows in fixed-length Sprints (usually 2 weeks): Sprint Planning selects the Sprint Backlog; the Daily Scrum (15 min) synchronises the team; the Sprint Review demos the Increment; the Retrospective improves the process. The Product Backlog holds all desired work, refined continuously.",
        ],
        bullets: [
          "Sprint → mini-project ending in usable software",
          "Daily Scrum: what I did / will do / blockers",
          "Definition of Done keeps quality non-negotiable",
        ],
      },
    ],
    keyTakeaways: [
      "Scrum = 3 roles, 5 events, 3 artefacts",
      "Every Sprint delivers a usable Increment",
      "Transparency, inspection and adaptation drive improvement",
    ],
  },
  {
    id: "m2l10",
    moduleId: "m2",
    title: "Comparison of All SDLC Models",
    videoId: "ASrMUd0p9fE",
    videoTitle: "Comparison of All SDLC Models (Waterfall, Iterative, Prototype, Spiral, Incremental, RAD, Agile)",
    videoDuration: "≈ 16 min video",
    estimatedMinutes: 32,
    description:
      "Side-by-side comparison of every major life-cycle model so you can choose the right one — and answer exam questions confidently.",
    objectives: [
      "Compare models on risk, flexibility, cost and customer involvement",
      "Choose a suitable model for scenario questions",
    ],
    sections: [
      {
        heading: "Comparison table",
        paragraphs: [
          "Use this mental table when choosing or when answering 'which model?' questions:",
        ],
        bullets: [
          "Waterfall: fixed requirements, low risk, sequential — small/defense payroll-type projects",
          "Iterative/V: adds feedback/testing rigour — regulated, stable-scope projects",
          "Prototype: unclear UI/requirements — validate before building",
          "Incremental/Evolutionary: early delivery needed — large systems in releases",
          "Spiral: high risk, large budget — risk analysis each loop",
          "Agile/Scrum: changing requirements, close customer — fast-evolving products",
          "RAD: component reuse, tight deadline, low technical risk",
        ],
      },
      {
        heading: "Exam strategy",
        paragraphs: [
          "Examiners love scenario questions ('requirements keep changing — which model?'). Anchor on keywords: stable → Waterfall/V; unclear → Prototype; early delivery → Incremental; high risk → Spiral; volatile + collaboration → Agile/Scrum; deadline + reusable components → RAD.",
        ],
      },
    ],
    keyTakeaways: [
      "No single best model — fit the model to risk and requirement stability",
      "Match scenario keywords to model strengths",
      "Hybrids are common in real industry practice",
    ],
  },
  {
    id: "m2l11",
    moduleId: "m2",
    title: "RAD Model — Rapid Application Development",
    videoId: "MvyVR5soJjI",
    videoTitle: "RAD Model in Software Engineering (with example)",
    videoDuration: "≈ 13 min video",
    estimatedMinutes: 28,
    description:
      "Build fast by reusing components and running small teams in parallel: business modelling, data modelling, process modelling, application generation, testing and turnover.",
    objectives: [
      "List the five RAD phases",
      "State RAD's prerequisites and limitations",
    ],
    sections: [
      {
        heading: "The five phases",
        paragraphs: [
          "RAD compresses delivery into 60–90 days through parallel teams and reusable components. Its phases are Business Modelling (information flow), Data Modelling (entities), Process Modelling (operations on data), Application Generation (build with reusable components/4GL tools), and Testing & Turnover (test reused and new parts, deploy).",
        ],
        bullets: [
          "Needs modularisable systems and skilled, small teams",
          "Requires heavy user involvement throughout",
          "Fails when technical risk is high or reuse is impossible",
        ],
      },
    ],
    keyTakeaways: [
      "RAD = parallel teams + reusable components + tight time-box",
      "Five phases from business modelling to turnover",
      "Only works with modular systems and committed users",
    ],
  },

  // ============================ MODULE 3 ============================
  {
    id: "m3l1",
    moduleId: "m3",
    title: "Software Requirements & Requirement Engineering",
    videoId: "JNLRXczA9Y0",
    videoTitle: "Software Requirements and Requirement Engineering (feasibility, elicitation, SRS, validation)",
    videoDuration: "≈ 15 min video",
    estimatedMinutes: 30,
    description:
      "The full requirement engineering process: feasibility study, elicitation, specification (SRS) and validation — the foundation every later phase depends on.",
    objectives: [
      "Define requirement engineering and its stages",
      "Explain feasibility study and elicitation techniques",
      "Describe specification and validation",
    ],
    sections: [
      {
        heading: "The four stages",
        paragraphs: [
          "Requirement Engineering converts fuzzy stakeholder needs into precise, agreed specifications through four stages. Errors here are the most expensive of all — fixing a misunderstood requirement after delivery can cost 100× more than fixing it during elicitation.",
        ],
        bullets: [
          "1. Feasibility study — is it technically, economically, legally viable?",
          "2. Elicitation — gather needs via interviews, questionnaires, observation, prototypes, brainstorming",
          "3. Specification — write the SRS document precisely",
          "4. Validation — reviews, prototyping and test-case generation to check correctness, completeness, consistency",
        ],
      },
    ],
    keyTakeaways: [
      "RE = feasibility → elicitation → specification → validation",
      "Requirement errors are the costliest — validate early",
      "The SRS is the contract between customer and developer",
    ],
  },
  {
    id: "m3l2",
    moduleId: "m3",
    title: "Functional vs Non-functional Requirements",
    videoId: "IBqO6aUkJSE",
    videoTitle: "Functional vs Non-functional Requirements",
    videoDuration: "≈ 12 min video",
    estimatedMinutes: 26,
    description:
      "What the system must DO versus how WELL it must do it — with examples that make the distinction exam-proof.",
    objectives: [
      "Distinguish functional and non-functional requirements",
      "Classify requirements from scenario descriptions",
    ],
    sections: [
      {
        heading: "The distinction with examples",
        paragraphs: [
          "Functional requirements describe services and behaviours: 'the ATM shall dispense cash', 'the system shall email an OTP'. Non-functional requirements constrain how: performance ('login within 2 s'), security, usability, reliability, portability, maintainability.",
        ],
        bullets: [
          "Functional: inputs, outputs, calculations, logins, reports",
          "Non-functional: speed, safety, security, scalability, look-and-feel",
          "Non-functional requirements are often architectural drivers",
          "Test: 'the system shall…' (functional) vs 'the system shall be…' (non-functional)",
        ],
      },
    ],
    keyTakeaways: [
      "Functional = what; non-functional = how well",
      "Both must be measurable and testable",
      "Non-functional needs shape architecture choices",
    ],
  },
  {
    id: "m3l3",
    moduleId: "m3",
    title: "Software Requirements Specification (SRS)",
    videoId: "83-S5Qu6VP8",
    videoTitle: "Software Requirements Specification (SRS) — concept and structure",
    videoDuration: "≈ 13 min video",
    estimatedMinutes: 28,
    description:
      "The SRS document: purpose, IEEE-style structure, and qualities of a good SRS (correct, complete, consistent, verifiable, modifiable).",
    objectives: [
      "Outline the structure of an SRS",
      "List qualities of a good SRS",
    ],
    sections: [
      {
        heading: "Structure of an SRS",
        paragraphs: [
          "A standard SRS contains: Introduction (purpose, scope, definitions), Overall description (product perspective, user classes, constraints), Specific requirements (functional, non-functional, interfaces), and Appendices (models, glossary).",
        ],
        bullets: [
          "Correct, unambiguous, complete, consistent",
          "Verifiable (every requirement testable), ranked, modifiable, traceable",
          "Serves as contract, design input and test basis",
        ],
      },
    ],
    keyTakeaways: [
      "SRS is the official agreement on what will be built",
      "Follow IEEE 830-style structure in exams and projects",
      "Every requirement must be verifiable and traceable",
    ],
  },
  {
    id: "m3l4",
    moduleId: "m3",
    title: "User Requirements with Real-life Examples",
    videoId: "a2fpi0rbr0c",
    videoTitle: "User Requirements with real life examples",
    videoDuration: "≈ 12 min video",
    estimatedMinutes: 26,
    description:
      "Writing requirements from the user's perspective in plain language — and refining them into system requirements.",
    objectives: [
      "Write clear user requirements",
      "Refine user requirements into system requirements",
    ],
    sections: [
      {
        heading: "User vs system requirements",
        paragraphs: [
          "User requirements are plain-language statements of services and constraints ('As a student, I want to download my certificate so I can share it'). System requirements restate these precisely for developers, with inputs, outputs and edge cases. Example: railway booking — user says 'book a ticket easily'; the system requirement specifies availability checks, payment flows, PNR generation and failure handling.",
        ],
        bullets: [
          "Use user stories: As a <role>, I want <goal> so that <benefit>",
          "Avoid ambiguity: define terms like 'fast' with numbers",
          "Validate with the actual users, not proxies",
        ],
      },
    ],
    keyTakeaways: [
      "User requirements use plain language and real goals",
      "Refine them into precise, testable system requirements",
      "Real-life scenarios expose hidden assumptions",
    ],
  },
  {
    id: "m3l5",
    moduleId: "m3",
    title: "Data Flow Diagrams (DFD) — Symbols, Levels & Design",
    videoId: "KN-inGJG540",
    videoTitle: "What is DFD? Symbols, levels and full explanation with examples",
    videoDuration: "≈ 16 min video",
    estimatedMinutes: 32,
    description:
      "Modelling how data moves through a system: DFD symbols, context (0-level), 1-level and 2-level decomposition, plus logical vs physical DFDs.",
    objectives: [
      "Draw DFDs using standard symbols",
      "Decompose context diagrams into level 1 and level 2",
      "Distinguish logical and physical DFDs",
    ],
    sections: [
      {
        heading: "Symbols and rules",
        paragraphs: [
          "DFDs use four symbols: External Entity (square — source/destination outside the system), Process (circle/rounded rectangle — transforms data), Data Flow (arrow — data in motion), Data Store (open rectangle/parallel lines — data at rest). Golden rules: every process has at least one input and one output; data cannot move directly between stores or entities without a process; names must be meaningful.",
        ],
      },
      {
        heading: "Levels of decomposition",
        paragraphs: [
          "Level 0 (context diagram) shows the whole system as one bubble with its external entities — e.g. Food Delivery System interacting with Customer, Restaurant and Delivery Partner. Level 1 explodes that bubble into major sub-processes (Order, Payment, Dispatch). Level 2 explodes each Level-1 process further (e.g. Payment → Validate, Charge, Refund). Balancing rule: inputs/outputs must match between levels.",
        ],
        bullets: [
          "Level 0: single process + external entities",
          "Level 1: 3–7 major processes with data stores",
          "Level 2: detail of one Level-1 process",
        ],
      },
      {
        heading: "Logical vs physical DFD",
        paragraphs: [
          "A logical DFD shows WHAT happens (business activities, independent of technology: 'verify credentials'). A physical DFD shows HOW/WHERE/WHO ('clerk scans ID card at counter terminal'). Start logical, then derive physical for implementation.",
        ],
      },
    ],
    keyTakeaways: [
      "Four symbols: entity, process, flow, store",
      "Decompose 0 → 1 → 2 levels, keeping flows balanced",
      "Logical DFD = what; physical DFD = how/where",
    ],
  },

  // ============================ MODULE 4 ============================
  {
    id: "m4l1",
    moduleId: "m4",
    title: "Software Project Management Fundamentals",
    videoId: "b6mcMkQONic",
    videoTitle: "Software Project Management with real life examples",
    videoDuration: "≈ 14 min video",
    estimatedMinutes: 30,
    description:
      "What project managers actually do: planning, organising, staffing, directing and controlling a software project — explained with real-life examples.",
    objectives: [
      "List SPM activities and the 4 Ps",
      "Explain planning, scheduling and monitoring",
    ],
    sections: [
      {
        heading: "Management activities and the 4 Ps",
        paragraphs: [
          "Software Project Management balances People, Product, Process and Project. Core activities: project planning (scope, schedule, resources), estimation (cost/effort), scheduling (who does what when), risk management, quality management, and configuration management — monitored through reviews and metrics.",
          "Real-life parallel: organising a wedding — budget, venue booking order, vendor coordination, backup plans for rain — is project management with the same planning–execution–monitoring loop.",
        ],
        bullets: [
          "Triple constraint: scope, time, cost (plus quality)",
          "Plan → execute → monitor → control, continuously",
          "People management matters as much as technical plans",
        ],
      },
    ],
    keyTakeaways: [
      "SPM balances people, product, process and project",
      "Planning without monitoring is wishful thinking",
      "Most failures trace to poor estimation and risk handling",
    ],
  },
  {
    id: "m4l2",
    moduleId: "m4",
    title: "Risk Identification — Reactive vs Proactive",
    videoId: "4SWEX4L2dOc",
    videoTitle: "Risk Identification: reactive vs proactive risk management and types of risks",
    videoDuration: "≈ 12 min video",
    estimatedMinutes: 26,
    description:
      "Finding risks before they find you: risk categories (project, technical, business) and reactive versus proactive strategies.",
    objectives: [
      "Classify software risks",
      "Contrast reactive and proactive risk management",
    ],
    sections: [
      {
        heading: "Types of risks",
        paragraphs: [
          "Project risks threaten schedule/budget (staff turnover, late hardware). Technical risks threaten quality (untested technology, complex interfaces). Business risks threaten viability (competitor launch, budget cuts). Known risks can be listed; unknown risks need contingency buffers.",
        ],
        bullets: [
          "Reactive: fight fires after they start — always costlier",
          "Proactive: identify, analyse, plan responses upfront",
          "Maintain a risk register reviewed every iteration",
        ],
      },
    ],
    keyTakeaways: [
      "Risks = project, technical, business (+ known/unknown)",
      "Proactive management beats reactive firefighting",
      "Every risk needs an owner and a response plan",
    ],
  },
  {
    id: "m4l3",
    moduleId: "m4",
    title: "Risk Assessment with Examples",
    videoId: "9GthPTi1Nqc",
    videoTitle: "Risk Assessment with examples",
    videoDuration: "≈ 12 min video",
    estimatedMinutes: 26,
    description:
      "Quantifying risks: probability × impact, risk exposure tables, and prioritising which risks deserve mitigation effort.",
    objectives: [
      "Compute risk exposure",
      "Prioritise risks using probability–impact analysis",
    ],
    sections: [
      {
        heading: "Assessing each risk",
        paragraphs: [
          "For every identified risk, estimate probability (0–100%) and impact (negligible → catastrophic, often costed in weeks/rupees). Risk Exposure = Probability × Impact. Example: 30% chance of losing a key developer × 8-week delay = 2.4 weeks exposure. Sort the register by exposure and attack the top items first.",
        ],
        bullets: [
          "Qualitative scales (Low/Med/High) work when numbers are unavailable",
          "Re-assess each iteration — risks evolve",
          "Document assumptions behind every estimate",
        ],
      },
    ],
    keyTakeaways: [
      "Risk Exposure = probability × impact",
      "Prioritise by exposure, not by gut feeling",
      "Revisit the register continuously",
    ],
  },
  {
    id: "m4l4",
    moduleId: "m4",
    title: "Risk Control vs Risk Mitigation",
    videoId: "cOmovzsLIo0",
    videoTitle: "Risk Control vs Risk Mitigation with example",
    videoDuration: "≈ 11 min video",
    estimatedMinutes: 24,
    description:
      "Responding to risks: avoidance, reduction (mitigation), transfer, acceptance — and monitoring (control) to keep plans alive.",
    objectives: [
      "List the four risk response strategies",
      "Distinguish mitigation from control",
    ],
    sections: [
      {
        heading: "Responses and control",
        paragraphs: [
          "Mitigation reduces probability or impact BEFORE the risk occurs (training a backup developer, prototyping risky tech). Control monitors triggers and executes contingency plans (if the vendor slips by 2 weeks, switch to plan B). The four classic responses: Avoid (change plans to sidestep), Mitigate/Reduce, Transfer (insurance, fixed-price contracts), Accept (budget contingency).",
        ],
        bullets: [
          "Mitigation = before; contingency = after trigger",
          "Transfer the risk you cannot efficiently reduce",
          "Acceptance still needs a funded contingency reserve",
        ],
      },
    ],
    keyTakeaways: [
      "Four responses: avoid, mitigate, transfer, accept",
      "Mitigation acts early; control watches triggers",
      "Unowned risks are unmanaged risks",
    ],
  },
  {
    id: "m4l5",
    moduleId: "m4",
    title: "COCOMO — Effort & Cost Estimation with Numericals",
    videoId: "lr0vA_p6T7Q",
    videoTitle: "Basic COCOMO & Intermediate COCOMO with Numerical",
    videoDuration: "≈ 18 min video",
    estimatedMinutes: 36,
    description:
      "Boehm's Constructive Cost Model: estimating effort and schedule from project size (KLOC), with worked numericals for Basic and Intermediate COCOMO.",
    objectives: [
      "Apply Basic COCOMO formulas",
      "Explain Intermediate COCOMO cost drivers",
      "Solve COCOMO numericals step by step",
    ],
    sections: [
      {
        heading: "Basic COCOMO formulas",
        paragraphs: [
          "Effort E = a × (KLOC)^b person-months; Development time T = c × E^d months. Constants depend on project class:",
        ],
        bullets: [
          "Organic (small, familiar): a=2.4, b=1.05, c=2.5, d=0.38",
          "Semi-detached (medium): a=3.0, b=1.12, c=2.5, d=0.35",
          "Embedded (tight constraints): a=3.6, b=1.20, c=2.5, d=0.32",
          "Worked example: 10 KLOC organic → E = 2.4×10^1.05 ≈ 26.9 PM; T = 2.5×26.9^0.38 ≈ 8.7 months; team ≈ 3 people",
        ],
      },
      {
        heading: "Intermediate COCOMO",
        paragraphs: [
          "Intermediate COCOMO multiplies nominal effort by an Effort Adjustment Factor (EAF) — the product of 15 cost drivers across product (reliability, complexity), computer (time/storage constraints), personnel (experience) and project (tools, schedule) attributes, each rated Very Low → Extra High.",
        ],
        bullets: [
          "E = a×(KLOC)^b × EAF",
          "Drivers > 1.0 inflate effort; < 1.0 reduce it",
          "Exam tip: always multiply ALL given driver values for EAF",
        ],
      },
    ],
    keyTakeaways: [
      "E = a(KLOC)^b, T = c(E)^d — memorise the three constant sets",
      "Intermediate adds EAF from 15 cost drivers",
      "Staff = E/T; always show units (person-months, months)",
    ],
  },
  {
    id: "m4l6",
    moduleId: "m4",
    title: "CPM / PERT — Project Scheduling Numericals",
    videoId: "Us5YtgvfomQ",
    videoTitle: "CPM in Software Engineering — PERT/CPM Numerical",
    videoDuration: "≈ 16 min video",
    estimatedMinutes: 34,
    description:
      "Scheduling with networks: activities, dependencies, earliest/latest times, slack and the critical path — with a solved numerical.",
    objectives: [
      "Build an activity network",
      "Compute ES, EF, LS, LF and slack",
      "Identify the critical path and project duration",
    ],
    sections: [
      {
        heading: "CPM method",
        paragraphs: [
          "List activities with durations and predecessors, draw the network, then forward-pass (Earliest Start/Finish) and backward-pass (Latest Start/Finish). Slack = LS − ES. The critical path is the zero-slack chain — it fixes the shortest possible project duration; any delay there delays everything.",
        ],
        bullets: [
          "Forward pass: ES = max(EF of predecessors); EF = ES + duration",
          "Backward pass: LF = min(LS of successors); LS = LF − duration",
          "Crash critical activities (add resources) to shorten the project",
          "PERT adds optimism/pessimism: Te = (O + 4M + P)/6",
        ],
      },
    ],
    keyTakeaways: [
      "Critical path = longest zero-slack path = project duration",
      "Only crashing critical tasks shortens the schedule",
      "PERT handles uncertainty with three-point estimates",
    ],
  },
  {
    id: "m4l7",
    moduleId: "m4",
    title: "Function Point vs Line of Code",
    videoId: "UBIe1kTIJDY",
    videoTitle: "Function Point vs Line of Code — project size estimation",
    videoDuration: "≈ 12 min video",
    estimatedMinutes: 26,
    description:
      "Two ways to measure software size: language-dependent LOC versus language-independent Function Points — and when to use each.",
    objectives: [
      "Compare LOC and FP measures",
      "State advantages and drawbacks of each",
    ],
    sections: [
      {
        heading: "LOC vs FP",
        paragraphs: [
          "Lines of Code counts source lines — simple but penalises concise languages and can't be measured before coding. Function Points measure delivered functionality (inputs, outputs, inquiries, files, interfaces) weighted by complexity — language-independent and estimable from requirements, but more effort to count.",
        ],
        bullets: [
          "LOC: easy, automatable; varies by language and style",
          "FP: technology-neutral; needs trained counters",
          "Use FP for contracts/early estimates, LOC for code-level tracking",
        ],
      },
    ],
    keyTakeaways: [
      "LOC is code-centric; FP is functionality-centric",
      "FP enables comparison across languages",
      "Both feed into COCOMO-style effort models",
    ],
  },
  {
    id: "m4l8",
    moduleId: "m4",
    title: "Function Point Analysis with Real-life Examples",
    videoId: "7xBcVtjmGwM",
    videoTitle: "Function Point Analysis with real-life examples",
    videoDuration: "≈ 14 min video",
    estimatedMinutes: 30,
    description:
      "Counting Function Points step by step: the five component types, complexity weights, and the CAF adjustment.",
    objectives: [
      "Classify the five FP components",
      "Compute unadjusted and adjusted FP",
    ],
    sections: [
      {
        heading: "Counting procedure",
        paragraphs: [
          "Count External Inputs, External Outputs, External Inquiries, Internal Logical Files and External Interface Files; rate each Low/Average/High using standard weights; sum to get Unadjusted FP (UFP). Then score 14 General System Characteristics (0–5 each) to get the Complexity Adjustment Factor: CAF = 0.65 + 0.01 × ΣFi. Final FP = UFP × CAF.",
        ],
        bullets: [
          "EI/EO/EQ/ILF/EIF — learn the standard weight table",
          "CAF ranges 0.65 (simple) to 1.35 (complex)",
          "Real-life: a student portal's admission form (EI), marksheet (EO), enquiry search (EQ), student DB (ILF), payment gateway (EIF)",
        ],
      },
    ],
    keyTakeaways: [
      "Five components × three complexity levels → UFP",
      "CAF adjusts for 14 technical factors",
      "FP = UFP × CAF",
    ],
  },
  {
    id: "m4l9",
    moduleId: "m4",
    title: "Function Point Calculation — Full Numerical",
    videoId: "bKwvzXQKBRo",
    videoTitle: "Project estimation using Function Point with numerical explanation",
    videoDuration: "≈ 15 min video",
    estimatedMinutes: 32,
    description:
      "A complete guided numerical: from component counts through CAF to final effort estimation using Function Points.",
    objectives: [
      "Solve a full FP numerical independently",
      "Convert FP to effort and schedule",
    ],
    sections: [
      {
        heading: "Worked approach",
        paragraphs: [
          "Follow the exam-safe routine: (1) tabulate components with counts and weights, (2) sum UFP, (3) sum the 14 Fi scores → CAF, (4) FP = UFP × CAF, (5) convert to LOC via language factor if asked, then effort = FP / productivity rate. Always label each step — stepwise marks are generous even with arithmetic slips.",
        ],
        bullets: [
          "Show the weight table explicitly in answers",
          "Double-check EI vs EQ classification (EQ has no derived data update)",
          "Practice one full numerical by hand before the quiz",
        ],
      },
    ],
    keyTakeaways: [
      "Routine: counts → UFP → CAF → FP → effort",
      "Show every step for full marks",
      "EQ vs EO is the most common classification trap",
    ],
  },
];
