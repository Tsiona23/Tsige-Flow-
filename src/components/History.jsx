import { useState } from "react"

function History({ history, deleteEntry }) {
  const [filter, setFilter] = useState("")

  const filteredHistory = history.filter(entry => 
    entry.startDate.includes(filter) || entry.mood?.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="bg-white dark:bg-tsige-dark-card rounded-3xl border border-tsige-pink-100 dark:border-tsige-dark-border shadow-sm overflow-hidden font-body text-slate-900 dark:text-white">
      <div className="p-6 border-b border-tsige-pink-100 dark:border-tsige-dark-border flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
          Cycle History
        </h2>
        <input 
          type="text" 
          placeholder="Search history..." 
          className="bg-tsige-cream dark:bg-tsige-dark-bg border border-tsige-pink-100 dark:border-tsige-dark-border rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white outline-none w-full sm:w-64 font-ui"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {filteredHistory.length === 0 ? (
        <p className="text-center text-slate-500 dark:text-slate-400 py-20 font-body">
          No entries yet
        </p>
      ) : (
        <div className="divide-y divide-slate-50 dark:divide-slate-800">
          {filteredHistory.map((entry) => (
          <div
            key={entry.id}
            className="p-5 flex justify-between items-center hover:bg-tsige-pink-50 dark:hover:bg-tsige-dark-bg/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-tsige-pink-50 dark:bg-tsige-pink-500/10 rounded-xl flex items-center justify-center text-xl shadow-inner text-slate-800 dark:text-white">🩸</div>
              <div>
                <p className="font-extrabold text-lg text-slate-900 dark:text-white font-heading">
                  {new Date(entry.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} — {entry.endDate ? new Date(entry.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '...'}
                </p>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase tracking-widest font-ui">{entry.mood || "No mood recorded"}</p>
              </div>
            </div>

            <button
              onClick={() => deleteEntry(entry.id)}
              className="text-red-400 hover:text-red-500 p-2 font-bold text-xs uppercase tracking-tighter transition-colors font-ui"
            >
              Delete
            </button>
          </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default History