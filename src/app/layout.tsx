'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from '@/contexts/authContext';  
import { signOut } from 'firebase/auth';  
import { auth } from '@/firebase/firebase';  

import './globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="pl">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Strona rekrutacyjna</title>
        </head>
        <body>
          <Header />
          <div className="container">
            {children}
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}

function Header() {
  const pathname = usePathname();
  const authContext = useContext(AuthContext);  

  const userLoggedIn = authContext?.userLoggedIn ?? false;

  const handleLogout = async () => {
    try {
      await signOut(auth);
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
    <div className="header flex justify-between items-center px-6 py-4 bg-[#1a365d] text-white">
      <div className="header-left flex gap-4">
        <Link href="/add-job" className="add-job-btn">
          Dodanie ogłoszenia
        </Link>
        <Link href="/upload-cv" className="upload-cv-btn">
          Kreator CV
        </Link>
      </div>

      <div className="header-right flex items-center">
        {userLoggedIn ? (
          <>
            <Link
              href="/employee"
              className="text-lg font-medium hover:underline bg-blue-500 text-white px-4 py-2 rounded"
            >
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
          <Link href="/auth/login_page" className="login-btn">
            Zaloguj się
          </Link>
        )}
      </div>
    </div>
  );
}
