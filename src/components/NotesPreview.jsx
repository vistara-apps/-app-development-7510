import React from 'react'
import { FileText, CheckCircle } from 'lucide-react'

const NotesPreview = () => {
  const recentNotes = [
    { patient: "John Smith", summary: "Patient reported improved symptoms after medication adjustment...", time: "10 min ago", status: "processed" },
    { patient: "Maria Garcia", summary: "Follow-up consultation shows positive response to treatment...", time: "25 min ago", status: "processed" },
    { patient: "David Johnson", summary: "Initial consultation for chronic pain management...", time: "1 hour ago", status: "pending" }
  ]

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FileText className="text-white" size={20} />
          <h3 className="text-white text-lg font-semibold">Recent Note Summaries</h3>
        </div>
        <button className="text-white/70 hover:text-white text-sm">View All</button>
      </div>
      
      <div className="space-y-3">
        {recentNotes.map((note, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <p className="text-white text-sm font-medium">{note.patient}</p>
                  {note.status === 'processed' && (
                    <CheckCircle size={14} className="text-green-400" />
                  )}
                </div>
                <p className="text-white/70 text-xs leading-relaxed">{note.summary}</p>
              </div>
              <span className="text-white/50 text-xs flex-shrink-0 ml-2">{note.time}</span>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-all duration-200">
        Process New Notes
      </button>
    </div>
  )
}

export default NotesPreview