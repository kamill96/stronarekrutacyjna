/* eslint-disable @next/next/no-page-custom-font */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './globals.css';
import { AuthProvider } from '@/contexts/authContext';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Strona rekrutacyjna</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap" rel="stylesheet"/>
      </head>
      <body>
        <AuthProvider>
          <Header />
          <div className="container">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}

function Header() {
  const pathname = usePathname();
  const authContext = useContext(AuthContext);

  const userLoggedIn = authContext?.userLoggedIn ?? false;

  const handleLogout = async () => {
    try {;
      window.location.href = '/';
    } catch (error) {
      console.error('Błąd wylogowania:', error);
      alert('Nie udało się wylogować.');
    }
  };

  const showHeader =
    pathname !== '/auth/login_page' && pathname !== '/auth/registration_page';

  const isUserPage = pathname === '/employee';

  if (!showHeader) {
    return null;
  }

  return (
    <div className="header flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
      <div className="header-left">
        <Link href="/add-job" className="text-lg font-medium hover:underline bg-blue-500 text-white px-4 py-2 rounded">
          Dodanie ogłoszenia
        </Link>
      </div>
      <div className="header-right flex items-center">
        {userLoggedIn ? (
          <>
            <Link href="/employee" className="text-lg font-medium hover:underline bg-blue-500 text-white px-4 py-2 rounded">
              Panel użytkownika
            </Link>
            {isUserPage && (
              <button
                onClick={handleLogout}
                className="ml-4 text-lg font-medium hover:underline bg-blue-500 text-white px-4 py-2 rounded"
              >
                Wyloguj się
              </button>
            )}
          </>
        ) : (
          <Link
            href="/auth/login_page"
            className="text-lg font-medium hover:underline bg-blue-500 text-white px-4 py-2 rounded"
          >
            Zaloguj się
          </Link>
        )}
      </div>
    </div>
  );
}
