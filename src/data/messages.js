export const HEART_MESSAGES = [
  'Somewhere between hello and goodnight, you became my favorite notification.',
  "Day 10 and I'm still curious about you.",
  'Maybe the best stories start unexpectedly.',
  "You're becoming one of my favorite parts of the day.",
  "One day we'll look back at Day 10 and smile.",
  'Tu vaat kare ne, mood automatically better thai jaay che. ❤️',
  'Apdi story haji beginning ma che... pan beginning already saras che.',
  'Calendar toh days count kare che, mane toh memories count karvi che.',
  'Thodu thodu kari ne tu special thati jaay che. 😌',
  'Some things begin as timepass, and quietly become the greatest decision of your life.',
  'Timepass was the excuse. You were always the reason.',
]

// Daily note. Day 10 is the hand-written one; other days rotate softly.
export const DAY10_NOTE = `Day 10 already?

Honestly, I didn't expect a random meeting to turn into something I'd look forward to every day.

Sanjana,
I don't need to know the ending yet.

I'm enjoying the story.`

const OPENERS = [
  'Another day, another reason to smile.',
  'Quick note before the day gets busy.',
  'Good to be on this page with you.',
  'Small note, big feelings.',
]
const MIDDLES = [
  'I caught myself thinking about you in the middle of nothing, and that says a lot.',
  'Some days are just better because a certain someone exists in them.',
  'I like how easy it is to talk to you. It feels like I have known you longer.',
  'Not every chapter needs fireworks. Some are good because you are in them.',
]
const CLOSERS = [
  'Still curious. Still smiling.',
  'No rush at all. I like where this is going.',
  'Thank you for being part of my days.',
  'Let us keep writing this slowly.',
]

export function noteForDay(day) {
  if (day === 10) return DAY10_NOTE
  const i = day % OPENERS.length
  return `Day ${day} already?

${OPENERS[i]} ${MIDDLES[(day + 1) % MIDDLES.length]}

Sanjana,
${CLOSERS[(day + 2) % CLOSERS.length]}`
}
