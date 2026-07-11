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

/**
 * Generate a complete resume from minimal user inputs using AI.
 * Returns a parsed JSON object matching the resume state schema.
 * @param {object} inputs - { name, phone, education, projects, expertise }
 * @param {string} apiKey
 * @param {string} model
 * @returns {Promise<object>} Complete resume state object
 */
export async function generateFullResume(inputs, apiKey, model) {
  if (!apiKey) {
    throw new Error('OpenRouter API key is missing. Please add it in settings.');
  }

  const systemPrompt = `You are an expert professional resume writer. Given minimal user inputs, you must generate a COMPLETE, professional, ATS-friendly resume. You MUST respond with ONLY a valid JSON object (no markdown, no code fences, no explanation). The JSON must exactly follow this schema:

{
  "personal": {
    "name": "string",
    "title": "string (professional title based on their expertise)",
    "email": "string (generate a professional email based on their name, use @gmail.com)",
    "phone": "string",
    "website": "",
    "linkedin": "",
    "github": "",
    "summary": "string (3-4 sentence professional summary)"
  },
  "experience": [
    {
      "company": "string",
      "role": "string",
      "startDate": "string (e.g. Jan 2022)",
      "endDate": "string (e.g. Present)",
      "description": "string (2-4 bullet points separated by newlines, each starting with a strong action verb, quantified where possible)"
    }
  ],
  "projects": [
    {
      "name": "string",
      "link": "",
      "description": "string (2-3 bullet points separated by newlines)"
    }
  ],
  "education": [
    {
      "institution": "string",
      "degree": "string",
      "startDate": "string",
      "endDate": "string",
      "details": "string"
    }
  ],
  "skills": ["string", "string", "...at least 8-12 relevant skills"]
}

IMPORTANT RULES:
- Generate 2-3 realistic work experiences based on the user's expertise level
- Use the projects they mentioned and expand descriptions professionally
- Parse their education input into structured entries
- Generate 8-12 relevant technical and soft skills
- Make all bullet points action-oriented and quantified
- The professional title should reflect their expertise
- ONLY output valid JSON. No markdown code fences, no explanation text.`;

  const userPrompt = `Generate a complete professional resume for this person:

Name: ${inputs.name || 'John Doe'}
Phone: ${inputs.phone || 'Not provided'}
Education: ${inputs.education || 'Not provided'}
Projects: ${inputs.projects || 'Not provided'}
Expertise, Skills & Resume Motive: ${inputs.expertise || 'Not provided'}

Generate the complete resume JSON now.`;

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
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
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
      throw new Error('API returned an empty response.');
    }

    let content = data.choices[0].message.content.trim();
    
    // Strip markdown code fences if model wraps in ```json ... ```
    content = content.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/i, '');
    
    // Try to extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('AI response did not contain valid JSON. Please try again.');
    }

    const resumeData = JSON.parse(jsonMatch[0]);

    // Validate required fields exist
    if (!resumeData.personal || !resumeData.skills) {
      throw new Error('AI response is missing required resume sections. Please try again.');
    }

    // Ensure arrays exist
    resumeData.experience = resumeData.experience || [];
    resumeData.projects = resumeData.projects || [];
    resumeData.education = resumeData.education || [];
    resumeData.skills = resumeData.skills || [];

    return resumeData;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('AI returned malformed JSON. Please try again or use a different model.');
    }
    console.error('Full resume generation error:', error);
    throw error;
  }
}
