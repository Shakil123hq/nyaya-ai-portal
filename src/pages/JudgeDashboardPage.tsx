import React, { useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, Scale, UserCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const JudgeDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const userRole = localStorage.getItem('userRole');

    // Redirect if not logged in or not a judge
    if (!userToken || userRole !== 'judge') {
      navigate('/login');
    }
  }, [navigate]);

  // Mock Data for KPI Cards
  const kpiData = {
    casesAssigned: 45,
    judgmentsPending: 12,
    hearingsToday: 3,
    decisionsDeliveredMonth: 8,
  };

  // Mock Data for Workload Overview Table
  const mockCases = [
    {
      caseNo: "CR-2023-001",
      parties: "State vs. John Doe",
      nextHearingDate: "2023-12-05",
      status: "Hearing Scheduled",
      priority: "High",
    },
    {
      caseNo: "CV-2023-010",
      parties: "Plaintiff A vs. Defendant B",
      nextHearingDate: "2023-11-28",
      status: "Evidence Review",
      priority: "Medium",
    },
    {
      caseNo: "FAM-2023-005",
      parties: "Petitioner X vs. Respondent Y",
      nextHearingDate: "N/A",
      status: "Judgment Reserved",
      priority: "High",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-10 px-4 md:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-foreground">Judicial Workload Console</h1>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center transform transition-transform duration-300 hover:scale-105 shadow-lg bg-card border border-border/60">
            <CardHeader>
              <Scale className="h-10 w-10 text-primary mx-auto mb-3" />
              <CardTitle className="text-5xl font-bold text-primary">{kpiData.casesAssigned}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-base">Cases Assigned</p>
            </CardContent>
          </Card>
          <Card className="text-center transform transition-transform duration-300 hover:scale-105 shadow-lg bg-card border border-border/60">
            <CardHeader>
              <FileText className="h-10 w-10 text-primary mx-auto mb-3" />
              <CardTitle className="text-5xl font-bold text-primary">{kpiData.judgmentsPending}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-base">Judgments Pending</p>
            </CardContent>
          </Card>
          <Card className="text-center transform transition-transform duration-300 hover:scale-105 shadow-lg bg-card border border-border/60">
            <CardHeader>
              <Calendar className="h-10 w-10 text-primary mx-auto mb-3" />
              <CardTitle className="text-5xl font-bold text-primary">{kpiData.hearingsToday}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-base">Hearings Today</p>
            </CardContent>
          </Card>
          <Card className="text-center transform transition-transform duration-300 hover:scale-105 shadow-lg bg-card border border-border/60">
            <CardHeader>
              <UserCheck className="h-10 w-10 text-primary mx-auto mb-3" />
              <CardTitle className="text-5xl font-bold text-primary">{kpiData.decisionsDeliveredMonth}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-base">Decisions Delivered (This Month)</p>
            </CardContent>
          </Card>
        </div>

        {/* Workload Overview Table */}
        <Card className="shadow-xl mb-16 bg-card border border-border/60">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-foreground">Workload Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto rounded-b-lg">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-muted/30 border-b border-border">
                    <th className="px-6 py-4 text-left text-sm font-bold text-muted-foreground uppercase tracking-wider">Case No.</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-muted-foreground uppercase tracking-wider">Parties</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-muted-foreground uppercase tracking-wider">Next Hearing Date</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-muted-foreground uppercase tracking-wider">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {mockCases.map((caseItem, index) => (
                    <tr key={caseItem.caseNo} className={`transition-colors duration-200 ${index % 2 === 0 ? 'bg-background/80' : 'bg-muted/30'} hover:bg-muted/70`}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-foreground">{caseItem.caseNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{caseItem.parties}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{caseItem.nextHearingDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{caseItem.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{caseItem.priority}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Judgment Drafting (Placeholder) */}
        <Card className="shadow-xl mb-16 bg-card border border-border/60">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-foreground">Judgment Drafting</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-base mb-6">AI-assisted tools to draft and review judgments efficiently.</p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold rounded-lg shadow-md">Start New Judgment</Button>
            <div className="mt-6 p-6 border border-border/60 rounded-lg bg-muted/20 text-muted-foreground min-h-[100px] shadow-inner">
              <p>Drafted judgments and templates will appear here.</p>
            </div>
          </CardContent>
        </Card>

        {/* Evidence Summarization (Placeholder) */}
        <Card className="shadow-xl mb-16 bg-card border border-border/60">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-foreground">Evidence Summarization</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-base mb-6">Quickly summarize large volumes of evidence using AI.</p>
            <div className="flex w-full items-center space-x-4">
              <Input type="text" placeholder="Enter case ID or select file..." className="flex-grow bg-input text-input-foreground border-border/60 py-3 text-base" />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-semibold rounded-lg shadow-md">Summarize</Button>
            </div>
            <div className="mt-6 p-6 border border-border/60 rounded-lg bg-muted/20 text-muted-foreground min-h-[150px] shadow-inner">
              <p>AI-generated evidence summaries will appear here.</p>
            </div>
          </CardContent>
        </Card>

        {/* Workload Balancing/Scheduling (Placeholder) */}
        <Card className="shadow-xl mb-16 bg-card border border-border/60">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-foreground">Workload & Scheduling</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-base mb-6">Manage your case workload and hearing schedules effectively.</p>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold rounded-lg shadow-md">View Full Schedule</Button>
            <div className="mt-6 p-6 border border-border/60 rounded-lg bg-muted/20 text-muted-foreground min-h-[100px] shadow-inner">
              <p>Calendar view and workload insights will be displayed here.</p>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default JudgeDashboardPage;
