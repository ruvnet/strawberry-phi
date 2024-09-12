import React from 'react';
import { Textarea } from "@/components/ui/textarea";

const JsonDisplay = ({ jsonContent }) => {
  const formattedJson = jsonContent ? JSON.stringify(JSON.parse(jsonContent), null, 2) : '';

  return (
    <Textarea
      className="mt-2 text-strawberry-600 h-48 font-mono"
      value={formattedJson}
      readOnly
      placeholder={jsonContent ? "JSON content will be displayed here" : "Upload a file or select pre-existing file to see its content"}
    />
  );
};

export default JsonDisplay;