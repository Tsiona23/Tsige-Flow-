import { BrowserRouter, Routes, Route } from "react-router-dom"

import { AppProvider } from "./components/AppContext.jsx"
import MainLayout from "./components/MainLayout.jsx"

import Home from "./pages/Home"
import Analytics from "./pages/Analytics"
import Settings from "./pages/settings"

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </MainLayout>
      </AppProvider>
    </BrowserRouter>
  )
}

export default App