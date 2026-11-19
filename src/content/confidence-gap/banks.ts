import type { BankQuestion } from "@/lib/types";

function q(id: string, prompt: string, section?: string, type: "text" | "scale" = "text"): BankQuestion {
  return { id, prompt, section, type };
}

export const bankByChapterId: Record<string, BankQuestion[]> = {
  "ch-1-why-bother": [
    q("cg1-1", "If I had unlimited confidence, how would I behave differently?", "Opening"),
    q("cg1-2", "How would I walk, talk, work, and play differently?", "Opening"),
    q("cg1-3", "How would I treat others differently — friends, family, partner, colleagues?", "Relationships"),
    q("cg1-4", "How would I treat myself and my body differently?", "Self"),
    q("cg1-5", "How would I talk to myself differently?", "Self"),
    q("cg1-6", "How would my character change, and what qualities would I develop?", "Character"),
    q("cg1-7", "What would I start doing — and what would I stop doing?", "Action"),
    q("cg1-8", "What goals would I set and work toward?", "Goals"),
    q("cg1-9", "What difference would this make in my closest relationships?", "Impact"),
    q("cg1-10", "As I develop genuine confidence, how will I act differently?", "Life-Change List"),
    q("cg1-11", "How will I treat others differently?", "Life-Change List"),
    q("cg1-12", "How will I treat myself differently?", "Life-Change List"),
    q("cg1-13", "What personal qualities will I develop and demonstrate?", "Life-Change List"),
    q("cg1-14", "What important things will I stand for?", "Life-Change List"),
    q("cg1-15", "What activities will I start or do more of?", "Life-Change List"),
    q("cg1-16", "Which cause most fuels my low confidence: excessive expectations, harsh self-judgment, fear preoccupation, lack of experience, or lack of skill?", "Causes"),
    q("cg1-17", "Where am I in the Confidence Cycle right now — practice, apply, assess, or modify?", "Cycle"),
  ],

  "ch-2-the-good-old-days": [
    q("cg2-1", "What messages did adults send me about fear when I was young?", "Reflection"),
    q("cg2-2", "Where do I still treat fear as proof that something is wrong with me?", "Reflection"),
    q("cg2-3", "When fight-or-flight shows up in a safe situation, what does my body do?", "Body"),
    q("cg2-4", "What valued action is fear currently trying to protect me from?", "Values"),
    q("cg2-5", "If fear is normal hardware, what changes about how I relate to it?", "Reframe"),
    q("cg2-6", "What is one small challenge where I can practice feeling fear without obeying it?", "Practice"),
  ],

  "ch-3-true-or-false": [
    q("cg3-1", "Which myth do I still buy: fear is weakness, fear ruins performance, fear must be gone before I act, or confidence = no fear?", "Myths"),
    q("cg3-2", "Where have I performed well despite fear?", "Evidence"),
    q("cg3-3", "Have positive affirmations helped long-term — or sparked an inner argument?", "Affirmations"),
    q("cg3-4", "What would change if I treated fear as normal arousal instead of a verdict?", "Reframe"),
    q("cg3-5", "What is one thing I’ve postponed until I “feel ready”?", "Action"),
    q("cg3-6", "What new rule will I play by this week?", "Rule"),
  ],

  "ch-4-it-aint-necessarily-so": [
    q("cg4-1", "What is my mind saying right now about my confidence?", "Noticing"),
    q("cg4-2", "What is my personal version of the “I can’t do it” story?", "Story"),
    q("cg4-3", "When that story shows up, what sensations appear in my body?", "Body"),
    q("cg4-4", "Where did I get hooked by a thought this week, and what did it cost me?", "Fusion"),
    q("cg4-5", "If I let this thought guide my actions, will it help me create the life I want?", "Workability"),
    q("cg4-6", "Which automatic thoughts pop up most around challenges I care about?", "Pop-ups"),
    q("cg4-7", "What would I do next if this thought were just words and pictures?", "Choice"),
  ],

  "ch-5-off-the-hook": [
    q("cg5-1", "What thoughts most readily hook me and pull me from the life I want?", "Hooks"),
    q("cg5-2", "What negative self-judgment plays a key role in my “I can’t do it” story?", "Self-judgment"),
    q("cg5-3", "What reasons does my mind give for skipping practice or action?", "Reasons"),
    q("cg5-4", "Which tactic does my mind prefer: obstacles, self-judgments, comparisons, or predictions?", "Tactics"),
    q("cg5-5", "If I allow this thought to guide my actions, will it help me achieve the results I want?", "Workability"),
    q("cg5-6", "Will it help me be the person I want to be?", "Workability"),
    q("cg5-7", "Which defusion method helped most: “I’m having the thought…”, singing, silly voices, or screen play?", "Practice"),
    q("cg5-8", "What will I do today while carrying an unhelpful thought lightly?", "Action"),
  ],

  "ch-6-never-short-of-words": [
    q("cg6-1", "If my mind were a radio station this week, what was it broadcasting?", "Broadcast"),
    q("cg6-2", "What name helps me unhook fastest (Radio Triple F, “story,” “reason-giving”)?", "Naming"),
    q("cg6-3", "When I practiced Leaves on a Stream, what hooked me most often?", "Practice"),
    q("cg6-4", "How quickly can I notice I’ve been hooked and restart?", "Return"),
    q("cg6-5", "Which Life-Change List item triggers the loudest Triple F broadcast?", "Life-Change"),
    q("cg6-6", "What short phrase helps me neutralize (“Thanks, mind,” “Interesting story,” “Just words”)?", "Neutralize"),
    q("cg6-7", "What small step will I take today with the radio still on?", "Action"),
  ],

  "ch-7-the-self-esteem-trap": [
    q("cg7-1", "Where am I still treating high self-esteem as a requirement for action?", "Trap"),
    q("cg7-2", "Who or what did I compare myself to this week?", "Comparison"),
    q("cg7-3", "What harsh self-judgment replayed most often?", "Judgment"),
    q("cg7-4", "Did past self-beatings create lasting healthy change — or mainly more pain?", "Helpfulness"),
    q("cg7-5", "What would self-acceptance look like in this situation?", "Acceptance"),
    q("cg7-6", "What action worked, what didn’t, and what will I try differently — without global self-verdicts?", "Assessment"),
    q("cg7-7", "What compassionate encouragement would I offer a friend in my shoes?", "Encouragement"),
  ],

  "ch-8-the-rules-of-engagement": [
    q("cg8-1", "In what situations do I most often miss the world because I’m in my head?", "Presence"),
    q("cg8-2", "Where does mental commentary hurt my performance or connection?", "Performance"),
    q("cg8-3", "What did I notice during mindful breathing — boredom, impatience, calm, hooks?", "Breath"),
    q("cg8-4", "How do I usually respond when I notice I’ve been hooked?", "Return"),
    q("cg8-5", "Which everyday activity will I use as engagement practice?", "Informal"),
    q("cg8-6", "Do I need more outer-world engagement, more body awareness, or more thought-noticing right now?", "Spotlight"),
  ],

  "ch-9-smell-the-roses": [
    q("cg9-1", "Where do I sleepwalk through my day most?", "Autopilot"),
    q("cg9-2", "How can I make tomorrow morning a five-senses practice?", "Morning"),
    q("cg9-3", "Which chore will I transform into engagement training?", "Chore"),
    q("cg9-4", "What enjoyable activity have I been only half-present for?", "Pleasure"),
    q("cg9-5", "What waiting or transition moments can become practice?", "Micro"),
    q("cg9-6", "What did I see, hear, touch, taste, or smell that I usually miss?", "Noticing"),
  ],

  "ch-10-psychological-smog": [
    q("cg10-1", "When do I cross from noticing a concern into full-blown worrying?", "Definition"),
    q("cg10-2", "What has worrying cost me emotionally, relationally, or practically?", "Costs"),
    q("cg10-3", "What reasons does my mind give for why I must keep worrying?", "Reasons"),
    q("cg10-4", "What concrete action would actually take care of this concern?", "Taking care"),
    q("cg10-5", "Can I catch myself mid-loop and say “Here’s worrying”?", "Naming"),
    q("cg10-6", "How much mindfulness am I actually practicing — not just intending?", "Practice"),
    q("cg10-7", "What valued action becomes possible when the smog thins even 10%?", "Clearing"),
  ],

  "ch-11-fueling-up": [
    q("cg11-1", "What sort of person do I want to be in love, work, play, and health?", "Clarify"),
    q("cg11-2", "What are my top six values right now?", "Top six"),
    q("cg11-3", "Where is the biggest gap between my values and my current actions?", "Gaps"),
    q("cg11-4", "Which value do I need most when the going gets rough?", "Rough weather"),
    q("cg11-5", "If I’ve been skipping exercises or actions, what discomfort am I avoiding?", "Skip pattern"),
    q("cg11-6", "How will I keep my values visible this month?", "Carry"),
    q("cg11-7", "What single action today would express a top value?", "One move"),
  ],

  "ch-12-the-success-trap": [
    q("cg12-1", "What does “success” currently mean to me?", "Definition"),
    q("cg12-2", "Where has outcome-only success made the journey miserable?", "Trap"),
    q("cg12-3", "How would I define success if living my values counted fully?", "Rewrite"),
    q("cg12-4", "What tiny thing can I do right now that’s consistent with my values?", "Tiny"),
    q("cg12-5", "When my mind says I’m not successful enough, what is it measuring?", "Comparison"),
    q("cg12-6", "What values-consistent effort deserves recognition today?", "Celebrate"),
  ],

  "ch-13-magic-glue": [
    q("cg13-1", "In my closest relationships, what character would I love to be known for?", "Love"),
    q("cg13-2", "At work or in contribution, what would I love others to think about how I show up?", "Work"),
    q("cg13-3", "In leisure and friendship, what qualities matter most to me?", "Play"),
    q("cg13-4", "How do I want to treat my body, energy, and rest?", "Health"),
    q("cg13-5", "What specific meaningful goal fits each domain without overloading me?", "Goals"),
    q("cg13-6", "What thoughts and feelings show up as I set these goals?", "Fear"),
    q("cg13-7", "Which single domain will I invest in first this week?", "Next"),
  ],

  "ch-14-the-fear-trap": [
    q("cg14-1", "Where does fear currently dictate my choices without a pause?", "Autopilot"),
    q("cg14-2", "What strategies do I use to get rid of fear (distraction, opting out, substances, overwork)?", "Avoidance"),
    q("cg14-3", "What has avoidance cost me in the domain I care about most?", "Costs"),
    q("cg14-4", "When fear spikes, what does it urge me to do?", "Urge"),
    q("cg14-5", "What would chosen action look like in the next feared situation?", "Third path"),
    q("cg14-6", "Am I willing to feel fear in order to live this value?", "Willingness"),
  ],

  "ch-15-plenty-of-space": [
    q("cg15-1", "Where in my body do I feel fear first?", "Notice"),
    q("cg15-2", "What is its shape, temperature, movement, and intensity?", "Details"),
    q("cg15-3", "What name fits best: fear, anxiety, dread, nervousness, excitement?", "Name"),
    q("cg15-4", "What happens when I stop pushing the feeling away for 30 seconds?", "Space"),
    q("cg15-5", "What can I see, hear, and do while the feeling is still here?", "Expand"),
    q("cg15-6", "Am I practicing expansion to live better — or only to feel better?", "Agenda"),
    q("cg15-7", "What values-guided move will I take with this feeling present?", "Action"),
  ],

  "ch-16-riding-a-wild-stallion": [
    q("cg16-1", "What would it look like to stop fighting this fear for one minute?", "Allow"),
    q("cg16-2", "If fear is trying to protect me, what is it afraid I’ll lose?", "Befriend"),
    q("cg16-3", "How can I make use of all this energy in a values-guided activity?", "Channel"),
    q("cg16-4", "What warmer tone can I take toward fear without pretending I like it?", "Tone"),
    q("cg16-5", "Where is channeling possible right now, and where do I simply need willingness?", "Situation"),
    q("cg16-6", "When can I rehearse fear-whispering in a low-stakes setting today?", "Practice"),
  ],

  "ch-17-throw-off-the-bowlines": [
    q("cg17-1", "What daring adventure am I going to have?", "Adventure"),
    q("cg17-2", "What new frontiers will I explore?", "Frontiers"),
    q("cg17-3", "What important risks will I take?", "Risks"),
    q("cg17-4", "What sort of character do I want to build?", "Character"),
    q("cg17-5", "What do I want to stand for?", "Stand for"),
    q("cg17-6", "What short-, medium-, and long-term goals fit this adventure?", "Goals"),
    q("cg17-7", "What is the simplest, easiest thing I could do to start today?", "First step"),
    q("cg17-8", "Which do I choose: a daring adventure, or nothing?", "Choice"),
  ],

  "ch-18-whats-stopping-you": [
    q("cg18-1", "What story am I fusing with when I’m stuck?", "Story"),
    q("cg18-2", "Is this goal excessive? Am I trying to do too much, too soon?", "Goals"),
    q("cg18-3", "What thoughts and feelings am I trying to avoid or get rid of?", "Discomfort"),
    q("cg18-4", "What values am I forgetting, neglecting, or acting inconsistently with?", "Values"),
    q("cg18-5", "Am I willing to make room for discomfort in order to do what matters?", "Willingness"),
    q("cg18-6", "What resource am I missing, and how can I build, borrow, or start smaller?", "Resources"),
    q("cg18-7", "How do I eat this elephant one mouthful at a time?", "Elephant"),
    q("cg18-8", "Which pain am I choosing: growth discomfort or waiting-place pain?", "Pain choice"),
  ],

  "ch-19-the-motivation-trap": [
    q("cg19-1", "Where am I claiming something important is impossible because I don’t feel motivated?", "Trap"),
    q("cg19-2", "What am I doing instead of the valued action?", "Instead"),
    q("cg19-3", "Is this desire avoidance drive or values drive?", "Drive"),
    q("cg19-4", "If I let this desire dictate my actions, will it take my life where I want to go?", "Direction"),
    q("cg19-5", "Even though I don’t feel motivated, am I willing to do what makes life richer?", "Willingness"),
    q("cg19-6", "What five-minute action would honor commitment today?", "Five minutes"),
  ],

  "ch-20-the-power-of-self-acceptance": [
    q("cg20-1", "What harsh commentary shows up after I fall short?", "Unhook"),
    q("cg20-2", "How would I treat a friend in similar circumstances?", "Kindness"),
    q("cg20-3", "What did I do that was reasonable, brave, or an improvement — however small?", "Appreciate"),
    q("cg20-4", "How can I learn or grow from this? What could I do differently next time?", "Useful"),
    q("cg20-5", "What do I want to stand for in the face of this reality gap?", "Stand"),
    q("cg20-6", "What response would make me proud ten years from now?", "Future self"),
    q("cg20-7", "What is my next rebound action?", "Action"),
  ],

  "ch-21-getting-better": [
    q("cg21-1", "What did I do that worked?", "Worked"),
    q("cg21-2", "What did I do that didn’t work?", "Didn’t"),
    q("cg21-3", "What could I do differently next time around?", "Next"),
    q("cg21-4", "Do I value developing this skill further and persisting through obstacles?", "Values"),
    q("cg21-5", "Who can give me honest, practical, respectful feedback?", "Feedback"),
    q("cg21-6", "Where is self-doubt masquerading as useful awareness?", "Doubt"),
    q("cg21-7", "Where will I choose better over best this week?", "Better"),
  ],

  "ch-22-reach-the-peak": [
    q("cg22-1", "What is my pre-performance routine for defusion, expansion, and focus?", "Pre"),
    q("cg22-2", "What typically hooks me mid-performance, and how will I return?", "During"),
    q("cg22-3", "What worked, what didn’t, and what will I do differently next time?", "Post"),
    q("cg22-4", "Am I chasing flow as a feeling — or practicing engagement as a skill?", "Zone"),
    q("cg22-5", "In this area, am I content to be competent, or is excellence truly important?", "Excellence"),
    q("cg22-6", "What am I willing to give up for excellence — and what is not worth sacrificing?", "Sacrifice"),
    q("cg22-7", "How am I faring in love, work, play, and health this week?", "Balance"),
  ],

  "ch-23-it-aint-over-till-its-over": [
    q("cg23-1", "Where have I drifted, and how will I begin again without self-attack?", "Backslide"),
    q("cg23-2", "Where do I still expect instant confidence instead of practiced skill?", "Time"),
    q("cg23-3", "Which of the right rules do I most need to remember right now?", "Rules"),
    q("cg23-4", "What daring adventure am I continuing?", "Adventure"),
    q("cg23-5", "What skill will I rehearse this week: defusion, expansion, engagement, values, or committed action?", "Practice"),
    q("cg23-6", "How am I doing in love, work, play, and health — and what one adjustment matters most?", "Check-in"),
    q("cg23-7", "What do I want to stand for as I keep playing the confidence game?", "Stand"),
  ],

};
