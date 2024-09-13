import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrainingDataDisplay from './TrainingDataDisplay';

const GeneratedDataPanel = ({ generatedData, rawResponse }) => {
  return (
    <Card className="bg-white/50 backdrop-blur-sm border-strawberry-200">
      <CardHeader>
        <CardTitle className="text-strawberry-700">Generated Training Data</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="formatted">
          <TabsList className="mb-4">
            <TabsTrigger value="formatted">Formatted</TabsTrigger>
            <TabsTrigger value="raw">Raw</TabsTrigger>
          </TabsList>
          <TabsContent value="formatted">
            {generatedData ? (
              <TrainingDataDisplay data={generatedData} />
            ) : (
              <p className="text-strawberry-600">No data generated yet. Configure and run the generation to see results.</p>
            )}
          </TabsContent>
          <TabsContent value="raw">
            {rawResponse ? (
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code className="text-sm text-strawberry-800">{rawResponse}</code>
              </pre>
            ) : (
              <p className="text-strawberry-600">No data generated yet. Configure and run the generation to see results.</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GeneratedDataPanel;