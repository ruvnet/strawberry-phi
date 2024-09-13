import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ParameterSection = ({ learningRate, setLearningRate, epochs, setEpochs, batchSize, setBatchSize, jobSuffix, setJobSuffix }) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="jobSuffix" className="text-strawberry-600">Job Name Suffix</Label>
        <p className="text-sm text-strawberry-600 mb-2">
          Provide a custom suffix for your fine-tuned model name. This will help you identify your model easily.
        </p>
        <Input
          id="jobSuffix"
          type="text"
          value={jobSuffix}
          onChange={(e) => setJobSuffix(e.target.value)}
          placeholder="e.g., my-custom-model"
          className="border-strawberry-300 focus:border-strawberry-500"
        />
      </div>
      <div>
        <Label htmlFor="learningRate" className="text-strawberry-600">Learning Rate</Label>
        <p className="text-sm text-strawberry-600 mb-2">
          The learning rate determines how quickly the model adapts to the new data. A typical range is between 0.00001 and 0.1.
        </p>
        <Input
          id="learningRate"
          type="number"
          value={learningRate}
          onChange={(e) => setLearningRate(e.target.value)}
          min="0.00001"
          max="0.1"
          step="0.00001"
          className="border-strawberry-300 focus:border-strawberry-500"
        />
      </div>
      <div>
        <Label htmlFor="epochs" className="text-strawberry-600">Epochs</Label>
        <p className="text-sm text-strawberry-600 mb-2">
          Epochs represent the number of times the model will cycle through the entire dataset. More epochs can lead to better learning but may also result in overfitting.
        </p>
        <Input
          id="epochs"
          type="number"
          value={epochs}
          onChange={(e) => setEpochs(e.target.value)}
          min="1"
          max="10"
          className="border-strawberry-300 focus:border-strawberry-500"
        />
      </div>
      <div>
        <Label htmlFor="batchSize" className="text-strawberry-600">Batch Size</Label>
        <p className="text-sm text-strawberry-600 mb-2">
          Batch size determines how many examples the model processes before updating its parameters. Larger batch sizes can lead to faster training but may require more memory.
        </p>
        <Select value={batchSize} onValueChange={setBatchSize}>
          <SelectTrigger id="batchSize" className="border-strawberry-300 focus:border-strawberry-500">
            <SelectValue placeholder="Select batch size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="8">8</SelectItem>
            <SelectItem value="16">16</SelectItem>
            <SelectItem value="32">32</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ParameterSection;