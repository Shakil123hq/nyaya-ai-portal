import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Gavel, Brain, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import heroImage from '../assets/hero3.jpg';

const Hero = () => {
  const navigate = useNavigate();

  const featureCards = [
    {
      icon: Gavel,
      title: "Faster Justice Delivery",
      description: "Streamlined processes reduce legal timelines and improve access to justice.",
    },
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Leverage intelligent summaries and precedent comparisons for informed decisions.",
    },
    {
      icon: ShieldCheck,
      title: "Tamper-Proof Records",
      description: "All case files and evidence are digitally secured and immutable.",
    },
  ];

  return (
    <section 
      className="relative bg-cover bg-center min-h-screen flex flex-col justify-center items-center text-white px-4 py-16"
      style={{ backgroundImage: `url(${heroImage})` }} // <<< IMPORTANT: Replace this path with your actual legal-themed image path.
    >
      <div className="absolute inset-0 bg-[#2C3E50]/90" /> {/* Deep Navy Overlay */}

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
          Welcome to Nyaya AI
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8">
          Your trusted partner for efficient case management, intelligent legal research, and transparent judicial proceedings.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button
            onClick={() => navigate('/login')}
            className="bg-[#FFC300] text-[#2C3E50] hover:bg-[#FFC300]/90 font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Access My Dashboard
          </Button>
          <Button
            onClick={() => navigate('/about')}
            variant="outline"
            className="bg-white text-[#2C3E50] border-2 border-[#2C3E50] hover:bg-gray-100 font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Learn More
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {featureCards.map((card, index) => (
            <Card key={index} className="bg-[#2C3E50] text-white p-6 rounded-lg shadow-xl border border-gray-700">
              <CardContent className="p-0 flex flex-col items-center text-center">
                <card.icon className="h-10 w-10 text-[#FFC300] mb-4" />
                <h4 className="text-xl font-semibold mb-2">{card.title}</h4>
                <p className="text-sm text-white/80">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
  export default Hero;