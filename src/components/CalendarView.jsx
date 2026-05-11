import { useState, useContext } from "react"
import AppContext from "./AppContext.js"
import { predictNextCycle } from "../utils/smartCycle"

function CalendarView({ history }) {
  const { theme, activeStartDate } = useContext(AppContext)
  const [viewDate, setViewDate] = useState(new Date())
  // eslint-disable-next-line no-unused-vars
  const today = new Date()

  const prediction = predictNextCycle(history, activeStartDate)

  const currentMonth = viewDate.getMonth()
  const currentYear = viewDate.getFullYear()

  const daysInMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate()

  const firstDay = new Date(
    currentYear,
    currentMonth,
    1
  ).getDay()

  const days = []

  // empty slots before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }

  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d)
  }

  const normalizeDate = (d) => {
    const date = new Date(d)
    date.setHours(0, 0, 0, 0)
    return date.getTime()
  }

  function isFertileWindow(day) {
    if (!prediction) return false
    
    const dateTs = normalizeDate(new Date(currentYear, currentMonth, day))
    const startTs = normalizeDate(prediction.fertileStart)
    const endTs = normalizeDate(prediction.fertileEnd)
    
    return dateTs >= startTs && dateTs <= endTs
  }

  function isActivePeriod(day) {
    if (!activeStartDate) return false
    const dateTs = normalizeDate(new Date(currentYear, currentMonth, day))
    const startTs = normalizeDate(activeStartDate)
    const todayTs = normalizeDate(new Date())
    return dateTs >= startTs && dateTs <= todayTs
  }

  function isInCycle(day) {
    const dateTs = normalizeDate(new Date(currentYear, currentMonth, day))
    return history.some(entry => 
      dateTs >= normalizeDate(entry.startDate) && 
      dateTs <= normalizeDate(entry.endDate)
    )
  }

  function isNextPeriod(day) {
    if (!prediction) return false
    const dateTs = normalizeDate(new Date(currentYear, currentMonth, day))
    const nextStartTs = normalizeDate(prediction.nextStart)
    
    // Highlight 5 days for the predicted period
    const nextEndTs = new Date(prediction.nextStart)
    nextEndTs.setDate(nextEndTs.getDate() + 4)
    const endTs = normalizeDate(nextEndTs)

    return dateTs >= nextStartTs && dateTs <= endTs
  }

  function isOvulation(day) {
    if (!prediction) return false
    const dateTs = normalizeDate(new Date(currentYear, currentMonth, day))
    return dateTs === normalizeDate(prediction.ovulation)
  }

  return (
    <div className="bg-white dark:bg-tsige-dark-card rounded-3xl border border-tsige-pink-100 dark:border-tsige-dark-border shadow-sm p-8 font-body text-slate-700 dark:text-slate-100">

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white capitalize font-heading">
          {viewDate.toLocaleString('default', { month: 'long' })} {currentYear}
        </h2>
        <div className="flex gap-2">
          <button onClick={() => setViewDate(new Date(currentYear, currentMonth - 1))} className="w-10 h-10 flex items-center justify-center bg-tsige-cream dark:bg-tsige-dark-bg hover:bg-tsige-pink-50 dark:hover:bg-tsige-dark-border rounded-xl transition-colors text-slate-600 dark:text-slate-400">←</button>
          <button onClick={() => setViewDate(new Date(currentYear, currentMonth + 1))} className="w-10 h-10 flex items-center justify-center bg-tsige-cream dark:bg-tsige-dark-bg hover:bg-tsige-pink-50 dark:hover:bg-tsige-dark-border rounded-xl transition-colors text-slate-600 dark:text-slate-400">→</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">

        {["S","M","T","W","T","F","S"].map((d, i) => (
          <div key={i} className="font-bold text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-widest pb-4 font-ui">
            {d}
          </div>
        ))}

        {days.map((day, i) => {

          if (!day) {
            return <div key={i}></div>
          }

          let style =
            "aspect-square flex items-center justify-center rounded-2xl text-sm transition-all duration-300 relative border border-transparent font-semibold text-slate-700 dark:text-slate-200"

          if (isFertileWindow(day)) {
            style += " bg-tsige-lavender-50 dark:bg-tsige-lavender-500/10 text-tsige-lavender-600 dark:text-tsige-lavender-300 border-tsige-lavender-100 dark:border-tsige-lavender-500/20"
          }

          const themeBg = {
            pink: "bg-tsige-pink-500",
            purple: "bg-tsige-lavender-500",
            peach: "bg-tsige-gold-400"
          }

          if (isInCycle(day) || isActivePeriod(day)) {
            style += ` ${themeBg[theme]} !text-white font-bold shadow-lg shadow-tsige-pink-500/20`
          }

          if (isOvulation(day)) {
            const ringColor = theme === 'purple' ? 'ring-tsige-lavender-400' : theme === 'peach' ? 'ring-tsige-gold-400' : 'ring-tsige-pink-400'
            style += ` ring-2 ${ringColor} ring-offset-2 dark:ring-offset-tsige-dark-bg`
          }

          if (isNextPeriod(day)) {
            style += " border-2 border-dashed border-tsige-pink-400/50"
          }

          return (
            <div key={i} className={style}>
              {day}
            </div>
          )
        })}

      </div>
    </div>
  )
}

export default CalendarView