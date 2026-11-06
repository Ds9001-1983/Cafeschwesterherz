// Weihnachtsaktion 2026: Festtagstorte, Gutschein-Hinweis, Betriebsferien.
// Alle Zeitpunkte gelten in der Ortszeit der Besucher. Die Prüfung läuft im Browser,
// Ein- und Ausblenden passiert also automatisch, ohne neues Deployment.

// Ab hier keine Tortenbestellung mehr (Bestellschluss 20.12.), der Weihnachtsgruß beginnt.
export const GRUSS_AB = new Date(2026, 11, 21, 0, 0);
// Heiligabend 15 Uhr: Ladenschluss, danach Betriebsferien. Gutscheine gibt es nur im Café.
export const FERIEN_AB = new Date(2026, 11, 24, 15, 0);
// Mittwoch, 06.01.2027: wieder geöffnet, alle Weihnachtshinweise verschwinden.
export const WIEDER_OFFEN_AB = new Date(2027, 0, 6, 0, 0);

export type Weihnachtsstand = {
  /** Festtagstorte bestellen (bis einschließlich 20.12.) */
  torte: boolean;
  /** Gutschein-Hinweis (bis Heiligabend 15 Uhr) */
  gutschein: boolean;
  /** Weihnachts- und Neujahrsgruß (21.12. bis 05.01.) */
  gruss: boolean;
  /** Betriebsferien angekündigt, aber noch nicht begonnen */
  ferienVorab: boolean;
  /** Betriebsferien laufen */
  ferienLaufend: boolean;
};

export function weihnachtsstand(jetzt: Date): Weihnachtsstand {
  return {
    torte: jetzt < GRUSS_AB,
    gutschein: jetzt < FERIEN_AB,
    gruss: jetzt >= GRUSS_AB && jetzt < WIEDER_OFFEN_AB,
    ferienVorab: jetzt < FERIEN_AB,
    ferienLaufend: jetzt >= FERIEN_AB && jetzt < WIEDER_OFFEN_AB,
  };
}

// Vorschau für spätere Phasen: ?vorschau=2026-12-21 oder ?vorschau=2026-12-24T16:00
// Ändert nur die Anzeige. Ungültige Werte werden ignoriert.
export function jetzt(): Date {
  if (typeof window === "undefined") return new Date();
  const wert = new URLSearchParams(window.location.search).get("vorschau");
  const treffer = wert?.match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?$/);
  if (!treffer) return new Date();
  const [, jahr, monat, tag, stunde = "0", minute = "0"] = treffer;
  const datum = new Date(+jahr, +monat - 1, +tag, +stunde, +minute);
  return Number.isNaN(datum.getTime()) ? new Date() : datum;
}
