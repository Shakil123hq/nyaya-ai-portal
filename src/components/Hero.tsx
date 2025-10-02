import heroBanner from "@/assets/hero-banner.jpg";

const Hero = () => {
  return (
    <section className="relative h-[400px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="absolute inset-0 bg-primary/80" />
      </div>
      
      <div className="relative container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in">
          Transparency of Information Access
        </h2>
        <p className="text-xl text-primary-foreground/90 max-w-2xl animate-slide-up">
          Empowering justice through technology, accessibility, and transparency
        </p>
      </div>
    </section>
  );
};

export default Hero;
