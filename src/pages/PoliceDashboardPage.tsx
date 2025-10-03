import React, { useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BellRing, FileText, Hourglass, ShieldCheck, Paperclip } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';

const PoliceDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const userRole = localStorage.getItem('userRole');

    if (!userToken || userRole !== 'police') {
      navigate('/login');
    }
  }, [navigate]);

  // Mock data for KPI Cards
  const kpiData = {
    newComplaints: 12,
    firsRegisteredToday: 5,
    avgConversionTime: "18h 30m",
    activeInvestigations: 35,
  };

  // Mock data for Priority Queue Table
  const mockComplaints = [
    {
      id: "C-2023-001",
      dateTimeFiled: "2023-11-05 10:30",
      citizenName: "Ramesh Kumar",
      incidentLocation: "Sector 14, Dwarka, Delhi",
      narrativeSnippet: "Theft of two-wheeler from parking",
      evidenceAttached: true,
    },
    {
      id: "C-2023-002",
      dateTimeFiled: "2023-11-05 09:15",
      citizenName: "Priya Sharma",
      incidentLocation: "Gandhi Nagar, Jaipur",
      narrativeSnippet: "Assault and verbal abuse",
      evidenceAttached: false,
    },
    {
      id: "C-2023-003",
      dateTimeFiled: "2023-11-04 18:00",
      citizenName: "Amit Singh",
      incidentLocation: "MG Road, Bangalore",
      narrativeSnippet: "Property dispute with neighbor",
      evidenceAttached: true,
    },
  ];

  // Mock data for Pending Complaint Aging Bar Chart
  const complaintAgingData = [
    { name: '0-24 Hours', count: 7, color: '#3182CE' },
    { name: '24-48 Hours', count: 3, color: '#2D3748' },
    { name: '48+ Hours', count: 2, color: '#4A5568' },
  ];

  // Mock data for Incident Type Breakdown Donut Chart
  const incidentTypeData = [
    { name: 'Theft', value: 30, color: '#FBBF24' },   // Amber
    { name: 'Assault', value: 20, color: '#3B82F6' }, // Blue
    { name: 'Fraud', value: 15, color: '#8B5CF6' },   // Purple
    { name: 'Others', value: 35, color: '#10B981' },  // Green
  ];

  const COLORS = ['#FBBF24', '#3B82F6', '#8B5CF6', '#10B981']; // Matching the donut chart colors

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-8 text-center">Police Case Intake Dashboard</h1>

        {/* KPI Cards section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-card p-6 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-105">
            <BellRing className="h-8 w-8 text-primary mx-auto mb-3" />
            <h2 className="text-4xl font-bold text-primary mb-1">{kpiData.newComplaints}</h2>
            <p className="text-muted-foreground text-sm">New Complaints in Queue</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-105">
            <FileText className="h-8 w-8 text-primary mx-auto mb-3" />
            <h2 className="text-4xl font-bold text-primary mb-1">{kpiData.firsRegisteredToday}</h2>
            <p className="text-muted-foreground text-sm">FIRs Registered Today</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-105">
            <Hourglass className="h-8 w-8 text-primary mx-auto mb-3" />
            <h2 className="text-4xl font-bold text-primary mb-1">{kpiData.avgConversionTime}</h2>
            <p className="text-muted-foreground text-sm">Avg. Conversion Time</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-105">
            <ShieldCheck className="h-8 w-8 text-primary mx-auto mb-3" />
            <h2 className="text-4xl font-bold text-primary mb-1">{kpiData.activeInvestigations}</h2>
            <p className="text-muted-foreground text-sm">Active Investigations</p>
          </div>
        </div>

        {/* Priority Queue (Primary Action Table) */}
        <div className="bg-card p-6 rounded-lg shadow-md mb-12">
          <h2 className="text-xl font-semibold mb-4">Pending Complaint Review</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm divide-y divide-border">
              <thead>
                <tr className="bg-muted/30">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground uppercase tracking-wider">Complaint ID</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground uppercase tracking-wider">Date/Time Filed</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground uppercase tracking-wider">Citizen Name</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground uppercase tracking-wider">Incident Location</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground uppercase tracking-wider">Narrative Snippet</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground uppercase tracking-wider">Evidence</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockComplaints.map((complaint, index) => (
                  <tr key={complaint.id} className={`transition-colors duration-200 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/50'} hover:bg-muted/70`}>
                    <td className="px-4 py-4 whitespace-nowrap font-medium text-foreground">{complaint.id}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-muted-foreground">{complaint.dateTimeFiled}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-muted-foreground">{complaint.citizenName}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-muted-foreground">{complaint.incidentLocation}</td>
                    <td className="px-4 py-4 text-muted-foreground max-w-xs overflow-hidden text-ellipsis">{complaint.narrativeSnippet}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {complaint.evidenceAttached ? <Paperclip className="h-5 w-5 text-blue-500" /> : '-'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Button type="button" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={() => navigate(`/police/complaint-review/${complaint.id}`)}
                      >
                        Review & Draft FIR
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Supporting Data Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Pending Complaint Aging</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={complaintAgingData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} className="text-sm fill-muted-foreground" />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} className="text-sm fill-muted-foreground" />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem' }} labelStyle={{ color: 'hsl(var(--foreground))' }} itemStyle={{ color: 'hsl(var(--foreground))' }} />
                <Bar dataKey="count" fill="#3B82F6" name="Complaints" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Incident Type Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={incidentTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {incidentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem' }} labelStyle={{ color: 'hsl(var(--foreground))' }} itemStyle={{ color: 'hsl(var(--foreground))' }} />
                <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ fontSize: '0.875rem', lineHeight: '1.25rem' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PoliceDashboardPage;
