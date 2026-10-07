export const MILESTONES = [
  { id: 'd10', label: 'Day 10', emoji: '❤️', days: 10, text: 'Double digits. The story officially has a first chapter.' },
  { id: 'd14', label: 'Day 14', emoji: '🌸', days: 14, text: 'Two whole weeks. Still curious, still smiling.' },
  { id: 'm1', label: '1 Month', emoji: '🌙', days: 30, text: 'One month of us. The plot is getting good.' },
  { id: 'd50', label: '50 Days', emoji: '✨', days: 50, text: 'Fifty days of little moments adding up.' },
  { id: 'd100', label: '100 Days', emoji: '💫', days: 100, text: 'A hundred days. We should celebrate, obviously.' },
  { id: 'y1', label: '1 Year', emoji: '💍', days: 365, text: 'A whole year. Look how far the story came.' },
]

export const nextMilestone = (day) => MILESTONES.find((m) => m.days > day) ?? null
