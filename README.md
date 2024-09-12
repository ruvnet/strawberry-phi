# Welcome to your GPT Engineer project

## Project info

**Project**: strawberry-phi-tuner

**URL**: https://run.gptengineer.app/projects/5744d052-cf39-44c8-bd80-0b0b8047e504/improve

## Introduction

Strawberry Phi is a fine-tuning application for OpenAI's GPT models. The purpose of this project is to provide an easy-to-use interface for creating custom models tailored to specific needs. The goal is to enable users to fine-tune GPT models with their own data, resulting in models that perform better on their unique tasks.

## Technical Details

### Architecture

The system is built using a modern web stack, including Vite, React, and Tailwind CSS. The backend interacts with OpenAI's API to manage fine-tuning jobs and model testing.

### Technologies Used

- Vite
- React
- shadcn-ui
- Tailwind CSS
- OpenAI API

### System Requirements

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- OpenAI API key

## Benefits and Features

### Benefits

- Easy-to-use interface for fine-tuning GPT models
- Custom models tailored to specific needs
- Improved performance on unique tasks

### Features

- File upload and validation
- Model selection and configuration
- Fine-tuning job management
- Model testing with custom prompts
- Real-time job status updates
- Secure API key management

## Implementation

### Step-by-Step Instructions

1. Clone the repository using the project's Git URL.
   ```sh
   git clone <YOUR_GIT_URL>
   ```

2. Navigate to the project directory.
   ```sh
   cd <YOUR_PROJECT_NAME>
   ```

3. Install the necessary dependencies.
   ```sh
   npm i
   ```

4. Start the development server with auto-reloading and an instant preview.
   ```sh
   npm run dev
   ```

5. Set your OpenAI API key in the Settings page of the application.

## Advanced Features

### Additional Capabilities

- Side-by-side model comparison
- Export test results in CSV or JSON format
- Customizable model testing parameters
- Detailed response analysis
- Secure storage and encryption of API keys

### Configurations

- Toggle between light and dark modes
- Set default values for model testing parameters
- Configure notification preferences for job status updates

## Strawberry Phi by rUv: Reflection-Utilized Validation

### Reflection

Emphasizes the model’s core capability of self-reflection and self-correction.

### Utilized

Highlights the active use of reflection in improving the model's reasoning process.

### Validation

Signifies the model’s ability to validate its reasoning, detect errors, and refine outputs for accuracy.

## Use Case Overview

Strawberry Phi is an advanced multi-modal, agentic AI assistant designed for complex task handling across various domains. Developed by rUv, it uses reflection-tuning techniques to self-evaluate and correct reasoning errors. The model leverages advanced methodologies such as sequential, concurrent, recurrent, and reinforcement learning approaches for task management, planning, and execution. By incorporating multi-modal inputs and outputs (e.g., text, images, audio), it can manage various task complexities, adapt dynamically to user requirements, and continuously improve its performance. It ensures reliability by integrating self-reflection mechanisms and using Glaive's synthetic data generation for rapid fine-tuning and error minimization.

## Reflection-Tuning Technique Explanation

The reflection approach to training language models, as exemplified by Reflection 70B, is an innovative technique designed to improve model performance and reduce errors. Here's an explanation of how it works:

### Base Model

The process starts with a pre-existing large language model, in this case, Meta's Llama 3.1-70B Instruct model.

### Reflection-Tuning

This is the core technique that teaches the model to detect and correct mistakes in its own reasoning. It involves:

a) Special Tokens: The model is trained to use special tokens like , , , , , and . These tokens structure the model's thought process.

b) Reasoning Process: When given a query, the model first reasons through it within the tags. This allows the model to "think out loud" about the problem.

c) Self-Correction: If the model detects an error in its reasoning, it uses tags to acknowledge the mistake and attempt to correct it. This process can occur multiple times within a single response.

d) Final Output: Once satisfied with its reasoning, the model provides its final answer within tags.

### Synthetic Data Generation

Companies like Glaive create large datasets of synthetic data that include these reflection and correction processes. This data is used to fine-tune the base model.

### Training Process

The model is then trained on this synthetic data, learning to mimic the reflection and self-correction processes embedded in the training examples.

### Iterative Improvement

Through multiple rounds of training, the model learns to apply this reflection process to a wide variety of queries and scenarios.

### Evaluation and Refinement

The model is tested on various benchmarks, and its performance is used to further refine the training process and data generation.

The key innovation of this approach is that it teaches the model not just to provide answers, but to critically evaluate its own reasoning and correct itself when necessary. This leads to more accurate and reliable outputs, especially in complex reasoning tasks.

This reflection-tuning technique represents a significant advancement in language model training, potentially reducing hallucinations and improving the overall reliability of AI-generated responses.

## How can I edit this code?

There are several ways of editing your application.

**Use GPT Engineer**

Simply visit the GPT Engineer project at [GPT Engineer](https://gptengineer.app/projects/5744d052-cf39-44c8-bd80-0b0b8047e504/improve) and start prompting.

Changes made via gptengineer.app will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in the GPT Engineer UI.

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## How can I deploy this project?

All GPT Engineer projects can be deployed directly via the GPT Engineer app.

Simply visit your project at [GPT Engineer](https://gptengineer.app/projects/5744d052-cf39-44c8-bd80-0b0b8047e504/improve) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.gptengineer.app/tips-tricks/custom-domain/)
