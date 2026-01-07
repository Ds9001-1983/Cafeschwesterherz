import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

import logo from "@assets/Cafe_Schwesternherz_-_upscaled_1767776136828.jpg";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
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
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
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
    </motion.nav>
  );
}
