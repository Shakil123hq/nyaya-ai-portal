import React, { useEffect, useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Users, Gavel, FileText, Clock } from 'lucide-react';

const AdvocateDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const userRole = localStorage.getItem('userRole');

    // Redirect if not logged in or not an advocate
    if (!userToken || userRole !== 'advocate') {
      navigate('/login');
    }
    // In a real application, you'd have more granular role checking
    // For example: if (userRole !== 'advocate') navigate('/unauthorized');

  }, [navigate]);

  // Mock Data for KPI Cards
  const kpiData = {
    activeClients: 25,
    casesInTrial: 7,
    judgmentsExpectedThisWeek: 3,
    researchHoursSaved: "120 Hrs", // Mock projected metric
  };

  // Mock Data for Client Case Queue
  const mockCases = [
    {
      caseNo: "CR-2023-001",
      clientName: "Ramesh Kumar",
      status: "Pre-Trial Discovery",
      nextSubmissionDate: "2023-12-15",
      firmRole: "Defense",
    },
    {
      caseNo: "CV-2023-010",
      clientName: "Priya Sharma",
      status: "Hearing Scheduled",
      nextSubmissionDate: "2023-12-01",
      firmRole: "Prosecution",
    },
    {
      caseNo: "FAM-2023-005",
      clientName: "Amit Singh",
      status: "Mediation Phase",
      nextSubmissionDate: "N/A",
      firmRole: "Defense",
    },
  ];

  const handleSearch = (query: string) => {
    console.log("Performing semantic search for:", query);
    // In a real app, this would trigger a search and display results
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-10 px-4 md:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-foreground">Advocate Toolkit</h1>

        {/* Semantic Search Bar (Primary CTA) */}
        <div className="mb-16 flex justify-center">
          <div className="relative w-full max-w-3xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Semantic Search: e.g., Precedents on property dispute claims after 10 years..."
              className="w-full pl-14 pr-28 py-4 text-lg rounded-full shadow-xl border-2 border-primary focus:border-accent ring-4 ring-transparent focus:ring-primary/20 transition-all duration-300 bg-card text-card-foreground"
              value={searchQuery} // Bind value to state
              onChange={(e) => setSearchQuery(e.target.value)} // Update state on change
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(searchQuery);
                }
              }}
            />
            <Button className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full h-11 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-colors duration-200"
              onClick={() => handleSearch(searchQuery)} // Trigger search on button click
            >
              Search
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center transform transition-transform duration-300 hover:scale-105 shadow-lg bg-card border border-border/60">
            <CardHeader>
              <Users className="h-10 w-10 text-primary mx-auto mb-3" />
              <CardTitle className="text-5xl font-bold text-primary">{kpiData.activeClients}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-base">Active Clients</p>
            </CardContent>
          </Card>
          <Card className="text-center transform transition-transform duration-300 hover:scale-105 shadow-lg bg-card border border-border/60">
            <CardHeader>
              <Gavel className="h-10 w-10 text-primary mx-auto mb-3" />
              <CardTitle className="text-5xl font-bold text-primary">{kpiData.casesInTrial}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-base">Cases in Trial</p>
            </CardContent>
          </Card>
          <Card className="text-center transform transition-transform duration-300 hover:scale-105 shadow-lg bg-card border border-border/60">
            <CardHeader>
              <FileText className="h-10 w-10 text-primary mx-auto mb-3" />
              <CardTitle className="text-5xl font-bold text-primary">{kpiData.judgmentsExpectedThisWeek}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-base">Judgments Expected This Week</p>
            </CardContent>
          </Card>
          <Card className="text-center transform transition-transform duration-300 hover:scale-105 shadow-lg bg-card border border-border/60">
            <CardHeader>
              <Clock className="h-10 w-10 text-primary mx-auto mb-3" />
              <CardTitle className="text-5xl font-bold text-primary">{kpiData.researchHoursSaved}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-base">Research Hours Saved (Est.)</p>
            </CardContent>
          </Card>
        </div>

        {/* Client Case Queue */}
        <Card className="shadow-xl mb-16 bg-card border border-border/60">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-foreground">Client Case Queue</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto rounded-b-lg">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-muted/30 border-b border-border">
                    <th className="px-6 py-4 text-left text-sm font-bold text-muted-foreground uppercase tracking-wider">Case No.</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-muted-foreground uppercase tracking-wider">Client Name</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-muted-foreground uppercase tracking-wider">Next Action Date</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-muted-foreground uppercase tracking-wider">Your Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {mockCases.map((caseItem, index) => (
                    <tr key={caseItem.caseNo} className={`transition-colors duration-200 ${index % 2 === 0 ? 'bg-background/80' : 'bg-muted/30'} hover:bg-muted/70`}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-foreground">{caseItem.caseNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{caseItem.clientName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{caseItem.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{caseItem.nextSubmissionDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{caseItem.firmRole}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Secure Client File Access */}
        <Card className="shadow-xl mb-16 bg-card border border-border/60">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-foreground">My Secure Case Files</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-base mb-6">Access your client's complete digital case files securely.</p>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 text-lg font-semibold rounded-lg shadow-md" onClick={() => console.log("Accessing Secure Client Files...")}>
              View My Secure Case Files
            </Button>
            <div className="mt-6 p-6 border border-border/60 rounded-lg bg-muted/20 text-muted-foreground min-h-[50px] shadow-inner">
              <p>Client case files will be displayed here upon selection.</p>
            </div>
          </CardContent>
        </Card>

        {/* Legal Research Console (Core Functions) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Document Comparison Tool */}
          <Card className="shadow-xl bg-card border border-border/60">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-foreground">Document Comparison Tool</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-base mb-6">Upload two legal documents to highlight key differences and conflicts.</p>
              <div className="space-y-6">
                <div>
                  <label htmlFor="doc1" className="block text-sm font-medium text-foreground mb-2">Document 1</label>
                  <Input id="doc1" type="file" className="bg-input text-input-foreground border-border/60" />
                </div>
                <div>
                  <label htmlFor="doc2" className="block text-sm font-medium text-foreground mb-2">Document 2</label>
                  <Input id="doc2" type="file" className="bg-input text-input-foreground border-border/60" />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold rounded-lg shadow-md">Compare Documents</Button>
                <div className="mt-4 p-6 border border-border/60 rounded-lg bg-muted/20 text-muted-foreground min-h-[100px] shadow-inner">
                  <p>Comparison results will appear here.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pleadings Draft Generator */}
          <Card className="shadow-xl bg-card border border-border/60">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-foreground">Pleadings Draft Generator</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-base mb-6">Generate AI-assisted drafts for common legal documents based on case facts.</p>
              <div className="space-y-6">
                <div>
                  <label htmlFor="pleadingType" className="block text-sm font-medium text-foreground mb-2">Pleading Type</label>
                  <Input id="pleadingType" type="text" placeholder="e.g., Bail Application, Written Statement" className="bg-input text-input-foreground border-border/60" />
                </div>
                <div>
                  <label htmlFor="caseFacts" className="block text-sm font-medium text-foreground mb-2">Key Case Facts</label>
                  <textarea id="caseFacts" rows={5} placeholder="Summarize key facts for AI drafting..." className="flex w-full rounded-md border border-border/60 bg-input px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px] resize-y"></textarea>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold rounded-lg shadow-md">Generate Draft</Button>
                <div className="mt-4 p-6 border border-border/60 rounded-lg bg-muted/20 text-muted-foreground min-h-[100px] shadow-inner">
                  <p>AI-generated draft will appear here.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statute/Act Browser (Full Width) */}
        <Card className="shadow-xl mb-16 bg-card border border-border/60">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-foreground">Statute/Act Browser</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-base mb-6">Search and browse an up-to-date repository of all relevant laws and acts.</p>
            <div className="flex w-full items-center space-x-4">
              <Input type="text" placeholder="Search statutes, acts, sections..." className="flex-grow bg-input text-input-foreground border-border/60 py-3 text-base" />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-semibold rounded-lg shadow-md">Browse</Button>
            </div>
            <div className="mt-6 p-6 border border-border/60 rounded-lg bg-muted/20 text-muted-foreground min-h-[150px] shadow-inner">
              <p>Search results and act details will appear here.</p>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AdvocateDashboardPage;
