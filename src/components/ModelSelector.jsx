import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ModelSelector = ({ onModelSelect, defaultModel, forFineTuning = false }) => {
  const fineTuningModels = [
    'gpt-4o-2024-08-06',
    'gpt-4o-mini-2024-07-18',
    'gpt-4o-2024-05-13'
  ];

  const models = forFineTuning ? fineTuningModels : [
    // Existing models for other pages
    'gpt-4',
    'gpt-3.5-turbo',
    'gpt-4o-2024-08-06',
    'gpt-4o-mini-2024-07-18',
    'gpt-4o-2024-05-13',
    // Add any other models you want to include for non-fine-tuning pages
  ];

  return (
    <div className="space-y-4">
      <Select onValueChange={onModelSelect} defaultValue={defaultModel}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model} value={model}>
              {model}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModelSelector;