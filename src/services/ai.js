/**
 * Service to interface with OpenRouter API
 */

const DEFAULT_MODEL = 'meta-llama/llama-3-8b-instruct:free';

/**
 * Call OpenRouter Chat Completions API
 * @param {string} prompt 
 * @param {string} apiKey 
 * @param {string} model 
 * @returns {Promise<string>} Enhanced text response
 */
export async function generateAIContent(prompt, apiKey, model = DEFAULT_MODEL) {
  if (!apiKey) {
    throw new Error('OpenRouter API key is missing. Please add it in settings.');
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'AI Resume Builder Portfolio App',
      },
      body: JSON.stringify({
        model: model || DEFAULT_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are an expert professional resume writer and career coach. Your task is to write polished, high-impact, results-oriented, ATS-friendly resume descriptions and summaries. Use strong action verbs. Quantify results where possible. Do not output conversational filler. Provide only the finalized text response.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData?.error?.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    if (!data.choices || data.choices.length === 0) {
      throw new Error('API returned an empty completion choice list.');
    }

    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenRouter API error:', error);
    throw error;
  }
}

/**
 * Helper to generate bullet points
 */
export async function enhanceBulletPoint(text, jobTitle, apiKey, model) {
  const prompt = `Enhance the following resume bullet point/description. Make it more professional, impactful, and results-oriented. Use active verbs. Keep it concise (1-2 sentences). 
Job Title context: ${jobTitle || 'General Professional'}
Original text: "${text}"`;
  return generateAIContent(prompt, apiKey, model);
}

/**
 * Helper to generate professional summary
 */
export async function generateSummary(skills, roles, apiKey, model) {
  const prompt = `Create a professional, compelling, 3-4 sentence resume summary (profile) targeting a candidate with these skills: [${skills.join(', ')}] and these roles/titles: [${roles.join(', ')}]. Keep it in first-person implicit (e.g. starting with action verbs or nouns, no "I").`;
  return generateAIContent(prompt, apiKey, model);
}
