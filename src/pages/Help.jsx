import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import HelpOverview from '../components/HelpOverview';
import HelpFineTuning from '../components/HelpFineTuning';
import HelpJobStatus from '../components/HelpJobStatus';
import HelpModelTesting from '../components/HelpModelTesting';
import HelpSettings from '../components/HelpSettings';

const Help = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-strawberry-800">Help</h1>
      <Card className="bg-white/50 backdrop-blur-sm border-strawberry-200">
        <CardHeader>
          <CardTitle className="text-strawberry-700">OpenAI Fine-tuning Documentation</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="flex flex-wrap bg-pink-100 p-1 rounded-lg mb-4">
              <TabsTrigger value="overview" className="flex-grow mb-1 mr-1">Overview</TabsTrigger>
              <TabsTrigger value="finetune" className="flex-grow mb-1 mr-1">Fine-tuning</TabsTrigger>
              <TabsTrigger value="jobstatus" className="flex-grow mb-1 mr-1">Job Status</TabsTrigger>
              <TabsTrigger value="modeltesting" className="flex-grow mb-1 mr-1">Model Testing</TabsTrigger>
              <TabsTrigger value="settings" className="flex-grow mb-1">Settings</TabsTrigger>
            </TabsList>
            <ScrollArea className="h-[60vh] mt-4 rounded-md border border-strawberry-200 p-4">
              <TabsContent value="overview">
                <HelpOverview />
              </TabsContent>
              <TabsContent value="finetune">
                <HelpFineTuning />
              </TabsContent>
              <TabsContent value="jobstatus">
                <HelpJobStatus />
              </TabsContent>
              <TabsContent value="modeltesting">
                <HelpModelTesting />
              </TabsContent>
              <TabsContent value="settings">
                <HelpSettings />
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;