import React, { useState } from 'react'
import { Users, Plus, CheckCircle, Clock } from 'lucide-react'

const PatientIntake = () => {
  const [activeTab, setActiveTab] = useState('forms')
  const [showNewForm, setShowNewForm] = useState(false)

  const intakeForms = [
    { id: 1, patient: 'John Smith', status: 'completed', date: '2024-01-15', completion: 100 },
    { id: 2, patient: 'Maria Garcia', status: 'pending', date: '2024-01-15', completion: 67 },
    { id: 3, patient: 'David Johnson', status: 'pending', date: '2024-01-14', completion: 23 },
    { id: 4, patient: 'Lisa Wilson', status: 'completed', date: '2024-01-14', completion: 100 }
  ]

  const formTemplates = [
    { name: 'General Health Assessment', fields: 15, usage: 89 },
    { name: 'Chronic Pain Evaluation', fields: 23, usage: 45 },
    { name: 'Mental Health Screening', fields: 18, usage: 67 },
    { name: 'Pediatric Assessment', fields: 12, usage: 34 }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-white">Patient Intake</h1>
        <button 
          onClick={() => setShowNewForm(true)}
          className="flex items-center space-x-2 bg-accent hover:bg-accent/80 text-white px-4 py-2 rounded-lg transition-all duration-200"
        >
          <Plus size={16} />
          <span>Create Intake Form</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-white/20">
        <button
          onClick={() => setActiveTab('forms')}
          className={`pb-3 px-1 text-sm font-medium border-b-2 transition-all duration-200 ${
            activeTab === 'forms'
              ? 'border-accent text-white'
              : 'border-transparent text-white/70 hover:text-white'
          }`}
        >
          Active Forms
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`pb-3 px-1 text-sm font-medium border-b-2 transition-all duration-200 ${
            activeTab === 'templates'
              ? 'border-accent text-white'
              : 'border-transparent text-white/70 hover:text-white'
          }`}
        >
          Templates
        </button>
      </div>

      {activeTab === 'forms' && (
        <div className="space-y-4">
          {intakeForms.map((form) => (
            <div key={form.id} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6 card-hover">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <Users size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{form.patient}</h3>
                    <p className="text-white/70 text-sm">Form created on {form.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      {form.status === 'completed' ? (
                        <CheckCircle size={16} className="text-green-400" />
                      ) : (
                        <Clock size={16} className="text-yellow-400" />
                      )}
                      <span className={`text-sm font-medium ${
                        form.status === 'completed' ? 'text-green-400' : 'text-yellow-400'
                      }`}>
                        {form.status === 'completed' ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                    <div className="text-white/70 text-sm mt-1">
                      {form.completion}% complete
                    </div>
                  </div>
                  
                  <div className="w-16 h-16">
                    <svg className="transform -rotate-90 w-16 h-16">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="4"
                        fill="transparent"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke={form.status === 'completed' ? '#22c55e' : '#f59e0b'}
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray={`${form.completion * 1.76} 176`}
                        className="transition-all duration-300"
                      />
                    </svg>
                    <div className="relative -mt-16 flex items-center justify-center w-16 h-16">
                      <span className="text-white text-xs font-semibold">
                        {form.completion}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-all duration-200">
                  View Form
                </button>
                <button className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg text-sm transition-all duration-200">
                  Send Reminder
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formTemplates.map((template, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6 card-hover">
              <h3 className="text-white font-semibold text-lg mb-2">{template.name}</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Fields:</span>
                  <span className="text-white">{template.fields}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Usage:</span>
                  <span className="text-white">{template.usage}% of patients</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 bg-accent hover:bg-accent/80 text-white py-2 px-4 rounded-lg text-sm transition-all duration-200">
                  Use Template
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg text-sm transition-all duration-200">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Form Modal */}
      {showNewForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-white text-lg font-semibold mb-4">Create New Intake Form</h3>
            <div className="space-y-4">
              <div>
                <label className="text-white/70 text-sm">Patient Name</label>
                <input 
                  type="text" 
                  className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-accent"
                  placeholder="Enter patient name"
                />
              </div>
              <div>
                <label className="text-white/70 text-sm">Template</label>
                <select className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white">
                  <option>General Health Assessment</option>
                  <option>Chronic Pain Evaluation</option>
                  <option>Mental Health Screening</option>
                  <option>Pediatric Assessment</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button 
                onClick={() => setShowNewForm(false)}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-all duration-200"
              >
                Cancel
              </button>
              <button className="flex-1 bg-accent hover:bg-accent/80 text-white py-2 px-4 rounded-lg transition-all duration-200">
                Create Form
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PatientIntake