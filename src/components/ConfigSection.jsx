import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ConfigSection = ({ config, handleInputChange, handleSliderChange }) => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="modelName">Model Name</Label>
      <Select value={config.modelName} onValueChange={(value) => handleInputChange({ target: { name: 'modelName', value } })}>
        <SelectTrigger>
          <SelectValue placeholder="Select model" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="gpt-4o-mini">GPT-4o-mini</SelectItem>
          <SelectItem value="gpt-4o">GPT-4o</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div>
      <Label htmlFor="numExamples">Number of Examples</Label>
      <Input id="numExamples" name="numExamples" value={config.numExamples} onChange={handleInputChange} type="number" />
    </div>
    <div>
      <Label htmlFor="temperature">Temperature</Label>
      <Slider
        id="temperature"
        min={0}
        max={2}
        step={0.1}
        value={[config.temperature]}
        onValueChange={(value) => handleSliderChange('temperature', value)}
      />
      <span>{config.temperature}</span>
    </div>
    <div>
      <Label htmlFor="maxTokens">Max Tokens</Label>
      <Input id="maxTokens" name="maxTokens" value={config.maxTokens} onChange={handleInputChange} type="number" />
    </div>
    <div>
      <Label htmlFor="guidancePrompt">Guidance Prompt</Label>
      <Textarea
        id="guidancePrompt"
        name="guidancePrompt"
        value={config.guidancePrompt}
        onChange={handleInputChange}
        rows={5}
      />
    </div>
  </div>
);

export default ConfigSection;