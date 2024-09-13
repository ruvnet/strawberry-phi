// generate_training_data.js

const fs = require('fs');
const fetch = require('node-fetch');
const { Configuration, OpenAIApi } = require('openai');

// Configuration Variables
const API_KEY = 'your_openai_api_key_here';  // Replace with your OpenAI API key
const MODEL_NAME = 'gpt-o1-mini';  // Specify the model name
const OUTPUT_FILE = 'training_data.jsonl';  // Output JSONL file name
const NUM_EXAMPLES = 150;  // Total number of training examples to generate
const CONCURRENT_REQUESTS = 10;  // Maximum number of concurrent API requests
const RETRY_LIMIT = 3;  // Number of retries for failed requests
const BACKOFF_FACTOR = 2000;  // Exponential backoff factor in milliseconds

// Guidance Prompt for Dynamic User Requests
const GUIDANCE_PROMPT = `
Generate a diverse set of user requests for an advanced AI assistant. 
Requests should cover various domains such as marketing, finance, technology, 
healthcare, education, and more. Each request should be a complex task that 
an executive or professional might ask, requiring detailed analysis, planning, 
or creative solutions.
`;

// Initialize OpenAI API
const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

// Utility function to sleep for a given number of milliseconds
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to generate dynamic user requests
async function generateUserRequests(numRequests) {
  const userRequests = [];
  const messages = [
    { role: 'system', content: 'You are an assistant that generates user prompts.' },
    { role: 'user', content: GUIDANCE_PROMPT }
  ];
  
  const params = {
    model: MODEL_NAME,
    messages: messages,
    max_tokens: 200,
    temperature: 0.8,
    n: numRequests,
  };

  for (let attempt = 1; attempt <= RETRY_LIMIT; attempt++) {
    try {
      const response = await openai.createChatCompletion(params);
      const choices = response.data.choices;
      for (const choice of choices) {
        const prompt = choice.message.content.trim();
        userRequests.push(prompt);
      }
      return userRequests;
    } catch (error) {
      console.error(`Error generating user requests (Attempt ${attempt}): ${error.message}`);
      if (attempt === RETRY_LIMIT) {
        return userRequests;  // Return whatever we have so far
      }
      await sleep(BACKOFF_FACTOR * attempt);
    }
  }
  return userRequests;
}

// Function to fetch assistant's response for a given prompt
async function fetchResponse(prompt) {
  const messages = [
    { role: 'system', content: 'You are an advanced, multi-modal autonomous AI agent with exceptional capabilities.' },
    { role: 'user', content: prompt }
  ];

  const params = {
    model: MODEL_NAME,
    messages: messages,
    max_tokens: 500,
    temperature: 0.7,
  };

  for (let attempt = 1; attempt <= RETRY_LIMIT; attempt++) {
    try {
      const response = await openai.createChatCompletion(params);
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

// Main function to generate training data
async function main() {
  console.log('Generating dynamic user requests...');
  let userRequests = await generateUserRequests(NUM_EXAMPLES);

  // Ensure we have the desired number of user requests
  if (userRequests.length < NUM_EXAMPLES) {
    console.log(`Only generated ${userRequests.length} user requests. Adjusting the number of examples.`);
    userRequests = userRequests.slice(0, userRequests.length);
  } else {
    userRequests = userRequests.slice(0, NUM_EXAMPLES);
  }

  const trainingData = [];
  const tasks = [];

  // Control the concurrency using batches
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

  // Write to JSONL file
  const writeStream = fs.createWriteStream(OUTPUT_FILE, { flags: 'w', encoding: 'utf-8' });
  for (const example of trainingData) {
    const jsonLine = JSON.stringify(example);
    writeStream.write(jsonLine + '\n');
  }
  writeStream.end();
  console.log(`Training data generation complete. Saved to ${OUTPUT_FILE}`);
}

// Run the main function
main().catch(error => console.error(`Error in main execution: ${error.message}`));
