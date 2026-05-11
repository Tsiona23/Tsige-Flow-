import { useState, useContext } from "react"
import AppContext from "./AppContext.js"
import { predictNextCycle } from "../utils/smartCycle"
import { getSymptomRecommendations } from "../utils/recommendations"
import { generateInsights } from "../utils/insightEngine"
import Card from "./Card"
import CycleForm from "./CycleForm"
import History from "./History"
import CalendarView from "./CalendarView"
import ConfirmationModal from "./ConfirmationModal"

function Dashboard({ history, setHistory }) {
  const { theme, activeStartDate, setActiveStartDate } = useContext(AppContext)

  const [mood, setMood] = useState("")
  const [symptoms, setSymptoms] = useState([])
  const [showSummary, setShowSummary] = useState(false)
  const [lastEntry, setLastEntry] = useState(null)

  const prediction = predictNextCycle(history, activeStartDate)
  // Get array of recommendations and join them into a single string for display
  const symptomTips = getSymptomRecommendations(symptoms).join(" ")
  const cycleInsights = generateInsights(history)

  function handleStartPeriod(date) {
    setActiveStartDate(date)
  }

  function handleEndPeriod() {
    if (!activeStartDate) return
    // Open modal to let user decide the date
    setShowSummary(true)
  }

  function handleConfirmEnd(selectedDate) {
    const start = new Date(activeStartDate)
    const end = new Date(selectedDate)
    const durationDays = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1

    const newEntry = {
      id: Date.now(),
      startDate: activeStartDate,
      endDate: selectedDate,
      duration: durationDays,
      mood,
      symptoms
    }

    setLastEntry(newEntry)
    setHistory([newEntry, ...history])
    setActiveStartDate(null)
    setMood("")
    setSymptoms([])
  }

  function deleteEntry(id) {
    setHistory(history.filter(e => e.id !== id))
  }

  const themeStyles = {
    pink: {
      gradient: "from-[#F8A8C4] via-[#F472B6] to-[#D946EF]",
      accent: "text-pink-500"
    },
    purple: {
      gradient: "from-[#C4B5FD] via-[#A78BFA] to-[#8B5CF6]",
      accent: "text-purple-500"
    },
    peach: {
      gradient: "from-[#FB923C] via-[#F97316] to-[#EA580C]",
      accent: "text-orange-500"
    }
  }

  return (
    <div className="space-y-12">
      {/* Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Cycle Day"
          emoji="🌱"
        >
          <div className="mt-2 w-full">
            <p className="text-xl font-black text-slate-900 dark:text-white font-heading">
              {prediction?.cycleDay ? `Day ${prediction.cycleDay}` : "N/A"}
            </p>
            {prediction?.cycleDay && (
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 bg-tsige-pink-500`}
                  style={{ width: `${Math.min(100, (prediction.cycleDay / prediction.avgCycle) * 100)}%` }}
                />
              </div>
            )}
          </div>
        </Card>

        <Card
          title="Next Prediction"
          emoji="🔮"
        >
          <p className="text-xl font-black text-slate-900 dark:text-white mt-1 font-heading">
            {prediction ? prediction.nextStart.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : "Waiting"}
          </p>
          {prediction && (
            <p className="text-[10px] font-black text-tsige-pink-600 dark:text-tsige-pink-400 mt-1 uppercase tracking-wider font-ui">
              In {Math.ceil((prediction.nextStart - new Date()) / (1000 * 60 * 60 * 24))} days
            </p>
          )}
        </Card>

        <Card
          title="Cycle Health"
          emoji="📏"
        >
          <p className="text-xl font-black text-slate-900 dark:text-white mt-1 font-heading">
            {cycleInsights?.cycleHealthScore || 0}%
          </p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 bg-emerald-500`} 
              style={{ width: `${cycleInsights?.cycleHealthScore || 0}%` }}
            />
          </div>
        </Card>

        <Card
          title="Cycle Status"
          emoji="🧠"
        >
          <div className="mt-2">
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest font-ui ${ // Status pill
              prediction?.irregular 
                ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" 
                : "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
            }`}>
              {prediction ? (prediction.irregular ? "Irregular" : "Stable") : "Unknown"}
            </span>
          </div>
        </Card>

        <Card
          title="Entries"
          value={history.length}
          emoji="📊"
        />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        <div className="xl:col-span-8 space-y-8">
          <CalendarView history={history} />
          <History history={history} deleteEntry={deleteEntry} />
        </div>

        <div className="xl:col-span-4 space-y-8">
          {/* SaaS Insight Panel */}
          <div className={`p-8 bg-gradient-to-br ${themeStyles[theme]?.gradient || themeStyles.pink.gradient} rounded-[2rem] text-white shadow-xl`}>
            <h3 className="font-black text-lg flex items-center gap-2 mb-8 text-white dark:text-white">
              <span className="font-heading">💡</span> Smart Prediction
            </h3>
            <div className="space-y-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/90 mb-2 font-ui">Cycle Phase</p>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black font-heading">{cycleInsights?.cyclePhase || "Analysing"}</span>
                </div>
              </div>
              <p className="text-sm font-bold leading-relaxed text-white italic font-body">
                {symptoms.length > 0 ? symptomTips : (prediction?.tip || "Start logging your cycle to get personalized tips.")}
              </p>
              <div className="pt-6 border-t border-white/20">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/90 font-ui">Prediction Reliability</p>
                  <span className="text-xs font-black font-ui">{cycleInsights?.cycleHealthScore || 0}%</span>
                </div>
                <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                  <div className="bg-white h-full transition-all duration-700" style={{ width: `${prediction?.confidence || 0}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {cycleInsights.insights.length > 0 && (
            <div className="p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-[2rem] shadow-xl">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400 mb-6 font-ui">Your Insights</h3>
              <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-200 font-medium font-body">
                {cycleInsights.insights.map((insight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-tsige-pink-500 text-lg leading-none">✨</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Cycle Form */}
          {/* This component remains as is, but its parent Dashboard now manages its state */}

          <CycleForm
            mood={mood}
            setMood={setMood}
            symptoms={symptoms}
            setSymptoms={setSymptoms}
            onStart={handleStartPeriod}
            onEnd={handleEndPeriod}
            isPeriodActive={!!activeStartDate}
            cycleDay={prediction?.cycleDay}
          />
        </div>
      </div>

      <ConfirmationModal
        isOpen={showSummary}
        onClose={() => {
          setShowSummary(false)
          setLastEntry(null)
        }}
        entry={lastEntry}
        prediction={prediction}
        onConfirm={handleConfirmEnd}
      />
    </div>
  )
}

export default Dashboard