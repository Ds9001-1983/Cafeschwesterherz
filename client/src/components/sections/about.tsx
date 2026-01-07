import { motion } from "framer-motion";
import logo from "/attached_assets/Cafe_Schwesternherz_-_upscaled_1767776136828.jpg";

export function About() {
  return (
    <section id="about" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          <motion.div 
            className="flex-1 max-w-md mx-auto md:max-w-none"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl rotate-[-2deg]">
              <img 
                src={logo} 
                alt="Café Schwesterherz Logo" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl" />
            </div>
          </motion.div>

          <motion.div 
            className="flex-1 text-center md:text-left space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              Mehr als nur ein Café
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto md:mx-0 rounded-full" />
            
            <p className="text-muted-foreground leading-relaxed text-lg">
              Bei uns im <span className="text-primary font-medium">Café Schwesterherz</span> steht Herzlichkeit an erster Stelle. 
              Wir laden Sie ein, den Alltag hinter sich zu lassen und in gemütlicher Atmosphäre 
              unsere köstlichen Kreationen zu genießen.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              Ob zum ausgiebigen Frühstück, für eine süße Waffel am Nachmittag oder 
              zu unseren herzhaften Klassikern – wir bereiten alles mit Liebe und sorgfalt für Sie zu.
              Kommen Sie vorbei und fühlen Sie sich wie zu Hause.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-border/50">
                <p className="font-serif font-bold text-primary text-xl">Mi-So</p>
                <p className="text-sm text-muted-foreground">10:00 - 18:00 Uhr</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-border/50">
                <p className="font-serif font-bold text-primary text-xl">Mo & Di</p>
                <p className="text-sm text-muted-foreground">Ruhetag</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
