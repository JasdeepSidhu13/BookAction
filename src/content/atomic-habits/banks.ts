import type { BankQuestion } from "@/lib/types";

function q(
  id: string,
  prompt: string,
  section?: string,
  type: "text" | "scale" = "text",
): BankQuestion {
  return { id, prompt, section, type };
}

export const bankByChapterId: Record<string, BankQuestion[]> = {
  "ch-1-surprising-power": [
    q("ah1-1", "Where will I hunt aggregation of marginal gains this month?", "Gains"),
    q("ah1-2", "What goal am I chasing that needs a better system underneath?", "Systems"),
    q("ah1-3", "What is my honest 1% better action for tomorrow?", "1%"),
    q("ah1-4", "Which habits are currently making time my enemy?", "Trajectory"),
    q("ah1-5", "Where am I stuck on the plateau of latent potential?", "Patience"),
    q("ah1-6", "If I ignored goals for a week and only improved systems, what would change?", "Systems"),
    q("ah1-7", "What would “British Cycling style” 1% look like in my craft?", "Analogy"),
  ],
  "ch-2-identity-habits": [
    q("ah2-1", "What type of person do I want to become?", "Identity"),
    q("ah2-2", "What identity am I currently casting the most votes for?", "Evidence"),
    q("ah2-3", "Which “that’s just who I am” story is keeping a bad habit alive?", "Cage"),
    q("ah2-4", "What three tiny votes would prove my desired identity this week?", "Votes"),
    q("ah2-5", "Each time I ___, I am a ___. What fills those blanks?", "Embodiment"),
    q("ah2-6", "Where am I chasing outcomes while ignoring identity?", "Layers"),
  ],
  "ch-3-four-laws": [
    q("ah3-1", "What is the cue for my most important good habit?", "Cue"),
    q("ah3-2", "What craving or change in state am I really after?", "Craving"),
    q("ah3-3", "What response do I actually perform — and is it easy enough?", "Response"),
    q("ah3-4", "What reward teaches my brain to repeat it?", "Reward"),
    q("ah3-5", "Which of the Four Laws is weakest for this habit?", "Laws"),
    q("ah3-6", "For one bad habit, which inverted law will I apply first?", "Break"),
  ],
  "ch-4-make-it-obvious": [
    q("ah4-1", "What is my implementation intention (behavior + time + place)?", "Plan"),
    q("ah4-2", "After [current habit], I will [new habit] — what is my stack?", "Stack"),
    q("ah4-3", "What cue for a bad habit can I make invisible today?", "Environment"),
    q("ah4-4", "Where does my space mix conflicting cues?", "Context"),
    q("ah4-5", "What would a habit scorecard reveal that I’m ignoring?", "Awareness"),
    q("ah4-6", "How can I spend less time in tempting situations this week?", "Self-control"),
  ],
  "ch-5-make-it-attractive": [
    q("ah5-1", "What temptation can I bundle with a habit I resist?", "Bundle"),
    q("ah5-2", "Whose presence makes my desired habits feel normal?", "Tribe"),
    q("ah5-3", "How can I reframe this habit from “have to” to “get to”?", "Reframe"),
    q("ah5-4", "What positive feeling do I want to associate with the cue?", "Dopamine"),
    q("ah5-5", "Which social influence is making a bad habit attractive?", "Social"),
    q("ah5-6", "What ritual before starting would make the habit feel inviting?", "Ritual"),
  ],
  "ch-6-make-it-easy": [
    q("ah6-1", "What is the two-minute version of my key habit?", "Two-Minute"),
    q("ah6-2", "Where am I stuck in motion instead of action?", "Motion"),
    q("ah6-3", "What setup can I prime so the habit is half done already?", "Prime"),
    q("ah6-4", "How can I add friction to a bad habit today?", "Friction"),
    q("ah6-5", "What commitment device would lock in the good behavior?", "Device"),
    q("ah6-6", "Have I standardized this habit enough to optimize yet?", "Standardize"),
  ],
  "ch-7-make-it-satisfying": [
    q("ah7-1", "What immediate reward will I attach to completion?", "Reward"),
    q("ah7-2", "How will I track the habit so progress is visible?", "Tracking"),
    q("ah7-3", "What is my “never miss twice” recovery plan?", "Recovery"),
    q("ah7-4", "Who could hold me accountable this month?", "Accountability"),
    q("ah7-5", "Where do I quit after one miss instead of protecting the compound?", "Streaks"),
    q("ah7-6", "What cost can I make immediate for skipping?", "Contract"),
  ],
  "ch-8-goldilocks-and-mastery": [
    q("ah8-1", "Is my habit too easy, too hard, or just right — and why?", "Goldilocks"),
    q("ah8-2", "What slight increase in challenge would restore growth?", "Challenge"),
    q("ah8-3", "When will I review what to keep, improve, or drop?", "Review"),
    q("ah8-4", "Where am I working with my nature vs against it?", "Talent"),
    q("ah8-5", "How will I raise the bar without breaking consistency?", "Progression"),
    q("ah8-6", "What would Steve Martin’s “one more minute” look like for me?", "Expansion"),
  ],
  "ch-9-downside-of-habits": [
    q("ah9-1", "Which established habit has gone fully autopilot?", "Autopilot"),
    q("ah9-2", "What little errors am I no longer noticing?", "Feedback"),
    q("ah9-3", "Who can give me outside eyes on my routine?", "Coach"),
    q("ah9-4", "What one variable will I practice deliberately this week?", "Deliberate"),
    q("ah9-5", "Where has identity become too rigid around a method?", "Flexibility"),
    q("ah9-6", "How will I stay efficient without going mindless?", "Balance"),
  ],
  "ch-10-results-that-last": [
    q("ah10-1", "What three atomic habits are already compounding for me?", "Stack"),
    q("ah10-2", "What is the next 1% I will add to the system?", "Next"),
    q("ah10-3", "Which of the Four Laws needs a refresh on my hardest habit?", "Laws"),
    q("ah10-4", "What identity will I keep voting for over 90 days?", "Identity"),
    q("ah10-5", "Where am I still waiting for a dramatic win?", "Patience"),
    q("ah10-6", "How will I maintain the system — not just arrive at a goal?", "Maintain"),
  ],
};
