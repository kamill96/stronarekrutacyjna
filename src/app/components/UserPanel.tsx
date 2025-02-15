'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UserPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    console.log('Wylogowano');
    router.push('/auth/login_page'); 
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
      >
        Panel użytkownika
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
          <Link href="/user/account" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
            Moje konto
          </Link>
          <Link href="/user/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
            Ustawienia
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
          >
            Wyloguj się
          </button>
        </div>
      )}
    </div>
  );
}
