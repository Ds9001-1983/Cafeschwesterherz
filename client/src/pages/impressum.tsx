import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Impressum() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" /> Zurück zur Startseite
        </Link>

        <h1 className="font-serif text-4xl font-bold text-foreground mb-8">Impressum</h1>

        <div className="prose prose-lg max-w-none space-y-6 text-foreground">
          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">Angaben gemäß § 5 TMG</h2>
            <p>
              <strong>Café Schwesterherz</strong><br />
              Inh.: Lisa-Maria Herzogenrath<br />
              Lindchenweg 1<br />
              51588 Nümbrecht
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">Kontakt</h2>
            <p>
              Telefon: 02293/3994<br />
              E-Mail: Hallo@Schwesterherz.cafe
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              [Bitte hier einfügen]
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>
              Lisa-Maria Herzogenrath<br />
              Lindchenweg 1<br />
              51588 Nümbrecht
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer" className="text-primary hover:underline">
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den 
              allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht 
              verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen 
              zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p>
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen 
              Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt 
              der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden 
              Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">Haftung für Links</h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der 
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen 
              Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der 
              Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>

          <section className="pt-8 border-t border-border text-sm text-muted-foreground">
            <p>
              Webdesign & Umsetzung:{" "}
              <a href="https://superbrand.marketing" target="_blank" rel="noreferrer" className="text-primary hover:underline">
                SUPERBRAND.marketing
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
