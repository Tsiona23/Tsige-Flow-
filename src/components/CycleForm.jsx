import { useContext, useState } from "react"
import AppContext from "./AppContext.js"

function CycleForm({
  mood,
  setMood,
  symptoms,
  setSymptoms,
  onStart,
  onEnd,
  isPeriodActive,
  cycleDay
}) {
  const { theme } = useContext(AppContext)
  const [startDateInput, setStartDateInput] = useState(new Date().toISOString().split('T')[0])

  const symptomOptions = [
    "Cramps",
    "Headache",
    "Bloating",
    "Fatigue"
  ]

  function toggleSymptom(symptom) {
    if (symptoms.includes(symptom)) {
      setSymptoms(symptoms.filter(s => s !== symptom))
    } else {
      setSymptoms([...symptoms, symptom])
    }
  }

  const themeBg = {
    pink: "bg-gradient-to-r from-tsige-pink-500 to-tsige-pink-600 shadow-tsige-pink-500/25",
    purple: "bg-gradient-to-r from-tsige-lavender-500 to-tsige-lavender-600 shadow-tsige-lavender-500/25",
    peach: "bg-gradient-to-r from-tsige-gold-400 to-tsige-gold-500 shadow-tsige-gold-400/25",
  }

  return (
    <div className="bg-white dark:bg-tsige-dark-card border border-tsige-pink-100 dark:border-tsige-dark-border rounded-[2.5rem] p-8 shadow-xl transition-all duration-500 text-slate-900 dark:text-slate-100">
      {/* Active Status Badge */}
      {isPeriodActive && (
        <div className="flex justify-center mb-6">
          <div className="bg-tsige-pink-50 dark:bg-tsige-pink-500/10 text-tsige-pink-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse border border-tsige-pink-100 dark:border-tsige-pink-500/20">
            Currently tracking period • Day {cycleDay || 1}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-6 mb-8">
        {!isPeriodActive ? (
          <div className="space-y-6">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase px-1 font-ui">When did it start?</label>
              <input 
                type="date" 
                value={startDateInput}
                onChange={(e) => setStartDateInput(e.target.value)}
                className="bg-tsige-cream dark:bg-tsige-dark-bg border border-tsige-pink-100 dark:border-tsige-dark-border p-3 rounded-xl text-sm outline-none text-slate-900 dark:text-white w-full font-bold font-ui"
              />
            </div>
            <button
              onClick={() => onStart(startDateInput)}
              className={`group w-full ${themeBg[theme] || themeBg.pink} hover:scale-[1.02] active:scale-[0.98] text-white py-4 rounded-[1.5rem] transition-all duration-300 font-black uppercase tracking-[0.2em] shadow-xl shadow-pink-500/20 flex flex-col items-center justify-center gap-1`}
            >
              <span className="text-xl group-hover:animate-bounce font-heading">🩸</span>
              <span className="text-xs font-ui">Start Tracking</span>
            </button>
          </div>
        ) : (
          <button
            onClick={onEnd}
            className="w-full bg-white dark:bg-tsige-dark-card border-2 border-dashed border-tsige-pink-200 dark:border-tsige-pink-500/30 hover:bg-tsige-pink-50 dark:hover:bg-tsige-pink-500/10 hover:border-tsige-pink-300 text-tsige-pink-500 dark:text-tsige-pink-400 py-4 rounded-[1.5rem] transition-all duration-300 font-black uppercase tracking-[0.2em] flex flex-col items-center justify-center gap-1 font-ui"
          >
            <span className="text-xl">✔</span>
            <span className="text-xs">End Period</span>
          </button>
        )}
      </div>
      
      <div className="flex flex-col gap-1 mb-4">
        <label className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase px-1 font-ui">Mood</label>
        <select
          className="bg-tsige-cream dark:bg-tsige-dark-bg border border-tsige-pink-100 dark:border-tsige-dark-border p-4 rounded-2xl text-sm outline-none text-slate-900 dark:text-white w-full appearance-none font-ui"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        >
          <option value="">Select Mood</option>
          <option value="Happy">😊 Happy</option>
          <option value="Calm">🌸 Calm</option>
          <option value="Tired">😴 Tired</option>
          <option value="Irritated">😡 Irritated</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase px-1 block mb-2 font-ui">Symptoms</label>
        <div className="flex flex-wrap gap-2 justify-center">
          {symptomOptions.map((s) => (
            <button
              key={s}
              onClick={() => toggleSymptom(s)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 border ${
                symptoms.includes(s)
                  ? `${themeBg[theme] || 'bg-tsige-pink-500'} text-white shadow-lg font-ui`
                  : "bg-tsige-cream dark:bg-tsige-dark-bg text-slate-600 dark:text-slate-400 hover:bg-tsige-pink-50 dark:hover:bg-tsige-dark-border font-ui"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CycleForm