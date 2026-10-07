// ✏️ Aakash: set the real answers! `correct` is 'a' or 'b'.
export const QUIZ = [
  {
    q: 'Chai or coffee: what would Aakash choose?',
    a: { emoji: '🍵', label: 'Chai' },
    b: { emoji: '☕', label: 'Coffee' },
    correct: 'a',
  },
  {
    q: 'Night drive or morning walk?',
    a: { emoji: '🌃', label: 'Night drive' },
    b: { emoji: '🌅', label: 'Morning walk' },
    correct: 'a',
  },
  {
    q: 'Movie night or food date?',
    a: { emoji: '🎬', label: 'Movie night' },
    b: { emoji: '🍕', label: 'Food date' },
    correct: 'b',
  },
  {
    q: 'Mountains or beach?',
    a: { emoji: '⛰️', label: 'Mountains' },
    b: { emoji: '🏖️', label: 'Beach' },
    correct: 'a',
  },
  {
    q: 'Long calls or endless texting?',
    a: { emoji: '📞', label: 'Long calls' },
    b: { emoji: '💬', label: 'Endless texting' },
    correct: 'a',
  },
]

export function verdict(percent) {
  if (percent >= 80) return 'Okayyy Sanjana knows him too well 👀❤️'
  if (percent >= 50) return 'Not bad... more dates required 😌'
  return 'Madam, training sessions are required 😂❤️'
}
