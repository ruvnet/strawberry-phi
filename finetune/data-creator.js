import axios from 'axios';

const config = {
  API_KEY: 'your_openai_api_key_here',
  MODEL_NAME: 'gpt-4o-2024-08-06',
  NUM_EXAMPLES: 150,
  CONCURRENT_REQUESTS: 10,
  RETRY_LIMIT: 3,
  BACKOFF_FACTOR: 2,
  GUIDANCE_PROMPT: `Generate a diverse set of user requests for an advanced AI assistant. 
Each request should be a complex task that an executive or professional might ask, 
requiring detailed analysis, planning, or creative solutions. 
Format each request as a JSON object with a 'messages' array containing 'role' and 'content' keys. 
Example format:
{
  "messages": [
    {"role": "system", "content": "You are an advanced, multi-modal autonomous AI agent with exceptional capabilities."},
    {"role": "user", "content": "User's complex request goes here"},
    {"role": "assistant", "content": "AI's detailed response goes here"}
  ]
}`,
  temperature: 0.8,
  maxCompletionTokens: 500
};

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function makeApiRequest(endpoint, data, retryCount = 0) {
  try {
    const response = await axios.post(`https://api.openai.com/v1/${endpoint}`, data, {
      headers: {
        'Authorization': `Bearer ${config.API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    if (retryCount < config.RETRY_LIMIT) {
      await sleep(config.BACKOFF_FACTOR * (retryCount + 1) * 1000);
      return makeApiRequest(endpoint, data, retryCount + 1);
    }
    throw error;
  }
}

async function generateUserRequests(numRequests) {
  const data = {
    model: config.MODEL_NAME,
    messages: [
      { role: 'system', content: 'You are an assistant that generates user prompts.' },
      { role: 'user', content: config.GUIDANCE_PROMPT }
    ],
    max_tokens: config.maxCompletionTokens,
    temperature: config.temperature,
    n: numRequests,
  };

  const response = await makeApiRequest('chat/completions', data);
  return response.choices.map(choice => {
    try {
      return JSON.parse(choice.message.content.trim());
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return null;
    }
  }).filter(Boolean);
}

async function fetchResponse(prompt) {
  const data = {
    model: config.MODEL_NAME,
    messages: [
      { role: 'system', content: 'You are an advanced, multi-modal autonomous AI agent with exceptional capabilities.' },
      { role: 'user', content: prompt }
    ],
    max_tokens: config.maxCompletionTokens,
    temperature: config.temperature,
  };

  const response = await makeApiRequest('chat/completions', data);
  return response.choices[0].message.content.trim();
}

async function generateTrainingData() {
  console.log('Generating dynamic user requests...');
  let userRequests = await generateUserRequests(config.NUM_EXAMPLES);

  const trainingData = [];
  const tasks = userRequests.map(async (request, index) => {
    const assistantResponse = await fetchResponse(request.messages[1].content);
    request.messages.push({ role: 'assistant', content: assistantResponse });
    trainingData.push(request);
    console.log(`Generated example ${index + 1}/${config.NUM_EXAMPLES}`);
  });

  await Promise.all(tasks);
  return { numExamples: trainingData.length, trainingData };
}

export { generateTrainingData };