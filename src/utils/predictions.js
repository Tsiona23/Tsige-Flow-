export function getNextPeriod(startDate, cycleLength = 28) {
  if (!startDate) return null

  const date = new Date(startDate)
  date.setDate(date.getDate() + cycleLength)

  return date
}

export function getOvulationWindow(startDate) {
  if (!startDate) return null

  const start = new Date(startDate)

  // ovulation ~ day 14
  const ovulation = new Date(start)
  ovulation.setDate(start.getDate() + 14)

  const fertileStart = new Date(start)
  fertileStart.setDate(start.getDate() + 11)

  const fertileEnd = new Date(start)
  fertileEnd.setDate(start.getDate() + 16)

  return {
    ovulation,
    fertileStart,
    fertileEnd
  }
}