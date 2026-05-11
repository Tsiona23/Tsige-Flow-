import Dashboard from "../components/Dashboard"
import { useContext } from "react"
import AppContext from "../components/AppContext.js"

function Home() {
  const { history, setHistory } = useContext(AppContext)

  return (
    <div className="space-y-10 font-body text-slate-900 dark:text-slate-100">
      <header className="mb-8">
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-heading">
          Dashboard
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-1 text-lg">
          Monitor your cycle trends and physical wellness.
        </p>
      </header>

      <Dashboard history={history} setHistory={setHistory} />
    </div>
  )
}

export default Home