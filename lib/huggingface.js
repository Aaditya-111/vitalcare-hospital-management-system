import { HfInference } from '@huggingface/inference'

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

export async function analyzeMedicalSymptoms(symptoms) {
  try {
    const prompt = `Based on these symptoms: "${symptoms}", which medical department should the patient visit? Choose from: Cardiology, Neurology, OPD (General), ENT, Orthopedics, Pediatrics, Emergency. Provide a brief explanation.`
    
    const response = await hf.textGeneration({
      model: 'microsoft/BioGPT-Large',
      inputs: prompt,
      parameters: {
        max_new_tokens: 100,
        temperature: 0.7,
      }
    })
    
    return response.generated_text
  } catch (error) {
    console.error('Hugging Face API Error:', error)
    return analyzeSymptomsFallback(symptoms)
  }
}

function analyzeSymptomsFallback(symptoms) {
  const lowerSymptoms = symptoms.toLowerCase()
  
  const departmentKeywords = {
    cardiology: ['chest pain', 'heart', 'palpitation', 'blood pressure', 'cardiac', 'breathless'],
    neurology: ['headache', 'migraine', 'seizure', 'stroke', 'paralysis', 'numbness', 'brain'],
    ent: ['ear', 'nose', 'throat', 'hearing', 'sinus', 'voice', 'tonsil'],
    orthopedics: ['bone', 'fracture', 'joint', 'knee', 'back pain', 'arthritis', 'sprain'],
    pediatrics: ['child', 'baby', 'infant', 'newborn', 'vaccination'],
    emergency: ['accident', 'severe', 'bleeding', 'unconscious', 'emergency', 'trauma']
  }
  
  for (const [dept, keywords] of Object.entries(departmentKeywords)) {
    if (keywords.some(keyword => lowerSymptoms.includes(keyword))) {
      return `Based on your symptoms, I recommend visiting the ${dept.toUpperCase()} department.`
    }
  }
  
  return 'Based on your symptoms, I recommend visiting the OPD (General) department for initial consultation.'
}

export default hf
