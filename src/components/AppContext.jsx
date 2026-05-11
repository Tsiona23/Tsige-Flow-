import { useState } from "react"
import AppContext from "./AppContext.js"
import useLocalStorage from "../hooks/useLocalStorage"

export function AppProvider({ children }) {
  const [history, setHistory] = useLocalStorage("cycle-history", [])
  const [darkMode, setDarkMode] = useLocalStorage(
    "dark-mode-enabled",
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false
  )
  const [theme, setTheme] = useLocalStorage("app-theme", "pink")
  const [activeStartDate, setActiveStartDate] = useLocalStorage("active-period-start", null)

  const contextValue = {
    history,
    setHistory,
    darkMode,
    setDarkMode,
    theme,
    setTheme,
    activeStartDate,
    setActiveStartDate
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}