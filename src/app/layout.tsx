import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PartyGames Hub – Platforma Gier Towarzyskich',
  description:
    'Nowoczesna, interaktywna platforma imprezowa czasu rzeczywistego w stylu Jackbox Games. Jeden ekran wspólny (TV/Laptop) oraz smartfony jako bezprzewodowe kontrolery!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className="antialiased selection:bg-party-yellow selection:text-black">
        {children}
      </body>
    </html>
  );
}
