import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, CheckCircle, Calendar } from "lucide-react";

const QuickStats = () => {
  const stats = [
    {
      label: "High Court",
      pending: "2,45,678",
      disposed: "1,89,432",
      listed: "567",
      icon: TrendingUp,
      pendingBg: "bg-amber-50",
      pendingText: "text-amber-700",
      disposedBg: "bg-green-50",
      disposedText: "text-green-700",
      listedBg: "bg-blue-50",
      listedText: "text-blue-700",
    },
    {
      label: "District Courts",
      pending: "4,12,345",
      disposed: "3,56,789",
      listed: "1,234",
      icon: CheckCircle,
      pendingBg: "bg-amber-50",
      pendingText: "text-amber-700",
      disposedBg: "bg-green-50",
      disposedText: "text-green-700",
      listedBg: "bg-blue-50",
      listedText: "text-blue-700",
    },
  ];

  return (
    <section className="container mx-auto py-12 px-4 md:px-6">
      <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
        Court Statistics Overview
      </h3>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {stats.map((court, idx) => (
          <Card key={idx} className="border-border shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <court.icon className={`w-6 h-6 ${court.label === "High Court" ? "text-amber-600" : "text-green-600"}`} />
                <h4 className="text-xl font-semibold text-foreground">{court.label}</h4>
              </div>
              
              <div className="space-y-3">
                <div className={`flex justify-between items-center p-3 ${court.pendingBg} rounded-lg`}>
                  <span className="text-sm font-medium text-foreground">Pending Cases</span>
                  <span className="text-lg font-bold ${court.pendingText}">{court.pending}</span>
                </div>
                
                <div className={`flex justify-between items-center p-3 ${court.disposedBg} rounded-lg`}>
                  <span className="text-sm font-medium text-foreground">Disposed Cases</span>
                  <span className="text-lg font-bold ${court.disposedText}">{court.disposed}</span>
                </div>
                
                <div className={`flex justify-between items-center p-3 ${court.listedBg} rounded-lg`}>
                  <span className="text-sm font-medium text-foreground">Today's Listed</span>
                  <span className="text-lg font-bold ${court.listedText}">{court.listed}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default QuickStats; 
