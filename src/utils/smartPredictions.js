export function getCycleLengths(history) {
  if (history.length < 2) return []

  const sorted = [...history]
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))

  const lengths = []

  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1].startDate)
    const current = new Date(sorted[i].startDate)

    const diff = Math.round(
      (current - prev) / (1000 * 60 * 60 * 24)
    )

    lengths.push(diff)
  }

  return lengths
}

export function getAverageLength(lengths) {
  if (!lengths.length) return 28
  const sum = lengths.reduce((a, b) => a + b, 0)
  return Math.round(sum / lengths.length)
}

export function getNextPeriod(history) {
  if (!history.length) return null

  const sorted = [...history].sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  )

  const lastStart = new Date(sorted[sorted.length - 1].startDate)
  const lengths = getCycleLengths(history)
  const avg = getAverageLength(lengths)

  const next = new Date(lastStart)
  next.setDate(next.getDate() + avg)

  return next
}