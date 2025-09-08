import React, { useState } from 'react'
import { FileText, Upload, Zap, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { openAIService, apiUtils } from '../services/api'
import { useApp } from '../context/AppContext'

const NoteSummarization = () => {
  const { state, actions } = useApp()
  const [noteText, setNoteText] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [summary, setSummary] = useState('')
  const [error, setError] = useState(null)
  const [processingTime, setProcessingTime] = useState(null)

  const recentNotes = [
    {
      id: 1,
      patient: 'John Smith',
      date: '2024-01-15',
      status: 'processed',
      originalLength: 1247,
      summaryLength: 234,
      summary: 'Patient presents with chronic lower back pain. Improved since last visit with prescribed physical therapy. No red flags noted. Continue current treatment plan.'
    },
    {
      id: 2,
      patient: 'Maria Garcia',
      date: '2024-01-15',
      status: 'processing',
      originalLength: 892,
      summaryLength: 0,
      summary: ''
    },
    {
      id: 3,
      patient: 'David Johnson',
      date: '2024-01-14',
      status: 'processed',
      originalLength: 1567,
      summaryLength: 298,
      summary: 'Initial consultation for diabetes management. Patient reports good adherence to medication. A1C levels improved. Discussed dietary modifications and exercise recommendations.'
    }
  ]

  const handleProcessNote = async () => {
    if (!noteText.trim()) return

    setIsProcessing(true)
    setError(null)
    setSummary('')
    const startTime = Date.now()
    
    try {
      // Check if API is configured
      if (!apiUtils.validateConfig()) {
        throw new Error('AI service not configured. Please check your API settings.')
      }

      // Generate AI summary using OpenAI
      const aiSummary = await openAIService.summarizeNotes(noteText)
      const endTime = Date.now()
      const processingTimeMs = endTime - startTime
      
      setSummary(aiSummary)
      setProcessingTime(processingTimeMs)
      
      // Save the note to the app state
      const noteData = {
        rawContent: noteText,
        summary: aiSummary,
        providerId: state.currentProvider?.providerId || 'demo',
        patientId: 'demo_patient_' + Date.now(),
        processingTime: processingTimeMs,
        status: 'final'
      }
      
      const savedNote = actions.addNote(noteData)
      
      // Show success notification
      actions.addNotification({
        type: 'success',
        title: 'Note Summarized',
        message: `Successfully processed ${noteText.split(' ').length} words in ${(processingTimeMs / 1000).toFixed(1)}s`
      })
      
    } catch (error) {
      console.error('Note Summarization Error:', error)
      setError(apiUtils.handleApiError(error, 'Note Summarization'))
      
      // Fallback to mock summary
      const mockSummary = generateMockSummary(noteText)
      setSummary(mockSummary)
      setProcessingTime(Date.now() - startTime)
      
      // Show error notification
      actions.addNotification({
        type: 'warning',
        title: 'AI Service Unavailable',
        message: 'Using fallback summarization. Please check your API configuration.'
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const generateMockSummary = (text) => {
    // Simple mock summarization
    const sentences = text.split('.').filter(s => s.trim().length > 0)
    const keySentences = sentences.slice(0, Math.min(3, sentences.length))
    return keySentences.join('. ') + '.'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-white">AI Note Summarization</h1>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-200">
            <Upload size={16} />
            <span>Upload File</span>
          </button>
          <button className="flex items-center space-x-2 bg-accent hover:bg-accent/80 text-white px-4 py-2 rounded-lg transition-all duration-200">
            <Zap size={16} />
            <span>Batch Process</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Note Input */}
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6">
            <h3 className="text-white text-lg font-semibold mb-4">Process New Note</h3>
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
                <label className="text-white/70 text-sm">Clinical Notes</label>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-accent h-48 resize-none"
                  placeholder="Paste or type clinical notes here..."
                />
                <div className="text-white/50 text-xs mt-1">
                  {noteText.length} characters
                </div>
              </div>
              <button
                onClick={handleProcessNote}
                disabled={!noteText.trim() || isProcessing}
                className="w-full bg-accent hover:bg-accent/80 disabled:bg-accent/50 text-white py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Zap size={16} />
                    <span>Summarize Note</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Summary Output */}
          {(summary || isProcessing) && (
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6">
              <h3 className="text-white text-lg font-semibold mb-4">AI Summary</h3>
              {isProcessing ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-white/70 text-sm">Analyzing clinical notes...</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-white text-sm leading-relaxed">{summary}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg text-sm transition-all duration-200">
                      Save Summary
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-all duration-200">
                      Edit
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Recent Notes */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6">
          <h3 className="text-white text-lg font-semibold mb-4">Recent Summaries</h3>
          <div className="space-y-4">
            {recentNotes.map((note) => (
              <div key={note.id} className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-white font-medium">{note.patient}</h4>
                    <p className="text-white/70 text-sm">{note.date}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {note.status === 'processed' ? (
                      <CheckCircle size={16} className="text-green-400" />
                    ) : (
                      <Clock size={16} className="text-yellow-400" />
                    )}
                    <span className={`text-sm ${
                      note.status === 'processed' ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {note.status === 'processed' ? 'Processed' : 'Processing'}
                    </span>
                  </div>
                </div>
                
                {note.status === 'processed' && (
                  <>
                    <p className="text-white/80 text-sm mb-3 leading-relaxed">
                      {note.summary}
                    </p>
                    <div className="flex justify-between text-xs text-white/50">
                      <span>Original: {note.originalLength} chars</span>
                      <span>Summary: {note.summaryLength} chars</span>
                      <span>Reduced by {Math.round((1 - note.summaryLength / note.originalLength) * 100)}%</span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-all duration-200">
            View All Summaries
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoteSummarization
