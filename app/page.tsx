"use client"

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer.components'
import Chatbot from './components/Chatbot.components'
import Home from './components/Home.components'
import Login from './components/Login.components'
import Doctors from './components/Doctors.components'
import BedAvailability from './components/BedAvailability.components'
import Vaccinations from './components/Vaccinations.components'
import Appointments from './components/Appointments.components'
import Contacts from './components/contacts.components'
import AuthModal from './components/Authmodal.components'

export default function Page() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      return localStorage.getItem('isLoggedIn') === 'true';
    }
    return false;
  });

  // Update localStorage when isLoggedIn changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isLoggedIn', String(isLoggedIn));
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true)
    setCurrentPage('doctors')
  }

  const openAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode)
    setIsAuthOpen(true)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home setCurrentPage={setCurrentPage} />
      case 'login': return <Login onLogin={handleLogin} />
      case 'doctors': return <Doctors setCurrentPage={setCurrentPage} />
      case 'beds': return <BedAvailability />
      case 'vaccinations': return <Vaccinations />
      case 'appointments': return <Appointments />
      case 'contacts': return <Contacts />
      default: return <Home setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        openAuth={openAuth}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
      <Chatbot setCurrentPage={setCurrentPage} />
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
      />
    </div>
  )
}
