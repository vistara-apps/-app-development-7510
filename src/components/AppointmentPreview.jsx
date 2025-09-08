import React from 'react'
import { Calendar, Clock, User } from 'lucide-react'

const AppointmentPreview = () => {
  const appointments = [
    { patient: "John Smith", time: "9:00 AM", type: "Check-up", status: "confirmed" },
    { patient: "Maria Garcia", time: "10:30 AM", type: "Follow-up", status: "pending" },
    { patient: "David Johnson", time: "2:00 PM", type: "Consultation", status: "confirmed" },
    { patient: "Lisa Wilson", time: "3:30 PM", type: "Check-up", status: "confirmed" },
    { patient: "Mike Brown", time: "4:00 PM", type: "Treatment", status: "pending" }
  ]

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="text-white" size={20} />
          <h3 className="text-white text-lg font-semibold">Today's Appointments</h3>
        </div>
        <button className="text-white/70 hover:text-white text-sm">View All</button>
      </div>
      
      <div className="space-y-3">
        {appointments.map((appointment, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <User size={16} className="text-white/70" />
                <div>
                  <p className="text-white text-sm font-medium">{appointment.patient}</p>
                  <p className="text-white/70 text-xs">{appointment.type}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 text-white/70 text-xs">
                  <Clock size={12} />
                  <span>{appointment.time}</span>
                </div>
                <span className={`inline-block px-2 py-1 rounded text-xs mt-1 ${
                  appointment.status === 'confirmed' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {appointment.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 bg-accent hover:bg-accent/80 text-white py-2 px-4 rounded-lg transition-all duration-200">
        Schedule New Appointment
      </button>
    </div>
  )
}

export default AppointmentPreview