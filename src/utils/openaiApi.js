import axios from 'axios';

const OPENAI_API_URL = 'https://api.openai.com/v1';

export const fetchJobs = async (apiKey, page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${OPENAI_API_URL}/fine_tuning/jobs`, {
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

export const createFineTuningJob = async (apiKey, jobData) => {
  try {
    const response = await axios.post(`${OPENAI_API_URL}/fine_tuning/jobs`, jobData, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
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
    const response = await axios.get(`${OPENAI_API_URL}/fine_tuning/jobs/${jobId}`, {
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

export const fetchJobEvents = async (apiKey, jobId) => {
  try {
    const response = await axios.get(`${OPENAI_API_URL}/fine_tuning/jobs/${jobId}/events`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching job events from OpenAI:', error);
    throw error;
  }
};