import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-strawberry-800">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-white/50 backdrop-blur-sm border-strawberry-200">
          <CardHeader>
            <CardTitle className="text-strawberry-700">Active Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-strawberry-600">No active jobs at the moment.</p>
          </CardContent>
        </Card>
        <Card className="bg-white/50 backdrop-blur-sm border-strawberry-200">
          <CardHeader>
            <CardTitle className="text-strawberry-700">Recent Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-strawberry-600">No recent jobs to display.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;