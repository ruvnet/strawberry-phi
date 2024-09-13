import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ModelSelector = ({ model, setModel }) => {
  const models = [
    { id: 'gpt-4o-2024-08-06', name: 'GPT-4o (2024-08-06)' },
    { id: 'gpt-4o-mini-2024-07-18', name: 'GPT-4o mini (2024-07-18)' },
    { id: 'gpt-4o-2024-05-13', name: 'GPT-4o (2024-05-13)' },
  ];

  return (
    <div className="space-y-4">
      <Select onValueChange={setModel} value={model}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          {models.map((m) => (
            <SelectItem key={m.id} value={m.id}>
              {m.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModelSelector;