// Final assessment quiz bank for the Software Engineering course.
// IMPORTANT: quizzes are self-assessment ONLY and never gate certificates.
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

const Q = (
  id: string,
  question: string,
  options: string[],
  correctIndex: number,
  explanation: string
): QuizQuestion => ({ id, question, options, correctIndex, explanation });

export const SE_FINAL_QUIZ: Quiz = {
  id: "se-final",
  courseId: "software-engineering",
  title: "Software Engineering — Final Assessment",
  description:
    "40 questions across every module. This is a self-assessment: your score is recorded for your own learning and never affects your certificate.",
  questions: [
    Q("q1", "Software engineering is best defined as…", ["Random hacking until code works", "The systematic, disciplined, quantifiable approach to development, operation and maintenance of software", "Only the testing phase of a project", "Buying off-the-shelf software"], 1, "Fritz Bauer's classic definition: systematic, disciplined, quantifiable approach to software production."),
    Q("q2", "The term 'software crisis' refers to…", ["A shortage of computers in the 1960s", "Projects routinely running over budget and schedule with unreliable output", "A virus outbreak", "The Y2K bug only"], 1, "The 1960s–70s crisis of cost overruns, delays and poor quality motivated engineering discipline."),
    Q("q3", "Which is NOT a phase of the SDLC?", ["Requirement analysis", "Design", "Playing video games", "Maintenance"], 2, "Core SDLC phases: requirements, design, implementation, testing, deployment, maintenance."),
    Q("q4", "In the classic Waterfall model, phases are executed…", ["In parallel with no documentation", "Strictly sequentially, each reviewed before the next begins", "In random order", "Only by the customer"], 1, "Waterfall flows downward: each phase completes and is verified before the next starts."),
    Q("q5", "The iterative Waterfall model adds…", ["Feedback paths allowing return to earlier phases", "Mandatory outsourcing", "No documentation", "Customer coding"], 0, "Feedback edges let teams fix defects in the phase that caused them."),
    Q("q6", "In the V-model, system design is paired with…", ["Unit testing", "System testing", "No testing", "Acceptance testing"], 1, "Pairings: requirements↔acceptance, high-level design↔system, detailed design↔integration, code↔unit."),
    Q("q7", "Throwaway prototyping means…", ["The prototype is discarded after requirements are clarified", "The final product is thrown away", "Customers never see the prototype", "No requirements are gathered"], 0, "Throwaway prototypes clarify needs and are then discarded before proper construction."),
    Q("q8", "The Incremental model delivers…", ["Nothing until the very end", "A working core first, then added features release by release", "Only documentation", "Only test cases"], 1, "Each increment is a working product slice; functionality grows release by release."),
    Q("q9", "The Spiral model is primarily driven by…", ["Aesthetics", "Risk analysis in every loop", "Marketing deadlines", "Luck"], 1, "Boehm's spiral: each cycle identifies and resolves the biggest remaining risks."),
    Q("q10", "Which Agile value is correct?", ["Working software over comprehensive documentation", "Documentation over working software", "Contracts over collaboration", "Plans over change"], 0, "The manifesto prefers individuals, working software, collaboration and responding to change."),
    Q("q11", "In Scrum, who prioritises the Product Backlog?", ["Scrum Master", "Product Owner", "Stakeholders randomly", "The compiler"], 1, "The Product Owner owns the vision and backlog ordering."),
    Q("q12", "A Sprint Review is for…", ["Firing team members", "Demonstrating the Increment to stakeholders", "Writing annual reports", "Planning company holidays"], 1, "Each Sprint ends with a demo of usable software and feedback collection."),
    Q("q13", "RAD is suitable when…", ["Technical risk is very high", "The system is modular, components are reusable and the deadline is tight", "No users are available", "Requirements are completely unknown and no tools exist"], 1, "RAD needs modularity, reusable components, skilled small teams and committed users."),
    Q("q14", "Requirement engineering stages in order are…", ["Coding, testing, deployment, hacking", "Feasibility, elicitation, specification, validation", "Validation, coding, elicitation, feasibility", "Testing, validation, coding, design"], 1, "Feasibility → elicitation → specification (SRS) → validation."),
    Q("q15", "'The system shall respond within 2 seconds' is a…", ["Functional requirement", "Non-functional requirement", "Design pattern", "Test stub"], 1, "Performance constraints ('how well') are non-functional requirements."),
    Q("q16", "A good SRS must be…", ["Vague and short", "Correct, complete, consistent, verifiable and traceable", "Written only after deployment", "Kept secret from developers"], 1, "IEEE 830 qualities: correctness, unambiguity, completeness, consistency, verifiability, traceability."),
    Q("q17", "In a DFD, an arrow represents…", ["A data store", "Data flow (data in motion)", "An external entity", "A process"], 1, "Arrows = data flows; circles = processes; squares = entities; open rectangles = stores."),
    Q("q18", "A Level-0 DFD is also called…", ["The context diagram (whole system as one bubble)", "A class diagram", "A Gantt chart", "A decision tree"], 0, "Level 0 shows the system as a single process with external entities."),
    Q("q19", "A logical DFD shows…", ["Server brand names", "WHAT the business does, independent of technology", "Programmer salaries", "Exact hardware used"], 1, "Logical = what happens; physical = how/where/who implements it."),
    Q("q20", "The '4 Ps' of project management are…", ["People, Product, Process, Project", "Pizza, Pasta, Panic, Profit", "Plan, Play, Pause, Party", "Price, Place, Promotion, Product"], 0, "SPM balances People, Product, Process and Project."),
    Q("q21", "Proactive risk management means…", ["Ignoring risks", "Identifying and planning responses before risks occur", "Blaming the customer afterwards", "Adding risk after delivery"], 1, "Proactive = identify, analyse, plan upfront; reactive = firefight later."),
    Q("q22", "Risk Exposure equals…", ["Probability + impact", "Probability × impact", "Impact − probability", "Probability ÷ team size"], 1, "Exposure quantifies and prioritises each risk for response planning."),
    Q("q23", "Transferring a risk means…", ["Deleting the risk register", "Shifting impact to a third party (e.g. insurance, fixed-price contract)", "Increasing the risk", "Hiding it from stakeholders"], 1, "The four responses: avoid, mitigate, transfer, accept."),
    Q("q24", "Basic COCOMO organic constants are…", ["a=2.4, b=1.05", "a=10, b=2", "a=1, b=1", "a=3.6, b=1.20"], 0, "Organic: 2.4/1.05; semi-detached: 3.0/1.12; embedded: 3.6/1.20."),
    Q("q25", "Intermediate COCOMO adds…", ["The Effort Adjustment Factor from 15 cost drivers", "Nothing new", "Only the team name", "A random multiplier"], 0, "E = a·(KLOC)^b × EAF, where EAF multiplies the cost-driver ratings."),
    Q("q26", "The critical path is…", ["The shortest path", "The longest zero-slack chain, fixing project duration", "Any path with maximum slack", "The path with most people"], 1, "Delays on the critical path delay the whole project; crashing it shortens delivery."),
    Q("q27", "Function Points measure…", ["Lines of code", "Delivered functionality, independent of language", "Developer height", "Meeting hours"], 1, "FP counts EI/EO/EQ/ILF/EIF weighted by complexity — technology-neutral sizing."),
    Q("q28", "Adjusted Function Points = …", ["UFP + CAF", "UFP × CAF", "UFP − CAF", "CAF ÷ UFP"], 1, "FP = UFP × (0.65 + 0.01·ΣFi) over the 14 general system characteristics."),
    Q("q29", "Verification answers…", ["Are we building the product right?", "Are we building the right product?", "How much profit?", "Who is the CEO?"], 0, "Verification = conformance to specs via reviews; validation = fitness for users via testing."),
    Q("q30", "Acceptance testing is performed by…", ["Only compilers", "Customers/users to confirm fitness for purpose", "Nobody", "Hackers"], 1, "Alpha (in-house) and beta/UAT (real users) decide release sign-off."),
    Q("q31", "Error seeding estimates hidden defects as N = …", ["(S × n) / s", "S + n + s", "n − s", "S ÷ n ÷ s"], 0, "Total real defects ≈ seeded × real-found ÷ seeded-found."),
    Q("q32", "Best combination of design quality is…", ["High cohesion with low coupling", "Low cohesion with high coupling", "No modules at all", "Maximum global variables"], 0, "Functional cohesion + data coupling is the gold standard."),
    Q("q33", "In integration testing, a stub simulates…", ["The caller above", "A called subordinate module below", "The customer", "The network cable"], 1, "Drivers fake callers (top-down needs stubs; bottom-up needs drivers)."),
    Q("q34", "Statement coverage of 8/10 executed statements is…", ["80%", "8%", "100%", "0%"], 0, "Coverage = executed ÷ total × 100. Note 100% still misses untested branches."),
    Q("q35", "Boundary Value Analysis for range 1–100 includes…", ["0, 1, 2, 99, 100, 101", "Only 50", "Only 1 and 100", "Negative numbers only"], 0, "Test min−1, min, min+1, max−1, max, max+1 — bugs cluster at edges."),
    Q("q36", "Cyclomatic complexity V(G) can be computed as…", ["E − N + 2P", "N − E", "E + N", "P − E"], 0, "Equivalently: predicate nodes + 1, or bounded regions + 1."),
    Q("q37", "Adding dark mode on user request is…", ["Corrective maintenance", "Perfective maintenance", "Adaptive maintenance", "Preventive maintenance"], 1, "Perfective = enhancements; corrective = bug fixes; adaptive = environment; preventive = future-proofing."),
    Q("q38", "Availability = …", ["MTBF / (MTBF + MTTR)", "MTBF + MTTR", "MTTR − MTBF", "MTBF × MTTR"], 0, "Example: 990/(990+10) = 99%."),
    Q("q39", "In a use-case diagram, <<extend>> denotes…", ["A mandatory shared step", "An optional variation of a use case", "A database table", "A bug"], 1, "<<include>> = mandatory; <<extend>> = optional."),
    Q("q40", "House ◆— Room (filled diamond) models…", ["Aggregation", "Composition (parts die with the whole)", "Inheritance", "A sequence"], 1, "Composition = lifecycle-bound ownership; aggregation (hollow ◇) = shared, survivable parts."),
  ],
};

export const QUIZZES: Quiz[] = [SE_FINAL_QUIZ];

export function getQuiz(id: string): Quiz | undefined {
  return QUIZZES.find((q) => q.id === id);
}
