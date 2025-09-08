import React from 'react'
import { Bell, Settings, User } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className="bg-white/10 backdrop-blur-lg border-b border-white/20 px-6 py-4">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">+</span>
          </div>
          <h1 className="text-white text-xl font-semibold">HealthFlow AI</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
            <Bell size={20} />
          </button>
          <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
            <Settings size={20} />
          </button>
          <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
            <User size={16} className="text-white/80" />
            <span className="text-white text-sm">Dr. Sarah Smith</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar