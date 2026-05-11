export function predictNextCycle(history, activeStartDate = null) {

  if (!history.length && !activeStartDate) return null

  const sorted = [...history].sort(
    (a, b) =>
      new Date(a.startDate) - new Date(b.startDate)
  )

  const cycles = []

  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1].startDate)
    const curr = new Date(sorted[i].startDate)

    const diff = Math.round(
      (curr - prev) / (1000 * 60 * 60 * 24)
    )

    cycles.push(diff)
  }

  const avgCycle =
    cycles.reduce((a, b) => a + b, 0) /
    (cycles.length || 1)

  const variance = cycles.length < 3 ? 0 :
    cycles.reduce((acc, val) => acc + Math.abs(val - avgCycle), 0) / cycles.length

  // Use active start date if available, otherwise last history entry
  const lastStartStr = activeStartDate || (sorted.length > 0 ? sorted[sorted.length - 1].startDate : null)
  if (!lastStartStr) return null

  const last = new Date(lastStartStr)

  const next = new Date(last)
  next.setDate(next.getDate() + (avgCycle || 28))

  // Calculate Cycle Phase based on last start date
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  // If period is active, phase calculation is based on that start date
  const daysSinceStart = Math.floor((today - last) / (1000 * 60 * 60 * 24))
  
  let phase = "Follicular"
  let tip = "Focus on light exercise and iron-rich foods."
  
  if (daysSinceStart >= 0 && daysSinceStart <= 5) {
    phase = "Menstrual"
    tip = "Rest is priority. Stay warm and hydrated."
  } else if (daysSinceStart >= 12 && daysSinceStart <= 16) {
    phase = "Ovulatory"
    tip = "Energy is peaking. Great time for social activities!"
  } else if (daysSinceStart > 16) {
    phase = "Luteal"
    tip = "Magnesium can help with cravings and mood."
  }

  // Confidence score (100 - variance * factor)
  const confidenceScore = Math.max(0, Math.min(100, 100 - (variance * 10)))
  
  // Current Cycle Day
  const cycleDay = daysSinceStart >= 0 ? daysSinceStart + 1 : null

  const ovulation = new Date(next)
  ovulation.setDate(ovulation.getDate() - 14)

  const fertileStart = new Date(ovulation)
  fertileStart.setDate(fertileStart.getDate() - 5)
  const fertileEnd = new Date(ovulation)
  fertileEnd.setDate(fertileEnd.getDate() + 1)

  return {
    nextStart: next,
    cycleLength: Math.round(avgCycle || 28),
    irregular: variance > 5,
    phase,
    tip,
    confidence: Math.round(confidenceScore),
    lastStartDate: lastStartStr,
    cycleDay,
    ovulation: ovulation,
    fertileStart,
    fertileEnd,
    daysSinceStart,
    avgCycle: Math.round(avgCycle || 28)
  }
}