import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, Scale, Gavel, Settings } from "lucide-react";

const UserRoles = () => {
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
    <section className="container mx-auto py-12 px-4">
      <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
        Services for Every Stakeholder
      </h3>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role, idx) => (
          <Card 
            key={idx} 
            className="border-border hover:border-accent transition-all hover:shadow-lg group"
          >
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
                <role.icon className="w-6 h-6 text-accent" />
              </div>
              <CardTitle className="text-xl text-foreground">{role.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{role.description}</p>
              <ul className="space-y-2">
                {role.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2 text-sm">
                    <span className="text-accent mt-1">•</span>
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
