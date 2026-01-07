import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Images
import coffeeImg from "@assets/stock_images/latte_macchiato_with_c626016c.jpg";
import waffleImg from "@assets/stock_images/fresh_waffles_with_h_3dabbfab.jpg";
import breakfastImg from "@assets/stock_images/german_breakfast_pla_56fa5030.jpg";
import reibekuchenImg from "@assets/stock_images/potato_pancakes_reib_fb2f6c8d.jpg";
import quicheImg from "@assets/stock_images/quiche_lorraine_with_2511863b.jpg";

type MenuItem = {
  name: string;
  description?: string;
  price: string;
  image?: string;
  badge?: string;
  subitems?: { name: string; price: string }[];
};

type MenuCategory = {
  id: string;
  title: string;
  description: string;
  items: MenuItem[];
};

const menuData: MenuCategory[] = [
  {
    id: "breakfast",
    title: "Frühstück",
    description: "Der perfekte Start in den Tag (bis 12:00 Uhr)",
    items: [
      {
        name: "Französisches Frühstück",
        description: "1 Croissant, 1 Brötchen, Butter, Konfitüre und französischer Weichkäse",
        price: "9,00€",
        image: breakfastImg
      },
      {
        name: "Englisches Frühstück",
        description: "Rührei mit Schinken, wahlweise mit 1 Weizenbrötchen oder 2 Scheiben Brot und Butter",
        price: "8,50€"
      },
      {
        name: "Großes Schwesterherz",
        description: "Brotkorb mit verschiedenen Brötchen und Brot, Aufschnitt und Käse, Butter, Konfitüre, wahlweise Rührei, Spiegelei oder gekochtes Ei, 1 Glas Orangensaft",
        price: "14,50€",
        badge: "Beliebt"
      },
      {
        name: "Schlemmerfrühstück (für 1 Person)",
        description: "Brötchenkorb, Aufschnitt, Schinken, Käse, Räucherlachs, Obst, Butter, Konfitüre, Ei nach Wahl, 1 Glas Sekt und Orangensaft",
        price: "18,00€"
      },
      {
        name: "Schlemmerfrühstück (für 2 Personen)",
        description: "Brötchenkorb, Aufschnitt, Schinken, Käse, Räucherlachs, Obst, Butter, Konfitüre, Ei nach Wahl, 2 Gläser Sekt und Orangensaft",
        price: "32,00€",
        image: breakfastImg
      },
      {
        name: "Alpenhütte",
        description: "Brotkorb, verschiedene Käsesorten, Kräuterfrischkäse, Obst, Butter, Konfitüre",
        price: "14,50€"
      },
      {
        name: "Strammer Max",
        price: "10,50€"
      },
      {
        name: "Süßes Frühstück",
        description: "1 Brötchen mit Butter, Konfitüre oder Nutella",
        price: "5,20€"
      },
      {
        name: "Belegtes Weizenbrötchen",
        description: "Beidseitig belegt mit Salami, Schinken und/oder Käse",
        price: "6,00€"
      },
      {
        name: "Belegtes Körnerbrötchen (Lachs)",
        description: "Beidseitig belegt mit Lachs, Zwiebeln und Ei",
        price: "9,50€"
      }
    ]
  },
  {
    id: "waffles",
    title: "Waffeln & Eis",
    description: "Hausgemacht, süß und unwiderstehlich",
    items: [
      {
        name: "Waffel pur",
        price: "5,00€"
      },
      {
        name: "Waffel mit Puderzucker",
        price: "5,10€"
      },
      {
        name: "Waffel mit heißen Kirschen",
        description: "Dazu Eis und Sahne",
        price: "9,00€",
        image: waffleImg
      },
      {
        name: "Waffel mit Eis und Sahne",
        price: "8,00€"
      },
      {
        name: "Waffel mit heißen Pflaumen",
        description: "Dazu Sahne und Karamellsoße",
        price: "9,00€"
      },
      {
        name: "Waffel mit heißen Himbeeren",
        description: "Dazu Vanilleeis und Sahne",
        price: "9,00€"
      },
      {
        name: "Waffel mit Eierlikör",
        description: "Eis, Sahne, Schokosoße und Krokant",
        price: "10,00€",
        badge: "Tipp"
      },
      {
        name: "Schoko Solo",
        description: "1 Kugel Schokoladeneis mit Kirschen und Sahne",
        price: "5,50€"
      },
      {
        name: "Erdbeerbecher",
        description: "Erdbeereis mit Vanilleeis, Erdbeersoße, Erdbeeren und Sahne",
        price: "7,50€"
      },
      {
        name: "Walnussbecher",
        description: "Zwei Kugeln Walnusseis, eine Kugel Vanilleeis, Sahne, Walnüsse und Karamellsoße",
        price: "8,50€"
      }
    ]
  },
  {
    id: "hearty",
    title: "Herzhaftes",
    description: "Reibekuchen, Quiches und Leckeres aus der Küche",
    items: [
      {
        name: "Reibekuchen Bergischer Art",
        description: "Mit Apfelmus, Brot und Butter",
        price: "14,50€",
        image: reibekuchenImg
      },
      {
        name: "Reibekuchen Vegetarisch",
        description: "Mit Pilzen, Streukäse, Paprika, Dill, Salat und Creme Fraiche",
        price: "15,00€"
      },
      {
        name: "Reibekuchen Schwesterherz",
        description: "Mit Lachs, Salat und zweierlei Soßen",
        price: "18,50€"
      },
      {
        name: "Quiche Lorraine",
        description: "Mit Lauch, Speck und kleinem Salat",
        price: "12,90€",
        image: quicheImg
      },
      {
        name: "Gemüsequiche",
        description: "Mit Gemüse der Saison, Feta und kleinem Salat",
        price: "12,90€"
      },
      {
        name: "Folienkartoffel Klassik",
        description: "Mit Kräuterquark und kleinem Salat",
        price: "10,50€"
      },
      {
        name: "Folienkartoffel Lachs",
        description: "Mit Kräuterquark, Räucherlachs und kleinem Salat",
        price: "13,50€"
      },
      {
        name: "Toast Nümbrecht",
        description: "Rührei mit Räucherlachs, Zwiebelringen und Salat",
        price: "14,50€"
      },
      {
        name: "Großer Salat Schwesterherz",
        description: "Gemischter Salat mit Hähnchenbruststreifen, dazu Baguette",
        price: "16,00€"
      }
    ]
  },
  {
    id: "soups",
    title: "Suppen",
    description: "Heiß und stärkend",
    items: [
      {
        name: "Hühnersuppe",
        description: "Mit Baguette",
        price: "6,30€"
      },
      {
        name: "Gulaschsuppe (Wanderterine)",
        description: "Mit Baguette",
        price: "7,90€"
      },
      {
        name: "Kartoffelsuppe",
        description: "Mit Baguette",
        price: "7,90€"
      },
      {
        name: "Kartoffelsuppe mit Einlage",
        description: "Mit Bockwurst",
        price: "9,00€"
      }
    ]
  },
  {
    id: "drinks",
    title: "Getränke",
    description: "Kaffee, Tee und Erfrischungen",
    items: [
      {
        name: "Tasse Kaffee (Heimbs)",
        price: "3,20€",
        image: coffeeImg
      },
      {
        name: "Kännchen Kaffee",
        price: "5,70€"
      },
      {
        name: "Cappuccino ital.",
        description: "Mit Milchschaum",
        price: "3,50€"
      },
      {
        name: "Latte Macchiato",
        price: "4,50€"
      },
      {
        name: "Dante Schokolade",
        description: "Heiße Schokolade mit Espresso, Zimt und Sahne",
        price: "6,90€",
        badge: "Empfehlung"
      },
      {
        name: "Pharisäer",
        description: "Kaffee mit Jamaica-Rum und Sahne",
        price: "6,90€"
      },
      {
        name: "Café au Chocolat",
        description: "½ Kaffee und ½ Schokolade mit Sahne",
        price: "5,60€"
      },
      {
        name: "Tee (diverse Sorten)",
        description: "Darjeeling, Earl Grey, Pfefferminz, etc. (Glas / Kännchen)",
        price: "3,50€ / 5,60€"
      },
      {
        name: "Coca-Cola / Zero / Fanta / Sprite",
        description: "0,2l",
        price: "3,50€"
      },
      {
        name: "Aperol Spritz / Wildberry Lillet",
        price: "6,50€"
      },
      {
        name: "Zunft Kölsch / Veltins Pils",
        description: "0,3l Flasche",
        price: "3,50€"
      }
    ]
  }
];

export function Menu() {
  const [activeTab, setActiveTab] = useState("breakfast");

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-serif text-4xl font-bold text-foreground">Unsere Speisekarte</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Genießen Sie unsere Auswahl an frischen, hausgemachten Speisen. 
            Informationen zu Allergenen finden Sie in unserer Karte vor Ort.
          </p>
        </div>

        <Tabs defaultValue="breakfast" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-12 overflow-x-auto pb-4 px-4">
            <TabsList className="h-auto p-1 bg-secondary/50 rounded-full inline-flex whitespace-nowrap">
              {menuData.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="rounded-full px-4 sm:px-6 py-2 sm:py-3 font-serif text-base sm:text-lg data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
                >
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <AnimatePresence mode="wait">
            {menuData.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0 focus-visible:outline-none">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {category.items.map((item, index) => (
                      <Card key={index} className="overflow-hidden border-border/50 hover:shadow-md transition-shadow duration-300 bg-white group">
                        <div className="flex flex-col sm:flex-row h-full">
                          {item.image && (
                            <div className="sm:w-1/3 w-full h-48 sm:h-auto relative overflow-hidden">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            </div>
                          )}
                          <div className={`flex flex-col justify-between p-6 ${item.image ? "sm:w-2/3" : "w-full"}`}>
                            <div>
                              <div className="flex justify-between items-start mb-2 gap-4">
                                <h3 className="font-serif text-xl font-bold text-foreground">{item.name}</h3>
                                <span className="font-sans font-bold text-primary shrink-0">{item.price}</span>
                              </div>
                              {item.badge && (
                                <Badge variant="secondary" className="mb-2 bg-accent/30 text-foreground hover:bg-accent/40 border-none">
                                  {item.badge}
                                </Badge>
                              )}
                              {item.description && (
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  
                  {category.id === "hearty" && (
                    <div className="mt-12 p-8 bg-secondary/30 rounded-2xl border border-primary/10 text-center max-w-2xl mx-auto">
                      <h4 className="font-serif text-2xl font-bold mb-2">Jeden Mittwoch: Fischtag</h4>
                      <p className="text-muted-foreground mb-2">Genießen Sie frische Fischgerichte nach Tagesangebot.</p>
                      <p className="font-medium text-primary">Preis nach Tagesangebot ca. 23,00€</p>
                    </div>
                  )}
                </motion.div>
              </TabsContent>
            ))}
          </AnimatePresence>
        </Tabs>
      </div>
    </section>
  );
}
