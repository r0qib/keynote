/**
 * Slide manifest (v2, plan §5). `enabled` toggles a slide; live numbering skips disabled ones.
 * Cut tiers: A = disable first, B = second.
 * `canvas`: full-bleed background (CSS string, or array indexed by buildStep). Default #FAFAFB.
 * `chromeFromBuild`: hide the corner badge and progress bar before this build (default 0).
 * `darkCanvas`: light chrome for dark/saturated canvases (boolean, or array indexed by buildStep).
 */
import { chapterCanvas } from '../theme.js';

const SLOP_GRADIENT = 'linear-gradient(135deg, #5B21B6 0%, #7C3AED 40%, #A855F7 70%, #DB2777 100%)';

const s = (id, key, title, cornerLabel, act, durationMinutes, totalBuilds, componentName, notes, extra = {}) => ({
  id,
  key,
  title,
  cornerLabel,
  act,
  durationMinutes,
  enabled: true,
  cutTier: null,
  totalBuilds,
  componentName,
  notes,
  ...extra,
});

const chapter = (act) => ({ canvas: chapterCanvas(act) });

export const slideManifest = [
  // Opening
  s('S01', 'title', 'AI-Assisted Development: The Good, the Bad and the Ugly', '', 'Opening', 0.5, 0, 'S01_Title',
    'Point: honest talk, real experience, no vendor pitch. Who I am, InformatiQ team. Say "I am in the ugly part too."'),
  s('S02', 'who-we-are', 'We build software for the North Sea.', 'Who we are', 'Opening', 2.0, 9, 'S02_WhoWeAre',
    'Pride, no jokes. [1] WellMate. [2] WellBook. [3] GeologiQ. [4] Offset Analyzer. [5] LogistiQ. [6] Event Analyzer. [7] AnalytiQ. [8] Portal. [9] All eight together.'),
  s('S03', 'agenda', "Today's feature presentation.", 'Agenda', 'Opening', 0.75, 2, 'S03_Agenda',
    'Point: where we are going. [1] The five chapters slide in. [2] How We Work lifts: "Most of our time goes here."'),

  // I · The Good
  s('S04', 'act-good', 'I · The Good', '', 'Good', 0.17, 0, 'S04_ActGood', 'Chapter card. A beat, then move on.', chapter('Good')),
  s('S05', 'time-back', 'We got our time back.', 'Time back', 'Good', 1.5, 2, 'S05_TimeBack',
    'Point: AI took the toil. [1] The week collapses to minutes. [2] "...so what are we doing with it?" Leave it hanging.'),
  s('S06', 'manuals', 'Our user manuals write themselves.', 'User manuals', 'Good', 1.75, 2, 'S06_Manuals',
    'Point: manuals generated, human reviewed. [1] Screenshots, pins, the page is written. [2] Reviewed. "We removed the toil, not the person."'),
  s('S07', 'poll', "Be honest. It's anonymous.", 'Poll', 'Poll', 2.0, 1, 'S07_Poll',
    'Paste the link in the chat now. Anonymous, 8 questions, 2 minutes. [1] Poll closed (QR turns into a check). Answers are read back later.'),

  // II · The Bad
  s('S08', 'act-bad', 'II · The Bad', '', 'Bad', 0.17, 0, 'S08_ActBad', 'Chapter card. A beat, then move on.', chapter('Bad')),
  s('S09', 'keynote-vs-terminal', 'The keynote vs. my terminal.', 'Promises', 'Bad', 1.5, 3, 'S09_KeynoteVsTerminal',
    'Point: promises vs. my terminal. [1] Claims two and three. [2] My terminal, the request and the reply. [3] Delete, toast, then the late dialog.'),
  s('S10', 'ninety-nine', '99% of 70% of the time.', 'Reliability', 'Bad', 1.0, 1, 'S10_NinetyNine',
    'Say 99% confidently, wait for nods. [1] The ring splits: "of 70% of the time." The worst part: you never know which part you are in.'),
  s('S11', 'did-you-read', 'Did you even read what I said?', 'Listening', 'Bad', 1.5, 4, 'S11_DidYouRead',
    'Point: follows the instruction, adds the rest. [1] Date format, and the API got touched. [2] Blue Save button: tokens, types, JSDoc. [3] // removed all comments. [4] Closing line.', { cutTier: 'B' }),
  s('S12', 'circle', 'I asked for a circle.', 'The sweet spot', 'Bad', 1.5, 4, 'S12_Circle',
    'Point: metaphor for architecture. [1] Rectangle. [2] Trapezium. [3] Overshoot. [4] Never the bull. Spoken: sometimes sacrifice the whole session and start fresh.'),
  s('S13', 'overengineered', 'Enterprise-grade dark mode.', 'Overengineering', 'Bad', 1.0, 2, 'S13_Overengineered',
    'Point: toggle in, architecture out. [1] The file explosion. [2] THEME_ARCHITECTURE.md, 40 pages. Cut tier A.', { cutTier: 'A' }),

  // III · The Ugly
  s('S14', 'act-ugly', 'III · The Ugly', '', 'Ugly', 0.17, 0, 'S14_ActUgly', 'Pivot line: "The Bad is the AI. The Ugly... is us." I am in every slide of this chapter.', chapter('Ugly')),
  s('S15', 'thinking', 'Doomscrolling…', 'Waiting', 'Ugly', 1.5, 2, 'S15_Thinking',
    'Silent 3-4 s on the bubble. [1] It becomes Doomscrolling. Poll Q2. [2] Context rot, mine. Chat is fine for small things.', { chromeFromBuild: 1 }),
  s('S16', 'frameworks', 'Proven. Thorough. Not cheap.', 'Frameworks', 'Ugly', 1.0, 2, 'S16_Frameworks',
    'Point: respect the frameworks. [1] Tokens level the scale. [2] Time tips it. A balance, not a verdict.', { cutTier: 'B' }),
  s('S17', 'say-vs-do', 'What we say vs. what we do.', 'Say vs. do', 'Ugly', 1.0, 1, 'S17_SayVsDo',
    'Point: say vs. do, mine. Left: "We follow spec-driven development." [1] Right: the terminal, "fix it." Poll Q4. Cut tier A.', { cutTier: 'A' }),
  s('S18', 'elephant', 'The elephant in the room.', 'Budget', 'Ugly', 1.5, 3, 'S18_Elephant',
    'Point: budget makes us cut corners. [1] Review and Docs cut. [2] Plan, Spec, Test, QA cut. [3] "One shot." Poll Q6. No numbers yet.'),
  s('S19', 'three-body', 'The three-body problem.', 'Pick two', 'Ugly', 1.0, 2, 'S19_ThreeBody',
    'Point: three corners, pick two. [1] The run starts. [2] The collapse. Real constraint, not a complaint. Cut tier A.', { cutTier: 'A' }),
  s('S20', 'slop', 'Everything is purple now.', 'Slop', 'Ugly', 1.25, 2, 'S20_Slop',
    'Let the slop land. [1] Back to clean: "Everything is purple now." [2] "AI should follow our principles, not its defaults."', { canvas: [SLOP_GRADIENT, '#F4F4F6'], darkCanvas: [true, false] }),
  s('S21', 'make-no-mistakes', 'Make it better. Make no mistakes.', 'Prompting', 'Ugly', 1.0, 2, 'S21_MakeNoMistakes',
    'Point: my lazy prompts. "make it better" [1] "Make it better. Make no mistakes." [2] "MAKE. NO. MISTAKES." Read each louder.'),
  s('S22', 'meat-proxy', "Don't be a meat proxy.", 'Meat proxy', 'Ugly', 1.5, 5, 'S22_MeatProxy',
    'Point: do not be a pipe. [1] Forward client email to AI. [2] Paste AI answer to client. [3] Ask AI what the client meant. [4] "Who is JSON?" [5] The shrug: "The model said so." Poll Q7.'),

  // IV · Making It Count
  s('S23', 'act-count', 'IV · Making It Count', '', 'Count', 0.17, 0, 'S23_ActCount', 'Chapter card. Mood shift: the ugly part is the one we can change.', chapter('Count')),
  s('S24', 'role-shift', 'The role shift.', 'Role shift', 'Count', 1.5, 2, 'S24_RoleShift',
    'Point: the role has shifted. Before: coding was ~4 h. [1] Coding shrinks to AI. [2] Workhorse to decision maker. "No raise included." Poll Q3.'),
  s('S25', 'ticket-floor', 'The ticket is the floor, not the ceiling.', 'Raise the bar', 'Count', 0.75, 1, 'S25_TicketFloor',
    'Point: the ticket is the floor, not the ceiling. [1] The fence, the peek, what is beyond: "Look over the fence." Cut tier B.', { cutTier: 'B' }),
  s('S26', 'make-it-better', "Let's make it better.", 'Make it better', 'Count', 2.0, 2, 'S26_MakeItBetter',
    "Point: thoughtful UX with the time back. [1] The slop version: \"Beautiful, isn't it?\" Reveal the joke. [2] Done right: calm grid, meaningful colour, popover."),
  s('S27', 'plan-hours', 'Plan for hours. Let it run for hours.', 'Plan first', 'Count', 1.25, 2, 'S27_PlanHours',
    'Point: plan for hours, execute for hours. [1] The line becomes "Plan · ~3 h"; agents run overnight. [2] Review, Next plan, Client: I am free while it runs.'),
  s('S28', 'the-number', '$25,000', '', 'Count', 0.33, 0, 'S28_TheNumber', 'Hold on to that number. Do not explain. S38 pays it off.'),

  // V · How We Work
  s('S29', 'act-how', 'V · How We Work', '', 'How', 0.17, 0, 'S29_ActHowWeWork', 'Chapter card. This is the centrepiece: how we actually work.', chapter('How')),
  s('S30', 'workflow-map', 'How we work now.', 'The workflow', 'How', 1.5, 3, 'S30_WorkflowMap',
    'Point: a workflow per complex feature. [1] Gather and Plan: with me. [2] Orchestrate and Remember: without me. [3] The loop: next feature. Poll Q1.'),
  s('S31', 'gather', 'The requirement is just the start.', 'Gather', 'How', 1.75, 3, 'S31_Gather',
    'Point: the requirement is just the start. [1] Four sources. [2] Be the user: who, first, next. [3] Everything flows into the Brief.'),
  s('S32', 'plan-together', 'Plan with a co-worker.', 'Plan', 'How', 1.75, 3, 'S32_PlanTogether',
    'Point: plan with a co-worker. [1] The questions attack the brief. [2] My answers, each pair stamped in. [3] The plan becomes unit cards: six bands each.'),
  s('S33', 'orchestrator', 'One manager. Many fresh minds.', 'Orchestrate', 'How', 2.0, 3, 'S33_Orchestrator',
    'Point: one manager, many fresh minds. [1] Explore once, build the pack. [2] Deal specific cards to fresh agents. [3] Explore every time vs. once.'),
  s('S34', 'right-model', 'Right model. Right effort.', 'Routing', 'How', 1.25, 3, 'S34_RightModel',
    'Point: right model, right effort. Opus plans and reviews. [1] Sonnet implements. [2] Haiku: scripts, commits, clean-up. [3] Effort sliders. Cut tier B.', { cutTier: 'B' }),
  s('S35', 'specialists', 'Built for this feature. Then retired.', 'Specialists', 'How', 1.25, 2, 'S35_Specialists',
    'Point: specialists for one feature. Before: one general agent, ever-growing instructions. [1] Specialists from the template. [2] Shipped, retired.'),
  s('S36', 'files-memory', 'The files are the memory.', 'Remember', 'How', 1.75, 3, 'S36_FilesMemory',
    'Point: the files are the memory. [1] Session runs, laptop dies. [2] New session resumes at unit 7. [3] The four files: progress, decisions, notes, review-log.'),
  s('S37', 'code-context', 'Code is the new context.', 'Context', 'How', 1.25, 2, 'S37_CodeContext',
    'Point: code is the new context. Docs drift out of sync. [1] The stack collapses to three. [2] All four stations done: "Better code. Fewer docs."'),

  // Epilogue · The $25,000 lesson
  s('S38', 'unlimited', '"It\'s unlimited."', 'The $25,000 lesson', 'Epilogue', 1.5, 2, 'S38_Unlimited',
    "Remember this number? [1] \"It's unlimited.\" Copilot pricing change, AWS Bedrock, Halliburton. [2] All in: client prototype to production in one month.", { chromeFromBuild: 1 }),
  s('S39', 'the-morning', 'Access revoked.', 'The morning after', 'Epilogue', 1.25, 2, 'S39_TheMorning',
    'Access denied; the missed email. [1] Top 10 users: me, $25,000. [2] Gauge: soft $1,100, actual ~$3,000, salary joke. Spoken only.'),
  s('S40', 'cache', 'Five minutes.', 'Lesson 1', 'Epilogue', 1.5, 2, 'S40_Cache',
    'Lesson 1. Enterprise setup (AWS Bedrock) = 5-minute cache TTL. [1] Coffee break: ring runs out, whole context reprocessed. [2] Ping every 4:50 keeps it warm.'),
  s('S41', 'fresh-sessions', 'Start fresh.', 'Lesson 2', 'Epilogue', 1.25, 2, 'S41_FreshSessions',
    "Lesson 2. [1] Compaction, twice: details fall out. [2] Handoff doc into a fresh session. Closer, spoken: \"That's why the workflow looks the way it does.\""),

  // Close
  s('S42', 'shared-repo', 'Build it once. Share it with everyone.', 'Share it', 'Close', 1.25, 2, 'S42_SharedRepo',
    'Point: build it once, share it. Agents, skills, plugins, workflows, versioned. [1] Out to the projects. [2] Company-wide hubs: "Reusable AI engineering."'),
  s('S43', 'thanks', 'Questions?', '', 'Close', 9, 0, 'S43_Thanks', 'Thank you. Humans only. Closing line: "Session ended. Cache kept warm for 4:50." Read one or two Q8 answers to warm up the Q&A.'),
];

export function getActiveSlides() {
  return slideManifest.filter((slide) => slide.enabled);
}

// Corner badge text for an active slide, e.g. "02 / Who we are". Null when the slide has none.
export function getSlideCornerBadge(activeSlideIndex) {
  const slide = getActiveSlides()[activeSlideIndex];
  if (!slide || !slide.cornerLabel) return null;
  return `${String(activeSlideIndex + 1).padStart(2, '0')} / ${slide.cornerLabel}`;
}
