import React from 'react';
import { Textarea } from "@/components/ui/textarea";

const JsonDisplay = ({ jsonContent }) => {
  const formatJson = (content) => {
    if (!content) return '';
    try {
      // First, try to parse it as JSON
      const parsed = JSON.parse(content);
      return JSON.stringify(parsed, null, 2);
    } catch (error) {
      // If parsing fails, it might be JSONL, so we'll format it line by line
      return content.split('\n').map(line => {
        try {
          return JSON.stringify(JSON.parse(line), null, 2);
        } catch (e) {
          // If individual line parsing fails, return the original line
          return line;
        }
      }).join('\n');
    }
  };

  const formattedJson = formatJson(jsonContent);

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