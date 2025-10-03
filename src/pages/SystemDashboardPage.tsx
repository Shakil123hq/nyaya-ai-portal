import React, { useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, Users, Clock, Database } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SystemDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const userRole = localStorage.getItem('userRole');

    // Redirect if not logged in or not a system user
    if (!userToken || userRole !== 'system') {
      navigate('/login');
    }
  }, [navigate]);

  // Mock Data for KPI Cards
  const kpiData = {
    totalCasesFiled: 1250,
    activeUsers: 345,
    systemUptime: "99.9%",
    dataIntegrityScore: "98%",
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-8 text-center">Nyaya AI System Administration</h1>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center transform transition-transform duration-300 hover:scale-105">
            <CardHeader>
              <LayoutDashboard className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-4xl font-bold text-primary">{kpiData.totalCasesFiled}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Total Cases Filed</p>
            </CardContent>
          </Card>
          <Card className="text-center transform transition-transform duration-300 hover:scale-105">
            <CardHeader>
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-4xl font-bold text-primary">{kpiData.activeUsers}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Active Users</p>
            </CardContent>
          </Card>
          <Card className="text-center transform transition-transform duration-300 hover:scale-105">
            <CardHeader>
              <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-4xl font-bold text-primary">{kpiData.systemUptime}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">System Uptime</p>
            </CardContent>
          </Card>
          <Card className="text-center transform transition-transform duration-300 hover:scale-105">
            <CardHeader>
              <Database className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-4xl font-bold text-primary">{kpiData.dataIntegrityScore}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Data Integrity Score</p>
            </CardContent>
          </Card>
        </div>

        {/* Smart Scheduling (Placeholder) */}
        <Card className="shadow-lg mb-12">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Smart Scheduling</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Manage court schedules, judge assignments, and resource allocation efficiently.</p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">View Scheduling Dashboard</Button>
            <div className="mt-4 p-4 border rounded-md bg-muted/20 text-muted-foreground min-h-[100px]">
              <p>Calendar view and scheduling tools will be displayed here.</p>
            </div>
          </CardContent>
        </Card>

        {/* Transparency Dashboards (Placeholder) */}
        <Card className="shadow-lg mb-12">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Transparency Dashboards</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Visualize system-wide data, case progress, and key performance indicators.</p>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">View All Dashboards</Button>
            <div className="mt-4 p-4 border rounded-md bg-muted/20 text-muted-foreground min-h-[100px]">
              <p>Interactive data visualizations and reports will be displayed here.</p>
            </div>
          </CardContent>
        </Card>

        {/* Paperless Workflow Management (Placeholder) */}
        <Card className="shadow-lg mb-12">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Paperless Workflow Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Tools for digitizing and managing document flows securely.</p>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Manage Workflows</Button>
            <div className="mt-4 p-4 border rounded-md bg-muted/20 text-muted-foreground min-h-[100px]">
              <p>Document upload, routing, and approval processes will be managed here.</p>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default SystemDashboardPage;
