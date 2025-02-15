'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebase'; 

export default function HomePage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      router.push('/'); 
    } catch (error) {
      console.error('Błąd wylogowania: ', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Witaj na stronie głównej
        </h2>
      
        <div className="text-center mt-4">
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Wyloguj się
          </button>
        </div>
      </div>
    </div>
  );
}
