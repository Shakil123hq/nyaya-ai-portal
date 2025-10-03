import React, { useEffect, useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, Scale, UserCheck, ChevronLeft, ChevronRight, CalendarDays, Clock, RotateCcw, Search, FileEdit, Lock, Info, Shield, Upload, Sparkles, CheckCircle, AlertTriangle, ListTree, ArrowUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const JudgeDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Daily Docket'); // State to manage active tab
  const [currentDate, setCurrentDate] = useState(new Date('2025-10-03')); // Mock current date
  const [selectedCase, setSelectedCase] = useState<any | null>(null); // State to manage selected case for Case Files
  const [selectedDetailTab, setSelectedDetailTab] = useState('Overview'); // State for tabs within case details

  // States for Evidence Summary
  const [documentText, setDocumentText] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [generatedSummary, setGeneratedSummary] = useState<any | null>(null); // Changed to any for structured data
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  // States for Precedents
  const [keyFactsQuery, setKeyFactsQuery] = useState('');
  const [precedentSearchResults, setPrecedentSearchResults] = useState<any[]>([]);
  const [selectedPrecedent, setSelectedPrecedent] = useState<any | null>(null);

  // States for Order Drafting
  const [orderDraftText, setOrderDraftText] = useState('');

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
    casesAssigned: 247,
    totalDisposed: 89,
    judgmentsReserved: 12,
    avgHearingTime: "42 min",
  };

  // Mock Data for Assigned Cases (Left Panel in Case Files)
  const mockAssignedCases = [
    {
      caseNo: "CRL/2024/1845",
      parties: "State vs. Rajesh Kumar",
      status: "Under Trial",
      filedDate: "8/15/2024",
      legalSections: ["IPC 420", "IPC 467", "IPC 471"],
      legalSectionsString: "IPC 420, IPC 467, IPC 471",
      firNo: "247/2024",
      policeStation: "Central District PS",
      firDateTime: "August 15, 2024, 11:30 AM",
      complainant: "Vijay Sharma",
      firDetails: "The complainant alleges that on August 14, 2024, the accused Rajesh Kumar fraudulently obtained Rs. 5,00,000 by presenting forged documents claiming ownership of property located at Plot No. 42, Sector 7. Investigation revealed that the documents were fabricated using forged signatures and fake property stamps.",
      advocateFilingsList: [
        { title: "Defense Reply to Charges", filedBy: "Adv. Ramesh Gupta", date: "2024-09-15" },
        { title: "Application for Bail", filedBy: "Adv. Ramesh Gupta", date: "2024-09-20" },
        { title: "List of Defense Witnesses", filedBy: "Adv. Ramesh Gupta", date: "2024-09-25" },
        { title: "Prosecution Evidence List", filedBy: "APP Sunita Verma", date: "2024-10-01" },
      ],
      evidenceLogList: [
        { evidenceId: "EV-001", title: "Forged Property Deed", type: "Document", loggedDate: "2024-08-16" },
        { evidenceId: "EV-002", title: "Bank Transaction Records", type: "Document", loggedDate: "2024-08-18" },
        { evidenceId: "EV-003", title: "Seized Mobile Phone", type: "Physical", loggedDate: "2024-08-16" },
        { evidenceId: "EV-004", title: "Email Correspondence", type: "Digital", loggedDate: "2024-08-20" },
      ],
    },
    {
      caseNo: "CRL/2024/1923",
      parties: "State vs. Meena Devi",
      status: "Evidence Stage",
      filedDate: "7/20/2024",
      legalSections: ["IPC 302"],
      legalSectionsString: "IPC 302",
      firDetails: "[Mock FIR Details for CRL/2024/1923]",
      advocateFilings: "[Mock Advocate Filings for CRL/2024/1923]",
      evidenceLog: "[Mock Evidence Log for CRL/2024/1923]",
    },
    {
      caseNo: "CIV/2024/0782",
      parties: "Sharma Industries vs. City Corporation",
      status: "Final Arguments",
      filedDate: "9/01/2024",
      legalSections: ["Contract Act Sec 10", "Arbitration Act Sec 34"],
      legalSectionsString: "Contract Act Sec 10, Arbitration Act Sec 34",
      firDetails: "[Mock FIR Details for CIV/2024/0782]",
      advocateFilings: "[Mock Advocate Filings for CIV/2024/0782]",
      evidenceLog: "[Mock Evidence Log for CIV/2024/0782]",
    },
  ];

  const mockPrecedentResults = [
    {
      caseTitle: "State of Maharashtra vs. Anil Deshmukh",
      citation: "2019 (3) Bom CR 234",
      court: "Bombay High Court",
      year: 2019,
      relevanceScore: 94,
    },
    {
      caseTitle: "Rajesh Kumar vs. Union of India",
      citation: "2021 (3) SCC 445",
      court: "Supreme Court of India",
      year: 2021,
      relevanceScore: 90,
    },
    {
      caseTitle: "State vs. Mohan Lal",
      citation: "2020 (2) Del HC 187",
      court: "Delhi High Court",
      year: 2020,
      relevanceScore: 87,
    },
    {
      caseTitle: "Kumar Bros. vs. State Bank",
      citation: "2018 (4) Cal HC 332",
      court: "Calcutta High Court",
      year: 2018,
      relevanceScore: 82,
    },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(files);
    // In a real app, you'd send these files to a backend for processing
    // For now, we'll just set the text input to the file content
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setDocumentText(e.target.result as string);
        }
      };
      reader.readAsText(files[0]);
    }
  };

  const handleGenerateSummary = () => {
    setIsGeneratingSummary(true);
    setGeneratedSummary(null); // Clear previous summary
    // Simulate AI processing
    setTimeout(() => {
      setGeneratedSummary({
        keyFacts: [
          "Witness testified that the accused was present at the crime scene on August 14, 2024 between 10:00 PM and 11:30 PM",
          "Physical evidence (fingeprints) on the forged documents match the accused\'s biometric records",
          "Bank records show transaction of Rs. 5,00,000 to the accused\'s account on August 15, 2024",
          "Handwriting analysis confirms signature forgery on property deed",
        ],
        contradictions: [
          "Defense witness claims accused was at different location, but no corroborating evidence provided",
          "Accused\'s statement conflicts with CCTV timestamp evidence",
        ],
        timeline: [
          { event: "Accused arrived at victim\'s residence", date: "Aug 14, 2024 - 10:00 PM" },
          { event: "Documents presented and signed", date: "Aug 14, 2024 - 10:45 PM" },
          { event: "Bank transfer executed", date: "Aug 15, 2024 - 9:00 AM" },
          { event: "Complaint filed by victim", date: "Aug 15, 2024 - 11:30 AM" },
        ],
      });
      setIsGeneratingSummary(false);
    }, 2000); // Simulate 2-second processing time
  };

  const handleClearInputs = () => {
    setDocumentText('');
    setUploadedFiles([]);
    setGeneratedSummary(null);
  };

  const handleSearchPrecedents = () => {
    // Simulate API call for searching precedents
    console.log("Searching precedents for:", keyFactsQuery, "and case:", selectedCase?.caseNo);
    // For demo, filter mock results or return all
    if (keyFactsQuery.toLowerCase().includes("bail")) {
      setPrecedentSearchResults(mockPrecedentResults.filter(p => p.caseTitle.includes("State")));
    } else {
      setPrecedentSearchResults(mockPrecedentResults);
    }
    setSelectedPrecedent(null); // Clear selected precedent when new search is made
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-4xl font-extrabold text-center text-primary mb-10 tracking-tight leading-tight">Judicial Docket Console</h1>
        <h2 className="text-xl font-semibold mb-6 text-foreground">Key Performance Indicators</h2>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-left p-6 rounded-xl shadow-md bg-white border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 mb-4">
              <FileText className="h-6 w-6 text-blue-500" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-4xl font-bold text-foreground mb-1">{kpiData.casesAssigned}</div>
              <p className="text-sm font-medium text-muted-foreground">Total Cases Assigned</p>
              <p className="text-xs text-gray-500 mt-0.5">Active Docket Load</p>
            </CardContent>
          </Card>
          <Card className="text-left p-6 rounded-xl shadow-md bg-white border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 mb-4">
              <UserCheck className="h-6 w-6 text-green-500" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-4xl font-bold text-foreground mb-1">{kpiData.totalDisposed}</div>
              <p className="text-sm font-medium text-muted-foreground">Total Disposed</p>
              <p className="text-xs text-gray-500 mt-0.5">Cases Judged This Quarter</p>
            </CardContent>
          </Card>
          <Card className="text-left p-6 rounded-xl shadow-md bg-white border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 mb-4">
              <FileEdit className="h-6 w-6 text-orange-500" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-4xl font-bold text-foreground mb-1">{kpiData.judgmentsReserved}</div>
              <p className="text-sm font-medium text-muted-foreground">Judgments Reserved</p>
              <p className="text-xs text-gray-500 mt-0.5">Awaiting Final Written Verdict</p>
            </CardContent>
          </Card>
          <Card className="text-left p-6 rounded-xl shadow-md bg-white border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 mb-4">
              <Clock className="h-6 w-6 text-purple-500" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-4xl font-bold text-foreground mb-1">{kpiData.avgHearingTime}</div>
              <p className="text-sm font-medium text-muted-foreground">Avg. Hearing Time</p>
              <p className="text-xs text-gray-500 mt-0.5">Efficiency Metric</p>
            </CardContent>
          </Card>
        </div>

        {/* Judicial Tools & Case Management Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b pb-4 mt-8">
          <Button
            variant={activeTab === 'Daily Docket' ? 'secondary' : 'ghost'}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${activeTab === 'Daily Docket' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'text-muted-foreground hover:bg-muted/30'}`}
            onClick={() => setActiveTab('Daily Docket')}
          >
            <CalendarDays className="h-5 w-5" />
            Daily Docket
          </Button>
          <Button
            variant={activeTab === 'Case Files' ? 'secondary' : 'ghost'}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${activeTab === 'Case Files' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'text-muted-foreground hover:bg-muted/30'}`}
            onClick={() => setActiveTab('Case Files')}
          >
            <FileText className="h-5 w-5" />
            Case Files
          </Button>
          <Button
            variant={activeTab === 'Evidence Summary' ? 'secondary' : 'ghost'}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${activeTab === 'Evidence Summary' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'text-muted-foreground hover:bg-muted/30'}`}
            onClick={() => setActiveTab('Evidence Summary')}
          >
            <Search className="h-5 w-5" />
            Evidence Summary
          </Button>
          <Button
            variant={activeTab === 'Precedents' ? 'secondary' : 'ghost'}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${activeTab === 'Precedents' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'text-muted-foreground hover:bg-muted/30'}`}
            onClick={() => setActiveTab('Precedents')}
          >
            <Scale className="h-5 w-5" />
            Precedents
          </Button>
          <Button
            variant={activeTab === 'Order Drafting' ? 'secondary' : 'ghost'}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${activeTab === 'Order Drafting' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'text-muted-foreground hover:bg-muted/30'}`}
            onClick={() => setActiveTab('Order Drafting')}
          >
            <FileEdit className="h-5 w-5" />
            Order Drafting
          </Button>
        </div>

        {/* Daily Docket View */}
        {activeTab === 'Daily Docket' && (
          <div>
            {/* Date Navigation and Controls */}
            <div className="flex items-center justify-between mb-8 p-4 bg-card rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => setCurrentDate(prev => new Date(prev.setDate(prev.getDate() - 1)))}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-muted-foreground" />
                  <span className="text-lg font-semibold text-foreground">
                    {currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                <Button variant="outline" size="icon" onClick={() => setCurrentDate(prev => new Date(prev.setDate(prev.getDate() + 1)))}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Select defaultValue="Day View">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="View" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Day View">Day View</SelectItem>
                    <SelectItem value="Week View">Week View</SelectItem>
                    <SelectItem value="Month View">Month View</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                  <RotateCcw className="h-4 w-4" />
                  Smart Schedule
                </Button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 rounded-xl shadow-md bg-white border-l-4 border-green-500">
                <CardContent className="p-0 flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">Completed Today</p>
                    <div className="text-4xl font-bold text-foreground">1</div>
                  </div>
                  <Clock className="h-8 w-8 text-green-500" />
                </CardContent>
              </Card>
              <Card className="p-6 rounded-xl shadow-md bg-white border-l-4 border-blue-500">
                <CardContent className="p-0 flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">In Progress</p>
                    <div className="text-4xl font-bold text-foreground">1</div>
                  </div>
                  <Clock className="h-8 w-8 text-blue-500" />
                </CardContent>
              </Card>
              <Card className="p-6 rounded-xl shadow-md bg-white border-l-4 border-gray-400">
                <CardContent className="p-0 flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">Upcoming</p>
                    <div className="text-4xl font-bold text-foreground">2</div>
                  </div>
                  <Clock className="h-8 w-8 text-gray-400" />
                </CardContent>
              </Card>
            </div>

            {/* Today's Court Schedule */}
            <h3 className="text-2xl font-semibold mb-2 text-foreground">Today's Court Schedule</h3>
            <p className="text-muted-foreground mb-6">Hearings scheduled for {currentDate.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</p>

            {/* Schedule Items */}
            <div className="space-y-6">
              <Card className="p-6 rounded-xl shadow-md bg-white">
                <CardContent className="p-0">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">COMPLETED</span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">Bail Application</span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">CRL/2024/1845</p>
                  <p className="text-muted-foreground mb-3">State vs. Rajesh Kumar</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>10:00 AM</span>
                    </div>
                    <span>Duration: 30 minutes</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-grow">View Details</Button>
                    <Button className="flex-grow bg-black text-white hover:bg-gray-800">Open Case File</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 rounded-xl shadow-md bg-white">
                <CardContent className="p-0">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">IN PROGRESS</span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">Evidence Recording</span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">CRL/2024/1923</p>
                  <p className="text-muted-foreground mb-3">State vs. Meena Devi</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>11:00 AM</span>
                    </div>
                    <span>Duration: 60 minutes</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-grow">View Details</Button>
                    <Button className="flex-grow bg-black text-white hover:bg-gray-800">Open Case File</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 rounded-xl shadow-md bg-white">
                <CardContent className="p-0">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">UPCOMING</span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">Final Arguments</span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">CIV/2024/0782</p>
                  <p className="text-muted-foreground mb-3">Sharma Industries vs. City Corporation</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>2:00 PM</span>
                    </div>
                    <span>Duration: 90 minutes</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-grow">View Details</Button>
                    <Button className="flex-grow bg-black text-white hover:bg-gray-800">Open Case File</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 rounded-xl shadow-md bg-white">
                <CardContent className="p-0">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">UPCOMING</span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">Bail Application</span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">CRL/2024/2001</p>
                  <p className="text-muted-foreground mb-3">State vs. Anil Verma</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>4:00 PM</span>
                    </div>
                    <span>Duration: 45 minutes</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-grow">View Details</Button>
                    <Button className="flex-grow bg-black text-white hover:bg-gray-800">Open Case File</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Case Files View */}
        {activeTab === 'Case Files' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel: Assigned Cases List */}
            <div className="lg:col-span-1 bg-card p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-foreground">Assigned Cases</h3>
              <p className="text-muted-foreground text-sm mb-4">{kpiData.casesAssigned} active cases on docket</p>

              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search case number..."
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background text-foreground"
                />
              </div>

              <div className="space-y-4">
                {mockAssignedCases.map((caseItem) => (
                  <Card
                    key={caseItem.caseNo}
                    className={`cursor-pointer p-4 rounded-lg border transition-all duration-200 ${selectedCase?.caseNo === caseItem.caseNo ? 'border-primary bg-primary/10 shadow-sm' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
                    onClick={() => setSelectedCase(caseItem)}
                  >
                    <CardContent className="p-0">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <p className="text-base font-semibold text-foreground">{caseItem.caseNo}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{caseItem.parties}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${caseItem.status === 'Under Trial' ? 'bg-blue-100 text-blue-700' : caseItem.status === 'Evidence Stage' ? 'bg-orange-100 text-orange-700' : 'bg-purple-100 text-purple-700'}`}>
                        {caseItem.status}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Panel: Case Details */}
            <div className="lg:col-span-2 bg-card p-6 rounded-lg shadow-md">
              {!selectedCase ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <p>Select a case from the left to view details.</p>
                </div>
              ) : (
                <div>
                  {/* Case Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-bold text-foreground">{selectedCase.caseNo}</h3>
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                        <Lock className="h-3 w-3" /> Secured Access
                      </span>
                    </div>
                    <Button className="bg-black text-white hover:bg-gray-800 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Download Full Record
                    </Button>
                  </div>

                  <p className="text-muted-foreground text-lg mb-6">{selectedCase.parties}</p>

                  {/* Detail Tabs */}
                  <div className="flex space-x-4 border-b border-gray-200 mb-6">
                    <Button variant="ghost" className={`pb-2 rounded-none border-b-2 ${selectedDetailTab === 'Overview' ? 'border-primary text-primary font-semibold' : 'border-transparent text-muted-foreground'}`} onClick={() => setSelectedDetailTab('Overview')}>Overview</Button>
                    <Button variant="ghost" className={`pb-2 rounded-none border-b-2 ${selectedDetailTab === 'Police FIR' ? 'border-primary text-primary font-semibold' : 'border-transparent text-muted-foreground'}`} onClick={() => setSelectedDetailTab('Police FIR')}>Police FIR</Button>
                    <Button variant="ghost" className={`pb-2 rounded-none border-b-2 ${selectedDetailTab === 'Advocate Filings' ? 'border-primary text-primary font-semibold' : 'border-transparent text-muted-foreground'}`} onClick={() => setSelectedDetailTab('Advocate Filings')}>Advocate Filings</Button>
                    <Button variant="ghost" className={`pb-2 rounded-none border-b-2 ${selectedDetailTab === 'Evidence Log' ? 'border-primary text-primary font-semibold' : 'border-transparent text-muted-foreground'}`} onClick={() => setSelectedDetailTab('Evidence Log')}>Evidence Log</Button>
                  </div>

                  {/* Overview Tab Content */}
                  {selectedDetailTab === 'Overview' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground flex items-center gap-2 mb-1"><CalendarDays className="h-4 w-4" /> Filed Date</p>
                          <p className="text-base font-medium text-foreground">{selectedCase.filedDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground flex items-center gap-2 mb-1"><Info className="h-4 w-4" /> Status</p>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${selectedCase.status === 'Under Trial' ? 'bg-blue-100 text-blue-700' : selectedCase.status === 'Evidence Stage' ? 'bg-orange-100 text-orange-700' : 'bg-purple-100 text-purple-700'}`}>
                            {selectedCase.status}
                          </span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground flex items-center gap-2 mb-3"><Lock className="h-4 w-4" /> Legal Sections</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedCase.legalSections.map((section: string) => (
                            <span key={section} className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                              {section}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-lg flex items-start gap-3">
                        <Lock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-blue-800 mb-1">Tamper-Proof Digital Record</p>
                          <p className="text-sm text-blue-700">
                            This case file is secured with blockchain verification. All documents are read-only
                            and timestamped to ensure integrity and admissibility in court proceedings.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Police FIR Tab Content */}
                  {selectedDetailTab === 'Police FIR' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-foreground">First Information Report (FIR)</h3>
                      <Card className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                        <CardContent className="p-0 text-sm">
                          <p className="mb-1"><span className="font-bold">FIR No:</span> {selectedCase.firNo}</p>
                          <p className="mb-1"><span className="font-bold">Police Station:</span> {selectedCase.policeStation}</p>
                          <p className="mb-1"><span className="font-bold">Date & Time:</span> {selectedCase.firDateTime}</p>
                          <p><span className="font-bold">Complainant:</span> {selectedCase.complainant}</p>
                        </CardContent>
                      </Card>
                      <div>
                        <h4 className="text-lg font-semibold mb-2 text-foreground">Narrative</h4>
                        <p className="text-muted-foreground whitespace-pre-wrap">{selectedCase.firDetails}</p>
                      </div>
                    </div>
                  )}

                  {/* Advocate Filings Tab Content */}
                  {selectedDetailTab === 'Advocate Filings' && (
                    <div className="space-y-4">
                      {selectedCase.advocateFilingsList && selectedCase.advocateFilingsList.length > 0 ? (
                        selectedCase.advocateFilingsList.map((filing: any, index: number) => (
                          <Card key={index} className="p-4 rounded-lg shadow-sm bg-white flex items-center justify-between">
                            <CardContent className="p-0">
                              <p className="text-lg font-semibold text-foreground mb-1">{filing.title}</p>
                              <p className="text-sm text-muted-foreground">Filed by: {filing.filedBy}</p>
                              <p className="text-xs text-gray-500">{filing.date}</p>
                            </CardContent>
                            <Button variant="outline" size="sm" onClick={() => console.log('Viewing document:', filing.title)}>
                              View Document
                            </Button>
                          </Card>
                        ))
                      ) : (
                        <div className="p-4 bg-muted/20 rounded-lg text-muted-foreground text-center">
                          <p>No advocate filings for this case.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Evidence Log Tab Content */}
                  {selectedDetailTab === 'Evidence Log' && (
                    <div className="space-y-6">
                      {/* Chain of Custody Verified Block */}
                      <div className="p-4 bg-orange-50 rounded-lg flex items-start gap-3 border border-orange-200">
                        <Shield className="h-5 w-5 text-orange-600 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-orange-800 mb-1">Chain of Custody Verified</p>
                          <p className="text-sm text-orange-700">
                            All evidence items are logged with timestamps and digital signatures to maintain admissibility.
                          </p>
                        </div>
                      </div>

                      {/* Evidence Items List */}
                      {selectedCase.evidenceLogList && selectedCase.evidenceLogList.length > 0 ? (
                        selectedCase.evidenceLogList.map((evidence: any, index: number) => (
                          <Card key={index} className="p-4 rounded-lg shadow-sm bg-white flex items-center justify-between">
                            <CardContent className="p-0 flex items-center gap-4">
                              <span className="px-3 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-700">{evidence.evidenceId}</span>
                              <div>
                                <p className="text-lg font-semibold text-foreground mb-1">{evidence.title}</p>
                                <p className="text-sm text-muted-foreground">Type: {evidence.type} • Logged: {evidence.loggedDate}</p>
                              </div>
                            </CardContent>
                            <Button variant="outline" size="sm" onClick={() => console.log('Viewing evidence details:', evidence.evidenceId)}>
                              View Details
                            </Button>
                          </Card>
                        ))
                      ) : (
                        <div className="p-4 bg-muted/20 rounded-lg text-muted-foreground text-center">
                          <p>No evidence items logged for this case.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Evidence Summary View */}
        {activeTab === 'Evidence Summary' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Panel: Document Upload & Processing */}
            <Card className="lg:col-span-1 shadow-md bg-white rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2 text-foreground">Document Upload & Processing</h3>
              <p className="text-muted-foreground text-sm mb-6">Upload transcripts, depositions, or investigation reports for AI-powered summarization</p>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-6">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-muted-foreground mb-2">Upload Document</p>
                <p className="text-xs text-gray-500 mb-4">Drag and drop files or click to browse</p>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  id="file-upload-input"
                  onChange={handleFileUpload}
                />
                <Button
                  className="bg-black text-white hover:bg-gray-800"
                  onClick={() => document.getElementById('file-upload-input')?.click()}
                >
                  Select Files
                </Button>
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 text-left">
                    <p className="text-sm font-medium text-foreground">Selected files:</p>
                    <ul className="text-xs text-muted-foreground list-disc pl-5">
                      {uploadedFiles.map((file, index) => <li key={index}>{file.name}</li>)}
                    </ul>
                  </div>
                )}
              </div>

              <h4 className="text-base font-semibold mb-2 text-foreground">Or paste text directly:</h4>
              <Textarea
                placeholder="Paste witness testimony, deposition, or investigation report here..."
                rows={8}
                className="mb-4 bg-input text-input-foreground border-gray-200"
                value={documentText}
                onChange={(e) => setDocumentText(e.target.value)}
              />
              <div className="flex gap-2 justify-end">
                <Button
                  className="bg-black text-white hover:bg-gray-800 flex items-center gap-2"
                  onClick={handleGenerateSummary}
                  disabled={isGeneratingSummary || (documentText.trim() === '' && uploadedFiles.length === 0)}
                >
                  {isGeneratingSummary ? 'Generating...' : (<><Sparkles className="h-4 w-4" /> Generate AI Summary</>)}
                </Button>
                <Button variant="outline" onClick={handleClearInputs}>Clear</Button>
              </div>
            </Card>

            {/* Right Panel: AI-Generated Summary */}
            <Card className="lg:col-span-1 shadow-md bg-white rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2 text-foreground">AI-Generated Summary</h3>
              <p className="text-muted-foreground text-sm mb-6">Concise analysis of key findings</p>

              <div className="flex items-center justify-center h-full min-h-[300px]">
                {isGeneratingSummary ? (
                  <p className="text-muted-foreground">Generating summary...</p>
                ) : generatedSummary ? (
                  <div className="w-full space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-foreground">Key Facts Extracted</h4>
                      <span className="flex items-center gap-1 text-green-600 text-sm font-medium"><CheckCircle className="h-4 w-4" /> Complete</span>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                      {generatedSummary.keyFacts.map((fact: string, index: number) => (
                        <li key={index}>{fact}</li>
                      ))}
                    </ul>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">Contradictions Identified</h4>
                      <div className="p-4 bg-yellow-50 rounded-lg flex flex-col space-y-2 border border-yellow-200">
                        {generatedSummary.contradictions.map((contradiction: string, index: number) => (
                          <p key={index} className="flex items-start gap-2 text-sm text-yellow-800">
                            <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                            {contradiction}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">Timeline of Events</h4>
                      <ul className="space-y-3">
                        {generatedSummary.timeline.map((item: any, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-foreground text-sm">{item.event}</p>
                              <p className="text-xs text-muted-foreground">{item.date}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex gap-2 justify-end pt-4 border-t border-gray-200">
                      <Button variant="outline">Export Summary</Button>
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Add to Case Notes</Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Sparkles className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="mb-2">No Summary Generated</p>
                    <p className="text-sm">Upload a document or paste text to generate an AI-powered summary</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Precedents View */}
        {activeTab === 'Precedents' && (
          <div className="mt-8">
            {/* Precedent Search System (Top Section) */}
            <Card className="shadow-md bg-white rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-2 text-foreground">Precedent Search System</h3>
              <p className="text-muted-foreground text-sm mb-6">AI-powered search for relevant past judgments based on legal sections, facts, and case similarity</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Case Number</p>
                  <Input type="text" value={selectedCase?.caseNo || 'N/A'} readOnly className="bg-gray-50 border-gray-200 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Legal Sections</p>
                  <Input type="text" value={selectedCase?.legalSectionsString || 'N/A'} readOnly className="bg-gray-50 border-gray-200 text-foreground" />
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Key Facts or Legal Question</p>
                <Input
                  type="text"
                  placeholder="Search for similar cases..."
                  value={keyFactsQuery}
                  onChange={(e) => setKeyFactsQuery(e.target.value)}
                  className="mb-4 border-gray-200 text-foreground"
                />
              </div>

              <Button
                className="w-full bg-black text-white hover:bg-gray-800 flex items-center gap-2"
                onClick={handleSearchPrecedents}
              >
                <Search className="h-4 w-4" />
                Search Precedents
              </Button>
            </Card>

            {/* Bottom Section: Results and Detail Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Panel: Relevant Precedents List */}
              <Card className="lg:col-span-1 shadow-md bg-white rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-foreground">Relevant Precedents</h3>
                <p className="text-muted-foreground text-sm mb-4">Sorted by relevance score</p>

                <div className="space-y-4">
                  {precedentSearchResults.length > 0 ? (
                    precedentSearchResults.map((precedent) => (
                      <Card
                        key={precedent.caseTitle}
                        className={`cursor-pointer p-4 rounded-lg border transition-all duration-200 ${selectedPrecedent?.caseTitle === precedent.caseTitle ? 'border-primary bg-primary/10 shadow-sm' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
                        onClick={() => setSelectedPrecedent(precedent)}
                      >
                        <CardContent className="p-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <Scale className="h-4 w-4 text-muted-foreground" />
                              <p className="text-base font-semibold text-foreground">{precedent.caseTitle}</p>
                            </div>
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                              <ArrowUp className="h-3 w-3" /> {precedent.relevanceScore}%
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{precedent.citation}</p>
                          <p className="text-xs text-gray-500">{precedent.court} &bull; {precedent.year}</p>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="p-4 bg-muted/20 rounded-lg text-muted-foreground text-center">
                      <p>No precedents found. Try adjusting your search.</p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Right Panel: Precedent Details / Placeholder */}
              <Card className="lg:col-span-1 shadow-md bg-white rounded-lg p-6 flex items-center justify-center">
                {!selectedPrecedent ? (
                  <div className="text-center text-muted-foreground">
                    <Scale className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="mb-2">No Precedent Selected</p>
                    <p className="text-sm">Select a precedent from the list to view detailed comparison</p>
                  </div>
                ) : (
                  <div className="w-full space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">Selected Precedent Details</h3>
                    <p className="text-muted-foreground">This section would display detailed comparison with the current case.</p>
                    <p className="text-muted-foreground">Case: {selectedPrecedent.caseTitle}</p>
                    <p className="text-muted-foreground">Citation: {selectedPrecedent.citation}</p>
                  </div>
                )}
              </Card>
            </div>
          </div>
        )}

        {/* Order Drafting View */}
        {activeTab === 'Order Drafting' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Panel: Order Drafting */}
            <Card className="lg:col-span-1 shadow-md bg-white rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2 text-foreground">Draft New Order</h3>
              <p className="text-muted-foreground text-sm mb-6">Utilize AI assistance for drafting judgments, orders, and legal documents.</p>

              <Textarea
                placeholder="Start drafting your order here..."
                rows={15}
                className="mb-4 bg-input text-input-foreground border-gray-200"
                value={orderDraftText} // Bind to new state
                onChange={(e) => setOrderDraftText(e.target.value)}
              />
              <div className="flex gap-2 justify-end">
                <Button variant="outline" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> AI Assist Drafting
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Save Draft
                </Button>
              </div>
            </Card>

            {/* Right Panel: Order Preview & Templates */}
            <Card className="lg:col-span-1 shadow-md bg-white rounded-lg p-6 flex flex-col">
              <h3 className="text-xl font-semibold mb-2 text-foreground">Order Preview & Templates</h3>
              <p className="text-muted-foreground text-sm mb-6">Review your draft or select from predefined templates.</p>

              <div className="flex-grow border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-muted-foreground text-center p-4">
                {orderDraftText.trim() === '' ? (
                  <p>Order preview will appear here as you type, or select a template.</p>
                ) : (
                  <div className="w-full text-left">
                    <h4 className="text-lg font-semibold text-foreground mb-2">Draft Content:</h4>
                    <p className="whitespace-pre-wrap text-sm text-foreground">{orderDraftText}</p>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2 text-foreground">Select Template</h4>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bail_order">Bail Order</SelectItem>
                    <SelectItem value="remand_order">Remand Order</SelectItem>
                    <SelectItem value="final_judgment">Final Judgment</SelectItem>
                    <SelectItem value="interim_order">Interim Order</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>
          </div>
        )}

        {/* Fallback for unhandled tabs */}
        {activeTab !== 'Daily Docket' && activeTab !== 'Case Files' && activeTab !== 'Evidence Summary' && activeTab !== 'Precedents' && activeTab !== 'Order Drafting' && (
          <div className="mt-8 p-6 bg-card rounded-lg shadow-md text-center text-muted-foreground">
            <p>Content for {activeTab} will be displayed here.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default JudgeDashboardPage;
