import { useMemo, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { Phone, Snowflake } from "lucide-react";
import { jetzt, weihnachtsstand } from "@/lib/weihnachten";

// Weihnachtsaktion 2026. Zeitfenster und Grenzzeitpunkte stehen in lib/weihnachten.ts.
// Gestaltungsidee: Papierdinge aus der Konditorei im Schnee. Die Torten-Karte trägt den
// Spitzenrand eines Tortendeckchens, der Gutschein ist mit Band und Schleife verpackt,
// unten liegen Geschenkpakete in einer Schneedecke, die in die nächste Sektion übergeht.

const ESPRESSO = "#2E221C";
const CREME = "#FBF6EC";
const GOLD = "#D9B26F";
const ROT = "#A8323A";
const TANNE = "#2F5B45";
const SCHNEE_HINTEN = "#E7DFD1";
const SEITENGRUND = "#F9F7F2"; // Hintergrund der folgenden Sektion

const STERNE = [
  { top: "5%", left: "6%", groesse: 14, verzoegerung: "0s" },
  { top: "4%", left: "70%", groesse: 10, verzoegerung: "0.4s" },
  { top: "9%", left: "91%", groesse: 18, verzoegerung: "1.2s" },
  { top: "8%", left: "31%", groesse: 8, verzoegerung: "2.6s" },
];

// Feste Pseudo-Zufallsfolge, damit der Schnee bei jedem Besuch gleich verteilt ist
function zufallsfolge(startwert: number) {
  let s = startwert;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FLOCKEN = (() => {
  const r = zufallsfolge(2412);
  return Array.from({ length: 130 }, (_, i) => {
    const kristall = i % 6 === 0;
    const dauer = (kristall ? 24 : 12) + r() * 14;
    return {
      kristall,
      left: `${(r() * 100).toFixed(2)}%`,
      groesse: kristall ? 14 + r() * 12 : 3.5 + r() * 6,
      deckkraft: kristall ? 0.75 : 0.65 + r() * 0.35,
      unschaerfe: !kristall && r() > 0.7,
      stil: {
        "--dauer": `${dauer.toFixed(1)}s`,
        "--verzoegerung": `${(-r() * dauer).toFixed(1)}s`,
        "--drift": `${((r() - 0.5) * 140).toFixed(0)}px`,
        "--ruhe-y": `${(r() * 1000).toFixed(0)}px`,
      } as CSSProperties,
    };
  });
})();

function Stern({ groesse }: { groesse: number }) {
  return (
    <svg width={groesse} height={groesse} viewBox="0 0 24 24" fill={GOLD}>
      <path d="M12 0C12.8 7.2 16.8 11.2 24 12 16.8 12.8 12.8 16.8 12 24 11.2 16.8 7.2 12.8 0 12 7.2 11.2 11.2 7.2 12 0Z" />
    </svg>
  );
}

function Schneefall() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {FLOCKEN.map((f, i) => (
        <span
          key={i}
          className="schneeflocke absolute -top-8"
          style={{ ...f.stil, left: f.left, opacity: f.deckkraft }}
        >
          {f.kristall ? (
            <Snowflake color="#FFFFFF" strokeWidth={1.6} style={{ width: f.groesse, height: f.groesse }} />
          ) : (
            <span
              className="block rounded-full bg-white"
              style={{ width: f.groesse, height: f.groesse, filter: f.unschaerfe ? "blur(1px)" : undefined }}
            />
          )}
        </span>
      ))}
    </div>
  );
}

// Schleife aus zwei Schlaufen und Knoten, für Pakete und den Gutschein
function Schleife({ farbe }: { farbe: string }) {
  return (
    <>
      <ellipse cx="37" cy="15" rx="14" ry="8" transform="rotate(-20 37 15)" fill="none" stroke={farbe} strokeWidth="6" />
      <ellipse cx="63" cy="15" rx="14" ry="8" transform="rotate(20 63 15)" fill="none" stroke={farbe} strokeWidth="6" />
      <path d="M47 21 38 36M53 21 62 36" stroke={farbe} strokeWidth="5" strokeLinecap="round" />
      <circle cx="50" cy="20" r="6.5" fill={farbe} />
    </>
  );
}

// Geschenkpaket mit Schnee auf dem Deckel. hoehe = Höhe der viewBox (Breite 100).
function Geschenk({ farbe, band, hoehe = 100, className }: { farbe: string; band: string; hoehe?: number; className?: string }) {
  return (
    <svg viewBox={`0 0 100 ${hoehe}`} className={className} aria-hidden>
      <rect x="9" y="42" width="82" height={hoehe - 42} rx="2" fill={farbe} />
      <rect x="9" y="42" width="82" height="7" fill="#000" opacity="0.2" />
      <rect x="4" y="26" width="92" height="17" rx="2.5" fill={farbe} />
      <rect x="44" y="26" width="12" height={hoehe - 26} fill={band} />
      <path d="M4 31C4 23 18 22 27 25 37 20 50 23 58 25 70 21 89 21 96 28V33C89 36 82 32 75 35 67 38 59 33 50 35H4Z" fill="#FFFFFF" />
      <Schleife farbe={band} />
    </svg>
  );
}

// Schneehaube, die auf der Oberkante einer Karte liegt
function Schneehaube({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 34"
      className={`pointer-events-none ${className ?? ""}`}
      style={{ filter: "drop-shadow(0 2px 2px rgba(0, 0, 0, 0.18))" }}
    >
      <path
        d="M2 26C6 14 22 8 38 11 52 3 74 2 90 9 106 1 132 3 146 10 164 5 186 10 196 20 200 24 199 28 194 29 186 31 180 27 174 30 168 34 160 30 152 31 140 32 120 29 100 31 80 32 60 29 40 31 26 32 12 30 6 31 1 30 2 26Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

// Schneedecke am unteren Rand, hinten etwas dunkler, vorn im Ton der nächsten Sektion
function Schneedecke() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-44 md:h-52">
      <svg className="absolute bottom-0 left-0 h-28 w-full md:h-36" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0 70C160 30 320 40 480 62 640 84 800 36 980 44 1160 52 1300 78 1440 50V120H0Z" fill={SCHNEE_HINTEN} />
      </svg>

      <div className="absolute bottom-6 left-[2%] flex items-end md:bottom-9 md:left-[3%]">
        <Geschenk farbe={ROT} band={GOLD} hoehe={120} className="w-20 md:w-36" />
        <Geschenk farbe={TANNE} band={CREME} hoehe={95} className="-ml-3 w-14 md:w-24" />
        <Geschenk farbe={GOLD} band={ROT} hoehe={80} className="-ml-2 hidden w-16 sm:block md:w-20" />
      </div>
      <div className="absolute bottom-6 right-[2%] flex items-end md:bottom-9 md:right-[3%]">
        <Geschenk farbe={CREME} band={ROT} hoehe={85} className="hidden w-16 sm:block md:w-20" />
        <Geschenk farbe={TANNE} band={GOLD} hoehe={125} className="-ml-2 w-16 md:w-32" />
        <Geschenk farbe={ROT} band={CREME} hoehe={90} className="-ml-3 w-14 md:w-24" />
      </div>

      <svg className="absolute bottom-0 left-0 h-16 w-full md:h-20" viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0 40C200 10 380 18 560 36 760 56 920 14 1120 22 1280 28 1380 46 1440 34V80H0Z" fill={SEITENGRUND} />
      </svg>
    </div>
  );
}

// Gewellter Rand des Tortendeckchens, oben oder unten an der Karte
function Spitzenrand({ unten = false }: { unten?: boolean }) {
  return (
    <div
      aria-hidden
      className="h-3"
      style={{
        background: `radial-gradient(circle at 12px ${unten ? "0" : "12px"}, ${CREME} 11.5px, transparent 12px) center / 24px 12px repeat-x`,
      }}
    />
  );
}

// Lochmuster der Spitze, deckungsgleich mit den Wellen
function Lochreihe() {
  return (
    <div
      aria-hidden
      className="h-2"
      style={{
        background: `radial-gradient(circle, ${ESPRESSO} 2px, transparent 2.5px) center / 24px 8px repeat-x`,
      }}
    />
  );
}

// Seitliche Kerben des Gutscheins auf Höhe der Perforation (96 px von oben)
const gutscheinKerben = "radial-gradient(circle 12px at 0 96px, #0000 98%, #000) left / 51% 100% no-repeat, radial-gradient(circle 12px at 100% 96px, #0000 98%, #000) right / 51% 100% no-repeat";
const gutscheinForm: CSSProperties = {
  background: CREME,
  WebkitMask: gutscheinKerben,
  mask: gutscheinKerben,
};

export function Weihnachten() {
  const stand = useMemo(() => weihnachtsstand(jetzt()), []);
  const { torte, gutschein, gruss, ferienLaufend } = stand;

  if (!torte && !gutschein && !gruss) return null;

  const raster = torte
    ? "max-w-5xl md:grid-cols-5"
    : gutschein
      ? "max-w-5xl md:grid-cols-2"
      : "max-w-lg";

  return (
    <section
      id="weihnachten"
      aria-labelledby="weihnachten-titel"
      className="relative overflow-hidden pb-48 pt-20 md:pb-56 md:pt-24"
      style={{ background: ESPRESSO }}
    >
      {STERNE.map((stern, i) => (
        <span
          key={i}
          aria-hidden
          className="pointer-events-none absolute motion-safe:animate-pulse"
          style={{
            top: stern.top,
            left: stern.left,
            opacity: 0.7,
            animationDuration: "4s",
            animationDelay: stern.verzoegerung,
          }}
        >
          <Stern groesse={stern.groesse} />
        </span>
      ))}

      <Schneefall />
      <Schneedecke />

      <motion.div
        className="container relative mx-auto px-4"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <h2
            id="weihnachten-titel"
            className="font-serif text-4xl font-bold leading-tight md:text-5xl"
            style={{ color: CREME }}
          >
            {gruss ? "Frohe Weihnachten und einen guten Rutsch!" : "Weihnachten im Café Schwesterherz"}
          </h2>
          {gruss && (
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: GOLD }}>
              Wir bedanken uns herzlich bei all unseren Gästen für ein wunderbares Jahr und wünschen
              Ihnen alles Gute. Wir sehen uns im neuen Jahr!
            </p>
          )}
        </div>

        <div className={`mx-auto mt-12 grid items-stretch gap-8 md:gap-10 ${raster}`}>
          {torte && (
            <article className="relative flex flex-col md:col-span-3" aria-labelledby="festtagstorte-titel">
              <Spitzenrand />
              <div className="flex flex-1 flex-col px-6 sm:px-10" style={{ background: CREME }}>
                <div className="pt-3">
                  <Lochreihe />
                </div>
                <div className="flex flex-1 flex-col py-7 sm:py-9">
                  <h3 id="festtagstorte-titel" className="font-serif text-2xl font-bold text-[#96613F] sm:text-3xl">
                    Ihre Festtagstorte für Heiligabend
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-[#463C38]">
                    Bestellen Sie Ihre Festtagstorte bei Café Schwesterherz für den 24.12. – Abholung bis
                    15&nbsp;Uhr möglich.
                  </p>
                  <p className="mt-3 leading-relaxed text-[#463C38]">
                    Welche Torte es sein darf, besprechen wir gern persönlich mit Ihnen. Rufen Sie uns einfach an.
                  </p>
                  <p className="mt-5 font-semibold text-[#463C38]">Bestellschluss: Sonntag, 20.12.</p>
                  <a
                    href="tel:022933994"
                    className="mt-7 inline-flex items-center gap-2 self-start rounded-full bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E221C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF6EC]"
                  >
                    <Phone className="h-4 w-4" aria-hidden />
                    02293/3994 anrufen
                  </a>
                </div>
                <div className="pb-3">
                  <Lochreihe />
                </div>
              </div>
              <Spitzenrand unten />
              <Schneehaube className="absolute -top-3.5 right-6 w-44 sm:w-56" />
            </article>
          )}

          {gutschein && (
            <article
              className={`relative flex flex-col ${torte ? "md:col-span-2" : ""}`}
              aria-labelledby="gutschein-titel"
            >
              <div className="relative flex flex-1 flex-col rounded-xl" style={gutscheinForm}>
                <div
                  aria-hidden
                  className="absolute left-5 right-5 top-24 border-t-2 border-dashed"
                  style={{ borderColor: GOLD }}
                />
                {/* Geschenkband */}
                <div aria-hidden className="absolute inset-y-0 right-9 w-3" style={{ background: ROT }} />
                <div className="relative flex h-24 items-center pl-8 pr-20 sm:pl-10">
                  <h3 id="gutschein-titel" className="font-serif text-2xl font-bold text-[#96613F]">
                    Gutscheine zum Verschenken
                  </h3>
                </div>
                <div className="relative flex flex-1 flex-col pb-9 pl-8 pr-16 pt-7 sm:pl-10 sm:pr-20">
                  <p className="text-lg leading-relaxed text-[#463C38]">
                    Schenken Sie Ihren Liebsten doch einen Gutschein – für Kaffee, Kuchen und gemeinsame Zeit
                    bei uns.
                  </p>
                  <p className="mt-auto pt-5 font-semibold text-[#463C38]">
                    {gruss
                      ? "Gutscheine erhalten Sie direkt bei uns im Café, noch bis Heiligabend um 15 Uhr."
                      : "Gutscheine erhalten Sie direkt bei uns im Café."}
                  </p>
                </div>
              </div>
              <Schneehaube className="absolute -top-3.5 left-4 w-40 sm:w-48" />
              {/* Schleife sitzt auf der Oberkante, mittig über dem Band */}
              <svg aria-hidden viewBox="0 0 100 40" className="absolute -top-4 right-0.5 w-20">
                <Schleife farbe={ROT} />
              </svg>
            </article>
          )}

          {gruss && (
            <article
              className="rounded-xl border px-8 py-9 backdrop-blur-[2px] sm:px-10"
              style={{ borderColor: "rgba(217, 178, 111, 0.5)", background: "rgba(46, 34, 28, 0.6)", color: CREME }}
              aria-labelledby="feiertage-titel"
            >
              <h3 id="feiertage-titel" className="font-serif text-2xl font-bold" style={{ color: GOLD }}>
                Unsere Feiertage
              </h3>
              <dl className="mt-6 space-y-4">
                {!ferienLaufend && (
                  <div>
                    <dt className="font-semibold">Heiligabend, 24.12.</dt>
                    <dd className="opacity-90">bis 15 Uhr geöffnet</dd>
                  </div>
                )}
                <div>
                  <dt className="font-semibold">25.12.2026 bis 05.01.2027</dt>
                  <dd className="opacity-90">Betriebsferien</dd>
                </div>
                <div>
                  <dt className="font-semibold">Ab Mittwoch, 06.01.2027</dt>
                  <dd className="opacity-90">wieder für Sie da</dd>
                </div>
              </dl>
            </article>
          )}
        </div>
      </motion.div>
    </section>
  );
}
