import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import AIChat from './components/AIChat'
import PatientIntake from './components/PatientIntake'
import NoteSummarization from './components/NoteSummarization'
import AppointmentManager from './components/AppointmentManager'

function App() {
  const [activeView, setActiveView] = useState('dashboard')

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />
      case 'ai-chat':
        return <AIChat />
      case 'intake':
        return <PatientIntake />
      case 'notes':
        return <NoteSummarization />
      case 'appointments':
        return <AppointmentManager />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <div className="flex">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-1 p-6 ml-64">
          <div className="max-w-screen-xl mx-auto">
            {renderActiveView()}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App