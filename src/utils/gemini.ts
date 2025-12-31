import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('⚠️  Gemini API key not found in environment variables');
  console.warn('💡 Please check your .env file and ensure VITE_GEMINI_API_KEY is set');
}

let genAI: GoogleGenerativeAI | null = null;

if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
} else {
  console.error('❌ Gemini API not initialized - missing API key');
  console.error('📋 To fix this issue:');
  console.error('   1. Get an API key from https://makersuite.google.com/app/apikey');
  console.error('   2. Create a .env file in the project root');
  console.error('   3. Add: VITE_GEMINI_API_KEY=your_actual_api_key_here');
  console.error('   4. Restart the development server');
}

export const getModel = () => {
  if (!genAI) {
    throw new Error('Gemini API not initialized - missing API key');
  }
  // Using gemini-2.5-flash for enhanced performance
  return genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });
};

export const generateContent = async (prompt: string) => {
  try {
    if (!genAI) {
      throw new Error('Gemini API not initialized - missing API key');
    }
    const model = getModel();
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
};