import React from 'react'
import { MessageSquare, Bot } from 'lucide-react'

const ChatPreview = () => {
  const recentChats = [
    { question: "What are your clinic hours?", answer: "We're open Mon-Fri 8AM-6PM", time: "2 min ago" },
    { question: "Do you accept my insurance?", answer: "Let me check your insurance details...", time: "5 min ago" },
    { question: "How do I prepare for my appointment?", answer: "Please bring your ID and insurance card...", time: "8 min ago" }
  ]

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Bot className="text-white" size={20} />
          <h3 className="text-white text-lg font-semibold">AI Chat Activity</h3>
        </div>
        <span className="text-green-400 text-sm">Live</span>
      </div>
      
      <div className="space-y-3">
        {recentChats.map((chat, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-3">
            <div className="flex items-start space-x-3">
              <MessageSquare size={16} className="text-white/70 mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{chat.question}</p>
                <p className="text-white/70 text-xs mt-1 truncate">{chat.answer}</p>
              </div>
              <span className="text-white/50 text-xs flex-shrink-0">{chat.time}</span>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-all duration-200">
        View All Conversations
      </button>
    </div>
  )
}

export default ChatPreview