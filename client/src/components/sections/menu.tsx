import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Images
import coffeeImg from "@assets/stock_images/latte_macchiato_with_c626016c.jpg";
import waffleImg from "@assets/stock_images/fresh_waffles_with_h_3dabbfab.jpg";
import breakfastImg from "@assets/stock_images/german_breakfast_pla_56fa5030.jpg";
import reibekuchenImg from "@assets/stock_images/potato_pancakes_reib_fb2f6c8d.jpg";
import quicheImg from "@assets/stock_images/quiche_lorraine_with_2511863b.jpg";

type MenuSubitem = {
  name: string;
  price?: string;
};

type MenuItem = {
  name: string;
  description?: string;
  price: string;
  size?: string;
  image?: string;
  badge?: string;
  subitems?: MenuSubitem[];
};

type MenuSection = {
  title?: string;
  note?: string;
  items: MenuItem[];
};

type MenuCategory = {
  id: string;
  title: string;
  description: string;
  sections: MenuSection[];
};

const menuData: MenuCategory[] = [
  {
    id: "coffee",
    title: "Heiße Getränke",
    description: "Frisch gebrüht und mit Liebe serviert",
    sections: [
      {
        title: "Kaffee",
        note: "Alle Kaffeespezialitäten servieren wir auf Wunsch auch koffeinfrei und mit Sirup nach Wahl (Vanille, Karamell, Haselnuss).",
        items: [
          { name: "Tasse Heimbs Kaffee", price: "3,20€" },
          { name: "Kännchen Heimbs Kaffee", price: "5,70€" },
          { name: "Große Tasse Milchkaffee", price: "3,90€" },
          { name: "Café Creme", price: "3,20€" },
          { name: "Cappuccino Ital.", description: "Mit Milchschaum", price: "3,50€" },
          { name: "Latte Macchiato", price: "4,50€", image: coffeeImg },
          { name: "Espresso", price: "3,00€" },
          { name: "Doppelter Espresso", price: "4,50€" },
          { name: "Espresso Macchiato", price: "3,50€" },
          { name: "Große Schokolade", price: "4,00€" },
          { name: "Große Schokolade mit Sahne", price: "4,50€" }
        ]
      },
      {
        title: "Kaffee- & Schokoladenspezialitäten",
        items: [
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
          }
        ]
      },
      {
        title: "Tee",
        items: [
          {
            name: "Tee",
            size: "Glas 3,50€ / Kännchen 5,60€",
            price: "3,50€ / 5,60€",
            description: "Extra Portion Honig 0,70€",
            subitems: [
              { name: "Daarjeeling First Flush" },
              { name: "Friesenlandmischung" },
              { name: "Earl Grey" },
              { name: "Pfefferminz" },
              { name: "Alpenkräuter" },
              { name: "Japanischer Sencha" },
              { name: "Ginger Ingwer" },
              { name: "Rooibos Vanille" },
              { name: "Maracuja Orange" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "breakfast",
    title: "Frühstück",
    description: "Täglich von 10:00 bis 12:00 Uhr",
    sections: [
      {
        items: [
          {
            name: "Französisches Frühstück",
            description: "Croissant, Brötchen, Butter, Konfitüre und französischer Weichkäse",
            price: "9,00€",
            image: breakfastImg
          },
          {
            name: "Englisches Frühstück",
            description: "Wahlweise mit Weizenbrötchen oder Brot, Butter, Rührei mit Kochschinken",
            price: "8,50€"
          },
          {
            name: "Nümbrechter Frühstücksschiffchen",
            description: "Hausmacher Frikadelle, Schinken, Salami, Käse, Rührei, Butter, Brotkorb mit versch. Brot und Brötchen",
            price: "19,20€",
            badge: "Beliebt"
          },
          {
            name: "Alpenhütte",
            description: "Brotkorb mit versch. Brot und Brötchen, versch. Käsesorten, Kräuterfrischkäse, Obst, Butter, Konfitüre",
            price: "15,20€"
          },
          { name: "Belegtes Brötchen", price: "6,30€" },
          { name: "Weizenbrötchen mit Lachs", price: "9,50€" },
          { name: "Körnerbrötchen mit Lachs", price: "10,20€" }
        ]
      },
      {
        title: "Schlemmerfrühstück",
        note: "An Sonn- und Feiertagen servieren wir ausschließlich unser Schlemmerfrühstück. Reservierung erforderlich.",
        items: [
          {
            name: "Für 1 Person",
            description: "Brötchenkorb mit versch. Brot, Brötchen, Croissant, Aufschnitt, Schinken, Käse, Räucherlachs-Schiffchen, Obst, Butter, Konfitüre und Rührei",
            price: "18,50€",
            badge: "Tipp"
          },
          {
            name: "Für 2 Personen",
            description: "Brötchenkorb mit versch. Brot, Brötchen, Croissant, Aufschnitt, Schinken, Käse, Räucherlachs-Schiffchen, Obst, Butter, Konfitüre und Rührei",
            price: "34,90€"
          },
          {
            name: "Sonn- / Feiertag für 1 Person",
            description: "Halb-und-Halb-Buffet",
            price: "19,70€"
          },
          {
            name: "Sonn- / Feiertag für 2 Personen",
            description: "Halb-und-Halb-Buffet",
            price: "39,20€"
          }
        ]
      },
      {
        title: "Zum Nachbestellen",
        items: [
          {
            name: "Zum Nachbestellen",
            price: "",
            subitems: [
              { name: "Portion Rührei", price: "3,50€" },
              { name: "2 Scheiben Aufschnitt nach Wahl", price: "1,60€" },
              { name: "1 Portion Lachs", price: "5,80€" },
              { name: "2 Scheiben französischer Weichkäse", price: "3,50€" },
              { name: "1 Weizenbrötchen", price: "1,60€" },
              { name: "1 Körnerbrötchen", price: "2,20€" },
              { name: "1 Croissant", price: "2,60€" },
              { name: "2 Scheiben Brot", price: "1,80€" },
              { name: "1 Portion Butter", price: "1,80€" },
              { name: "1 Portion Honig", price: "1,80€" },
              { name: "1 Portion Quark", price: "1,80€" },
              { name: "1 Portion Konfitüre", price: "1,80€" },
              { name: "1 Portion Nutella", price: "2,00€" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "waffles",
    title: "Waffeln",
    description: "Hausgemacht, von 14:30 bis 16:30 Uhr",
    sections: [
      {
        items: [
          { name: "Waffel ohne alles", price: "5,00€" },
          { name: "Waffel mit Puderzucker", price: "5,20€" },
          { name: "Waffel mit Eis und Sahne", price: "6,90€" },
          { name: "Waffel mit Kirschen und Sahne", price: "8,50€" },
          {
            name: "Waffel mit Kirschen, Eis und Sahne",
            price: "9,10€",
            image: waffleImg
          },
          { name: "Waffel mit Pflaumen, Karamellsoße und Sahne", price: "8,70€" },
          { name: "Waffel mit Pflaumen, Karamellsoße, Eis und Sahne", price: "10,50€" },
          { name: "Waffel mit heißen Himbeeren, Eis und Sahne", price: "9,40€" },
          {
            name: "Waffel mit Eierlikör, Eis, Schokosoße, Sahne und Krokant",
            price: "10,70€",
            badge: "Tipp"
          }
        ]
      }
    ]
  },
  {
    id: "lunch",
    title: "Mittagstisch",
    description: "Täglich von 12:00 bis 14:00 Uhr",
    sections: [
      {
        title: "Mittwoch",
        items: [
          {
            name: "Hausmacher Frikadellen mit Kartoffelsalat",
            description: "Dazu ein kleines Salatbukett",
            price: "10,50€"
          },
          {
            name: "Gulaschsuppe",
            description: "Mit Brot oder Brötchen",
            price: "8,20€"
          },
          {
            name: "Kartoffelsuppe",
            description: "Mit Brot oder Brötchen",
            price: "7,90€"
          },
          {
            name: "Kartoffelsuppe mit Bockwurst",
            description: "Dazu Brot oder Brötchen",
            price: "9,00€"
          }
        ]
      },
      {
        title: "Ab Donnerstag · Bergische Spezialitäten",
        items: [
          {
            name: "Reibekuchen Bergische Art",
            description: "2 Reibekuchen mit Salatbukett, 2 Scheiben Schwarzbrot, Apfelmus und Butter",
            price: "15,30€",
            image: reibekuchenImg
          },
          {
            name: "Reibekuchen Räucherlachs",
            description: "2 Reibekuchen mit Räucherlachs, Sahnemeerrettich, Kräuterquark, kleines Salatbukett",
            price: "19,50€"
          },
          {
            name: "Reibekuchen Bauernart",
            description: "2 Reibekuchen, gedünstete Zwiebeln mit Speck, kleines Salatbukett",
            price: "16,40€"
          },
          {
            name: "Toast Nümbrecht",
            description: "2 Scheiben Toast oder Schwarzbrot, Rührei, Räucherlachs, Sahnemeerrettich, kleines Salatbukett",
            price: "15,80€"
          }
        ]
      },
      {
        title: "Ab Donnerstag · Quiches & Kartoffeln",
        items: [
          {
            name: "Quiche Lorraine",
            description: "Mit Lauch und Speck, dazu Salatbukett",
            price: "14,10€",
            image: quicheImg
          },
          {
            name: "Gemüse-Quiche",
            description: "Mit Gemüse der Saison, dazu Salatbukett",
            price: "14,10€"
          },
          {
            name: "Folienkartoffel",
            description: "Mit Kräuterquark und Salatbukett",
            price: "10,50€"
          },
          {
            name: "Folienkartoffel mit Lachs",
            description: "Mit Räucherlachs, Salatbukett und Kräuterquark",
            price: "14,80€"
          }
        ]
      },
      {
        title: "Ab Donnerstag · Salate",
        items: [
          {
            name: "Ceaser Salat mit Croutons",
            description: "Dazu Baguette",
            price: "13,80€"
          },
          {
            name: "Ceaser Salat mit Hähnchenbruststreifen",
            description: "Dazu Baguette",
            price: "14,50€"
          },
          {
            name: "Ceaser Salat mit Garnelen",
            description: "Dazu Baguette",
            price: "17,20€"
          },
          {
            name: "Salat Schwesterherz",
            description: "Mit Hähnchenbruststreifen und Brot-Croutons, dazu Spiegelei",
            price: "16,00€",
            badge: "Empfehlung"
          }
        ]
      }
    ]
  },
  {
    id: "colddrinks",
    title: "Kalte Getränke",
    description: "Erfrischungen, Sekt und Bier",
    sections: [
      {
        title: "Alkoholfrei",
        items: [
          { name: "Coca-Cola", size: "0,2l", price: "3,50€" },
          { name: "Coca-Cola Zero", size: "0,2l", price: "3,50€" },
          { name: "Fanta", size: "0,2l", price: "3,50€" },
          { name: "Sprite", size: "0,2l", price: "3,50€" },
          { name: "Bitter Lemon", size: "0,2l", price: "3,50€" },
          { name: "Mezzo Mix", size: "0,2l", price: "3,50€" },
          { name: "Mineralwasser Sprudel", size: "0,2l", price: "3,00€" },
          { name: "Mineralwasser naturell", size: "0,2l", price: "3,00€" },
          { name: "Apfelsaft", size: "0,2l", price: "3,00€" },
          { name: "Orangensaft", size: "0,2l", price: "3,00€" },
          { name: "Vio Schorle Bio", size: "0,25l", price: "4,20€" }
        ]
      },
      {
        title: "Sekt & Aperitiva",
        items: [
          { name: "Aperol Spritz", size: "0,2l", price: "8,50€" },
          { name: "Wildberry Lillet", size: "0,2l", price: "8,50€" },
          { name: "Bacardi Razz", size: "0,2l", price: "9,50€" },
          { name: "Rotkäppchen Sekt", size: "0,2l", price: "5,50€" },
          { name: "Rotkäppchen Sekt alkoholfrei", size: "0,2l", price: "4,80€" }
        ]
      },
      {
        title: "Flaschenbiere",
        items: [
          { name: "Zunft Kölsch", size: "0,3l", price: "3,50€" },
          { name: "Veltins Pils", size: "0,3l", price: "3,50€" },
          { name: "Bergischer Radler", size: "0,3l", price: "3,50€" },
          { name: "Bergischer Sportsfreund alkoholfrei", size: "0,3l", price: "3,50€" },
          { name: "Paulaner Hefeweizen", size: "0,5l", price: "4,80€" },
          { name: "Paulaner Hefeweizen alkoholfrei", size: "0,5l", price: "4,80€" }
        ]
      },
      {
        title: "Liköre",
        items: [
          {
            name: "Liköre",
            size: "2cl",
            description: "Amaretto · Eierlikör · Ramazzotti",
            price: "3,00€"
          }
        ]
      }
    ]
  }
];

export function Menu() {
  const [, setActiveTab] = useState("breakfast");

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
                  className="rounded-full px-4 sm:px-6 py-2 sm:py-3 font-serif text-sm sm:text-lg data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
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
                  className="space-y-12"
                >
                  {category.sections.map((section, sIdx) => (
                    <div key={section.title ?? `section-${sIdx}`}>
                      {section.title && (
                        <div className="mb-6 max-w-2xl">
                          <h3 className="font-serif text-2xl font-bold text-foreground">{section.title}</h3>
                          <div className="w-12 h-0.5 bg-primary/60 rounded-full mt-2" />
                          {section.note && (
                            <p className="text-muted-foreground text-sm mt-2 italic">{section.note}</p>
                          )}
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {section.items.map((item, index) => (
                          <Card key={`${sIdx}-${index}`} className="overflow-hidden border-border/50 hover:shadow-md transition-shadow duration-300 bg-white group">
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
                                    <div className="flex items-baseline gap-2 flex-wrap">
                                      <h4 className="font-serif text-xl font-bold text-foreground">{item.name}</h4>
                                      {item.size && (
                                        <span className="font-sans text-sm text-muted-foreground">{item.size}</span>
                                      )}
                                    </div>
                                    {item.price && (
                                      <span className="font-sans font-bold text-primary shrink-0">{item.price}</span>
                                    )}
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
                                  {item.subitems && (
                                    <ul className="mt-3 space-y-1.5">
                                      {item.subitems.map((sub, i) => (
                                        <li key={i} className="flex justify-between gap-4 text-sm">
                                          <span className="text-muted-foreground">{sub.name}</span>
                                          {sub.price && (
                                            <span className="font-medium text-foreground/80 shrink-0">{sub.price}</span>
                                          )}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </AnimatePresence>
        </Tabs>
      </div>
    </section>
  );
}
