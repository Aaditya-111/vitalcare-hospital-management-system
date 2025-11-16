# VitalCare HMS - Hospital Management System

A modern, responsive Hospital Management System built with Next.js, Tailwind CSS, Prisma ORM, and Hugging Face AI.

**Version:** 1.5.0 (With Backend & AI)  
**Status:** ✅ Backend Integration Ready  
**Last Updated:** October 23, 2025

## 🚀 NEW: Backend & AI Integration

✅ **Prisma ORM** - SQLite database with full CRUD operations  
✅ **Hugging Face API** - AI-powered medical symptom analysis  
✅ **Next.js API Routes** - RESTful backend endpoints  
✅ **Real-time Data** - Appointments, doctors, beds, vaccinations  
✅ **Smart Chatbot** - Medical department recommendations based on symptoms

## Features

✅ **Welcome Page** - Hero section with hospital introduction and feature cards
✅ **Login/Signup** - Simulated authentication system
✅ **Doctors Page** - Tabbed navigation with 5 departments (Cardiology, Neurology, OPD, ENT, General Surgery)
✅ **Bed Availability** - Real-time bed status with green/red indicators
✅ **Vaccinations** - Newborn and emergency vaccine availability
✅ **Appointments** - Booking form with success message
✅ **Contacts** - Important department contact numbers
✅ **AI Chatbot** - Keyword-based responses with clickable navigation links

## Installation

### Basic Setup (Frontend Only)

1. **Install dependencies:**
```bash
npm install
```

2. **Run the development server:**
```bash
npm run dev
```

3. **Open your browser:**
Navigate to `http://localhost:3000`

### Full Setup (With Backend & Database)

1. **Install dependencies:**
```bash
npm install
```

2. **Create `.env` file in root directory:**
```bash
DATABASE_URL="file:./dev.db"
HUGGINGFACE_API_KEY="your_huggingface_api_key_here"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

3. **Get Hugging Face API Key:**
   - Visit https://huggingface.co/
   - Sign up/Login
   - Go to Settings → Access Tokens
   - Create new token and copy to `.env`

4. **Setup Prisma:**
```bash
# Create prisma directory
mkdir prisma

# Copy schema.prisma from project files to prisma/
# Then run:
npx prisma generate
npx prisma db push
```

5. **Seed database (optional):**
```bash
node scripts/seed.js
```

6. **Run the development server:**
```bash
npm run dev
```

7. **View database (optional):**
```bash
npx prisma studio
```

## Build for Production

```bash
npm run build
npm start
```

## Features Overview

### Navigation
- Sticky navbar with all page links
- Login/Logout functionality
- Responsive mobile menu

### Pages

**Home**
- Hero section with call-to-action
- 3 feature cards
- Statistics section

**Login**
- Simple authentication (simulated)
- Redirects to Doctors page after login

**Doctors**
- 5 department tabs
- 3 doctors per department
- Book appointment buttons

**Bed Availability**
- Green/Red status indicators
- Summary statistics
- Grid layout

**Vaccinations**
- Newborn vaccines section
- Emergency vaccines (Anti-Rabies, Anti-Venom)
- IN STOCK / OUT OF STOCK indicators

**Appointments**
- Complete booking form
- Success message after submission

**Contacts**
- Emergency helpline banner
- Department contact list
- Click-to-call functionality

### AI Chatbot

**Keywords:**
- "doctor" or "specialist" → Links to Doctors page
- "appointment" or "book" → Links to Appointments page
- "bed" or "available" → Links to Bed Availability page
- "contact" or "phone" → Links to Contacts page
- "vaccine" or "dog bite" → Links to Vaccinations page

## Technology Stack

### Frontend
- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **Icons:** SVG icons
- **State Management:** React Hooks

### Backend (New)
- **Database:** Prisma ORM with SQLite (dev) / PostgreSQL (production)
- **API:** Next.js API Routes
- **AI/ML:** Hugging Face Inference API
- **Models:** Medical symptom analysis models

## Color Scheme

Primary color: **Emerald Green** (Tailwind's emerald palette)
- emerald-50 to emerald-900

## Project Structure

```
vitalcareHMS/
├── app/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Doctors.js
│   │   ├── BedAvailability.js
│   │   ├── Vaccinations.js
│   │   ├── Appointments.js
│   │   ├── Contacts.js
│   │   ├── Chatbot.js
│   │   └── Footer.js
│   ├── layout.js
│   ├── page.js
│   └── globals.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

## Future Upgrades

See `FUTURE_UPGRADES.md` for detailed roadmap including:
- 🤖 Real-time AI Chatbot (OpenAI/Dialogflow)
- 💳 Payment Gateway Integration (Razorpay/Stripe)
- 🔐 Real Authentication & Database
- 📧 Email/SMS Notifications
- 📱 Video Consultation
- 📊 Admin Dashboard
- 📄 Medical Records Management

## Important Files

- `FUTURE_UPGRADES.md` - Complete roadmap for adding real-time features
- `.env.local.example` - Template for environment variables
- `README.md` - This file (setup & features)

## Notes

- All features are currently simulated (no backend)
- Indian phone numbers format (+91-XX-XXXX-XXXX)
- Indian doctor names
- Emergency numbers: 108 (Emergency), 102 (Ambulance)
- Ready for backend integration

## License

MIT
