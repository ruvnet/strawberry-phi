import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApiKey } from '../contexts/ApiKeyContext';
import { fetchJobs } from '../utils/openaiApi';
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const [activeJobs, setActiveJobs] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { apiKey } = useApiKey();

  useEffect(() => {
    const loadJobs = async () => {
      if (apiKey) {
        try {
          setIsLoading(true);
          const response = await fetchJobs(apiKey, 1, 20); // Fetch up to 20 jobs
          const allJobs = response.data;
          
          // Filter active jobs (status: running or queued)
          const active = allJobs.filter(job => ['running', 'queued'].includes(job.status));
          setActiveJobs(active);

          // Sort remaining jobs by created_at and take the 5 most recent
          const recent = allJobs
            .filter(job => !['running', 'queued'].includes(job.status))
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 5);
          setRecentJobs(recent);
        } catch (error) {
          console.error('Error fetching jobs:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadJobs();
  }, [apiKey]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const renderJobList = (jobs) => {
    if (isLoading) {
      return Array(3).fill(0).map((_, index) => (
        <Skeleton key={index} className="w-full h-12 mb-2" />
      ));
    }

    if (jobs.length === 0) {
      return <p className="text-strawberry-600">No jobs to display.</p>;
    }

    return jobs.map((job) => (
      <div key={job.id} className="mb-2 p-2 bg-strawberry-50 rounded-md">
        <p className="text-strawberry-700 font-semibold">{job.id}</p>
        <p className="text-strawberry-600 text-sm">Status: {job.status}</p>
        <p className="text-strawberry-600 text-sm">Created: {formatDate(job.created_at)}</p>
      </div>
    ));
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-2">Welcome to Strawberry Phi</h1>
        <p className="text-lg mb-4">Fine-tune OpenAI models with ease and efficiency.</p>
        <ul className="list-disc list-inside">
          <li>Easy-to-use interface for fine-tuning GPT models</li>
          <li>Custom models tailored to specific needs</li>
          <li>Improved performance on unique tasks</li>
          <li>Real-time job status updates</li>
          <li>Secure API key management</li>
        </ul>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-white/50 backdrop-blur-sm border-strawberry-200">
          <CardHeader>
            <CardTitle className="text-strawberry-700">Active Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            {renderJobList(activeJobs)}
          </CardContent>
        </Card>
        <Card className="bg-white/50 backdrop-blur-sm border-strawberry-200">
          <CardHeader>
            <CardTitle className="text-strawberry-700">Recent Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            {renderJobList(recentJobs)}
          </CardContent>
        </Card>
      </div>
      <div className="bg-white/50 backdrop-blur-sm border-strawberry-200 p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-bold text-strawberry-800 mb-4">Features, Benefits, and Capabilities</h2>
        <p className="text-strawberry-600 mb-4">
          Strawberry Phi is a fine-tuning application for OpenAI's GPT models. The purpose of this project is to provide an easy-to-use interface for creating custom models tailored to specific needs. The goal is to enable users to fine-tune GPT models with their own data, resulting in models that perform better on their unique tasks.
        </p>
        <h3 className="text-xl font-semibold text-strawberry-700 mb-2">Benefits</h3>
        <ul className="list-disc list-inside text-strawberry-600 mb-4">
          <li>Easy-to-use interface for fine-tuning GPT models</li>
          <li>Custom models tailored to specific needs</li>
          <li>Improved performance on unique tasks</li>
        </ul>
        <h3 className="text-xl font-semibold text-strawberry-700 mb-2">Features</h3>
        <ul className="list-disc list-inside text-strawberry-600 mb-4">
          <li>File upload and validation</li>
          <li>Model selection and configuration</li>
          <li>Fine-tuning job management</li>
          <li>Model testing with custom prompts</li>
          <li>Real-time job status updates</li>
          <li>Secure API key management</li>
        </ul>
        <h3 className="text-xl font-semibold text-strawberry-700 mb-2">Capabilities</h3>
        <ul className="list-disc list-inside text-strawberry-600">
          <li>Side-by-side model comparison</li>
          <li>Export test results in CSV or JSON format</li>
          <li>Customizable model testing parameters</li>
          <li>Detailed response analysis</li>
          <li>Secure storage and encryption of API keys</li>
        </ul>
      </div>
      <div className="bg-white/50 backdrop-blur-sm border-strawberry-200 p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-bold text-strawberry-800 mb-4">Reflection-Tuning Process and Special Tokens</h2>
        <p className="text-strawberry-600 mb-4">
          The reflection approach to training language models, as exemplified by Reflection 70B, is an innovative technique designed to improve model performance and reduce errors. Here's an explanation of how it works:
        </p>
        <h3 className="text-xl font-semibold text-strawberry-700 mb-2">Base Model</h3>
        <p className="text-strawberry-600 mb-4">
          The process starts with a pre-existing large language model, in this case, Meta's Llama 3.1-70B Instruct model.
        </p>
        <h3 className="text-xl font-semibold text-strawberry-700 mb-2">Reflection-Tuning</h3>
        <p className="text-strawberry-600 mb-4">
          This is the core technique that teaches the model to detect and correct mistakes in its own reasoning. It involves:
        </p>
        <ul className="list-disc list-inside text-strawberry-600 mb-4">
          <li><strong>Special Tokens:</strong> The model is trained to use special tokens like , , , , , and . These tokens structure the model's thought process.</li>
          <li><strong>Reasoning Process:</strong> When given a query, the model first reasons through it within the tags. This allows the model to "think out loud" about the problem.</li>
          <li><strong>Self-Correction:</strong> If the model detects an error in its reasoning, it uses tags to acknowledge the mistake and attempt to correct it. This process can occur multiple times within a single response.</li>
          <li><strong>Final Output:</strong> Once satisfied with its reasoning, the model provides its final answer within tags.</li>
        </ul>
        <h3 className="text-xl font-semibold text-strawberry-700 mb-2">Synthetic Data Generation</h3>
        <p className="text-strawberry-600 mb-4">
          Companies like Glaive create large datasets of synthetic data that include these reflection and correction processes. This data is used to fine-tune the base model.
        </p>
        <h3 className="text-xl font-semibold text-strawberry-700 mb-2">Training Process</h3>
        <p className="text-strawberry-600 mb-4">
          The model is then trained on this synthetic data, learning to mimic the reflection and self-correction processes embedded in the training examples.
        </p>
        <h3 className="text-xl font-semibold text-strawberry-700 mb-2">Iterative Improvement</h3>
        <p className="text-strawberry-600 mb-4">
          Through multiple rounds of training, the model learns to apply this reflection process to a wide variety of queries and scenarios.
        </p>
        <h3 className="text-xl font-semibold text-strawberry-700 mb-2">Evaluation and Refinement</h3>
        <p className="text-strawberry-600 mb-4">
          The model is tested on various benchmarks, and its performance is used to further refine the training process and data generation.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
