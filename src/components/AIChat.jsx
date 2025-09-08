import React, { useState } from 'react'
import { Bot, Send, User, Settings, AlertCircle } from 'lucide-react'
import { openAIService, apiUtils } from '../services/api'
import { useApp } from '../context/AppContext'

const AIChat = () => {
  const { state, actions } = useApp()
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', content: 'Hello! I\'m your AI assistant. How can I help you today?', timestamp: '2:30 PM' },
    { id: 2, type: 'user', content: 'What are your clinic hours?', timestamp: '2:31 PM' },
    { id: 3, type: 'bot', content: 'Our clinic is open Monday through Friday from 8:00 AM to 6:00 PM, and Saturdays from 9:00 AM to 2:00 PM. We\'re closed on Sundays and major holidays.', timestamp: '2:31 PM' }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState(null)

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = inputMessage
    const newUserMessage = {
      id: messages.length + 1,
      type: 'user',
      content: userMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, newUserMessage])
    setInputMessage('')
    setIsTyping(true)
    setError(null)

    try {
      // Check if API is configured
      if (!apiUtils.validateConfig()) {
        throw new Error('AI service not configured. Please check your API settings.')
      }

      // Generate AI response using OpenAI
      const aiResponse = await openAIService.generateChatResponse(userMessage)
      
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      
      setMessages(prev => [...prev, botResponse])
      
      // Log the message interaction
      actions.addMessage({
        content: userMessage,
        direction: 'incoming',
        type: 'text',
        providerId: state.currentProvider?.providerId || 'demo',
        patientId: 'web_visitor_' + Date.now()
      })
      
      actions.addMessage({
        content: aiResponse,
        direction: 'outgoing',
        type: 'text',
        providerId: state.currentProvider?.providerId || 'demo',
        patientId: 'web_visitor_' + Date.now()
      })
      
    } catch (error) {
      console.error('AI Chat Error:', error)
      setError(apiUtils.handleApiError(error, 'AI Chat'))
      
      // Fallback to mock response
      const fallbackResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: generateBotResponse(userMessage),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, fallbackResponse])
      
      // Show error notification
      actions.addNotification({
        type: 'warning',
        title: 'AI Service Unavailable',
        message: 'Using fallback responses. Please check your API configuration.'
      })
    } finally {
      setIsTyping(false)
    }
  }

  const generateBotResponse = (message) => {
    const responses = {
      'insurance': 'We accept most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, and UnitedHealthcare. Please bring your insurance card to verify coverage.',
      'appointment': 'To schedule an appointment, you can call us at (555) 123-4567 or use our online booking system. We typically have availability within 2-3 business days.',
      'location': 'We\'re located at 123 Medical Center Drive, Suite 200, in the downtown medical district. Free parking is available.',
      'preparation': 'Please bring a valid ID, your insurance card, and a list of current medications. Arrive 15 minutes early to complete any necessary paperwork.'
    }

    const lowerMessage = message.toLowerCase()
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return response
      }
    }

    return 'Thank you for your question. For specific medical concerns, please contact our office directly at (555) 123-4567 or speak with one of our staff members.'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-white">AI Chat Bot</h1>
        <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-200">
          <Settings size={16} />
          <span>Configure Bot</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg">
            {/* Chat Header */}
            <div className="flex items-center space-x-3 p-4 border-b border-white/10">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">HealthFlow Assistant</h3>
                <p className="text-white/70 text-sm">Online • Ready to help</p>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user' 
                        ? 'bg-primary' 
                        : 'bg-accent'
                    }`}>
                      {message.type === 'user' ? (
                        <User size={16} className="text-white" />
                      ) : (
                        <Bot size={16} className="text-white" />
                      )}
                    </div>
                    <div className={`p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-white/5 text-white'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <AlertCircle size={16} className="text-white" />
                    </div>
                    <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-accent"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-accent hover:bg-accent/80 text-white p-2 rounded-lg transition-all duration-200"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bot Configuration */}
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6">
            <h3 className="text-white text-lg font-semibold mb-4">Bot Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="text-white/70 text-sm">Language</label>
                <select className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white">
                  <option>English</option>
                  <option>Spanish</option>
                </select>
              </div>
              <div>
                <label className="text-white/70 text-sm">Response Style</label>
                <select className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white">
                  <option>Professional</option>
                  <option>Friendly</option>
                  <option>Concise</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6">
            <h3 className="text-white text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left bg-white/5 hover:bg-white/10 text-white p-3 rounded-lg transition-all duration-200">
                View Conversation History
              </button>
              <button className="w-full text-left bg-white/5 hover:bg-white/10 text-white p-3 rounded-lg transition-all duration-200">
                Update Knowledge Base
              </button>
              <button className="w-full text-left bg-white/5 hover:bg-white/10 text-white p-3 rounded-lg transition-all duration-200">
                Export Chat Logs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIChat
