import { useState, useContext } from "react"
import AppContext from "../components/AppContext.js"

// Moved Toggle component outside to prevent re-creation on every render
const Toggle = ({ active, onToggle }) => (
  <button
    onClick={onToggle}
    className={`w-12 h-6 rounded-full transition-colors relative ${active ? 'bg-pink-500' : 'bg-slate-200 dark:bg-purple-900/50'}`}
  >
    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${active ? 'left-7' : 'left-1'}`} />
  </button>
)

// Moved Section component outside to prevent re-creation on every render
const Section = ({ title, children }) => (
  <div className="bg-white dark:bg-tsige-dark-card p-8 rounded-[2rem] border border-tsige-pink-100 dark:border-tsige-dark-border shadow-sm space-y-6">
    <h3 className="font-black text-xs uppercase tracking-widest text-tsige-pink-500">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
)

function Settings() {
  const { theme, setTheme } = useContext(AppContext)
  const [notifications, setNotifications] = useState(true)
  const [smartMode, setSmartMode] = useState(true)

  const themes = [
    { id: "pink", color: "bg-pink-400", ring: "ring-pink-100" },
    { id: "purple", color: "bg-purple-400", ring: "ring-purple-100" },
    { id: "peach", color: "bg-orange-400", ring: "ring-orange-100" },
  ]

  const themeColors = {
    pink: "text-tsige-pink-500",
    purple: "text-tsige-lavender-500",
    peach: "text-tsige-gold-400",
  }

  return (
    <div className="space-y-10">
      <header>
        <h1 className={`text-4xl font-black tracking-tight ${themeColors[theme] || 'text-pink-500'}`}>Settings</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2 font-bold uppercase text-xs tracking-widest font-ui">Tailor your tracking experience</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Section title="Appearance & Theme">
          <div className="flex justify-between items-center">
            <span className="font-bold text-slate-700 dark:text-slate-200 font-body">Color Palette</span>
            <div className="flex gap-2">
               {themes.map((t) => (
                 <button
                   key={t.id}
                   onClick={() => setTheme(t.id)}
                   className={`w-8 h-8 rounded-full ${t.color} transition-all ${
                     theme === t.id ? `ring-4 ${t.ring} scale-110` : "opacity-50 hover:opacity-100"
                   }`}
                 />
               ))}
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium italic font-body">Theme settings are synced with your system preferences by default.</p>
        </Section>

        <Section title="Cycle Logic">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
               <span className="font-bold text-slate-700 dark:text-slate-200 font-body">Smart Predictions</span>
               <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold leading-tight font-ui">Use history averages instead of standard 28 days</p>
            </div>
            <Toggle active={smartMode} onToggle={() => setSmartMode(!smartMode)} />
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-slate-700 dark:text-slate-200 font-body">Default Cycle Length</span>
            <input type="number" defaultValue={28} className="w-16 bg-tsige-pink-50 dark:bg-tsige-lavender-500/20 border-none rounded-lg p-2 text-center text-sm font-black text-tsige-pink-600 outline-none font-ui" />
          </div>
        </Section>

        <Section title="Notifications">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
               <span className="font-bold text-slate-700 dark:text-slate-200 font-body">Period Reminders</span>
               <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold leading-tight font-ui">Get alerted before your cycle starts</p>
            </div>
            <Toggle active={notifications} onToggle={() => setNotifications(!notifications)} />
          </div>
          <div className="flex justify-between items-center opacity-50">
             <span className="font-bold text-slate-700 dark:text-slate-200 font-body">Reminder Days Before</span>
             <select className="bg-transparent text-sm font-black text-tsige-pink-500 outline-none font-ui">
                <option>2 Days</option>
                <option>5 Days</option>
             </select>
          </div>
        </Section>

        <Section title="Privacy & Security">
           <div className="p-4 bg-tsige-pink-50 dark:bg-tsige-lavender-500/10 rounded-2xl border border-tsige-pink-100 dark:border-tsige-lavender-500/20">
              <div className="flex items-center gap-3 mb-2">
                 <span className="text-xl">🔒</span>
                 <span className="font-black text-tsige-pink-600 dark:text-tsige-pink-400 text-sm font-ui">Local-First Storage</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold leading-relaxed font-body">
                Your health data is stored directly in your browser's local storage. We do not transmit or store your biological data on our servers.
              </p>
           </div>
           <button className="w-full py-3 bg-red-50 dark:bg-red-900/20 text-red-500 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-red-100 transition-colors font-ui">
             Clear All Data
           </button>
        </Section>
      </div>
    </div>
  )
}

export default Settings