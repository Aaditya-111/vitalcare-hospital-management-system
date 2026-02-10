'use client'

import { useState } from 'react'

interface Message {
  text: string;
  sender: "user" | "bot";
  isTyping?: boolean;
  link?: {
    text: string;
    page: string;
  };
}

export default function Chatbot({ setCurrentPage }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hello! How can I help you today?', sender: 'bot' }
  ])
  const [input, setInput] = useState('')

  const getBotResponse = async (userMessage) => {
    const msg = userMessage.toLowerCase()

    // Check for quick navigation keywords first - these provide instant responses
    if (msg.includes('appointment') && msg.includes('book')) {
      return {
        text: 'I can help you book an appointment:',
        link: { text: 'Book Appointment', page: 'appointments' }
      }
    }

    if (msg.includes('bed') && (msg.includes('available') || msg.includes('availability'))) {
      return {
        text: 'Check our real-time bed availability:',
        link: { text: 'View Bed Availability', page: 'beds' }
      }
    }

    if (msg.includes('contact') && msg.includes('number')) {
      return {
        text: 'Find all our important contact numbers:',
        link: { text: 'View Contacts', page: 'contacts' }
      }
    }

    // For all other questions, use AI to provide intelligent responses
    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      })

      if (response.ok) {
        const data = await response.json()

        // Add relevant navigation link based on AI response content
        const responseText = data.response.toLowerCase()
        let link = null

        if (responseText.includes('appointment') || responseText.includes('book')) {
          link = { text: 'Book Appointment', page: 'appointments' }
        } else if (responseText.includes('doctor') || responseText.includes('specialist')) {
          link = { text: 'View Doctors', page: 'doctors' }
        } else if (responseText.includes('cardiology') || responseText.includes('neurology') ||
          responseText.includes('department')) {
          link = { text: 'Book Appointment', page: 'appointments' }
        } else if (responseText.includes('vaccine') || responseText.includes('vaccination')) {
          link = { text: 'View Vaccinations', page: 'vaccinations' }
        }

        return {
          text: data.response,
          link: link
        }
      }
    } catch (error) {
      console.error('AI chatbot error:', error)
    }

    // Fallback response if API fails
    return {
      text: "I'm here to help! I can assist with:\n• Medical questions and symptoms\n• Finding doctors and specialists\n• Booking appointments\n• Checking bed availability\n• Vaccination information\n• Hospital services\n\nWhat would you like to know?"
    }
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMsg = { text: input, sender: 'user' }
    setMessages(prev => [...prev, {text: input, sender: "user"}]);

    // Show typing indicator
    setMessages(prev => [...prev, { text: 'Typing...', sender: 'bot', isTyping: true }])

    const response = await getBotResponse(input)

    // Remove typing indicator and add real response
    setTimeout(() => {
      setMessages(prev => prev.filter((msg: Message) => !msg.isTyping))
      setMessages(prev => [...prev, { ...response, sender: 'bot' }])
    }, 500)

    setInput('')
  }

  const handleLinkClick = (page) => {
    setCurrentPage(page)
    setIsOpen(false)
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 transition-all hover:scale-110 z-50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">VitalCare Assistant</h3>
                <p className="text-xs text-emerald-100">Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-emerald-700 p-1 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${msg.sender === 'user' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-800'} rounded-lg p-3 shadow`}>
                  <p className="text-sm">{msg.text}</p>
                  {msg.link && (
                    <button
                      onClick={() => handleLinkClick(msg.link.page)}
                      className="mt-2 text-sm font-semibold underline hover:no-underline"
                    >
                      {msg.link.text} →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={handleSend}
                className="bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
