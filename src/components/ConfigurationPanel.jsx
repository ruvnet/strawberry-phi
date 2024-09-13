import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";

const ConfigurationPanel = ({ config, setConfig }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConfig(prevConfig => ({ ...prevConfig, [name]: value }));
  };

  const handleSliderChange = (name, value) => {
    setConfig(prevConfig => ({ ...prevConfig, [name]: value[0] }));
  };

  const renderSlider = (label, value, setValue, min, max, step, description) => (
    <div className="space-y-2">
      <Label htmlFor={label} className="text-strawberry-700 font-semibold">{label}</Label>
      <p className="text-xs text-strawberry-600 mb-2">{description}</p>
      <div className="flex items-center space-x-2">
        <Slider
          id={label}
          min={min}
          max={max}
          step={step}
          value={[value]}
          onValueChange={(value) => setValue(value[0])}
          className="flex-grow"
        />
        <span className="text-sm font-medium text-strawberry-700 w-12 text-right">{value}</span>
      </div>
    </div>
  );

  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-pink-100">
        <TabsTrigger value="basic" className="bg-pink-100 data-[state=active]:bg-pink-200">Basic</TabsTrigger>
        <TabsTrigger value="advanced" className="bg-pink-100 data-[state=active]:bg-pink-200">Advanced</TabsTrigger>
        <TabsTrigger value="prompt" className="bg-pink-100 data-[state=active]:bg-pink-200">Prompt</TabsTrigger>
      </TabsList>
      <TabsContent value="basic">
        <div className="space-y-4">
          <div>
            <Label htmlFor="numExamples" className="text-strawberry-700">Number of Examples</Label>
            <Input
              id="numExamples"
              name="numExamples"
              type="number"
              value={config.numExamples}
              onChange={handleInputChange}
              min="10"
              className="border-strawberry-300 focus:border-strawberry-500"
            />
            <p className="text-xs text-strawberry-600 mt-1">Minimum 10 examples required.</p>
          </div>
          {renderSlider(
            "Temperature",
            config.temperature,
            (value) => handleSliderChange('temperature', [value]),
            0,
            2,
            0.1,
            "Controls randomness: Lower values make the output more focused and deterministic."
          )}
          {renderSlider(
            "Max Completion Tokens",
            config.maxCompletionTokens,
            (value) => handleSliderChange('maxCompletionTokens', [value]),
            1,
            2048,
            1,
            "The maximum number of tokens to generate in the response."
          )}
        </div>
      </TabsContent>
      <TabsContent value="advanced">
        <div className="space-y-4">
          {renderSlider(
            "Top P",
            config.topP,
            (value) => handleSliderChange('topP', [value]),
            0,
            1,
            0.1,
            "Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered."
          )}
          {renderSlider(
            "Frequency Penalty",
            config.frequencyPenalty,
            (value) => handleSliderChange('frequencyPenalty', [value]),
            -2,
            2,
            0.1,
            "Decreases the model's likelihood to repeat the same line verbatim."
          )}
          {renderSlider(
            "Presence Penalty",
            config.presencePenalty,
            (value) => handleSliderChange('presencePenalty', [value]),
            -2,
            2,
            0.1,
            "Increases the model's likelihood to talk about new topics."
          )}
        </div>
      </TabsContent>
      <TabsContent value="prompt">
        <div>
          <Label htmlFor="guidancePrompt" className="text-strawberry-700">Guidance Prompt</Label>
          <Textarea
            id="guidancePrompt"
            name="guidancePrompt"
            value={config.guidancePrompt}
            onChange={handleInputChange}
            rows={6}
            className="border-strawberry-300 focus:border-strawberry-500"
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ConfigurationPanel;