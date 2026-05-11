function Card({ title, value, emoji, children }) {
  return (
    <div className="bg-white dark:bg-tsige-dark-card border border-tsige-pink-100 dark:border-tsige-dark-border shadow-md rounded-2xl p-5 flex flex-col items-center text-center hover:translate-y-[-4px] hover:shadow-lg transition-all duration-300 group font-body text-slate-900 dark:text-white">

      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{emoji}</div>

      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">
        {title}
      </h3>

      {value && (
        <p className="font-extrabold text-xl mt-1 text-slate-900 dark:text-white font-heading">
          {value}
        </p>
      )}

      {children}

    </div>
  )
}

export default Card