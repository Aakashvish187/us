const photo = (name) => `${import.meta.env.BASE_URL}photos/${name}`

export const TIMELINE = [
  { day: 1, title: 'That first meeting.', blurb: 'A hello that did not feel like just a hello.', photo: photo('garden.jpg') },
  { day: 2, title: 'Getting to know you.', blurb: 'Small questions, long answers, and a lot of curiosity.', photo: photo('mural.jpg') },
  { day: 3, title: 'More conversations.', blurb: 'Somehow there was always one more thing to say.', photo: photo('plaid.jpg') },
  { day: 4, title: 'Another little memory.', blurb: 'The kind of day you only notice later.', photo: photo('hands.jpg') },
  {
    day: 5,
    title: 'Okay... this is becoming something.',
    blurb: 'The moment the story stopped feeling accidental.',
    photo: photo('flower.jpg'),
  },
  { day: 6, title: 'Still talking.', blurb: 'And nobody was in a hurry to stop.', photo: photo('cave.jpg') },
  {
    day: 7,
    title: 'One week ❤️',
    blurb: 'Seven days. Seven reasons I kept checking my phone.',
    photo: photo('night.jpg'),
  },
  { day: 8, title: 'More reasons to smile.', blurb: 'Your name started showing up in my best moments.', photo: photo('flare.jpg') },
  {
    day: 9,
    title: 'Almost double digits.',
    blurb: 'Golden-hour laughter, and a day I want to keep.',
    photo: photo('sunset.jpg'),
  },
  { day: 10, title: 'Here we are. ❤️', blurb: 'Ten days in, and I still want to know what happens next.', photo: photo('laugh.jpg') },
]

const EXTRA = [
  ['One more chapter.', 'Another day added to the story.'],
  ['Still here, still smiling.', 'Some things do not need a reason.'],
  ['Little things, big feelings.', 'A tiny moment that stayed.'],
  ['The story keeps going.', 'And I keep turning the page.'],
  ['Another day with you in it.', 'Easily the best part of it.'],
]

export function extraDay(n) {
  const [title, blurb] = EXTRA[(n - 11) % EXTRA.length]
  return { day: n, title, blurb }
}

// Timeline always has at least 10 days and grows as the days pass.
export function buildTimeline(currentDay) {
  const total = Math.max(10, currentDay)
  return Array.from({ length: total }, (_, i) => TIMELINE[i] ?? extraDay(i + 1))
}
