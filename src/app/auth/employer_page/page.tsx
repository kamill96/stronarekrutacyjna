'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import './employer_page.css'; 

export default function EmployerRegistrationPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Hasła nie są zgodne.');
      return;
    }

    if (!isSigningUp) {
      setIsSigningUp(true);
      setErrorMessage('');
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const user = userCredential.user;

        
        router.replace('/home'); 
      } catch (error: unknown) {
        console.error('Registration error:', error);
        setErrorMessage(
          error instanceof Error ? error.message : 'Wystąpił problem podczas rejestracji.'
        );
      } finally {
        setIsSigningUp(false);
      }
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <h2 className="form-title">Zarejestruj się jako pracodawca</h2>
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
            <div>
              <input
                type="password"
                className="form-input"
                placeholder="Powtórz hasło"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                className="form-input"
                placeholder="Nazwa firmy"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="tel"
                className="form-input"
                placeholder="Numer telefonu"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                className="form-input"
                placeholder="Adres firmy"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSigningUp}
              className="submit-button"
            >
              {isSigningUp ? 'Rejestracja...' : 'Zarejestruj się'}
            </button>
          </div>
        </form>
        <div className="text-sm text-center mt-4">
          <p>
            {`Masz już konto? `}
            <Link href="/auth/login_page?employer=true" className="font-medium text-blue-600 hover:text-blue-500">
              Zaloguj się
            </Link>
          </p>
          <p className="mt-4">
            {`Jesteś pracownikiem? `}
            <Link href="/auth/login_page" className="font-medium text-blue-600 hover:text-blue-500">
              Zaloguj się
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
