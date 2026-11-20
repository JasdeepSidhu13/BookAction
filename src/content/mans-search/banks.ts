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
  "ch-1-dont-aim-at-success": [
    q("ms1-1", "What am I aiming at that might be better as a by-product?", "Success"),
    q("ms1-2", "What cause greater than myself am I willing to dedicate this month to?", "Dedication"),
    q("ms1-3", "Whom am I called to serve or love without keeping score?", "Love"),
    q("ms1-4", "What does my conscience command that I have been postponing?", "Conscience"),
    q("ms1-5", "What is my Why for a hard How I am currently in?", "Nietzsche"),
    q("ms1-6", "Where am I chasing happiness directly — and what would dedication look like instead?", "Happiness"),
    q("ms1-7", "Which source of meaning is weakest for me now: work, love, or courage in difficulty?", "Sources"),
    q("ms1-8", "How will I respond to unavoidable difficulty so that it gains meaning?", "Suffering"),
  ],
  "ch-2-shock-of-admission": [
    q("ms2-1", "What “small torments” most shape my inner life right now?", "Everyday"),
    q("ms2-2", "Which external identity markers am I most attached to?", "Identity"),
    q("ms2-3", "What remains of me if status, title, or belongings are stripped away?", "Core"),
    q("ms2-4", "Where am I still living in a “delusion of reprieve”?", "Denial"),
    q("ms2-5", "How do I treat ordinary people when I am under strain?", "Character"),
    q("ms2-6", "What practice of dignity can I keep when conditions are unfair?", "Dignity"),
  ],
  "ch-3-last-of-human-freedoms": [
    q("ms3-1", "In what situation did I forget I could still choose my attitude?", "Freedom"),
    q("ms3-2", "What attitude will I choose on purpose the next time I am provoked?", "Practice"),
    q("ms3-3", "Whom or what do I love in a way that lifts me beyond circumstance?", "Love"),
    q("ms3-4", "Where am I becoming the plaything of circumstance?", "Agency"),
    q("ms3-5", "What suffering can I no longer change — and how will I meet it?", "Fate"),
    q("ms3-6", "What tiny act of courage is available to me today?", "Courage"),
    q("ms3-7", "How do I use humor or inner life when the outer world is harsh?", "Inner life"),
  ],
  "ch-4-liberation": [
    q("ms4-1", "What bitterness am I still carrying, and what is it costing me?", "Bitterness"),
    q("ms4-2", "Where am I using past harm as a license to stay passive or unkind?", "Victim license"),
    q("ms4-3", "What decision have I been leaving to fate?", "Initiative"),
    q("ms4-4", "After a hard season, what is life asking of me now?", "Next chapter"),
    q("ms4-5", "How will I honor justice without becoming what I opposed?", "Ethics"),
    q("ms4-6", "What does “becoming human again” look like in my ordinary week?", "Recovery"),
  ],
  "ch-5-will-to-meaning": [
    q("ms5-1", "If meaning is my primary motivation, what is it asking for this season?", "Primary"),
    q("ms5-2", "Where am I living for pleasure or power instead of meaning?", "Contrast"),
    q("ms5-3", "What unique meaning can only I fulfill in my relationships or work?", "Uniqueness"),
    q("ms5-4", "What worthwhile tension am I avoiding by seeking comfort?", "Noödynamics"),
    q("ms5-5", "Toward what cause or person am I pointed beyond myself?", "Self-transcendence"),
    q("ms5-6", "What freely chosen task would make healthy demand on me?", "Task"),
  ],
  "ch-6-existential-vacuum": [
    q("ms6-1", "When do I feel the existential vacuum most — evenings, weekends, success after a goal?", "Vacuum"),
    q("ms6-2", "Am I conforming, complying, or freely responding — and where?", "Freedom"),
    q("ms6-3", "What am I responsible for that I have been treating as optional?", "Responsibility"),
    q("ms6-4", "Where does hyper-intention (clutching an outcome) backfire for me?", "Technique"),
    q("ms6-5", "What would dereflection look like in one conversation this week?", "Dereflection"),
    q("ms6-6", "What fear might I meet with paradoxical intention — intending the feared thing for a moment?", "Paradox"),
  ],
  "ch-7-tragic-optimism": [
    q("ms7-1", "How can I say yes to life this week without denying what hurts?", "Yes"),
    q("ms7-2", "Which of pain, guilt, or death is most alive for me now?", "Triad"),
    q("ms7-3", "What achievement can I create from a pain I cannot remove?", "Pain"),
    q("ms7-4", "What change does my guilt summon — specifically?", "Guilt"),
    q("ms7-5", "What does finitude make urgent that I keep postponing?", "Death"),
    q("ms7-6", "Where have I been using optimism as denial instead of responsibility?", "Honesty"),
    q("ms7-7", "What is one constructive turn I can make of a negative fact this week?", "Turn"),
  ],
};
