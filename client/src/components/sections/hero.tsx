import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import interiorImage from "@assets/IMG_4251_1767806405482.jpeg";

export function Hero() {
  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={interiorImage} 
          alt="Café Interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl space-y-6"
        >
          <span className="font-medium tracking-[0.2em] text-sm uppercase text-accent">Willkommen im</span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight">
            Café Schwesterherz
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-xl mx-auto font-light leading-relaxed">
            Genießen Sie hausgemachte Spezialitäten in herzlicher Atmosphäre. 
            Ein Ort für Freunde, Familie und Genießer.
          </p>
          
          <div className="pt-8">
            <button 
              onClick={scrollToMenu}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105"
            >
              Speisekarte ansehen
            </button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={scrollToMenu}
        >
          <ArrowDown className="text-white/70 h-8 w-8" />
        </motion.div>
      </div>
    </section>
  );
}
