import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, Phone, MessageCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

import logo from "@assets/Cafe_Schwesternherz_-_upscaled_1767776136828.jpg";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNotices, setActiveNotices] = useState<string[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    
    const now = new Date();
    const notices: string[] = [];
    
    // 1. Mai Hinweis (verschwindet am 2. Mai)
    if (now < new Date('2026-05-02T00:00:00')) {
      notices.push('may1');
    }
    
    // Hitze-Hinweis (verschwindet am 1. Juli)
    if (now < new Date('2026-07-01T00:00:00')) {
      notices.push('heatwave');
    }
    
    // Urlaubshinweis (ab 2. Mai bis 25. Mai)
    if (now >= new Date('2026-05-02T00:00:00') && now < new Date('2026-05-25T00:00:00')) {
      notices.push('vacation');
    }
    
    setActiveNotices(notices);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Start", id: "hero" },
    { name: "Über Uns", id: "about" },
    { name: "Speisekarte", id: "menu" },
    { name: "Kontakt", id: "contact" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex flex-col ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-white/80 md:bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Dauerhafter Reservierungshinweis */}
      <div className="bg-[#EADDCA] text-amber-950 px-4 py-2 text-center text-xs md:text-sm font-medium flex items-center justify-center gap-2 border-b border-amber-900/10">
        <AlertCircle className="h-4 w-4 shrink-0" />
        <span>Bei einer Reservierung räumen wir Ihnen zwei Stunden Zeit für Ihren Aufenthalt ein.</span>
      </div>

      <AnimatePresence mode="popLayout">
        {activeNotices.includes('may1') && (
          <motion.div 
            key="may1"
            initial={{ height: 0, opacity: 0, y: -20 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -20 }}
            transition={{ delay: 0.2, duration: 0.4, type: "spring", stiffness: 100 }}
            className="bg-red-600 text-white px-4 py-3 text-center text-base md:text-lg font-bold flex flex-col md:flex-row items-center justify-center gap-2 shadow-lg border-b border-red-700"
          >
            <AlertCircle className="h-6 w-6 animate-bounce" />
            <span>WICHTIGE INFO: Am 01.05.2026 haben wir nur bis 16:00 Uhr geöffnet!</span>
          </motion.div>
        )}
        
        {activeNotices.includes('heatwave') && (
          <motion.div 
            key="heatwave"
            initial={{ height: 0, opacity: 0, y: -20 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -20 }}
            transition={{ delay: 0.3, duration: 0.4, type: "spring", stiffness: 100 }}
            className="bg-orange-500 text-white px-4 py-3 text-center text-sm md:text-base font-bold flex flex-col md:flex-row items-center justify-center gap-2 shadow-md border-b border-orange-600"
          >
            <AlertCircle className="h-5 w-5 animate-pulse" />
            <span>☀️ Hitzewelle: Aufgrund der heißen Temperaturen schließen wir aktuell bereits um 15:00 Uhr. ☀️</span>
          </motion.div>
        )}

        {activeNotices.includes('vacation') && (
          <motion.div 
            key="vacation"
            initial={{ height: 0, opacity: 0, y: -20 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -20 }}
            transition={{ delay: 0.4, duration: 0.4, type: "spring", stiffness: 100 }}
            className="bg-primary text-white px-4 py-2 text-center text-sm font-medium flex items-center justify-center gap-2 shadow-md"
          >
            <AlertCircle className="h-4 w-4 animate-pulse" />
            <span>Vom 18.05. bis 24.05. sind wir im Urlaub. In dieser Zeit bleibt das Café geschlossen.</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className={`container mx-auto px-4 flex items-center justify-between transition-all duration-300 ${isScrolled ? "py-2" : "py-4"}`}>
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("hero")}>
          <img src={logo} alt="Café Schwesterherz Logo" className="h-12 w-auto rounded-full" />
          <span className={`font-serif text-xl font-bold tracking-tight ${isScrolled ? "text-primary" : "text-primary"}`}>
            Café Schwesterherz
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.id)}
              className="text-foreground hover:text-primary transition-colors font-medium text-sm uppercase tracking-wide"
            >
              {link.name}
            </button>
          ))}
          <Button 
            className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full gap-2"
            onClick={() => window.open("https://wa.me/4915736774819?text=hallo%20ich%20habe%20eine%20Frage", "_blank")}
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-10">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => {
                      scrollToSection(link.id);
                      // Close sheet logic is handled by Sheet primitive if inside a Link usually, 
                      // but here we might need a close button or let user click outside.
                    }}
                    className="text-2xl font-serif text-left hover:text-primary transition-colors"
                  >
                    {link.name}
                  </button>
                ))}
                <div className="h-px bg-border my-2" />
                <Button 
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white w-full gap-2"
                  onClick={() => window.open("https://wa.me/4915736774819?text=hallo%20ich%20habe%20eine%20Frage", "_blank")}
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </Button>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground mt-4">
                  <p>Inh.: Lisa-Maria Herzogenrath</p>
                  <p>Lindchenweg 1, 51588 Nümbrecht</p>
                  <a href="tel:022933994" className="flex items-center gap-2 hover:text-primary">
                    <Phone className="h-4 w-4" /> 02293/3994
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
