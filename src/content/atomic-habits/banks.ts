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
    q("ah1-1", "Where do I most want compounding gains over the next year?", "Focus"),
    q("ah1-2", "What goal am I chasing that needs a better system underneath it?", "Systems"),
    q("ah1-3", "What is my honest 1% better action for tomorrow?", "1%"),
    q("ah1-4", "Which habits are currently making time my enemy?", "Trajectory"),
    q("ah1-5", "Where am I stuck on the plateau of latent potential?", "Patience"),
    q("ah1-6", "If I ignored goals for a week and only improved systems, what would I change?", "Systems"),
  ],
  "ch-2-identity-habits": [
    q("ah2-1", "What type of person do I want to become?", "Identity"),
    q("ah2-2", "What identity am I currently casting the most votes for?", "Evidence"),
    q("ah2-3", "Which “that’s just who I am” story is keeping a bad habit alive?", "Cage"),
    q("ah2-4", "What three tiny votes would prove my desired identity this week?", "Votes"),
    q("ah2-5", "How would the person I want to become handle my hardest afternoon?", "Embodiment"),
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
    q("ah4-2", "Which current habit can I stack a new one onto?", "Stack"),
    q("ah4-3", "What cue for a bad habit can I make invisible today?", "Environment"),
    q("ah4-4", "Where does my space mix conflicting cues?", "Context"),
    q("ah4-5", "How will I score my habits this week so I see them clearly?", "Awareness"),
    q("ah4-6", "What environment change would make the good habit the default?", "Design"),
  ],
  "ch-5-make-it-attractive": [
    q("ah5-1", "What temptation can I bundle with a habit I resist?", "Bundle"),
    q("ah5-2", "Whose presence makes my desired habits feel normal?", "Tribe"),
    q("ah5-3", "How can I reframe this habit from “have to” to “get to”?", "Reframe"),
    q("ah5-4", "What positive feeling do I want to associate with the cue?", "Dopamine"),
    q("ah5-5", "Which social influence is currently making a bad habit attractive?", "Social"),
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
    q("ah7-6", "What cost can I make immediate for skipping a bad-habit alternative?", "Punishment"),
  ],
  "ch-8-goldilocks-and-mastery": [
    q("ah8-1", "Is my habit too easy, too hard, or just right — and why?", "Goldilocks"),
    q("ah8-2", "What slight increase in challenge would restore growth?", "Challenge"),
    q("ah8-3", "When will I review what to keep, improve, or drop?", "Review"),
    q("ah8-4", "Where has my identity become too rigid around a method?", "Flexibility"),
    q("ah8-5", "What habit is efficient but no longer improving me?", "Downside"),
    q("ah8-6", "How will I raise the bar without breaking consistency?", "Progression"),
  ],
};
