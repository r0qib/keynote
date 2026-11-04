/**
 * Slide manifest (v2, plan §5). `enabled` toggles a slide; live numbering skips disabled ones.
 * Cut tiers: A = disable first, B = second.
 * `canvas`: full-bleed background (CSS string, or array indexed by buildStep). Default #FAFAFB.
 * `chromeFromBuild`: hide the corner badge and progress bar before this build (default 0).
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
    'Opening frame while people join. Who I am, InformatiQ team. Real experience, not a vendor pitch.'),
  s('S02', 'who-we-are', 'We build software for the North Sea.', 'Who we are', 'Opening', 2.0, 9, 'S02_WhoWeAre',
    'Pride in what our team built. [1]-[8] One product per click. [9] All eight together.'),
  s('S03', 'agenda', "Today's feature presentation.", 'Agenda', 'Opening', 0.75, 2, 'S03_Agenda',
    '[1] The five chapters slide in. [2] "Most of our time goes here." How We Work lifts.'),

  // I · The Good
  s('S04', 'act-good', 'I · The Good', '', 'Good', 0.17, 0, 'S04_ActGood', 'Chapter card. A beat, then move on.', chapter('Good')),
  s('S05', 'time-back', 'We got our time back.', 'Time back', 'Good', 1.5, 2, 'S05_TimeBack',
    'The boring work went to the AI. [1] [2] What we did with the time.'),
  s('S06', 'manuals', 'Our user manuals write themselves.', 'User manuals', 'Good', 1.75, 2, 'S06_Manuals',
    'Manuals generated from the product. [1] [2] Reviewed and done.'),
  s('S07', 'poll', "Be honest. It's anonymous.", 'Poll', 'Poll', 2.0, 1, 'S07_Poll',
    'Launch the poll. Give people time. [1] The QR closes into a check: talk through the results.'),

  // II · The Bad
  s('S08', 'act-bad', 'II · The Bad', '', 'Bad', 0.17, 0, 'S08_ActBad', 'Chapter card. A beat, then move on.', chapter('Bad')),
  s('S09', 'keynote-vs-terminal', 'The keynote vs. my terminal.', 'Promises', 'Bad', 1.5, 3, 'S09_KeynoteVsTerminal',
    'Real vendor claims. [1] Claims two and three. [2] My terminal. [3] Delete, toast, then the late dialog.'),
  s('S10', 'ninety-nine', '99% of 70% of the time.', 'Reliability', 'Bad', 1.0, 1, 'S10_NinetyNine',
    'Confident 99%. [1] The ring splits: of 70% of the time.'),
  s('S11', 'did-you-read', 'Did you even read what I said?', 'Listening', 'Bad', 1.5, 4, 'S11_DidYouRead',
    '[1] Scenario one. [2] Scenario two. [3] "Remove the comments." [4] The closing line.', { cutTier: 'B' }),
  s('S12', 'circle', 'I asked for a circle.', 'The sweet spot', 'Bad', 1.5, 4, 'S12_Circle',
    'Architecture needs judgement. [1]-[3] Three attempts. [4] Never the bull. Sometimes throw the session away.'),
  s('S13', 'overengineered', 'Enterprise-grade dark mode.', 'Overengineering', 'Bad', 1.0, 2, 'S13_Overengineered',
    'A simple ask. [1] The file explosion. [2] The 40-page doc.', { cutTier: 'A' }),

  // III · The Ugly
  s('S14', 'act-ugly', 'III · The Ugly', '', 'Ugly', 0.17, 0, 'S14_ActUgly', 'Chapter card. A beat, then move on.', chapter('Ugly')),
  s('S15', 'thinking', 'Doomscrolling…', 'Waiting', 'Ugly', 1.5, 2, 'S15_Thinking',
    'Let the bubble sit. [1] It becomes doomscrolling. [2] Context rot.', { chromeFromBuild: 1 }),
  s('S16', 'frameworks', 'Proven. Thorough. Not cheap.', 'Frameworks', 'Ugly', 1.0, 2, 'S16_Frameworks',
    'Spec Kit, AI-DLC, BMAD, OpenSpec. Respect them. [1] Tokens level the scale. [2] Time tips it.', { cutTier: 'B' }),
  s('S17', 'say-vs-do', 'What we say vs. what we do.', 'Say vs. do', 'Ugly', 1.0, 1, 'S17_SayVsDo',
    'What we say. [1] What we do.', { cutTier: 'A' }),
  s('S18', 'elephant', 'The elephant in the room.', 'Budget', 'Ugly', 1.5, 3, 'S18_Elephant',
    'Full pipeline, full meter. [1] Review and Docs cut. [2] Plan, Spec, Test and QA cut. [3] One shot.'),
  s('S19', 'three-body', 'The three-body problem.', 'Pick two', 'Ugly', 1.0, 2, 'S19_ThreeBody',
    'The triangle. [1] Running between corners. [2] The collapse.', { cutTier: 'A' }),
  s('S20', 'slop', 'Everything is purple now.', 'Slop', 'Ugly', 1.25, 2, 'S20_Slop',
    'Let the slop land. [1] Back to clean. [2] Our principles, not its defaults.', { canvas: [SLOP_GRADIENT, '#FAFAFB'] }),
  s('S21', 'make-no-mistakes', 'Make it better. Make no mistakes.', 'Prompting', 'Ugly', 1.0, 2, 'S21_MakeNoMistakes',
    "It's on us: my lazy prompt. [1] Make no mistakes. [2] MAKE. NO. MISTAKES."),
  s('S22', 'meat-proxy', "Don't be a meat proxy.", 'Meat proxy', 'Ugly', 1.5, 5, 'S22_MeatProxy',
    'Client, me, AI. [1]-[4] The commit log, ending on "who is JSON?". [5] The model said so.'),

  // IV · Making It Count
  s('S23', 'act-count', 'IV · Making It Count', '', 'Count', 0.17, 0, 'S23_ActCount', 'Chapter card. A beat, then move on.', chapter('Count')),
  s('S24', 'role-shift', 'The role shift.', 'Role shift', 'Count', 1.5, 2, 'S24_RoleShift',
    'Before. [1] Now. [2] Workhorse becomes decision maker.'),
  s('S25', 'ticket-floor', 'The ticket is the floor, not the ceiling.', 'Raise the bar', 'Count', 0.75, 1, 'S25_TicketFloor',
    'The ticket on the floor. [1] Look over the fence.', { cutTier: 'B' }),
  s('S26', 'make-it-better', "Let's make it better.", 'Make it better', 'Count', 2.0, 2, 'S26_MakeItBetter',
    'Before AI. [1] The slop version. [2] With AI, done right: the popover.'),
  s('S27', 'plan-hours', 'Plan for hours. Let it run for hours.', 'Plan first', 'Count', 1.25, 2, 'S27_PlanHours',
    'The chaotic day. [1] Plan, then execute overnight. [2] I am free while it runs.'),
  s('S28', 'the-number', '$25,000', '', 'Count', 0.33, 0, 'S28_TheNumber', 'Hold on to that number.'),

  // V · How We Work
  s('S29', 'act-how', 'V · How We Work', '', 'How', 0.17, 0, 'S29_ActHowWeWork', 'Chapter card. A beat, then move on.', chapter('How')),
  s('S30', 'workflow-map', 'How we work now.', 'The workflow', 'How', 1.5, 3, 'S30_WorkflowMap',
    '[1] Gather and Plan, with me. [2] Orchestrate and Remember, without me. [3] The loop.'),
  s('S31', 'gather', 'The requirement is just the start.', 'Gather', 'How', 1.75, 3, 'S31_Gather',
    'The ticket. [1] Four sources. [2] Be the user. [3] The brief.'),
  s('S32', 'plan-together', 'Plan with a co-worker.', 'Plan', 'How', 1.75, 3, 'S32_PlanTogether',
    'The brief. [1] The questions. [2] My answers. [3] The plan as unit cards.'),
  s('S33', 'orchestrator', 'One manager. Many fresh minds.', 'Orchestrate', 'How', 2.0, 3, 'S33_Orchestrator',
    '[1] Explore once. [2] Deal the cards. [3] Explore every time vs. once.'),
  s('S34', 'right-model', 'Right model. Right effort.', 'Routing', 'How', 1.25, 3, 'S34_RightModel',
    'Opus. [1] Sonnet. [2] Haiku. [3] The effort sliders.', { cutTier: 'B' }),
  s('S35', 'specialists', 'Built for this feature. Then retired.', 'Specialists', 'How', 1.25, 2, 'S35_Specialists',
    'One general agent. [1] Specialists from the template. [2] Shipped, retired.'),
  s('S36', 'files-memory', 'The files are the memory.', 'Remember', 'How', 1.75, 3, 'S36_FilesMemory',
    'A running session. [1] The laptop dies. [2] Resume at unit 7. [3] The four files.'),
  s('S37', 'code-context', 'Code is the new context.', 'Context', 'How', 1.25, 2, 'S37_CodeContext',
    'Docs out of sync. [1] The stack collapses. [2] All four stations done.'),

  // Epilogue · The $25,000 lesson
  s('S38', 'unlimited', '"It\'s unlimited."', 'The $25,000 lesson', 'Epilogue', 1.5, 2, 'S38_Unlimited',
    'Remember this number? [1] It\'s unlimited. [2] All in: one month.'),
  s('S39', 'the-morning', 'Access revoked.', 'The morning after', 'Epilogue', 1.25, 2, 'S39_TheMorning',
    'Access denied. [1] Top 10 users. [2] The new reality, spoken only.'),
  s('S40', 'cache', 'Five minutes.', 'Lesson 1', 'Epilogue', 1.5, 2, 'S40_Cache',
    'Cached context. [1] The coffee break. [2] The 4:50 heartbeat.'),
  s('S41', 'fresh-sessions', 'Start fresh.', 'Lesson 2', 'Epilogue', 1.25, 2, 'S41_FreshSessions',
    "Yesterday's long session. [1] Compaction loses details. [2] Handoff into a fresh session."),

  // Close
  s('S42', 'shared-repo', 'Build it once. Share it with everyone.', 'Share it', 'Close', 1.25, 2, 'S42_SharedRepo',
    'The team AI repo. [1] Out to the projects. [2] Company-wide.'),
  s('S43', 'thanks', 'Questions?', '', 'Close', 9, 0, 'S43_Thanks', 'Questions. Humans only.'),
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
