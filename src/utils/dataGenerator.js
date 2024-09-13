import axios from 'axios';

export const generateTrainingData = async (apiKey, model, config) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: model,
        messages: [
          { role: 'system', content: 'You are an AI assistant generating training data.' },
          { role: 'user', content: config.guidancePrompt }
        ],
        n: config.numExamples,
        temperature: config.temperature,
        max_tokens: config.maxCompletionTokens,
        top_p: config.topP,
        frequency_penalty: config.frequencyPenalty,
        presence_penalty: config.presencePenalty,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const generatedData = response.data.choices.map(choice => ({
      messages: [
        { role: 'system', content: 'You are an advanced, multi-modal autonomous AI agent with exceptional capabilities.' },
        { role: 'user', content: choice.message.content },
        { role: 'assistant', content: 'Generated response placeholder' }
      ]
    }));

    return {
      data: generatedData,
      rawResponse: response.data
    };
  } catch (error) {
    console.error('Error generating training data:', error);
    throw error;
  }
};