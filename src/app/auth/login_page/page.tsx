'use client';
import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { AuthContext } from '@/contexts/authContext';
import { useRouter, useSearchParams } from 'next/navigation';
import './login_page.css'; 

export default function LoginPage() {
  const authContext = useContext(AuthContext);
  const searchParams = useSearchParams();
  const isEmployer = searchParams.get('employer') === 'true';

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { userLoggedIn, setUserLoggedIn } = authContext;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (userLoggedIn) {
      router.push('/home'); // After successful login, redirect to home page
    }
  }, [userLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      setErrorMessage('');
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setUserLoggedIn(true);
        router.push('/home'); // Redirect to home page after successful login
      } catch (error: unknown) {
        console.error('Login error:', error);
        setErrorMessage(
          error instanceof Error ? error.message : 'Wystąpił problem podczas logowania.'
        );
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="form-title">
          {isEmployer ? "Zaloguj się do swojego konta jako pracodawca" : "Zaloguj się do swojego konta"}
        </h2>
        {errorMessage && (
          <p className="text-red-500 text-sm text-center">{errorMessage}</p>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <input
                type="email"
                className="form-input"
                placeholder="Adres email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                className="form-input"
                placeholder="Hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isSigningIn}
              className="submit-button"
            >
              {isSigningIn ? 'Logowanie...' : 'Zaloguj się'}
            </button>
          </div>
        </form>
        <div className="text-sm text-center mt-4">
          {!isEmployer ? (
            <>
              <p>
                Nie masz konta?{' '}
                <Link href="/auth/registration_page" className="font-medium text-blue-600 hover:text-blue-500">
                  Zarejestruj się
                </Link>
              </p>
              <p className="mt-4">
                Jesteś pracodawcą?{' '}
                <Link href="/auth/login_page?employer=true" className="font-medium text-blue-600 hover:text-blue-500">
                  Zaloguj się
                </Link>
              </p>
            </>
          ) : (
            <>
              <p>
                Nie masz konta?{' '}
                <Link href="/auth/employer_page" className="font-medium text-blue-600 hover:text-blue-500">
                  Zarejestruj się
                </Link>
              </p>
              <p className="mt-4">
                Jesteś pracownikiem?{' '}
                <Link href="/auth/login_page" className="font-medium text-blue-600 hover:text-blue-500">
                  Zaloguj się
                </Link>
              </p>
            </>
          )}
        </div>
        <div className="text-sm text-center mt-6">
          <p>
            Klikając „Zaloguj się”, akceptujesz{' '}
            <Link href="/terms" className="font-medium text-blue-600 hover:text-blue-500">
              Regulamin
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
