import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QuickStats from "@/components/QuickStats";
import CaseTracking from "@/components/CaseTracking";
import UserRoles from "@/components/UserRoles";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <QuickStats />
        <CaseTracking />
        <UserRoles />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
