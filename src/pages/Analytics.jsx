import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"

import Card from "../components/Card"
import { predictNextCycle } from "../utils/smartCycle"
import { generateInsights } from "../utils/insightEngine"
import { useContext } from "react"
import AppContext from "../components/AppContext.js"

function Analytics() {
  const { history, theme, darkMode } = useContext(AppContext)

  // transform data for chart
  const sortedHistory = [...history].sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
  
  const chartData = sortedHistory.map((item, index) => {
    const start = new Date(item.startDate)
    const end = new Date(item.endDate)
    const length = Math.round((end - start) / (1000 * 60 * 60 * 24)) || 5
    
    return {
    day: index + 1,
    date: new Date(item.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    duration: length,
    mood: item.mood === "Happy"
      ? 3
      : item.mood === "Calm"
      ? 2
      : item.mood === "Tired"
      ? 1
      : 0
    }
  })

  // Symptom frequency
  const symptomMap = {}
  history.forEach(entry => {
    entry.symptoms?.forEach(s => {
      symptomMap[s] = (symptomMap[s] || 0) + 1
    })
  })
  const symptomData = Object.keys(symptomMap).map(key => ({ name: key, count: symptomMap[key] }))

  const prediction = predictNextCycle(history)
  const cycleInsights = generateInsights(history)

  const themeColors = {
    pink: "#F472B6",
    purple: "#A78BFA",
    peach: "#FB923C",
  }

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl font-black text-tsige-pink-500 tracking-tight font-heading text-slate-900 dark:text-white">
          Insights & Analytics
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2 font-bold uppercase text-xs tracking-widest font-ui">Wellness trends based on your history</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card title="Health Score" value={`${cycleInsights?.cycleHealthScore || 0}%`} emoji="🌡️" />
         <Card title="Cycle Status" value={prediction?.irregular ? "⚠️ Irregular" : "✅ Regular"} emoji="🧠" />
         <Card title="Logged Cycles" value={history.length} emoji="📖" />
      </div>

      {history.length === 0 ? (
        <div className="p-20 text-center bg-white dark:bg-tsige-dark-card rounded-[2rem] border-2 border-dashed border-tsige-pink-100 dark:border-tsige-dark-border">
           <p className="text-slate-500 dark:text-slate-400 font-bold italic font-body">No data yet. Keep logging to see trends.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-tsige-dark-card p-8 rounded-[2.5rem] shadow-sm border border-tsige-pink-100 dark:border-tsige-dark-border">
            <h3 className="font-black text-slate-900 dark:text-white mb-8 font-heading">Mood vs Cycle Duration</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={themeColors[theme] || "#F472B6"} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={themeColors[theme] || "#F472B6"} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} strokeOpacity={0.1} vertical={false} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: darkMode ? '#cbd5e1' : '#475569', fontSize: 10, fontFamily: 'Inter' }} />
                  <YAxis dataKey="mood" axisLine={false} tickLine={false} tick={{ fill: darkMode ? '#cbd5e1' : '#475569', fontSize: 10, fontFamily: 'Inter' }} />
                  <Tooltip contentStyle={{
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    backgroundColor: darkMode ? '#0f172a' : '#ffffff',
                    color: darkMode ? '#e2e8f0' : '#0f172a'
                  }} cursor={{ fill: darkMode ? '#1f2937' : '#fdf2f8' }} />
                  <Legend iconType="circle" wrapperStyle={{ color: darkMode ? '#e2e8f0' : '#0f172a' }} />
                  <Area name="Mood Level" type="monotone" dataKey="mood" stroke={themeColors[theme] || "#F472B6"} fillOpacity={1} fill="url(#colorMood)" strokeWidth={4} fontFamily="Inter" />
                  <Area name="Period Duration" type="monotone" dataKey="duration" stroke={darkMode ? '#94a3b8' : '#94a3b8'} fill="transparent" strokeWidth={2} strokeDasharray="5 5" fontFamily="Inter" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-tsige-dark-card p-8 rounded-[2.5rem] shadow-sm border border-tsige-pink-100 dark:border-tsige-dark-border">
            <h3 className="font-black text-slate-900 dark:text-white mb-8 font-heading">Symptom Frequency</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={symptomData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} strokeOpacity={0.1} vertical={false} fontFamily="Inter" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: darkMode ? '#cbd5e1' : '#475569', fontSize: 10, fontFamily: 'Inter' }} />
                  <YAxis dataKey="count" axisLine={false} tickLine={false} tick={{ fill: darkMode ? '#cbd5e1' : '#475569', fontSize: 10, fontFamily: 'Inter' }} />
                  <Tooltip cursor={{ fill: darkMode ? '#111827' : '#FDF2F8' }} contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: darkMode ? '#0f172a' : '#ffffff', color: darkMode ? '#e2e8f0' : '#0f172a' }} />
                  <Bar dataKey="count" fill={themeColors[theme] || "#F472B6"} radius={[10, 10, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {cycleInsights.insights.length > 0 && (
        <div className="bg-white dark:bg-tsige-dark-card p-8 rounded-[2.5rem] shadow-sm border border-tsige-pink-100 dark:border-tsige-dark-border">
          <h3 className="font-black text-slate-900 dark:text-white mb-8 font-heading">Key Insights</h3>
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


    </div>
  )
}

export default Analytics