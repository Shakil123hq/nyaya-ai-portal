import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { FileText, Hourglass, CheckCircle, Gavel, ClipboardList, Scale } from 'lucide-react';

const CitizenCaseTrackingPage: React.FC = () => {
  // Mock data for KPI Cards
  const kpiData = {
    complaintsFiled: 15,
    firsRegistered: 8,
    activeCases: 5,
    casesDisposed: 3,
  };

  // Mock data for Detailed Tracking Feed
  const mockCases = [
    {
      caseNo: "CR-2023-001",
      status: "Hearing Scheduled",
      jurisdiction: "District Court Delhi",
      nextEventDate: "2023-12-10",
      statusColor: "text-blue-600",
    },
    {
      caseNo: "FIR-2023-045",
      status: "Under Review",
      jurisdiction: "Police Station Vasant Vihar",
      nextEventDate: "2023-11-20",
      statusColor: "text-amber-600",
    },
    {
      caseNo: "CV-2023-010",
      status: "Judgment Reserved",
      jurisdiction: "High Court Mumbai",
      nextEventDate: "N/A",
      statusColor: "text-purple-600",
    },
    {
      caseNo: "FIR-2023-012",
      status: "Disposed",
      jurisdiction: "Police Station Bandra",
      nextEventDate: "2023-08-01",
      statusColor: "text-green-600",
    },
  ];

  // Mock data for Case Flow History Bar Chart
  const caseFlowData = [
    { name: 'Q1 2023', submissions: 4, firs: 2, disposals: 1 },
    { name: 'Q2 2023', submissions: 5, firs: 3, disposals: 2 },
    { name: 'Q3 2023', submissions: 3, firs: 2, disposals: 1 },
    { name: 'Q4 2023', submissions: 3, firs: 1, disposals: 0 },
  ];

  // Mock data for Police Status Donut Chart
  const policeStatusData = [
    { name: 'Under Investigation', value: 3, color: '#3182CE' }, // A shade of blue
    { name: 'Charge Sheet Filed', value: 2, color: '#2D3748' },  // Dark grey/black
    { name: 'Closed', value: 3, color: '#4A5568' },          // Medium grey
  ];

  // Mock data for Court Status Donut Chart
  const courtStatusData = [
    { name: 'Pending Trial', value: 2, color: '#3182CE' },    // A shade of blue
    { name: 'Hearing Scheduled', value: 1, color: '#2D3748' }, // Dark grey/black
    { name: 'Judgment Reserved', value: 1, color: '#4A5568' }, // Medium grey
    { name: 'Disposed', value: 1, color: '#718096' },          // Lighter grey
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-8 text-center">Citizen Case Tracking Dashboard</h1>

        {/* Statistical Overview (KPI Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-card p-6 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-105">
            <ClipboardList className="h-8 w-8 text-primary mx-auto mb-3" />
            <h2 className="text-4xl font-bold text-primary mb-1">{kpiData.complaintsFiled}</h2>
            <p className="text-muted-foreground text-sm">Complaints Filed</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-105">
            <FileText className="h-8 w-8 text-primary mx-auto mb-3" />
            <h2 className="text-4xl font-bold text-primary mb-1">{kpiData.firsRegistered}</h2>
            <p className="text-muted-foreground text-sm">FIRs Registered</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-105">
            <Scale className="h-8 w-8 text-primary mx-auto mb-3" />
            <h2 className="text-4xl font-bold text-primary mb-1">{kpiData.activeCases}</h2>
            <p className="text-muted-foreground text-sm">Active Cases in Court</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-105">
            <CheckCircle className="h-8 w-8 text-primary mx-auto mb-3" />
            <h2 className="text-4xl font-bold text-primary mb-1">{kpiData.casesDisposed}</h2>
            <p className="text-muted-foreground text-sm">Cases Judged/Disposed</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Case Flow History (Central Bar Chart) */}
          <div className="lg:col-span-2 bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Case Flow History</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={caseFlowData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" className="text-sm" />
                <YAxis className="text-sm" />
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Bar dataKey="submissions" fill="hsl(var(--primary))" name="New Submissions" />
                <Bar dataKey="firs" fill="#000000" name="FIR Conversions" />
                <Bar dataKey="disposals" fill="#4a5568" name="Case Disposals" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Current Status Breakdown (Donut Charts) */}
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Current Status Breakdown</h2>
            <div className="space-y-8">
              {/* Police Status Donut Chart */}
              <div>
                <h3 className="text-lg font-semibold mb-2 text-center">Police Status</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={policeStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {policeStatusData.map((entry, index) => (
                        <Cell key={`cell-police-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                      itemStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Court Status Donut Chart */}
              <div>
                <h3 className="text-lg font-semibold mb-2 text-center">Court Status</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={courtStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {courtStatusData.map((entry, index) => (
                        <Cell key={`cell-court-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                      itemStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tracking Feed (Real-Time List) */}
        <div className="bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Detailed Tracking Feed</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm divide-y divide-border">
              <thead>
                <tr className="bg-muted/30">
                  <th className="px-6 py-3 text-left text-sm font-bold text-muted-foreground uppercase tracking-wider">Case / FIR No.</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-muted-foreground uppercase tracking-wider">Current Status</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-muted-foreground uppercase tracking-wider">Jurisdiction</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-muted-foreground uppercase tracking-wider">Next Event Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockCases.map((caseItem, index) => {
                  let StatusIcon;
                  switch (caseItem.status) {
                    case 'Hearing Scheduled':
                      StatusIcon = Gavel;
                      break;
                    case 'Under Review':
                      StatusIcon = Hourglass;
                      break;
                    case 'Judgment Reserved':
                      StatusIcon = FileText;
                      break;
                    case 'Disposed':
                      StatusIcon = CheckCircle;
                      break;
                    default:
                      StatusIcon = FileText; // Default icon
                  }

                  return (
                    <tr key={caseItem.caseNo} className={`transition-colors duration-200 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/50'} hover:bg-muted/70`}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-foreground">{caseItem.caseNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full space-x-1
                           ${caseItem.status === 'Hearing Scheduled' ? 'bg-blue-100 text-blue-800' :
                             caseItem.status === 'Under Review' ? 'bg-amber-100 text-amber-800' :
                             caseItem.status === 'Judgment Reserved' ? 'bg-purple-100 text-purple-800' :
                             caseItem.status === 'Disposed' ? 'bg-green-100 text-green-800' :
                             'bg-gray-100 text-gray-800'}
                        `}>
                          {StatusIcon && <StatusIcon className="h-3 w-3" />}
                          <span>{caseItem.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{caseItem.jurisdiction}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{caseItem.nextEventDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CitizenCaseTrackingPage;
