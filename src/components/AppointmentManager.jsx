import React, { useState } from 'react'
import { Calendar, Clock, Plus, Send, User, Phone, Mail } from 'lucide-react'

const AppointmentManager = () => {
  const [selectedDate, setSelectedDate] = useState('2024-01-15')
  const [showNewAppointment, setShowNewAppointment] = useState(false)

  const appointments = [
    {
      id: 1,
      patient: 'John Smith',
      time: '9:00 AM',
      duration: '30 min',
      type: 'Check-up',
      status: 'confirmed',
      phone: '(555) 123-4567',
      email: 'john.smith@email.com',
      reminderSent: true
    },
    {
      id: 2,
      patient: 'Maria Garcia',
      time: '10:30 AM',
      duration: '45 min',
      type: 'Follow-up',
      status: 'pending',
      phone: '(555) 234-5678',
      email: 'maria.garcia@email.com',
      reminderSent: false
    },
    {
      id: 3,
      patient: 'David Johnson',
      time: '2:00 PM',
      duration: '60 min',
      type: 'Consultation',
      status: 'confirmed',
      phone: '(555) 345-6789',
      email: 'david.johnson@email.com',
      reminderSent: true
    },
    {
      id: 4,
      patient: 'Lisa Wilson',
      time: '3:30 PM',
      duration: '30 min',
      type: 'Check-up',
      status: 'confirmed',
      phone: '(555) 456-7890',
      email: 'lisa.wilson@email.com',
      reminderSent: false
    }
  ]

  const handleSendReminder = (appointmentId, method) => {
    console.log(`Sending ${method} reminder for appointment ${appointmentId}`)
    // This would integrate with Twilio/SendGrid APIs
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-white">Appointment Manager</h1>
        <button 
          onClick={() => setShowNewAppointment(true)}
          className="flex items-center space-x-2 bg-accent hover:bg-accent/80 text-white px-4 py-2 rounded-lg transition-all duration-200"
        >
          <Plus size={16} />
          <span>New Appointment</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6">
          <h3 className="text-white text-lg font-semibold mb-4">Calendar</h3>
          <div className="space-y-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent"
            />
            
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white/70 text-sm">Total Appointments</span>
                <span className="text-white font-semibold">{appointments.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white/70 text-sm">Confirmed</span>
                <span className="text-green-400 font-semibold">
                  {appointments.filter(a => a.status === 'confirmed').length}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white/70 text-sm">Pending</span>
                <span className="text-yellow-400 font-semibold">
                  {appointments.filter(a => a.status === 'pending').length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg font-semibold">
                Appointments for {new Date(selectedDate).toLocaleDateString()}
              </h3>
              <button className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg text-sm transition-all duration-200">
                Send All Reminders
              </button>
            </div>

            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                        <User size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">{appointment.patient}</h4>
                        <div className="flex items-center space-x-4 mt-1 text-white/70 text-sm">
                          <div className="flex items-center space-x-1">
                            <Clock size={14} />
                            <span>{appointment.time}</span>
                          </div>
                          <span>•</span>
                          <span>{appointment.duration}</span>
                          <span>•</span>
                          <span>{appointment.type}</span>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-white/60 text-xs">
                          <div className="flex items-center space-x-1">
                            <Phone size={12} />
                            <span>{appointment.phone}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Mail size={12} />
                            <span>{appointment.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        appointment.status === 'confirmed' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {appointment.status}
                      </span>
                      
                      {appointment.reminderSent ? (
                        <span className="text-green-400 text-xs">Reminder sent</span>
                      ) : (
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleSendReminder(appointment.id, 'SMS')}
                            className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-2 py-1 rounded text-xs transition-all duration-200"
                          >
                            SMS
                          </button>
                          <button
                            onClick={() => handleSendReminder(appointment.id, 'Email')}
                            className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 px-2 py-1 rounded text-xs transition-all duration-200"
                          >
                            Email
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reminder Settings */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6">
            <h3 className="text-white text-lg font-semibold mb-4">Reminder Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white/70 text-sm">SMS Reminder Time</label>
                <select className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white">
                  <option>24 hours before</option>
                  <option>2 hours before</option>
                  <option>1 hour before</option>
                </select>
              </div>
              <div>
                <label className="text-white/70 text-sm">Email Reminder Time</label>
                <select className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white">
                  <option>48 hours before</option>
                  <option>24 hours before</option>
                  <option>12 hours before</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Appointment Modal */}
      {showNewAppointment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-white text-lg font-semibold mb-4">Schedule New Appointment</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/70 text-sm">Patient Name</label>
                  <input 
                    type="text" 
                    className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-accent"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label className="text-white/70 text-sm">Phone</label>
                  <input 
                    type="tel" 
                    className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-accent"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
              <div>
                <label className="text-white/70 text-sm">Email</label>
                <input 
                  type="email" 
                  className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-accent"
                  placeholder="patient@email.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/70 text-sm">Date</label>
                  <input 
                    type="date" 
                    className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="text-white/70 text-sm">Time</label>
                  <input 
                    type="time" 
                    className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent"
                  />
                </div>
              </div>
              <div>
                <label className="text-white/70 text-sm">Appointment Type</label>
                <select className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white">
                  <option>Check-up</option>
                  <option>Consultation</option>
                  <option>Follow-up</option>
                  <option>Treatment</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button 
                onClick={() => setShowNewAppointment(false)}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-all duration-200"
              >
                Cancel
              </button>
              <button className="flex-1 bg-accent hover:bg-accent/80 text-white py-2 px-4 rounded-lg transition-all duration-200">
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AppointmentManager