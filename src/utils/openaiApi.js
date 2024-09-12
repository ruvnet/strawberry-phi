import axios from 'axios';

const OPENAI_API_URL = 'https://api.openai.com/v1';

export const fetchJobs = async (apiKey, page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${OPENAI_API_URL}/fine-tunes`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      params: {
        limit: limit,
        offset: (page - 1) * limit
      }
    });

    return {
      data: response.data.data,
      total: response.data.total
    };
  } catch (error) {
    console.error('Error fetching jobs from OpenAI:', error);
    throw error;
  }
};

export const createFineTuningJob = async (apiKey, formData) => {
  try {
    const response = await axios.post(`${OPENAI_API_URL}/fine-tunes`, formData, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating fine-tuning job:', error);
    throw error;
  }
};

export const fetchJobStatus = async (apiKey, jobId) => {
  try {
    const response = await axios.get(`${OPENAI_API_URL}/fine-tunes/${jobId}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching job status from OpenAI:', error);
    throw error;
  }
};