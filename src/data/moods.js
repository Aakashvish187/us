export const MOODS = [
  { id: 'peaceful', emoji: '😌', label: 'Peaceful', reply: 'Hold on to that calm. It suits you. 🌿' },
  { id: 'loved', emoji: '🥰', label: 'Loved', reply: 'Good. You are. Quietly, loudly, always. 💗' },
  { id: 'chaotic', emoji: '😂', label: 'Chaotic', reply: 'Of course. Chaos is just your love language. 😂' },
  { id: 'sleepy', emoji: '😴', label: 'Sleepy', reply: 'Go rest, madam. The story will wait. 🌙' },
  { id: 'happy', emoji: '❤️', label: 'Happy', reply: 'That makes two of us right now. ✨' },
  { id: 'missing', emoji: '🥺', label: 'Missing you', reply: 'Sending a very long, very quiet hug. 🫶' },
]

export const moodById = (id) => MOODS.find((m) => m.id === id)
