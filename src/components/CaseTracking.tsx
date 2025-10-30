import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const CaseTracking = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('case-tracking');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section id="case-tracking" className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <Card className={`max-w-2xl mx-auto shadow-lg hover:shadow-2xl transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
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
                    className="flex-1 focus:scale-105 transition-transform duration-300"
                  />
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95">
                    <Search className="w-4 h-4" />
                    Track Case
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p className="font-semibold mb-2">You can track cases by:</p>
                <ul className="list-none space-y-2">
                  {['Case Number', 'Party Name', 'Advocate Name', 'FIR Number'].map((item, idx) => (
                    <li 
                      key={idx} 
                      className={`flex items-center gap-2 transition-all duration-300 hover:translate-x-2 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                      style={{ transitionDelay: `${200 + idx * 100}ms` }}
                    >
                      <span className="w-2 h-2 bg-accent rounded-full"></span>
                      {item}
                    </li>
                  ))}
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
