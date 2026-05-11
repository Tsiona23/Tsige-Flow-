import { useContext, useEffect } from "react"
import AppContext from "./AppContext.js"
import Navbar from "../components/Navbar"

function MainLayout({ children }) {
  const { darkMode, setDarkMode } = useContext(AppContext)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen transition-colors duration-500 flex flex-col lg:flex-row bg-tsige-light-beige dark:bg-tsige-dark-bg text-slate-900 dark:text-slate-100 font-body">
      {/* Dashboard Sidebar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Content Canvas */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-64 transition-all duration-500 font-body">
        <main className="flex-1 p-4 md:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout