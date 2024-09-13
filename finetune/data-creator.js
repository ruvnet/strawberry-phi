// Import axios for making HTTP requests
import axios from 'axios';

async function generateTrainingData(config) {
  const {
    API_KEY,
    MODEL_NAME,
    NUM_EXAMPLES,
    CONCURRENT_REQUESTS,
    RETRY_LIMIT,
    BACKOFF_FACTOR,
    GUIDANCE_PROMPT,
    temperature,
    maxTokens
  } = config;

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function generateUserRequests(numRequests) {
    const userRequests = [];
    const messages = [
      { role: 'system', content: 'You are an assistant that generates user prompts.' },
      { role: 'user', content: GUIDANCE_PROMPT }
    ];
    
    const params = {
      model: MODEL_NAME,
      messages: messages,
      max_tokens: maxTokens,
      temperature: temperature,
      n: numRequests,
    };

    for (let attempt = 1; attempt <= RETRY_LIMIT; attempt++) {
      try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', params, {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          }
        });
        const choices = response.data.choices;
        for (const choice of choices) {
          const prompt = choice.message.content.trim();
          userRequests.push(prompt);
        }
        return userRequests;
      } catch (error) {
        console.error(`Error generating user requests (Attempt ${attempt}): ${error.message}`);
        if (attempt === RETRY_LIMIT) {
          return userRequests;
        }
        await sleep(BACKOFF_FACTOR * attempt);
      }
    }
    return userRequests;
  }

  async function fetchResponse(prompt) {
    const messages = [
      { role: 'system', content: 'You are an advanced, multi-modal autonomous AI agent with exceptional capabilities.' },
      { role: 'user', content: prompt }
    ];

    const params = {
      model: MODEL_NAME,
      messages: messages,
      max_tokens: maxTokens,
      temperature: temperature,
    };

    for (let attempt = 1; attempt <= RETRY_LIMIT; attempt++) {
      try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', params, {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          }
        });
        const assistantContent = response.data.choices[0].message.content.trim();
        return assistantContent;
      } catch (error) {
        console.error(`Error fetching response for prompt '${prompt}' (Attempt ${attempt}): ${error.message}`);
        if (attempt === RETRY_LIMIT) {
          return `Error: ${error.message}`;
        }
        await sleep(BACKOFF_FACTOR * attempt);
      }
    }
  }

  console.log('Generating dynamic user requests...');
  let userRequests = await generateUserRequests(NUM_EXAMPLES);

  if (userRequests.length < NUM_EXAMPLES) {
    console.log(`Only generated ${userRequests.length} user requests. Adjusting the number of examples.`);
    userRequests = userRequests.slice(0, userRequests.length);
  } else {
    userRequests = userRequests.slice(0, NUM_EXAMPLES);
  }

  const trainingData = [];
  const tasks = [];

  for (let i = 0; i < userRequests.length; i += CONCURRENT_REQUESTS) {
    const batch = userRequests.slice(i, i + CONCURRENT_REQUESTS);
    const batchPromises = batch.map(async (prompt, index) => {
      const assistantResponse = await fetchResponse(prompt);
      const trainingExample = {
        messages: [
          { role: 'system', content: 'You are an advanced, multi-modal autonomous AI agent with exceptional capabilities.' },
          { role: 'user', content: prompt },
          { role: 'assistant', content: assistantResponse }
        ]
      };
      trainingData.push(trainingExample);
      console.log(`Generated example ${i + index + 1}/${NUM_EXAMPLES}`);
    });
    await Promise.all(batchPromises);
  }

  return { numExamples: trainingData.length, trainingData };
}

// Export the generateTrainingData function
export { generateTrainingData };