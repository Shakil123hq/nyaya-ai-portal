import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, Scale, Gavel, Settings } from "lucide-react";
import { useEffect, useState } from "react";

const UserRoles = () => {
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

    const element = document.getElementById('user-roles');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const roles = [
    {
      title: "Citizens",
      icon: Users,
      description: "File complaints in multiple languages, track case updates, and access simple explanations of legal rights.",
      features: ["Multilingual complaint filing", "Real-time case tracking", "Legal rights information"]
    },
    {
      title: "Police",
      icon: Shield,
      description: "FIR drafting tools, digital records management, and case status updates.",
      features: ["Digital FIR filing", "Evidence management", "Case collaboration tools"]
    },
    {
      title: "Lawyers",
      icon: Scale,
      description: "Comprehensive case dashboard, precedent research, and document verification.",
      features: ["Case management dashboard", "Legal research database", "Document cross-checking"]
    },
    {
      title: "Judges",
      icon: Gavel,
      description: "Judgment drafting support, workload balancing, and evidence summary tools.",
      features: ["AI-assisted drafting", "Workload optimization", "Evidence analysis"]
    },
    {
      title: "System Admin",
      icon: Settings,
      description: "Smart scheduling, transparency dashboards, and paperless workflow management.",
      features: ["Automated scheduling", "Analytics dashboard", "Eco-friendly operations"]
    }
  ];

  return (
    <section id="user-roles" className="container mx-auto py-12 px-4">
      <h3 className={`text-3xl font-bold text-foreground mb-8 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        Services for Every Stakeholder
      </h3>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role, idx) => (
          <Card 
            key={idx} 
            className={`border-border hover:border-accent transition-all duration-500 hover:shadow-xl hover:scale-105 group cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${idx * 100}ms` }}
          >
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <role.icon className="w-6 h-6 text-accent transition-transform duration-300 group-hover:scale-110" />
              </div>
              <CardTitle className="text-xl text-foreground group-hover:text-accent transition-colors duration-300">{role.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 group-hover:text-foreground transition-colors duration-300">{role.description}</p>
              <ul className="space-y-2">
                {role.features.map((feature, fIdx) => (
                  <li 
                    key={fIdx} 
                    className="flex items-start gap-2 text-sm transition-all duration-300 hover:translate-x-2"
                  >
                    <span className="text-accent mt-1 transition-transform duration-300 group-hover:scale-150">•</span>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default UserRoles;
