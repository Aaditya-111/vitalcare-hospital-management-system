'use client'

import { useState } from 'react'

export default function Doctors({ setCurrentPage }) {
  const [activeTab, setActiveTab] = useState('cardiology')
  
  // Get doctors for the active tab
  const getDoctorsByDepartment = (dept) => {
    return fallbackDepartments[dept] || []
  }

  const fallbackDepartments = {
    cardiology: [
      { name: 'Dr. Rajesh Kumar', title: 'Senior Cardiologist', department: 'cardiology', desc: '15 years of experience in interventional cardiology and heart disease management.' },
      { name: 'Dr. Priya Sharma', title: 'Cardiac Surgeon', department: 'cardiology', desc: 'Specialist in bypass surgery and valve replacement procedures.' },
      { name: 'Dr. Amit Patel', title: 'Cardiologist', department: 'cardiology', desc: 'Expert in preventive cardiology and heart failure treatment.' }
    ],
    neurology: [
      { name: 'Dr. Vikram Singh', title: 'Senior Neurologist', department: 'neurology', desc: 'Specialist in stroke management and neurological disorders.' },
      { name: 'Dr. Anjali Desai', title: 'Neurosurgeon', department: 'neurology', desc: 'Expert in brain and spine surgery with 12 years experience.' },
      { name: 'Dr. Arjun Reddy', title: 'Neurologist', department: 'neurology', desc: 'Focuses on epilepsy, Parkinson\'s, and movement disorders.' }
    ],
    opd: [
      { name: 'Dr. Kavita Iyer', title: 'General Physician', department: 'opd', desc: 'Primary care specialist for routine checkups and general health.' },
      { name: 'Dr. Rahul Mehta', title: 'Family Medicine', department: 'opd', desc: 'Comprehensive care for patients of all ages.' },
      { name: 'Dr. Sneha Gupta', title: 'Internal Medicine', department: 'opd', desc: 'Expert in adult medicine and chronic disease management.' }
    ],
    ent: [
      { name: 'Dr. Sanjay Verma', title: 'ENT Specialist', department: 'ent', desc: 'Expert in ear, nose, and throat disorders and surgeries.' },
      { name: 'Dr. Meera Nair', title: 'ENT Surgeon', department: 'ent', desc: 'Specialist in sinus surgery and hearing restoration.' },
      { name: 'Dr. Karan Malhotra', title: 'ENT Consultant', department: 'ent', desc: 'Focuses on voice disorders and throat conditions.' }
    ],
    surgery: [
      { name: 'Dr. Aditya Joshi', title: 'General Surgeon', department: 'surgery', desc: 'Expert in laparoscopic and minimally invasive surgery.' },
      { name: 'Dr. Pooja Kapoor', title: 'Trauma Surgeon', department: 'surgery', desc: 'Specialist in emergency and trauma surgical procedures.' },
      { name: 'Dr. Rohan Chopra', title: 'Surgical Consultant', department: 'surgery', desc: 'Advanced surgical techniques and post-operative care.' }
    ]
  }

  const tabs = [
    { id: 'cardiology', label: 'Cardiology' },
    { id: 'neurology', label: 'Neurology' },
    { id: 'opd', label: 'OPD' },
    { id: 'ent', label: 'ENT' },
    { id: 'surgery', label: 'General Surgeon' }
  ]

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Specialists</h1>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getDoctorsByDepartment(activeTab).map((doctor, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6 flex flex-col items-center text-center">
                {/* Placeholder Image */}
                <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full mb-4 flex items-center justify-center text-white text-4xl font-bold">
                  {doctor.name.split(' ')[1][0]}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
                <p className="text-emerald-600 font-semibold mb-3">{doctor.title}</p>
                <p className="text-gray-600 text-sm mb-6">{doctor.desc}</p>
                
                <button 
                  onClick={() => setCurrentPage('appointments')}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
