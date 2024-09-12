import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const NewJob = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-strawberry-800">New Fine-tuning Job</h1>
      <Card className="bg-white/50 backdrop-blur-sm border-strawberry-200">
        <CardHeader>
          <CardTitle className="text-strawberry-700">Step {step} of 3</CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <Label htmlFor="file" className="text-strawberry-600">Upload JSONL File</Label>
              <Input id="file" type="file" accept=".jsonl" className="border-strawberry-300 focus:border-strawberry-500" />
              <Button onClick={nextStep} className="bg-strawberry-500 hover:bg-strawberry-600 text-white">Continue</Button>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <Label className="text-strawberry-600">Select Model</Label>
              <RadioGroup defaultValue="gpt4o">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gpt4o" id="gpt4o" className="border-strawberry-400 text-strawberry-600" />
                  <Label htmlFor="gpt4o" className="text-strawberry-600">GPT-4o</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gpt4omini" id="gpt4omini" className="border-strawberry-400 text-strawberry-600" />
                  <Label htmlFor="gpt4omini" className="text-strawberry-600">GPT-4o-mini</Label>
                </div>
              </RadioGroup>
              <div className="space-x-2">
                <Button onClick={prevStep} variant="outline" className="border-strawberry-300 text-strawberry-600">Back</Button>
                <Button onClick={nextStep} className="bg-strawberry-500 hover:bg-strawberry-600 text-white">Continue</Button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <Label htmlFor="learningRate" className="text-strawberry-600">Learning Rate</Label>
              <Input id="learningRate" type="number" placeholder="0.001" className="border-strawberry-300 focus:border-strawberry-500" />
              <Label htmlFor="epochs" className="text-strawberry-600">Epochs</Label>
              <Input id="epochs" type="number" placeholder="3" className="border-strawberry-300 focus:border-strawberry-500" />
              <Label htmlFor="batchSize" className="text-strawberry-600">Batch Size</Label>
              <Select>
                <SelectTrigger id="batchSize" className="border-strawberry-300 focus:border-strawberry-500">
                  <SelectValue placeholder="Select batch size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8">8</SelectItem>
                  <SelectItem value="16">16</SelectItem>
                  <SelectItem value="32">32</SelectItem>
                </SelectContent>
              </Select>
              <div className="space-x-2">
                <Button onClick={prevStep} variant="outline" className="border-strawberry-300 text-strawberry-600">Back</Button>
                <Button className="bg-strawberry-500 hover:bg-strawberry-600 text-white">Start Job</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NewJob;