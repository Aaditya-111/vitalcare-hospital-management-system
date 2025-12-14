import { HfInference } from '@huggingface/inference'

// Main function for medical Q&A - handles all types of questions
export async function analyzeMedicalSymptoms(userMessage) {
  try {
    // During build or when API key is missing, skip external call and use fallback
    if (
      process.env.NEXT_PHASE === 'phase-production-build' ||
      !process.env.HUGGINGFACE_API_KEY
    ) {
      return analyzeSymptomsFallback(userMessage)
    }

    const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

    // Create comprehensive prompt for medical assistant
    const prompt = `You are VitalCare Hospital's AI medical assistant. Answer the following question professionally and helpfully:

Question: ${userMessage}

Provide a clear, helpful response. If it's about symptoms, suggest the appropriate department (Cardiology, Neurology, OPD, ENT, Orthopedics, Pediatrics, Emergency). Keep your response concise but informative.

Answer:`

    const response = await hf.textGeneration({
      model: 'mistralai/Mistral-7B-Instruct-v0.2', // Better general purpose model
      inputs: prompt,
      parameters: {
        max_new_tokens: 250, // Increased for more complete answers
        temperature: 0.7,
        top_p: 0.95,
        return_full_text: false, // Only return generated text, not the prompt
      }
    })

    return response.generated_text.trim()
  } catch (error) {
    console.error('Hugging Face API Error:', error)
    return analyzeSymptomsFallback(userMessage)
  }
}


function analyzeSymptomsFallback(userMessage) {
  const lowerMessage = userMessage.toLowerCase()

  // Symptom-based department matching
  const departmentKeywords = {
    cardiology: ['chest pain', 'heart', 'palpitation', 'blood pressure', 'cardiac', 'breathless'],
    neurology: ['headache', 'migraine', 'seizure', 'stroke', 'paralysis', 'numbness', 'brain'],
    ent: ['ear', 'nose', 'throat', 'hearing', 'sinus', 'voice', 'tonsil'],
    orthopedics: ['bone', 'fracture', 'joint', 'knee', 'back pain', 'arthritis', 'sprain'],
    pediatrics: ['child', 'baby', 'infant', 'newborn', 'vaccination'],
    emergency: ['accident', 'severe', 'bleeding', 'unconscious', 'emergency', 'trauma']
  }

  // Check for symptoms
  for (const [dept, keywords] of Object.entries(departmentKeywords)) {
    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
      return `Based on your symptoms, I recommend visiting the ${dept.charAt(0).toUpperCase() + dept.slice(1)} department at VitalCare Hospital. Our specialists can provide the appropriate care for your condition.`
    }
  }

  // Handle common hospital questions
  if (lowerMessage.includes('hours') || lowerMessage.includes('time') || lowerMessage.includes('open')) {
    return 'VitalCare Hospital is open 24/7 for emergency services. OPD hours are 9:00 AM to 5:00 PM on weekdays. For appointments, please use our booking system.'
  }

  if (lowerMessage.includes('location') || lowerMessage.includes('address') || lowerMessage.includes('where')) {
    return 'VitalCare Hospital is located in the heart of the city. Please visit our contacts page for detailed location and directions.'
  }

  // Default response for general queries
  return 'I can help you with medical questions, symptom analysis, and hospital information. For general symptoms, I recommend visiting the OPD (General) department for initial consultation. How can I assist you today?'
}
