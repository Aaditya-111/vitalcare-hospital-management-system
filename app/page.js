"use client"

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import Home from './components/Home'
import Login from './components/Login'
import Doctors from './components/Doctors'
import BedAvailability from './components/BedAvailability'
import Vaccinations from './components/Vaccinations'
import Appointments from './components/Appointments'
import Contacts from './components/Contacts'

export default function Page() {
  const [currentPage, setCurrentPage] = useState('home')
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
      localStorage.setItem('isLoggedIn', isLoggedIn);
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true)
    setCurrentPage('doctors')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentPage('home')
  }

  const renderPage = () => {
    switch(currentPage) {
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
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
      <Chatbot setCurrentPage={setCurrentPage} />
    </div>
  )
}
