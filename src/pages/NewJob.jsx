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
      <h1 className="text-2xl font-bold">New Fine-tuning Job</h1>
      <Card>
        <CardHeader>
          <CardTitle>Step {step} of 3</CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <Label htmlFor="file">Upload JSONL File</Label>
              <Input id="file" type="file" accept=".jsonl" />
              <Button onClick={nextStep}>Continue</Button>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <Label>Select Model</Label>
              <RadioGroup defaultValue="gpt4o">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gpt4o" id="gpt4o" />
                  <Label htmlFor="gpt4o">GPT-4o</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gpt4omini" id="gpt4omini" />
                  <Label htmlFor="gpt4omini">GPT-4o-mini</Label>
                </div>
              </RadioGroup>
              <div className="space-x-2">
                <Button onClick={prevStep} variant="outline">Back</Button>
                <Button onClick={nextStep}>Continue</Button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <Label htmlFor="learningRate">Learning Rate</Label>
              <Input id="learningRate" type="number" placeholder="0.001" />
              <Label htmlFor="epochs">Epochs</Label>
              <Input id="epochs" type="number" placeholder="3" />
              <Label htmlFor="batchSize">Batch Size</Label>
              <Select>
                <SelectTrigger id="batchSize">
                  <SelectValue placeholder="Select batch size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8">8</SelectItem>
                  <SelectItem value="16">16</SelectItem>
                  <SelectItem value="32">32</SelectItem>
                </SelectContent>
              </Select>
              <div className="space-x-2">
                <Button onClick={prevStep} variant="outline">Back</Button>
                <Button>Start Job</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NewJob;