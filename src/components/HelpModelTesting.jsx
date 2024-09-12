import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HelpModelTesting = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 text-strawberry-700">Model Testing User Manual</h2>
      <p className="text-strawberry-600 mb-4">
        The Model Testing section provides a comprehensive environment for evaluating and fine-tuning your language models. This guide will walk you through all the features and settings available, helping you optimize your model's performance.
      </p>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="model-selection">
          <AccordionTrigger>Model Selection</AccordionTrigger>
          <AccordionContent>
            <p className="text-strawberry-600 mb-2">Choose the model you want to test from the dropdown menu. Available options include:</p>
            <ul className="list-disc list-inside space-y-2 text-strawberry-600">
              <li><strong>GPT-4o:</strong> The full-sized model with maximum capabilities.</li>
              <li><strong>GPT-4o-mini:</strong> A smaller, faster version with slightly reduced capabilities.</li>
              <li><strong>Fine-tuned models:</strong> Any custom models you've created through fine-tuning.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="prompt-input">
          <AccordionTrigger>Prompt Input</AccordionTrigger>
          <AccordionContent>
            <p className="text-strawberry-600 mb-2">Enter your test prompt in the provided text area. Consider the following tips:</p>
            <ul className="list-disc list-inside space-y-2 text-strawberry-600">
              <li>Be specific and clear in your instructions.</li>
              <li>Provide context if necessary.</li>
              <li>Use examples to guide the model's output format.</li>
              <li>Experiment with different phrasings to see how they affect the response.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="llm-settings">
          <AccordionTrigger>LLM Settings</AccordionTrigger>
          <AccordionContent>
            <p className="text-strawberry-600 mb-2">Adjust these parameters to fine-tune the model's behavior:</p>
            <ul className="list-disc list-inside space-y-2 text-strawberry-600">
              <li><strong>Temperature (0-2):</strong> Controls randomness. Higher values (e.g., 0.8) make output more random, while lower values (e.g., 0.2) make it more focused and deterministic.</li>
              <li><strong>Max Tokens (1-4096):</strong> The maximum length of the generated response. One token is roughly 4 characters for English text.</li>
              <li><strong>Top P (0-1):</strong> An alternative to temperature, using nucleus sampling. 0.1 means only the tokens comprising the top 10% probability mass are considered.</li>
              <li><strong>Frequency Penalty (-2.0 to 2.0):</strong> How much to penalize new tokens based on their existing frequency in the text. Higher values decrease the model's likelihood to repeat the same line verbatim.</li>
              <li><strong>Presence Penalty (-2.0 to 2.0):</strong> How much to penalize new tokens based on whether they appear in the text so far. Higher values increase the model's likelihood to talk about new topics.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="response-analysis">
          <AccordionTrigger>Response Analysis</AccordionTrigger>
          <AccordionContent>
            <p className="text-strawberry-600 mb-2">After generating a response, analyze it using these tools:</p>
            <ul className="list-disc list-inside space-y-2 text-strawberry-600">
              <li><strong>Response Display:</strong> View the model's output with proper formatting.</li>
              <li><strong>Token Usage:</strong> See how many tokens were used for the prompt and response.</li>
              <li><strong>Response Time:</strong> Check how long it took to generate the response.</li>
              <li><strong>Cost Estimation:</strong> Get an estimate of the API call cost based on current pricing.</li>
              <li><strong>Raw JSON:</strong> Examine the full API response for detailed information.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="comparison-tools">
          <AccordionTrigger>Comparison Tools</AccordionTrigger>
          <AccordionContent>
            <p className="text-strawberry-600 mb-2">Use these features to compare and evaluate model performance:</p>
            <ul className="list-disc list-inside space-y-2 text-strawberry-600">
              <li><strong>Side-by-Side Comparison:</strong> Test the same prompt with different models or settings.</li>
              <li><strong>History:</strong> Keep track of previous tests for easy reference and comparison.</li>
              <li><strong>Export Results:</strong> Save your test results in CSV or JSON format for further analysis.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="best-practices">
          <AccordionTrigger>Best Practices</AccordionTrigger>
          <AccordionContent>
            <p className="text-strawberry-600 mb-2">Follow these tips to get the most out of your model testing:</p>
            <ul className="list-disc list-inside space-y-2 text-strawberry-600">
              <li>Start with default settings and adjust one parameter at a time to understand its impact.</li>
              <li>Use a diverse set of prompts to test different aspects of the model's capabilities.</li>
              <li>Pay attention to how changes in settings affect response quality, creativity, and coherence.</li>
              <li>For tasks requiring factual accuracy, use lower temperature settings.</li>
              <li>For creative tasks, experiment with higher temperature and top_p values.</li>
              <li>Use the comparison tools to find the optimal settings for your specific use case.</li>
              <li>Regularly test your fine-tuned models against the base models to ensure improvement.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default HelpModelTesting;