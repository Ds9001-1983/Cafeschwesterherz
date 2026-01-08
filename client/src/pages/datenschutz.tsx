import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" /> Zurück zur Startseite
        </Link>

        <h1 className="font-serif text-4xl font-bold text-foreground mb-8">Datenschutzerklärung</h1>

        <div className="prose prose-lg max-w-none space-y-6 text-foreground">
          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">1. Datenschutz auf einen Blick</h2>
            <h3 className="font-serif text-xl font-semibold mb-2">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten 
              passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie 
              persönlich identifiziert werden können.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">2. Verantwortliche Stelle</h2>
            <p>
              <strong>Café Schwesterherz</strong><br />
              Inh.: Lisa-Maria Herzogenrath<br />
              Lindchenweg 1<br />
              51588 Nümbrecht<br /><br />
              Telefon: 02293/3994<br />
              E-Mail: Hallo@Schwesterherz.cafe
            </p>
            <p>
              Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen 
              über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">3. Datenerfassung auf dieser Website</h2>
            
            <h3 className="font-serif text-xl font-semibold mb-2">Wer ist verantwortlich für die Datenerfassung?</h3>
            <p>
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Die Kontaktdaten 
              können Sie dem Impressum dieser Website entnehmen.
            </p>

            <h3 className="font-serif text-xl font-semibold mb-2 mt-4">Wie erfassen wir Ihre Daten?</h3>
            <p>
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. 
              um Daten handeln, die Sie in ein Kontaktformular eingeben oder per E-Mail/WhatsApp an uns senden.
            </p>
            <p>
              Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere 
              IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder 
              Uhrzeit des Seitenaufrufs).
            </p>

            <h3 className="font-serif text-xl font-semibold mb-2 mt-4">Wofür nutzen wir Ihre Daten?</h3>
            <p>
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. 
              Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">4. Ihre Rechte</h2>
            <p>Sie haben jederzeit das Recht:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Auskunft über Ihre gespeicherten personenbezogenen Daten zu erhalten</li>
              <li>Berichtigung unrichtiger Daten zu verlangen</li>
              <li>Löschung Ihrer Daten zu verlangen</li>
              <li>Einschränkung der Verarbeitung zu verlangen</li>
              <li>Datenübertragbarkeit zu verlangen</li>
              <li>Widerspruch gegen die Verarbeitung einzulegen</li>
            </ul>
            <p className="mt-4">
              Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">5. Hosting</h2>
            <p>
              Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten, 
              die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann 
              es sich v.a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, 
              Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">6. Kontaktaufnahme</h2>
            <p>
              Wenn Sie uns per E-Mail, Telefon oder WhatsApp kontaktieren, wird Ihre Anfrage inklusive aller daraus 
              hervorgehenden personenbezogenen Daten (Name, Anfrage, Telefonnummer) zum Zwecke der Bearbeitung 
              Ihres Anliegens bei uns gespeichert und verarbeitet.
            </p>
            <p>
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage 
              mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen 
              erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse 
              an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf 
              Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4">7. SSL-Verschlüsselung</h2>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine 
              SSL-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des 
              Browsers von "http://" auf "https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
            </p>
          </section>

          <section className="pt-8 border-t border-border text-sm text-muted-foreground">
            <p>Stand: Januar 2026</p>
          </section>
        </div>
      </div>
    </div>
  );
}
