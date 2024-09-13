import axios from 'axios';

const CONFIG = {
  MODEL_NAME: 'gpt-4o-mini',
  NUM_EXAMPLES: 150,
  CONCURRENT_REQUESTS: 10,
  RETRY_LIMIT: 3,
  BACKOFF_FACTOR: 2,
  GUIDANCE_PROMPT: `Generate a diverse set of user requests for an advanced AI assistant. 
Requests should cover various domains such as marketing, finance, technology, 
healthcare, education, and more. Each request should be a complex task that 
an executive or professional might ask, requiring detailed analysis, planning, 
or creative solutions.`
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function makeRequest(url, data, headers, attempt = 1) {
  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    if (attempt >= CONFIG.RETRY_LIMIT) {
      throw error;
    }
    await sleep(CONFIG.BACKOFF_FACTOR ** attempt * 1000);
    return makeRequest(url, data, headers, attempt + 1);
  }
}

async function generateUserRequests(API_KEY, numRequests) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  };
  const data = {
    model: CONFIG.MODEL_NAME,
    messages: [
      { role: 'system', content: 'You are an assistant that generates user prompts.' },
      { role: 'user', content: CONFIG.GUIDANCE_PROMPT }
    ],
    max_tokens: 200,
    temperature: 0.8,
    n: numRequests
  };

  const result = await makeRequest('https://api.openai.com/v1/chat/completions', data, headers);
  return result.choices.map(choice => choice.message.content.trim());
}

async function fetchResponse(API_KEY, prompt) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  };
  const data = {
    model: CONFIG.MODEL_NAME,
    messages: [
      { role: 'system', content: 'You are an advanced, multi-modal autonomous AI agent with exceptional capabilities.' },
      { role: 'user', content: prompt }
    ],
    max_tokens: 500,
    temperature: 0.7
  };

  const result = await makeRequest('https://api.openai.com/v1/chat/completions', data, headers);
  return result.choices[0].message.content.trim();
}

async function generateTrainingExample(API_KEY, prompt) {
  const assistantResponse = await fetchResponse(API_KEY, prompt);
  return {
    messages: [
      { role: 'system', content: 'You are an advanced, multi-modal autonomous AI agent with exceptional capabilities.' },
      { role: 'user', content: prompt },
      { role: 'assistant', content: assistantResponse }
    ]
  };
}

export async function generateTrainingData(API_KEY) {
  console.log("Generating dynamic user requests...");
  const userRequests = await generateUserRequests(API_KEY, CONFIG.NUM_EXAMPLES);

  const adjustedNumExamples = Math.min(userRequests.length, CONFIG.NUM_EXAMPLES);
  console.log(`Generating ${adjustedNumExamples} training examples...`);

  const trainingData = [];
  const batchSize = CONFIG.CONCURRENT_REQUESTS;

  for (let i = 0; i < adjustedNumExamples; i += batchSize) {
    const batch = userRequests.slice(i, i + batchSize);
    const batchPromises = batch.map(prompt => generateTrainingExample(API_KEY, prompt));
    const batchResults = await Promise.all(batchPromises);
    trainingData.push(...batchResults);
    console.log(`Generated examples ${i + 1} to ${Math.min(i + batchSize, adjustedNumExamples)}/${adjustedNumExamples}`);
  }

  return { numExamples: trainingData.length, trainingData };
}