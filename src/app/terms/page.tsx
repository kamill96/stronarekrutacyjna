'use client'; // Upewniamy się, że komponent jest traktowany jako klient

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Zmieniamy na usePathname
import { useEffect } from 'react';

export default function TermsPage() {
  const pathname = usePathname(); // Korzystamy z usePathname, aby pobrać aktualną ścieżkę

  useEffect(() => {
    console.log("Routing Path:", pathname); // Teraz zamiast router.pathname używamy pathname
  }, [pathname]); // Zależność z pathname, aby reagować na zmiany ścieżki

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Regulamin Korzystania ze Strony Rekrutacyjnej
      </h1>

      <h2>§1 Postanowienia ogólne</h2>
      <p>
        1. Niniejszy regulamin określa zasady korzystania ze strony rekrutacyjnej dostępnej pod adresem [adres strony]. <br />
        2. Właścicielem i administratorem strony jest [nazwa firmy/organizacji], z siedzibą w [adres]. <br />
        3. Użytkownik, korzystając ze strony, akceptuje niniejszy regulamin i zobowiązuje się do przestrzegania jego postanowień.
      </p>

      <h2>§2 Definicje</h2>
      <p>
        W regulaminie używa się następujących definicji: <br />
        1. &ldquo;Użytkownik&rdquo; – każda osoba, która odwiedza stronę i korzysta z jej funkcji. <br />
        2. &ldquo;Administrator&rdquo; – właściciel strony, odpowiedzialny za jej działanie i zarządzanie treścią. <br />
        3. &ldquo;Serwis&rdquo; – strona internetowa [adres strony] oraz wszystkie związane z nią usługi online. <br />
        4. &ldquo;Rekrutacja&rdquo; – proces składania aplikacji o pracę za pośrednictwem serwisu.
      </p>

      <h2>§3 Zasady korzystania ze strony</h2>
      <p>
        1. Użytkownik zobowiązuje się do korzystania ze strony zgodnie z obowiązującym prawem. <br />
        2. Niedozwolone jest publikowanie treści, które naruszają prawa innych użytkowników lub osób trzecich. <br />
        3. Użytkownicy strony mogą składać aplikacje na oferty pracy, tworzyć konta oraz korzystać z innych funkcji dostępnych na stronie.
      </p>

      <h2>§4 Prawa i obowiązki użytkowników</h2>
      <p>
        1. Użytkownik ma prawo do: <br />
        - składać aplikacje na oferty pracy, <br />
        - korzystać z funkcji serwisu zgodnie z jego przeznaczeniem, <br />
        - przeglądać treści zamieszczone na stronie. <br />
        2. Użytkownik zobowiązuje się do: <br />
        - podania prawdziwych informacji w procesie rekrutacyjnym, <br />
        - przestrzegania zasad zawartych w niniejszym regulaminie, <br />
        - dbania o bezpieczeństwo swojego konta użytkownika.
      </p>

      <h2>§5 Odpowiedzialność</h2>
      <p>
        1. Administrator strony nie ponosi odpowiedzialności za treści publikowane przez użytkowników. <br />
        2. Administrator dołoży wszelkich starań, aby strona działała bez zakłóceń, ale nie gwarantuje, że serwis będzie wolny od błędów lub awarii. <br />
        3. Użytkownicy korzystają z serwisu na własne ryzyko.
      </p>

      <h2>§6 Prywatność i ochrona danych osobowych</h2>
      <p>
        1. Administrator zobowiązuje się do ochrony danych osobowych użytkowników zgodnie z obowiązującymi przepisami o ochronie danych osobowych. <br />
        2. Dane osobowe użytkowników są przetwarzane tylko w celu realizacji usług rekrutacyjnych, zgodnie z polityką prywatności. <br />
        3. Użytkownicy mają prawo do dostępu do swoich danych, ich poprawiania oraz żądania ich usunięcia.
      </p>

      <h2>§7 Zmiany w regulaminie</h2>
      <p>
        1. Administrator ma prawo do zmiany regulaminu w dowolnym momencie. <br />
        2. Zmiany będą publikowane na stronie i będą obowiązywać od momentu ich opublikowania. <br />
        3. Użytkownik, kontynuując korzystanie z serwisu po zmianach, akceptuje nowe warunki regulaminu.
      </p>

      <h2>§8 Postanowienia końcowe</h2>
      <p>
        1. Regulamin może zostać zmieniony w dowolnym momencie przez Administratora. Zmiany wchodzą w życie w momencie ich opublikowania na stronie. <br />
        2. W przypadku pytań lub wątpliwości dotyczących regulaminu, użytkownik może skontaktować się z Administratorem poprzez [dane kontaktowe]. <br />
        3. Korzystanie ze strony oznacza akceptację aktualnej wersji regulaminu.
      </p>

      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        <strong>Data ostatniej aktualizacji: [Data]</strong>
      </p>

      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link href="/">Powrót do strony głównej</Link>
      </p>
    </div>
  );
}
