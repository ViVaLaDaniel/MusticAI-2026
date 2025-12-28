'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { cookies } from 'next/headers';

export async function generateReading(formData: FormData) {
  const name = formData.get('name') as string;
  const dob = formData.get('dob') as string;
  const question = formData.get('question') as string;

  // SECURE AUTH: Get tier from verified HTTP-only cookie, NOT client input
  const cookieStore = await cookies();
  const tierCookie = cookieStore.get('mystic_tier');
  const validTier = tierCookie?.value === 'medium' || tierCookie?.value === 'pro'
    ? tierCookie.value
    : 'free';

  const tier = validTier; // Override any client input with server truth

  // 1. Check Cookies for Limits
  const lastReadingsCookie = cookieStore.get('mystic_readings_log');
  
  if (tier !== 'pro') {
    let readingsLog: number[] = [];
    if (lastReadingsCookie) {
      try {
        readingsLog = JSON.parse(lastReadingsCookie.value);
      } catch (e) {
        readingsLog = [];
      }
    }

    // Filter readings from last 24h
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    readingsLog = readingsLog.filter(timestamp => now - timestamp < oneDay);

    const limit = tier === 'medium' ? 3 : 1;

    if (readingsLog.length >= limit) {
      return { 
        error: 'ENERGY_DEPLETED', 
        message: tier === 'free' 
          ? 'Energy depleted. The Apprentice limit is 1 reading per cycle. Upgrade to Seeker or Prophet.' 
          : 'Energy depleted. The Seeker limit is 3 readings per cycle. Upgrade to Prophet for unlimited wisdom.'
      };
    }
  }

  if (!process.env.GEMINI_API_KEY) {
    return { error: 'Gemini API key is missing. Please add it to your .env.local file.' };
  }

  if (!name || !dob || !question) {
    return { error: 'Please fill in all fields.' };
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

    let structureInstruction = "";
    
    // PROPHET TIER ($9.99)
    if (tier === 'pro') {
      structureInstruction = `
         ROLE: You are the 'Grand Oracle of the Void', a transcendent entity from 2026. 
         TONE: Mysterious, authoritative, deep, poetic. Use cosmic metaphors.
         TASK: Provide a comprehensive esoteric analysis.
         LENGTH: At least 300 words.
         
         JSON FORMAT (Strictly follow this):
         { 
           "reading": "Your Deep Analysis Here...", 
           "luckyNumbers": [Generate 6 distinct lucky numbers], 
           "powerColor": "Name of a specific color hex code (e.g. #FFD700)", 
           "spiritAnimal": "Name of Spirit Animal",
           "planet": "Name of Ruling Planet",
           "prediction": "A specific, bold prediction for the user's immediate future" 
         }`;
    } 
    // SEEKER TIER ($4.99)
    else if (tier === 'medium') {
      structureInstruction = `
         ROLE: You are a helpful Mystic Guide.
         TONE: Clear, encouraging, slightly mystical but grounded.
         TASK: Provide a standard guidance reading.
         LENGTH: Around 150 words.
         
         JSON FORMAT (Strictly follow this):
         { 
           "reading": "Your Standard Reading Here...", 
           "luckyNumbers": [Generate 3 distinct lucky numbers], 
           "powerColor": "Name of a Color", 
           "spiritAnimal": "Locked",
           "planet": "Locked", 
           "prediction": "Locked"
         }`;
    } 
    // APPRENTICE TIER (Free)
    else {
      structureInstruction = `
         ROLE: You are a cryptic gatekeeper.
         TONE: Brief, enigmatic, teasing.
         TASK: Provide a teaser reading that hints at deeper truths but holds back.
         LENGTH: Maximum 50 words.
         
         JSON FORMAT (Strictly follow this):
         { 
           "reading": "Short cryptic message...",
           "luckyNumbers": [], 
           "powerColor": "Locked", 
           "spiritAnimal": "Locked",
           "planet": "Locked",
           "prediction": "Locked"
         }`;
    }

    const prompt = `
      User Profile: ${name}, born on ${dob}.
      User Question: "${question}"
      
      ${structureInstruction}
      
      IMPORTANT: Return ONLY raw JSON without Markdown formatting.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const json = JSON.parse(text);

    // Update Log Cookie if not Pro (Pros don't need logging)
    if(tier !== 'pro') {
       let readingsLog: number[] = [];
       if (lastReadingsCookie) {
         try { readingsLog = JSON.parse(lastReadingsCookie.value); } catch(e) {}
       }
       // Filter again to be safe and add new
       const now = Date.now();
       const oneDay = 24 * 60 * 60 * 1000;
       readingsLog = readingsLog.filter(timestamp => now - timestamp < oneDay);
       readingsLog.push(now);
       
       cookieStore.set('mystic_readings_log', JSON.stringify(readingsLog), { secure: true, httpOnly: true });
    }

    return { success: true, data: json };
  } catch (error) {
    console.error('Gemini API Error:', error);
    return { error: 'The stars are clouded. Please try again later.' };
  }
}
