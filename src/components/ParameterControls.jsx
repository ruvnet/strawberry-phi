import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const ParameterControls = ({ parameters, setParameters, selectedModel }) => {
  const isO1Model = selectedModel.includes('o1');

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
          disabled={isO1Model && label === "Temperature"}
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
        <TabsTrigger value="penalties" className="bg-pink-100 data-[state=active]:bg-pink-200">Penalties</TabsTrigger>
      </TabsList>
      <TabsContent value="basic">
        {renderSlider(
          "Temperature",
          parameters.temperature,
          (value) => setParameters({ ...parameters, temperature: value }),
          0,
          2,
          0.1,
          isO1Model ? "Temperature is fixed at 1 for o1 models." : "Controls randomness: Lower values make the output more focused and deterministic."
        )}
        {renderSlider(
          "Max Tokens",
          parameters.maxTokens,
          (value) => setParameters({ ...parameters, maxTokens: value }),
          1,
          2048,
          1,
          "The maximum number of tokens to generate in the response."
        )}
      </TabsContent>
      <TabsContent value="advanced">
        {renderSlider(
          "Top P",
          parameters.topP,
          (value) => setParameters({ ...parameters, topP: value }),
          0,
          1,
          0.1,
          "Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered."
        )}
      </TabsContent>
      <TabsContent value="penalties">
        {renderSlider(
          "Frequency Penalty",
          parameters.frequencyPenalty,
          (value) => setParameters({ ...parameters, frequencyPenalty: value }),
          -2,
          2,
          0.1,
          "Decreases the model's likelihood to repeat the same line verbatim."
        )}
        {renderSlider(
          "Presence Penalty",
          parameters.presencePenalty,
          (value) => setParameters({ ...parameters, presencePenalty: value }),
          -2,
          2,
          0.1,
          "Increases the model's likelihood to talk about new topics."
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ParameterControls;