import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import logo from "@assets/Cafe_Schwesternherz_-_upscaled_1767776136828.jpg";

export function Footer() {
  return (
    <footer id="contact" className="bg-secondary/30 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Logo" className="h-16 w-auto rounded-full" />
              <h3 className="font-serif text-2xl font-bold text-primary">Café Schwesterherz</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-xs">
              Ein Ort zum Wohlfühlen, Genießen und Entspannen. 
              Wir freuen uns auf Ihren Besuch!
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-primary mb-4">Kontakt</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
                <p>Lindchenweg 1<br />51588 Nümbrecht</p>
              </div>
              <a href="tel:022933994" className="flex items-center gap-3 hover:text-primary transition-colors">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>02293/3994</span>
              </a>
              <a href="mailto:Hallo@Schwesterherz.cafe" className="flex items-center gap-3 hover:text-primary transition-colors">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>Hallo@Schwesterherz.cafe</span>
              </a>
              <a 
                href="https://wa.me/4915736774819?text=hallo%20ich%20habe%20eine%20Frage" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 hover:text-[#25D366] transition-colors"
              >
                <MessageCircle className="h-5 w-5 text-[#25D366] shrink-0" />
                <span>WhatsApp: +49 1573 6774819</span>
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-primary mb-4">Öffnungszeiten</h4>
            <div className="space-y-2">
              <div className="flex justify-between max-w-[200px]">
                <span className="font-medium">Mittwoch - Sonntag</span>
                <span>10:00 - 18:00</span>
              </div>
              <div className="flex justify-between max-w-[200px] text-muted-foreground">
                <span>Montag & Dienstag</span>
                <span>Ruhetag</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Café Schwesterherz. Alle Rechte vorbehalten.</p>
          <div className="flex gap-4">
            <span>Inh.: Lisa-Maria Herzogenrath</span>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            Made with ❤️ by{" "}
            <a 
              href="https://superbrand.marketing" 
              target="_blank" 
              rel="noreferrer"
              className="font-medium hover:text-primary transition-colors"
            >
              SUPERBRAND.marketing
            </a>
            {" "}– Dein Superheld für deine Werbung.
          </p>
        </div>
      </div>
    </footer>
  );
}
