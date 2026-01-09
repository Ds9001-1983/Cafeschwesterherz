import { motion } from "framer-motion";
import cakeImage from "@assets/IMG_4317_1767960840945.jpeg";
import { Badge } from "@/components/ui/badge";

export function Cakes() {
  return (
    <section className="py-24 bg-secondary/10 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            className="flex-1 order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-700">
                <img 
                  src={cakeImage} 
                  alt="Frische Kuchen und Torten Auswahl" 
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -right-6 top-10 bg-white p-4 rounded-xl shadow-lg border border-border/50 rotate-6 hidden sm:block">
                <p className="font-serif font-bold text-primary text-center leading-tight">
                  Täglich<br/>Frisch
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="flex-1 text-center lg:text-left order-1 lg:order-2 space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="outline" className="border-primary text-primary px-4 py-1 text-sm tracking-widest uppercase mb-4">
              Unser Highlight
            </Badge>
            
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Verführerische <br/>
              <span className="text-primary">Kuchen & Torten</span>
            </h2>
            
            <div className="w-20 h-1 bg-primary/20 mx-auto lg:mx-0 rounded-full" />
            
            <p className="text-xl text-muted-foreground font-light leading-relaxed">
              "Immer frisch und wechselnd"
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              Lassen Sie sich von unserer Vitrine verzaubern. Wir backen täglich mit viel Liebe und besten Zutaten. 
              Ob fruchtige Sahnetorten, klassischer Käsekuchen oder schokoladige Sünden – 
              bei uns finden Sie immer wieder neue, köstliche Überraschungen.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <h4 className="font-serif font-bold text-lg">Hausgemacht</h4>
                <p className="text-sm text-muted-foreground">Nach traditionellen Rezepten gebacken.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-serif font-bold text-lg">Große Vielfalt</h4>
                <p className="text-sm text-muted-foreground">Täglich wechselndes Angebot in unserer Theke.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
