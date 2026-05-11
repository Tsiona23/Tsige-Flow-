import { Link, useLocation } from "react-router-dom"
import { useContext } from "react"
import AppContext from "./AppContext.js"

function Navbar({ darkMode, setDarkMode }) {
  const { theme } = useContext(AppContext)
  const location = useLocation()

  const navItems = [
    { path: "/", icon: "🏠", label: "Dashboard" },
    { path: "/analytics", icon: "📊", label: "Insights" },
    { path: "/settings", icon: "⚙️", label: "Settings" }
  ]

  const themeColors = {
    pink: "text-tsige-pink-500 bg-tsige-pink-50 dark:bg-tsige-pink-500/10 dark:text-tsige-pink-400",
    purple: "text-tsige-lavender-500 bg-tsige-lavender-50 dark:bg-tsige-lavender-500/10 dark:text-tsige-lavender-400",
    peach: "text-tsige-gold-400 bg-tsige-gold-50 dark:bg-tsige-gold-400/10 dark:text-tsige-gold-300",
  }

  return (
    <>
      {/* Mobile Top Navigation */}
      <nav className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-tsige-dark-card border-b border-tsige-pink-100 dark:border-tsige-dark-border sticky top-0 z-40 font-ui transition-colors shadow-sm text-slate-900 dark:text-white">
        <h1 className={`text-xl font-bold font-heading ${theme === 'purple' ? 'text-tsige-lavender-500' : theme === 'peach' ? 'text-tsige-gold-400' : 'text-tsige-pink-500'}`}>🌼</h1>
        <div className="flex gap-4">
          {navItems.map(item => (
            <Link key={item.path} to={item.path} className={location.pathname === item.path ? (theme === 'purple' ? 'text-tsige-lavender-500' : theme === 'peach' ? 'text-tsige-gold-400' : 'text-tsige-pink-500') : "text-slate-600 dark:text-slate-400 transition-colors"}>{item.icon}</Link>
          ))}
          <button onClick={() => setDarkMode(!darkMode)} className="text-lg">{darkMode ? "☀️" : "🌙"}</button>
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden lg:flex flex-col w-64 border-r border-tsige-pink-100 dark:border-tsige-dark-border bg-white dark:bg-tsige-dark-card font-ui">
        <div className="p-8">
          <h1 className="text-2xl font-black tracking-tighter flex items-center gap-2 font-heading text-slate-900 dark:text-white transition-colors">
            <span className={theme === 'purple' ? 'text-tsige-lavender-500' : theme === 'peach' ? 'text-tsige-gold-400' : 'text-tsige-pink-500'}>🌼</span>
            <span>Tsige Flow</span>
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? themeColors[theme] + " shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:bg-tsige-pink-50/50 dark:hover:bg-tsige-dark-bg/50 hover:text-tsige-pink-500 transition-colors"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-6 border-t border-tsige-pink-50 dark:border-tsige-dark-border">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-3 w-full px-5 py-3 rounded-2xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-tsige-pink-50/50 dark:hover:bg-tsige-dark-bg/50 hover:text-tsige-pink-500 transition-colors"
          >
            <span className="text-lg">{darkMode ? "☀️" : "🌙"}</span>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </aside>
    </>
  )
}

export default Navbar