'use client';

import Link from 'next/link';

export default function CookiesPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Polityka Cookies</h1>

      <div className="cookies-container" style={{ backgroundColor: '#333', padding: '20px', borderRadius: '8px', maxWidth: '800px', margin: '30px auto', fontSize: '1.125rem', color: '#f1f1f1' }}>
        <h2>1. Czym są pliki cookies?</h2>
        <p>
          Pliki cookies to małe pliki tekstowe, które są przechowywane na urządzeniu użytkownika podczas odwiedzania naszej strony internetowej. Służą one do zapisywania ustawień użytkownika oraz innych informacji, które pomagają w poprawnym funkcjonowaniu strony.
        </p>

        <h2>2. Jakie pliki cookies wykorzystujemy?</h2>
        <p>
          Nasza strona używa cookies w celu poprawy jakości świadczonych usług oraz personalizacji treści. Możemy wykorzystywać pliki cookies do:
          <ul>
            <li>Analizy ruchu na stronie.</li>
            <li>Ulepszania wydajności strony.</li>
            <li>Zapamiętywania preferencji użytkownika.</li>
            <li>Personalizacji treści i reklam.</li>
          </ul>
        </p>

        <h2>3. Zarządzanie plikami cookies</h2>
        <p>
          Użytkownik może w każdej chwili zmienić ustawienia dotyczące plików cookies w swojej przeglądarce. Większość przeglądarek automatycznie akceptuje cookies, ale użytkownik może je zablokować lub usunąć, zmieniając odpowiednie ustawienia w swojej przeglądarce. Należy pamiętać, że zablokowanie plików cookies może wpłynąć na funkcjonowanie naszej strony.
        </p>

        <h2>4. Zgoda na pliki cookies</h2>
        <p>
          Korzystając z naszej strony internetowej, użytkownik wyraża zgodę na używanie plików cookies zgodnie z polityką cookies. Jeśli nie wyrażasz zgody, prosimy o zmianę ustawień cookies lub opuszczenie strony.
        </p>

        <h2>5. Zmiany w Polityce Cookies</h2>
        <p>
          Administrator zastrzega sobie prawo do zmiany polityki cookies w dowolnym czasie. Wszelkie zmiany będą publikowane na tej stronie i będą obowiązywać od momentu ich opublikowania.
        </p>

        <h2>6. Kontakt</h2>
        <p>
          Jeśli masz jakiekolwiek pytania dotyczące polityki cookies, prosimy o kontakt z administratorem strony.
        </p>

        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link href="/">Powrót do strony głównej</Link>
        </p>
      </div>
    </div>
  );
}
