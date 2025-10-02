import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const CaseTracking = () => {
  return (
    <section className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader className="bg-secondary text-secondary-foreground">
            <CardTitle className="text-2xl text-center">Track Your Case</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Enter Case Number or Party Name
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., CRL/12345/2024 or Party Name"
                    className="flex-1"
                  />
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
                    <Search className="w-4 h-4" />
                    Track Case
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>You can track cases by:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Case Number</li>
                  <li>Party Name</li>
                  <li>Advocate Name</li>
                  <li>FIR Number</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CaseTracking;
