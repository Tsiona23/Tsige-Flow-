import { useState } from "react"

function ConfirmationModal({ isOpen, onClose, entry, prediction, onConfirm }) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  if (!isOpen) return null

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })
  }

  if (!entry) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
        <div className="bg-white dark:bg-tsige-dark-card w-full max-w-[320px] rounded-[2.5rem] p-6 shadow-2xl border border-tsige-pink-100 dark:border-tsige-dark-border transition-colors text-slate-900 dark:text-white">
          <div className="text-center">
            <h2 className="text-xl font-black tracking-tight mb-4 text-left font-heading">When did it end?</h2>
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-4 bg-tsige-cream dark:bg-tsige-dark-bg rounded-2xl mb-6 outline-none border-2 border-tsige-pink-100 dark:border-tsige-dark-border focus:border-tsige-pink-400 transition-all font-bold text-slate-900 dark:text-white font-ui"
            />
            <button
              onClick={() => onConfirm(selectedDate)} // Pass selectedDate to onConfirm
              className="w-full bg-tsige-pink-500 hover:bg-tsige-pink-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-tsige-pink-500/20 font-ui"
            >
              Confirm & Save
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-tsige-dark-card w-full max-w-[320px] rounded-[2.5rem] p-6 shadow-2xl border border-tsige-pink-100 dark:border-tsige-dark-border animate-in zoom-in slide-in-from-bottom-8 duration-500 text-slate-900 dark:text-white">
        <div className="text-center">
          <div className="w-16 h-16 bg-tsige-pink-50 dark:bg-tsige-pink-500/10 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-inner font-heading text-tsige-pink-500 dark:text-tsige-pink-300">
            📅
          </div>
          
          <h2 className="text-2xl font-black tracking-tight mb-2 font-heading">Period Summary</h2>
          <p className="text-slate-600 dark:text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 font-ui">Cycle Logged Successfully</p>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center p-3 bg-tsige-cream dark:bg-tsige-dark-bg rounded-2xl border border-tsige-pink-50 dark:border-tsige-dark-border">
              <span className="text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-tighter font-ui">Start Date</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 font-ui">{formatDate(entry.startDate)}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-tsige-cream dark:bg-tsige-dark-bg rounded-2xl border border-tsige-pink-50 dark:border-tsige-dark-border">
              <span className="text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-tighter font-ui">End Date</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 font-ui">{formatDate(entry.endDate)}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-tsige-pink-50 dark:bg-tsige-pink-500/10 rounded-2xl border border-tsige-pink-100 dark:border-tsige-pink-500/30">
              <span className="text-xs font-black text-tsige-pink-600 dark:text-tsige-pink-400 uppercase tracking-tighter font-ui">Total Duration</span>
              <span className="font-black text-tsige-pink-700 dark:text-tsige-pink-300 font-ui">{entry.duration} Days</span>
            </div>
          </div>
          
          {prediction && (
            <div className="mb-6 p-4 bg-tsige-lavender-50 dark:bg-tsige-lavender-500/10 rounded-2xl text-left border border-tsige-lavender-100 dark:border-tsige-lavender-500/30">
              <p className="text-[10px] font-black text-tsige-lavender-600 dark:text-tsige-lavender-400 uppercase tracking-widest mb-1 font-ui">Next Prediction</p>
              <p className="text-sm font-bold text-tsige-lavender-800 dark:text-tsige-lavender-100 italic font-body">
                Your next period is estimated to start on {formatDate(prediction.nextStart)}.
              </p>
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full bg-tsige-dark-bg dark:bg-tsige-pink-50 text-white dark:text-tsige-dark-bg py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:scale-[1.02] active:scale-95 shadow-xl font-ui"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal