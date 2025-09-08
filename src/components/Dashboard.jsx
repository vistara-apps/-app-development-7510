import React from 'react'
import StatsCard from './StatsCard'
import ChatPreview from './ChatPreview'
import AppointmentPreview from './AppointmentPreview'
import NotesPreview from './NotesPreview'
import { Users, MessageSquare, FileText, Calendar } from 'lucide-react'

const Dashboard = () => {
  const stats = [
    {
      title: 'Active Patients',
      value: '2,847',
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Chat Interactions',
      value: '1,249',
      change: '+8%',
      icon: MessageSquare,
      color: 'bg-green-500'
    },
    {
      title: 'Notes Processed',
      value: '456',
      change: '+15%',
      icon: FileText,
      color: 'bg-purple-500'
    },
    {
      title: 'Appointments',
      value: '89',
      change: '+3%',
      icon: Calendar,
      color: 'bg-orange-500'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
        <div className="text-white/70 text-sm">
          Welcome back, Dr. Sarah Smith
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ChatPreview />
          <NotesPreview />
        </div>
        <div>
          <AppointmentPreview />
        </div>
      </div>
    </div>
  )
}

export default Dashboard