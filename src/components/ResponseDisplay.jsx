import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from 'react-markdown';

const ResponseDisplay = ({ response, rawResponse }) => {
  return (
    <Card className="bg-white/50 backdrop-blur-sm border-strawberry-200">
      <CardHeader>
        <CardTitle className="text-strawberry-700">Model Response</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="rendered">
          <TabsList className="mb-4">
            <TabsTrigger value="rendered">Rendered</TabsTrigger>
            <TabsTrigger value="raw">Raw</TabsTrigger>
          </TabsList>
          <TabsContent value="rendered">
            {response ? (
              <div className="prose prose-strawberry max-w-none">
                <ReactMarkdown>{response}</ReactMarkdown>
              </div>
            ) : (
              <p className="text-strawberry-600">No response yet. Test the model to see results.</p>
            )}
          </TabsContent>
          <TabsContent value="raw">
            {rawResponse ? (
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code className="text-sm text-strawberry-800">{rawResponse}</code>
              </pre>
            ) : (
              <p className="text-strawberry-600">No response yet. Test the model to see results.</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ResponseDisplay;